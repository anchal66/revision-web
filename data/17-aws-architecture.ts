import { TheoryTopicData } from './types';

export const data: TheoryTopicData = {
    title: 'AWS: Architecting Scalable Cloud Infrastructure & DevOps',
    description: 'A comprehensive technical report serving as a definitive documentation manual for the deployment of enterprise-grade cloud infrastructure and CI/CD pipelines on AWS. It covers deep-dive VPC networking, EC2 virtualization, IAM security, Auto Scaling, and "Code-to-Cloud" automation.',
    sections: [
        {
            title: '1. Executive Summary',
            content: `
This comprehensive technical report serves as a definitive documentation manual for the deployment of enterprise-grade cloud infrastructure and Continuous Integration/Continuous Deployment (CI/CD) pipelines on Amazon Web Services (AWS). Synthesized from an extensive analysis of the Intellipaat AWS Master Class and associated technical repositories, this document details the end-to-end process of architectural design, resource provisioning, network segmentation, and automated software delivery.

The scope of this report encompasses the foundational theory and practical execution of cloud computing paradigms, moving from the virtualization of compute resources (EC2) to the orchestration of complex, isolated networks (VPCs) and the implementation of self-healing, elastic architectures (Auto Scaling). Furthermore, it dissects the integration of modern DevOps practices, specifically utilizing GitHub Actions to automate the deployment of a static portfolio website to Amazon S3, ensuring a seamless "code-to-cloud" workflow.

This document is intended for solutions architects, DevOps engineers, and systems administrators seeking a rigorous, deep-dive understanding of AWS mechanisms. It moves beyond superficial tutorials to explore the underlying logic, security implications, and scalability considerations of every configuration step, supported by precise technical data and configuration specifications.
`
        },
        {
            title: '2. Foundations of Cloud Computing and AWS Architecture',
            content: `
The deployment of robust infrastructure begins with a theoretical understanding of the cloud computing model and the specific virtualization technologies that underpin the Amazon Web Services ecosystem.

### 2.1 The Paradigm of Cloud Computing
Cloud computing represents a shift from capital-intensive, on-premises hardware management to an operational expense model based on on-demand resource provisioning. The Intellipaat curriculum identifies this transition as critical for modern IT strategies, enabling organizations to trade fixed expenses (data centers, physical servers) for variable expenses (pay-as-you-go compute and storage).

#### 2.1.1 Service Models
The architecture discussed in this report spans multiple service models:
*   **Infrastructure as a Service (IaaS):** Represented by Amazon EC2 and VPC. This layer provides the raw building blocks—networking, computers, and data storage space. It offers the highest level of flexibility and management control over IT resources, mirroring legacy on-premises IT.
*   **Platform as a Service (PaaS):** Represented by AWS Elastic Beanstalk (though less focused on here) and managed database services. This removes the need for organizations to manage the underlying infrastructure (usually hardware and operating systems) and allows them to focus on the deployment and management of applications.
*   **Software as a Service (SaaS):** While the report focuses on building infrastructure, the tools used—such as GitHub for version control—operate as SaaS, where the application is fully managed by the service provider.

### 2.2 Virtualization and the Hypervisor Layer
At the core of AWS's ability to provision instances like EC2 is virtualization technology. The report highlights that cloud providers utilize a hypervisor—a software layer that sits between the physical hardware (bare metal) and the virtual machines (VMs). This technology allows the physical resources of a single powerful server to be partitioned into multiple isolated virtual environments.

When a user requests a "Linux EC2 instance," AWS does not dedicate a physical server; instead, the control plane instructs the hypervisor to allocate a slice of CPU, memory, and storage to create a Guest OS environment. This abstraction is what enables the elasticity and speed of deployment characteristic of the cloud.

### 2.3 AWS Global Infrastructure
The reliability of the deployed architecture depends heavily on the AWS Global Infrastructure. The "Region" and "Availability Zone" (AZ) concepts are central to the high-availability strategies employed later in this report (specifically in the Load Balancer and Auto Scaling sections).
*   **Regions:** Physical locations around the world where AWS clusters data centers. The tutorials primarily utilize the \`us-east-1\` (N. Virginia) region, a common default for low-latency access in North America.
*   **Availability Zones (AZs):** Discrete data centers with redundant power, networking, and connectivity in an AWS Region. The architecture explicitly utilizes multiple AZs (e.g., \`us-east-1a\`, \`us-east-1b\`) to ensure fault tolerance. If one data center fails, the application architecture is designed to failover to resources in the adjacent AZ.
`
        },
        {
            title: '3. Identity and Access Management (IAM): The Security Perimeter',
            content: `
In the shared responsibility model of cloud security, AWS manages the security of the cloud, while the customer is responsible for security in the cloud. The primary mechanism for the latter is AWS Identity and Access Management (IAM). Before any infrastructure is provisioned, a secure identity framework must be established.

### 3.1 IAM Users and Principles of Least Privilege
The root account of an AWS environment possesses unlimited privileges. Best practices dictate that this account should be protected with Multi-Factor Authentication (MFA) and rarely used. Instead, administrative activities and programmatic access should be conducted through distinct IAM Users or Roles.

For the CI/CD pipeline integration discussed in Section 8, the creation of a dedicated machine user is mandatory. This user, identified in the architecture as \`IAM-GitHub\`, serves a singular purpose: facilitating the authentication of external GitHub Actions runners against the AWS API. By creating a specific user for this task rather than using a general administrator account, the blast radius of a potential credential compromise is significantly reduced.

### 3.2 Policy Documents and Permissions
Permissions in AWS are defined by JSON-based policy documents attached to identities. These policies operate on an "implicit deny" model—unless a permission is explicitly granted, the action is forbidden.

In the context of the portfolio deployment, the \`IAM-GitHub\` user requires specific permissions to interact with the Simple Storage Service (S3). The policy generation process involves defining three key elements:
*   **Effect:** Allow (granting the permission).
*   **Action:** Specific API calls. For a sync operation, the user requires \`s3:PutObject\` (to upload files), \`s3:DeleteObject\` (to remove stale files), and \`s3:ListBucket\` (to determine the current state).
*   **Resource:** The specific Amazon Resource Name (ARN) of the target bucket (\`arn:aws:s3:::portfolio-bucket-CICD\`). Restricting the resource ensures the CI/CD pipeline cannot modify other buckets in the account.

#### Code Snippet: Least Privilege IAM Policy
\`\`\`json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AllowS3Sync",
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:DeleteObject",
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::portfolio-bucket-CICD",
                "arn:aws:s3:::portfolio-bucket-CICD/*"
            ]
        }
    ]
}
\`\`\`

### 3.3 Programmatic Access Credentials
To enable the "handshake" between GitHub and AWS, the \`IAM-GitHub\` user is provisioned with programmatic access keys: an Access Key ID and a Secret Access Key. These strings act as the username and password for API interactions.

**Security Implication:** These keys are sensitive secrets. They are never hardcoded into the application code or the workflow YAML file. Instead, they are stored in the GitHub repository's encrypted secrets store, injected into the runtime environment only when the pipeline executes.
`
        },
        {
            title: '4. Advanced Networking: Architecting a Custom Virtual Private Cloud (VPC)',
            content: `
While AWS provides a Default VPC in every region to facilitate quick starts, enterprise-grade architectures demand the isolation and granular control of a Custom VPC. This section details the mathematical planning and component configuration required to build a secure network topology from scratch.

### 4.1 CIDR Planning and IP Addressing
The Virtual Private Cloud (VPC) is a logically isolated section of the AWS Cloud where resources are launched in a virtual network defined by the architect. The fundamental design decision is the choice of Classless Inter-Domain Routing (CIDR) blocks.

#### 4.1.1 VPC CIDR Block
The architecture utilizes the CIDR block \`10.0.0.0/16\` for the VPC.
*   **Analysis:** A \`/16\` suffix indicates that the first 16 bits of the IP address are fixed (the network portion), leaving the remaining 16 bits for host addressing. This results in $2^{16} = 65,536$ available IP addresses. This is a standard selection for a primary VPC, providing ample address space to prevent IP exhaustion as the infrastructure scales to include hundreds of instances, load balancers, and database endpoints.

#### 4.1.2 Subnet Segmentation and Masking
Within the VPC, the network is segmented into subnets. The instructor utilizes a \`/20\` subnet mask, a decision that reflects significant foresight regarding scalability.
*   **Mathematical Context:** A \`/20\` mask fixes the first 20 bits. This leaves 12 bits for hosts ($32 - 20 = 12$).
*   **Capacity:** $2^{12} = 4,096$ IP addresses per subnet. AWS reserves 5 addresses per subnet (Network address, Router, DNS, Reserved, Broadcast), leaving 4,091 usable IPs.
*   **Comparison:** Many introductory tutorials use \`/24\` (256 IPs). However, in high-scale architectures using container orchestration (like Kubernetes) or rapid auto-scaling, a \`/24\` subnet can be exhausted quickly. The \`/20\` selection ensures that the subnets in \`us-east-1a\` and \`us-east-1b\` can accommodate massive growth without requiring complex network resizing later.

| Subnet Name | CIDR Block | Usable IPs | Availability Zone | Tier Purpose |
| :--- | :--- | :--- | :--- | :--- |
| Public Subnet A | 10.0.0.0/20 | 4,091 | us-east-1a | Ingress/Egress (NAT, ALB, Bastion) |
| Private Subnet A | 10.0.16.0/20 | 4,091 | us-east-1a | Application Logic (EC2, RDS) |
| Public Subnet B | 10.0.32.0/20 | 4,091 | us-east-1b | High Availability / Redundancy |
| Private Subnet B | 10.0.48.0/20 | 4,091 | us-east-1b | High Availability / Redundancy |

### 4.2 Traffic Routing and Gateways
Network isolation is enforced not by the subnets themselves, but by the Route Tables associated with them. This architecture distinguishes between "Public" and "Private" subnets based solely on their route to the internet.

#### 4.2.1 The Internet Gateway (IGW)
To enable connectivity for the public subnets, an Internet Gateway (IGW) is deployed.
*   **Mechanism:** The IGW performs network address translation between private IP addresses within the VPC and public IP addresses on the internet. It is a horizontally scaled, redundant, and highly available VPC component.
*   **Configuration:** The IGW (named \`my IGW\`) is created and explicitly Attached to the demo VPC.
*   **Routing Logic:** A Route Table is created for the public subnets. A rule is added with Destination \`0.0.0.0/0\` (representing all internet traffic) and Target \`igw-xxxxxxxx\`. This rule creates the "Public" nature of the subnet.

#### 4.2.2 The NAT Gateway for Private Subnets
Private subnets host application servers that must not be directly reachable from the internet but require outbound access for software updates (e.g., \`yum update\`) or API calls to other AWS services. This is achieved via a NAT Gateway.
*   **Placement Strategy:** The NAT Gateway acts as a proxy. It must be placed in a Public Subnet because it requires a route to the IGW to send traffic out.
*   **Elastic IP (EIP):** A NAT Gateway requires a static public IP address to function as the source IP for the outbound traffic. During creation, an Elastic IP is allocated and associated with the gateway.
*   **Routing Logic:** The Private Subnet's Route Table is configured with a default route (\`0.0.0.0/0\`) pointing to the NAT Gateway ID (not the IGW).
*   **Traffic Flow:** Private Instance -> NAT GW (in Public Subnet) -> IGW -> Internet.
*   **Return Flow:** Internet -> IGW -> NAT GW -> Private Instance.
*   **Security:** Because the NAT Gateway only allows traffic initiated from inside the VPC, it effectively blocks unsolicited inbound connection attempts, securing the private instances.

### 4.3 Route Table Verification
The validation of a correctly configured VPC lies in the Route Tables. The report confirms the following configurations:

**Public Route Table:**
| Destination | Target | Description |
| :--- | :--- | :--- |
| 10.0.0.0/16 | local | Allows communication between all subnets in the VPC. |
| 0.0.0.0/0 | igw-xxxx | Routes internet traffic via the Internet Gateway. |

**Private Route Table:**
| Destination | Target | Description |
| :--- | :--- | :--- |
| 10.0.0.0/16 | local | Allows communication between all subnets in the VPC. |
| 0.0.0.0/0 | nat-xxxx | Routes internet traffic via the NAT Gateway. |
`
        },
        {
            title: '5. Compute Infrastructure: Virtualization with EC2',
            content: `
With the network topology established, the report proceeds to the instantiation of compute resources. Amazon Elastic Compute Cloud (EC2) provides secure, resizable compute capacity. This section analyzes the deployment of both Linux and Windows environments, focusing on bootstrapping automation.

### 5.1 Amazon Machine Images (AMI) and Instance Types
The blueprint for any EC2 instance is the Amazon Machine Image (AMI). The AMI contains the operating system, application server, and applications required to launch an instance.
*   **AMI Selection:** The architecture utilizes standard AMIs for Amazon Linux 2 (for web servers) and Microsoft Windows Server (for IIS demos). These provide a stable, supported foundation.
*   **Instance Types:** While the specific type (e.g., \`t2.micro\`) implies a balance of CPU and memory, the selection is critical for cost management. The t-series instances used in tutorials are burstable, meaning they earn CPU credits during idle periods and spend them during spikes—a concept relevant to the stress testing discussed later.

### 5.2 Bootstrapping Linux Instances with User Data
A key DevOps principle is "Infrastructure as Code" (IaC). Rather than manually configuring servers, the architecture utilizes User Data scripts. These shell scripts are executed by the \`cloud-init\` service on the instance's first boot, automating the software stack installation.

#### 5.2.1 The Web Server Initialization Script
The script utilized for the Linux instances performs the following sequence of operations to convert a raw OS into a functional web server:
*   **Shebang:** \`#!/bin/bash\` defines the interpreter.
*   **System Update:** \`yum update -y\` ensures that all installed packages are patched against security vulnerabilities.
*   **HTTP Server Installation:** \`yum install -y httpd\`. This installs the Apache Web Server.
*   **Service Activation:**
    *   \`systemctl start httpd\`: Starts the daemon immediately.
    *   \`systemctl enable httpd\`: Configures the daemon to auto-start on system boot, ensuring resilience after restarts.
*   **Content Generation:** \`echo "<h1>Hello World from $(hostname -f)</h1>" > /var/www/html/index.html\`. This creates a simple landing page. Crucially, it embeds the instance's hostname, which allows for visual verification of load balancing (as the hostname changes depending on which server responds).
*   **PHP Integration:** For the dynamic scaling demo, the script additionally installs PHP (\`yum install -y php\`). This is essential for the stress testing phase, as the CPU load generation script is written in PHP.

#### Code Snippet: Linux User Data
\`\`\`bash
#!/bin/bash
# Update and Install Dependencies
yum update -y
yum install -y httpd php

# Start and Enable Apache
systemctl start httpd
systemctl enable httpd

# Create Landing Page with Hostname for LB Verification
echo "<h1>Hello World from $(hostname -f)</h1>" > /var/www/html/index.html
\`\`\`

### 5.3 Windows Server Configuration and IIS
For scenarios requiring a Microsoft environment, the report details the manual configuration of Internet Information Services (IIS) on a Windows Server EC2 instance. Unlike the Linux automated approach, this utilizes the GUI, reflecting a common workflow for Windows administration.

**Step-by-Step Configuration Analysis:**
*   **Access:** The administrator connects via Remote Desktop Protocol (RDP) on Port 3389.
*   **Server Manager:** The configuration is driven through the Server Manager dashboard, the central hub for Windows Server roles.
*   **Role Installation:**
    *   Select Add roles and features.
    *   Navigate to Server Roles and check Web Server (IIS).
    *   The wizard prompts to add required management tools (features). This dependency resolution is handled automatically.
    *   The installation acts as the Windows equivalent of \`yum install httpd\`.
*   **Validation:** Upon completion ("Installation succeeded"), the server begins listening on Port 80. Accessing the instance's Public IP via a browser serves the default IIS "Splash Screen," confirming the server is operational.

### 5.4 Security Groups: The Instance Firewall
Security Groups (SGs) act as virtual, stateful firewalls controlling traffic to and from the instances. The configuration of these groups is the primary line of defense.

**Inbound Rule Configuration:**
*   **Remote Administration:**
    *   **Linux:** SSH (Port 22) is opened. The best practice demonstrated is restricting the Source IP to "My IP" (the administrator's home/office IP) to prevent global brute-force attacks.
    *   **Windows:** RDP (Port 3389) is similarly opened, restricted to authorized IPs.
*   **Web Traffic:**
    *   HTTP (Port 80) is opened to \`0.0.0.0/0\` (Anywhere) for public-facing web servers.
*   **Advanced Security:** When an Application Load Balancer (ALB) is introduced, the Security Group logic changes. The EC2 instance's HTTP rule is modified to accept traffic only from the ALB's Security Group ID. This prevents users from bypassing the load balancer and connecting directly to the backend servers, enforcing the architectural flow.
`
        },
        {
            title: '6. High Availability and Elasticity: Scaling for Demand',
            content: `
A core value proposition of AWS is elasticity—the ability to match resource supply with demand. This section details the implementation of Application Load Balancers (ALB) and Auto Scaling Groups (ASG) to create a self-healing application architecture.

### 6.1 Application Load Balancer (ALB) Architecture
The Application Load Balancer operates at Layer 7 of the OSI model. It serves as the single point of entry for all client traffic, distributing requests across a fleet of EC2 instances.
*   **Listener Configuration:** The ALB is configured with a Listener on Port 80 (HTTP). It inspects incoming packets and forwards them to a defined destination.
*   **Target Groups:** The destination is a Target Group. This logical grouping contains the EC2 instances. The ALB performs constant health checks on the targets (e.g., pinging \`index.html\`). If an instance fails a health check (returns 4xx/5xx or times out), the ALB automatically reroutes traffic to healthy instances, ensuring high availability.

### 6.2 Auto Scaling Group (ASG) Configuration
While the ALB distributes traffic, the Auto Scaling Group (ASG) manages the capacity of the fleet. It dynamically adds or removes instances based on real-time metrics.

#### 6.2.1 Capacity Settings
The ASG is configured with defined boundaries to ensure availability while capping costs:
*   **Minimum Capacity:** 2. This ensures that even in low-traffic periods, the application runs on two instances (likely in different AZs) for redundancy.
*   **Desired Capacity:** 2. The target baseline state.
*   **Maximum Capacity:** 4. A hard limit on the number of instances. This prevents a "runaway scaling" scenario where a software bug or DDoS attack could theoretically spin up thousands of servers and incur massive costs.

#### 6.2.2 Dynamic Scaling Policies: Target Tracking
The system utilizes a Target Tracking Scaling Policy. This represents the modern approach to auto-scaling, contrasting with older "Step Scaling" policies.
*   **Metric:** Average CPU Utilization.
*   **Target Value:** 30%.
*   **Mechanism:** The ASG acts like a thermostat. It monitors the CloudWatch aggregate CPU metric for the group.
    *   **Scale Out:** If average CPU > 30%, the ASG calculates exactly how many new instances are needed to bring the average down to 30% and launches them.
    *   **Scale In:** If average CPU < 30%, it terminates instances to save money.
*   **Implication:** This requires the application to be stateless, as any instance can be terminated at any time.

### 6.3 Stress Testing and Validation
To validate the auto-scaling logic, the system requires a load test. Since organic traffic in a demo environment is insufficient to spike CPU usage, a stress generation tool is employed.
*   **The Stress Tool:** The report identifies the use of tools like the \`stress\` utility (a workload generator for POSIX systems) or a custom PHP script containing a mathematical loop.
*   **Example Logic:** A PHP script executing a \`while(true)\` loop performing square root calculations or cryptographic hashes will force a single CPU core to 100% utilization instantly.

#### Code Snippet: PHP Stress Test
\`\`\`php
<?php
// stress.php
// Infinite loop to spike CPU
while(true) {
    sqrt(rand());
}
?>
\`\`\`

**Execution Flow:**
1.  The administrator logs into an instance and executes the stress script.
2.  Local CPU spikes to 100%.
3.  CloudWatch aggregates this data point. The average CPU of the fleet rises.
4.  Once the average crosses the 30% threshold (after a brief evaluation period), the Alarm state changes to ALARM.
5.  The ASG trigger fires, launching new EC2 instances.
6.  The administrator verifies this by observing the "Instance Management" tab in the ASG console, which displays "Status: Launching a new EC2 instance".
`
        },
        {
            title: '7. Storage Solutions: Serverless Static Web Hosting with S3',
            content: `
Moving beyond compute-heavy architectures, the report explores serverless web hosting using Amazon Simple Storage Service (S3). This offers a highly durable, cost-effective solution for hosting static assets (HTML, CSS, JavaScript) without managing web servers.

### 7.1 Bucket Configuration and Hosting
The process begins with creating a unique S3 bucket, \`portfolio-bucket-CICD\`.
*   **Public Access Blocks:** By default, S3 is secure-by-default, blocking all public access. To host a website, this security feature must be explicitly disabled. The administrator turns OFF "Block all public access" and acknowledges the risk. This allows the bucket to accept public policies.
*   **Hosting Property:** In the bucket properties, Static Website Hosting is enabled. An index document (\`index.html\`) is specified. AWS generates a regional endpoint (e.g., \`http://portfolio-bucket-CICD.s3-website-us-east-1.amazonaws.com\`) which serves the content.

### 7.2 Bucket Policies for Global Read Access
Disabling the public access block is necessary but not sufficient. A Bucket Policy must be applied to explicitly grant read permissions to anonymous users.

**Policy Analysis:**
The policy is written in JSON and utilizes the \`s3:GetObject\` action.
*   **Principal:** \`*\`: This wildcard specifies that anyone on the internet is the allowed entity.
*   **Action:** \`s3:GetObject\`: The user can read files but cannot write or delete them.
*   **Resource:** The \`/*\` suffix applies the rule to every object inside the bucket. This combination effectively turns the bucket into a public web server.

#### Code Snippet: Public Read Bucket Policy
\`\`\`json
{
    "Version": "2012-10-17",
    "Id": "PolicyForPublicWebsiteContent",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::portfolio-bucket-CICD/*"
        }
    ]
}
\`\`\`

### 7.3 Object Versioning
The configuration includes enabling Bucket Versioning. This is a data protection strategy. If a deployment overwrites \`index.html\` with a broken version, or if a file is accidentally deleted, S3 retains the previous version. This allows for instant rollbacks, a critical feature for the reliability of the CI/CD pipeline.
`
        },
        {
            title: '8. Advanced Project: Continuous Deployment with GitHub Actions',
            content: `
The culmination of the infrastructure setup is the implementation of a Continuous Integration/Continuous Deployment (CI/CD) pipeline. This bridges the gap between software development (on a local machine) and cloud operations (on S3), automating the delivery process.

### 8.1 CI/CD Philosophy and Architecture
The pipeline adheres to the principles of CI/CD:
*   **Continuous Integration:** Developers merge code changes into a central repository (GitHub) frequently.
*   **Continuous Deployment:** Every change that passes automated checks is automatically deployed to production without manual intervention.

**Architecture Components:**
*   **Source:** A GitHub Repository hosting the portfolio website code (HTML/CSS).
*   **Trigger:** A push event to the \`main\` branch.
*   **Runner:** An \`ubuntu-latest\` virtual environment hosted by GitHub.
*   **Action:** A script that synchronizes the repo contents to the S3 bucket.

### 8.2 The GitHub Actions Workflow (YAML)
The automation is defined in a YAML file located in \`.github/workflows/\`. This "Infrastructure as Code" approach defines the deployment logic.

**Workflow Syntax and Logic Analysis:**
*   **Trigger:** The \`on: push\` directive establishes the event listener. The pipeline remains dormant until code updates are pushed to the \`main\` branch, ensuring resources are not wasted.
*   **Checkout:** The first step uses the standard \`actions/checkout\`. This pulls the repository's code onto the runner's filesystem, making it available for processing.
*   **The Sync Action:** The workflow leverages \`jakejarvis/s3-sync-action\`, a wrapper around the AWS CLI.
    *   **Argument \`--acl public-read\`:** This is crucial. When files are uploaded to S3 programmatically, they do not automatically inherit the bucket's public policy in all configurations. This flag forces the Access Control List (ACL) of the objects to be public-readable, ensuring the website loads correctly.
    *   **Argument \`--delete\`:** This enforces exact mirroring. If a developer deletes \`old_image.jpg\` from their local project and pushes, the script creates a DELETE command for S3. Without this, the bucket would accumulate "orphan" files, leading to storage bloat and potential security risks (e.g., exposing old, vulnerable JS files).
    *   **SOURCE_DIR:** The snippet specifies synchronization of the \`./website\` directory, ensuring that root-level configuration files (like README.md or .gitignore) are not accidentally deployed to the public web server.

#### Code Snippet: GitHub Actions Workflow
\`\`\`yaml
name: Deploy Portfolio to S3
on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout Code
      uses: actions/checkout@master

    - name: Sync to S3
      uses: jakejarvis/s3-sync-action@master
      with:
        args: --acl public-read --follow-symlinks --delete
      env:
        AWS_S3_BUCKET: \${{ secrets.AWS_S3_BUCKET }}
        AWS_ACCESS_KEY_ID: \${{ secrets.AWS_ACCESS_KEY_ID }}
        AWS_SECRET_ACCESS_KEY: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
        AWS_REGION: 'us-east-1'
        SOURCE_DIR: './website'
\`\`\`

### 8.3 Security: Secrets Management
A critical security requirement is the handling of AWS credentials. The \`AWS_ACCESS_KEY_ID\` and \`AWS_SECRET_ACCESS_KEY\` generated in Section 3 are not written into the YAML file.
*   **GitHub Secrets:** The credentials are stored in the repository's "Secrets and variables" settings.
*   **Runtime Injection:** During the workflow execution, the expression \`\${{ secrets.AWS_ACCESS_KEY_ID }}\` retrieves the encrypted value and injects it into the runner's environment variables.
*   **Log Masking:** GitHub Actions automatically masks these values in build logs. If the script attempts to print the key, the output will show \`***\`, preventing credential leakage.

### 8.4 Validation of the Pipeline
The report validates the success of the pipeline through the "Actions" tab in GitHub.
*   **Visualization:** The user can see the workflow run in real-time.
*   **Logs:** The logs for the "Sync to S3" step will display the specific AWS CLI commands executed (e.g., \`upload: website/index.html to s3://portfolio-bucket-CICD/index.html\`).
*   **End State:** A green checkmark indicates success. Refreshing the S3 website endpoint confirms that the code changes (e.g., changing a background color or text) are live, typically within seconds of the git push.
`
        },
        {
            title: '9. Conclusion',
            content: `
The architecture detailed in this report represents a holistic implementation of modern cloud practices. By integrating the raw compute power of EC2, the network isolation of custom VPCs, the elasticity of Auto Scaling, and the automation of CI/CD pipelines, the described system achieves the pillars of the AWS Well-Architected Framework: Operational Excellence, Security, Reliability, Performance Efficiency, and Cost Optimization.

This document serves as a complete reference for replicating the Intellipaat AWS Master Class environment. It provides not just the "how-to" steps, but the deep technical context required to understand the interplay between IAM permissions, route table logic, and automation scripts. For the practitioner, this moves the skillset from simple resource provisioning to true infrastructure orchestration, enabling the deployment of resilient, scalable, and automated cloud solutions.
`
        },
        {
            title: '10. Appendix: Configuration Reference Tables',
            content: `
### 10.1 VPC & Subnet Design Specifications

| Resource | CIDR Block | Availability Zone | Route Table | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| Demo VPC | 10.0.0.0/16 | N/A | N/A | Primary Network Container |
| Public Subnet 1 | 10.0.0.0/20 | us-east-1a | Public Route Table | Load Balancer, NAT Gateway |
| Private Subnet 1 | 10.0.16.0/20 | us-east-1a | Private Route Table | Application Servers (Web/App) |
| Public Subnet 2 | 10.0.32.0/20 | us-east-1b | Public Route Table | HA Redundancy |
| Private Subnet 2 | 10.0.48.0/20 | us-east-1b | Private Route Table | HA Redundancy |

### 10.2 Security Group Rules Matrix

| Security Group | Direction | Type | Protocol | Port | Source/Destination | Rationale |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| ALB-SG | Inbound | HTTP | TCP | 80 | 0.0.0.0/0 | Public internet access to Load Balancer |
| Web-Server-SG | Inbound | HTTP | TCP | 80 | sg-ALB-ID | Restrict access to ALB traffic only |
| Web-Server-SG | Inbound | SSH | TCP | 22 | My IP | Secure Admin Access (Linux) |
| Web-Server-SG | Inbound | RDP | TCP | 3389 | My IP | Secure Admin Access (Windows) |
`
        }
    ],
    faqs: [
        {
            question: 'Why use a /20 subnet mask instead of /24?',
            answer: 'A **/24** mask provides only 254 usable IPs. In modern architectures with Auto Scaling and Containers, this can be exhausted quickly. A **/20** mask provides **4,096 IPs** ($2^{12}$), ensuring the subnet can accommodate massive growth without complex resizing.'
        },
        {
            question: 'What is the difference between a NAT Gateway and an Internet Gateway?',
            answer: '**Internet Gateway (IGW):** Enables **two-way** communication (Inbound/Outbound) for Public Subnets. **NAT Gateway:** Enables **outbound-only** communication for Private Subnets (e.g., for updates), blocking unsolicited inbound connections.'
        },
        {
            question: 'Why do we need the `--acl public-read` flag in CI/CD?',
            answer: 'Even with a Public Bucket Policy, individual objects uploaded via the API (like the CI/CD pipeline does) might default to "Private" depending on the bucket\'s Object Ownership settings. This flag explicitly forces the objects to be public-readable.'
        },
        {
            question: 'How does "Target Tracking" scaling differ from "Step Scaling"?',
            answer: '**Target Tracking** is simpler and more modern. You just set a target value (e.g., 30% CPU), and AWS calculates exactly how many instances to add/remove. **Step Scaling** requires defining complex rules (e.g., "If CPU > 50%, add 2 instances; if > 70%, add 4").'
        },
        {
            question: 'What is the purpose of the "Machine User" (IAM-GitHub)?',
            answer: 'It enforces the **Principle of Least Privilege**. Instead of using a Root or Admin account for the CI/CD pipeline, we create a specific user with permissions restricted *only* to the S3 bucket. If these credentials are leaked, the attacker cannot access EC2, RDS, or other services.'
        },
        {
            question: '6. Explain the difference between "VPC Peering" and "Transit Gateway".',
            answer: '**VPC Peering** is a 1:1 non-transitive connection between two VPCs. It works well for simple meshes but becomes unmanageable at scale ($N^2$ connections). **Transit Gateway (TGW)** is a hub-and-spoke model that connects thousands of VPCs and on-prem networks through a single central gateway, simplifying routing and management.'
        },
        {
            question: '7. What is the difference between EBS, EFS, and Instance Store?',
            answer: '**EBS (Elastic Block Store):** Network drive attached to one EC2. Persistent, durable, but locked to an AZ. **EFS (Elastic File System):** Network file system (NFS) shared across thousands of EC2s in multiple AZs. Slower than EBS, more expensive. **Instance Store:** Ephemeral disk physically attached to the host. Extremely fast (IOPS), but data is LOST if the instance stops/terminates.'
        },
        {
            question: '8. How does S3 ensure Data Consistency?',
            answer: 'S3 now provides **Strong Consistency** for all operations (PUT, DELETE, GET). Historically, it was eventually consistent for overwrites. Now, if you write a new object and immediately read it, you are guaranteed to get the latest version.'
        },
        {
            question: '9. What is a "Lambda Cold Start" and how do you mitigate it?',
            answer: 'A Cold Start occurs when AWS spins up a new execution environment for your function (download code, start runtime), causing latency. **Mitigation:** 1) Use **Provisioned Concurrency** to keep environments warm. 2) Minimize deployment package size. 3) Choose lighter runtimes (Go/Node.js vs Java/Spring).'
        },
        {
            question: '10. Explain DynamoDB "Hot Partitions" and how to avoid them.',
            answer: 'DynamoDB scales by hashing the **Partition Key** to distribute data across physical nodes. If your access pattern targets a single key heavily (e.g., "User_1"), all traffic hits one node (Hot Partition), causing throttling. **Fix:** Choose a high-cardinality partition key (e.g., UUID) to spread traffic evenly.'
        },
        {
            question: '11. RDS Multi-AZ vs Read Replicas: When to use which?',
            answer: '**Multi-AZ:** Synchronous replication to a standby in another AZ. Purpose: **Disaster Recovery (High Availability)**. Auto-failover. **Read Replicas:** Asynchronous replication. Purpose: **Scalability**. Offloads read traffic from the primary. No auto-failover.'
        },
        {
            question: '12. What is the difference between SQS and SNS?',
            answer: '**SQS (Simple Queue Service):** Decoupling via **Queue** (1:1). Consumer polls messages. Guaranteed delivery. **SNS (Simple Notification Service):** Decoupling via **Pub/Sub** (1:Many). Publisher pushes to Topic, multiple subscribers (SQS, Email, Lambda) receive it immediately.'
        },
        {
            question: '13. How do you implement Blue/Green Deployment in AWS?',
            answer: 'Blue/Green reduces downtime and risk. **Strategy:** 1) **Route 53:** Weighted routing (shift traffic 10% -> 100%). 2) **Elastic Beanstalk:** Swap Environment URLs. 3) **CodeDeploy:** Deploys to new Auto Scaling Group and switches Load Balancer target group.'
        },
        {
            question: '14. What are RTO and RPO in Disaster Recovery?',
            answer: '**RTO (Recovery Time Objective):** How long can you afford to be down? (e.g., 1 hour). **RPO (Recovery Point Objective):** How much data can you afford to lose? (e.g., 5 minutes of data). Lower RTO/RPO = Higher Cost (Multi-Region Active-Active).'
        },
        {
            question: '15. When should you use Spot Instances?',
            answer: 'Spot Instances offer up to 90% discount but can be interrupted with 2 minutes notice. Use them for **Stateless, Fault-Tolerant** workloads: Batch processing, CI/CD runners, High Performance Computing (HPC), and background image rendering. Never for Databases.'
        },
        {
            question: '16. What is the difference between AWS WAF and AWS Shield?',
            answer: '**WAF (Web Application Firewall):** Protects against Layer 7 attacks (SQL Injection, XSS, Geo-blocking). You define rules. **Shield:** Protects against DDoS attacks. **Shield Standard:** Free, Layer 3/4 protection. **Shield Advanced:** Paid, Layer 7 protection + Cost Protection + DDoS Response Team (DRT).'
        },
        {
            question: '17. Secrets Manager vs Systems Manager (SSM) Parameter Store?',
            answer: '**Parameter Store:** Free (mostly), stores strings/passwords. Good for config. **Secrets Manager:** Paid, specifically for DB credentials/API keys. Key Feature: **Automatic Rotation** of RDS credentials (changes password in DB and Secret automatically).'
        },
        {
            question: '18. ECS vs EKS: How to choose?',
            answer: '**ECS (Elastic Container Service):** AWS-native, simple, opinionated. Best for teams who just want to run containers without managing k8s complexity. **EKS (Elastic Kubernetes Service):** Managed Kubernetes. Best for open-source compatibility, complex orchestration, and multi-cloud portability.'
        },
        {
            question: '19. How does API Gateway handle throttling?',
            answer: 'API Gateway uses the **Token Bucket Algorithm**. You set a **Rate Limit** (requests/sec) and a **Burst Limit** (max concurrent). If limits are exceeded, it returns `429 Too Many Requests`. You can configure Usage Plans and API Keys to monetize or restrict specific clients.'
        },
        {
            question: '20. CloudWatch vs CloudTrail: What is the difference?',
            answer: '**CloudWatch:** Monitoring & Observability. Metrics (CPU, Memory), Logs (App logs), Alarms. "What is happening?". **CloudTrail:** Auditing & Compliance. Records **API Calls** (Who did what, where, and when?). "Who deleted the database?".'
        },
        {
            question: '21. Explain S3 Storage Classes (Standard vs Intelligent Tiering vs Glacier).',
            answer: '**Standard:** Hot data, ms access, expensive. **Intelligent Tiering:** Auto-moves data between tiers based on access patterns (Cost-effective for unknown patterns). **Glacier:** Cold archival, min storage duration (90 days), retrieval takes minutes/hours. Cheapest.'
        },
        {
            question: '22. What is a VPC Endpoint (Interface vs Gateway)?',
            answer: 'Allows private connection to AWS services without traversing the public internet (IGW/NAT). **Gateway Endpoint:** S3 & DynamoDB only. Free. Uses Route Table. **Interface Endpoint (PrivateLink):** All other services (EC2, SNS). Paid ($/hr). Uses ENI (Elastic Network Interface) in your subnet.'
        },
        {
            question: '23. How does Route 53 "Latency Based Routing" work?',
            answer: 'Route 53 directs traffic to the AWS Region that provides the lowest latency (fastest response) for the user. It uses network latency measurements collected by AWS globally. Ideal for global applications serving users from multiple regions.'
        },
        {
            question: '24. What is "Connection Draining" (Deregistration Delay) in ELB?',
            answer: 'When an instance is deregistered (or unhealthy), the Load Balancer stops sending NEW requests but keeps existing connections open for a set time (e.g., 300s) to allow in-flight requests to complete. Prevents cutting off users mid-transaction during deployments.'
        },
        {
            question: '25. Explain the "Strangler Fig Pattern" in Cloud Migration.',
            answer: 'A strategy to migrate legacy monoliths to microservices. You place a proxy (API Gateway/ALB) in front of the legacy system. You gradually build new microservices for specific features and route traffic to them, "strangling" the monolith until it can be decommissioned.'
        },
        {
            question: '26. What is "Cross-Region Replication" (CRR) in S3?',
            answer: 'CRR automatically replicates every object uploaded to a source bucket to a destination bucket in a different AWS Region. Used for **Disaster Recovery**, **Compliance** (data sovereignty), and **Lower Latency** access for global users.'
        }
    ]
};
