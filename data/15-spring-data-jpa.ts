export const data = {
    title: 'Spring Data JPA: Advanced Guide & Senior Interview Prep',
    description: 'A comprehensive revision guide for Senior Software Engineers covering advanced Spring Data JPA concepts, performance tuning, architecture patterns, and critical interview questions.',
    patterns: [
        {
            title: '1. Introduction & Architecture',
            description: `
Spring Data JPA is an abstraction layer that sits on top of JPA (Jakarta Persistence API) to reduce boilerplate code.

**The Persistence Stack:**
1. **JDBC:** Low-level database connectivity.
2. **Hibernate:** ORM framework implementing JPA specs.
3. **Spring Data JPA:** Repository abstractions over Hibernate.

**Entity Lifecycle States:**
* **Transient:** New object, not in session.
* **Persistent:** Managed by session, dirty checking active.
* **Detached:** Session closed, changes not tracked.
* **Removed:** Scheduled for deletion.


`,
            exampleProblems: [
                'Understanding the difference between Hibernate and Spring Data JPA',
                'Managing Entity Lifecycle States (Transient vs Persistent)'
            ],
            solutions: [{
                problemTitle: 'Visualizing the Entity Lifecycle',
                code: `
// 1. Transient
Patient p = new Patient(); 
p.setName("John");

// 2. Persistent (Managed)
patientRepository.save(p); 
// Now "p" is attached to the Persistence Context.
// Modifying "p" here triggers an update automatically at transaction commit.

// 3. Detached
// If the transaction ends or session closes, "p" becomes detached.
// Changes to "p" are no longer tracked.
        `,
                explanation: 'Understanding these states is crucial for predicting when SQL queries (INSERT/UPDATE) are actually fired against the database.'
            }]
        },
        {
            title: '2. Project Setup & Configuration',
            description: `
Setup for a Spring Boot project using PostgreSQL and Lombok.

**Key Dependencies:**
* \`spring-boot-starter-data-jpa\`
* \`postgresql\` (Driver)
* \`lombok\`
      `,
            exampleProblems: [
                'Configuring Database Connection',
                'Setting Hibernate DDL Auto modes'
            ],
            solutions: [{
                problemTitle: 'application.properties Configuration',
                code: `
# Database Connection
spring.datasource.url=jdbc:postgresql://localhost:5432/hospitaldb
spring.datasource.username=postgres
spring.datasource.password=password

# JPA & Hibernate Settings
# ddl-auto: create, update, validate, or none
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

# Data Initialization
spring.jpa.defer-datasource-initialization=true
spring.sql.init.mode=always
        `,
                explanation: 'This configuration connects the app to a local PostgreSQL instance and ensures the schema is updated automatically (\`ddl-auto=update\`) based on your Entity classes.'
            }]
        },
        {
            title: '3. Entities & Basic Mapping',
            description: `
Entities represent database tables. This section covers basic annotations like \`@Entity\`, \`@Id\`, and \`@Column\`.
`,
            exampleProblems: [
                'Mapping a Java class to a Database Table',
                'Handling Enums properly in Databases'
            ],
            solutions: [{
                problemTitle: 'Patient Entity Definition',
                code: `
@Entity
@Table(name = "patient")
@Data // Lombok for Getters/Setters
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    // Stores "MALE"/"FEMALE" instead of 0/1
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Column(unique = true, nullable = false)
    private String email;
    
    @Transient // Not stored in DB
    private int calculatedAge; 
}
        `,
                explanation: 'The `@Entity` annotation marks this class for persistence. `@Enumerated(EnumType.STRING)` is best practice for readability in the database compared to ordinal values.'
            }]
        },
        {
            title: '4. Repositories & Querying Strategies',
            description: `
The \`JpaRepository\` interface provides built-in CRUD. You can extend this with Derived Queries, JPQL, Native SQL, and Projections.
`,
            exampleProblems: [
                'Writing queries without SQL (Derived Methods)',
                'Optimizing reads with Projections (DTOs)',
                'Handling Pagination'
            ],
            solutions: [{
                problemTitle: 'Repository Pattern Examples',
                code: `
public interface PatientRepository extends JpaRepository<Patient, Long> {
    
    // 1. Derived Query Method
    // Generates: SELECT * FROM patient WHERE email = ?
    Optional<Patient> findByEmail(String email);

    // 2. JPQL (Querying Objects)
    @Query("SELECT p FROM Patient p WHERE p.bloodGroup = :bg")
    List<Patient> findByBloodGroup(@Param("bg") String bloodGroup);

    // 3. Native SQL (Querying Tables)
    @Query(value = "SELECT * FROM patient WHERE email = :email", nativeQuery = true)
    Patient findByEmailNative(@Param("email") String email);

    // 4. Projections (DTOs) for Performance
    @Query("SELECT new com.example.dto.PatientSummary(p.name, p.email) FROM Patient p")
    List<PatientSummary> findAllSummaries();
}
        `,
                explanation: 'Derived methods are great for simple queries. Use JPQL for complex object-oriented queries, and Projections/DTOs when you need to fetch only specific columns to save memory.'
            }]
        },
        {
            title: '5. Entity Relationships (Mappings)',
            description: `
Defining how tables relate to one another is the core of ORM.



[Image of Hospital ER Diagram]


**Relationship Types:**
* **One-to-One:** Patient ↔ Insurance
* **One-to-Many:** Patient ↔ Appointment (The "Many" side usually owns the FK)
* **Many-to-Many:** Doctor ↔ Department (Requires a Join Table)
`,
            exampleProblems: [
                'Mapping Parent-Child relationships',
                'Handling Join Tables'
            ],
            solutions: [{
                problemTitle: 'Mapping One-to-Many (Patient ↔ Appointment)',
                code: `
// 1. The Child (Owning Side - Holds Foreign Key)
@Entity
public class Appointment {
    @ManyToOne
    @JoinColumn(name = "patient_id") // Creates FK column
    private Patient patient;
}

// 2. The Parent (Inverse Side)
@Entity
public class Patient {
    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL)
    private List<Appointment> appointments;
}
        `,
                explanation: 'The `@ManyToOne` side is generally the owning side. `mappedBy` on the parent tells Hibernate that the relationship is already managed by the `patient` field in the `Appointment` class.'
            }]
        },
        {
            title: '6. Advanced Concepts & Optimization',
            description: `
Optimizing Hibernate for production involves handling Cascades, Fetch Types, and the N+1 problem.

**Key Concepts:**
* **Cascading:** Propagating state changes (e.g., Deleting Parent deletes Child).
* **Orphan Removal:** Deleting a child just by removing it from the list.
* **Fetch Types:** Lazy (Load on demand) vs Eager (Load immediately).
`,
            exampleProblems: [
                'Solving the N+1 Select Problem',
                'Preventing accidental data loading (Lazy vs Eager)'
            ],
            solutions: [{
                problemTitle: 'Solving the N+1 Problem with JOIN FETCH',
                code: `
// BAD: Triggers 1 query for Patients + N queries for their Appointments
List<Patient> patients = repository.findAll();

// GOOD: Fetches Patients and Appointments in a SINGLE query
@Query("SELECT p FROM Patient p LEFT JOIN FETCH p.appointments")
List<Patient> findAllWithAppointments();
        `,
                explanation: 'The N+1 problem occurs when you fetch a list of parents, and then iterate to access their lazy-loaded children. `JOIN FETCH` solves this by retrieving the graph in one SQL statement.'
            }]
        },
        {
            title: '7. Service Layer & Transactions',
            description: `
The Service layer handles business logic and transaction boundaries.

**Features:**
* **@Transactional:** Ensures atomicity.
* **Dirty Checking:** Modifying an entity inside a transaction updates the DB without calling \`save()\`.
`,
            exampleProblems: [
                'Creating complex entities transactionally',
                'Updating data without explicit save calls'
            ],
            solutions: [{
                problemTitle: 'Transactional Appointment Creation',
                code: `
@Service
@RequiredArgsConstructor
public class AppointmentService {
    private final AppointmentRepository appointmentRepo;
    private final PatientRepository patientRepo;

    @Transactional
    public void createAppointment(Long patientId, Appointment appointment) {
        Patient patient = patientRepo.findById(patientId)
            .orElseThrow(() -> new RuntimeException("Patient not found"));
        
        // Establish bidirectional relationship
        appointment.setPatient(patient);
        patient.getAppointments().add(appointment);
        
        // Save (Cascade handles persistence if configured, otherwise save explicitly)
        appointmentRepo.save(appointment);
    }
}
        `,
                explanation: '`@Transactional` ensures that if any line fails, the entire operation (including the patient lookup and appointment save) is rolled back, maintaining database integrity.'
            }]
        },
        {
            title: '8. Performance Optimization: Batch Processing',
            description: `
By default, Hibernate executes one SQL statement per entity operation. Batch processing groups these operations to reduce network round-trips.

**Key Configuration (\`application.properties\`):**
* \`spring.jpa.properties.hibernate.jdbc.batch_size=50\`
* \`spring.jpa.properties.hibernate.order_inserts=true\`
* \`spring.jpa.properties.hibernate.order_updates=true\`

**Constraint:** Batching is automatically disabled if you use \`GenerationType.IDENTITY\`. You must use \`SEQUENCE\` or \`TABLE\` strategies for batch inserts to work.
`,
            exampleProblems: [
                'Inserting 10,000 records takes too long due to individual network calls',
                'Memory overflows during bulk processing'
            ],
            solutions: [{
                problemTitle: 'Bulk Insert with Batching',
                code: `
// 1. Entity configuration for Batching
@Entity
public class AuditLog {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "log_seq")
    @SequenceGenerator(name = "log_seq", sequenceName = "log_sequence", allocationSize = 50)
    private Long id;
    
    private String message;
}

// 2. Service Layer logic to flush batches to clear memory
@Transactional
public void saveLogs(List<AuditLog> logs) {
    int batchSize = 50;
    for (int i = 0; i < logs.size(); i++) {
        repository.save(logs.get(i));
        
        // Explicitly flush and clear to free up heap memory
        if (i > 0 && i % batchSize == 0) {
            entityManager.flush();
            entityManager.clear();
        }
    }
}
        `,
                explanation: 'We use `SEQUENCE` generation to allow Hibernate to pre-allocate IDs. The explicit `flush()` and `clear()` prevents the Persistence Context from growing indefinitely during large loops, avoiding `OutOfMemoryError`.'
            }]
        },
        {
            title: '9. Caching Strategies (L1 & L2)',
            description: `
Caching reduces database load by storing frequently accessed data in memory.

**Levels of Caching:**
1.  **L1 Cache (Session Level):** Enabled by default. Scoped to the transaction. Cannot be disabled.
2.  **L2 Cache (SessionFactory Level):** Shared across transactions/users. Requires external provider (Ehcache, Redis, Hazelcast).


`,
            exampleProblems: [
                'Repeatedly fetching static configuration data hits the DB every time',
                'Reducing read latency for high-traffic endpoints'
            ],
            solutions: [{
                problemTitle: 'Enabling L2 Cache with Ehcache',
                code: `
// 1. Add dependencies: hibernate-jcache, ehcache

// 2. Configure properties
// spring.jpa.properties.hibernate.cache.use_second_level_cache=true
// spring.jpa.properties.hibernate.cache.region.factory_class=jcache

// 3. Annotate Entity
@Entity
@Cacheable
@org.hibernate.annotations.Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class StaticConfig {
    @Id 
    private Long id;
    private String configKey;
    private String value;
}
        `,
                explanation: '`READ_WRITE` strategy is safe for data that changes occasionally. `READ_ONLY` is faster but throws an exception if you try to modify the entity.'
            }]
        },
        {
            title: '10. Concurrency Control: Locking',
            description: `
Handling multiple users modifying the same data simultaneously.

**Types:**
* **Optimistic Locking:** Uses a \`@Version\` column. No DB locks. Throws \`OptimisticLockException\` on conflict. Best for high read/low write.
* **Pessimistic Locking:** Uses Database row locks (\`SELECT ... FOR UPDATE\`). Blocks other transactions. Best for high contention.
`,
            exampleProblems: [
                'Lost Update Problem (Last commit wins)',
                'preventing double-booking in a ticket system'
            ],
            solutions: [{
                problemTitle: 'Pessimistic vs Optimistic Examples',
                code: `
// OPTIMISTIC LOCKING
@Entity
public class Ticket {
    @Id private Long id;
    
    @Version // Hibernate handles the check automatically
    private Integer version; 
}

// PESSIMISTIC LOCKING (Repository Level)
public interface TicketRepository extends JpaRepository<Ticket, Long> {
    
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT t FROM Ticket t WHERE t.id = :id")
    Optional<Ticket> findByIdWithLock(@Param("id") Long id);
}
        `,
                explanation: 'Use `@Version` for most cases. Use `PESSIMISTIC_WRITE` when you absolutely cannot afford a collision retry, such as financial ledger updates.'
            }]
        },
        {
            title: '11. Auditing',
            description: `
Automatically tracking "Who" created/modified a record and "When".
`,
            exampleProblems: [
                'Manually setting createdAt and updatedAt in every service method',
                'Standardizing compliance tracking'
            ],
            solutions: [{
                problemTitle: 'Spring Data JPA Auditing',
                code: `
// 1. Enable Auditing in Main Class
@EnableJpaAuditing(auditorAwareRef = "auditorProvider")
@SpringBootApplication
public class App { ... }

// 2. Create Entity Listener
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@Data
public abstract class Auditable {
    
    @CreatedDate
    @Column(updatable = false)
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;

    @CreatedBy
    private String createdBy;

    @LastModifiedBy
    private String lastModifiedBy;
}

// 3. Provide the "Current User"
@Component("auditorProvider")
public class AuditorAwareImpl implements AuditorAware<String> {
    @Override
    public Optional<String> getCurrentAuditor() {
        // Fetch user from Security Context
        return Optional.of(SecurityContextHolder.getContext().getAuthentication().getName());
    }
}
        `,
                explanation: 'By extending the `Auditable` class, all your entities automatically get tracking columns without polluting your business logic code.'
            }]
        }
    ],
    faqs: [
        {
            question: 'What is the "LazyInitializationException" and how do you fix it?',
            answer: 'It occurs when you try to access a Lazy-loaded collection (like `getAppointments()`) *after* the Hibernate Session has closed. **Fixes:** 1) Use `JOIN FETCH` in your query to load data eagerly. 2) keep the transaction open (not recommended for View layer). 3) Use EntityGraphs.'
        },
        {
            question: 'Difference between `save()` and `saveAndFlush()`?',
            answer: '`save()` keeps the change in memory (Persistent Context) and syncs with DB only at the end of the transaction. `saveAndFlush()` forces an immediate SQL execution, which is useful if subsequent logic relies on database triggers or if you need to catch constraint violations immediately.'
        },
        {
            question: 'How do you handle the "N+1 Select Problem"?',
            answer: 'This happens when fetching N entities triggers 1 query for the list and N separate queries for related children. **Solution:** Use `@Query("SELECT p FROM Patient p JOIN FETCH p.appointments")` or `@EntityGraph`.'
        },
        {
            question: 'Why utilize DTO Projections over Entities for read-only views?',
            answer: 'Entities are "expensive" because Hibernate tracks their state (Snapshots) for dirty checking. DTOs bypass the Persistence Context overhead, resulting in significantly lower memory usage and faster CPU processing for read-heavy operations.'
        },
        {
            question: 'Explain the difference between `getOne()` (now `getReferenceById`) and `findById()`.',
            answer: '`findById()` hits the database immediately and returns the actual Entity. `getReferenceById()` returns a **Proxy** (a placeholder) without hitting the DB. The DB is only hit when you access a property of that proxy. Useful for setting Foreign Keys without fetching the entire parent object.'
        }
    ]
};
