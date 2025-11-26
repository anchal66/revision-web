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
            question: 'What is the "High Watermark" and "Log End Offset"?',
            answer: '**Log End Offset (LEO)** is the offset of the last message written to the log leader. **High Watermark (HW)** is the offset of the last message successfully replicated to all In-Sync Replicas. Consumers can only read up to the HW to ensure consistency.'
        },
        {
            question: 'Explain "Consumer Lag" and how to monitor it.',
            answer: 'Lag is the difference between the Producer\'s latest offset (LEO) and the Consumer\'s current offset. High lag means the consumer is falling behind. Monitor it using **Burrow**, **Prometheus/Grafana**, or **Confluent Control Center**.'
        },
        {
            question: 'How does Kafka handle "Split Brain" scenarios?',
            answer: 'Kafka uses a **Controller** (one of the brokers) elected via Zookeeper (or KRaft quorum) to manage state. Epoch numbers (Controller Epoch, Leader Epoch) are used to prevent zombie leaders from accepting writes. If a broker is cut off, it realizes its epoch is old and steps down.'
        },
        {
            question: 'What is Log Compaction?',
            answer: 'Log Compaction retains only the *latest* value for each key in the log, deleting older versions. This is useful for restoring state (e.g., a KTable or a database snapshot) without replaying the entire history.'
        },
        {
            question: 'Why is Zookeeper being replaced by KRaft?',
            answer: 'Zookeeper was an external dependency that added operational complexity and limited scalability (metadata bottleneck). **KRaft** embeds the Raft consensus protocol directly into Kafka brokers, allowing for a single binary, faster failover, and support for millions of partitions.'
        },
        {
            question: 'What is the difference between `auto.offset.reset` "earliest" vs "latest"?',
            answer: 'This setting determines behavior when a consumer starts but has no committed offset. **latest** (default): Read only new messages arriving after startup. **earliest**: Read all available history in the topic from the beginning.'
        },
        {
            question: 'How do you handle large messages (>1MB)?',
            answer: 'Kafka is optimized for small messages. For large ones: 1) Use **Compression** (Gzip/Zstd). 2) Increase `max.message.bytes` (broker) and `max.request.size` (producer). 3) **Claim Check Pattern**: Store payload in S3/Blob Store and send only the reference URL in Kafka.'
        }
    ]
};
