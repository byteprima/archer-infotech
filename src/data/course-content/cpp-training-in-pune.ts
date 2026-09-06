import type { CourseRichContent } from "./types";

export const cppTrainingInPune: CourseRichContent = {
  intro:
    "C++ is the backbone of high-performance computing — Pune's automotive software giants (KPIT, Tata Elxsi, L&T Tech Services), the captive R&D arms (Mercedes-Benz, BMW TechWorks, Cummins, Honeywell, John Deere ETC), every major game studio, every quant-trading firm with a Pune office, plus Pune's defence / aerospace ecosystem (Tata Advanced Systems, Bharat Forge Defence) all run on it. Archer Infotech's C++ training in Pune teaches the language as it is actually written in 2026 — modern C++ (C++17 fully baseline, C++20 modules / concepts / ranges where compilers support them, plus C++23 features on GCC 14 / Clang 18+), the Standard Template Library (containers, iterators, algorithms), RAII and smart pointers (unique_ptr / shared_ptr — never raw `new` / `delete` in new code), templates and concepts, plus the 2026 production discipline (sanitisers in CI, std::span / std::optional / std::variant for safer interfaces). The course assumes basic C familiarity from college / our C track. Classroom in Kothrud, online live, and weekend batches available.",

  whyLearn: {
    heading: "Why Learn C++ in 2026",
    paragraphs: [
      "C++ is not a legacy language; it is the language that powers everything where milliseconds and memory matter. Pune's automotive software ecosystem (KPIT, the largest Pune automotive employer; Tata Elxsi; L&T Technology Services; Persistent Embedded Systems) hires C++ engineers continuously — Indeed Pune lists 800+ active C++ openings as of May 2026 across automotive, embedded, game development, and quant trading. Beyond automotive: Pune's defence / aerospace scene (Tata Advanced Systems, Bharat Forge Defence, plus the larger DRDO / BARC ecosystem nearby), the test-and-measurement space (National Instruments Pune, Keysight), and several Pune-based quant-trading boutiques all run substantial C++ codebases.",
      "What changed in 2026: C++17 is now the default baseline (no more C++11 in new code), C++20 features (modules, concepts, ranges, coroutines) are stable on GCC 14 and Clang 18+, and C++23 features (multidimensional subscript, `std::expected`, `std::print`) are starting to land. The discipline has matured around RAII as default — modern C++ codebases use `std::unique_ptr` / `std::shared_ptr` over raw pointers and rarely call `new` / `delete` directly. The build / test / lint stack has settled — CMake for cross-platform builds, Conan or vcpkg for dependencies, GoogleTest or Catch2 for tests, clang-tidy for static analysis, AddressSanitiser / UBSan / TSan as standard CI tools.",
      "What this means for hiring: 2026 Pune C++ JDs expect modern C++ (C++17 minimum, C++20 preferred), STL fluency, smart-pointer discipline, template depth, plus build-system literacy (CMake) and ideally one specialisation (embedded, game-dev, automotive AUTOSAR, quant-trading). Senior roles add coroutines, lock-free programming awareness, and one platform / framework depth (Qt for GUI, Boost for utilities, Unreal for game development). Archer Infotech's curriculum is rebuilt around exactly these expectations — modern C++, sanitiser-disciplined, build-system aware.",
    ],
    keyPoints: [
      "800+ active C++ openings on Indeed Pune as of May 2026",
      "Pune automotive ecosystem — KPIT, Tata Elxsi, L&T Tech Services, captive R&D",
      "Modern C++17/20/23 — modules, concepts, ranges, coroutines",
      "RAII + smart pointers + sanitisers — the 2026 production discipline",
      "Specialisation paths — embedded, game-dev, AUTOSAR, quant",
    ],
  },

  whoIsThisFor: {
    forYou: [
      "Engineering, BCS, MCA, or BSc-CS student targeting embedded / automotive / game-dev / quant roles",
      "Working C developer wanting to graduate to modern C++ for senior systems / automotive roles",
      "Game developer or game-development student targeting Unreal Engine or custom-engine work",
      "Automotive software engineer targeting AUTOSAR / embedded C++ specialisations",
      "Working developer in another language wanting C++ for performance-critical work or systems-level roles",
      "Quant / financial engineer targeting Pune-based trading boutiques where C++ is the institutional default",
    ],
    notForYou: [
      "If your goal is web / frontend / data / AI work — JavaScript or Python is the better starting point",
      "If you cannot put in 8–10 hours per week of practice outside class — C++ is unforgiving with practice; it has the steepest learning curve of any major language",
      "If you only want a certificate sticker with no portfolio — Pune C++ hiring screens hard on real GitHub repos with sanitiser-clean builds",
      "If you do not have C-level fluency — take our C course first (or equivalent self-study)",
      "If you have 2+ years of production C++ experience with C++17+ — you'll be under-stretched; talk to us about advanced specialisations (modern templates / coroutines / lock-free)",
    ],
  },

  curriculum: [
    {
      title: "C++ Foundations & Modern Toolchain",
      weekRange: "Week 1",
      description:
        "Modern C++ from a C-aware starting point. Cover the C++ compilation model (and how it differs from C), namespaces, references vs pointers, default arguments, function overloading, the iostream library (we teach `std::print` from C++23 where available, with `std::cout` as fallback), input / output streams, plus the modern toolchain — GCC 14 / Clang 18+, CMake for cross-platform builds, Conan or vcpkg for dependencies, the discipline of `-Wall -Wextra -Wpedantic` warnings as errors. By the end of week 1 every student has a CMake-built C++23 project with passing CI.",
      topics: [
        "C++ vs C — the compilation differences",
        "Namespaces and `using namespace` discipline",
        "References vs pointers — when each fits",
        "Function overloading and default arguments",
        "iostream — std::cout, std::cin, std::print (C++23)",
        "GCC 14 / Clang 18+ setup",
        "CMake for cross-platform builds",
        "Conan / vcpkg for dependencies",
        "Sanitisers in CI — ASan, UBSan, TSan",
      ],
    },
    {
      title: "Syntax, Types, Control Flow & Functions",
      weekRange: "Week 1",
      description:
        "The procedural base that modern C++ still rests on. Types and their real sizes, `auto` and type deduction, `const` and `constexpr`, and the initialisation forms — including brace initialisation and why it is the safer default. Control flow, then functions: parameters by value and by reference, default arguments, overloading and the resolution rules, and `inline`.\n\nArrays and multidimensional arrays are covered alongside `std::array` and `std::vector`, with the standing recommendation to reach for the standard containers and the honest reason to still understand raw arrays: you will meet them in existing code and in every interview that touches memory.",
      topics: [
        "Fundamental types and their real sizes",
        "auto, decltype and type deduction",
        "const, constexpr and compile-time evaluation",
        "Brace initialisation and narrowing prevention",
        "Control flow and range-based for",
        "Functions, parameters by value and by reference",
        "Default arguments and function overloading",
        "Overload resolution and ambiguity errors",
        "Raw arrays, std::array and std::vector",
        "std::string against C-style strings",
      ],
    },
    {
      title: "Pointers, References & Dynamic Memory",
      weekRange: "Week 2",
      description:
        "The concepts that decide whether someone can read C++ or merely write it. Pointers and pointer arithmetic; references and the ways they differ from pointers; `const` correctness applied to both, which is where the syntax genuinely does get confusing and is worth slowing down for.\n\nDynamic memory with `new` and `delete`, arrays and their matching `delete[]`, and the failure modes: leaks, double frees, dangling pointers and use-after-free. This module deliberately precedes smart pointers so that RAII later reads as the solution to a problem you have personally had, rather than a rule you were handed.",
      topics: [
        "Pointers, dereferencing and pointer arithmetic",
        "References and how they differ from pointers",
        "const pointers and pointers to const",
        "Null pointers and nullptr",
        "new, delete and delete[]",
        "Memory leaks and double frees",
        "Dangling pointers and use-after-free",
        "Stack versus heap allocation",
        "Passing by value, reference and pointer",
        "Why manual memory management does not scale",
      ],
    },
    {
      title: "Object-Oriented C++",
      weekRange: "Weeks 2–3",
      description:
        "OOP in C++ as it is actually used in production. Classes — declaration, member functions, constructors / destructors, the rule of zero / three / five (the discipline that prevents resource-leak bugs), copy constructors vs move constructors (C++11+), copy assignment vs move assignment, default / delete on special member functions. Inheritance and polymorphism — virtual functions, virtual destructors (the topic every C++ interview tests for), pure virtual functions, abstract base classes, the diamond problem and virtual inheritance. Plus modern alternatives — composition over inheritance, type erasure, std::variant + std::visit for closed-set polymorphism.",
      topics: [
        "Classes, constructors, destructors",
        "Rule of zero / three / five",
        "Copy and move semantics (C++11+)",
        "default / delete on special member functions",
        "Inheritance, virtual functions, virtual destructors",
        "Pure virtual and abstract base classes",
        "Diamond problem and virtual inheritance",
        "Composition over inheritance",
        "std::variant + std::visit for closed-set polymorphism",
      ],
    },
    {
      title: "Operator Overloading, Friends & Const Correctness",
      weekRange: "Week 3",
      description:
        "The parts of C++ that make user-defined types behave like built-in ones. Operator overloading covers arithmetic, comparison, stream insertion and extraction, subscript, function call and assignment — with the discipline that matters more than the syntax: overload an operator only when its meaning is obvious, because a `+` that does something surprising is worse than a method with a clear name.\n\nFriend functions and classes are covered with their trade-off stated plainly. `const` correctness closes the module — const member functions, const parameters and const return values — because it is what makes an interface honest about what it will and will not modify.",
      topics: [
        "Overloading arithmetic and comparison operators",
        "Stream insertion and extraction operators",
        "Subscript, function-call and assignment operators",
        "Member versus non-member overloads",
        "The rule of three and the rule of five",
        "Copy constructor and copy assignment",
        "Friend functions and friend classes",
        "const member functions",
        "const parameters and return values",
        "When not to overload an operator",
      ],
    },
    {
      title: "Templates & Generic Programming",
      weekRange: "Week 4",
      description:
        "Templates are the heart of modern C++. Cover function templates, class templates, template specialisation (full and partial), variadic templates (the foundation of std::tuple and forward / argument forwarding), `auto` and template-argument deduction, plus the major C++20 addition — concepts (constraining templates with readable error messages, replacing the old SFINAE / enable_if pattern). We finish by writing a small generic container that uses concepts to constrain its element type cleanly.",
      topics: [
        "Function templates",
        "Class templates",
        "Full and partial specialisation",
        "Variadic templates and parameter packs",
        "auto and template-argument deduction",
        "Concepts (C++20) — constraining templates",
        "requires-clauses and requires-expressions",
        "SFINAE awareness (for reading legacy code)",
      ],
    },
    {
      title: "STL — Containers, Iterators, Algorithms",
      weekRange: "Week 5",
      description:
        "The Standard Template Library at the level you actually use it. Containers — std::vector (the default), std::array, std::deque, std::list, std::map / std::unordered_map, std::set / std::unordered_set, std::string. Iterators — input / output / forward / bidirectional / random-access, the categories that matter for choosing algorithms. Algorithms — std::sort, std::find, std::transform, std::accumulate, std::for_each, plus the C++20 ranges library (the modern, composable replacement for iterator-pair algorithms). We rewrite a typical 'mutate this vector through 5 stages' loop in three styles — classic, algorithm-based, ranges-based — to internalise the difference.",
      topics: [
        "std::vector — the default container",
        "std::array, std::deque, std::list",
        "std::map / std::unordered_map",
        "std::set / std::unordered_set",
        "std::string and std::string_view (C++17)",
        "Iterators and iterator categories",
        "Classic algorithms — sort, find, transform, accumulate",
        "Ranges (C++20) — views, pipelines",
        "Algorithm complexity awareness",
      ],
    },
    {
      title: "Exception Handling & File I/O",
      weekRange: "Week 5",
      description:
        "Failure and persistence, treated together because both are where resource management becomes visible. Exceptions cover `try`, `catch` and `throw`, the standard exception hierarchy, custom exception types, catching by reference, and the exception-safety guarantees — basic, strong and no-throw — that a library author is expected to state.\n\nThe interaction with RAII is the important part: an exception thrown between a `new` and its `delete` leaks, and destructors running during stack unwinding are what make the smart pointers in the next module correct rather than merely convenient. File I/O then covers streams, text and binary modes, error state checking and stream manipulators.",
      topics: [
        "try, catch, throw and rethrow",
        "The standard exception hierarchy",
        "Custom exception types",
        "Catching by reference, not by value",
        "Exception-safety guarantees",
        "Stack unwinding and destructors",
        "Why exceptions and raw new do not mix",
        "ifstream, ofstream and fstream",
        "Text versus binary mode",
        "Stream state, error checking and manipulators",
      ],
    },
    {
      title: "Memory, RAII & Smart Pointers",
      weekRange: "Week 6",
      description:
        "RAII is the C++ idea that defines the language. Cover the discipline — every resource (memory, file handle, mutex, network connection) gets owned by an object whose destructor releases it. Then the modern smart-pointer landscape — std::unique_ptr (the default, single-owner), std::shared_ptr (when shared ownership is genuinely needed), std::weak_ptr (for breaking cycles), std::make_unique / std::make_shared (always preferred over raw `new`). We deliberately spend a full week here because Pune C++ interviews test this depth; senior interviewers will ask you to design a small resource-owning class on the whiteboard and reject anything that uses raw `new` / `delete` without compelling reason.",
      topics: [
        "RAII — Resource Acquisition Is Initialisation",
        "std::unique_ptr — the default smart pointer",
        "std::shared_ptr — for true shared ownership",
        "std::weak_ptr — breaking cycles",
        "std::make_unique / std::make_shared",
        "Custom deleters and reference cycles",
        "When to use raw pointers (non-owning observation)",
      ],
    },
    {
      title: "Move Semantics & Perfect Forwarding",
      weekRange: "Week 6",
      description:
        "The feature that changed C++ performance characteristics, and the one most self-taught developers cannot explain. Lvalues and rvalues; rvalue references; move constructors and move assignment; and `std::move`, which is correctly described as a cast rather than as something that moves anything.\n\nThe rule of five follows from it, then perfect forwarding with forwarding references and `std::forward` — the mechanism behind `emplace_back` and every factory function in the standard library. Copy elision and return-value optimisation close the module, including the useful fact that the compiler frequently does this for you and hand-written `std::move` on a return can make things worse.",
      topics: [
        "Lvalues, rvalues and value categories",
        "Rvalue references",
        "Move constructor and move assignment",
        "std::move as a cast, not an action",
        "The rule of five",
        "noexcept move operations and why containers care",
        "Forwarding references and std::forward",
        "Perfect forwarding and emplace",
        "Copy elision and return-value optimisation",
        "When std::move on a return makes things worse",
      ],
    },
    {
      title: "Modern C++ Features & Concurrency",
      weekRange: "Week 7",
      description:
        "The features that define C++17/20/23. C++17 — std::optional, std::variant, std::any, structured bindings, fold expressions, std::filesystem. C++20 — modules (where compilers support them), coroutines, ranges, designated initialisers, three-way comparison (spaceship operator). C++23 — std::expected, std::print, multidimensional subscript. Plus a concurrency primer — std::thread, std::async, std::future / std::promise, std::mutex / std::lock_guard / std::unique_lock, the discipline of avoiding data races, std::atomic for lock-free patterns, and a brief preview of std::execution / std::stop_token.",
      topics: [
        "std::optional, std::variant, std::any",
        "Structured bindings",
        "std::filesystem",
        "Modules (C++20, where supported)",
        "Coroutines (C++20) — basics",
        "Ranges and views (C++20)",
        "std::expected (C++23)",
        "std::thread, std::async, std::future",
        "std::mutex, std::lock_guard, std::unique_lock",
        "std::atomic basics",
      ],
    },
    {
      title: "Data Structures, Algorithms & Complexity in C++",
      weekRange: "Week 7",
      description:
        "The interview layer, and the reason many learners choose C++ in the first place. Implementing linked lists, stacks, queues, trees and graphs by hand, then comparing each with its standard-library equivalent — which teaches both the structure and the reason the standard version is the one to ship.\n\nAlgorithms cover sorting, searching, recursion, greedy approaches, divide and conquer, and an introduction to dynamic programming. Complexity analysis is applied throughout in Big-O terms, along with the practical note that constant factors and cache behaviour are why a `std::vector` frequently beats a `std::list` even where the asymptotics say otherwise.",
      topics: [
        "Linked lists, stacks and queues by hand",
        "Trees, binary search trees and traversal",
        "Graphs, adjacency representations, BFS and DFS",
        "Heaps and priority queues",
        "Hash tables and unordered containers",
        "Sorting algorithms and std::sort",
        "Recursion, backtracking and memoisation",
        "Greedy and divide-and-conquer approaches",
        "Introduction to dynamic programming",
        "Big-O, constant factors and cache locality",
      ],
    },
    {
      title: "Debugging, Sanitisers & Secure C++ Practices",
      weekRange: "Week 8",
      description:
        "Finding faults in a language that will happily compile a program with undefined behaviour. GDB and LLDB for breakpoints, backtraces and inspecting objects; address, undefined-behaviour and thread sanitisers, which catch at runtime what review misses; and Valgrind for leaks.\n\nSecure practice covers the C++ vulnerability classes that persist because the language allows them — buffer overruns, iterator invalidation, dangling references, integer overflow, uninitialised reads — and the modern habits that remove most of them: standard containers over raw arrays, smart pointers over raw owning pointers, `std::string_view` used carefully, and static analysis with clang-tidy in the build.",
      topics: [
        "GDB and LLDB — breakpoints, backtraces, inspection",
        "Address and undefined-behaviour sanitisers",
        "Thread sanitiser for data races",
        "Valgrind for leaks and invalid access",
        "Reading a C++ crash and finding the cause",
        "Iterator invalidation and dangling references",
        "Buffer overruns and bounds-safe alternatives",
        "Uninitialised reads and undefined behaviour",
        "clang-tidy and static analysis in the build",
        "Compiler warnings as errors",
      ],
    },
    {
      title: "Git, GitHub & Building Your C++ Portfolio",
      weekRange: "Week 8",
      description:
        "The professional layer. Git as collaboration — branching, merging, conflicts, pull requests, and a history someone else can read. For C++ specifically, a credible repository needs a build that works from a clean checkout, which in practice means CMake, a stated compiler and standard version, and a README that says how to build and what the program does.\n\nThe habit worth carrying out of the course is documenting limitations honestly: a repository that states which platforms it was tested on and what it does not handle reads as considerably more professional than one that implies it handles everything.",
      topics: [
        "Branching, merging and resolving conflicts",
        "Commit messages a stranger can follow",
        "Pull requests and code review",
        ".gitignore for build directories and artefacts",
        "CMake so the project builds from a clean checkout",
        "Stating compiler and C++ standard version",
        "README with build and run instructions",
        "Documenting known limitations honestly",
        "Consistent formatting with clang-format",
        "Presenting a C++ project at interview",
      ],
    },
    {
      title: "Testing, Build Systems & Capstone",
      weekRange: "Week 8 + 1 week capstone",
      description:
        "Production C++ engineering practices. Testing with GoogleTest (the dominant Pune C++ choice) and Catch2 (the simpler alternative), the discipline of writing small, fast unit tests that run sanitiser-clean. Build systems — CMake at the level you actually use (targets, properties, find_package, FetchContent), Conan / vcpkg for dependency management. Static analysis with clang-tidy, plus the discipline of treating warnings as errors. Capstone project (see Capstone Projects). Mock interviews calibrated for Pune C++ hiring panels — KPIT, Tata Elxsi, L&T Tech Services, the captive R&D arms, plus quant-trading boutiques.",
      topics: [
        "GoogleTest essentials",
        "Catch2 alternative",
        "Sanitiser-clean test discipline",
        "CMake — targets, properties, FetchContent",
        "Conan / vcpkg for dependencies",
        "clang-tidy and treat-warnings-as-errors",
        "Capstone project, code review, deployment",
        "Resume + LinkedIn rewrite for C++ JDs",
        "Mock technical interviews",
        "HR mock and salary negotiation",
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
    src: "/images/courses/cpp-programming-workflow-v1.webp",
    width: 1400,
    height: 900,
    alt: "Eight-stage C plus plus programming learning sequence at Archer Infotech Pune, covering C plus plus foundations, object-oriented C plus plus, templates, STL containers and algorithms, RAII, smart pointers, modern C plus plus features, concurrency, testing, build systems, capstone projects and interview preparation.",
    caption:
      "The C++ course moves from C-aware foundations into modern C++17/20/23, ownership, STL, testing and performance-oriented capstone work.",
  },

  syllabusDownload: {
    pdfUrl: "/downloads/cplusplus-programming-syllabus-v1.pdf",
    title: "C++ Programming Course Syllabus — Complete Module List",
    slug: "cplusplus-programming-syllabus",
    blurb:
      "The complete 51-module syllabus as a 29-page PDF — C++ fundamentals, functions, arrays and strings, pointers and references, dynamic memory, the full object-oriented sequence, operator overloading, templates, exception handling, file handling, the entire STL, lambdas, smart pointers and RAII, move semantics, modern C++, multithreading, data structures, algorithms, testing, build systems, competitive-programming foundations, mini projects, a capstone and interview preparation. Everything in it is on this page; the PDF is the portable version.",
    asideBlocks: [
      {
        heading: "What is inside the 29-page PDF",
        items: [
          "All 51 modules in teaching order, each with its topic list and practical exercises.",
          "The STL broken out properly — sequence, associative, unordered and adapter containers, iterators and algorithms, each with its own module.",
          "Modern C++ given real space: lambdas, smart pointers and RAII, move semantics, perfect forwarding and the current standard's features.",
          "Recommended lab assignments, suggested duration, prerequisites, tools, learning outcomes and the recommended progression after C++.",
        ],
      },
      {
        heading: "Roles this syllabus prepares you for",
        items: [
          "C++ Developer in product, systems and embedded engineering.",
          "Competitive programming and placement screening rounds.",
          "Game, graphics and performance-critical engineering.",
          "Automotive and embedded roles across Pune's engineering firms.",
        ],
      },
    ],
  },

  projects: [
    {
      title: "STL-Compatible Generic Container Library",
      description:
        "A C++20 generic container library — implement std::vector / std::list / std::unordered_map equivalents from scratch with proper iterator support, allocator awareness, exception safety guarantees, move semantics, and concept-constrained APIs. Built with CMake, GoogleTest unit tests, AddressSanitiser / UBSan in CI, plus benchmarks against std::* counterparts using Google Benchmark. Outcome: a public GitHub repository with passing CI badges — exactly what Pune senior C++ panels interview on.",
      technologies: [
        "C++20 with GCC 14 / Clang 18+",
        "Concepts and constraints",
        "Move semantics + RAII",
        "GoogleTest + Google Benchmark",
        "CMake + Conan",
        "ASan + UBSan in GitHub Actions",
      ],
    },
    {
      title: "Real-Time Audio / Game-Loop Application",
      description:
        "A small real-time application — pick a domain (simple game loop with SDL2 or SFML, real-time audio processor with PortAudio, physics simulation with custom rendering). Demonstrates the C++ patterns that game-development and real-time-systems hiring panels test for — tight inner loops, cache-aware data structures, no-allocation-in-hot-path discipline, frame-time profiling. Suitable for students targeting game-dev studios or real-time systems work.",
      technologies: [
        "C++20 with SDL2 or SFML",
        "CMake + Conan",
        "Frame-time profiling",
        "Cache-aware data layout",
      ],
    },
    {
      title: "AUTOSAR-Style Embedded Application (Optional Automotive Track)",
      description:
        "For students targeting Pune automotive hiring (KPIT, Tata Elxsi, L&T Tech Services): a small embedded C++ application following AUTOSAR-like conventions — fixed-size memory pools (no dynamic allocation after init), MISRA C++ compliance via clang-tidy rules, periodic-task scheduling, basic state-machine pattern. Targets either ESP32 (with hardware kit) or a desktop simulation. Demonstrates the disciplined embedded-C++ idioms that Pune automotive panels test for.",
      technologies: [
        "Embedded C++ (C++17 subset typically)",
        "Fixed-size memory pools",
        "MISRA C++ via clang-tidy",
        "ESP32 / STM32 (optional hardware)",
        "Periodic scheduler",
      ],
    },
  ],

  trainersIntro:
    "Your batch is led by Yogesh Patil (Founder & Director, 15+ years, hands-on C / C++ systems programming) and Amol Chougule (Technical Trainer with software-development experience at Mindstix). Both personally take sessions in every batch — the names you see here are the names you meet on day one.",

  careerOutcomes: {
    paragraphs: [
      "C++ is among the highest-paying technical specialisations in Pune in 2026 — Indeed Pune lists 800+ active openings, with senior roles in automotive software, quant trading, and game development paying significantly above general-software bands. The biggest Pune employers are KPIT (the largest Pune automotive-software employer), Tata Elxsi, L&T Technology Services, Persistent Embedded Systems, plus the captive R&D arms of Mercedes-Benz, BMW TechWorks, Volkswagen IT Services, Tata Motors / Tata Technologies, Bajaj Auto, Cummins, Honeywell, John Deere ETC, Atlas Copco. Beyond automotive: National Instruments Pune, Keysight, Tata Advanced Systems, plus Pune-based quant boutiques and game-dev studios.",
      "What pulls a C++ developer above the median band: a public GitHub repository with at least one sanitiser-clean modern C++ project, demonstrable smart-pointer discipline, template / concepts depth, and ideally one specialisation (embedded / game-dev / automotive / quant). Our capstone projects are designed exactly around these signals.",
      "Senior C++ Engineer bands at the top end are reported as national figures (Pune-specific Indeed pages do not exist for these specific titles); Pune trends within ±10% of these figures based on AmbitionBox and 6figr.",
    ],
    salaryBands: [
      {
        role: "C++ Developer (Pune)",
        band: "₹7,20,000 per year average",
        source: {
          label: "Indeed Pune (C++ Developer)",
          url: "https://in.indeed.com/career/c-plus-plus-developer/salaries/Pune--Maharashtra",
        },
      },
      {
        role: "Junior C++ Engineer (Pune entry, <2 years)",
        band: "₹4,00,000 – ₹7,00,000 per year",
        source: {
          label: "AmbitionBox Pune C++ Developer",
          url: "https://www.ambitionbox.com/profile/c-plus-plus-developer-salary-in-pune",
        },
      },
      {
        role: "Mid-level C++ Engineer (Pune, 3–5 years)",
        band: "₹10,00,000 – ₹17,00,000 per year",
        source: {
          label: "Glassdoor Pune C++ Developer",
          url: "https://www.glassdoor.co.in/Salaries/pune-c-plus-plus-developer-salary-SRCH_IL.0,4_IM1072_KO5,26.htm",
        },
      },
      {
        role: "Senior C++ Engineer (Pune automotive / quant, 5–8 years)",
        band: "₹16,00,000 – ₹30,00,000 per year",
        source: {
          label: "Glassdoor Pune Senior C++ Engineer",
          url: "https://www.glassdoor.co.in/Salaries/pune-senior-c-plus-plus-engineer-salary-SRCH_IL.0,4_IM1072_KO5,32.htm",
        },
      },
      {
        role: "Lead C++ Engineer / Quant Developer (national, 8+ years)",
        band: "₹28,00,000 – ₹60,00,000 per year",
        source: {
          label: "6figr India Lead C++ / Quant (Pune ±10%)",
          url: "https://6figr.com/in/salary/lead-c-plus-plus-engineer--t",
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
      "John Deere ETC",
      "Atlas Copco",
      "National Instruments",
      "Tata Advanced Systems",
      "Bharat Forge Defence",
    ],
    rolesAfterCourse: [
      "Junior C++ Engineer",
      "Embedded C++ Developer",
      "Automotive Software Engineer (with AUTOSAR follow-up)",
      "Game Developer (with engine specialisation)",
      "Junior Quant Developer (with finance domain knowledge)",
      "Systems / Performance Engineer",
    ],
  },

  modesAndDuration: {
    duration:
      "8 weeks of structured curriculum plus 1 week of capstone project and interview preparation (~2 months total)",
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
        "GCC 14 / Clang 18+ on Linux / WSL2 / macOS",
        "Slack / WhatsApp for asynchronous Q&A",
      ],
    },
    weekend: {
      timing: ["Saturday + Sunday, 09:00 to 13:00"],
      durationNote:
        "Stretches over ~3.5 months instead of 2 to accommodate working professionals.",
    },
    batchPolicy:
      "Maximum 15 students per batch. Classroom batches start every 4 weeks; weekend batches every 6 weeks.",
  },

  fees: {
    note:
      "Course fees range from ₹20,000 to ₹90,000 depending on mode, batch type, and any applicable concession. Bundled C + C++ enrolment offers significant savings — talk to us about combined pricing.",
    range:
      "₹20,000 – ₹90,000 — bundled C + C++ enrolment offers significant savings.",
    paymentOptions: [
      "Single payment with early-bird discount",
      "EMI in 2–3 instalments at no extra cost",
      "Corporate sponsorship — invoiced to your employer with GST",
      "Bundled C + C++ enrolment with discount",
    ],
  },

  placementSupport: {
    paragraphs: [
      "Placement support starts from week 6 of the course, not at the end. By the time you finish the curriculum, your resume highlights modern C++ fluency with sanitiser-clean projects, your GitHub has at least two production-style repositories, and you have completed at least three mock technical interviews against question banks from Pune C++ hiring teams.",
      "We say placement support, not placement guarantee — for two honest reasons. First, no institute can guarantee a hire when the final decision is the company's. Second, the institutes that do guarantee tend to bury the conditions in fine print. Our support is unconditional, time-bound (six months after course completion), and includes free re-entry to a future batch's interview-prep sessions if your first round of interviews does not land.",
    ],
    process: [
      "Week 6 — resume and LinkedIn rewrite, calibrated for C++ / embedded / automotive JDs",
      "Week 7 — GitHub portfolio cleanup, sanitiser-clean badges, README polish",
      "Weeks 8–9 — three rounds of mock technical interviews",
      "Week 9 — HR mock interview and salary negotiation coaching",
      "Post-course — referrals via our 17-year alumni network at 12+ partner companies (with extra emphasis on KPIT, Tata Elxsi, L&T Tech Services, the captive R&D arms)",
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
      "National Instruments",
    ],
  },

  comparison: {
    intro:
      "We compare ourselves against typical Pune C++ training institutes on factual rows only — no logos, no opinions. Use this as a checklist when evaluating any institute.",
    rows: [
      {
        feature: "Trainers named on course page with photos and LinkedIn",
        archer: "Yes — Yogesh Patil and Amol Chougule",
        typical: "No — generic 'expert trainers' branding",
      },
      {
        feature: "C++ standard covered",
        archer: "C++17 baseline + C++20 (modules / concepts / ranges) + C++23 features",
        typical: "C++11 or C++14 — pre-2020 standards still",
      },
      {
        feature: "Smart-pointer discipline",
        archer: "RAII first; `new` / `delete` discouraged in new code",
        typical: "Raw `new` / `delete` taught as default",
      },
      {
        feature: "Templates depth",
        archer: "Function + class + variadic templates + concepts (C++20)",
        typical: "Basic class templates only",
      },
      {
        feature: "STL coverage",
        archer: "Containers + iterators + algorithms + ranges (C++20)",
        typical: "vector + map only, no algorithms or ranges",
      },
      {
        feature: "Build / test / sanitiser tooling",
        archer: "CMake + Conan + GoogleTest + ASan + UBSan in CI",
        typical: "Compiled with `g++ main.cpp` only",
      },
      {
        feature: "Public GitHub portfolio output",
        archer: "Yes — sanitiser-clean modern C++ projects with passing CI badges",
        typical: "Local code on a hard drive",
      },
      {
        feature: "Bundled pricing with C",
        archer: "Yes — significant discount when combined",
        typical: "Per-course pricing only",
      },
      {
        feature: "Salary data shown",
        archer: "Cited from Indeed Pune + AmbitionBox + Glassdoor + 6figr with source URLs",
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
      "Compare with whoever you are considering — we welcome the comparison. The right test is whether you can see actual student sanitiser-clean modern C++ before you pay.",
  },

  versusAlternative: {
    heading: "C++ vs Java / Rust / Go — Which Should You Pick in Pune?",
    paragraphs: [
      "C++ vs Java vs Rust vs Go is the most-asked question in Pune systems / backend counselling. The honest answer: it depends on your career direction.",
      "Choose C++ if your goal is automotive software (Pune's largest specialisation hub — KPIT, Tata Elxsi, Tata Technologies, Mercedes-Benz, BMW), embedded / firmware, game development, quant trading, or any performance-critical role where C++'s incumbency is unbreakable. Pune's C++ market is concentrated and well-paid; senior C++ engineers in automotive and quant earn at the top of the engineering compensation curve.",
      "Choose Java if your goal is enterprise backend, BFSI, services-company work — Java has roughly 1.4× more raw Pune openings, with stronger entry-level absorption and a wider services-company hiring pool. Choose Go if your goal is cloud / Kubernetes / DevOps tooling — Go is increasingly the default for new infrastructure code; Pune adoption is growing in product engineering. Choose Rust if your goal is systems programming with safety guarantees — Pune Rust hiring is still small (a few hundred openings), but growing fast in security and infra-tools companies.",
      "Honest recommendation: pick C++ if you have a specific automotive / embedded / game-dev / quant target. Pick Java if you want broader entry-level reach. Pick Go or Rust as a second language once placed — neither is the right standalone first language for an Indian fresher.",
    ],
  },

  prerequisitesAndStart: {
    paragraphs: [
      "Prerequisites: basic C familiarity (variables, control flow, functions, pointers — at the level our C course covers), basic computer use, willingness to commit 8–10 hours per week of practice outside class. If you have done our C course or equivalent self-study (or a reasonable college C course), you are ready. Pure non-programmers should do our C course or equivalent first.",
    ],
    suggestedSteps: [
      "Decide your mode — classroom in Kothrud, online live, or weekend",
      "Check the upcoming batch dates on our batch schedule page",
      "Book a free 30-minute counselling call — we will honestly tell you whether the course fits your goal (we say no to roughly 15% of C++ enquirers because the C foundation is not yet in place)",
      "Confirm enrolment and complete pre-course orientation (GCC 14 / Clang 18+ install, CMake setup, GitHub account)",
      "Show up to day one with a laptop running 64-bit Linux / macOS / Windows-with-WSL2",
    ],
  },

  faqs: [
    {
      question: "Is C++ still relevant in 2026?",
      answer:
        "Yes — extremely so in Pune specifically. The Pune automotive ecosystem (KPIT, Tata Elxsi, L&T Tech Services, the captive R&D arms) hires C++ engineers continuously; Indeed Pune lists 800+ active C++ openings. Beyond automotive: game development, quant trading, embedded systems, and high-performance computing all run on C++. The language has actively modernised through C++17 / C++20 / C++23.",
    },
    {
      question: "How long does C++ training in Pune take at Archer Infotech?",
      answer:
        "Approximately 2 months — 8 weeks of structured curriculum plus 1 week of capstone and interview preparation. The weekend batch stretches over ~3.5 months at the same content depth.",
    },
    {
      question: "What is the salary of a C++ Developer in Pune?",
      answer:
        "Indeed Pune reports an average of ₹7.20 lakh per year for C++ Developer (May 2026). Junior C++ Engineer Pune entry sits at ₹4–7 lakh per year per AmbitionBox. Mid-level (3–5 years) earns ₹10–17 lakh per Glassdoor. Senior C++ Engineers in Pune automotive / quant (5–8 years) earn ₹16–30 lakh. Lead C++ / Quant Developers earn ₹28–60 lakh nationally with Pune trending within ±10%.",
    },
    {
      question: "Should I take C before C++?",
      answer:
        "Yes — C is the natural prerequisite. C++ assumes C-level fluency on pointers, memory management, and the build / compile / link model. Many students take C → C++ back-to-back as our bundled enrolment.",
    },
    {
      question: "Will I work on real projects?",
      answer:
        "Yes — three capstone projects: (1) STL-compatible generic container library with concepts and benchmarks, (2) real-time audio / game-loop application with SDL2 or SFML, (3) optional AUTOSAR-style embedded application for automotive-track students. All three become public GitHub repositories with sanitiser-clean CI badges.",
    },
    {
      question: "Are modern C++ features (C++20 / C++23) covered?",
      answer:
        "Yes — C++17 is the baseline, C++20 features (modules / concepts / ranges / coroutines) are covered on GCC 14 / Clang 18+, and C++23 features (`std::expected`, `std::print`, multidimensional subscript) are introduced where compilers support them. We do not teach C++11-only or C++14-only as the default; that produces graduates who write 2015-style code.",
    },
    {
      question: "C++ for game development — is that covered?",
      answer:
        "Capstone Project #2 is a real-time game-loop / audio application using SDL2 or SFML — this gives you the C++ foundation game-development panels test for. We do not cover Unreal Engine specifically (that deserves a separate specialised track), but graduates have the modern C++ depth to onboard onto Unreal in 4–6 weeks of focused self-study.",
    },
    {
      question: "C++ for quant trading?",
      answer:
        "The course gives you the C++ depth Pune quant boutiques test for at the language level — modern templates, smart pointers, STL, concurrency primitives, performance discipline. The domain knowledge (options pricing, market microstructure) you'll need to add separately; we do not teach finance domain in this course.",
    },
    {
      question: "Are weekend C++ classes available in Pune?",
      answer:
        "Yes — Saturday and Sunday, 09:00–13:00, stretched over ~3.5 months instead of 2. Same content, same trainers, same projects.",
    },
    {
      question: "What is the fee for the C++ course in Pune?",
      answer:
        "Course fees range from ₹20,000 to ₹90,000 depending on mode and concession. Bundled C + C++ enrolment offers significant savings — talk to us about combined pricing.",
    },
    {
      question: "What support do I get after course completion?",
      answer:
        "Six months of active placement support — mock interviews calibrated for C++ / embedded / automotive roles, referrals via our alumni network at 12+ partner companies (with extra emphasis on KPIT, Tata Elxsi, L&T Tech Services, the captive R&D arms), resume / LinkedIn / GitHub rewrites, and salary negotiation coaching.",
    },
    {
      question: "Are the named trainers actually teaching, or are they just on the brochure?",
      answer:
        "Yogesh Patil personally leads the foundations, OOP, templates, and capstone weeks. Amol Chougule leads the STL, smart-pointer, and modern-features weeks. The same names you see on this page show up in your batch on day one.",
    },
  ],

  finalCta: {
    heading: "Ready to start C++ training in Pune?",
    paragraph:
      "We have classroom, online, and weekend batches starting every 4–6 weeks. Reach out via the enquiry form or call us — Yogesh and Amol Chougule are happy to spend 30 minutes telling you whether the course is right for you, or whether the bundled C + C++ path makes more sense for your goal. Visit our Kothrud, Pune campus, see actual student sanitiser-clean projects, meet a current batch, and decide with full information.",
  },
};
