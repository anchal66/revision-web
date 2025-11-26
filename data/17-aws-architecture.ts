export const data = {
    title: 'AWS: Architecting Scalable Cloud Infrastructure & DevOps',
    description: 'A definitive documentation manual for deploying enterprise-grade cloud infrastructure. Covers deep-dive VPC networking (CIDR math), EC2 virtualization, IAM security perimeters, Auto Scaling logic, and "Code-to-Cloud" CI/CD pipelines.',
    patterns: [
        {
            title: '1. Foundations of Cloud Computing',
            description: `
**The Cloud Paradigm:**
Transition from Capital Expense (CapEx - Data Centers) to Operational Expense (OpEx - Pay-as-you-go).

**Service Models:**
*   **IaaS (Infrastructure as a Service):** EC2, VPC. Raw building blocks (Networking, Compute, Storage). Highest flexibility.
*   **PaaS (Platform as a Service):** Elastic Beanstalk, RDS. Manages OS/Runtime, allowing focus on application code.
*   **SaaS (Software as a Service):** GitHub, Gmail. Fully managed software.

**Virtualization & Hypervisor:**
AWS uses a **Hypervisor** to partition physical hardware (Bare Metal) into isolated Virtual Machines (VMs). When you launch an EC2 instance, you get a slice of CPU/RAM, not a dedicated server.

**Global Infrastructure:**
*   **Regions:** Physical clusters of data centers (e.g., \`us-east-1\` N. Virginia).
*   **Availability Zones (AZs):** Discrete data centers within a Region with redundant power/networking (e.g., \`us-east-1a\`, \`us-east-1b\`). Architectures must span multiple AZs for fault tolerance.
`,
            exampleProblems: [
                'Understanding the difference between IaaS and PaaS',
                'Designing for Region-level vs AZ-level failure'
            ],
            solutions: [{
                problemTitle: 'Shared Responsibility Model',
                code: `
# AWS Responsibility (Security OF the Cloud)
- Physical Hardware (Data Centers, Generators)
- Network Infrastructure (Cabling, Routers)
- Hypervisor Virtualization Layer

# Customer Responsibility (Security IN the Cloud)
- Operating System Patching (yum update)
- Firewall Configuration (Security Groups)
- IAM User Management & Access Keys
- Data Encryption (At rest and in transit)
        `,
                explanation: 'Security is a shared duty. AWS secures the facility; you secure the door to your virtual server.'
            }]
        },
        {
            title: '2. Identity and Access Management (IAM)',
            description: `
**The Security Perimeter:**
*   **Root Account:** Has unlimited privileges. Protect with MFA. **Never** use for daily tasks.
*   **IAM Users:** Distinct identities for people or services.
*   **Machine User (CI/CD):** Create a dedicated user (e.g., \`IAM-GitHub\`) for pipelines to limit the "blast radius" of compromised credentials.

**Policies & Permissions:**
*   **Implicit Deny:** Everything is forbidden unless explicitly allowed.
*   **Policy Structure:**
    *   **Effect:** \`Allow\` or \`Deny\`.
    *   **Action:** API calls (e.g., \`s3:PutObject\`).
    *   **Resource:** Target ARN (e.g., \`arn:aws:s3:::my-bucket\`).

**Programmatic Access:**
Uses **Access Key ID** and **Secret Access Key**. These are sensitive secrets (like username/password) and must **never** be hardcoded in code.
`,
            exampleProblems: [
                'Granting S3 access to a CI/CD pipeline',
                'Enforcing Least Privilege'
            ],
            solutions: [{
                problemTitle: 'Least Privilege S3 Policy',
                code: `
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",    // Upload files
                "s3:DeleteObject", // Remove stale files
                "s3:ListBucket"    // Check state
            ],
            "Resource": [
                "arn:aws:s3:::portfolio-bucket-CICD",
                "arn:aws:s3:::portfolio-bucket-CICD/*"
            ]
        }
    ]
}
        `,
                explanation: 'This policy restricts the CI/CD user to ONLY the specific actions needed for deployment and ONLY on the target bucket.'
            }]
        },
        {
            title: '3. Advanced Networking: Custom VPC Design',
            description: `
**CIDR Planning (The Math):**
*   **VPC CIDR:** \`10.0.0.0/16\`. The \`/16\` fixes the first 16 bits, leaving 16 bits for hosts. $2^{16} = 65,536$ IPs.
*   **Subnet CIDR:** \`10.0.0.0/20\`. The \`/20\` fixes 20 bits, leaving 12 bits. $2^{12} = 4,096$ IPs per subnet.
    *   *Why /20?* Standard /24 (256 IPs) exhausts quickly in container/auto-scaling setups. /20 ensures future-proof scalability.

**Network Segmentation:**
*   **Public Subnet:** Has a route to the **Internet Gateway (IGW)**. Used for Load Balancers, Bastions, NAT Gateways.
*   **Private Subnet:** No direct route to IGW. Uses **NAT Gateway** for outbound access (e.g., software updates) but blocks unsolicited inbound traffic.

**Route Tables:**
The *only* difference between Public and Private subnets is the Route Table association.
`,
            exampleProblems: [
                'Calculating available IPs for a subnet',
                'Allowing private servers to download updates securely'
            ],
            solutions: [{
                problemTitle: 'Route Table Configuration Matrix',
                code: `
# 1. Public Route Table (Associated with Public Subnets)
Destination    Target         Description
10.0.0.0/16    local          Inter-VPC traffic
0.0.0.0/0      igw-xxxxxx     Traffic to Internet via IGW

# 2. Private Route Table (Associated with Private Subnets)
Destination    Target         Description
10.0.0.0/16    local          Inter-VPC traffic
0.0.0.0/0      nat-xxxxxx     Traffic to Internet via NAT Gateway
        `,
                explanation: 'The NAT Gateway must reside in a Public Subnet (to reach the IGW). Private instances route 0.0.0.0/0 to the NAT GW, which proxies the traffic to the internet.'
            }]
        },
        {
            title: '4. Compute: EC2 & Bootstrapping',
            description: `
**Amazon Machine Images (AMI):** The blueprint (OS + App Server).
**Instance Types:** e.g., \`t2.micro\`. "Burstable" instances earn CPU credits when idle and spend them during spikes.

**Bootstrapping (User Data):**
Automating server setup using shell scripts executed by \`cloud-init\` on first boot.
*   **Linux:** Bash scripts to install \`httpd\`, \`php\`.
*   **Windows:** Manual setup via Server Manager -> Add Roles -> Web Server (IIS).

**Security Groups (Firewalls):**
Stateful firewalls at the instance level.
*   **SSH/RDP:** Restrict Source to "My IP" to prevent brute-force.
*   **HTTP:** Open to 0.0.0.0/0 (or restricted to Load Balancer SG).
`,
            exampleProblems: [
                'Automating Linux Web Server Setup',
                'Configuring Windows IIS manually'
            ],
            solutions: [{
                problemTitle: 'Linux User Data Script',
                code: `
#!/bin/bash
# 1. Update & Install Apache
yum update -y
yum install -y httpd php

# 2. Start Service
systemctl start httpd
systemctl enable httpd

# 3. Create Content (Dynamic Hostname for LB Verification)
echo "<h1>Hello World from $(hostname -f)</h1>" > /var/www/html/index.html
        `,
                explanation: 'This script converts a raw Linux VM into a functional web server automatically. Including `$(hostname -f)` helps visually verify that the Load Balancer is distributing traffic across different servers.'
            }]
        },
        {
            title: '5. High Availability: ALB & Auto Scaling',
            description: `
**Application Load Balancer (ALB):**
Layer 7 (HTTP/HTTPS) traffic distributor.
*   **Listener:** Listens on Port 80.
*   **Target Group:** Logical grouping of EC2 instances. Performs health checks (e.g., ping \`index.html\`).

**Auto Scaling Group (ASG):**
Manages fleet capacity.
*   **Min/Desired/Max:** e.g., 2/2/4. Ensures redundancy (Min 2) while capping costs (Max 4).
*   **Target Tracking Policy:** Acts like a thermostat. "Keep Avg CPU at 30%".
    *   **Scale Out:** CPU > 30% -> Add instances.
    *   **Scale In:** CPU < 30% -> Remove instances.

**Stress Testing:**
Validating the ASG requires artificially spiking CPU load using tools like \`stress\` or a PHP loop.
`,
            exampleProblems: [
                'Designing a self-healing architecture',
                'Validating scaling logic with load tests'
            ],
            solutions: [{
                problemTitle: 'PHP Stress Test Script',
                code: `
# Create a CPU-intensive script
cat > stress.php <<EOF
<?php
// Infinite loop performing math calculations
while(true) {
    sqrt(rand());
}
?>
EOF

# Execute to spike CPU to 100%
php stress.php
        `,
                explanation: 'Running this script forces the CPU to 100%. CloudWatch aggregates this metric. Once the average crosses the 30% threshold, the ASG Alarm fires, launching new instances.'
            }]
        },
        {
            title: '6. Storage: S3 Static Hosting',
            description: `
**S3 (Simple Storage Service):** Object storage.
**Static Hosting:** Hosting HTML/CSS/JS without servers.

**Configuration Steps:**
1.  **Block Public Access:** Must be turned **OFF**.
2.  **Bucket Policy:** Grant \`s3:GetObject\` to Principal \`*\`.
3.  **Versioning:** Enable to retain history. Allows rollback if a bad deployment occurs.

**Endpoint:** AWS generates a URL like \`http://bucket-name.s3-website-us-east-1.amazonaws.com\`.
`,
            exampleProblems: [
                'Hosting a website for pennies',
                'Recovering from accidental file deletion'
            ],
            solutions: [{
                problemTitle: 'S3 Bucket Policy for Public Access',
                code: `
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicRead",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::portfolio-bucket-CICD/*"
        }
    ]
}
        `,
                explanation: 'The `/*` suffix is critical; it applies the permission to ALL objects within the bucket, not just the bucket itself.'
            }]
        },
        {
            title: '7. CI/CD: GitHub Actions Pipeline',
            description: `
**Philosophy:**
*   **CI:** Frequent merges to \`main\`.
*   **CD:** Automated deployment to production (S3).

**Workflow Architecture (.github/workflows/deploy.yml):**
*   **Trigger:** \`on: push: branches: [main]\`.
*   **Runner:** \`ubuntu-latest\`.
*   **Action:** \`jakejarvis/s3-sync-action\` (AWS CLI wrapper).
*   **Secrets:** Inject AWS credentials from GitHub Secrets (never hardcoded).

**Key Arguments:**
*   \`--acl public-read\`: Forces uploaded objects to be public (overriding defaults).
*   \`--delete\`: Removes files in S3 that no longer exist in the repo (exact mirroring).
`,
            exampleProblems: [
                'Automating deployments securely',
                'Preventing "orphan" files in S3'
            ],
            solutions: [{
                problemTitle: 'GitHub Actions Workflow',
                code: `
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
        `,
                explanation: 'This pipeline listens for pushes to main. It checks out the code and syncs the `./website` directory to S3. The `--delete` flag ensures that if you delete a file locally, it is also deleted from the live site.'
            }]
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
        }
    ]
};
