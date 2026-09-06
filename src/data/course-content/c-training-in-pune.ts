import type { CourseRichContent } from "./types";

export const cTrainingInPune: CourseRichContent = {
  intro:
    "C is the foundational systems-programming language — the language behind the Linux kernel, every operating system, every embedded controller in every Pune-manufactured car / Cummins engine / Honeywell automation device, every database engine, every browser engine, and every language runtime (Python's CPython, Node.js's V8, the JVM, the .NET CLR are all written in C / C++). Archer Infotech's C training in Pune teaches the language as it is actually used in 2026 — modern C (C17 / C23 features where compilers support them, primarily on GCC 14 and Clang 18+), pointers and pointer arithmetic at the depth that real systems engineers need, dynamic memory management without leaking, the standard library, file handling, plus the discipline of writing C that runs reliably for years (defensive coding, static analysis with cppcheck, undefined-behaviour awareness). The course is the right foundation for engineering students, embedded / firmware careers, and the natural prerequisite for our C++ track. Classroom in Kothrud, online live, and weekend batches available.",

  whyLearn: {
    heading: "Why Learn C in 2026",
    paragraphs: [
      "C is not a legacy language — it is a foundational one, and the gap between knowing C and not knowing C separates 'I learned to program' from 'I understand how computers actually work'. Pune's automotive R&D ecosystem (Mercedes-Benz R&D India, BMW TechWorks, Volkswagen IT Services, Bajaj Auto, Tata Motors via Tata Technologies Pune, Cummins, Atlas Copco, John Deere ETC, plus the entire Tier-1 / Tier-2 supplier ecosystem) hires aggressively for embedded C / C++ engineers — Indeed Pune lists 600+ active embedded / firmware / systems openings in 2026, with continuous hiring at companies like KPIT (a major Pune automotive software employer), L&T Technology Services, Tata Elxsi, Persistent Embedded Systems, and the captive R&D arms above.",
      "Beyond automotive: Pune's IoT / device-engineering scene (Honeywell, Schneider Electric Pune, ABB Pune), the test-and-measurement space (National Instruments Pune), and most engineering colleges' research labs all run on C. Plus the broader software-engineering reality — every senior backend engineer benefits from C-level intuition because every language eventually has a 'why is this slow / why does this leak / why does the GC pause' question that C-fluency answers cleanly.",
      "What this means for hiring: Pune embedded / firmware JDs in 2026 expect C fluency, pointer mastery, dynamic memory discipline, basic OS understanding (processes, threads, syscalls), and ideally exposure to embedded toolchains (ARM toolchain, microcontroller programming via STM32 / ESP32 / Arduino). Senior roles add C++ (covered in our follow-on track), Yocto / embedded Linux, and AUTOSAR for automotive specifically. Archer Infotech's C course covers the language depth Pune embedded employers test for.",
    ],
    keyPoints: [
      "600+ active embedded / firmware / systems openings on Indeed Pune (May 2026)",
      "Pune automotive ecosystem — KPIT, Tata Elxsi, L&T Tech Services, Mercedes-Benz, BMW",
      "Modern C — C17 / C23 on GCC 14 / Clang 18+",
      "Foundation for C++, embedded firmware, OS / kernel work, and senior systems engineering",
      "The intuition that makes you better at every other language",
    ],
  },

  whoIsThisFor: {
    forYou: [
      "Engineering, BCS, MCA, or BSc-CS student targeting embedded / firmware / systems roles in Pune",
      "First-year engineering student who wants the foundation language before college C / C++ courses get serious",
      "Working developer in another language wanting C-level intuition for senior systems roles",
      "Career restarter targeting the embedded / automotive software space (large Pune market, lower competition than web)",
      "Working professional preparing for our C++ track — C is the natural prerequisite",
    ],
    notForYou: [
      "If your goal is web / frontend / backend-web work — JavaScript or Python is the better starting point",
      "If you cannot put in 6–8 hours per week of practice outside class — C is unforgiving with practice; concepts compound",
      "If you only want a certificate sticker with no portfolio — Pune embedded hiring screens hard on real C code on GitHub",
      "If you have 2+ years of production C / firmware experience — you'll be under-stretched; jump to our C++ track or talk to us about embedded specialisations",
    ],
  },

  curriculum: [
    {
      title: "C Foundations & Toolchain",
      weekRange: "Week 1",
      description:
        "C from first principles. Cover the compilation model (preprocessing → compilation → assembly → linking — and why each stage matters), GCC 14 / Clang 18+ on Linux / WSL2 / macOS, the standard C library, plus the modern toolchain — Make for build management, gdb for debugging, valgrind for memory checks, cppcheck for static analysis. Then the language basics — primitive types, signed vs unsigned integer math, the integer-promotion rules (where most C bugs come from), variables, control flow (if / else / switch / while / for / do-while), basic operators, expressions.",
      topics: [
        "Compilation model — preprocessor, compiler, assembler, linker",
        "GCC, Clang, Make, gdb, valgrind, cppcheck setup",
        "Primitive types — char, short, int, long, long long",
        "Signed vs unsigned integer rules and promotion",
        "Floats — float, double, long double, IEEE 754 awareness",
        "Control flow — if, switch, while, for, do-while",
        "Operators and expression evaluation",
      ],
    },
    {
      title: "Variables, Data Types, Operators & Expressions",
      weekRange: "Week 1",
      description:
        "C's type system is small and unforgiving, and understanding it precisely is what makes the rest of the language safe. Integer and floating types and their actual sizes on your machine; signed against unsigned and the wraparound behaviour that produces security bugs; constants and `const`; and the storage classes — `auto`, `static`, `extern`, `register` — which decide lifetime and visibility.\n\nOperators cover arithmetic, relational, logical, bitwise, assignment and the conditional operator, along with precedence, associativity, and the type-promotion rules that quietly turn a comparison into something other than what it looks like. Overflow, underflow and undefined behaviour are named here rather than met later as a mystery.",
      topics: [
        "Integer and floating-point types and their real sizes",
        "signed and unsigned, and wraparound",
        "Constants, const and #define compared",
        "Storage classes — auto, static, extern, register",
        "Arithmetic, relational and logical operators",
        "Bitwise operators and shift behaviour",
        "Assignment, increment and the comma operator",
        "Precedence, associativity and defensive parentheses",
        "Implicit type promotion and explicit casting",
        "Overflow, underflow and undefined behaviour",
      ],
    },
    {
      title: "Control Flow — Decisions, Loops & Program Structure",
      weekRange: "Week 1",
      description:
        "The building blocks of every algorithm you will write, taught until the logic is automatic. `if`, `else if`, nested conditions and `switch` with its fall-through behaviour — which is a feature often enough to be worth understanding rather than always guarding against.\n\nLoops cover `for`, `while` and `do...while`, nesting, and `break` and `continue`, along with the off-by-one errors that account for a large share of beginner bugs. The module deliberately spends time on trace-by-hand exercises: writing the value of each variable on paper for each iteration is slow, unfashionable and the single fastest way to stop guessing what a loop does.",
      topics: [
        "if, else if and nested conditions",
        "switch, case and deliberate fall-through",
        "The conditional operator as an expression",
        "for, while and do...while",
        "Choosing the right loop for the problem",
        "Nested loops and pattern programs",
        "break, continue and loop control",
        "Off-by-one errors and boundary conditions",
        "Infinite loops and how to spot one",
        "Tracing a loop by hand before running it",
      ],
    },
    {
      title: "Functions, Arrays & Strings",
      weekRange: "Week 2",
      description:
        "Functions — declarations vs definitions, header files, parameter passing (by value), return values, recursion, plus the discipline of writing functions that return error codes (errno style) vs out-parameters. Arrays — declaration, initialisation, indexing, the array-decays-to-pointer rule that confuses every C beginner once but is fundamental once internalised. Strings — null-terminated character arrays, string.h functions (strlen, strcpy, strncpy, strcat, strcmp), and the security implications (buffer overflow — the source of most CVEs in C code).",
      topics: [
        "Function declaration vs definition",
        "Header files (.h) and translation units",
        "Parameter passing by value",
        "Recursion and the call stack",
        "Arrays — declaration, indexing, decay-to-pointer",
        "Strings — null-terminated character arrays",
        "string.h — strlen, strcpy, strncpy, strcat, strcmp",
        "Buffer overflow risks and safer alternatives",
      ],
    },
    {
      title: "Pointers & Pointer Arithmetic",
      weekRange: "Week 3",
      description:
        "The heart of C, and the topic that separates C programmers from C-fluent programmers. Cover what a pointer actually is (an address, with a type that determines how it is interpreted), pointer declaration and dereferencing, pointer arithmetic, pointer-to-pointer (and why double pointers appear in real code), arrays as pointers (the deep equivalence), function pointers (and how they enable callbacks), const-correctness on pointers (`const char *` vs `char * const` vs `const char * const`), plus the discipline of always initialising pointers (NULL or a valid address — never uninitialised).",
      topics: [
        "Pointer basics — declaration, dereferencing, NULL",
        "Pointer arithmetic — + and - on pointers",
        "Pointer-to-pointer and double pointers",
        "Arrays as pointers — the deep equivalence",
        "Function pointers and callbacks",
        "const-correctness on pointers",
        "Pointer pitfalls — uninitialised, dangling, wild",
      ],
    },
    {
      title: "Dynamic Memory Management",
      weekRange: "Week 4",
      description:
        "malloc / calloc / realloc / free — the four functions that define C memory management, and the discipline of using them without leaking or double-freeing. Cover the heap vs the stack vs the data segment, when each fits, the discipline of paired allocate / free in the same scope when possible, plus modern alternatives (RAII patterns where you can simulate them in C, the goto-cleanup pattern that is widely used in the Linux kernel for error paths). We use valgrind extensively in this week — every student finds and fixes at least three real memory bugs they wrote.",
      topics: [
        "Heap vs stack vs data segment",
        "malloc / calloc / realloc / free",
        "Paired allocate / free discipline",
        "The goto-cleanup pattern (Linux kernel style)",
        "valgrind for leak detection",
        "Address sanitiser (ASan) for runtime bug detection",
        "Common bugs — leaks, double-free, use-after-free",
      ],
    },
    {
      title: "Structures, Unions & Enumerations",
      weekRange: "Week 5",
      description:
        "User-defined types in C. Structures (struct) — declaration, member access, dot vs arrow operator, structure padding and alignment (the topic every embedded interview tests for), bitfields (used heavily in microcontroller register definitions), self-referential structures (the foundation of linked lists, trees, graphs). Unions and when they are right (memory-constrained embedded code, type-punning carefully). Enumerations (enum) — when to use them vs preprocessor macros. We finish by implementing a small linked list and a binary tree in pure C.",
      topics: [
        "Struct declaration and access",
        "Padding, alignment, packed structures",
        "Bitfields for register-level programming",
        "Self-referential structures",
        "Unions for type-punning and memory savings",
        "Enumerations vs #define",
        "Linked list and binary tree implementation",
      ],
    },
    {
      title: "Bit Manipulation & Low-Level Operations",
      weekRange: "Week 5",
      description:
        "The material that makes C worth learning even if you never ship C, and that appears constantly in embedded, systems and interview contexts. Bitwise AND, OR, XOR and NOT; left and right shifts and the difference between arithmetic and logical shifting; and the standard idioms — setting, clearing, toggling and testing an individual bit.\n\nBit fields inside structures, masks and flag registers follow, which is exactly how hardware is addressed in embedded work. The module closes on the classic interview problems: counting set bits, swapping without a temporary, checking powers of two, and finding the single unpaired number in an array.",
      topics: [
        "AND, OR, XOR and NOT at the bit level",
        "Left and right shifts, arithmetic and logical",
        "Setting, clearing, toggling and testing a bit",
        "Masks and flag registers",
        "Bit fields inside structures",
        "Packing multiple values into one word",
        "Counting set bits",
        "Swapping without a temporary variable",
        "Checking and rounding to powers of two",
        "Endianness and byte order",
      ],
    },
    {
      title: "File I/O, Standard Library & Preprocessor",
      weekRange: "Week 6",
      description:
        "File handling — fopen / fclose / fread / fwrite / fprintf / fscanf, plus the lower-level POSIX system calls (open, read, write, close — the foundation that real Linux / embedded code uses). Standard library coverage — stdio.h, stdlib.h, string.h, math.h, time.h, ctype.h. The preprocessor in depth — #define for constants and macros, conditional compilation (#ifdef / #ifndef / #if), include guards, plus the discipline of using `static const` and `enum` over `#define` for constants in modern C.",
      topics: [
        "fopen, fclose, fread, fwrite, fprintf, fscanf",
        "POSIX system calls — open, read, write, close",
        "Standard library — stdio, stdlib, string, math, time",
        "errno and error handling",
        "Preprocessor directives — #define, #ifdef, #include",
        "Include guards and #pragma once",
        "Modern C — `static const` and `enum` over `#define`",
      ],
    },
    {
      title: "Modular Programming & Multi-File Projects",
      weekRange: "Week 6",
      description:
        "How a C program stops being one file. Header files and implementation files and what belongs in each; include guards and `#pragma once` and the duplicate-definition errors they prevent; `extern` declarations; and internal linkage with `static` at file scope, which is C's approximation of a private function.\n\nThe compilation model is then made explicit — preprocess, compile, assemble, link — because almost every confusing C error is a message from one specific stage, and knowing which one narrows the problem immediately. Makefiles cover targets, dependencies and incremental builds, and you split an existing single-file program into a properly organised project.",
      topics: [
        "Header files and implementation files",
        "Include guards and #pragma once",
        "extern declarations and shared symbols",
        "static at file scope for internal linkage",
        "Preprocess, compile, assemble, link",
        "Reading a linker error and finding the cause",
        "Object files, archives and static libraries",
        "Makefiles — targets, dependencies, incremental builds",
        "Separating interface from implementation",
        "Refactoring one file into a real project",
      ],
    },
    {
      title: "Data Structures Using C",
      weekRange: "Week 6",
      description:
        "Building the structures other languages hand you, which is the fastest route to genuinely understanding them. Linked lists — singly, doubly and circular — implemented with your own memory management, so that insertion, deletion and traversal are operations you have written rather than called.\n\nStacks and queues on both arrays and lists; trees and binary search trees with recursive traversal; and hash tables with a collision strategy you chose. Because C gives you no safety net, every leak and every dangling pointer is yours to find — which is exactly why this module produces a durable understanding that a `std::vector` or an `ArrayList` never does.",
      topics: [
        "Singly, doubly and circular linked lists",
        "Insertion, deletion and traversal by hand",
        "Stacks on arrays and on lists",
        "Queues and circular buffers",
        "Binary trees and recursive traversal",
        "Binary search trees — insert, search, delete",
        "Hash tables and collision handling",
        "Choosing a structure for a problem",
        "Memory ownership in a data structure",
        "Finding leaks and dangling pointers in your own code",
      ],
    },
    {
      title: "Debugging, Error Diagnosis & Secure C Practices",
      weekRange: "Week 6",
      description:
        "C fails in ways higher-level languages cannot, so diagnosis is a taught skill rather than an assumed one. Compiler warnings turned all the way up and treated as errors — most segmentation faults were a warning you ignored. GDB for breakpoints, stepping, backtraces and inspecting memory; Valgrind and sanitisers for leaks, invalid reads and use-after-free.\n\nSecurity covers the classic C vulnerability classes, which exist because the language trusts you: buffer overflows, `gets` and the unsafe string functions, format-string bugs, integer overflow, and unchecked `malloc`. The defensive habits taught here — bounds checking, safe alternatives, validating every input — are the difference between working code and safe code.",
      topics: [
        "Compiler warnings as the first line of defence",
        "GDB — breakpoints, stepping, backtraces",
        "Inspecting memory and variables in a debugger",
        "Valgrind and address sanitisers",
        "Reading a segmentation fault",
        "Buffer overflows and bounds checking",
        "Unsafe string functions and their alternatives",
        "Format-string vulnerabilities",
        "Integer overflow and unchecked arithmetic",
        "Checking every malloc and every return value",
      ],
    },
    {
      title: "Capstone Project & Embedded / Systems Onboarding",
      weekRange: "Week 7",
      description:
        "One week of full-time capstone work plus a focused 'next-step' embedded / systems primer. Pick one of three capstone projects (see Capstone Projects). The final session previews embedded development (ARM toolchain, microcontroller basics on STM32 / ESP32) or our C++ track based on your target. Mock interviews are calibrated for entry-level embedded / firmware / systems roles in Pune; resume / LinkedIn / GitHub polish included.",
      topics: [
        "Capstone implementation, deployment, README",
        "Code review with the lead trainer — style, safety, performance",
        "Embedded toolchain primer — ARM, STM32, ESP32",
        "Resume + LinkedIn rewrite for embedded / firmware / systems JDs",
        "GitHub portfolio polish",
        "HR mock interview and salary negotiation",
      ],
    },
    {
      title: "Problem Solving & Algorithmic Thinking in C",
      weekRange: "Week 7",
      description:
        "Turning language knowledge into the ability to solve an unfamiliar problem under time pressure, which is what a technical screening measures. Decomposition, pseudocode before code, and tracing an approach on paper before typing it — the habits that separate candidates who start writing immediately and fail from those who think first and finish.\n\nThe standard patterns follow: searching, sorting, recursion and its base cases, two pointers, sliding windows and prefix sums. Complexity analysis runs throughout in Big-O terms, because the follow-up question after \"does it work\" is always \"what does it cost\", and a candidate without an answer stalls there.",
      topics: [
        "Decomposing a problem before coding",
        "Pseudocode and tracing on paper",
        "Linear and binary search",
        "Bubble, selection, insertion and merge sort",
        "Recursion, base cases and the call stack",
        "Two-pointer techniques",
        "Sliding window problems",
        "Prefix sums and cumulative arrays",
        "Big-O analysis of time and space",
        "Explaining your approach aloud under questioning",
      ],
    },
    {
      title: "Git, GitHub & Building Your C Portfolio",
      weekRange: "Week 7",
      description:
        "The professional habits, applied to systems work. Git as collaboration rather than three memorised commands: branching, merging, resolving conflicts, pull requests, and a commit history someone else can follow.\n\nFor C specifically, a credible repository needs more than source: a Makefile that builds cleanly, a README stating platform and compiler assumptions, sample input and expected output, and a statement of what the program does not handle. That last item matters more than beginners expect — a candidate who documents the limitations of their own code reads as considerably more senior than one who claims none.",
      topics: [
        "Branching, merging and resolving conflicts",
        "Commit messages a stranger can follow",
        "Pull requests and code review",
        ".gitignore for build artefacts",
        "A Makefile that builds from a clean checkout",
        "README with platform and compiler assumptions",
        "Sample input, expected output and test scripts",
        "Documenting known limitations honestly",
        "Consistent C style and formatting",
        "Presenting a systems project at interview",
      ],
    },
    {
      title: "AI-Assisted Development Workflow",
      weekRange: "Final Week",
      highlight: true,
      description:
        "The skill every 2026 hiring panel now probes for — building real work with AI in the loop, responsibly. Learn to drive AI assistants (GitHub Copilot, Claude, Cursor, and IDE-native AI) to scaffold and accelerate the tools and stack this course covers, generate tests, explain and refactor unfamiliar code, and cut the boilerplate — while keeping you firmly in control of every decision. Heavy focus on guardrails: reviewing each AI suggestion, spotting hallucinated APIs or wrong answers, and handling licensing and data-privacy concerns. Close with a mini-project that takes a deliverable end-to-end using an AI-assisted workflow, then fold the same tooling into version control and everyday team practice.",
      topics: [
        "AI assistants — GitHub Copilot, Claude, Cursor, IDE-native AI",
        "Effective prompting for this course's stack — scaffolding, boilerplate, config",
        "AI-assisted test generation and coverage",
        "Explaining, refactoring, and modernising unfamiliar code with AI",
        "AI-driven review, error detection, and quality checks",
        "Generating and maintaining documentation with AI",
        "AI debugging — interpreting errors, logs, and failing output",
        "Guardrails — reviewing output, avoiding hallucinations, licensing & data privacy",
        "Team workflow — AI in the editor, in reviews, and in delivery pipelines",
        "Mini-project — a deliverable built end-to-end with an AI-assisted workflow",
      ],
    },
  ],

  roadmapImage: {
    src: "/images/courses/c-programming-workflow-v1.webp",
    width: 1400,
    height: 900,
    alt: "Eight-stage C programming learning sequence at Archer Infotech Pune, covering C foundations, compiler workflow, functions, arrays, strings, pointers, memory management, structures, unions, file input output, POSIX basics, embedded systems onboarding, capstone projects and interview preparation.",
    caption:
      "The C course is ordered around systems thinking: compiler model, memory, pointers, structures, files, then embedded and systems capstone work.",
  },

  syllabusDownload: {
    pdfUrl: "/downloads/c-programming-syllabus-v1.pdf",
    title: "C Programming Course Syllabus — Complete Module List",
    slug: "c-programming-syllabus",
    blurb:
      "The complete 30-module syllabus as a 20-page PDF — programming fundamentals, the C toolchain, data types and operators, control flow, functions, arrays and strings, pointers, dynamic memory, structures, unions, the preprocessor, file handling, bit manipulation, data structures in C, debugging, secure practices, problem solving, mini projects, a capstone and interview preparation. Everything in it is on this page; the PDF is the portable version.",
    asideBlocks: [
      {
        heading: "What is inside the 20-page PDF",
        items: [
          "All 30 modules in teaching order, each with its topic list and practical exercises.",
          "Pointers and dynamic memory given the space they need — the material that decides whether the rest of C makes sense.",
          "Data structures implemented from scratch: linked lists, stacks, queues, trees and hash tables with your own memory management.",
          "Recommended lab assignments, suggested duration, prerequisites, tools, learning outcomes and the recommended progression after C.",
        ],
      },
      {
        heading: "Roles this syllabus prepares you for",
        items: [
          "Embedded and systems programming entry roles.",
          "The strongest possible foundation before C++, Java or Python.",
          "Placement preparation where C is the screening language.",
          "Engineering students whose curriculum assumes C.",
        ],
      },
    ],
  },

  projects: [
    {
      title: "Mini Database Engine in C",
      description:
        "A simple disk-backed key-value database written in C — fixed-size B-tree on disk for the index, log-structured append for values, basic CRUD operations, persistence across runs, plus a small REPL for queries. Demonstrates pointer mastery, file I/O, dynamic memory, and the systems-programming discipline that Pune embedded / database hiring panels test for. Outcome: a public GitHub repository with valgrind-clean output and a small README.",
      technologies: [
        "C17 with GCC 14 or Clang 18+",
        "POSIX file I/O",
        "B-tree index",
        "valgrind + ASan in CI",
      ],
    },
    {
      title: "Microcontroller Firmware (Optional Embedded Track)",
      description:
        "For students targeting embedded careers: a small firmware project on ESP32 or STM32 — read sensor data over I2C / SPI, process it, transmit over UART or Wi-Fi (ESP32). Pure C with the vendor SDK or Arduino framework, demonstrating hardware-register programming, interrupt handling, and the embedded-C idioms (volatile-correct, no-malloc-after-init). Hardware kit (~₹1,500–₹2,000) optional and student-purchased.",
      technologies: [
        "C17 / Embedded C",
        "ESP32 / STM32 SDK",
        "I2C / SPI / UART",
        "Interrupt handlers",
      ],
    },
    {
      title: "Linked-Data-Structure Library",
      description:
        "A reusable C library implementing common data structures — singly and doubly linked lists, hash table with separate chaining, binary search tree, dynamic array (vector), generic via void* function pointers. Built with a Makefile, unit tests via a simple xUnit-style framework, valgrind-clean across all tests, plus a small example demo. Demonstrates the discipline of writing reusable, testable C — exactly the artefact that opens senior junior C / systems interviews.",
      technologies: [
        "C17 with GCC / Clang",
        "Make build system",
        "Generic functions via void*",
        "valgrind + Address Sanitiser CI",
      ],
    },
  ],

  trainersIntro:
    "Your batch is led by Yogesh Patil (Founder & Director, 15+ years, hands-on with C / C++ systems programming) and Amol Chougule (Technical Trainer with software-development experience at Mindstix). Both personally take sessions in every batch — the names you see here are the names you meet on day one.",

  careerOutcomes: {
    paragraphs: [
      "C fluency is the foundation for embedded / firmware / systems roles — Indeed Pune lists 600+ active openings in this segment, with continuous hiring at KPIT (Pune's largest automotive-software employer), Tata Elxsi, L&T Technology Services, Persistent Embedded Systems, plus the captive R&D arms of Mercedes-Benz, BMW TechWorks, Volkswagen IT Services, Tata Motors / Tata Technologies, Bajaj Auto, Cummins, Honeywell, Atlas Copco, John Deere ETC, and the IoT / device-engineering scene. C is also the prerequisite for C++, which expands the role landscape significantly.",
      "What pulls a C developer above the median band: a public GitHub repository with at least one valgrind-clean systems project, demonstrable pointer / memory / data-structure depth, ideally one embedded-firmware project on real hardware (ESP32 / STM32 / Arduino — small kit cost), and the discipline of writing defensive C that survives static analysis. Our capstone projects are designed exactly around these signals.",
      "Senior Embedded / Systems Engineer bands at the top end are reported as national figures (Pune-specific Indeed pages do not exist for these specific titles); Pune trends within ±10% of these figures based on AmbitionBox and 6figr.",
    ],
    salaryBands: [
      {
        role: "C Developer / Embedded C Engineer (Pune entry, <2 years)",
        band: "₹3,50,000 – ₹6,00,000 per year",
        source: {
          label: "AmbitionBox Pune Embedded C Engineer",
          url: "https://www.ambitionbox.com/profile/embedded-c-engineer-salary-in-pune",
        },
      },
      {
        role: "Embedded Software Engineer (Pune, 2–4 years)",
        band: "₹6,00,000 – ₹11,00,000 per year",
        source: {
          label: "Glassdoor Pune Embedded Engineer",
          url: "https://www.glassdoor.co.in/Salaries/pune-embedded-engineer-salary-SRCH_IL.0,4_IM1072_KO5,22.htm",
        },
      },
      {
        role: "Senior Embedded / Firmware Engineer (Pune, 5–8 years)",
        band: "₹14,00,000 – ₹24,00,000 per year",
        source: {
          label: "Glassdoor Pune Senior Embedded Engineer",
          url: "https://www.glassdoor.co.in/Salaries/pune-senior-embedded-engineer-salary-SRCH_IL.0,4_IM1072_KO5,29.htm",
        },
      },
      {
        role: "Lead Embedded Systems Engineer (national, 8+ years)",
        band: "₹22,00,000 – ₹38,00,000 per year",
        source: {
          label: "6figr India Lead Embedded Engineer (Pune ±10%)",
          url: "https://6figr.com/in/salary/lead-embedded-engineer--t",
        },
      },
    ],
    hiringCompanies: [
      "KPIT Technologies",
      "Tata Elxsi",
      "L&T Technology Services",
      "Persistent Embedded Systems",
      "Mercedes-Benz R&D India",
      "BMW TechWorks India",
      "Volkswagen IT Services",
      "Tata Technologies",
      "Bajaj Auto",
      "Cummins India",
      "Honeywell",
      "Atlas Copco",
      "John Deere ETC",
      "Schneider Electric",
      "ABB India",
      "National Instruments",
    ],
    rolesAfterCourse: [
      "Junior Embedded C Engineer",
      "Firmware Engineer (with hardware experience)",
      "Systems Programmer",
      "Junior Automotive Software Engineer",
      "Junior IoT / Device Developer",
      "Prerequisite met for our C++ track",
    ],
  },

  modesAndDuration: {
    duration:
      "6 weeks of structured curriculum plus 1 week of capstone project and embedded / systems onboarding (~1.5 months total)",
    classroom: {
      location: "Archer Infotech, Kothrud, Pune",
      timing: [
        "Morning batch — 10:00 to 13:00",
        "Evening batch — 18:00 to 21:00",
        "Lab access available outside class hours",
      ],
    },
    online: {
      timing: [
        "Same hours as classroom batches — morning or evening",
        "Recordings available for review",
        "Same code reviews and project feedback as in-person batches",
      ],
      tools: [
        "Zoom for live sessions",
        "GitHub for code reviews and PRs",
        "GCC / Clang on Linux / WSL2 / macOS",
        "Slack / WhatsApp for asynchronous Q&A",
      ],
    },
    weekend: {
      timing: ["Saturday + Sunday, 09:00 to 13:00"],
      durationNote:
        "Stretches over ~2.5 months instead of 1.5 to accommodate working professionals.",
    },
    batchPolicy:
      "Maximum 15 students per batch. Classroom batches start every 3 weeks; weekend batches every 5 weeks.",
  },

  fees: {
    note:
      "Course fees range from ₹20,000 to ₹90,000 depending on mode, batch type, and any applicable concession — C as a 1.5-month foundational course typically lands at the lower end of that range. Most students take C as a stepping stone to C++ or as a foundation for embedded careers; ask about the bundled C + C++ pricing for combined enrolment.",
    range:
      "₹20,000 – ₹90,000 (C, as a focused 1.5-month course, typically lands at the lower end of the range; combined C + C++ enrolment offers significant bundle savings)",
    paymentOptions: [
      "Single payment with early-bird discount",
      "EMI in 2 instalments at no extra cost",
      "Corporate sponsorship — invoiced to your employer with GST",
      "Bundled C + C++ enrolment with discount",
    ],
  },

  placementSupport: {
    paragraphs: [
      "C alone is foundational rather than a standalone hireable specialisation in 2026; placement focus is calibrated for embedded / firmware entry roles where C is the primary requirement. By the end of the curriculum your resume highlights pointer / memory / data-structure mastery, your GitHub has at least two valgrind-clean repositories, and you have completed at least two mock technical interviews focused on entry-level embedded / firmware roles.",
      "We say placement support, not placement guarantee. Our support is unconditional, time-bound (six months after course completion), and includes free re-entry to a future batch's interview-prep sessions. Most C graduates progress directly to our C++ course or take an embedded-firmware specialisation as the natural depth specialisation that turns C fluency into a hireable embedded role.",
    ],
    process: [
      "Week 5 — resume and LinkedIn rewrite, calibrated for embedded / firmware JDs",
      "Week 6 — GitHub portfolio cleanup, valgrind-clean badge, README polish",
      "Week 7 — two rounds of mock technical interviews calibrated for entry-level embedded roles",
      "Week 7 — HR mock interview and salary negotiation coaching",
      "Post-course — referrals via our 17-year alumni network at 12+ partner companies (with extra emphasis on KPIT, Tata Elxsi, L&T Tech Services)",
      "Strong recommendation to enrol in our C++ course as the natural next step",
      "Up to 6 months of continued support after course end",
      "Free re-entry to future batch interview-prep sessions if first round does not land",
    ],
    partnerCompanies: [
      "KPIT Technologies",
      "Tata Elxsi",
      "L&T Technology Services",
      "Persistent Embedded Systems",
      "Mercedes-Benz R&D India",
      "BMW TechWorks India",
      "Tata Technologies",
      "Cummins",
      "Honeywell",
      "Atlas Copco",
      "John Deere ETC",
    ],
  },

  comparison: {
    intro:
      "We compare ourselves against typical Pune C training institutes on factual rows only — no logos, no opinions. Use this as a checklist when evaluating any institute.",
    rows: [
      {
        feature: "Trainers named on course page with photos and LinkedIn",
        archer: "Yes — Yogesh Patil and Amol Chougule",
        typical: "No — generic 'expert trainers' branding",
      },
      {
        feature: "C standard covered",
        archer: "C17 + C23 features on GCC 14 / Clang 18+",
        typical: "C89 / C99 — pre-2010 standards still",
      },
      {
        feature: "Memory tooling",
        archer: "valgrind + Address Sanitiser + cppcheck integrated into every project",
        typical: "Slides only, no actual tool use",
      },
      {
        feature: "Pointer depth",
        archer: "Full week — pointer arithmetic, pointer-to-pointer, function pointers, const-correctness",
        typical: "One day, basics only",
      },
      {
        feature: "Embedded primer included",
        archer: "Yes — ARM / STM32 / ESP32 toolchain overview, optional firmware capstone",
        typical: "Not covered",
      },
      {
        feature: "Public GitHub portfolio output",
        archer: "Yes — valgrind-clean projects with CI badges",
        typical: "Local code on a hard drive",
      },
      {
        feature: "Bundled pricing with C++",
        archer: "Yes — significant discount when combined",
        typical: "Per-course pricing only",
      },
      {
        feature: "Salary data shown",
        archer: "Cited from AmbitionBox + Glassdoor + 6figr with source URLs",
        typical: "Single number with no source",
      },
      {
        feature: "Placement support duration after course",
        archer: "6 months, with free re-entry to interview prep",
        typical: "1–3 months or vaguely 'until placed'",
      },
      {
        feature: "Batch size cap",
        archer: "15 students",
        typical: "25–40 students",
      },
    ],
    closing:
      "Compare with whoever you are considering — we welcome the comparison. The right test is whether you can see actual student valgrind-clean code before you pay.",
  },

  versusAlternative: {
    heading: "C, C++, or Skip Both?",
    paragraphs: [
      "C vs C++ vs skip-both is the most-asked question in Pune embedded counselling. The honest answer: it depends on your career direction.",
      "Take C alone (this 1.5-month course) if your goal is an entry-level embedded / firmware / IoT role at a Pune Tier-1 / Tier-2 supplier where pure C is dominant, you are an engineering student building foundations early, or you are preparing for our C++ track and want C fluency first. Take C → C++ as a bundle (combined ~3.5 months) if your goal is the broader systems / embedded / game-development / quant-trading market — C++ unlocks significantly more roles and pays better at senior, and the C → C++ progression is the natural one (C++ assumes C fluency).",
      "Skip both if your goal is web / frontend / data / AI work — JavaScript or Python is the better starting point and C / C++ is unnecessary detour for those careers. Honest recommendation: pick C if you have a specific embedded / automotive / firmware target. Pick the C → C++ bundle if you want broader systems / engineering reach. Skip both if your career direction is web / data / AI / cloud.",
    ],
  },

  prerequisitesAndStart: {
    paragraphs: [
      "Prerequisites: basic computer use, willingness to commit 6–8 hours per week of practice outside class, ideally school-level math (basic algebra and binary number system understanding helps but isn't strict). No prior programming experience required; we start from `printf(\"Hello\")` on day one.",
    ],
    suggestedSteps: [
      "Decide your mode — classroom in Kothrud, online live, or weekend",
      "Check the upcoming batch dates on our batch schedule page",
      "Book a free 30-minute counselling call — we will honestly tell you whether the course fits your goal",
      "Confirm enrolment and complete pre-course orientation (GCC / Clang install scripts for Linux / macOS / Windows-with-WSL2)",
      "Show up to day one with a laptop running 64-bit Linux / macOS / Windows-with-WSL2",
    ],
  },

  faqs: [
    {
      question: "Is C still relevant in 2026?",
      answer:
        "Yes — more relevant than ever in Pune specifically. The Linux kernel, every operating system, every embedded controller, every database engine, every language runtime is written in C / C++. Pune's automotive and embedded ecosystem (KPIT, Tata Elxsi, L&T Tech Services, the captive R&D arms) hires aggressively for embedded C engineers; Indeed Pune lists 600+ active openings in this segment.",
    },
    {
      question: "How long does C training in Pune take at Archer Infotech?",
      answer:
        "Approximately 1.5 months — 6 weeks of structured curriculum plus 1 week of capstone and onboarding. The weekend batch stretches over ~2.5 months at the same content depth.",
    },
    {
      question: "What is the salary of an Embedded C Engineer in Pune?",
      answer:
        "AmbitionBox reports junior Embedded C Engineer Pune salaries at ₹3.5–6 lakh per year. Mid-level (2–4 years) earns ₹6–11 lakh per Glassdoor. Senior Embedded / Firmware Engineers (5–8 years) earn ₹14–24 lakh. Lead Embedded Systems Engineers earn ₹22–38 lakh nationally with Pune trending within ±10%.",
    },
    {
      question: "Should I learn C before C++?",
      answer:
        "Yes — C is the natural prerequisite. C++ assumes C-level fluency on pointers, memory management, and the build / compile / link model. Skipping C and going straight to C++ wastes the first 2–3 weeks of the C++ course because every C++ concept builds on C fundamentals. Many students take C → C++ back-to-back as our bundled enrolment.",
    },
    {
      question: "C or Python — which should I learn first as a beginner?",
      answer:
        "Python if your career direction is web / data / AI / cloud — Python is the better starting point and you can always pick up C later if you need it. C if your career direction is embedded / firmware / systems / automotive — C is the foundational language for that ecosystem and you cannot skip it. The honest answer depends on goal, not on which is 'better'.",
    },
    {
      question: "Will I work on real projects?",
      answer:
        "Yes — three capstone projects: (1) mini disk-backed key-value database engine in C, (2) optional microcontroller firmware project on ESP32 / STM32 with hardware kit, (3) reusable linked-data-structure library with valgrind-clean tests. All three become public GitHub repositories with passing CI badges.",
    },
    {
      question: "What about embedded / hardware?",
      answer:
        "The optional Capstone Project #2 is a microcontroller firmware project on ESP32 or STM32 — hardware kit (~₹1,500–₹2,000) is student-purchased and optional. We cover the embedded-C idioms (volatile, register access, interrupts, no-malloc-after-init) and the toolchain so you can interview for entry-level embedded roles credibly. Deeper embedded specialisation comes after this course.",
    },
    {
      question: "Are weekend C classes available in Pune?",
      answer:
        "Yes — Saturday and Sunday, 09:00–13:00, stretched over ~2.5 months instead of 1.5. Same content, same trainers, same projects.",
    },
    {
      question: "What is the fee for the C course in Pune?",
      answer:
        "Course fees range from ₹20,000 to ₹90,000 depending on mode and concession. C as a 1.5-month focused course typically lands at the lower end of this range. Bundled C + C++ enrolment offers significant savings.",
    },
    {
      question: "What support do I get after course completion?",
      answer:
        "Six months of active placement support — mock interviews calibrated for entry-level embedded / firmware roles, referrals via our alumni network (with extra emphasis on KPIT / Tata Elxsi / L&T Tech Services), resume / LinkedIn / GitHub rewrites, and salary negotiation coaching.",
    },
    {
      question: "Are the named trainers actually teaching, or are they just on the brochure?",
      answer:
        "Yogesh Patil personally leads the foundations, pointers, dynamic memory, and capstone weeks. Amol Chougule leads the structures / file I/O / preprocessor weeks. The same names you see on this page show up in your batch on day one.",
    },
  ],

  finalCta: {
    heading: "Ready to start C training in Pune?",
    paragraph:
      "We have classroom, online, and weekend batches starting every 3–5 weeks. Reach out via the enquiry form or call us — Yogesh and Amol Chougule are happy to spend 30 minutes telling you whether the course is right for you, or whether the bundled C + C++ path makes more sense for your goal. Visit our Kothrud, Pune campus, see actual student valgrind-clean projects, meet a current batch, and decide with full information.",
  },
};
