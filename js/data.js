/**
 * ChipPath - Master Data Store
 * Digital Talent Pipeline & Verified Talent Passport for Semiconductor Industry
 * Optimized for Class Presentations & Live Interactive Peer Testing
 */

const ChipPathData = {
  // Current Active Student (Can be customized dynamically by classmates during testing)
  student: {
    name: "Anonymous",
    studentId: "CP-2026-88942",
    grade: "High School Student",
    targetDiscipline: "Semiconductor & Microelectronics Engineering",
    schoolYear: "2025 - 2026",
    verificationStatus: "Verified by ChipPath",
    verificationHash: "0x8F92A4...C71B (Secured via ChipPath Protocol)",
    verificationDate: "September 8, 2026",
    passportCompletion: 75,
    milestonesCompleted: 3,
    totalMilestones: 5,
    aptitudeScore: 87,
    engagementScore: 94,
    interestPercentile: "Top 5%",
    stageHandoverStatus: "Qualified for Stage 2 Fast-Track (University-Industry Consortium)"
  },

  // Speaker notes for presentation
  speakerNotes: {
    home: {
      title: "Screen 1: Home — Talent Journey Dashboard",
      hook: "Problem solved: High school students lack a structured, verified pathway to explore semiconductor careers without losing their achievements upon entering university.",
      points: [
        "ChipPath is not a gamified learning app — it is a digital infrastructure connecting and preserving early talent.",
        "5-Stage Journey Tracker: Discover → Experience → Challenge → Verify → Build.",
        "Every activity directly feeds into the student's persistent Talent Passport."
      ]
    },
    explore: {
      title: "Screen 2: Explore — Discover the Industry",
      hook: "Removes barriers to multi-million-dollar cleanroom facilities via virtual immersion and direct mentor dialogue.",
      points: [
        "5-step Virtual Cleanroom Tour spanning silicon ingots, EUV lithography, to advanced 3D packaging.",
        "Direct interactions with Senior Engineers (Synopsys, Marvell, Intel) helping students make informed college choices.",
        "Records verified hours of real exposure rather than passive content consumption."
      ]
    },
    challenges: {
      title: "Screen 3: Challenges — Prove Your Potential",
      hook: "Evaluates genuine technical aptitude through real semiconductor physics simulation instead of multiple-choice quizzes.",
      points: [
        "Smart Factory Challenge: Students balance Lithography exposure, CVD deposition mode, and Metrology inspection rates.",
        "Real-time calculation engine: Yield rate, Throughput (wafer/h), and Defect Density.",
        "Rubric-based assessment across 4 pillars: Technical Aptitude, Systems Thinking, Problem Solving, Feasibility."
      ]
    },
    "challenge-result": {
      title: "Screen 4: Challenge Result — Verified Evidence",
      hook: "Converts simulation performance into auditable digital evidence of potential.",
      points: [
        "Displays Technical Aptitude Score, Engagement Score, and Demonstrated Interest percentile (Top 5%).",
        "Issues tamper-proof digital credentials with unique cryptographic tokens.",
        "Seamlessly loaded into the Talent Passport for Stage 2 handover."
      ]
    },
    passport: {
      title: "Screen 5: Passport — Your Verified Talent Passport (FLAGSHIP)",
      hook: "Core solution: A professional corporate-grade digital talent portfolio.",
      points: [
        "Official endorsement: ✓ Verified by ChipPath (auditable student token).",
        "4 comprehensive data sections: Industry Exposure, STEM Challenge Results, Digital Credentials & 5-Skill Matrix, Participation Milestones.",
        "Instant QR verification and exportable Official Talent Dossier (PDF) for university admissions."
      ]
    },
    opportunities: {
      title: "Screen 6: Opportunities — Early Talent Pool (Stage 2 Handover)",
      hook: "Key conceptual breakthrough: Light-Touch Re-Engagement.",
      points: [
        "Solves the critical drop-off where freshman/sophomore college students lose connection with industry sponsors.",
        "ChipPath does not replace Stage 2 — it bridges verified high-school talent into university labs and corporate fellowships.",
        "Freshman Foundry Fellowship, Annual Career Day, and quarterly micro-mentorships."
      ]
    }
  },

  journeyStages: [
    { id: "discover", name: "Discover", status: "completed", desc: "Industry landscape & semiconductor career pathways" },
    { id: "experience", name: "Experience", status: "completed", desc: "Virtual factory tours & senior engineer dialogue" },
    { id: "challenge", name: "Challenge", status: "completed", desc: "Applied semiconductor STEM challenge & rubric" },
    { id: "verify", name: "Verify", status: "in-progress", desc: "Cryptographic credential minting & audit" },
    { id: "build", name: "Build", status: "upcoming", desc: "Handover to Stage 2 University-Industry Consortium" }
  ],

  recentActivities: [
    {
      id: "act-1",
      title: "Virtual Semiconductor Factory Tour",
      category: "Virtual Cleanroom Tour",
      status: "Completed",
      date: "Sep 02, 2026",
      badge: "Cleanroom Protocol Certified",
      icon: "building-2",
      badgeColor: "emerald"
    },
    {
      id: "act-2",
      title: "STEM Challenge: Smart Factory Optimization",
      category: "Practical Challenge",
      status: "Result: 87/100 (Distinction)",
      date: "Sep 05, 2026",
      badge: "Yield Optimization Specialist",
      icon: "cpu",
      badgeColor: "blue"
    },
    {
      id: "act-3",
      title: "Industry Interaction: Senior EDA Engineer Dialogue",
      category: "Engineer Interaction",
      status: "Completed",
      date: "Sep 07, 2026",
      badge: "Industry Exposure Verified",
      icon: "users",
      badgeColor: "indigo"
    }
  ],

  exploreActivities: [
    {
      id: "tour-1",
      type: "tour",
      title: "Virtual Semiconductor Factory Tour",
      organizer: "ChipPath Global Foundry Network",
      tag: "Virtual Factory Tour",
      duration: "45 Mins",
      skills: ["ISO Class 1 Protocol", "EUV Lithography Pipeline", "300mm Wafer Flow"],
      description: "Explore the end-to-end journey from raw monocrystalline silicon ingot to 3nm nano-scale microprocessors inside an ultra-pure cleanroom environment.",
      image: "fab-tour",
      featured: true
    },
    {
      id: "visit-1",
      type: "visit",
      title: "Advanced Packaging & Test Facility Immersion",
      organizer: "Amkor & Intel Partner Labs Alliance",
      tag: "Company Visit",
      duration: "Half-Day Immersion",
      skills: ["3D Chiplet Stacking", "Wafer-Level Packaging", "Automated ATE Systems"],
      description: "Hybrid on-site immersion exploring heterogeneous chiplet integration, thermal dissipation solutions, and high-speed automated testing.",
      image: "packaging-lab",
      featured: false
    },
    {
      id: "ama-1",
      type: "interaction",
      title: "Ask-Me-Anything: Microchip Logic Design Lead",
      organizer: "Synopsys & Marvell Mentor Guild",
      tag: "Engineer Interaction",
      duration: "60 Mins Live",
      skills: ["RTL Logic Synthesis", "Verilog / SystemVerilog", "Silicon Tape-Out Workflow"],
      description: "Live interactive dialogue with senior chip architects on microelectronics career roadmaps, EDA tooling, and undergraduate specialization choices.",
      image: "engineer-ama",
      featured: false
    },
    {
      id: "career-1",
      type: "career",
      title: "Semiconductor Career Pathways Matrix",
      organizer: "Semiconductor Industry Association (SIA)",
      tag: "Career Pathway",
      duration: "Interactive Matrix",
      skills: ["IC Architecture", "Fab Process Engineering", "Yield Analysis", "EDA Software"],
      description: "Comprehensive blueprint outlining university degrees, salary benchmarks, and advancement paths from bachelor's graduate to Principal Architect.",
      image: "pathway-matrix",
      featured: false
    },
    {
      id: "resource-1",
      type: "resource",
      title: "STEM Foundation: Silicon Crystal Physics & Photolithography",
      organizer: "ChipPath Academic Alliance",
      tag: "STEM Resource",
      duration: "Self-Paced (4 Modules)",
      skills: ["Energy Bandgap Theory", "Ion Implantation Doping", "Photoresist Chemistry"],
      description: "Concise foundational primer tailored for high school STEM students to master solid-state physics and cleanroom chemical processes.",
      image: "stem-primer",
      featured: false
    }
  ],

  stemChallenges: [
    {
      id: "challenge-smart-factory",
      title: "Smart Factory Process Challenge",
      tagline: "Optimize Yield Rate and Bottlenecks in an Automated Semiconductor Fab",
      difficulty: "Intermediate",
      domain: "Process Engineering & Yield Optimization",
      duration: "40 Mins",
      status: "Completed",
      score: 87,
      maxScore: 100,
      description: "Design a solution to balance lithography stepper cycle time, thin-film CVD deposition modes, and optical metrology inspection to maximize wafer throughput while minimizing defect density.",
      criteria: [
        { label: "Technical Aptitude", score: 92, weight: "40%", desc: "Understanding of EUV exposure timing and CVD deposition dynamics" },
        { label: "Systems Thinking", score: 86, weight: "30%", desc: "Balancing production pipeline throughput and buffer capacities" },
        { label: "Problem Solving", score: 88, weight: "20%", desc: "Root-cause analysis and mitigation of sub-micron defect density" },
        { label: "Feasibility & Innovation", score: 82, weight: "10%", desc: "Real-world manufacturing feasibility within standard cleanroom fab" }
      ],
      earnedBadge: {
        title: "Smart Process Optimizer",
        code: "CP-BADGE-YLD87",
        issuedBy: "ChipPath Verification Board",
        verificationHash: "0x3D7A...9F21"
      }
    },
    {
      id: "challenge-logic-gate",
      title: "4-Bit ALU Logic Optimizer",
      tagline: "Design energy-efficient logic circuits for low-power coprocessors",
      difficulty: "Advanced",
      domain: "Digital IC Design & RTL",
      duration: "60 Mins",
      status: "Available",
      score: null,
      maxScore: 100,
      description: "Optimize transistor count and critical propagation delay using Karnaugh mapping and boolean minimization techniques.",
      criteria: [
        { label: "Boolean Simplification", score: null, weight: "35%", desc: "Minimal logic gate synthesis" },
        { label: "Timing Constraint Compliance", score: null, weight: "35%", desc: "Critical delay path minimization" },
        { label: "Power Efficiency", score: null, weight: "30%", desc: "Static leakage and dynamic switching reduction" }
      ],
      earnedBadge: null
    },
    {
      id: "challenge-cleanroom-control",
      title: "Cleanroom Contamination Control Protocol",
      tagline: "Establish particulate prevention protocols for sub-5nm fabrication",
      difficulty: "Beginner",
      domain: "Cleanroom Metrology & Quality Assurance",
      duration: "30 Mins",
      status: "Completed",
      score: 94,
      maxScore: 100,
      description: "Calculate HEPA laminar air velocity and gowning sterilization workflows to eliminate sub-micron contamination incidents.",
      criteria: [
        { label: "ISO 14644-1 Standards", score: 96, weight: "40%", desc: "Particulate density boundary calculations" },
        { label: "Airflow Fluid Dynamics", score: 92, weight: "35%", desc: "Laminar flow velocity optimization" },
        { label: "CAPA Remediation Protocol", score: 94, weight: "25%", desc: "Corrective and preventive action plan" }
      ],
      earnedBadge: {
        title: "Cleanroom Metrology Certified",
        code: "CP-BADGE-CLN94",
        issuedBy: "ChipPath Quality Authority",
        verificationHash: "0x7C11...4A89"
      }
    }
  ],

  passportSections: {
    industryExposure: [
      {
        title: "Virtual Semiconductor Factory Tour",
        partner: "Global Foundry Consortium",
        date: "Sep 02, 2026",
        hours: "3.5 Verified Hours",
        verified: true,
        verificationCode: "EXP-2026-VFT-092",
        details: "Comprehensive study of EUV lithography chambers, thermal diffusion furnaces, plasma dry etch systems, and automated FOUP wafer transport."
      },
      {
        title: "Cleanroom Immersion & Metrology Briefing",
        partner: "Intel & Synopsys STEM Initiative",
        date: "Aug 24, 2026",
        hours: "4.0 Verified Hours",
        verified: true,
        verificationCode: "EXP-2026-CLM-118",
        details: "Sub-micron particulate diagnostic experiments, atomic force microscopy (AFM), and automated optical wafer inspection techniques."
      },
      {
        title: "Senior IC Architect Mentorship Session",
        partner: "Marvell Technology & IEEE Solid-State",
        date: "Aug 15, 2026",
        hours: "2.0 Verified Hours",
        verified: true,
        verificationCode: "EXP-2026-ENG-441",
        details: "System-on-Chip (SoC) floorplanning orientation, clock tree synthesis overview, and higher-education specialization guidance."
      }
    ],
    stemResults: [
      {
        title: "Smart Factory Process Challenge",
        score: "87 / 100",
        rating: "Distinction (Top 6% Cohort Ranking)",
        date: "Sep 05, 2026",
        verified: true,
        summary: "Demonstrated exemplary capability in resolving wafer fab bottlenecks and maintaining defect rates within rigorous industrial tolerances."
      },
      {
        title: "Cleanroom Contamination Control Protocol",
        score: "94 / 100",
        rating: "High Distinction (Top 2% Cohort Ranking)",
        date: "Aug 28, 2026",
        verified: true,
        summary: "Flawlessly designed ISO Class 1 air filtration parameters and laminar barrier fluid dynamics."
      }
    ],
    credentials: [
      {
        title: "Smart Process Optimizer Specialist",
        issuer: "ChipPath Talent Protocol",
        badgeId: "CPT-YLD-2026",
        issuedDate: "09/2026",
        skills: ["Wafer Throughput Analysis", "Yield Metrology", "Cycle Balancing"],
        status: "Cryptographically Verified"
      },
      {
        title: "Cleanroom Metrology Protocol Holder",
        issuer: "ChipPath Talent Protocol",
        badgeId: "CPT-CLN-2026",
        issuedDate: "08/2026",
        skills: ["ISO 14644-1 Protocol", "Contamination Diagnostics", "HEPA Dynamics"],
        status: "Cryptographically Verified"
      },
      {
        title: "Semiconductor Fundamentals Micro-Credential",
        issuer: "Semiconductor Workforce Alliance",
        badgeId: "CPT-FND-2026",
        issuedDate: "07/2026",
        skills: ["Silicon Crystal Lattices", "Bandgap Mechanics", "Lithography Principles"],
        status: "Cryptographically Verified"
      }
    ],
    competencies: [
      { name: "Semiconductor Fabrication Flow", level: 90, benchmark: "Exemplary High School Level" },
      { name: "Bottleneck & Yield Optimization", level: 88, benchmark: "University-Ready Pre-Engineering" },
      { name: "Cleanroom Metrology & QA", level: 95, benchmark: "Enterprise Admission Benchmark" },
      { name: "Digital Logic & Boolean Synthesis", level: 82, benchmark: "Solid Analytical Foundation" },
      { name: "Systems Engineering Acumen", level: 89, benchmark: "Advanced Engineering Distinction" }
    ],
    programmeMilestones: [
      { step: "Milestone 1", name: "Industry Overview & Foundation Concepts", status: "Completed", date: "Jul 10, 2026" },
      { step: "Milestone 2", name: "Virtual Cleanroom Tour & ISO Immersion", status: "Completed", date: "Aug 15, 2026" },
      { step: "Milestone 3", name: "Applied STEM Challenge Assessment", status: "Completed", date: "Sep 05, 2026" },
      { step: "Milestone 4", name: "Talent Passport Minting & Verification", status: "In Progress", date: "Sep 2026" },
      { step: "Milestone 5", name: "Stage 2 University-Industry Consortium Handover", status: "Upcoming", date: "Target: Nov 2026" }
    ]
  },

  earlyTalentOpportunities: [
    {
      id: "opp-1",
      title: "Annual Semiconductor Career Day & Talent Gala",
      partner: "National Semiconductor Consortium",
      type: "Annual Career Event",
      timing: "Dec 12, 2026",
      location: "High-Tech Innovation Park / Hybrid",
      description: "Connect directly with foundry leaders and deans of engineering. Explore early merit scholarships and priority university admissions.",
      badge: "VIP Fast-Pass for Verified Passport Holders",
      matchScore: "98% Compatibility",
      actionText: "Reserve Priority Seat",
      tags: ["University Scholarships", "Industry Networking", "Fab Facility Tours"]
    },
    {
      id: "opp-2",
      title: "Freshman Foundry Fellowship (Pre-University Internship)",
      partner: "Synopsys & TSMC Design Alliance",
      type: "Early Talent Internship",
      timing: "Summer 2027 (Post-Graduation)",
      location: "Advanced IC R&D Center",
      description: "Exclusive 8-week paid fellowship for high school graduates with ChipPath credentials entering Electrical Engineering, Microelectronics, or Physics.",
      badge: "Direct Stage 2 Pipeline Bridge",
      matchScore: "95% Compatibility",
      actionText: "Express Early Interest",
      tags: ["Paid Fellowship", "EDA Design Tools", "1-on-1 Mentorship"]
    },
    {
      id: "opp-3",
      title: "Semiconductor University Honors Incubator",
      partner: "Top Engineering Universities — Microelectronics Dept.",
      type: "Academic Bridge",
      timing: "Academic Year 2026 - 2027",
      location: "University Semiconductor Cleanroom Labs",
      description: "Course waiver and fast-track research lab placement for students with verified ChipPath Talent Passports.",
      badge: "Stage 2 Dossier Handover",
      matchScore: "92% Compatibility",
      actionText: "View Transfer Criteria",
      tags: ["Lab Fast-Track", "Research Credits", "Faculty Advisors"]
    },
    {
      id: "opp-4",
      title: "Corporate Micro-Mentorship: Hardware Architecture",
      partner: "Intel Labs & Industry Mentor Network",
      type: "Light-Touch Re-Engagement",
      timing: "Quarterly Cadence (1 hr/month)",
      location: "Online Portal / Video Sessions",
      description: "Light-touch check-ins with senior principal engineers to track undergraduate milestones and guide senior capstone semiconductor projects.",
      badge: "Talent Retention & Preservation",
      matchScore: "90% Compatibility",
      actionText: "Join Mentor Circle",
      tags: ["Quarterly AMA", "Portfolio Review", "Long-Term Retention"]
    }
  ],

  // Peer review feedback store (saved to localStorage for class testing)
  feedbackList: [
    {
      name: "Marcus Chen (Classmate)",
      rating: 5,
      favorite: "Smart Factory Simulator & QR Token",
      comment: "The interface looks like an authentic corporate platform! I love how the STEM challenge produces a cryptographic verification token rather than just a generic quiz score.",
      time: "Just now"
    },
    {
      name: "Sarah Jenkins (Classmate)",
      rating: 5,
      favorite: "Light-Touch Re-Engagement Model",
      comment: "The idea of preserving high-school credentials into university stages solves a real structural flaw in the talent pipeline.",
      time: "5 mins ago"
    }
  ]
};

// Expose globally
if (typeof window !== "undefined") {
  window.ChipPathData = ChipPathData;
}
