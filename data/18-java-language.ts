export const data = {
    title: 'Java Language Architecture & Application Framework',
    description: 'A comprehensive documentation of the Java language, covering algorithmic foundations, OOP design patterns, JVM internals, and modern functional programming capabilities.',
    patterns: [
        {
            title: '1. Introduction to the Java Ecosystem',
            description: `
**The Philosophy of Platform Independence:**
"Write Once, Run Anywhere." Java compiles source code into **bytecode** (.class files), an intermediate, architecture-neutral instruction set. This bytecode is interpreted or JIT-compiled by the **JVM (Java Virtual Machine)**, acting as an abstraction layer between the application and hardware.

**The Compilation and Execution Lifecycle:**
1.  **Source Code:** Developers write \`.java\` files.
2.  **Compilation:** \`javac\` translates logic into \`.class\` bytecode.
3.  **Class Loading:** JVM ClassLoader loads files into memory.
4.  **Bytecode Verification:** Security mechanism ensures integrity.
5.  **Execution:** Execution Engine converts bytecode to native machine code.

This managed environment eliminates manual memory management and direct pointer manipulation errors.
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
            title: '2. Lexical Structure & Data Systems',
            description: `
**Primitive Data Types:**
*   **Integral:** \`byte\` (8-bit), \`short\` (16-bit), \`int\` (32-bit, default), \`long\` (64-bit).
*   **Floating-Point:** \`float\` (32-bit), \`double\` (64-bit, default).
*   **Boolean:** \`boolean\` (true/false).
*   **Character:** \`char\` (16-bit Unicode).

**Variable Scope:**
*   **Local:** Inside methods (Stack). Must be initialized.
*   **Instance:** Inside class (Heap). Defines object state.
*   **Static:** Belongs to Class (Metaspace). Shared.

**Control Flow:**
*   **Switch Expression (Java 14+):** Functional style \`->\`. No fall-through. Returns values.
*   **Loops:** \`while\`, \`do-while\`, \`for\`, \`for-each\`.
`,
            exampleProblems: [
                'Choosing the right data type for efficiency',
                'Preventing "Switch Fall-Through" bugs'
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
            title: '3. Data Structures I: Arrays & Algorithms',
            description: `
**Array Architecture:**
Fixed-size, contiguous memory block. \`int[] arr = new int[5];\` allocates space on Heap, reference on Stack.

**Core Algorithms:**
*   **Accumulator Pattern:** Summing/Averaging. Watch out for integer division!
*   **Counter Pattern:** Frequency analysis.
*   **Min/Max Finding:** Initialize with \`Integer.MIN_VALUE\` or first element, not 0.
*   **Two-Pointer Technique:** In-place reversal ($O(N)$ time, $O(1)$ space).
*   **Merging:** Combining two sorted arrays into a third sorted array ($O(N+M)$).
`,
            exampleProblems: [
                'Finding the maximum value in an array of negative numbers',
                'Reversing an array in-place'
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
            title: '4. Object-Oriented Architecture',
            description: `
**Class vs Object:**
*   **Class:** Logical blueprint. No memory.
*   **Object:** Physical instance on Heap.

**Memory Management:**
*   **Stack:** Local variables, method frames. LIFO.
*   **Heap:** Objects. Managed by Garbage Collector (GC).

**Constructors:**
Ensure valid state upon creation. \`this\` keyword refers to current instance.
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
            title: '5. Encapsulation & Inheritance',
            description: `
**Encapsulation:**
Bundling data with methods.
*   **Access Modifiers:** \`private\`, \`default\`, \`protected\`, \`public\`.
*   **Getters/Setters:** Allow validation logic (Defensive Coding).

**Inheritance (Is-A):**
Code reuse via \`extends\`.
*   **super:** Calls parent constructor/methods.
*   **Object Class:** Root of all classes (\`toString\`, \`equals\`).
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
            title: '6. Abstraction & Polymorphism',
            description: `
**Abstraction:**
Hiding implementation details.
*   **Abstract Class:** Partial template. Can have state.
*   **Interface:** Pure contract. Supports multiple implementation.

**Polymorphism:**
*   **Overloading (Compile-Time):** Same name, different params.
*   **Overriding (Run-Time):** Subclass implementation.
*   **Dynamic Dispatch:** JVM decides method at runtime based on actual object type.
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
            title: '7. String Manipulation & Math',
            description: `
**String Immutability:**
Strings are immutable.
*   **String Constant Pool (SCP):** Optimizes memory for literals.
*   **StringBuilder:** Mutable sequence for efficient concatenation.

**Math:**
*   \`Math.random()\`: Returns double $0.0 \\le x < 1.0$.
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
            title: '8. Robustness: Exception Handling',
            description: `
**Exception Hierarchy:**
*   **Checked:** Environmental errors (IO). Must be handled (\`try-catch\` or \`throws\`).
*   **Unchecked (Runtime):** Logic errors (NullPointer).

**Control Flow:**
*   **finally:** Cleanup block (always runs).
*   **Try-With-Resources:** Auto-closes resources (Java 7+).
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
            title: '9. The Collections Framework',
            description: `
**Core Interfaces:**
*   **List:** Ordered, duplicates allowed. (\`ArrayList\`: Fast access, \`LinkedList\`: Fast insert).
*   **Set:** Unique elements. (\`HashSet\`: Unordered, fast).
*   **Map:** Key-Value pairs. (\`HashMap\`: $O(1)$ access).

**Generics:**
Type safety (\`List<String>\`). Autoboxing handles primitives (\`int\` -> \`Integer\`).

**Performance Comparison:**
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
        <td class="border border-border p-2">$O(1)$</td>
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
            title: '10. Concurrency & Multithreading',
            description: `
**Thread Lifecycle:**
New -> Runnable -> Running -> Blocked -> Terminated.
Start with \`start()\`, not \`run()\`.

**Synchronization:**
\`synchronized\` keyword enforces mutual exclusion to prevent Race Conditions.

**Executor Framework:**
Abstracts thread management.
*   **Thread Pools:** Reuse threads (\`newFixedThreadPool\`).
*   **Future:** Represents pending result of asynchronous \`Callable\`.
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
            title: '11. Functional Programming (Java 8+)',
            description: `
**Lambda Expressions:**
Concise syntax for Functional Interfaces. \`(params) -> { body }\`.

**Stream API:**
Declarative data processing.
*   **Pipeline:** Source -> Intermediate (Lazy) -> Terminal.
*   **Lazy Evaluation:** Optimization (e.g., \`findFirst\` stops early).

**Optional:**
Container to avoid \`NullPointerException\`. Forces explicit handling of absence.
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
        }
    ],
    faqs: []
};
