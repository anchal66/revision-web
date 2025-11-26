export const data = {
    title: 'Java Language Architecture & Application Framework',
    description: 'A comprehensive documentation of the Java language, derived from an extensive curriculum covering algorithmic foundations, object-oriented design patterns, and modern functional programming capabilities. The analysis synthesizes instruction from foundational syntax to enterprise-grade concurrency frameworks, offering a deep dive into the mechanics of the Java Virtual Machine (JVM) and the engineering principles required for robust application development.',
    patterns: [
        {
            title: '1. Introduction to the Java Ecosystem and Execution Model',
            description: `
The Java programming language represents a paradigm shift in software engineering, moving developers from platform-dependent procedural code to a platform-independent, object-oriented architectural model. This report serves as a comprehensive documentation of the Java language, derived from an extensive curriculum covering algorithmic foundations, object-oriented design patterns, and modern functional programming capabilities. The analysis synthesizes instruction from foundational syntax to enterprise-grade concurrency frameworks, offering a deep dive into the mechanics of the Java Virtual Machine (JVM) and the engineering principles required for robust application development.

### 1.1 The Philosophy of Platform Independence
At the core of Java’s design is the principle of "Write Once, Run Anywhere." Unlike compiled languages that translate source code directly into machine-specific assembly, Java compiles source code into bytecode—an intermediate, architecture-neutral instruction set. This bytecode is then interpreted or Just-In-Time (JIT) compiled by the JVM, which acts as an abstraction layer between the application and the underlying hardware. This architecture ensures that a Java application developed on a Windows environment functions identically on a Linux server, provided a compatible JVM is present.

### 1.2 The Compilation and Execution Lifecycle
The development lifecycle in Java follows a rigorous path:
*   **Source Code Creation:** Developers write \`.java\` files containing human-readable logic.
*   **Compilation:** The Java Compiler (\`javac\`) translates this logic into \`.class\` files (bytecode).
*   **Class Loading:** The JVM ClassLoader loads these files into memory.
*   **Bytecode Verification:** A security mechanism ensures the code does not violate access rights or memory integrity.
*   **Execution:** The Execution Engine converts bytecode into native machine code.

This structured approach eliminates many classes of errors common in lower-level languages, specifically manual memory management and direct pointer manipulation, replacing them with a managed execution environment that prioritizes safety and scalability.
`,
            exampleProblems: [
                'Explaining "Write Once, Run Anywhere"',
                'The role of the JVM in execution'
            ],
            solutions: [{
                problemTitle: 'Bytecode Visualization',
                code: `
// Source: HelloWorld.java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello");
    }
}

// Compiled Bytecode (javap -c HelloWorld)
// 0: getstatic     #2 // Field java/lang/System.out:Ljava/io/PrintStream;
// 3: ldc           #3 // String Hello
// 5: invokevirtual #4 // Method java/io/PrintStream.println:(Ljava/lang/String;)V
// 8: return
        `,
                explanation: 'The bytecode instructions (getstatic, ldc, invokevirtual) are platform-independent. The JVM on Windows translates them to x86 Windows instructions, while the JVM on Linux translates them to x86 Linux instructions.'
            }]
        },
        {
            title: '2. Lexical Structure, Data Systems, and Control Architecture',
            description: `
Before constructing complex objects, a Java developer must master the atomic units of the language: variables, data types, and control flow mechanisms. These elements form the syntax tree from which all application logic is derived.

### 2.1 The Primitive Data Type System
Java is a strongly typed language, meaning every variable must be declared with a specific type that dictates the memory allocated and the operations permitted. The language provides a set of primitive data types that act as the building blocks for data manipulation.

**Integral Types:** These store whole numbers. Java uses signed two's complement representation.
*   **byte (8-bit):** Useful for raw binary data streams.
*   **short (16-bit):** Rarely used in modern applications but memory-efficient for large arrays.
*   **int (32-bit):** The default type for integral literals. It is sufficient for most counting and indexing operations.
*   **long (64-bit):** Required for timestamps or values exceeding 2 billion.

**Floating-Point Types:** These implement the IEEE 754 standard for decimal calculation.
*   **float (32-bit):** Single precision.
*   **double (64-bit):** Double precision; the default for decimal literals due to higher accuracy.

**Boolean Type:**
*   **boolean:** Represents truth values (true/false). Crucial for control flow decision-making. The size is VM-dependent, though often represented as a single bit within an integer in arrays.

**Character Type:**
*   **char (16-bit):** Stores a single 16-bit Unicode character, allowing Java to support global character sets native to the platform.

### 2.2 Variable Scope and Lifecycle
Variables in Java function within strictly defined scopes, which determine their visibility and lifetime.
*   **Local Variables:** Declared inside methods or blocks. They are stored on the Stack and exist only during the execution of that block. They must be initialized before use.
*   **Instance Variables:** Declared inside a class but outside methods. They characterize the state of an object and are stored on the Heap.
*   **Static Variables:** Belong to the class itself rather than any instance. They are initialized once when the class is loaded and reside in a special memory area (Metaspace in modern Java).

### 2.3 Control Flow and Branching Logic
Algorithmic logic dictates the path of execution. Java provides robust structures for branching and iteration.

**2.3.1 Conditional Branching**
*   **If-Else Constructs:** The fundamental decision mechanism. It evaluates a boolean expression.
*   **Ternary Operator:** A concise syntax \`condition ? valueIfTrue : valueIfFalse\` allows for inline conditional assignment, useful for returning values or simple assignments.

**Switch Statements and Expressions:**
*   **Traditional Switch:** Evaluates a variable against multiple case constants. It requires explicit \`break\` statements to prevent "fall-through" logic, where execution continues into subsequent cases unintentionally.
*   **Modern Switch Expression:** Introduced in recent Java versions (Java 14+), this functional style uses the arrow syntax \`->\`. It eliminates the need for \`break\`, prevents fall-through, and can return a value directly, turning the switch into an expression rather than just a statement.

**2.3.2 Iteration and Loops**
Repeated execution is handled via three primary loop structures:
*   **While Loop:** A pre-test loop that checks the condition before execution. If the condition is initially false, the body never runs.
*   **Do-While Loop:** A post-test loop guaranteed to execute at least once. This is essential for user-input scenarios, such as prompting a user for a password until valid input is received.
*   **For Loop:** The standard deterministic loop \`for(init; condition; update)\`. It compacts the loop control logic into a single line, reducing the risk of infinite loops caused by forgetting an increment step.
*   **For-Each Loop (Enhanced For):** Syntactic sugar designed for iterating over Arrays and Collections. It abstracts away the index \`i\`, preventing \`ArrayIndexOutOfBoundsException\` errors during traversal.

### 2.4 Recursion and Stack Depth
Recursion is an advanced control flow technique where a method invokes itself to solve a sub-problem.
*   **Mechanism:** Each recursive call pushes a new frame onto the Thread Stack.
*   **Base Case:** A termination condition is mandatory. Without it, the recursion continues indefinitely until the Stack memory is exhausted, resulting in a \`StackOverflowError\`.
*   **Applications:** The curriculum highlights the calculation of Factorials and the Fibonacci sequence as classic use cases where recursive logic simplifies the code compared to iterative solutions.
`,
            exampleProblems: [
                'Choosing the right data type for efficiency',
                'Preventing "Switch Fall-Through" bugs',
                'Recursive Factorial Calculation'
            ],
            solutions: [{
                problemTitle: 'Modern Switch Expression',
                code: `
// Old Way (Error Prone)
switch (day) {
    case MONDAY:
    case FRIDAY:
    case SUNDAY:
        numLetters = 6;
        break; // Easy to forget!
    case TUESDAY:
        numLetters = 7;
        break;
    // ...
}

// Modern Way (Java 14+)
int numLetters = switch (day) {
    case MONDAY, FRIDAY, SUNDAY -> 6;
    case TUESDAY                -> 7;
    case THURSDAY, SATURDAY     -> 8;
    case WEDNESDAY              -> 9;
    default -> throw new IllegalStateException("Invalid day: " + day);
};
        `,
                explanation: 'The arrow syntax `->` eliminates the need for `break` statements, preventing accidental fall-through logic. It also allows the switch to be used as an expression to return a value directly.'
            }]
        },
        {
            title: '3. Data Structures I: Arrays and Algorithmic Logic',
            description: `
Arrays are the most fundamental data structure in Java, offering indexed access to a fixed sequence of elements. Mastery of array manipulation is the prerequisite for understanding complex algorithms and the Collections Framework.

### 3.1 One-Dimensional Array Architecture
An array in Java is an object that stores a contiguous block of memory for elements of the same type.
*   **Declaration and Allocation:** \`int[] arr = new int[5];\` allocates space for 5 integers, initialized to 0 by default.
*   **Memory Implication:** The variable \`arr\` is a reference stored on the Stack, pointing to the array object on the Heap.

### 3.2 Core Array Algorithms (Programming Challenges)
The curriculum details a series of "Programming Challenges" designed to build algorithmic intuition. These challenges demonstrate how to manipulate data without high-level library support.

**3.2.1 Aggregation and State Accumulation**
The calculation of a sum or average requires the Accumulator Pattern.
*   **Logic:** A variable (e.g., \`sum\`) is initialized to zero outside the loop. As the loop traverses the array, each element is added to the accumulator.
*   **Type Safety Warning:** When calculating averages, the sum of integers must be cast to \`double\` before division. Failing to do so results in integer division, truncating the decimal portion (e.g., \`5/2\` yields \`2\` instead of \`2.5\`).

**3.2.2 Search and Occurrence Counting**
Linear search algorithms traverse the array to find a target.
*   **Counter Pattern:** To count occurrences, a separate counter variable increments whenever the current element matches the target. This logic underpins search analytics and frequency analysis.

**3.2.3 Min/Max Extrema Finding**
Finding the largest or smallest number requires careful initialization.
*   **The Initialization Trap:** Initializing a \`max\` variable to 0 is a logic error if the array contains only negative numbers (the result would incorrectly be 0).
*   **Best Practice:** Initialize \`max\` to \`Integer.MIN_VALUE\` or the first element of the array \`arr[0]\`. This ensures the comparison logic works correctly for any range of data.

**3.2.4 Monotonicity Checks (Is Sorted?)**
Verifying if an array is sorted requires comparing adjacent elements.
*   **Algorithm:** The loop runs from \`0\` to \`length - 2\`. Inside, it checks if \`arr[i] > arr[i+1]\`.
*   **Early Exit Optimization:** If a single violation is found, the method immediately returns \`false\`. This optimization prevents unnecessary processing, reducing the average-case time complexity.

**3.2.5 In-Place Reversal and Palindromes**
*   **Reversal:** Java arrays are fixed in size, so "reversing" often implies modifying the existing array.
*   **Two-Pointer Technique:** One pointer starts at the beginning (\`i=0\`), another at the end (\`j=length-1\`). While \`i < j\`, the elements at these positions are swapped, and the pointers move inward. This achieves reversal in $O(n)$ time with $O(1)$ space complexity.
*   **Palindrome Check:** A palindrome array reads the same forwards and backwards. The logic mirrors the reversal check: instead of swapping, the algorithm compares \`arr[i]\` with \`arr[length-1-i]\`. If they differ, the array is not a palindrome.

**3.2.6 Merging Sorted Arrays**
Merging two sorted arrays into a third sorted array is a foundational logic for the Merge Sort algorithm.
*   **Logic:** Pointers track the current position in both source arrays. The smaller of the two distinct elements is copied to the result array, and its pointer advances. This preserves the sorted order without needing to resort the final array, achieving linear time complexity $O(n+m)$.

### 3.3 Multi-Dimensional Arrays
Java supports arrays of arrays, allowing for the creation of matrices or grids.
*   **2D Array Traversal:** Processing a matrix requires nested loops—an outer loop for rows and an inner loop for columns.
*   **Diagonal Summation:** A specific challenge involves summing the main diagonals of a square matrix.
    *   **Primary Diagonal:** Elements where row index equals column index (\`i == j\`).
    *   **Secondary Diagonal:** Elements where \`row + col == size - 1\`.
*   **Complexity:** The logic must handle the center element of odd-sized matrices carefully to avoid double-counting it (once for the primary, once for the secondary diagonal).
`,
            exampleProblems: [
                'Finding the maximum value in an array of negative numbers',
                'Reversing an array in-place',
                'Merging two sorted arrays'
            ],
            solutions: [{
                problemTitle: 'Two-Pointer Array Reversal',
                code: `
public void reverse(int[] arr) {
    int i = 0;
    int j = arr.length - 1;
    
    while (i < j) {
        // Swap
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
        
        // Move pointers inward
        i++;
        j--;
    }
}
        `,
                explanation: 'By swapping elements from the ends moving inward, we reverse the array without allocating a new one, achieving optimal space complexity.'
            }]
        },
        {
            title: '4. Object-Oriented Architecture: The Object Model',
            description: `
The transition from procedural code (loops and variables) to Object-Oriented Programming (OOP) is the defining characteristic of Java. This paradigm organizes software around Objects—entities that hold data (state) and methods (behavior)—rather than logic alone.

### 4.1 The Class vs. Object Dichotomy
*   **The Class (Blueprint):** A class is a logical template that defines the structure. It consumes no memory on the Heap. For example, a \`Car\` class defines that all cars have a color and a speed.
*   **The Object (Instance):** An object is the realization of the blueprint. Created via the \`new\` keyword, it occupies physical memory. \`Car myCar = new Car();\` creates a specific instance with its own distinct state.

### 4.2 Java Memory Management: Stack and Heap
Understanding memory segmentation is critical for debugging and performance tuning.
*   **Stack Memory:** Stores primitive local variables and reference variables. It follows a LIFO (Last-In, First-Out) order. When a method finishes, its stack frame is destroyed.
*   **Heap Memory:** Stores Objects. Even if an object is created inside a method, the object itself lives on the Heap. The local variable on the Stack merely holds the address (reference) to that Heap object.
*   **Garbage Collection:** Java creates a managed environment. The Garbage Collector (GC) acts as a background daemon, periodically scanning the Heap for objects that are no longer reachable (referenced) by the Stack. These "orphaned" objects are deleted to free memory, preventing memory leaks that plague languages like C++.

### 4.3 Object Initialization and Constructors
*   **The Constructor:** A special method invoked solely at the moment of object creation. It ensures the object starts in a valid state.
*   **Default Constructor:** If no constructor is defined, Java provides a no-argument constructor implicitly.
*   **Parameterized Constructor:** Developers can enforce data requirements (e.g., forcing a Car to have a color upon creation) by defining constructors with arguments.
*   **The this Keyword:** Inside a method or constructor, \`this\` refers to the current object. It is primarily used to resolve naming conflicts (shadowing) between instance variables and local parameters (e.g., \`this.name = name\`).

### 4.4 Static vs. Instance Context
*   **Instance Members:** Belong to the specific object. Changing \`car1.speed\` does not affect \`car2.speed\`.
*   **Static Members:** Marked with the \`static\` keyword, these belong to the Class. There is only one copy of a static variable, shared by all instances.
*   **Use Case:** Constants (e.g., \`Math.PI\`) or counters (e.g., tracking the total number of Car objects created).
*   **Constraint:** Static methods cannot access instance variables directly because they run in a context where no specific "instance" is guaranteed to exist.
`,
            exampleProblems: [
                'Stack vs Heap memory allocation',
                'Using `this` to resolve shadowing'
            ],
            solutions: [{
                problemTitle: 'Memory Allocation Visualization',
                code: `
public void method() {
    int x = 10; // Stored on Stack
    Car c = new Car(); 
    // "c" (reference) is on Stack.
    // "new Car()" (object) is on Heap.
}
        `,
                explanation: 'When `method()` finishes, the stack frame is popped. `x` and `c` are destroyed. The `Car` object on the Heap becomes unreachable and is eventually reclaimed by the Garbage Collector.'
            }]
        },
        {
            title: '5. The Pillars of OOP: Encapsulation and Inheritance',
            description: `
Java's scalability relies on four architectural pillars: Encapsulation, Inheritance, Abstraction, and Polymorphism. These principles allow developers to build massive, modular systems.

### 5.1 Encapsulation: Data Integrity and Hiding
Encapsulation is the practice of restricting direct access to object components and bundling data with methods that operate on that data.
*   **Access Modifiers:** Java controls visibility through four levels:
    *   **Private:** Accessible only within the class. This is the strictest level and is used for internal state.
    *   **Default (Package-Private):** Accessible to any class in the same package.
    *   **Protected:** Accessible to the package and any subclasses (even if in different packages).
    *   **Public:** Accessible globally.
*   **Getters and Setters:** Instead of exposing fields publicly (e.g., \`public int age\`), Java encourages \`private int age\` and public accessors (\`getAge\`, \`setAge\`).
*   **Benefit:** This allows validation logic. The \`setAge\` method can check \`if (age > 0)\` before assignment, preventing the object from entering an invalid state. This defensive coding is the essence of robust encapsulation.

### 5.2 Inheritance: The "Is-A" Relationship
Inheritance allows a new class (Subclass) to acquire the properties and behaviors of an existing class (Superclass), promoting code reuse.
*   **Syntax:** Defined using the \`extends\` keyword (e.g., \`class Car extends Vehicle\`).
*   **Hierarchy:** Use inheritance only when a true "Is-A" relationship exists. A Dog is an Animal. Do not use inheritance for "Has-A" relationships (e.g., a Car has an Engine); use Composition for that.
*   **The Object Class:** All classes in Java implicitly extend \`java.lang.Object\`. This means every object inherits fundamental methods:
    *   \`toString()\`: Returns a string representation. By default, it prints the memory address hash. It is standard practice to override this to return meaningful data.
    *   \`equals()\` and \`hashCode()\`: Used for object comparison.

### 5.3 The super Keyword
Just as \`this\` refers to the current instance, \`super\` refers to the parent class.
*   **Usage:** It is used to call the parent's constructor (\`super()\`) or to access parent methods that have been overridden in the child class (\`super.start()\`).
*   **Constructor Chaining:** A subclass constructor must call the parent constructor (implicitly or explicitly) to ensure the parent's state is initialized before the child's logic runs.
`,
            exampleProblems: [
                'Designing an immutable class',
                'Proper use of `super` in constructors'
            ],
            solutions: [{
                problemTitle: 'Encapsulation with Validation',
                code: `
public class Person {
    private int age; // Private state

    public void setAge(int age) {
        if (age < 0) {
            throw new IllegalArgumentException("Age cannot be negative");
        }
        this.age = age;
    }
}
        `,
                explanation: 'Direct access (`p.age = -5`) would corrupt the object state. The setter ensures that the object remains in a valid state at all times.'
            }]
        },
        {
            title: '6. The Pillars of OOP: Abstraction and Polymorphism',
            description: `
While Encapsulation and Inheritance handle structure and reuse, Abstraction and Polymorphism handle flexibility and interface design.

### 6.1 Abstraction: Hiding Implementation
Abstraction focuses on what an object does rather than how it does it.
*   **Abstract Classes:** A class declared with \`abstract\` cannot be instantiated directly. It serves as a partial template. It can contain abstract methods (no body) that force subclasses to provide an implementation.
    *   *Example:* An abstract \`Vehicle\` class might have an abstract \`makeStartSound()\` method. \`Car\` implements it as "Vroom", while \`Bicycle\` implements it as "Ding".
*   **Interfaces:** An interface is a pure contract. Historically, it contained only abstract methods and constants.
*   **Multiple Inheritance:** Java prevents a class from extending multiple parents to avoid ambiguity (The Diamond Problem). However, a class can implement multiple interfaces (e.g., \`class Amphibian implements LandVehicle, WaterVehicle\`). This provides the benefits of multiple inheritance without the state management complexity.

### 6.2 Polymorphism: Many Forms
Polymorphism allows a single interface to control different underlying forms (data types).
*   **Compile-Time Polymorphism (Overloading):** Multiple methods in the same class share the same name but have different parameter lists. The compiler determines which one to call based on the arguments passed (e.g., \`add(int a, int b)\` vs \`add(double a, double b)\`).
*   **Run-Time Polymorphism (Overriding):** A subclass provides a specific implementation of a method already defined in its parent.
*   **Dynamic Dispatch:** When a parent reference holds a child object (\`Vehicle v = new Car()\`), calling \`v.start()\` executes the Car's version of the method. The JVM determines the method at runtime based on the actual object type. This allows for generic code execution where a list of diverse objects can be processed uniformly.
*   **Upcasting and Downcasting:**
    *   **Upcasting:** Treating a specific object as a generic parent (safe and automatic).
    *   **Downcasting:** Casting a generic parent reference back to a specific child (\`Car c = (Car) vehicle\`). This is risky and can throw a \`ClassCastException\` if the object is not actually a Car. The \`instanceof\` operator is used to verify the type before downcasting.
`,
            exampleProblems: [
                'Interface vs Abstract Class',
                'Runtime Polymorphism with Upcasting'
            ],
            solutions: [{
                problemTitle: 'Dynamic Method Dispatch',
                code: `
Vehicle v = new Car(); // Upcasting
v.start(); 

// Even though the reference 'v' is of type Vehicle,
// the JVM executes Car's version of start() because
// the actual object on the Heap is a Car.
        `,
                explanation: 'This allows for generic programming. A method can accept a `List<Vehicle>` and call `.start()` on each, without knowing if it is a Car, Truck, or Bike.'
            }]
        },
        {
            title: '7. Data Structures II: String Manipulation and Math',
            description: `
Strings are ubiquitous in software, and Java handles them with unique memory optimizations.

### 7.1 String Immutability and the Constant Pool
In Java, String objects are immutable. Once created, their character sequence cannot be changed.
*   **The String Constant Pool (SCP):** To optimize memory, Java maintains a special area in the Heap for string literals. If two variables are assigned the literal "Hello", they both point to the exact same memory address in the SCP.
*   **Performance Implication:** Operations that appear to modify a string (like concatenation \`str + " world"\`) actually create a completely new String object. In tight loops, this creates massive memory "garbage," degrading performance.
*   **StringBuilder:** To mitigate the immutability cost, Java provides \`StringBuilder\`. This class represents a mutable sequence of characters. It modifies the buffer in-place, making it the preferred tool for constructing strings dynamically.

### 7.2 The Math Class and Randomness
The \`java.lang.Math\` class provides static utility methods for complex arithmetic.
*   **Random Number Generation:** \`Math.random()\` generates a double value $0.0 \\le x < 1.0$.
*   **Scaling:** To generate a random integer between 1 and 100, the developer must scale the range and cast the result: \`(int)(Math.random() * 100) + 1\`.
`,
            exampleProblems: [
                'Why String concatenation in loops is bad',
                'Generating a random integer in a range'
            ],
            solutions: [{
                problemTitle: 'StringBuilder vs Concatenation',
                code: `
// BAD: Creates N String objects (O(N^2) complexity)
String s = "";
for (int i=0; i<1000; i++) {
    s += i; 
}

// GOOD: Modifies internal buffer (O(N) complexity)
StringBuilder sb = new StringBuilder();
for (int i=0; i<1000; i++) {
    sb.append(i);
}
String s = sb.toString();
        `,
                explanation: 'String concatenation (`+`) creates a new String object every time. `StringBuilder` modifies the existing character array, avoiding massive garbage creation.'
            }]
        },
        {
            title: '8. Robustness Engineering: Exception Handling',
            description: `
Robust software must handle errors gracefully. Java forces developers to anticipate and manage failure states through its Exception Handling framework.

### 8.1 The Exception Hierarchy
Exceptions are events that disrupt the normal flow of instructions. In Java, they are objects.
*   **Checked Exceptions:** These represent environmental errors (e.g., \`FileNotFoundException\`, \`IOException\`). The compiler mandates that these be handled. A method must either catch the exception or declare it using \`throws\`. This ensures that critical failure modes are never ignored.
*   **Unchecked Exceptions (Runtime):** These represent programming logic errors (e.g., \`NullPointerException\`, \`ArrayIndexOutOfBoundsException\`, \`ArithmeticException\`). The compiler does not enforce handling, but robust code should anticipate them.

### 8.2 Control Flow in Error Handling
*   **Try-Catch Blocks:** The \`try\` block encloses code that might throw an exception. The \`catch\` block acts as an error handler for a specific exception type. Multiple catch blocks can be chained to handle different errors differently.
*   **The Finally Block:** This block executes regardless of whether an exception occurred or not. It is the designated location for resource cleanup (e.g., closing file streams or database connections) to prevent resource leaks.
*   **Throw vs. Throws:**
    *   **throw:** An imperative command to generate an exception object (\`throw new IllegalArgumentException("Bad input")\`).
    *   **throws:** A declaration in the method signature indicating that the method might cause an exception, delegating the responsibility of handling it to the caller.
`,
            exampleProblems: [
                'Checked vs Unchecked Exceptions',
                'Ensuring file streams are closed'
            ],
            solutions: [{
                problemTitle: 'Try-With-Resources',
                code: `
// Old Way (Verbose & Error Prone)
FileWriter fw = null;
try {
    fw = new FileWriter("file.txt");
    fw.write("Hello");
} finally {
    if (fw != null) fw.close();
}

// Modern Way (Auto-Closeable)
try (FileWriter fw = new FileWriter("file.txt")) {
    fw.write("Hello");
} // fw.close() called automatically here
        `,
                explanation: 'Resources implementing `AutoCloseable` can be declared in the `try` statement. Java ensures they are closed when the block exits, preventing resource leaks.'
            }]
        },
        {
            title: '9. Data Structures III: The Collections Framework',
            description: `
While arrays are fixed-size and rigid, the Collections Framework provides dynamic, flexible data structures.

### 9.1 The Core Interfaces
*   **List Interface:** An ordered collection that allows duplicates.
    *   **ArrayList:** Backed by a dynamic array. It offers fast random access ($O(1)$) but slow insertion/deletion in the middle ($O(n)$) due to element shifting.
    *   **LinkedList:** Backed by a doubly-linked list. It offers fast insertion/deletion ($O(1)$) but slow access ($O(n)$).
*   **Set Interface:** A collection that prohibits duplicates.
    *   **HashSet:** Uses hashing to store elements. It guarantees uniqueness but makes no guarantees about the order of elements.
*   **Queue Interface:** Designed for holding elements prior to processing (FIFO - First In, First Out).
    *   **PriorityQueue:** Orders elements according to a supplied Comparator or their natural ordering, rather than insertion order.
*   **Map Interface:** Stores Key-Value pairs. It is not a subtype of Collection but is part of the framework.
    *   **HashMap:** Uses a hash table. Keys must be unique. It allows for near-instant retrieval ($O(1)$) of values based on their keys.

**Table 1: Collections Performance Comparison**
<div class="overflow-x-auto">
  <table class="min-w-full border-collapse border border-border">
    <thead>
      <tr class="bg-muted">
        <th class="border border-border p-2 text-left">Collection</th>
        <th class="border border-border p-2 text-left">Access</th>
        <th class="border border-border p-2 text-left">Insertion (End)</th>
        <th class="border border-border p-2 text-left">Insertion (Middle)</th>
        <th class="border border-border p-2 text-left">Duplicates</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="border border-border p-2">ArrayList</td>
        <td class="border border-border p-2">$O(1)$</td>
        <td class="border border-border p-2">$O(1)$ (Amortized)</td>
        <td class="border border-border p-2">$O(n)$</td>
        <td class="border border-border p-2">Yes</td>
      </tr>
      <tr>
        <td class="border border-border p-2">LinkedList</td>
        <td class="border border-border p-2">$O(n)$</td>
        <td class="border border-border p-2">$O(1)$</td>
        <td class="border border-border p-2">$O(1)$</td>
        <td class="border border-border p-2">Yes</td>
      </tr>
      <tr>
        <td class="border border-border p-2">HashSet</td>
        <td class="border border-border p-2">N/A</td>
        <td class="border border-border p-2">$O(1)$</td>
        <td class="border border-border p-2">N/A</td>
        <td class="border border-border p-2">No</td>
      </tr>
      <tr>
        <td class="border border-border p-2">HashMap</td>
        <td class="border border-border p-2">$O(1)$</td>
        <td class="border border-border p-2">$O(1)$</td>
        <td class="border border-border p-2">N/A</td>
        <td class="border border-border p-2">Keys: No</td>
      </tr>
    </tbody>
  </table>
</div>

### 9.2 Generics and Type Safety
Before Java 5, Collections held raw Object references, requiring unsafe casting upon retrieval.
*   **Generics:** The syntax \`List<String>\` restricts the list to only hold Strings.
*   **The Diamond Operator:** \`new ArrayList<>()\` (introduced in Java 7) allows the compiler to infer the type arguments from the variable declaration, reducing verbosity.
*   **Wrapper Classes & Autoboxing:** Collections cannot hold primitives (\`int\`). Java provides Wrapper Classes (\`Integer\`, \`Double\`). Autoboxing is the automatic conversion the compiler performs between the primitive and the wrapper (e.g., adding \`5\` to \`List<Integer>\` automatically converts it to \`new Integer(5)\`).
`,
            exampleProblems: [
                'ArrayList vs LinkedList',
                'Why HashMap keys must be immutable'
            ],
            solutions: [{
                problemTitle: 'Using Generics for Type Safety',
                code: `
// Pre-Java 5 (Unsafe)
List list = new ArrayList();
list.add("Hello");
list.add(123); // Compiles fine
String s = (String) list.get(1); // Throws ClassCastException at runtime

// With Generics (Safe)
List<String> list = new ArrayList<>();
list.add("Hello");
// list.add(123); // Compile-time Error!
        `,
                explanation: 'Generics move type checking from runtime to compile-time, preventing `ClassCastException` and making code more readable.'
            }]
        },
        {
            title: '10. Concurrency and Multithreading',
            description: `
Modern computing relies on parallelism. Java provides built-in support for Multithreading, allowing applications to perform multiple tasks simultaneously.

### 10.1 Thread Lifecycle and Creation
*   **Creation Strategies:**
    *   Extend the \`Thread\` class and override \`run()\`.
    *   Implement the \`Runnable\` interface and pass it to a \`Thread\` object. This is preferred as it preserves the ability to extend another class.
*   **Thread States:** A thread transitions through defined states: New $\\rightarrow$ Runnable $\\rightarrow$ Running $\\rightarrow$ Blocked (Waiting) $\\rightarrow$ Terminated.
*   **Execution:** One must call \`start()\` to launch a thread. Calling \`run()\` directly simply executes the method in the current thread, defeating the purpose of parallelism.

### 10.2 Synchronization and Safety
Parallel access to shared mutable data leads to Race Conditions, where the final state depends on the unpredictable timing of thread execution.
*   **The synchronized Keyword:** This enforces mutual exclusion. When a method or block is synchronized, only one thread can execute it at a time. Other threads attempting to enter are blocked until the lock is released.
*   **Thread Communication:** Methods like \`join()\` allow one thread to wait for the completion of another, essential for coordinating dependent tasks.

### 10.3 The Executor Framework
Manually creating threads is resource-intensive. The Executor Service (introduced in Java 5) abstracts thread management.
*   **Thread Pools:** Instead of creating new threads, the service maintains a pool of reusable worker threads. \`Executors.newFixedThreadPool(10)\` creates a pool with a cap of 10 threads. Tasks submitted to the pool are queued and executed as threads become available.
*   **Futures and Callables:**
    *   \`Runnable\` cannot return a value.
    *   \`Callable\` is a generic interface that returns a result.
    *   **Future:** When a \`Callable\` is submitted to an executor, it returns a \`Future\`. This object represents the pending result of the computation. \`future.get()\` blocks the current thread until the result is ready, bridging the gap between asynchronous execution and synchronous result retrieval.
`,
            exampleProblems: [
                'Race Conditions and Deadlocks',
                'Runnable vs Callable'
            ],
            solutions: [{
                problemTitle: 'Executor Service & Futures',
                code: `
ExecutorService executor = Executors.newFixedThreadPool(2);

Callable<Integer> task = () -> {
    Thread.sleep(1000);
    return 42;
};

Future<Integer> future = executor.submit(task);

// Do other work...

// Blocks until result is ready
Integer result = future.get(); 
executor.shutdown();
        `,
                explanation: 'Using `Callable` and `Future` allows us to execute tasks asynchronously and retrieve their results later, handling exceptions and timeouts gracefully.'
            }]
        },
        {
            title: '11. Functional Programming and Modern Java',
            description: `
Java 8 introduced the most significant changes in the language's history, incorporating Functional Programming (FP) concepts to make code more concise and parallel-friendly.

### 11.1 Lambda Expressions
Lambdas allow developers to treat code as data.
*   **Syntax:** \`(parameters) -> { body }\`.
*   **Usage:** They provide a concise way to implement Functional Interfaces (interfaces with a single abstract method). Instead of writing a verbose anonymous inner class to define a \`Comparator\` or \`Runnable\`, a simple lambda expression suffices.

### 11.2 The Stream API
Streams provide a declarative approach to processing collections of data.
*   **Pipeline Architecture:** A stream pipeline consists of:
    *   **Source:** A collection (e.g., \`list.stream()\`).
    *   **Intermediate Operations:** Lazy transformations like \`filter\`, \`map\`, \`sorted\`, and \`distinct\`. These return a new Stream and are not executed until the terminal operation runs.
    *   **Terminal Operation:** Triggers the processing (e.g., \`collect\`, \`forEach\`, \`reduce\`, \`count\`).
*   **Lazy Evaluation:** This is a key performance feature. If you chain \`.filter().findFirst()\`, the stream stops processing as soon as the first match is found, rather than filtering the entire dataset first.

### 11.3 The Optional Class
\`NullPointerException\` is the most common runtime error in Java.
*   **The Container:** \`Optional<T>\` is a container object that may or may not contain a non-null value.
*   **API:** Instead of checking \`if (x != null)\`, developers use methods like \`ifPresent()\`, \`orElse()\`, or \`map()\`. This forces the developer to explicitly handle the "absent value" case, leading to safer APIs.
`,
            exampleProblems: [
                'Converting loops to Streams',
                'Avoiding NullChecks with Optional'
            ],
            solutions: [{
                problemTitle: 'Stream API Pipeline',
                code: `
List<String> names = Arrays.asList("Alice", "Bob", "Charlie", "David");

// Filter names starting with 'A', convert to UpperCase, sort
List<String> result = names.stream()
    .filter(n -> n.startsWith("A"))
    .map(String::toUpperCase)
    .sorted()
    .collect(Collectors.toList());
        `,
                explanation: 'Streams allow for readable, declarative code. The operations are lazy; if we only asked for `.findFirst()`, the stream would stop processing after "Alice" without touching the rest of the list.'
            }]
        },
        {
            title: '12. File I/O and Persistence',
            description: `
Applications often require persistent storage. Java's I/O (Input/Output) package provides streams for reading and writing data.

### 12.1 Character Streams
*   \`FileWriter\` and \`FileReader\`: specialized for handling text data.
*   **Try-With-Resources:** File resources must be closed to prevent memory leaks. Modern Java (Java 7+) introduces \`try(FileWriter fw = new FileWriter("file.txt")) {... }\`. This syntax ensures that the file is automatically closed when the block exits, even if an exception occurs, eliminating the need for verbose \`finally\` blocks.
`,
            exampleProblems: [
                'Reading and Writing text files safely'
            ],
            solutions: [{
                problemTitle: 'Safe File Writing',
                code: `
try (FileWriter fw = new FileWriter("output.txt")) {
    fw.write("Persistent Data");
} catch (IOException e) {
    e.printStackTrace();
}
        `,
                explanation: 'The try-with-resources statement ensures that the FileWriter is closed even if an exception occurs during the write operation.'
            }]
        },
        {
            title: '13. Modern Java Features (Java 9 - 21)',
            description: `
Java has evolved rapidly since Java 8, adopting a 6-month release cycle. Key features for senior engineers include:

### Java 9: The Module System (JPMS)
*   **Goal:** Modularize the JDK and applications to improve encapsulation and reduce footprint.
*   **module-info.java:** Defines \`requires\` (dependencies) and \`exports\` (public packages).
*   **Benefit:** Solves "Classpath Hell" and enforces strong encapsulation.

### Java 10: Local Variable Type Inference
*   **var keyword:** \`var list = new ArrayList<String>();\`.
*   **Constraint:** Only for local variables with initializers. Not for fields or method parameters.

### Java 11 (LTS): HTTP Client & String Methods
*   **HttpClient:** Non-blocking, supports HTTP/2 and WebSocket. Replaces \`HttpURLConnection\`.
*   **String API:** \`isBlank()\`, \`lines()\`, \`strip()\`, \`repeat(n)\`.

### Java 14: Records (Preview -> Standard in 16)
*   **Concept:** Concise syntax for immutable data carriers (DTOs).
*   **Syntax:** \`public record Point(int x, int y) {}\`.
*   **Features:** Auto-generates constructor, accessors, \`equals()\`, \`hashCode()\`, \`toString()\`.

### Java 15: Sealed Classes (Preview -> Standard in 17)
*   **Goal:** Restrict which classes can extend a superclass.
*   **Syntax:** \`public sealed class Shape permits Circle, Square {}\`.
*   **Benefit:** Allows exhaustive pattern matching in switch expressions.

### Java 21 (LTS): Virtual Threads (Project Loom)
*   **Problem:** OS threads are expensive (1MB stack). High-concurrency apps run out of threads.
*   **Solution:** Virtual Threads are lightweight (managed by JVM, not OS). Mapped M:N to OS threads.
*   **Syntax:** \`Thread.startVirtualThread(() -> ...)\` or \`Executors.newVirtualThreadPerTaskExecutor()\`.
*   **Impact:** Enables "Thread-per-Request" model to scale to millions of concurrent tasks without reactive complexity.
`,
            exampleProblems: [
                'Refactoring DTOs to Records',
                'Using Virtual Threads for high-throughput I/O'
            ],
            solutions: [{
                problemTitle: 'Records vs Classes',
                code: `
// Pre-Java 16
public class Point {
    private final int x;
    private final int y;
    public Point(int x, int y) { this.x = x; this.y = y; }
    // + getters, equals, hashCode, toString... (50 lines of boilerplate)
}

// Java 16+ Record
public record Point(int x, int y) {} 
// That's it! Immutable, transparent, and concise.
                `,
                explanation: 'Records reduce boilerplate for data-carrying classes, ensuring immutability and correct implementations of object methods by default.'
            }]
        },
        {
            title: '14. Deep Dive: Garbage Collection & JVM Internals',
            description: `
Garbage Collection (GC) is the automatic management of Heap memory. Understanding it is crucial for performance tuning.

### 14.1 The Generational Hypothesis
Empirical studies show:
1.  Most objects die young.
2.  Few references exist from old to young objects.

**Heap Structure:**
*   **Young Generation:**
    *   **Eden Space:** Where new objects are allocated.
    *   **Survivor Spaces (S0, S1):** Objects surviving a minor GC move here.
*   **Old Generation (Tenured):** Objects surviving multiple GC cycles move here.
*   **Metaspace:** Stores class metadata (Native Memory, outside Heap). Replaced PermGen (Java 8).

### 14.2 GC Algorithms
*   **Serial GC:** Single-threaded. Pauses application (Stop-The-World). Good for small apps/CLI.
*   **Parallel GC:** Multi-threaded for Minor GC. Focuses on **Throughput**.
*   **G1 GC (Garbage First):** Default since Java 9.
    *   **Architecture:** Splits Heap into fixed-size regions (1MB-32MB).
    *   **Logic:** Prioritizes regions with the most garbage.
    *   **Goal:** Predictable pause times with high throughput.
*   **ZGC (Z Garbage Collector):** Low latency (sub-millisecond pauses).
    *   **Tech:** Uses **Colored Pointers** and Load Barriers. Scalable to multi-terabyte heaps.
*   **Shenandoah:** Similar to ZGC, uses **Brooks Pointers** to move objects concurrently.

### 14.3 GC Roots & Reachability
GC starts from **GC Roots** (Stack variables, Static variables, JNI references).
*   **Strong Reference:** \`Object o = new Object()\`. Never collected if reachable.
*   **Soft Reference:** Collected only if JVM is running out of memory. Good for caching.
*   **Weak Reference:** Collected eagerly on next GC. Used in \`WeakHashMap\`.
*   **Phantom Reference:** Used to schedule post-mortem cleanup actions.

### 14.4 Tuning Flags
*   \`-Xms\`: Initial Heap Size.
*   \`-Xmx\`: Max Heap Size.
*   \`-XX:+UseG1GC\`: Enable G1 GC.
*   \`-XX:MaxGCPauseMillis=200\`: Target pause time hint.
`,
            exampleProblems: [
                'Identifying Memory Leaks',
                'Tuning for Low Latency vs Throughput'
            ],
            solutions: [{
                problemTitle: 'Visualizing GC Roots',
                code: `
public class MemoryLeak {
    // Static list is a GC Root!
    private static final List<Object> cache = new ArrayList<>();

    public void leak() {
        // Objects added here are NEVER collected 
        // because 'cache' is static and reachable.
        cache.add(new byte[1024 * 1024]); 
    }
}
                `,
                explanation: 'Static variables are GC Roots. If they hold references to objects that are no longer needed, those objects cannot be collected, leading to a Memory Leak (OutOfMemoryError).'
            }]
        },
        {
            title: '15. Conclusion',
            description: `
This documentation has detailed the complete trajectory of the Java curriculum, from the bit-level management of primitive data types to the high-level orchestration of concurrent threads and functional streams. The language's architecture is defined by a tension between strict compile-time safety (Generics, Checked Exceptions) and runtime flexibility (Polymorphism, Reflection).

By mastering the foundational logic of arrays and loops, adhering to the design strictures of Object-Oriented Programming, and utilizing the modern power of the Collections and Executor frameworks, a developer transitions from writing scripts to engineering scalable, resilient enterprise applications. The journey through Java is one of understanding not just syntax, but the underlying memory models and architectural decisions that make the language a cornerstone of modern software infrastructure.
`,
            exampleProblems: [],
            solutions: []
        }
    ],
    faqs: [
        {
            question: '1. What is the difference between `equals()` and `hashCode()`?',
            answer: '`equals()` checks for logical equality (content), while `hashCode()` returns an integer representation of the object\'s memory address (by default). **Contract:** If two objects are equal, they MUST have the same hash code. If they have the same hash code, they are NOT necessarily equal (collision). If you override `equals()`, you MUST override `hashCode()` to ensure collections like `HashMap` work correctly.'
        },
        {
            question: '2. How does the String Constant Pool work?',
            answer: 'The SCP is a special area in the Heap. When you create a String literal (`String s = "Hi"`), the JVM checks the pool. If "Hi" exists, it returns the reference; otherwise, it creates a new object in the pool. Using `new String("Hi")` forces a new object on the Heap, bypassing the pool optimization. `String.intern()` can manually move a String to the pool.'
        },
        {
            question: '3. `StringBuffer` vs `StringBuilder`?',
            answer: '**StringBuffer:** Synchronized (Thread-Safe), slower. Legacy class. **StringBuilder:** Non-Synchronized, faster. Introduced in Java 5. Use `StringBuilder` for local string manipulation where thread safety is not a concern.'
        },
        {
            question: '4. `ArrayList` vs `LinkedList`?',
            answer: '**ArrayList:** Backed by dynamic array. Fast random access ($O(1)$). Slow insertion/deletion in middle ($O(N)$) due to shifting. **LinkedList:** Doubly-linked list. Fast insertion/deletion ($O(1)$). Slow access ($O(N)$). `ArrayList` is cache-friendly; `LinkedList` is not.'
        },
        {
            question: '5. How does `HashMap` work internally?',
            answer: 'It uses an array of "Buckets". Key -> `hashCode()` -> Index. If multiple keys map to the same index (Collision), they are stored as a Linked List. **Java 8 Improvement:** If the list size exceeds 8 (TREEIFY_THRESHOLD), it converts to a **Red-Black Tree** ($O(\log N)$) to prevent performance degradation from $O(N)$ to $O(\log N)$.'
        },
        {
            question: '6. `ConcurrentHashMap` vs `Hashtable`?',
            answer: '**Hashtable:** Locks the entire map for every operation (coarse-grained locking). Very slow. **ConcurrentHashMap:** Uses **Bucket-Level Locking** (Segment locking in Java 7, CAS + synchronized on Node in Java 8). Allows concurrent reads and writes to different buckets without blocking.'
        },
        {
            question: '7. Fail-Fast vs Fail-Safe Iterators?',
            answer: '**Fail-Fast:** Throws `ConcurrentModificationException` if the collection is modified structurally while iterating (e.g., `ArrayList`, `HashMap`). **Fail-Safe:** Works on a clone or snapshot, or supports concurrency (e.g., `ConcurrentHashMap`, `CopyOnWriteArrayList`). Does not throw exception but might not reflect latest updates.'
        },
        {
            question: '8. Difference between `Comparable` and `Comparator`?',
            answer: '**Comparable:** "Natural ordering". Implemented by the class itself (`implements Comparable<T>`). Override `compareTo()`. Example: `String`, `Integer`. **Comparator:** "Custom ordering". Separate class/lambda. Override `compare()`. Used when you can\'t modify the class or want multiple sorting strategies.'
        },
        {
            question: '9. Checked vs Unchecked Exceptions?',
            answer: '**Checked:** Extend `Exception`. Compiler forces handling (`try-catch` or `throws`). Represent recoverable errors (IO, SQL). **Unchecked:** Extend `RuntimeException`. Compiler doesn\'t enforce handling. Represent programming errors (NullPointer, IndexOutOfBounds).'
        },
        {
            question: '10. `final`, `finally`, `finalize`?',
            answer: '**final:** Keyword. Variable (constant), Method (cannot override), Class (cannot inherit). **finally:** Block. Executes after try-catch, used for cleanup. **finalize:** Method. Called by GC before reclaiming object. Deprecated in Java 9 due to unpredictability.'
        },
        {
            question: '11. What is try-with-resources?',
            answer: 'Introduced in Java 7. Automates resource management. Any object implementing `AutoCloseable` can be declared in `try(...)`. The JVM guarantees `.close()` is called, preventing leaks. Replaces verbose `finally` blocks.'
        },
        {
            question: '12. What is the `volatile` keyword?',
            answer: 'Indicates that a variable\'s value will be modified by different threads. It guarantees **Visibility** (changes are immediately flushed to main memory, not cached in CPU registers) and prevents **Instruction Reordering**. It does NOT guarantee atomicity (e.g., `count++` is not atomic even with volatile).'
        },
        {
            question: '13. `synchronized` vs `ReentrantLock`?',
            answer: '**synchronized:** Implicit lock. Automatic release. Less flexible. **ReentrantLock:** Explicit lock (`lock.lock()`, `lock.unlock()`). Supports **Fairness** (FIFO), `tryLock()` (non-blocking attempt), and multiple Condition variables.'
        },
        {
            question: '14. `wait()` vs `sleep()`?',
            answer: '**wait():** Object method. Releases the lock. Must be in synchronized block. Used for inter-thread communication. **sleep():** Thread static method. Keeps the lock. Used to pause execution.'
        },
        {
            question: '15. Explain the Thread Lifecycle.',
            answer: 'New -> Runnable (Ready) -> Running -> Blocked/Waiting/Timed_Waiting -> Terminated. Transitions happen via `start()`, scheduler, `wait()`, `sleep()`, `join()`, and method completion.'
        },
        {
            question: '16. What is the Executor Framework?',
            answer: 'An abstraction for Thread management. Decouples task submission from execution. **ThreadPools:** `FixedThreadPool`, `CachedThreadPool`, `ScheduledThreadPool`. Reuses threads to reduce creation overhead.'
        },
        {
            question: '17. `Callable` vs `Runnable`?',
            answer: '**Runnable:** `void run()`. Cannot return value or throw checked exception. **Callable:** `V call()`. Returns a result and can throw Exception. Used with `ExecutorService` to get a `Future`.'
        },
        {
            question: '18. What is a `Future`?',
            answer: 'Represents the result of an asynchronous computation. Methods: `get()` (blocking retrieval), `isDone()`, `cancel()`. **CompletableFuture** (Java 8) adds functional chaining (`thenApply`, `thenAccept`) and non-blocking composition.'
        },
        {
            question: '19. What is the Fork/Join Framework?',
            answer: 'Designed for parallelizing recursive tasks (Divide and Conquer). Uses **Work-Stealing Algorithm**: idle threads steal tasks from the deque of busy threads. Used internally by Parallel Streams.'
        },
        {
            question: '20. Java Memory Model: Stack vs Heap?',
            answer: '**Stack:** Thread-specific. Stores local primitives and reference variables. LIFO. Fast access. **Heap:** Shared by all threads. Stores Objects. Managed by GC. Slower access.'
        },
        {
            question: '21. Types of ClassLoaders?',
            answer: '1. **Bootstrap:** Loads core Java classes (`rt.jar`). Native code. 2. **Platform/Ext:** Loads extensions. 3. **Application/System:** Loads classes from classpath. Follows **Delegation Model**: asks parent first.'
        },
        {
            question: '22. Strong vs Soft vs Weak vs Phantom References?',
            answer: '**Strong:** Normal assignment. Never collected. **Soft:** Collected if OOM is imminent. Caching. **Weak:** Collected on next GC. `WeakHashMap`. **Phantom:** Enqueued when object is finalized. Post-mortem cleanup.'
        },
        {
            question: '23. How to create an Immutable Class?',
            answer: '1. Declare class `final`. 2. Make all fields `private final`. 3. No setters. 4. Initialize via constructor. 5. If field is mutable (e.g., Date, List), return a deep copy in getter.'
        },
        {
            question: '24. Singleton Pattern: Double-Checked Locking?',
            answer: 'Optimization to prevent synchronization overhead. Check `instance == null` twice: once without lock, once with lock. Variable must be `volatile` to prevent half-initialized object visibility.'
        },
        {
            question: '25. Functional Interfaces & Lambdas?',
            answer: 'Interface with exactly one abstract method. Annotated with `@FunctionalInterface`. Examples: `Runnable`, `Callable`, `Comparator`, `Predicate`, `Function`. Lambdas provide concise implementation: `(args) -> body`.'
        },
        {
            question: '26. Stream API: `map` vs `flatMap`?',
            answer: '**map:** One-to-One transformation. `Stream<T> -> Stream<R>`. **flatMap:** One-to-Many. Flattens nested structures. `Stream<List<T>> -> Stream<T>`.'
        },
        {
            question: '27. What is the `Optional` class?',
            answer: 'A container object which may or may not contain a non-null value. Avoids null checks and `NullPointerException`. Methods: `ifPresent`, `orElse`, `orElseThrow`, `map`.'
        },
        {
            question: '28. Marker Interfaces?',
            answer: 'Interfaces with no methods. Used to signal capability to JVM. Examples: `Serializable`, `Cloneable`, `Remote`. Modern Java prefers Annotations.'
        },
        {
            question: '29. `transient` keyword?',
            answer: 'Used in Serialization. Fields marked `transient` are ignored during serialization (not saved to file/network). Initialized to default value upon deserialization.'
        },
        {
            question: '30. `default` methods in Interfaces?',
            answer: 'Java 8 feature. Allows interfaces to have method implementations. Enables backward compatibility (adding methods without breaking implementing classes). Solves "Multiple Inheritance of Behavior".'
        },
        {
            question: '31. Method Overloading vs Overriding?',
            answer: '**Overloading:** Compile-time polymorphism. Same name, different params. Return type doesn\'t matter. **Overriding:** Runtime polymorphism. Subclass provides specific implementation. Same signature. `@Override`.'
        },
        {
            question: '32. Covariant Return Types?',
            answer: 'Since Java 5, an overriding method can return a subclass of the return type declared in the parent method. E.g., Parent returns `Number`, Child returns `Integer`.'
        },
        {
            question: '33. The Diamond Problem?',
            answer: 'Ambiguity when a class inherits from two classes that have a method with the same signature. Java avoids this by not supporting multiple inheritance of classes. Interfaces with `default` methods resolve this by forcing the implementing class to override the ambiguous method.'
        },
        {
            question: '34. What is `System.gc()`?',
            answer: 'Suggests the JVM to run Garbage Collection. It is NOT guaranteed to run. The JVM may ignore the request.'
        },
        {
            question: '35. Difference between `Process` and `Thread`?',
            answer: '**Process:** Independent execution unit. Separate memory space. Heavyweight. IPC needed. **Thread:** Lighweight unit within a process. Shared memory space. Low overhead.'
        }
    ]
};
