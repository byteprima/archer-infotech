import type { CourseRichContent } from "./types";

export const pythonTrainingInPune: CourseRichContent = {
  intro:
    "Python is the fastest path from 'I have never coded' to a working programmer in Pune's IT job market. Archer Infotech's Core Python training in Pune teaches the language itself in depth: Python 3.13 syntax, variables, control flow, functions, modules, packages, virtual environments, lists, tuples, dictionaries, sets, comprehensions, file handling, exceptions, OOP, iterators, generators, decorators, regular expressions, database connectivity basics, testing and interview-ready problem solving. Django, FastAPI, Data Science and AI/LLM integration are separate follow-on tracks; this page is the Core Python foundation. Classroom in Kothrud, online live, and weekend batches available.",

  whyLearn: {
    heading: "Why Learn Python in 2026",
    paragraphs: [
      "Python has the lowest learning curve of any production language and one of the widest use cases in India: scripting, automation, testing, backend development, data work and AI. But every one of those paths begins with Core Python. Pune employers still screen beginners on syntax, functions, data structures, file handling, OOP, exceptions, debugging and the ability to explain small programs clearly.",
      "What changed in 2026: Python 3.13 is the modern baseline, virtual-environment tooling is cleaner, type hints are normal in professional code, and AI-assisted development has become part of the learning workflow. A Core Python course should therefore teach the language deeply enough that learners can later move into Django, FastAPI, data analytics, machine learning or AI without relearning fundamentals.",
      "What this means for hiring in Pune: the strongest beginner profile is not a long list of frameworks. It is a clean GitHub portfolio showing Core Python programs, file/CSV/JSON automation, OOP design, database connectivity basics, tested code, and problem-solving practice. Archer Infotech's curriculum is built around that foundation first.",
    ],
    keyPoints: [
      "Python 3.13 with free-threaded mode and JIT improvements",
      "Core Python depth — functions, modules, OOP, exceptions, files, regex, iterators, decorators",
      "Database and API basics without turning the course into a framework track",
      "Foundation for Django, FastAPI, Data Science, Machine Learning and GenAI follow-on courses",
      "Pune market reality — 1,000+ active Indeed Python listings, growing year-on-year",
    ],
  },

  whoIsThisFor: {
    forYou: [
      "Engineering, BCS, MCA, or BSc-CS student looking for your first IT or data role in Pune",
      "Working professional in a non-Python stack wanting a clean Python foundation before automation, data or AI",
      "BSc graduate or 12th-passout looking for the lowest-friction entry into a programming career",
      "Career restarter (took a break, raising a family, switching from non-tech) re-entering software",
      "Domain expert who wants Python for scripts, reports, automation and later data work",
    ],
    notForYou: [
      "If you are targeting core-banking or large-team Cognizant-style enterprise Java work — pick Java Full Stack instead, both have ample Pune jobs",
      "If your goal is Android / iOS native development — Python is not your path",
      "If you expect a guaranteed ₹10L+ fresher offer — Pune junior Python ranges ₹2L–₹4L; the ₹10L+ roles need 3+ years or specialisation",
      "If you will not put in 8–10 hours of practice per week outside class — Python is forgiving but not magical",
      "If you want certificate-only learning with no projects — Pune hiring managers screen on portfolio, not certificates",
    ],
  },

  curriculum: [
    {
      title: "Python Fundamentals",
      weekRange: "Weeks 1–2",
      description:
        "Set up Python 3.13 with virtual environments and pip, write your first script, then move into the language properly — variables, primitive types, control flow, functions, and the rich literal syntax (f-strings, list comprehensions). By the end of this module you'll be comfortable reading any Python codebase and writing 100-line scripts without lookup. We use modern tooling — uv or poetry for environments, ruff for formatting, mypy for type hints — so you absorb professional habits from day one.",
      topics: [
        "Python 3.13 installation and virtual environments",
        "Variables, primitive types, and dynamic typing",
        "Control flow — if / for / while / match-case",
        "Functions, default arguments, *args / **kwargs",
        "f-strings and formatted output",
        "Type hints (PEP 484) and mypy basics",
        "Errors and exception handling",
      ],
    },
    {
      title: "Strings, Regular Expressions & Text Processing",
      weekRange: "Week 3",
      description:
        "Python's string handling in depth, because a very large share of real Python work is reading text, reshaping it and writing it back out. Slicing, the method set, f-strings and the format mini-language, and encoding — which is where beginners meet their first genuinely confusing production bug, usually involving a UTF-8 file opened as ASCII.\n\nRegular expressions follow: pattern syntax, groups, greedy against lazy matching, and the `re` module's compile, search, findall and sub. The module closes on the discipline of knowing when a regex is the wrong tool, and you build a log-parsing utility that extracts structured records from unstructured text.",
      topics: [
        "Slicing, indexing and immutability",
        "String methods and when each is the right one",
        "f-strings and the format mini-language",
        "Encoding, decoding and UnicodeDecodeError",
        "Joining, splitting and building strings efficiently",
        "Regex syntax — classes, anchors, quantifiers",
        "Groups, named groups and back-references",
        "Greedy versus lazy matching",
        "re.compile, search, findall, finditer and sub",
        "When a regular expression is the wrong tool",
      ],
    },
    {
      title: "Data Structures & Comprehensions",
      weekRange: "Weeks 3–4",
      description:
        "Lists, tuples, sets, dictionaries — when each is the right choice and how each is implemented (CPython internals at a useful level). Comprehensions for declarative data transformation, generator expressions for lazy evaluation, and the collections module for specialised structures (defaultdict, Counter, deque). We finish with a small project that uses all four core structures in their idiomatic forms.",
      topics: [
        "Lists, tuples, sets, dictionaries — costs and trade-offs",
        "List, set, dict comprehensions",
        "Generators and lazy evaluation",
        "collections module — Counter, defaultdict, deque",
        "itertools and functools essentials",
        "Mutability and shared-reference pitfalls",
      ],
    },
    {
      title: "Object-Oriented Python",
      weekRange: "Week 5",
      description:
        "Classes, instances, inheritance, polymorphism, and Python's distinctive features — properties, dunder methods, dataclasses (the modern way to write 80% of classes), and Protocol typing. Includes the discipline that hiring panels test for — when to use a class vs a function, when to use composition over inheritance, and how to design for testability.",
      topics: [
        "Classes, __init__, instance vs class attributes",
        "Inheritance and method resolution order (MRO)",
        "Properties and descriptors",
        "Dunder / magic methods",
        "Dataclasses and attrs",
        "Protocol typing (PEP 544)",
        "Composition over inheritance",
      ],
    },
    {
      title: "File I/O, JSON, CSV and Working with the Filesystem",
      weekRange: "Week 6",
      description:
        "Read and write text and binary files using context managers, parse and emit JSON, handle CSV data with the standard library, walk directory trees with pathlib, and build small scripts that rename files, validate folders, clean text and generate reports. This is Core Python as it appears in everyday work: automation, data handling, logs, configuration files and repeatable utilities, without jumping into pandas or web frameworks too early.",
      topics: [
        "Context managers and the with statement",
        "JSON read / write / streaming",
        "pathlib for filesystem operations",
        "CSV handling with the csv module",
        "Text processing and log-file parsing",
        "Basic configuration files",
        "Working with environment variables",
      ],
    },
    {
      title: "Standard Library Essentials — collections, itertools, functools",
      weekRange: "Week 6",
      description:
        "The modules that separate Python that reads like Python from Python that reads like translated Java. `collections` gives you `defaultdict`, `Counter`, `deque`, `namedtuple` and `OrderedDict` — each of which replaces a five-line pattern beginners write by hand every time.\n\n`itertools` covers lazy iteration, chaining, grouping, combinations and infinite sequences; `functools` covers `lru_cache`, `partial`, `reduce` and `wraps`. The framing throughout is the same: before writing a loop, check whether the standard library already did it — faster, tested, and in one line that a reviewer will recognise immediately.",
      topics: [
        "defaultdict and eliminating key checks",
        "Counter for frequency work",
        "deque for queues and sliding windows",
        "namedtuple and lightweight records",
        "itertools — chain, groupby, islice, product",
        "combinations, permutations and infinite iterators",
        "functools.lru_cache and memoisation",
        "partial and function specialisation",
        "reduce, and when a loop is clearer",
        "Reading the standard library before writing a loop",
      ],
    },
    {
      title: "Date, Time & Working with Real-World Data",
      weekRange: "Week 6",
      description:
        "Dates are where correct-looking programs quietly produce wrong answers, so they get their own treatment. `datetime`, `date`, `time` and `timedelta`; naive against aware datetimes and why mixing them raises; time zones with `zoneinfo`; parsing and formatting with `strptime` and `strftime`; and ISO 8601 as the format to use whenever you control the choice.\n\nThe module then covers the practical data work that surrounds dates in real scripts — validating input, handling missing and malformed values, normalising inconsistent formats, and the defensive habits that stop one bad row from ending a batch job halfway through.",
      topics: [
        "datetime, date, time and timedelta",
        "Naive versus timezone-aware datetimes",
        "Time zones with zoneinfo",
        "strptime, strftime and ISO 8601",
        "Date arithmetic and interval logic",
        "Common off-by-one and DST mistakes",
        "Validating and cleaning input data",
        "Handling missing and malformed values",
        "Normalising inconsistent formats",
        "Failing a row without failing the batch",
      ],
    },
    {
      title: "Modules, Packages, Virtual Environments & Tooling",
      weekRange: "Week 7",
      description:
        "Learn how Python projects are organised once they grow past a single file. Cover modules, packages, imports, __name__ == '__main__', virtual environments, dependency installation, requirements files, pyproject.toml awareness, command-line arguments and clean folder layout. We also introduce GitHub workflow, README writing and code-review habits so your Core Python projects look professional rather than like classroom fragments.",
      topics: [
        "Modules, packages and imports",
        "__name__ == '__main__' and script entry points",
        "Virtual environments and dependency files",
        "pip, uv / poetry awareness, pyproject.toml basics",
        "Command-line arguments with argparse",
        "Project folder structure and README discipline",
        "Git and GitHub workflow for Python projects",
      ],
    },
    {
      title: "Type Hints, Dataclasses & Modern Python",
      weekRange: "Week 7",
      description:
        "What professional Python looks like in 2026. Type hints are not enforced at runtime and are still expected in any serious codebase: annotating functions, variables and collections, `Optional` and unions, generics, and running `mypy` so the hints actually catch something rather than decorating the file.\n\nDataclasses remove the boilerplate of `__init__`, `__repr__` and `__eq__`, and `frozen=True` gives immutability for free. Enums, `pathlib` instead of string paths, and the walrus operator and structural pattern matching close the module — the features that make current Python read very differently from Python written five years ago.",
      topics: [
        "Annotating functions, variables and collections",
        "Optional, unions and the modern | syntax",
        "Generics and TypeVar",
        "Running mypy and reading its output",
        "Dataclasses and generated methods",
        "frozen dataclasses and immutability",
        "Enum and IntEnum",
        "pathlib instead of os.path",
        "The walrus operator",
        "Structural pattern matching with match",
      ],
    },
    {
      title: "Advanced Core Python Patterns",
      weekRange: "Week 8",
      description:
        "Strengthen the Python features that separate copy-paste beginners from confident programmers: iterators, generators, decorators, context managers, regular expressions, logging, configuration, datetime handling and type hints. These topics appear constantly in automation scripts, backend code, testing tools and data pipelines. Each concept is tied to a practical mini-task so it becomes usable rather than theoretical.",
      topics: [
        "Iterators and generator functions",
        "Decorators and higher-order functions",
        "Custom context managers",
        "Regular expressions for validation and extraction",
        "Logging and configuration patterns",
        "datetime and timezone-safe basics",
        "Type hints and mypy awareness",
      ],
    },
    {
      title: "Database, API Consumption & Automation Basics",
      weekRange: "Week 9",
      description:
        "Use Core Python to connect with the outside world. Learn SQLite and basic relational-database access, parameterised queries, simple CRUD operations, HTTP requests to public APIs, response parsing, retry awareness and automation scripts that move data between files, APIs and databases. This module gives the practical bridge into backend, data and automation tracks while staying within Core Python.",
      topics: [
        "SQLite connectivity from Python",
        "CRUD operations and parameterised queries",
        "Basic relational modelling",
        "HTTP API consumption with requests / httpx awareness",
        "JSON response parsing",
        "Retry and error-handling basics",
        "Automation scripts for reports and validation",
      ],
    },
    {
      title: "Logging, Command-Line Interfaces & Configuration",
      weekRange: "Week 9",
      description:
        "The difference between a script and a tool someone else can run. Logging replaces `print` — levels, handlers, formatters, writing to file and console, and structured logging that can actually be searched. The rule taught is simple and rarely followed: `print` is for a human watching now, logging is for a human investigating later.\n\nCommand-line interfaces with `argparse` cover arguments, options, defaults, subcommands and help text. Configuration covers environment variables, `.env` files, config precedence, and keeping secrets out of source control — the mistake that ends up in a public repository often enough to be worth a section of its own.",
      topics: [
        "Logging levels and when to use each",
        "Handlers, formatters and multiple destinations",
        "Structured logging you can search",
        "Why print is not logging",
        "argparse — arguments, options and defaults",
        "Subcommands and useful help text",
        "Exit codes and scriptable behaviour",
        "Environment variables and .env files",
        "Configuration precedence and defaults",
        "Keeping secrets out of source control",
      ],
    },
    {
      title: "Concurrency & Asynchronous Python",
      weekRange: "Week 9",
      description:
        "Doing several things at once in a language with a Global Interpreter Lock, which is the subject most Python developers are vaguest about and interviewers most enjoy probing. The GIL is explained plainly, along with its actual consequence: threads help with I/O-bound work and do not help with CPU-bound work.\n\nFrom there: `threading` and its locks, `multiprocessing` for true parallelism, `concurrent.futures` as the interface worth reaching for first, and `asyncio` — the event loop, coroutines, `async`/`await` and `gather`. The judgement being taught is which to choose, and the honest answer that for most scripts the correct choice is none of them.",
      topics: [
        "The GIL and what it actually prevents",
        "I/O-bound versus CPU-bound work",
        "threading, locks and race conditions",
        "multiprocessing for true parallelism",
        "concurrent.futures and executor pools",
        "asyncio, the event loop and coroutines",
        "async, await and gather",
        "Async libraries and blocking calls that ruin them",
        "Choosing between threads, processes and async",
        "When concurrency is not the answer",
      ],
    },
    {
      title: "Git, GitHub & Clean Python Practices",
      weekRange: "Week 10",
      description:
        "The habits that make your work reviewable and your portfolio credible. Git as collaboration rather than three memorised commands: branching, merging, resolving conflicts, pull requests, review etiquette, and a commit history a stranger can follow.\n\nClean Python covers PEP 8 and what it is actually for, project layout, docstrings worth writing, `ruff` and `black` so formatting stops being a discussion, and the readability habits that get code approved rather than returned. You finish with a public repository — README, requirements, a working entry point — because that repository is what a Pune hiring panel opens before your CV.",
      topics: [
        "Branching strategy and pull-request workflow",
        "Merging, rebasing and resolving conflicts",
        "Writing commits a stranger can follow",
        "Code review — giving and receiving",
        "PEP 8 and what it is for",
        "Project layout and package structure",
        "Docstrings worth writing",
        "ruff, black and automated formatting",
        "requirements.txt, pyproject and reproducible installs",
        "A README that lets someone run your project",
      ],
    },
    {
      title: "Testing, Debugging, DSA & Capstone Preparation",
      weekRange: "Weeks 10–11",
      description:
        "Turn Core Python knowledge into reliable code. Learn debugging in VS Code or PyCharm, pytest basics, fixtures, assertions, mocking awareness, coverage, and code-review habits. Then practise DSA patterns in Python: arrays/lists, strings, dictionaries, sets, stacks, queues, recursion, sorting and searching. This module prepares students for both the capstone and entry-level technical interviews.",
      topics: [
        "Debugger workflow in VS Code / PyCharm",
        "pytest basics, fixtures and assertions",
        "Mocking awareness and coverage reports",
        "Code review and refactoring repeated logic",
        "Lists, strings, dictionaries and sets for interviews",
        "Stacks, queues, recursion, sorting and searching",
        "Big-O time and space complexity",
      ],
    },
    {
      title: "Core Python Capstone & Interview Preparation",
      weekRange: "Week 12 + placement prep",
      description:
        "Build a reviewed Core Python project that combines files, OOP, collections, exceptions, database/API basics, tests and documentation. Choose a file organiser, expense tracker, student records system, API data collector, log analyser or automation toolkit. Final review covers code structure, README quality, GitHub presentation, viva-style explanation, resume points, mock technical questions and next-path counselling for Django, FastAPI, Data Science, Machine Learning or GenAI.",
      topics: [
        "Core Python capstone implementation",
        "OOP, collections, files, database/API basics in one project",
        "pytest test cases for important flows",
        "README, screenshots and setup instructions",
        "Project explanation practice",
        "Resume + LinkedIn rewrite",
        "Mock technical and HR interviews",
        "Next-path counselling after Core Python",
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
    src: "/images/courses/python-programming-workflow-v1.webp",
    width: 1400,
    height: 900,
    alt: "Eight-stage Core Python learning sequence at Archer Infotech Pune, covering Python foundations, functions, data structures, object-oriented programming, exceptions, file handling, modules, packages, virtual environments, iterators, generators, decorators, regex, database basics, API consumption, testing, debugging, DSA, capstone projects and interview preparation.",
    caption:
      "The Python course stays focused on Core Python: syntax, functions, OOP, files, modules, automation, testing, DSA and a reviewed capstone.",
  },

  syllabusDownload: {
    pdfUrl: "/downloads/python-programming-syllabus-v1.pdf",
    title: "Core Python Programming Course Syllabus — Complete Module List",
    slug: "python-programming-syllabus",
    blurb:
      "The complete 56-module syllabus as a 30-page PDF — Python fundamentals, every built-in data structure, functions and comprehensions, modules and packages, exception and file handling, the full object-oriented sequence, dataclasses, iterators, generators, decorators, context managers, regular expressions, type hints, concurrency and async, SQLite, DSA, mini projects, a capstone and interview preparation. Everything in it is on this page; the PDF is the portable version.",
    asideBlocks: [
      {
        heading: "What is inside the 30-page PDF",
        items: [
          "All 56 modules in teaching order, each with its topic list and practical exercises.",
          "The object-oriented sequence in full — constructors, encapsulation, inheritance, polymorphism, abstract base classes, special methods and operator overloading.",
          "The Python that separates professional code from scripts: dataclasses, type hints, decorators, context managers, collections, itertools, functools and logging.",
          "Recommended lab assignments, suggested duration, prerequisites, tools, learning outcomes and the recommended progression after Core Python.",
        ],
      },
      {
        heading: "Roles this syllabus prepares you for",
        items: [
          "Python Developer and Junior Software Engineer.",
          "Automation and scripting roles across Pune IT services.",
          "The foundation before Django, FastAPI or Python Full Stack.",
          "The entry point into Data Analytics, Data Science and AI tracks.",
        ],
      },
    ],
  },

  projects: [
    {
      title: "Core Python File Automation Toolkit",
      description:
        "Build a practical automation toolkit that organises folders, validates filenames, reads CSV/JSON files, generates summary reports, logs errors and exposes a simple command-line interface. The focus is Core Python: functions, modules, pathlib, file I/O, exceptions, logging, argparse, type hints and pytest. Outcome: a public GitHub repository that shows useful Python without relying on frameworks.",
      technologies: [
        "Python 3.13",
        "pathlib",
        "csv and json modules",
        "argparse",
        "logging",
        "pytest",
        "GitHub README",
      ],
    },
    {
      title: "Student Records or Expense Tracker with SQLite",
      description:
        "Create a menu-driven Core Python application for student records, expenses, library books or inventory. Use OOP classes, validation, custom exceptions, collections, SQLite persistence, parameterised queries and report generation. This project helps students explain class design, data modelling and database operations clearly in interviews.",
      technologies: [
        "Python 3.13",
        "OOP",
        "SQLite",
        "Parameterized SQL",
        "Collections",
        "Custom exceptions",
        "pytest",
      ],
    },
    {
      title: "Python DSA and Problem-Solving Notebook",
      description:
        "Build a structured practice repository of Python interview problems: strings, lists, dictionaries, sets, stacks, queues, recursion, sorting, searching and tree traversal basics. Each solution includes explanation, complexity notes and tests. This becomes a reusable interview-prep asset and a clean signal that the student can reason, not just run scripts.",
      technologies: [
        "Python 3.13",
        "Data structures",
        "Algorithms",
        "Big-O notes",
        "pytest",
        "Markdown explanations",
        "GitHub portfolio",
      ],
    },
  ],

  trainersIntro:
    "Your batch is led by Amol Patil, a Senior Corporate Trainer with over 10 years of demonstrated history in Pune's IT training industry. Amol writes Python every day across full-stack and data-engineering work and personally leads every Python batch from setup through capstone.",

  careerOutcomes: {
    paragraphs: [
      "Core Python is the entry foundation for automation, testing, backend, data and AI paths in Pune. Salary depends heavily on specialisation later, but beginners are first evaluated on Python syntax, functions, OOP, file handling, data structures, debugging, testing and project explanation.",
      "What pulls a Core Python learner above the average fresher band: a public GitHub portfolio with useful scripts, file/CSV/JSON automation, OOP projects, database/API basics, pytest coverage and clean README files. Django, FastAPI, data science and AI can raise the ceiling later, but this course builds the base.",
      "Senior and Lead Python bands below are national figures (Pune-specific Indeed pages do not exist for these roles); Pune trends within ±10% of these figures based on AmbitionBox and 6figr aggregations.",
    ],
    salaryBands: [
      {
        role: "Junior Python Developer (Pune)",
        band: "₹18,628 per month (~₹2.2 lakh per year)",
        source: {
          label: "Indeed Pune (Junior Python Developer)",
          url: "https://in.indeed.com/career/junior-python-developer/salaries/Pune--Maharashtra",
        },
      },
      {
        role: "Python Developer overall — Pune",
        band: "₹7,59,185 per year",
        source: {
          label: "Indeed Pune (updated April 2026)",
          url: "https://in.indeed.com/career/python-developer/salaries/Pune--Maharashtra",
        },
      },
      {
        role: "Python Developer Pune (Glassdoor estimate)",
        band: "₹5,00,000 base / ₹5,50,000 total",
        source: {
          label: "Glassdoor Pune",
          url: "https://www.glassdoor.co.in/Salaries/pune-python-developer-salary-SRCH_IL.0,4_IM1072_KO5,21.htm",
        },
      },
      {
        role: "Senior Python Developer (national, 7–10 years)",
        band: "₹15,00,000 – ₹25,00,000 per year",
        source: {
          label: "Industry aggregation 2026",
          url: "https://www.upgrad.com/blog/python-developer-salary-in-india/",
        },
      },
    ],
    hiringCompanies: [
      "Persistent Systems",
      "TCS",
      "Infosys",
      "Cognizant",
      "Capgemini",
      "Atos / Eviden",
      "BMW TechWorks India",
      "Tiger Analytics",
      "Fractal Analytics",
      "ZS Associates",
      "MathCo",
      "Synechron",
      "Mercedes-Benz R&D India",
      "Cummins India",
      "Honeywell",
      "John Deere ETC",
    ],
    rolesAfterCourse: [
      "Python Developer",
      "Core Python Developer",
      "Automation Engineer",
      "Python Trainee Developer",
      "Software Engineer at IT services",
      "Application Support Engineer with Python",
      "Prerequisite met for Python Full Stack or Data/AI tracks",
    ],
  },

  modesAndDuration: {
    duration:
      "3 months of structured curriculum (12 weeks) plus 2 weeks of capstone project work and interview preparation",
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
      tools: ["Zoom for live sessions", "GitHub for code reviews", "Slack / WhatsApp for asynchronous Q&A"],
    },
    weekend: {
      timing: ["Saturday + Sunday, 09:00 to 13:00"],
      durationNote:
        "Stretches over 5 months instead of 3 to accommodate working professionals. Same content, lower weekly load.",
    },
    batchPolicy:
      "Maximum 15 students per batch. Classroom batches start every 4 weeks; weekend batches every 6 weeks.",
  },

  fees: {
    note:
      "Course fees range from ₹20,000 to ₹90,000 depending on mode (classroom / online / weekend), batch type, and any applicable concession. Kindly reach us for the current 2026 quote.",
    range:
      "₹20,000 – ₹90,000 — the higher end covers placement-track classroom batches with extended interview prep; the lower end covers concession-eligible online or weekend formats.",
    paymentOptions: [
      "Single payment with early-bird discount",
      "EMI in 2–3 instalments at no extra cost",
      "Corporate sponsorship — invoiced to your employer with GST",
    ],
  },

  placementSupport: {
    paragraphs: [
      "Placement support starts from week 8 of the course, not at the end. By the time you finish the curriculum, your resume is ready, your GitHub is presentable, and you have completed at least three mock technical interviews against question banks from Pune product, services, and analytics companies.",
      "We say placement support, not placement guarantee — for two honest reasons. First, no institute can guarantee a hire when the final decision is the company's. Second, the institutes that do guarantee tend to bury the conditions in fine print. Our support is unconditional, time-bound (six months after course completion), and includes free re-entry to a future batch's interview-prep sessions if your first round of interviews does not land.",
    ],
    process: [
      "Week 8 — resume and LinkedIn rewrite, with feedback from a trainer who has hired",
      "Week 9 — GitHub portfolio cleanup, public READMEs, deployment links",
      "Weeks 10–11 — DSA quick refresher targeting screening patterns at TCS, Persistent, Tiger Analytics",
      "Weeks 11–12 — three rounds of mock technical interviews",
      "Week 12 — HR mock interview and salary negotiation coaching",
      "Post-course — referrals via our 17-year alumni network at partner companies",
      "Up to 6 months of continued support after course end",
      "Free re-entry to future batch interview-prep sessions if first round does not land",
    ],
    partnerCompanies: [
      "Persistent Systems",
      "TCS",
      "Infosys",
      "Cognizant",
      "Capgemini",
      "Tiger Analytics",
      "Fractal Analytics",
      "ZS Associates",
      "Synechron",
      "Mercedes-Benz R&D India",
      "Cummins",
      "Honeywell",
    ],
  },

  comparison: {
    intro:
      "We compare ourselves against typical Pune Python training institutes on factual rows only — no logos, no opinions. Use this as a checklist when evaluating any institute.",
    rows: [
      {
        feature: "Trainers named on course page with photos and LinkedIn",
        archer: "Yes — Amol Patil, Senior Corporate Trainer",
        typical: "No — generic 'expert trainers' branding",
      },
      {
        feature: "Python version covered",
        archer: "Python 3.13 with Python 3.12 fallback",
        typical: "Often Python 3.10 or generic 'Python 3'",
      },
      {
        feature: "Core Python scope clarity",
        archer: "Core Python only — Django, FastAPI, data science and AI are routed to follow-on courses",
        typical: "Often mixes Python basics, web, data and AI without a clear sequence",
      },
      {
        feature: "Automation and file handling",
        archer: "Files, folders, CSV, JSON, regex, logging, CLI scripts and practical utilities",
        typical: "Mostly syntax exercises with little practical scripting",
      },
      {
        feature: "Testing and debugging",
        archer: "pytest, debugger workflow, assertions, refactoring and code review",
        typical: "Usually skipped or left for advanced batches",
      },
      {
        feature: "Public GitHub portfolio output",
        archer: "Yes — public repository per student",
        typical: "Rare",
      },
      {
        feature: "Salary data",
        archer: "Cited from Indeed Pune + Glassdoor with source URLs",
        typical: "Single number with no source",
      },
      {
        feature: "Course fee transparency",
        archer: "₹20,000 – ₹90,000 published range with mode breakdown",
        typical: "Hidden behind enquiry form",
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
      "Compare with whoever you are considering — we welcome the comparison. The right test is whether you can see actual student work and named trainers before you pay.",
  },

  versusAlternative: {
    heading: "Python vs Java — Which to Learn First in 2026",
    paragraphs: [
      "If your goal is scripting, automation, testing support, data preparation or a gentle first programming language, Core Python is usually the easier start. You write useful programs quickly and the syntax does not fight beginners.",
      "If your goal is enterprise backend engineering, large services-company Java teams or Android-adjacent work, Core Java may be the stronger first language. Java has a wider enterprise footprint in Pune, while Python gives faster early productivity.",
      "Honest answer for most Pune freshers: choose Python if you want the lowest-friction entry into programming and later data/AI options. Choose Java if you are targeting enterprise backend from day one. Many students eventually learn both.",
    ],
  },

  prerequisitesAndStart: {
    paragraphs: [
      "Prerequisites are minimal — basic computer use, logical thinking, and willingness to commit 8–10 hours per week of practice outside class. No prior programming experience required; we start from `print('Hello, world!')` on day one. If you have done a 12th-standard computer-science course, you will move slightly faster but won't be ahead of where the course expects.",
    ],
    suggestedSteps: [
      "Decide your mode — classroom in Kothrud, online live, or weekend",
      "Check the upcoming batch dates on our batch schedule page",
      "Book a free 30-minute counselling call — we will honestly tell you whether the course fits your goal",
      "Confirm enrolment and complete pre-course orientation",
      "Show up to day one with a laptop running 64-bit OS — Python installation is part of session 1",
    ],
  },

  faqs: [
    {
      question: "What is the Python course fee in Pune at Archer Infotech?",
      answer:
        "Course fees range from ₹20,000 to ₹90,000 depending on mode (classroom / online / weekend), batch type, and any applicable concession. The higher end covers placement-track classroom batches with extended interview prep; the lower end covers concession-eligible online or weekend formats. Placement support is included in every fee tier.",
    },
    {
      question: "How long is the Python training course in Pune?",
      answer:
        "Three months (12 weeks) of structured curriculum plus 2 weeks of capstone and interview preparation. The weekend batch stretches over 5 months at the same content depth, designed for working professionals.",
    },
    {
      question: "Is Python better than Java for beginners in 2026?",
      answer:
        "Python has a lower learning curve and lets you build something useful faster — better for absolute beginners. Java has slightly more open jobs in Pune. For most freshers we recommend Python first, then add Java later if you pivot to enterprise. Both languages have ample Pune demand.",
    },
    {
      question: "What is the salary of a Python developer in Pune?",
      answer:
        "Indeed Pune reports an average of ₹7.59 lakh per year for Python Developer (April 2026). Junior Python Developer Pune averages around ₹2.2 lakh per year (₹18,628 per month). Senior Python developers with 7+ years earn ₹15–25 lakh per year nationally; Pune trends within ±10% of these figures.",
    },
    {
      question: "Which companies in Pune hire Python developers?",
      answer:
        "Persistent Systems, TCS, Infosys, Cognizant, Capgemini, Atos/Eviden, BMW TechWorks India, Tiger Analytics, Fractal Analytics, ZS Associates, MathCo, Synechron, Mercedes-Benz R&D India, Cummins, Honeywell, and John Deere ETC are among the top Pune employers actively hiring Python developers in 2026.",
    },
    {
      question: "Do I need a coding background to learn Python?",
      answer:
        "No — we start from absolute basics. The course is designed for first-time programmers. What you do need is 8–10 hours per week of practice outside class. Coding is learned by writing code; passive watching does not transfer.",
    },
    {
      question: "Is Python certification worth it for jobs in Pune?",
      answer:
        "Pune hiring managers screen on portfolio over certificates. For a Core Python learner, a clean public GitHub with automation scripts, OOP projects, SQLite-backed utilities, tested functions and readable README files is stronger than a certificate alone. We help you build that portfolio during the course.",
    },
    {
      question: "Can I learn Python and switch to data science / AI later?",
      answer:
        "Yes. This Core Python course gives the programming base required for Data Science, Machine Learning and Generative AI tracks. It does not teach pandas, NumPy, scikit-learn, RAG or LLM app development in depth; those are separate follow-on courses once your Core Python is strong.",
    },
    {
      question: "Will I work on real projects?",
      answer:
        "Yes — Core Python projects such as a file automation toolkit, student records or expense tracker with SQLite, and a Python DSA/problem-solving repository. The projects use functions, modules, OOP, collections, files, exceptions, database/API basics, pytest and README documentation.",
    },
    {
      question: "Are weekend Python classes available in Pune?",
      answer:
        "Yes — Saturday and Sunday, 09:00–13:00, stretched over 5 months instead of 3. Same content, same trainers, same projects. Designed for working professionals who cannot attend weekday batches.",
    },
    {
      question: "Are Django and FastAPI included in this Core Python course?",
      answer:
        "No. This page is for Core Python training. Django and FastAPI are covered in Python Full Stack or backend-focused follow-on tracks. In this course, you learn the Python language, files, OOP, modules, packages, testing, database/API basics and problem solving first.",
    },
    {
      question: "Is AI or LLM integration included in this Core Python course?",
      answer:
        "No full AI/LLM module is included in the Core Python syllabus. We may show how AI coding assistants help with debugging and explanations, but OpenAI/Anthropic SDKs, RAG, vector databases and GenAI applications are covered in separate Generative AI and AI Engineering courses.",
    },
    {
      question: "Can a fresher get a Python job in Pune?",
      answer:
        "Yes — Indeed Pune lists 1,000+ active Python roles as of May 2026, including entry-level positions at IT services (TCS, Infosys, Cognizant, Capgemini), product engineering, and analytics companies. Junior Pune Python entry typically starts around ₹2–4 lakh per year, with strong growth from year 2.",
    },
    {
      question: "What support do I get after course completion?",
      answer:
        "Six months of active placement support — mock interviews, referrals via our alumni network, resume and LinkedIn rewrites, and salary negotiation coaching. If your first round of interviews does not land, you can sit in on a future batch's interview-prep sessions free of charge.",
    },
    {
      question: "Is the named trainer actually teaching, or just on the brochure?",
      answer:
        "Amol Patil personally leads every Python batch from setup through capstone — the same name on this page is the same person you meet on day one. His LinkedIn is on the trainer profile page; we welcome a 30-minute conversation with him before you enrol.",
    },
  ],

  finalCta: {
    heading: "Ready to start Python training in Pune?",
    paragraph:
      "We have classroom, online, and weekend batches starting every 4–6 weeks. Reach out via the enquiry form or call us — Amol is happy to spend 30 minutes telling you whether the course is right for you. Visit our Kothrud, Pune campus, see the classroom, and decide with full information.",
  },
};
