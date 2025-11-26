import { TheoryTopicData } from './types';

export const data: TheoryTopicData = {
    title: 'Apache Kafka: Event Streaming & System Design',
    description: 'A deep dive into distributed event streaming. Covers Kafka architecture (Brokers, Zookeeper/KRaft), Delivery Semantics (At-least-once vs Exactly-once), Consumer Groups, Partitioning strategies, and production-grade configuration.',
    sections: [
        {
            title: '1. Kafka Architecture & Core Concepts',
            content: `
**What is Kafka?**
A distributed event streaming platform capable of handling trillions of events a day. It acts as a central nervous system for data.

**Core Components:**
*   **Broker:** A single Kafka server. Receives and stores messages.
*   **Cluster:** A group of brokers working together.
*   **Topic:** A category or feed name to which records are stored. Analogous to a database table.
*   **Partition:** Topics are split into partitions for scalability. A partition is an ordered, immutable sequence of records.
*   **Offset:** A unique identifier for a record within a partition.
*   **Producer:** Publishes data to topics.
*   **Consumer:** Subscribes to topics and processes data.

**Zookeeper vs KRaft:**
*   **Zookeeper:** Historically used for cluster metadata management (controller election, topic config).
*   **KRaft (Kafka Raft Metadata mode):** Removes Zookeeper dependency. Metadata is stored in a Kafka topic. Simpler operations.

### Example Problems
- Designing a scalable log aggregation system
- Understanding how partitions enable parallelism

### Solutions

#### Topic Partitioning Visualization
\`\`\`text
Topic: "User-Clicks"
-----------------------
Partition 0: [0] [1] [2] [3] ... (Stored on Broker 1)
Partition 1: [0] [1] [2] ...     (Stored on Broker 2)
Partition 2: [0] [1] [2] [3] ... (Stored on Broker 3)
\`\`\`
Producers write to specific partitions (Round-robin or Key-based). Consumers read from partitions. Parallelism is limited by the number of partitions (e.g., if you have 3 partitions, you can have at most 3 active consumers in a group).
`
        },
        {
            title: '2. Delivery Semantics & Reliability',
            content: `
Guaranteeing message delivery is critical for financial or audit systems.

**Semantics:**
1.  **At-most-once:** Message might be lost, but never redelivered. (Fire and forget).
2.  **At-least-once:** Message is never lost, but might be redelivered. (Standard).
3.  **Exactly-once:** Message is delivered once and only once. (Transactional).

**Producer Acks:**
*   \`acks=0\`: Producer sends and doesn't wait. High throughput, high risk of loss.
*   \`acks=1\`: Leader broker acknowledges. Moderate safety.
*   \`acks=all\` (or \`-1\`): Leader and all In-Sync Replicas (ISR) acknowledge. Highest safety.

### Example Problems
- Configuring for Zero Data Loss
- Handling duplicate messages in consumers

### Solutions

#### Zero Data Loss Configuration
\`\`\`properties
# Producer Config
acks=all
retries=2147483647
enable.idempotence=true
max.in.flight.requests.per.connection=5 # (with idempotence)

# Broker Config
min.insync.replicas=2
replication.factor=3
unclean.leader.election.enable=false
\`\`\`
This configuration ensures that a message is considered "committed" only when it is written to multiple replicas, preventing data loss even if a broker crashes.
`
        },
        {
            title: '3. Consumer Groups & Rebalancing',
            content: `
**Consumer Group:**
A set of consumers working together to consume a topic.
*   **Load Balancing:** Partitions are assigned to members of the group.
*   **Scalability:** To scale processing, add more consumers to the group (up to the number of partitions).

**Rebalancing:**
The process of reassigning partitions when a consumer joins or leaves the group.
*   **Stop-the-world:** Historically, all consumption stopped during rebalance.
*   **Cooperative Rebalancing:** (Incremental) Only moves partitions that need to be moved, reducing downtime.

### Example Problems
- Why is my consumer idle?
- Handling "Consumer Lag"

### Solutions

#### Consumer Group Logic
\`\`\`text
Scenario: Topic T1 has 4 Partitions (P0, P1, P2, P3).

1. Start Consumer A (Group G1):
   - A reads P0, P1, P2, P3

2. Start Consumer B (Group G1):
   - Rebalance triggers.
   - A reads P0, P1
   - B reads P2, P3

3. Start Consumer C (Group G1):
   - A reads P0, P1
   - B reads P2
   - C reads P3

4. Start Consumer D, E (Group G1):
   - A->P0, B->P1, C->P2, D->P3
   - E is IDLE! (No partitions left)
\`\`\`
To utilize Consumer E, you must increase the number of partitions in the topic.
`
        },
        {
            title: '4. Kafka Streams & Connect',
            content: `
**Kafka Connect:**
Framework for connecting Kafka with external systems (Source & Sink).
*   **Source Connector:** Pulls data from DB (JDBC), S3, etc. into Kafka.
*   **Sink Connector:** Pushes data from Kafka to Elasticsearch, HDFS, etc.

**Kafka Streams:**
Client library for building real-time stream processing apps.
*   **Stateless:** Filter, Map.
*   **Stateful:** Count, Aggregate, Join (Windowing).
*   **KTable vs KStream:**
    *   **KStream:** Insert-only log (All events).
    *   **KTable:** Changelog stream (Latest value per key).

### Example Problems
- Real-time fraud detection
- Database Change Data Capture (CDC)

### Solutions

#### Word Count with Kafka Streams
\`\`\`java
KStream<String, String> textLines = builder.stream("TextLinesTopic");

KTable<String, Long> wordCounts = textLines
    .flatMapValues(textLine -> Arrays.asList(textLine.toLowerCase().split("\\\\W+")))
    .groupBy((key, word) -> word)
    .count(Materialized.as("Counts"));

wordCounts.toStream().to("WordsWithCountsTopic", Produced.with(Serdes.String(), Serdes.Long()));
\`\`\`
This concise code implements a real-time word count application that scales automatically with the Kafka cluster.
`
        },
        {
            title: '5. Advanced Configuration & Tuning',
            content: `
**Performance Tuning:**
*   **Batch Size:** Increasing \`batch.size\` and \`linger.ms\` improves throughput (more compression) but increases latency.
*   **Compression:** Use \`snappy\` or \`lz4\` for high throughput. \`zstd\` for high compression ratio.

**Log Compaction:**
Instead of deleting old logs by time, Kafka keeps the *latest* value for each key.
*   **Use Case:** Restoring state (e.g., current bank balance) without replaying full history.

### Example Problems
- Optimizing for High Throughput vs Low Latency
- Using Log Compaction for configuration topics

### Solutions

#### High Throughput Producer Config
\`\`\`properties
# Wait up to 20ms to group messages into a batch
linger.ms=20

# Max batch size (64KB)
batch.size=65536

# Compression
compression.type=snappy

# Buffer Memory (32MB)
buffer.memory=33554432
\`\`\`
By allowing a small delay (\`linger.ms\`), the producer can group more messages into a single network request, significantly increasing overall throughput.
`
        }
    ],
    faqs: [
        {
            question: 'What is the role of Zookeeper in Kafka?',
            answer: 'Zookeeper manages cluster metadata: Broker registration, Controller election, Topic configuration, and ACLs. **Note:** Kafka 3.x introduced **KRaft** mode (Kafka Raft), which removes the Zookeeper dependency, storing metadata in an internal Kafka topic for better scalability.'
        },
        {
            question: 'Explain "Consumer Lag".',
            answer: 'Lag is the difference between the latest offset produced to a partition and the latest offset processed by the consumer. High lag means the consumer is falling behind. **Causes:** Slow processing logic, insufficient consumers, or network issues.'
        },
        {
            question: 'What is an "In-Sync Replica" (ISR)?',
            answer: 'An ISR is a replica that is fully caught up with the leader. The Leader is always an ISR. If a follower falls too far behind (replica.lag.time.max.ms), it is removed from the ISR list. Only ISRs are eligible to be elected as new Leaders.'
        },
        {
            question: 'Difference between `acks=1` and `acks=all`?',
            answer: '**acks=1:** Leader writes the record and responds. If Leader crashes before replication, data is lost. **acks=all:** Leader waits for ALL ISRs to acknowledge. Guarantees no data loss as long as one ISR survives.'
        },
        {
            question: 'How does Kafka handle message ordering?',
            answer: 'Kafka guarantees ordering **only within a partition**. Messages sent with the same Key are always written to the same partition, ensuring strict ordering for that key. There is **no global ordering** across the entire topic.'
        },
        {
            question: 'What is "Log Compaction"?',
            answer: 'A cleanup policy where Kafka retains at least the last known value for each message key within the log of data for a single topic partition. It deletes older records with the same key. Useful for restoring state (e.g., user profiles).'
        },
        {
            question: 'Explain "Idempotent Producer".',
            answer: 'Ensures that messages are delivered exactly once to the broker, even if the producer retries due to network errors. It assigns a PID (Producer ID) and Sequence Number to each message. The broker deduplicates messages with the same PID/SeqNum.'
        },
        {
            question: 'What is the "Controller" broker?',
            answer: 'One broker in the cluster is elected as the Controller. It is responsible for administrative tasks: monitoring broker liveness, electing partition leaders, and managing replica transitions.'
        },
        {
            question: 'Push vs Pull model?',
            answer: 'Kafka uses a **Pull** model. Consumers request (poll) data from brokers. This allows consumers to control the flow rate (Backpressure) and prevents the broker from overwhelming slow consumers.'
        },
        {
            question: 'What is a "Dead Letter Queue" (DLQ)?',
            answer: 'A topic where messages that cannot be processed (after retries) are sent. This prevents a "poison pill" message from blocking the entire consumer pipeline. You can alert on and inspect the DLQ later.'
        },
        {
            question: 'Kafka vs RabbitMQ?',
            answer: '**Kafka:** Log-based. High throughput. Persistent (replayable). "Dumb broker, smart consumer". Best for Event Streaming. **RabbitMQ:** Queue-based. Low latency. Transient (messages removed after consumption). "Smart broker, dumb consumer". Best for complex routing/task queues.'
        },
        {
            question: 'How to handle "Poison Pill" messages?',
            answer: 'A message that crashes the consumer deserializer or logic. **Handling:** 1) Try-catch block in consumer. 2) Log the error. 3) Commit the offset to move past it. 4) Send the bad message to a Dead Letter Topic.'
        },
        {
            question: 'What is "Sticky Partitioner"?',
            answer: 'A producer strategy. Instead of round-robin for every message (which causes fragmentation), it sticks to a random partition for a batch of messages (or time duration). This fills batches faster, improving throughput and latency.'
        },
        {
            question: 'Explain "Consumer Rebalancing".',
            answer: 'When a consumer joins/leaves a group, the group coordinator (broker) reassigns partitions. **Eager Rebalance:** Stop-the-world. All consumers stop, revoke partitions, and rejoin. **Cooperative Rebalance:** Incremental. Only moves necessary partitions. Consumers keep processing unaffected partitions.'
        },
        {
            question: 'What is "Schema Registry"?',
            answer: 'A separate server (e.g., Confluent Schema Registry) that stores Avro/Protobuf schemas. Producers send only the Schema ID with the message (saving bandwidth). Consumers fetch the schema to deserialize. Enforces compatibility rules (Backward/Forward).'
        },
        {
            question: 'How to achieve "Exactly-Once Semantics" (EOS)?',
            answer: '1) **Idempotent Producer:** Prevents duplicates during production. 2) **Transactional API:** (`beginTransaction`, `commitTransaction`). Allows atomic writes to multiple topics (consume-process-produce loop). If the transaction aborts, consumers (configured with `isolation.level=read_committed`) ignore the messages.'
        },
        {
            question: 'What is "Backpressure" in Kafka?',
            answer: 'Since Kafka is Pull-based, backpressure is implicit. If a consumer is slow, it simply polls less frequently. The broker stores the data until the retention period expires. The consumer never gets overwhelmed.'
        },
        {
            question: 'Partition vs Segment?',
            answer: '**Partition:** Logical unit of parallelism. **Segment:** Physical file on disk (`.log`, `.index`). A partition is split into multiple segments. Old segments can be deleted/compacted based on retention policy.'
        },
        {
            question: 'What happens if `min.insync.replicas` is not met?',
            answer: 'The producer receives a `NotEnoughReplicasException`. It cannot write data. This protects durability (prevents writing to a single broker if you require 2). Consumers can still read existing data.'
        },
        {
            question: 'How to resize a topic (add partitions)?',
            answer: 'You can increase partitions, but it breaks key-ordering guarantees (Key X might hash to P1 before, and P2 after). **Solution:** Create a new topic with more partitions and run a streaming job to migrate data.'
        }
    ]
};
