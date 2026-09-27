export const profile = {
  name: "Safi Ullah",
  email: "codewithsafi24@gmail.com",
  github: "https://github.com/safiullah-24",
  linkedin: "https://www.linkedin.com/in/safiullah124/",
  leetcode: "https://leetcode.com/u/safiullah-24/",
  location: "Lahore, Pakistan",
};
export type Project = {
  id: string;
  number: string;
  name: string;
  category: string;
  status: string;
  headline: string;
  description: string;
  role: string;
  stack: string[];
  problem: string;
  approach: string;
  contribution: string;
  outcome: string;
  repository: string;
  evidence: string;
  evidenceLabel: string;
};
export const projects: Project[] = [
  {
    id: "calculus",
    number: "01",
    name: "CalculusRuntime",
    category: "INTERACTIVE MATHEMATICS",
    status: "Open-source contribution",
    headline: "Make the abstract tangible.",
    description:
      "Turning derivatives, Taylor series, and 3D surfaces into something you can actually explore.",
    role: "Frontend engineering · QuantumLogicsLabs",
    stack: ["React", "JavaScript", "Plotly.js", "mathjs", "KaTeX"],
    problem:
      "A formula tells you what a function does. It rarely gives you an intuition for how it behaves. CalculusRuntime makes that relationship visible and interactive.",
    approach:
      "React controls feed an expression engine built with mathjs. Symbolic derivatives and Taylor terms become interactive plots, with mathematical notation rendered for readability.",
    contribution:
      "Implemented the Taylor-series and derivative visualization tool, extended it with interactive 3D graphing, and added spaced-review reminders to the dashboard. These contributions are recorded in the upstream commit history.",
    outcome:
      "An interactive way to compare a function with its approximation, inspect mathematical behavior, and revisit concepts. This portfolio’s live plot is a small, purpose-built demonstration of that idea.",
    repository: "https://github.com/QuantumLogicsLabs/CalculusRuntime-Frontend",
    evidence:
      "https://github.com/QuantumLogicsLabs/CalculusRuntime-Frontend/commit/f208494961f738a21f7800dd04e4ea9fe4c2f577",
    evidenceLabel: "Taylor visualization contribution",
  },
  {
    id: "repomind",
    number: "02",
    name: "RepoMind",
    category: "AI × DEVELOPER TOOLS",
    status: "Collaborative engineering",
    headline: "From intent to a reviewable change.",
    description:
      "Repository intelligence connecting a change request, an agent workflow, and a pull request.",
    role: "Backend integration · Team collaboration",
    stack: ["Python", "FastAPI", "LangChain", "GitHub API", "Express"],
    problem:
      "Useful code automation needs more than generated text. It needs repository context, an execution path, visible progress, and changes that can be inspected.",
    approach:
      "HackingTheRepo connects its web interface and Express backend to a separate FastAPI agent service. The agent workflow plans edits, uses repository tools, and returns a diff or pull-request result.",
    contribution:
      "Worked on the FastAPI job lifecycle and integration around run, status, and refinement, alongside collaborative review and team coordination. Public history also records my integration of teammates’ work; those features are team contributions.",
    outcome:
      "An exploration of agentic engineering: separate the interface from the agent, expose each job’s state, and keep code changes reviewable. Reliability and agent evaluation remain ongoing engineering concerns.",
    repository: "https://github.com/QuantumLogicsLabs/RepoMind",
    evidence:
      "https://github.com/safiullah-24/RepoMind/blob/main/api/routes.py",
    evidenceLabel: "Explore the API job lifecycle",
  },
  {
    id: "meetforge",
    number: "03",
    name: "MeetForge",
    category: "REAL-TIME SYSTEMS",
    status: "Personal project · In progress",
    headline: "Different places. One shared moment.",
    description:
      "A collaboration platform exploring what happens between joining a room and making a connection.",
    role: "Full-stack development",
    stack: ["React", "Node.js", "Express", "MongoDB", "WebRTC", "Socket.io"],
    problem:
      "Real-time collaboration combines identity, room state, signaling, and media. Each needs a clear boundary.",
    approach:
      "React handles the meeting experience; Express and MongoDB support users and rooms. Socket.io relays offers, answers, and ICE candidates while WebRTC handles peer media.",
    contribution:
      "Built JWT authentication, database and user-model integration, meeting creation and joining, and peer-connection signaling. The meeting-room source includes media controls and connection-state handling.",
    outcome:
      "A codebase covering authentication, room workflows, and peer video signaling. Group calling, whiteboard, file sharing, and broader production hardening remain future scope.",
    repository: "https://github.com/safiullah-24/meetforge",
    evidence:
      "https://github.com/safiullah-24/meetforge/commit/047d2cb540526b4cce2e0fbb2277d6b96fee6927",
    evidenceLabel: "Real-time signaling contribution",
  },
  {
    id: "ml",
    number: "04",
    name: "FlyRank ML Lab",
    category: "APPLIED MACHINE LEARNING",
    status: "Internship work",
    headline: "Ask better questions of the data.",
    description:
      "Search-intelligence experiments, from the first notebook to problem framing and data contracts.",
    role: "ML internship · FlyRank",
    stack: ["Python", "Jupyter", "pandas", "scikit-learn"],
    problem:
      "A model is only useful when the question, data, and evaluation support the decision it is meant to inform.",
    approach:
      "Use anonymized search data to examine signals, define an ML task, and make dataset assumptions explicit before advancing to modeling.",
    contribution:
      "Completed the first-look notebook, a research question, ML task framing, and a search-intelligence data contract. The repository includes the internship’s reference pipeline as well as submitted work.",
    outcome:
      "An evolving ML practice grounded in problem definition and reproducible notebooks. Starter-material metrics are reference results, not claimed as my model performance.",
    repository: "https://github.com/safiullah-24/flyrank-ml-lab",
    evidence:
      "https://github.com/safiullah-24/flyrank-ml-lab/commit/ee592d6df3d9f963dfd9d3c8af9fafb33a276591",
    evidenceLabel: "Data-contract submission",
  },
  {
    id: "fitness",
    number: "05",
    name: "AI Fitness Trainer",
    category: "AI APPLICATION EXPLORATION",
    status: "Collaborative exploration",
    headline: "Context before recommendations.",
    description:
      "Exploring personalized fitness guidance through profiles, application logic, and recommendation services.",
    role: "AI application experimentation",
    stack: ["Python", "Flask", "SQLAlchemy", "SQLite"],
    problem:
      "Personalized software needs structured user context and application logic around its recommendation layer.",
    approach:
      "The project separates routes, profile data, workout and diet logic, and recommendation services in a Flask application.",
    contribution:
      "Exploration through a collaborative repository fork, connecting an interest in fitness with AI-assisted development. This is experimentation, without a claim to sole authorship.",
    outcome:
      "A learning ground for Python web applications and recommendation workflows, rather than a validated commercial product.",
    repository: "https://github.com/safiullah-24/AI-Fitness-Trainer",
    evidence:
      "https://github.com/safiullah-24/AI-Fitness-Trainer/tree/main/app",
    evidenceLabel: "Explore the application structure",
  },
];
export const traces = [
  {
    name: "React",
    domain: "INTERFACES",
    description:
      "State, components, and interactions that help people understand a system.",
    projects: ["calculus", "meetforge"],
    detail: "Interactive mathematics ↔ real-time collaboration",
  },
  {
    name: "Python",
    domain: "INTELLIGENCE",
    description:
      "A shared language for agent services, data exploration, and application logic.",
    projects: ["repomind", "ml", "fitness"],
    detail: "Agent APIs ↔ notebooks ↔ recommendation services",
  },
  {
    name: "APIs & data",
    domain: "SYSTEMS",
    description:
      "The contracts connecting a useful interface to the work underneath it.",
    projects: ["repomind", "meetforge", "fitness"],
    detail: "FastAPI / Express · MongoDB / SQLite",
  },
  {
    name: "Mathematics",
    domain: "FOUNDATIONS",
    description:
      "CS foundations become useful when they can be tested, visualized, and explained.",
    projects: ["calculus", "ml"],
    detail: "Symbolic expressions ↔ numerical analysis",
  },
  {
    name: "Agent workflows",
    domain: "DEVELOPER TOOLS",
    description:
      "Moving beyond a single prompt toward context, planning, tools, and review.",
    projects: ["repomind"],
    detail: "Repository context → plan → diff → review",
  },
];
export const journey = [
  {
    name: "Foundations",
    word: "Understand.",
    label: "01 / THE REASONING",
    text: "Computer science gives me a way to break a problem down: algorithms, data structures, databases, and the mathematics underneath them.",
    tags: ["C++", "DSA", "SQL", "Computer science"],
  },
  {
    name: "Interfaces",
    word: "Make it tangible.",
    label: "02 / THE EXPERIENCE",
    text: "An idea becomes more useful when someone can interact with it. I connect theory to the browser through React, visualization, and deliberate interface decisions.",
    tags: ["React", "JavaScript", "Plotly.js", "Web engineering"],
  },
  {
    name: "Systems",
    word: "Connect the parts.",
    label: "03 / THE STRUCTURE",
    text: "The interface is one part of the problem. APIs, authentication, data models, and real-time connections give the experience its foundation.",
    tags: ["Node.js", "Express", "MongoDB", "WebRTC"],
  },
  {
    name: "Intelligence",
    word: "Give it context.",
    label: "04 / THE EXPERIMENT",
    text: "I’m exploring how models become useful inside software: thoughtful data work, agent tools, visible execution, and outputs a person can review.",
    tags: ["Python", "FastAPI", "ML experiments", "Agentic AI"],
  },
  {
    name: "Interoperability",
    word: "Question the boundary.",
    label: "05 / THE NEXT QUESTION",
    text: "I conceived PolyBridge and the Poly language direction to explore how one source format could connect different languages. The architecture and prototypes are now taking shape with my team.",
    tags: [
      "Compiler design",
      "Language adapters",
      "IR concepts",
      "Exploring WASM",
    ],
  },
];
export const githubSnapshot = {
  source: "snapshot" as "snapshot" | "live",
  updatedAt: "2026-09-26T00:00:00.000Z",
  publicRepos: 14,
  events: [
    {
      repo: "HackingTheRepo-Frontend",
      type: "Code review & integration",
      date: "2026-09-16",
      url: "https://github.com/QuantumLogicsLabs/HackingTheRepo-Frontend",
    },
    {
      repo: "RepoMind",
      type: "Team contribution integrated",
      date: "2026-09-05",
      url: "https://github.com/QuantumLogicsLabs/RepoMind/commit/d5613aff43ceaac66844a52d8d7226dbf07ea5da",
    },
    {
      repo: "RepoMind",
      type: "Pull-request review",
      date: "2026-09-02",
      url: "https://github.com/QuantumLogicsLabs/RepoMind",
    },
  ],
};

export type Capability = {
  name: string;
  status: "Applied" | "Foundations" | "Exploring" | "Learning";
  description: string;
  projects: string[];
  context?: string;
};
export type CapabilityGroup = {
  id: string;
  label: string;
  skills: Capability[];
};
const capability = (
  name: string,
  status: Capability["status"],
  description: string,
  projects: string[] = [],
  context?: string,
): Capability => ({ name, status, description, projects, context });
export const capabilityGroups: CapabilityGroup[] = [
  {
    id: "core",
    label: "Programming / core",
    skills: [
      capability(
        "JavaScript",
        "Applied",
        "Application logic, interactive controls, and the connections between the browser and a backend.",
        ["calculus", "meetforge"],
      ),
      capability(
        "Python",
        "Applied",
        "Backend APIs, agent integration, and notebook-based experiments.",
        ["repomind", "ml", "fitness"],
      ),
      capability(
        "C++",
        "Foundations",
        "Core programming and algorithmic problem solving as part of my computer science practice.",
        [],
        "CS foundations and ongoing problem-solving practice.",
      ),
      capability(
        "SQL",
        "Foundations",
        "Relational data, queries, and the structure behind persistent application state.",
        ["fitness"],
      ),
      capability(
        "HTML / CSS",
        "Applied",
        "Semantic interfaces, responsive layouts, and deliberate control over presentation.",
        ["calculus", "meetforge"],
      ),
      capability(
        "DSA",
        "Foundations",
        "Breaking problems into data structures, algorithms, and testable reasoning.",
        [],
        "Computer science study and algorithmic practice.",
      ),
      capability(
        "OOP",
        "Foundations",
        "Using abstraction, composition, and clear responsibilities to structure programs.",
        [],
        "Computer science foundations; continuing to apply them in larger systems.",
      ),
      capability(
        "CS foundations",
        "Foundations",
        "Algorithms, databases, operating systems, networks, and the mathematics that connect them.",
        [],
        "BS Computer Science student, with an evolving interest in language and systems design.",
      ),
    ],
  },
  {
    id: "frontend",
    label: "Frontend / interaction",
    skills: [
      capability(
        "React",
        "Applied",
        "State, components, and interfaces that make a complex idea approachable.",
        ["calculus", "meetforge"],
      ),
      capability(
        "Responsive UI",
        "Applied",
        "Layouts and controls designed to work across screen sizes and input methods.",
        ["calculus", "meetforge"],
      ),
      capability(
        "Tailwind / CSS",
        "Applied",
        "A practical combination of utility styling and custom visual systems.",
        ["meetforge"],
      ),
      capability(
        "Interactive visualization",
        "Applied",
        "Connecting mathematical models to direct manipulation and visible feedback.",
        ["calculus"],
      ),
      capability(
        "Plotly.js",
        "Applied",
        "Interactive function plots and 3D surfaces for mathematical exploration.",
        ["calculus"],
      ),
      capability(
        "mathjs",
        "Applied",
        "Expression evaluation and symbolic operations behind calculus tools.",
        ["calculus"],
      ),
      capability(
        "KaTeX",
        "Applied",
        "Readable mathematical notation alongside interactive results.",
        ["calculus"],
      ),
    ],
  },
  {
    id: "backend",
    label: "Backend / systems",
    skills: [
      capability(
        "Node.js",
        "Applied",
        "Server-side JavaScript for application workflows and API services.",
        ["meetforge"],
      ),
      capability(
        "Express",
        "Applied",
        "Routes, authentication workflows, and the backend surface of a full-stack application.",
        ["meetforge", "repomind"],
      ),
      capability(
        "FastAPI",
        "Applied",
        "A Python service exposing the run, status, and refinement lifecycle of an agent job.",
        ["repomind"],
      ),
      capability(
        "Flask",
        "Exploring",
        "Python application structure, routes, and recommendation services through a collaborative fork.",
        ["fitness"],
      ),
      capability(
        "REST APIs",
        "Applied",
        "Explicit contracts between interfaces, services, and external systems.",
        ["repomind", "meetforge"],
      ),
      capability(
        "JWT / authentication",
        "Applied",
        "User identity and protected application workflows in MeetForge.",
        ["meetforge"],
      ),
      capability(
        "WebRTC",
        "Applied",
        "Peer connection and media signaling work, with production hardening still ahead.",
        ["meetforge"],
      ),
      capability(
        "Socket.io",
        "Applied",
        "Room events and the signaling exchange that helps peers connect.",
        ["meetforge"],
      ),
    ],
  },
  {
    id: "data",
    label: "Data / persistence",
    skills: [
      capability(
        "MongoDB",
        "Applied",
        "Users, meetings, and application models behind MeetForge.",
        ["meetforge"],
      ),
      capability(
        "SQLite",
        "Exploring",
        "Relational persistence in Python application experiments.",
        ["fitness"],
      ),
      capability(
        "Database design",
        "Foundations",
        "Thinking through entities, relationships, queries, and data boundaries.",
        ["meetforge", "fitness"],
      ),
      capability(
        "Supabase",
        "Exploring",
        "Part of the wider CalculusRuntime backend stack; my verified contributions focus on frontend visualization.",
        ["calculus"],
      ),
    ],
  },
  {
    id: "ai",
    label: "AI / machine learning",
    skills: [
      capability(
        "Python ML workflows",
        "Learning",
        "Notebook experiments, ML task framing, and data contracts for search-intelligence work.",
        ["ml"],
      ),
      capability(
        "Jupyter",
        "Applied",
        "Making exploratory work inspectable through notebooks, notes, and repeatable steps.",
        ["ml"],
      ),
      capability(
        "pandas",
        "Learning",
        "Advancing my toolkit for tabular data inspection and preparation.",
        ["ml"],
      ),
      capability(
        "scikit-learn",
        "Learning",
        "Building familiarity with baseline models and evaluation workflows.",
        ["ml"],
      ),
      capability(
        "LLM integration",
        "Exploring",
        "Connecting model outputs to application context, tools, and reviewable actions.",
        ["repomind"],
      ),
      capability(
        "Prompt engineering",
        "Exploring",
        "Defining useful instructions, context, and output constraints for AI workflows.",
        ["repomind"],
      ),
      capability(
        "Agent workflows",
        "Applied",
        "Backend integration around repository context, job execution, and reviewable changes.",
        ["repomind"],
      ),
      capability(
        "LangChain",
        "Exploring",
        "Understanding the framework used in RepoMind’s agent service and how its tools fit together.",
        ["repomind"],
      ),
    ],
  },
  {
    id: "engineering",
    label: "Engineering / tools",
    skills: [
      capability(
        "Git / GitHub",
        "Applied",
        "Branching, pull requests, integration, and a public record of collaborative work.",
        ["calculus", "repomind", "meetforge"],
      ),
      capability(
        "API integration",
        "Applied",
        "Connecting services with explicit inputs, visible progress, and failure handling.",
        ["repomind", "meetforge"],
      ),
      capability(
        "Debugging",
        "Applied",
        "Following a problem across interfaces and services, then testing the smallest useful fix.",
        ["calculus", "meetforge"],
      ),
      capability(
        "Open-source collaboration",
        "Applied",
        "Contributions, reviews, integration, and team coordination in shared codebases.",
        ["calculus", "repomind"],
      ),
      capability(
        "Software architecture",
        "Exploring",
        "Developing better boundaries between components, services, data, and execution.",
        ["repomind", "meetforge"],
      ),
      capability(
        "Repository tooling",
        "Applied",
        "Integrating code-change workflows with repository context and review.",
        ["repomind"],
      ),
    ],
  },
  {
    id: "exploring",
    label: "The next connections",
    skills: [
      capability(
        "TypeScript",
        "Exploring",
        "Advancing from JavaScript toward explicit contracts and safer application code.",
        [],
        "An active learning direction, alongside this portfolio’s TypeScript implementation.",
      ),
      capability(
        "Next.js",
        "Exploring",
        "Exploring modern React routing and server/client boundaries.",
        [],
        "An active learning direction; the portfolio uses a Next-compatible Vinext build.",
      ),
      capability(
        "Advanced agents",
        "Exploring",
        "Evaluation, tool coordination, and dependable execution beyond a single generated response.",
        ["repomind"],
      ),
      capability(
        "Compiler architecture",
        "Exploring",
        "Designing how Poly source could be parsed, linked, and executed.",
        [],
        "PolyBridge / Poly — original R&D in active architecture and prototyping.",
      ),
      capability(
        "Intermediate representations",
        "Exploring",
        "Investigating a common representation for language boundaries and callable contracts.",
        [],
        "A proposed part of the PolyBridge architecture, still to be evaluated.",
      ),
      capability(
        "WASM concepts",
        "Exploring",
        "Studying where a portable execution target could fit, and where it would not.",
        [],
        "A research option for PolyBridge, not a finalized runtime choice.",
      ),
      capability(
        "Language interoperability",
        "Exploring",
        "Function linkage, type mapping, and coordinated execution across language environments.",
        [],
        "The central research question behind PolyBridge and the Poly source format.",
      ),
    ],
  },
];
