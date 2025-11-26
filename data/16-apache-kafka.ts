export const data = {
    title: 'Apache Kafka: The Definitive Senior Engineer Guide',
    description: 'A deep-dive reference for Senior Software Engineers covering Kafka internals (Zero-Copy, Page Cache), advanced tuning, Exactly-Once semantics, Schema Registry, and production-grade Spring Boot patterns.',
    patterns: [
        {
            title: '1. Architecture & Internals (Deep Dive)',
            description: `
Beyond the basics of Brokers and Topics, understanding Kafka's physical storage and replication is key for system design interviews.

**Physical Storage:**
*   **Log Segments:** Topics are partitioned, and partitions are split into **Segments** (files on disk).
*   **Sequential I/O:** Kafka relies heavily on sequential disk writes (append-only logs), which are ~1000x faster than random writes.
*   **Page Cache:** Kafka avoids JVM heap for data storage. It uses the OS **Page Cache** (RAM) to cache active log segments. This prevents GC pauses and allows "warm" restarts.
*   **Zero-Copy:** Kafka uses the Linux \`sendfile\` system call to transfer data directly from the File System Cache to the Network Socket, bypassing the Application (JVM) memory entirely. This is why Kafka is so fast.

**Replication Protocol:**
*   **Leader:** Handles all Reads and Writes for a partition.
*   **Follower:** Passively replicates data from the Leader.
*   **ISR (In-Sync Replicas):** The set of replicas that are fully caught up with the leader. Only members of the ISR are eligible to become the new leader if the current one fails.
*   **High Watermark:** The offset of the last message successfully replicated to all ISRs. Consumers can only read up to this point.
`,
            exampleProblems: [
                'Why is Kafka fast even with disk storage?',
                'What happens when a Leader fails?'
            ],
            solutions: [{
                problemTitle: 'Zero-Copy Visualization',
                code: `
// Traditional Read/Write (4 Context Switches, 2 CPU Copies)
// Disk -> Kernel Buffer -> User Buffer (App) -> Kernel Socket Buffer -> NIC

// Kafka Zero-Copy (2 Context Switches, 0 CPU Copies)
// Disk -> Kernel Buffer -> NIC
// Uses java.nio.channels.FileChannel.transferTo()
        `,
                explanation: 'By bypassing the JVM heap, Kafka reduces CPU load and Garbage Collection overhead, allowing it to saturate network bandwidth.'
            }]
        },
        {
            title: '2. Delivery Semantics & Transactions',
            description: `
Guarantees on message delivery are critical for data integrity.

**Semantics:**
1.  **At-most-once:** Message might be lost, but never duplicated. (Ack=0).
2.  **At-least-once (Default):** Message is never lost, but might be duplicated. (Ack=all, Retries > 0).
3.  **Exactly-once (EOS):** Message is processed exactly once, even if producers retry or consumers crash.

**Transactional API (Read-Process-Write):**
Allows a consumer to read a message, process it, and write a result to another topic atomically.
`,
            exampleProblems: [
                'Implementing a financial transfer system',
                'Deduplicating stream processing results'
            ],
            solutions: [{
                problemTitle: 'Enabling Exactly-Once Semantics (EOS)',
                code: `
// PRODUCER CONFIG
// spring.kafka.producer.transaction-id-prefix=tx-
// spring.kafka.producer.acks=all
// spring.kafka.producer.enable-idempotence=true

// CONSUMER CONFIG
// spring.kafka.consumer.isolation-level=read_committed

@Service
public class TransferService {
    
    @Transactional("kafkaTransactionManager")
    public void processTransfer(TransferEvent event) {
        // 1. Read (Implicit via @KafkaListener)
        
        // 2. Process (Update DB)
        accountRepository.debit(event.getFrom(), event.getAmount());
        accountRepository.credit(event.getTo(), event.getAmount());
        
        // 3. Write (Publish Result)
        kafkaTemplate.send("transfer-completed", new CompletedEvent(event.getId()));
        
        // If any step fails, the "transfer-completed" message is never visible 
        // to consumers with isolation.level=read_committed.
    }
}
        `,
                explanation: 'Transactions ensure that the database update and the Kafka message production happen atomically. If the DB commit fails, the Kafka message is aborted (marked as a control batch) and ignored by downstream consumers.'
            }]
        },
        {
            title: '3. Consumer Group Rebalancing',
            description: `
Rebalancing is the process of reassigning partitions to consumers when the group membership changes (new consumer joins, existing one crashes).

**Rebalance Strategies:**
1.  **Eager Rebalancing (Default - Old):** "Stop the world". All consumers stop fetching, give up their partitions, and rejoin. High latency.
2.  **Cooperative Rebalancing (Incremental):** Consumers only give up partitions that *need* to be moved. Processing continues for other partitions.

**Static Membership:**
By setting \`group.instance.id\`, a consumer identifies itself. If it restarts quickly (within \`session.timeout.ms\`), the broker knows it's the same member and avoids a rebalance.
`,
            exampleProblems: [
                'Reducing latency spikes during deployments',
                'Handling rolling restarts without rebalancing storms'
            ],
            solutions: [{
                problemTitle: 'Configuring Static Membership & Cooperative Sticky Assignor',
                code: `
spring:
  kafka:
    consumer:
      properties:
        # Enable Cooperative Rebalancing
        partition.assignment.strategy: org.apache.kafka.clients.consumer.CooperativeStickyAssignor
        
        # Static Membership (Must be unique per instance, e.g., from K8s pod name)
        group.instance.id: \${HOSTNAME} 
        
        # Increase timeout to allow for quick restarts without rebalance
        session.timeout.ms: 45000
        `,
                explanation: 'Static membership is a game-changer for Kubernetes deployments. It prevents unnecessary rebalances when a pod restarts, as long as it comes back before the session timeout.'
            }]
        },
        {
            title: '4. Performance Tuning: Throughput vs Latency',
            description: `
Optimizing Kafka requires balancing Throughput (Batching) and Latency (Real-time).

**Producer Tuning:**
*   \`batch.size\`: Max bytes per batch (e.g., 64KB). Larger = Higher Throughput.
*   \`linger.ms\`: Wait time to fill batch (e.g., 10ms). Higher = Higher Throughput, Higher Latency.
*   \`compression.type\`: \`lz4\` or \`zstd\` (High compression, low CPU). Reduces network/disk usage.

**Consumer Tuning:**
*   \`fetch.min.bytes\`: Min bytes to wait for from broker.
*   \`max.poll.records\`: Max records returned in one poll. Lower this if processing takes too long to avoid timeouts.
`,
            exampleProblems: [
                'Optimizing for high-volume logs (Throughput)',
                'Optimizing for real-time trading data (Latency)'
            ],
            solutions: [{
                problemTitle: 'High Throughput Configuration',
                code: `
spring:
  kafka:
    producer:
      # Batching
      batch-size: 65536 # 64KB
      linger-ms: 20 # Wait up to 20ms to fill batch
      
      # Compression
      compression-type: lz4
      
      # Parallelism
      buffer-memory: 33554432 # 32MB buffer
    consumer:
      # Fetching
      fetch-min-size: 1024 # Wait for at least 1KB
      max-poll-records: 500
        `,
                explanation: 'This config favors throughput by allowing the producer to wait slightly (`linger.ms`) to group messages into larger compressed batches, reducing network overhead.'
            }]
        },
        {
            title: '5. Schema Registry & Avro',
            description: `
In production, sending plain JSON is risky (no schema validation) and inefficient (verbose).

**Schema Registry:**
A separate server that stores versioned schemas (Avro/Protobuf). Producers validate messages against the registry before sending.

**Avro:**
Binary serialization format. Compact and fast. Supports schema evolution (Backward/Forward compatibility).

**Compatibility Modes:**
*   **Backward:** New schema can read old data. (Add optional field).
*   **Forward:** Old schema can read new data. (Delete optional field).
*   **Full:** Both ways.
`,
            exampleProblems: [
                'Preventing "Bad Data" from polluting topics',
                'Managing API contract changes between teams'
            ],
            solutions: [{
                problemTitle: 'Spring Boot with Avro',
                code: `
# 1. Dependencies: kafka-avro-serializer, avro

# 2. Config
spring:
  kafka:
    properties:
      schema.registry.url: http://localhost:8081
    producer:
      key-serializer: org.apache.kafka.common.serialization.StringSerializer
      value-serializer: io.confluent.kafka.serializers.KafkaAvroSerializer
    consumer:
      value-deserializer: io.confluent.kafka.serializers.KafkaAvroDeserializer
      properties:
        specific.avro.reader: true # Use specific generated Java classes

# 3. Usage
// The 'User' class is auto-generated from user.avsc file
kafkaTemplate.send("users", new User("John", 30));
        `,
                explanation: 'Using Avro ensures that if a producer tries to send a message with a missing required field or wrong type, it fails immediately at the client side, protecting the data quality of the topic.'
            }]
        },
        {
            title: '6. Advanced Error Handling: Retry Topics',
            description: `
A robust pattern for handling processing failures without blocking the main topic.

**The Pattern:**
1.  **Main Topic:** Happy path.
2.  **Retry Topic:** Transient failures (Network blip). Consumer retries with backoff.
3.  **DLQ (Dead Letter Queue):** Permanent failures (Poison Pill). Manual intervention.

**Non-Blocking Retries:**
Spring Kafka supports "Non-Blocking Retries" where failed messages are forwarded to a separate retry topic with a timestamp, allowing the consumer to process the next message immediately.
`,
            exampleProblems: [
                'Handling 3rd party API rate limits',
                'Processing a stream where 1% of messages fail'
            ],
            solutions: [{
                problemTitle: 'Non-Blocking Retry Configuration',
                code: `
@Bean
public DefaultErrorHandler errorHandler(KafkaTemplate<String, Object> template) {
    // Backoff: 1s, 2s, 4s
    ExponentialBackOffWithMaxRetries backOff = new ExponentialBackOffWithMaxRetries(3);
    backOff.setInitialInterval(1000L);
    backOff.setMultiplier(2.0);
    
    // Recoverer: Publish to DLQ after retries exhaust
    DeadLetterPublishingRecoverer recoverer = new DeadLetterPublishingRecoverer(template);
    
    return new DefaultErrorHandler(recoverer, backOff);
}

// For truly non-blocking (separate topics), use @RetryableTopic annotation
@RetryableTopic(
    attempts = "4",
    backoff = @Backoff(delay = 1000, multiplier = 2.0),
    dltStrategy = DltStrategy.FAIL_ON_ERROR
)
@KafkaListener(topics = "orders")
public void listen(Order order) {
    // ...
}
        `,
                explanation: '`@RetryableTopic` automatically creates retry topics (orders-retry-1000, orders-retry-2000) and manages the flow, keeping the main partition unblocked.'
            }]
        },
        {
            title: '7. Kafka Streams & Connect',
            description: `
The Kafka ecosystem extends beyond simple Pub/Sub.

**Kafka Connect:**
Framework for connecting Kafka with external systems (DBs, S3, Elasticsearch).
*   **Source Connector:** DB -> Kafka (CDC - Change Data Capture).
*   **Sink Connector:** Kafka -> S3/Elasticsearch.

**Kafka Streams:**
Client library for building stateful streaming applications.
*   **KStream:** Stateless record stream.
*   **KTable:** Changelog stream (updates to a key).
*   **State Store:** Local RocksDB instance for aggregations (Count, Sum, Join).
`,
            exampleProblems: [
                'Real-time analytics (Count events per minute)',
                'Syncing legacy database with microservices'
            ],
            solutions: [{
                problemTitle: 'Kafka Streams: Word Count',
                code: `
@Bean
public KStream<String, String> kStream(StreamsBuilder builder) {
    KStream<String, String> stream = builder.stream("input-topic");
    
    stream.flatMapValues(value -> Arrays.asList(value.toLowerCase().split("\\\\W+")))
          .groupBy((key, word) -> word)
          .count(Materialized.as("counts-store"))
          .toStream()
          .to("word-counts");
          
    return stream;
}
        `,
                explanation: 'This concise code defines a topology that reads text, splits it into words, groups by word, counts occurrences using a local state store, and writes the running counts to an output topic.'
            }]
        }
    ],
    faqs: [
        {
            question: '1. What is the difference between RabbitMQ and Kafka?',
            answer: '**RabbitMQ** is a traditional message broker (Smart Broker, Dumb Consumer) that pushes messages to consumers and tracks their state. It is best for complex routing and low throughput. **Kafka** is a distributed event streaming platform (Dumb Broker, Smart Consumer) where consumers pull messages. Kafka persists messages on disk (Distributed Commit Log), allowing for replayability and massive throughput (millions of events/sec).'
        },
        {
            question: '2. Explain the role of Zookeeper in Kafka. Why is it being removed (KRaft)?',
            answer: 'Historically, **Zookeeper** managed cluster metadata (Topic configuration, ACLs) and Leader Election (Controller selection). It was a bottleneck because all metadata writes had to go through it. **KRaft (Kafka Raft)** removes this dependency by embedding the Raft consensus protocol directly into Kafka brokers. This simplifies deployment (one binary), improves scalability (millions of partitions), and speeds up recovery times.'
        },
        {
            question: '3. What are "In-Sync Replicas" (ISR) and why do they matter?',
            answer: 'An **ISR** is a replica that is fully caught up with the Leader partition. Only a member of the ISR is eligible to be elected as a new Leader if the current Leader fails. If you set `min.insync.replicas=2` and only 1 replica is alive, the broker will reject writes (`acks=all`) to prevent data loss, trading availability for consistency.'
        },
        {
            question: '4. How does Kafka guarantee message ordering?',
            answer: 'Kafka guarantees ordering **only within a partition**, not across the entire topic. If you need strict ordering for a specific entity (e.g., all events for User ID 123), you must use that entity ID as the **Message Key**. Kafka hashes the key to ensure all messages with the same key go to the same partition.'
        },
        {
            question: '5. What is "Consumer Lag" and how do you monitor/fix it?',
            answer: '**Consumer Lag** is the difference between the latest offset in the partition (High Watermark) and the offset the consumer has processed. High lag means the consumer is falling behind. **Fixes:** 1) Add more consumers (up to the number of partitions). 2) Optimize consumer logic (processing time). 3) Tune `max.poll.records`. **Monitoring:** Use tools like Burrow, Prometheus (JMX Exporter), or Confluent Control Center.'
        },
        {
            question: '6. Explain "Exactly-Once Semantics" (EOS) in Kafka.',
            answer: 'EOS ensures that a message is processed exactly once, even in the event of failures. It requires two parts: 1) **Idempotent Producer:** Assigns sequence numbers to batches so the broker can deduplicate retries. 2) **Transactional API:** Allows writing to multiple topics and offsets atomically (`read-process-write`). Consumers must be configured with `isolation.level=read_committed` to ignore aborted transactions.'
        },
        {
            question: '7. What happens if a Consumer crashes? (Rebalancing)',
            answer: 'When a consumer stops sending heartbeats (session timeout), the Group Coordinator triggers a **Rebalance**. Partitions assigned to the dead consumer are reassigned to other active members. During a default "Eager" rebalance, all consumers stop processing ("Stop the World"). **Cooperative Rebalancing** (Incremental) fixes this by only moving the necessary partitions, keeping the rest active.'
        },
        {
            question: '8. What is "Log Compaction"?',
            answer: 'Standard retention deletes old logs based on time (e.g., 7 days) or size. **Log Compaction** retains the *latest* value for every message key, deleting older versions of that key. This is ideal for restoring state (e.g., a KTable, User Profile cache) because the consumer only needs to read the final state, not the entire history of updates.'
        },
        {
            question: '9. How do you handle "Poison Pill" messages?',
            answer: 'A Poison Pill is a malformed message that causes the consumer to crash or throw an exception repeatedly. Since Kafka doesn\'t delete the message, the consumer restarts, reads the same message, and crashes again (infinite loop). **Solution:** Configure a `DefaultErrorHandler` with a `DeadLetterPublishingRecoverer`. After N retries, the message is moved to a **Dead Letter Topic (DLT)** for manual inspection, allowing the consumer to skip it and proceed.'
        },
        {
            question: '10. What is the difference between `acks=0`, `acks=1`, and `acks=all`?',
            answer: '**acks=0:** Producer sends and doesn\'t wait. Fastest, highest risk of data loss. **acks=1:** Leader acknowledges write. Data is lost if Leader crashes before replicating. **acks=all (or -1):** Leader AND all In-Sync Replicas acknowledge. Highest durability, slowest latency. Required for financial data.'
        },
        {
            question: '11. How does Kafka achieve high throughput (Zero-Copy)?',
            answer: 'Kafka uses the Linux `sendfile` system call (Zero-Copy). This transfers data directly from the **OS Page Cache** to the **Network Socket**, bypassing the JVM Heap entirely. This reduces CPU context switches and Garbage Collection overhead. Additionally, Kafka relies on **Sequential I/O** (append-only logs), which is significantly faster than random disk access.'
        },
        {
            question: '12. What is the "High Watermark"?',
            answer: 'The **High Watermark (HW)** is the offset of the last message that has been successfully replicated to all In-Sync Replicas. Consumers can only read up to the HW. This prevents "Uncommitted Reads" where a consumer reads a message from the Leader, but the Leader crashes and the message is lost because it wasn\'t replicated.'
        },
        {
            question: '13. Can you have more Consumers than Partitions?',
            answer: 'No (in the same Consumer Group). If you have 10 partitions and 15 consumers, 5 consumers will be **Idle** (Starving). Each partition can be consumed by only ONE consumer per group to guarantee ordering. To scale consumption, you must increase the number of partitions.'
        },
        {
            question: '14. What is a "Sticky Partitioner"?',
            answer: 'In older versions, the producer used Round-Robin, sending one message to P1, next to P2, etc. This caused high fragmentation and small batches. The **Sticky Partitioner** sticks to a specific partition for a duration (or until the batch is full) before switching. This increases batch efficiency and throughput without sacrificing load balancing over time.'
        },
        {
            question: '15. How do you upgrade a Kafka Cluster with zero downtime?',
            answer: 'Perform a **Rolling Restart**. 1) Update the config/binary on Broker 1. 2) Restart Broker 1. The Controller will move leadership to other replicas. 3) Wait for Broker 1 to rejoin the ISR. 4) Repeat for Broker 2, etc. This ensures the cluster remains available throughout the process.'
        },
        {
            question: '16. What is the difference between `auto.offset.reset` "earliest" vs "latest"?',
            answer: 'This config determines what a consumer does when it starts up and finds NO existing committed offset (e.g., new group). **latest (Default):** Ignore history, read only new messages arriving from now on. **earliest:** Go back to the beginning of the log and read everything. Critical for replaying data.'
        },
        {
            question: '17. What is the `__consumer_offsets` topic?',
            answer: 'It is an internal Kafka topic that stores the committed offsets for every consumer group. When a consumer commits an offset, a message is written to this topic. The key is `[group_id, topic, partition]` and the value is the offset. It is compacted by default to keep only the latest offset.'
        },
        {
            question: '18. Explain "Rack Awareness" in Kafka.',
            answer: 'Rack Awareness ensures that replicas of the same partition are spread across different physical racks or availability zones. If a rack fails, data is not lost because a replica exists on another rack. It is configured using `broker.rack` and ensures higher availability and durability.'
        },
        {
            question: '19. What is "Unclean Leader Election"?',
            answer: 'If the Leader fails and NO In-Sync Replicas (ISR) are available, Kafka can choose to elect an out-of-sync replica as the new Leader. This preserves availability but causes **Data Loss** (messages not yet replicated to that follower are lost). Controlled by `unclean.leader.election.enable` (Default: false).'
        },
        {
            question: '20. How do you handle large messages (>1MB) in Kafka?',
            answer: 'Kafka is optimized for small messages (1-10KB). For large messages: 1) **Compression:** Use Gzip/Zstd/Snappy. 2) **Configuration:** Increase `message.max.bytes` (Broker) and `max.request.size` (Producer). 3) **Claim Check Pattern:** Store the large payload in S3/Blob Store and send only the reference URL in the Kafka message.'
        },
        {
            question: '21. What is the difference between "Compaction" and "Deletion" retention policies?',
            answer: '**Deletion (Default):** Discards old segments based on time (`log.retention.hours`) or size (`log.retention.bytes`). **Compaction:** Retains the *latest* value for each key indefinitely. Useful for restoring state (e.g., user profiles) where intermediate updates don\'t matter, only the final state does.'
        },
        {
            question: '22. Explain the "Controller" node in a Kafka Cluster.',
            answer: 'The Controller is a broker responsible for administrative tasks: maintaining the list of active brokers, electing partition leaders, and managing topic creation/deletion. In Zookeeper mode, one broker is elected Controller. In KRaft mode, a Quorum Controller manages metadata.'
        },
        {
            question: '23. What are "Partition Assignment Strategies"?',
            answer: 'They determine how partitions are assigned to consumers in a group. 1) **Range:** Assigns contiguous ranges of partitions (good for co-partitioned topics). 2) **RoundRobin:** Distributes evenly (good for general load balancing). 3) **Sticky:** Minimizes movement during rebalances. 4) **CooperativeSticky:** Incremental rebalancing to avoid "stop-the-world" pauses.'
        },
        {
            question: '24. How does Kafka support Multi-Tenancy (Quotas)?',
            answer: 'Kafka enforces quotas to prevent a single client from monopolizing resources. Quotas can be set on **Network Bandwidth** (bytes/sec) and **Request Rate** (CPU percentage). They can be applied per User, Client ID, or both.'
        },
        {
            question: '25. What is the role of the "Schema Registry"?',
            answer: 'It acts as a central repository for schemas (Avro/Protobuf). Producers register schemas, and Consumers retrieve them. It enforces **Compatibility Rules** (Backward/Forward) to prevent "Bad Data" (e.g., missing fields) from breaking consumers. It decouples schema evolution from code changes.'
        },
        {
            question: '26. How does an Idempotent Producer work internally?',
            answer: 'The broker assigns a **Producer ID (PID)** to each producer. The producer assigns a **Sequence Number** to each message batch. The broker tracks the last committed sequence number for that PID. If it receives a batch with a sequence number <= last committed, it treats it as a duplicate and discards it (Ack).'
        },
        {
            question: '27. What is "Kafka Connect" and when should you use it?',
            answer: 'Kafka Connect is a framework for streaming data between Kafka and external systems (DBs, S3, ES). Use it for **Integration** (moving data) rather than writing custom Producer/Consumer code. It handles scalability, offset management, and error handling out-of-the-box.'
        },
        {
            question: '28. Explain "Page Cache" and why Kafka uses it.',
            answer: 'Kafka relies on the OS **Page Cache** (RAM) to store log segments. Writes go to the Page Cache (fast), and the OS flushes them to disk asynchronously. Reads often come directly from Page Cache (RAM speed). This avoids double buffering (JVM Heap + OS Cache) and reduces GC overhead.'
        }
    ]
};
