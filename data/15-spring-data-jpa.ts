import { TheoryTopicData } from './types';

export const data: TheoryTopicData = {
    title: 'Spring Data JPA: Advanced Guide & Senior Interview Prep',
    description: 'A comprehensive revision guide for Senior Software Engineers covering advanced Spring Data JPA concepts, performance tuning, architecture patterns, and critical interview questions.',
    sections: [
        {
            title: '1. Introduction & Architecture',
            content: `
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

### Example Problems
- Understanding the difference between Hibernate and Spring Data JPA
- Managing Entity Lifecycle States (Transient vs Persistent)

### Solutions

#### Visualizing the Entity Lifecycle
\`\`\`java
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
\`\`\`
Understanding these states is crucial for predicting when SQL queries (INSERT/UPDATE) are actually fired against the database.
`
        },
        {
            title: '2. Project Setup & Configuration',
            content: `
Setup for a Spring Boot project using PostgreSQL and Lombok.

**Key Dependencies:**
* \`spring-boot-starter-data-jpa\`
* \`postgresql\` (Driver)
* \`lombok\`

### Example Problems
- Configuring Database Connection
- Setting Hibernate DDL Auto modes

### Solutions

#### application.properties Configuration
\`\`\`properties
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
\`\`\`
This configuration connects the app to a local PostgreSQL instance and ensures the schema is updated automatically (\`ddl-auto=update\`) based on your Entity classes.
`
        },
        {
            title: '3. Entities & Basic Mapping',
            content: `
Entities represent database tables. This section covers basic annotations like \`@Entity\`, \`@Id\`, and \`@Column\`.

### Example Problems
- Mapping a Java class to a Database Table
- Handling Enums properly in Databases

### Solutions

#### Patient Entity Definition
\`\`\`java
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
\`\`\`
The \`@Entity\` annotation marks this class for persistence. \`@Enumerated(EnumType.STRING)\` is best practice for readability in the database compared to ordinal values.
`
        },
        {
            title: '4. Repositories & Querying Strategies',
            content: `
The \`JpaRepository\` interface provides built-in CRUD. You can extend this with Derived Queries, JPQL, Native SQL, and Projections.

### Example Problems
- Writing queries without SQL (Derived Methods)
- Optimizing reads with Projections (DTOs)
- Handling Pagination

### Solutions

#### Repository Pattern Examples
\`\`\`java
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
\`\`\`
Derived methods are great for simple queries. Use JPQL for complex object-oriented queries, and Projections/DTOs when you need to fetch only specific columns to save memory.
`
        },
        {
            title: '5. Entity Relationships (Mappings)',
            content: `
Defining how tables relate to one another is the core of ORM.

**Relationship Types:**
* **One-to-One:** Patient ↔ Insurance
* **One-to-Many:** Patient ↔ Appointment (The "Many" side usually owns the FK)
* **Many-to-Many:** Doctor ↔ Department (Requires a Join Table)

### Example Problems
- Mapping Parent-Child relationships
- Handling Join Tables

### Solutions

#### Mapping One-to-Many (Patient ↔ Appointment)
\`\`\`java
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
\`\`\`
The \`@ManyToOne\` side is generally the owning side. \`mappedBy\` on the parent tells Hibernate that the relationship is already managed by the \`patient\` field in the \`Appointment\` class.
`
        },
        {
            title: '6. Advanced Concepts & Optimization',
            content: `
Optimizing Hibernate for production involves handling Cascades, Fetch Types, and the N+1 problem.

**Key Concepts:**
* **Cascading:** Propagating state changes (e.g., Deleting Parent deletes Child).
* **Orphan Removal:** Deleting a child just by removing it from the list.
* **Fetch Types:** Lazy (Load on demand) vs Eager (Load immediately).

### Example Problems
- Solving the N+1 Select Problem
- Preventing accidental data loading (Lazy vs Eager)

### Solutions

#### Solving the N+1 Problem with JOIN FETCH
\`\`\`java
// BAD: Triggers 1 query for Patients + N queries for their Appointments
List<Patient> patients = repository.findAll();

// GOOD: Fetches Patients and Appointments in a SINGLE query
@Query("SELECT p FROM Patient p LEFT JOIN FETCH p.appointments")
List<Patient> findAllWithAppointments();
\`\`\`
The N+1 problem occurs when you fetch a list of parents, and then iterate to access their lazy-loaded children. \`JOIN FETCH\` solves this by retrieving the graph in one SQL statement.
`
        },
        {
            title: '7. Service Layer & Transactions',
            content: `
The Service layer handles business logic and transaction boundaries.

**Features:**
* **@Transactional:** Ensures atomicity.
* **Dirty Checking:** Modifying an entity inside a transaction updates the DB without calling \`save()\`.

### Example Problems
- Creating complex entities transactionally
- Updating data without explicit save calls

### Solutions

#### Transactional Appointment Creation
\`\`\`java
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
\`\`\`
\`@Transactional\` ensures that if any line fails, the entire operation (including the patient lookup and appointment save) is rolled back, maintaining database integrity.
`
        },
        {
            title: '8. Performance Optimization: Batch Processing',
            content: `
By default, Hibernate executes one SQL statement per entity operation. Batch processing groups these operations to reduce network round-trips.

**Key Configuration (\`application.properties\`):**
* \`spring.jpa.properties.hibernate.jdbc.batch_size=50\`
* \`spring.jpa.properties.hibernate.order_inserts=true\`
* \`spring.jpa.properties.hibernate.order_updates=true\`

**Constraint:** Batching is automatically disabled if you use \`GenerationType.IDENTITY\`. You must use \`SEQUENCE\` or \`TABLE\` strategies for batch inserts to work.

### Example Problems
- Inserting 10,000 records takes too long due to individual network calls
- Memory overflows during bulk processing

### Solutions

#### Bulk Insert with Batching
\`\`\`java
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
\`\`\`
We use \`SEQUENCE\` generation to allow Hibernate to pre-allocate IDs. The explicit \`flush()\` and \`clear()\` prevents the Persistence Context from growing indefinitely during large loops, avoiding \`OutOfMemoryError\`.
`
        },
        {
            title: '9. Caching Strategies (L1 & L2)',
            content: `
Caching reduces database load by storing frequently accessed data in memory.

**Levels of Caching:**
1.  **L1 Cache (Session Level):** Enabled by default. Scoped to the transaction. Cannot be disabled.
2.  **L2 Cache (SessionFactory Level):** Shared across transactions/users. Requires external provider (Ehcache, Redis, Hazelcast).

### Example Problems
- Repeatedly fetching static configuration data hits the DB every time
- Reducing read latency for high-traffic endpoints

### Solutions

#### Enabling L2 Cache with Ehcache
\`\`\`java
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
\`\`\`
\`READ_WRITE\` strategy is safe for data that changes occasionally. \`READ_ONLY\` is faster but throws an exception if you try to modify the entity.
`
        },
        {
            title: '10. Concurrency Control: Locking',
            content: `
Handling multiple users modifying the same data simultaneously.

**Types:**
* **Optimistic Locking:** Uses a \`@Version\` column. No DB locks. Throws \`OptimisticLockException\` on conflict. Best for high read/low write.
* **Pessimistic Locking:** Uses Database row locks (\`SELECT ... FOR UPDATE\`). Blocks other transactions. Best for high contention.

### Example Problems
- Lost Update Problem (Last commit wins)
- preventing double-booking in a ticket system

### Solutions

#### Pessimistic vs Optimistic Examples
\`\`\`java
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
\`\`\`
Use \`@Version\` for most cases. Use \`PESSIMISTIC_WRITE\` when you absolutely cannot afford a collision retry, such as financial ledger updates.
`
        },
        {
            title: '11. Auditing',
            content: `
Automatically tracking "Who" created/modified a record and "When".

### Example Problems
- Manually setting createdAt and updatedAt in every service method
- Standardizing compliance tracking

### Solutions

#### Spring Data JPA Auditing
\`\`\`java
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
\`\`\`
By extending the \`Auditable\` class, all your entities automatically get tracking columns without polluting your business logic code.
`
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
        },
        {
            question: '6. What is the difference between `@JoinColumn` and `@MappedBy`?',
            answer: '`@JoinColumn` is used on the **Owning Side** (usually the child) to specify the actual Foreign Key column in the table. `@MappedBy` is used on the **Inverse Side** (parent) to tell Hibernate: "I don\'t own this relationship; look at the field X in the other class to see how it\'s mapped." If you miss `@MappedBy`, Hibernate will create a redundant Join Table.'
        },
        {
            question: '7. How does the `@Transactional` annotation work internally?',
            answer: 'It uses **Spring AOP (Aspect Oriented Programming)**. Spring creates a proxy around your class. When you call a method, the proxy intercepts the call, opens a database transaction (via `TransactionManager`), executes your code, and then commits (or rolls back if a RuntimeException occurs).'
        },
        {
            question: '8. What is the difference between `First Level Cache` and `Second Level Cache`?',
            answer: '**L1 Cache:** Associated with the `Session` (Transaction). Enabled by default. Ensures that if you request the same entity ID twice in one transaction, the DB is hit only once. **L2 Cache:** Associated with the `SessionFactory` (Application). Disabled by default. Shared across all users/transactions. Requires a provider like Ehcache or Redis.'
        },
        {
            question: '9. Explain `CascadeType.ALL` vs `CascadeType.PERSIST`.',
            answer: '**PERSIST:** Only propagates the save operation. If you save the parent, the child is saved. **ALL:** Propagates everything: Persist, Merge (Update), Remove (Delete), Refresh, and Detach. Use `ALL` carefully, especially with `REMOVE`, to avoid accidental mass deletions.'
        },
        {
            question: '10. What is "Orphan Removal"?',
            answer: '`orphanRemoval = true` ensures that if you remove a child entity from the parent\'s list (e.g., `parent.getChildren().remove(child)`), Hibernate automatically deletes that child from the database. Without this, the child would just become "orphaned" (FK set to null) but remain in the DB.'
        },
        {
            question: '11. How do you handle "OptimisticLockException"?',
            answer: 'This exception occurs when two users try to update the same record simultaneously, and the version numbers mismatch. **Handling:** 1) Catch the exception and retry the operation (automatic retry logic). 2) Show an error to the user asking them to refresh the data and try again.'
        },
        {
            question: '12. What are "Entity Graphs" and when to use them?',
            answer: 'Entity Graphs allow you to define a graph of associated entities that should be retrieved in a single query. It is a dynamic way to solve N+1 problems, allowing you to override the default `Lazy` fetch type for specific queries without changing the global Entity configuration.'
        },
        {
            question: '13. Difference between `CrudRepository`, `PagingAndSortingRepository`, and `JpaRepository`?',
            answer: '**CrudRepository:** Basic CRUD (save, findById, delete). **PagingAndSortingRepository:** Adds `findAll(Pageable)` and `findAll(Sort)`. **JpaRepository:** Extends both, adding JPA-specific features like `flush()`, `saveAndFlush()`, and batch deletion. Always use `JpaRepository` unless you want to restrict functionality.'
        },
        {
            question: '14. What is the purpose of `@Modifying` annotation?',
            answer: 'It tells Spring Data JPA that the query is an UPDATE or DELETE operation, not a SELECT. It is required for any JPQL/Native query that modifies data. Often used with `@Transactional`.'
        },
        {
            question: '15. How to execute a Stored Procedure using Spring Data JPA?',
            answer: 'You can use the `@Procedure` annotation on a repository method. Example: `@Procedure(procedureName = "calculate_tax") int calculateTax(int income);`. Alternatively, use `@NamedStoredProcedureQuery` on the Entity.'
        },
        {
            question: '16. What is the "Open Session In View" (OSIV) pattern? Is it good or bad?',
            answer: 'OSIV keeps the Hibernate Session open during the View rendering phase (Controller/JSP/JSON serialization). **Pros:** Prevents `LazyInitializationException` easily. **Cons:** Keeps DB connection held longer than necessary, reducing throughput. Can cause N+1 queries during serialization. Best practice is to disable it (`spring.jpa.open-in-view=false`) and use DTOs.'
        },
        {
            question: '17. How does Hibernate "Dirty Checking" work?',
            answer: 'When an entity is loaded into the Persistence Context, Hibernate keeps a snapshot of its initial state. At flush time, it compares the current state of the object with the snapshot. If any field has changed, it automatically generates an UPDATE SQL statement. No explicit `save()` call is needed.'
        },
        {
            question: '18. What is the difference between `GenerationType.IDENTITY` and `SEQUENCE`?',
            answer: '**IDENTITY:** Relies on auto-increment columns (MySQL, SQL Server). Disables JDBC Batching because Hibernate needs the ID immediately after insert. **SEQUENCE:** Uses a database sequence (PostgreSQL, Oracle). Allows Hibernate to pre-fetch IDs, enabling efficient JDBC Batch inserts.'
        },
        {
            question: '19. How to handle multiple Data Sources (Databases) in one Spring Boot app?',
            answer: 'You need to configure multiple `DataSource`, `EntityManagerFactory`, and `TransactionManager` beans. You separate them by packages (e.g., `com.app.db1` uses TM1, `com.app.db2` uses TM2) using `@EnableJpaRepositories(basePackages = "...", transactionManagerRef = "...")`.'
        },
        {
            question: '20. What is a "Composite Key" and how to map it?',
            answer: 'A Primary Key made of multiple columns. **Mapping:** 1) Create a class (e.g., `OrderId`) implementing `Serializable` with the key fields. 2) Annotate it with `@Embeddable`. 3) Use `@EmbeddedId` in the main Entity. Alternatively, use `@IdClass`.'
        }
    ]
};
