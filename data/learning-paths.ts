
export interface PathStep {
    id: string;
    title: string;
    description?: string;
    isCommon?: boolean;
    optional?: boolean;
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
}

export const revisionResources: ResourceItem[] = [
    { id: 'sql-pdf', title: 'SQL PDF Notes', type: 'pdf' },
    { id: 'sql-handwritten', title: 'SQL Handwritten Notes', type: 'note' },
    { id: 'spring-notes', title: 'Spring Framework Notes', type: 'note' },
    { id: 'spring-boot-pdf', title: 'Spring Boot PDF Notes', type: 'pdf' },
    { id: 'spring-all', title: 'Spring All Handwritten Notes', type: 'note' },
    { id: 'java-pdf', title: 'Java PDF Notes', type: 'pdf' },
    { id: 'java-handwritten', title: 'Java Handwritten Notes', type: 'note' },
    { id: 'resume-tips', title: 'Resume Tips and Templates', type: 'template' },
];


export const learningPaths: LearningPath[] = [
    {
        slug: 'sde-1',
        title: 'SDE 1 (Junior Engineer)',
        description: 'Foundation building for 0-3 years of experience. Focus on Core Java, clear coding basics, and introduction to Spring Boot.',
        experienceRange: '0-3 Years',
        steps: [
            { id: 'common-1', title: 'Java Coding Questions', isCommon: true },
            { id: 'common-2', title: 'Stream API Coding Questions - Level I', isCommon: true },
            { id: 'step-1', title: 'Core Java - Level I' },
            { id: 'step-2', title: 'Core Java - Level II' },
            { id: 'step-3', title: 'Spring Framework - Level I' },
            { id: 'step-4', title: 'Spring Boot - Level I' },
            { id: 'step-5', title: 'Spring MVC - Level I', optional: true },
            { id: 'step-6', title: 'Spring Data JPA and Other DB - Level I' },
            { id: 'step-7', title: 'SQL' },
            { id: 'step-8', title: 'Microservices - Level I' },
            { id: 'step-9', title: 'Maven and Git Level I' },
        ]
    },
    {
        slug: 'sde-2',
        title: 'SDE 2 (Mid-Level Engineer)',
        description: 'Advanced development for 3-5 years exp. Deep dive into Spring Boot internals, Security, and complex System Design scenarios.',
        experienceRange: '3-5 Years',
        steps: [
            { id: 'common-1', title: 'Java Coding Questions', isCommon: true },
            { id: 'common-2', title: 'Stream API Coding - Level I', isCommon: true },
            { id: 'common-3', title: 'Stream API Coding - Level II', isCommon: true },
            { id: 'step-1', title: 'Core Java - Level I' },
            { id: 'step-2', title: 'Core Java - Level II' },
            { id: 'step-3', title: 'Core Java - Level III' },
            { id: 'step-4', title: 'Spring Framework - Level I' },
            { id: 'step-5', title: 'Spring Framework - Level II' },
            { id: 'step-6', title: 'Spring Boot - Level I' },
            { id: 'step-7', title: 'Spring Boot - Level II' },
            { id: 'step-8', title: 'Spring Boot - Level III (Scenario Based)' },
            { id: 'step-9', title: 'Spring Security - Level I' },
            { id: 'step-10', title: 'Spring MVC - Level I', optional: true },
            { id: 'step-11', title: 'SQL' },
            { id: 'step-12', title: 'Spring Data JPA and Other DB - Level I' },
            { id: 'step-13', title: 'Kafka', optional: true },
            { id: 'step-14', title: 'Microservices - Level I' },
            { id: 'step-15', title: 'Maven and Git Level I' },
            { id: 'step-16', title: 'Maven and Git (+ Gradle and Deployments) Level II' },
            { id: 'step-17', title: 'Junit and Mockito' },
        ]
    },
    {
        slug: 'sde-3',
        title: 'SDE 3 (Senior Engineer)',
        description: 'Expertise consolidation for 5-8 years exp. Mastering design patterns, advanced microservices, and security architectures.',
        experienceRange: '5-8 Years',
        steps: [
            { id: 'common-1', title: 'Java Coding Questions', isCommon: true },
            { id: 'common-2', title: 'Stream API Coding - Level I', isCommon: true },
            { id: 'common-3', title: 'Stream API Coding - Level II', isCommon: true },
            { id: 'step-1', title: 'Core Java - Level I' },
            { id: 'step-2', title: 'Core Java - Level II' },
            { id: 'step-3', title: 'Core Java - Level III' },
            { id: 'step-4', title: 'Core Java - Level IV (Advance Level)' },
            { id: 'step-5', title: 'Java Design Patterns' },
            { id: 'step-6', title: 'Spring Framework - Level I' },
            { id: 'step-7', title: 'Spring Framework - Level II' },
            { id: 'step-8', title: 'Spring Boot - Level I' },
            { id: 'step-9', title: 'Spring Security - Level II' },
            { id: 'step-10', title: 'Spring Boot - Level III (Scenario Based)' },
            { id: 'step-11', title: 'Spring Boot - Level IV (Advance)' },
            { id: 'step-12', title: 'Spring Security - Level I' },
            { id: 'step-13', title: 'Spring Security - Level II' },
            { id: 'step-14', title: 'Spring MVC - Level I', optional: true },
            { id: 'step-15', title: 'SQL' },
            { id: 'step-16', title: 'Spring Data JPA and Other DB - Level I' },
            { id: 'step-17', title: 'Kafka', optional: true },
            { id: 'step-18', title: 'Microservices - Level I' },
            { id: 'step-19', title: 'Microservices - Level II' },
            { id: 'step-20', title: 'Microservices Design Patterns' },
            { id: 'step-21', title: 'Maven and Git Level I' },
            { id: 'step-22', title: 'Maven and Git (+ Gradle and Deployments) Level II' },
            { id: 'step-23', title: 'Junit and Mockito' },
        ]
    },
    {
        slug: 'senior-lead',
        title: 'Senior Software Engineer / Lead',
        description: 'Leadership and System Design mastery for 8-15 years exp. Focus on scalability, expert Java concepts, and team leadership.',
        experienceRange: '8-15 Years',
        steps: [
            { id: 'common-1', title: 'Java Coding Questions', isCommon: true },
            { id: 'common-2', title: 'Stream API Coding - Level I', isCommon: true },
            { id: 'common-3', title: 'Stream API Coding - Level II', isCommon: true },
            { id: 'step-1', title: 'Core Java - Level I' },
            { id: 'step-2', title: 'Core Java - Level II' },
            { id: 'step-3', title: 'Core Java - Level III' },
            { id: 'step-4', title: 'Core Java - Level IV (Advance Level)' },
            { id: 'step-5', title: 'Core Java - Level V (Expert)' },
            { id: 'step-6', title: 'Java Design Patterns' },
            { id: 'step-7', title: 'Spring Framework - Level I' },
            { id: 'step-8', title: 'Spring Framework - Level II' },
            { id: 'step-9', title: 'Spring Boot - Level I' },
            { id: 'step-10', title: 'Spring Boot - Level II' },
            { id: 'step-11', title: 'Spring Boot - Level III (Scenario Based)' },
            { id: 'step-12', title: 'Spring Boot - Level IV (Advance)' },
            { id: 'step-13', title: 'Spring Boot - Level V (Expert)' },
            { id: 'step-14', title: 'Spring Security - Level I' },
            { id: 'step-15', title: 'Spring Security - Level II' },
            { id: 'step-16', title: 'Spring MVC - Level I', optional: true },
            { id: 'step-17', title: 'SQL' },
            { id: 'step-18', title: 'Spring Data JPA and Other DB - Level I' },
            { id: 'step-19', title: 'Kafka', optional: true },
            { id: 'step-20', title: 'Microservices - Level I' },
            { id: 'step-21', title: 'Microservices - Level II' },
            { id: 'step-22', title: 'Microservices Design Patterns' },
            { id: 'step-23', title: 'Maven and Git Level I' },
            { id: 'step-24', title: 'Maven and Git (+ Gradle and Deployments) Level II' },
            { id: 'step-25', title: 'Junit and Mockito' },
            { id: 'step-26', title: 'Non Technical Lead Level Questions' },
        ]
    }
];
