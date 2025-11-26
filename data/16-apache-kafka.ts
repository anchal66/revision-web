import { TheoryTopicData } from './types';

export const data: TheoryTopicData = {
    title: 'Apache Kafka: Event Streaming & System Design',
    description: 'A comprehensive documentation of Apache Kafka, covering distributed event streaming concepts, architecture, and a hands-on guide to Spring Boot integration with Confluent Cloud.',
    sections: [
        {
            title: '1. Introduction & Core Concepts',
            content: `
Apache Kafka is an open-source distributed event streaming platform designed to handle high-volume, real-time data feeds.

**Core Characteristics:**
*   **Distributed:** Runs on multiple servers (Brokers) to provide scalability and fault tolerance.
*   **Event Streaming:** Captures data in real-time from event sources (like databases, sensors, mobile devices) and processes it instantaneously.

### Why use Kafka? (The Problem it Solves)
In a traditional synchronous system (e.g., REST APIs), services are tightly coupled.

**Scenario:** A user "Likes" a post. The "Like Service" calls the "Notification Service" directly.

**Issues:**
1.  If the Notification Service goes down, the data is lost or the Like Service fails.
2.  If traffic spikes (e.g., 1 million likes/sec), the Notification Service might crash under load.

**Kafka Solution:** Acts as a buffer/broker. The "Like Service" (Producer) pushes events to Kafka. The "Notification Service" (Consumer) reads them at its own pace. This achieves **Decoupling**, **Asynchronicity**, and **High Throughput**.
`
        },
        {
            title: '2. Kafka Architecture',
            content: `
### 2.1 Basic Terminologies
*   **Broker:** A single Kafka server. A Cluster is a group of brokers working together.
*   **Topic:** A category or feed name to which records are stored (similar to a Table in a database).
*   **Zookeeper:** Manages the cluster health and metadata (keeping track of brokers, leaders, etc.). *Note: Modern Kafka uses KRaft mode to remove this dependency.*
*   **Producer:** Application that publishes (writes) data to topics.
*   **Consumer:** Application that subscribes to (reads) data from topics.

### 2.2 Partitions & Offsets
*   **Partition:** A topic is split into multiple parts called Partitions to allow data to be distributed across multiple brokers for parallel processing.
*   **Offset:** A unique, immutable integer sequence number assigned to each message within a partition. It acts as an ID for the message.

**Key Rule on Ordering:**
*   **Within a Partition:** Ordering is guaranteed.
*   **Across a Topic:** Ordering is NOT guaranteed.
`
        },
        {
            title: '3. Data Distribution & Ordering',
            content: `
### 3.1 Producing Messages (Key vs. No Key)
How does Kafka decide which partition a message goes to?

*   **Without Key:** Data is sent in a Round-Robin fashion (Partition 0 -> Partition 1 -> Partition 2).
    *   *Result:* Load is balanced, but no ordering guarantee.
*   **With Key (e.g., user_id):** Kafka hashes the key. All messages with the same key always go to the same partition.
    *   *Result:* Ordering is guaranteed for that specific key.

### 3.2 Consumer Groups
A Consumer Group consists of multiple consumers working together to consume a topic.
*   **Partition Assignment:** Kafka ensures that one partition is consumed by only one consumer within a group at any given time.
*   **Scalability:** To scale up processing, you add more consumers to the group (up to the number of partitions).

### 3.3 Internal Storage (Segments & Logs)
*   **Commit Log:** Data is stored sequentially in log files on the disk (\`/tmp/kafka-logs\`).
*   **Segments:** Logs are split into segments. When a segment reaches a size limit (default 1GB) or time limit (default 7 days), a new one is created.
*   **Retention Policy:** Old data is deleted automatically based on time (e.g., 7 days) or size to manage disk space.
`
        },
        {
            title: '4. Hands-on: Spring Boot Integration (Confluent Cloud)',
            content: `
While you can run Kafka locally using CLI, the modern approach for production is using a managed service like Confluent Cloud.

### 4.1 Prerequisites & Setup
1.  Create an account on Confluent Cloud.
2.  Create a Cluster (Basic/Standard) and a Topic (e.g., \`weekly-sentiments\`).
3.  Generate API Keys (Key & Secret) for authentication.

### 4.2 Dependencies (pom.xml)
Add the Spring for Apache Kafka support and Jackson for JSON processing.

\`\`\`xml
<dependency>
    <groupId>org.springframework.kafka</groupId>
    <artifactId>spring-kafka</artifactId>
</dependency>
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
</dependency>
\`\`\`

### 4.3 Configuration (application.yml)
Configure connection details for Confluent Cloud.

\`\`\`yaml
spring:
  kafka:
    bootstrap-servers: <YOUR_CONFLUENT_BOOTSTRAP_SERVER_URL>
    properties:
      sasl.mechanism: PLAIN
      security.protocol: SASL_SSL
      sasl.jaas.config: org.apache.kafka.common.security.plain.PlainLoginModule required username='<API_KEY>' password='<API_SECRET>';
      session.timeout.ms: 45000 # Heartbeat check
      
    producer:
      # Serialize keys as Strings and Values as JSON
      key-serializer: org.apache.kafka.common.serialization.StringSerializer
      value-serializer: org.springframework.kafka.support.serializer.JsonSerializer

    consumer:
      group-id: weekly-sentiment-group
      auto-offset-reset: earliest # Read from beginning if no offset exists
      # Deserialize keys as Strings and Values as JSON
      key-deserializer: org.apache.kafka.common.serialization.StringDeserializer
      value-deserializer: org.springframework.kafka.support.serializer.JsonDeserializer
      properties:
        spring.json.trusted.packages: "*" # Allow deserialization of all packages
\`\`\`
`
        },
        {
            title: '5. Implementation Code',
            content: `
### 5.1 Data Model
Create a POJO to represent the event data.

\`\`\`java
public class SentimentData {
    private String email;
    private String sentiment;
    
    // Constructors, Getters, Setters
    public SentimentData() {}
    
    public SentimentData(String email, String sentiment) {
        this.email = email;
        this.sentiment = sentiment;
    }
    
    // ... getters and setters
}
\`\`\`

### 5.2 Producer (Sending Messages)
Use \`KafkaTemplate\` to send messages.

\`\`\`java
@Service
public class SentimentProducerService {

    @Autowired
    private KafkaTemplate<String, Object> kafkaTemplate;

    public void sendSentiment(String email, String sentiment) {
        SentimentData data = new SentimentData(email, sentiment);
        
        // Sending message: Topic, Key, Value
        // Using 'email' as Key ensures all events for one user go to the same partition
        kafkaTemplate.send("weekly-sentiments", email, data);
    }
}
\`\`\`

### 5.3 Consumer (Receiving Messages)
Use \`@KafkaListener\` to listen to the topic.

\`\`\`java
@Service
public class SentimentConsumerService {

    @KafkaListener(topics = "weekly-sentiments", groupId = "weekly-sentiment-group")
    public void consume(SentimentData sentimentData) {
        // Logic to process the event (e.g., send email)
        System.out.println("Received Sentiment: " + sentimentData.getSentiment());
        System.out.println("Processing email for: " + sentimentData.getEmail());
    }
}
\`\`\`
`
        },
        {
            title: '6. Summary of Key Workflows',
            content: `
*   **Producer:** The Spring Boot application creates a \`SentimentData\` object and uses \`KafkaTemplate\` to send it. The key is the user's email.
*   **Broker (Confluent):** Receives the message. Since a key is provided, it hashes the email and assigns it to a specific partition in the \`weekly-sentiments\` topic.
*   **Consumer:** The \`@KafkaListener\` service constantly polls the broker. When the message arrives, it deserializes the JSON back into a Java object and executes the business logic (e.g., sending an email).

**Note on Reliability:** Kafka creates a special internal topic called \`__consumer_offsets\`. This tracks which messages a consumer group has successfully processed. If a consumer crashes and restarts, it checks this topic to resume reading from where it left off, ensuring no data is lost.
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
