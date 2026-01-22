
export interface PathStep {
    id: string;
    title: string;
    description?: string;
    isCommon?: boolean;
    optional?: boolean;
    pdfUrl?: string;
}

export interface LearningPath {
    slug: string;
    title: string;
    description: string;
    experienceRange: string;
    steps: PathStep[];
}

export interface ResourceItem {
    id: string;
    title: string;
    type: 'pdf' | 'note' | 'template';
    description?: string;
    pdfUrl?: string;
}

export const revisionResources: ResourceItem[] = [
    { id: 'sql-pdf', title: 'SQL PDF Notes', type: 'pdf', pdfUrl: '/pdfs/resources/SQL-PDF-Notes.pdf' },
    { id: 'sql-handwritten', title: 'SQL Handwritten Notes', type: 'note', pdfUrl: '/pdfs/resources/SQL-Hand-written-notes.pdf' },
    { id: 'spring-notes', title: 'Spring Framework Notes', type: 'note', pdfUrl: '/pdfs/resources/Spring-Framework-Notes.pdf' },
    { id: 'spring-boot-pdf', title: 'Spring Boot PDF Notes', type: 'pdf', pdfUrl: '/pdfs/resources/Spring-Boot-PDF-Notes.pdf' },
    { id: 'spring-all', title: 'Spring All Handwritten Notes', type: 'note', pdfUrl: '/pdfs/resources/Spring-ALL-Hand-written-notes.pdf' },
    { id: 'java-pdf', title: 'Java PDF Notes', type: 'pdf', pdfUrl: '/pdfs/resources/Java-PDF-Notes.pdf' },
    { id: 'java-handwritten', title: 'Java Handwritten Notes', type: 'note', pdfUrl: '/pdfs/resources/Java-Hand-written-notes.pdf' },
    { id: 'resume-tips', title: 'Resume Tips and Templates', type: 'template' },
];


export const learningPaths: LearningPath[] = [
    {
        slug: 'sde-1',
        title: 'SDE 1 (Junior Engineer)',
        description: 'Foundation building for 0-3 years of experience. Focus on Core Java, clear coding basics, and introduction to Spring Boot.',
        experienceRange: '0-3 Years',
        steps: [
            { id: 'common-1', title: 'Java Coding Questions', isCommon: true, pdfUrl: '/pdfs/sde-1/Common-Step-Java-Coding-Questions.pdf' },
            { id: 'common-2', title: 'Stream API Coding Questions - Level I', isCommon: true, pdfUrl: '/pdfs/sde-1/Common-Step-Stream-API-Coding-Questions-Level-I.pdf' },
            { id: 'step-1', title: 'Core Java - Level I', pdfUrl: '/pdfs/sde-1/Step-1-Core-Java-Level-I.pdf' },
            { id: 'step-2', title: 'Core Java - Level II', pdfUrl: '/pdfs/sde-1/Step-2-Core-Java-Level-II.pdf' },
            { id: 'step-3', title: 'Spring Framework - Level I', pdfUrl: '/pdfs/sde-1/Step-3-Spring-Framework-Level-I.pdf' },
            { id: 'step-4', title: 'Spring Boot - Level I', pdfUrl: '/pdfs/sde-1/Step-4-Spring-Boot-Level-I.pdf' },
            { id: 'step-5', title: 'Spring MVC - Level I', optional: true, pdfUrl: '/pdfs/sde-1/Step-5-Spring-MVC-Level-I-Optional.pdf' },
            { id: 'step-6', title: 'Spring Data JPA and Other DB - Level I', pdfUrl: '/pdfs/sde-1/Step-6-Spring-Data-JPA-and-Other-DB-Level-I.pdf' },
            { id: 'step-7', title: 'SQL', pdfUrl: '/pdfs/sde-1/Step-7-SQL.pdf' },
            { id: 'step-8', title: 'Microservices - Level I', pdfUrl: '/pdfs/sde-1/Step-8-Microservices-Level-I.pdf' },
            { id: 'step-9', title: 'Maven and Git Level I', pdfUrl: '/pdfs/sde-1/Step-9-Maven-and-Git-Level-I.pdf' },
        ]
    },
    {
        slug: 'sde-2',
        title: 'SDE 2 (Mid-Level Engineer)',
        description: 'Advanced development for 3-5 years exp. Deep dive into Spring Boot internals, Security, and complex System Design scenarios.',
        experienceRange: '3-5 Years',
        steps: [
            { id: 'common-1', title: 'Java Coding Questions', isCommon: true, pdfUrl: '/pdfs/sde-2/Common-Step-Java-Coding.pdf' },
            { id: 'common-2', title: 'Stream API Coding - Level I', isCommon: true, pdfUrl: '/pdfs/sde-2/Common-Step-Stream-API-Coding-Level-I.pdf' },
            { id: 'common-3', title: 'Stream API Coding - Level II', isCommon: true, pdfUrl: '/pdfs/sde-2/Common-Step-Stream-API-Coding-Level-II.pdf' },
            { id: 'step-1', title: 'Core Java - Level I', pdfUrl: '/pdfs/sde-2/Step-1-Core-Java-Level-I-1.pdf' },
            { id: 'step-2', title: 'Core Java - Level II', pdfUrl: '/pdfs/sde-2/Step-2-Core-Java-Level-II-1.pdf' },
            { id: 'step-3', title: 'Core Java - Level III', pdfUrl: '/pdfs/sde-2/Step-3-Core-Java-Level-III.pdf' },
            { id: 'step-4', title: 'Spring Framework - Level I', pdfUrl: '/pdfs/sde-2/Step-4-Spring-Framework-Level-I.pdf' },
            { id: 'step-5', title: 'Spring Framework - Level II', pdfUrl: '/pdfs/sde-2/Step-5-Spring-framework-Level-II.pdf' },
            { id: 'step-6', title: 'Spring Boot - Level I', pdfUrl: '/pdfs/sde-2/Step-6-Spring-Boot-Level-I.pdf' },
            { id: 'step-7', title: 'Spring Boot - Level II', pdfUrl: '/pdfs/sde-2/Step-7-Spring-Boot-Level-II.pdf' },
            { id: 'step-8', title: 'Spring Boot - Level III (Scenario Based)', pdfUrl: '/pdfs/sde-2/Step-8-Spring-Boot-Level-III-Scenario-Based.pdf' },
            { id: 'step-9', title: 'Spring Security - Level I', pdfUrl: '/pdfs/sde-2/Step-9-Spring-Security-Level-I.pdf' },
            { id: 'step-10', title: 'Spring MVC - Level I', optional: true, pdfUrl: '/pdfs/sde-2/Step-10-Spring-MVC-Level-I-Optional.pdf' },
            { id: 'step-11', title: 'SQL', pdfUrl: '/pdfs/sde-2/Step-11-SQL.pdf' },
            { id: 'step-12', title: 'Spring Data JPA and Other DB - Level I', pdfUrl: '/pdfs/sde-2/Step-12-Spring-Data-JPA-and-Other-DB-Level-I.pdf' },
            { id: 'step-13', title: 'Kafka', optional: true, pdfUrl: '/pdfs/sde-2/Step-13-Kafka-Optional.pdf' },
            { id: 'step-14', title: 'Microservices - Level I', pdfUrl: '/pdfs/sde-2/Step-14-Microservices-Level-I.pdf' },
            { id: 'step-15', title: 'Maven and Git Level I', pdfUrl: '/pdfs/sde-2/Step-15-Maven-and-Git-Level-I.pdf' },
            { id: 'step-16', title: 'Maven and Git (+ Gradle and Deployments) Level II', pdfUrl: '/pdfs/sde-2/Step-16-Maven-and-Git-Gradle-and-Deployments-Level-II.pdf' },
            { id: 'step-17', title: 'Junit and Mockito', pdfUrl: '/pdfs/sde-2/Step-17-Junit-and-Mockito.pdf' },
        ]
    },
    {
        slug: 'sde-3',
        title: 'SDE 3 (Senior Engineer)',
        description: 'Expertise consolidation for 5-8 years exp. Mastering design patterns, advanced microservices, and security architectures.',
        experienceRange: '5-8 Years',
        steps: [
            { id: 'common-1', title: 'Java Coding Questions', isCommon: true, pdfUrl: '/pdfs/sde-3/Common-Step-Java-Coding-1.pdf' },
            { id: 'common-2', title: 'Stream API Coding - Level I', isCommon: true, pdfUrl: '/pdfs/sde-3/Common-Step-Stream-API-Coding-Level-I-1.pdf' },
            { id: 'common-3', title: 'Stream API Coding - Level II', isCommon: true, pdfUrl: '/pdfs/sde-3/Common-Step-Stream-API-Coding-Level-II-1.pdf' },
            { id: 'step-1', title: 'Core Java - Level I', pdfUrl: '/pdfs/sde-3/Step-1-Core-Java-Level-I-2.pdf' },
            { id: 'step-2', title: 'Core Java - Level II', pdfUrl: '/pdfs/sde-3/Step-2-Core-Java-Level-II-2.pdf' },
            { id: 'step-3', title: 'Core Java - Level III', pdfUrl: '/pdfs/sde-3/Step-3-Core-Java-Level-III-1.pdf' },
            { id: 'step-4', title: 'Core Java - Level IV (Advance Level)', pdfUrl: '/pdfs/sde-3/Step-4-Core-Java-Level-IV-Advance-Level.pdf' },
            { id: 'step-5', title: 'Java Design Patterns', pdfUrl: '/pdfs/sde-3/Step-5-Java-Design-Patterns.pdf' },
            { id: 'step-6', title: 'Spring Framework - Level I', pdfUrl: '/pdfs/sde-3/Step-6-Spring-Framework-Level-I.pdf' },
            { id: 'step-7', title: 'Spring Framework - Level II', pdfUrl: '/pdfs/sde-3/Step-7-Spring-framework-Level-II.pdf' },
            { id: 'step-8', title: 'Spring Boot - Level I', pdfUrl: '/pdfs/sde-3/Step-8-Spring-Boot-Level-I.pdf' },
            { id: 'step-9', title: 'Spring Security - Level II', pdfUrl: '/pdfs/sde-3/Step-9-Spring-Security-Level-II.pdf' },
            { id: 'step-10', title: 'Spring Boot - Level III (Scenario Based)', pdfUrl: '/pdfs/sde-3/Step-10-Spring-Boot-Level-III-Scenario-Based.pdf' },
            { id: 'step-11', title: 'Spring Boot - Level IV (Advance)', pdfUrl: '/pdfs/sde-3/Step-11-Spring-Boot-level-IV-Advance.pdf' },
            { id: 'step-12', title: 'Spring Security - Level I', pdfUrl: '/pdfs/sde-3/Step-12-Spring-Security-Level-I.pdf' },
            { id: 'step-13', title: 'Spring Security - Level II', pdfUrl: '/pdfs/sde-3/Step-13-Spring-Security-Level-II.pdf' },
            { id: 'step-14', title: 'Spring MVC - Level I', optional: true, pdfUrl: '/pdfs/sde-3/Step-14-Spring-MVC-Level-I-Optional.pdf' },
            { id: 'step-15', title: 'SQL', pdfUrl: '/pdfs/sde-3/Step-15-SQL.pdf' },
            { id: 'step-16', title: 'Spring Data JPA and Other DB - Level I', pdfUrl: '/pdfs/sde-3/Step-16-Spring-Data-JPA-and-Other-DB-Level-I.pdf' },
            { id: 'step-17', title: 'Kafka', optional: true, pdfUrl: '/pdfs/sde-3/Step-17-Kafka-Optional.pdf' },
            { id: 'step-18', title: 'Microservices - Level I', pdfUrl: '/pdfs/sde-3/Step-18-Microservices-Level-I.pdf' },
            { id: 'step-19', title: 'Microservices - Level II', pdfUrl: '/pdfs/sde-3/Step-19-Microservices-Level-II.pdf' },
            { id: 'step-20', title: 'Microservices Design Patterns', pdfUrl: '/pdfs/sde-3/Step-20-Microservices-Design-Patterns.pdf' },
            { id: 'step-21', title: 'Maven and Git Level I', pdfUrl: '/pdfs/sde-3/Step-21-Maven-and-Git-Level-I.pdf' },
            { id: 'step-22', title: 'Maven and Git (+ Gradle and Deployments) Level II', pdfUrl: '/pdfs/sde-3/Step-22-Maven-and-Git-Gradle-and-Deployments-Level-II.pdf' },
            { id: 'step-23', title: 'Junit and Mockito', pdfUrl: '/pdfs/sde-3/Step-23-Junit-and-Mockito.pdf' },
        ]
    },
    {
        slug: 'senior-lead',
        title: 'Senior Software Engineer / Lead',
        description: 'Leadership and System Design mastery for 8-15 years exp. Focus on scalability, expert Java concepts, and team leadership.',
        experienceRange: '8-15 Years',
        steps: [
            { id: 'common-1', title: 'Java Coding Questions', isCommon: true, pdfUrl: '/pdfs/senior-lead/Common-Step-Java-Coding-2.pdf' },
            { id: 'common-2', title: 'Stream API Coding - Level I', isCommon: true, pdfUrl: '/pdfs/senior-lead/Common-Step-Stream-API-Coding-Level-I-2.pdf' },
            { id: 'common-3', title: 'Stream API Coding - Level II', isCommon: true, pdfUrl: '/pdfs/senior-lead/Common-Step-Stream-API-Coding-Level-II-1.pdf' },
            { id: 'step-1', title: 'Core Java - Level I', pdfUrl: '/pdfs/senior-lead/Step-1-Core-Java-Level-I-2.pdf' },
            { id: 'step-2', title: 'Core Java - Level II', pdfUrl: '/pdfs/senior-lead/Step-2-Core-Java-Level-II-2.pdf' },
            { id: 'step-3', title: 'Core Java - Level III', pdfUrl: '/pdfs/senior-lead/Step-3-Core-Java-Level-III-1.pdf' },
            { id: 'step-4', title: 'Core Java - Level IV (Advance Level)', pdfUrl: '/pdfs/senior-lead/Step-4-Core-Java-Level-IV-Advance-Level.pdf' },
            { id: 'step-5', title: 'Core Java - Level V (Expert)', pdfUrl: '/pdfs/senior-lead/Step-5-Core-Java-Level-V-Expert.pdf' },
            { id: 'step-6', title: 'Java Design Patterns', pdfUrl: '/pdfs/senior-lead/Step-6-Java-Design-Patterns.pdf' },
            { id: 'step-7', title: 'Spring Framework - Level I', pdfUrl: '/pdfs/senior-lead/Step-7-Spring-Framework-Level-I.pdf' },
            { id: 'step-8', title: 'Spring Framework - Level II', pdfUrl: '/pdfs/senior-lead/Step-8-Spring-framework-Level-II.pdf' },
            { id: 'step-9', title: 'Spring Boot - Level I', pdfUrl: '/pdfs/senior-lead/Step-9-Spring-Boot-Level-I.pdf' },
            { id: 'step-10', title: 'Spring Boot - Level II', pdfUrl: '/pdfs/senior-lead/Step-10-Spring-Boot-Level-II.pdf' },
            { id: 'step-11', title: 'Spring Boot - Level III (Scenario Based)', pdfUrl: '/pdfs/senior-lead/Step-11-Spring-Boot-Level-III-Scenario-Based.pdf' },
            { id: 'step-12', title: 'Spring Boot - Level IV (Advance)', pdfUrl: '/pdfs/senior-lead/Step-12-Spring-Boot-level-IV-Advance.pdf' },
            { id: 'step-13', title: 'Spring Boot - Level V (Expert)', pdfUrl: '/pdfs/senior-lead/Step-13-Spring-Boot-Level-V-Expert.pdf' },
            { id: 'step-14', title: 'Spring Security - Level I', pdfUrl: '/pdfs/senior-lead/Step-14-Spring-Security-Level-I.pdf' },
            { id: 'step-15', title: 'Spring Security - Level II', pdfUrl: '/pdfs/senior-lead/Step-15-Spring-Security-Level-II.pdf' },
            { id: 'step-16', title: 'Spring MVC - Level I', optional: true, pdfUrl: '/pdfs/senior-lead/Step-16-Spring-MVC-Level-I-Optional.pdf' },
            { id: 'step-17', title: 'SQL', pdfUrl: '/pdfs/senior-lead/Step-17-SQL.pdf' },
            { id: 'step-18', title: 'Spring Data JPA and Other DB - Level I', pdfUrl: '/pdfs/senior-lead/Step-18-Spring-Data-JPA-and-Other-DB-Level-I.pdf' },
            { id: 'step-19', title: 'Kafka', optional: true, pdfUrl: '/pdfs/senior-lead/Step-19-Kafka-Optional.pdf' },
            { id: 'step-20', title: 'Microservices - Level I', pdfUrl: '/pdfs/senior-lead/Step-20-Microservices-Level-I.pdf' },
            { id: 'step-21', title: 'Microservices - Level II', pdfUrl: '/pdfs/senior-lead/Step-21-Microservices-Level-II.pdf' },
            { id: 'step-22', title: 'Microservices Design Patterns', pdfUrl: '/pdfs/senior-lead/Step-22-Microservices-Design-Patterns.pdf' },
            { id: 'step-23', title: 'Maven and Git Level I', pdfUrl: '/pdfs/senior-lead/Step-23-Maven-and-Git-Level-I.pdf' },
            { id: 'step-24', title: 'Maven and Git (+ Gradle and Deployments) Level II', pdfUrl: '/pdfs/senior-lead/Step-24-Maven-and-Git-Gradle-and-Deployments-Level-II.pdf' },
            { id: 'step-25', title: 'Junit and Mockito', pdfUrl: '/pdfs/senior-lead/Step-25-Junit-and-Mockito.pdf' },
            { id: 'step-26', title: 'Non Technical Lead Level Questions', pdfUrl: '/pdfs/senior-lead/Step-26-Non-Techincal-Lead-level-Questions.pdf' },
        ]
    }
];
