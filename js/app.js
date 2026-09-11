/**
 * ChipPath - Core Application Controller
 * Optimized for Classroom Presentation & Live Peer Testing
 */

document.addEventListener("DOMContentLoaded", () => {
  const App = {
    currentScreen: "home",
    isDesktopView: false,
    lang: "en", // 'en' | 'vi'
    showSpeakerNotes: false,
    tourStep: 0,
    tourStages: [
      {
        title: "1. Cleanroom Protocol & High-Velocity Air Shower",
        iso: "ISO Class 1 (<10 particles/m³)",
        desc: "Automated decontamination before entering the ultra-pure cleanroom. High-velocity HEPA airflow removes sub-micron particulates to shield bare silicon wafers from nano-defects.",
        focus: "Yield Protection & Contamination Control",
        metric: "99.999% Filtration Efficiency"
      },
      {
        title: "2. Czochralski Monocrystalline Silicon Ingot",
        iso: "99.9999999% Purity (9N Electronic Grade)",
        desc: "Molten silicon at 1,425°C is drawn into a single-crystal cylinder, then sliced with diamond wire saws into ultra-flat 300mm wafers.",
        focus: "Substrate Materials Engineering",
        metric: "300mm Wafer Diameter"
      },
      {
        title: "3. Extreme Ultraviolet (EUV) Lithography",
        iso: "13.5nm Light Wavelength (ASML Twinscan)",
        desc: "Projects complex circuit patterns onto photoresist with sub-nanometer precision using multi-layer reflective mirrors in high vacuum.",
        focus: "Sub-3nm Circuit Architecture",
        metric: "Atomic-Scale Precision"
      },
      {
        title: "4. Plasma Etch & Ion Implantation",
        iso: "Reactive Ion Etching (RIE)",
        desc: "Plasma selectively removes unprotected material with extreme vertical accuracy, while particle accelerators implant dopant ions to form nano-transistors.",
        focus: "Transistor Gate & Channel Formation",
        metric: ">15 Billion Transistors / Chip"
      },
      {
        title: "5. Automated Metrology & Advanced Packaging",
        iso: "AFM & AI Defect Recognition",
        desc: "Automated optical inspection and AFM classify flawless dies before dicing and 3D heterogeneous chiplet packaging.",
        focus: "Quality Assurance & 3D Stacking",
        metric: "Zero-Defect Standard"
      }
    ],

    init() {
      this.loadCustomStudent();
      this.loadSavedFeedbacks();
      this.renderAll();
      this.bindEvents();
      this.initSimulator();
      this.updateSpeakerNotes();
      lucide.createIcons();
    },

    loadCustomStudent() {
      const saved = localStorage.getItem("chippath_student");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          Object.assign(ChipPathData.student, parsed);
        } catch (e) {
          console.error(e);
        }
      }
    },

    loadSavedFeedbacks() {
      const saved = localStorage.getItem("chippath_feedbacks");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            ChipPathData.feedbackList = parsed;
          }
        } catch (e) {
          console.error(e);
        }
      }
    },

    saveFeedbacks() {
      localStorage.setItem("chippath_feedbacks", JSON.stringify(ChipPathData.feedbackList));
    },

    renderAll() {
      this.renderHome();
      this.renderExplore();
      this.renderChallenges();
      this.renderChallengeResult();
      this.renderPassport();
      this.renderOpportunities();
      this.renderFeedbackSection();
      this.updateHeaderStudentName();
    },

    updateHeaderStudentName() {
      const el = document.getElementById("header-student-name");
      if (el) el.textContent = ChipPathData.student.name || "Anonymous";
      const avatar = document.getElementById("header-student-avatar");
      if (avatar) {
        const name = (ChipPathData.student.name || "Anonymous").trim();
        if (name === "Anonymous") {
          avatar.textContent = "AN";
        } else {
          const parts = name.split(/\s+/);
          avatar.textContent = parts.length > 1 ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase() : name.substring(0, 2).toUpperCase();
        }
      }
    },

    bindEvents() {
      // Bottom Navigation Tabs
      document.querySelectorAll("[data-nav-target]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const target = btn.getAttribute("data-nav-target");
          this.switchScreen(target);
        });
      });

      // Dual View Toggle (Mobile vs Desktop)
      const viewToggleBtn = document.getElementById("toggle-view-mode");
      if (viewToggleBtn) {
        viewToggleBtn.addEventListener("click", () => {
          this.toggleViewMode();
        });
      }

      // Strategic Flow Steps
      document.querySelectorAll("[data-flow-step]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const step = btn.getAttribute("data-flow-step");
          this.handleFlowStepClick(step);
        });
      });

      // Explore Filter Buttons
      document.querySelectorAll(".explore-filter-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          document.querySelectorAll(".explore-filter-btn").forEach(b => {
            b.classList.remove("bg-blue-600", "text-white", "active");
            b.classList.add("bg-slate-100", "text-slate-600");
          });
          btn.classList.remove("bg-slate-100", "text-slate-600");
          btn.classList.add("bg-blue-600", "text-white", "active");
          const filter = btn.getAttribute("data-filter");
          this.filterExploreActivities(filter);
        });
      });
    },

    switchScreen(screenName) {
      this.currentScreen = screenName;
      
      // Update screen sections
      document.querySelectorAll(".screen-content").forEach((el) => {
        el.classList.add("hidden");
      });
      const targetEl = document.getElementById(`screen-${screenName}`);
      if (targetEl) {
        targetEl.classList.remove("hidden");
        // Scroll to top of inner screen
        const scrollContainer = document.getElementById("main-scroll-container");
        if (scrollContainer) scrollContainer.scrollTop = 0;
      }

      // Update Nav Buttons
      document.querySelectorAll("[data-nav-target]").forEach((btn) => {
        const target = btn.getAttribute("data-nav-target");
        const iconContainer = btn.querySelector(".nav-icon-wrapper");
        const label = btn.querySelector(".nav-label");
        
        if (target === screenName) {
          btn.classList.add("text-blue-600", "font-semibold");
          btn.classList.remove("text-slate-400");
          if (iconContainer) iconContainer.classList.add("bg-blue-50", "text-blue-600");
          if (label) label.classList.add("text-blue-600");
        } else {
          btn.classList.remove("text-blue-600", "font-semibold");
          btn.classList.add("text-slate-400");
          if (iconContainer) iconContainer.classList.remove("bg-blue-50", "text-blue-600");
          if (label) label.classList.remove("text-blue-600");
        }
      });

      // Update Strategic Flow Header Active Indicator
      this.updateFlowIndicator(screenName);

      // Update Speaker Notes for Pitching
      this.updateSpeakerNotes();

      lucide.createIcons();
    },

    toggleViewMode() {
      this.isDesktopView = !this.isDesktopView;
      const appContainer = document.getElementById("app-viewport");
      const toggleText = document.getElementById("toggle-view-text");

      if (this.isDesktopView) {
        appContainer.classList.add("desktop-view-active");
        if (toggleText) toggleText.textContent = "Mobile App View";
      } else {
        appContainer.classList.remove("desktop-view-active");
        if (toggleText) toggleText.textContent = "Desktop View";
      }
      lucide.createIcons();
    },

    toggleSpeakerNotes() {
      this.showSpeakerNotes = !this.showSpeakerNotes;
      const drawer = document.getElementById("speaker-notes-drawer");
      const btn = document.getElementById("btn-toggle-speaker-notes");
      if (drawer) {
        if (this.showSpeakerNotes) {
          drawer.classList.remove("hidden");
          if (btn) btn.classList.add("bg-amber-500", "text-slate-950", "font-bold");
        } else {
          drawer.classList.add("hidden");
          if (btn) btn.classList.remove("bg-amber-500", "text-slate-950", "font-bold");
        }
      }
    },

    updateSpeakerNotes() {
      const note = ChipPathData.speakerNotes[this.currentScreen] || ChipPathData.speakerNotes.home;
      const titleEl = document.getElementById("speaker-note-title");
      const hookEl = document.getElementById("speaker-note-hook");
      const listEl = document.getElementById("speaker-note-list");

      if (titleEl) titleEl.textContent = note.title;
      if (hookEl) hookEl.textContent = note.hook;
      if (listEl) {
        listEl.innerHTML = note.points.map(p => `
          <li class="flex items-start space-x-2 text-xs text-slate-200">
            <span class="text-amber-400 font-bold">•</span>
            <span>${p}</span>
          </li>
        `).join('');
      }
    },

    handleFlowStepClick(step) {
      switch (step) {
        case "discover":
          this.switchScreen("home");
          break;
        case "experience":
          this.switchScreen("explore");
          this.openVirtualTourModal();
          break;
        case "challenge":
          this.switchScreen("challenges");
          break;
        case "verify":
          this.switchScreen("challenge-result");
          break;
        case "passport":
          this.switchScreen("passport");
          break;
        case "early-talent":
        case "stage2":
          this.switchScreen("opportunities");
          break;
        default:
          this.switchScreen("home");
      }
    },

    updateFlowIndicator(screenName) {
      const stepMap = {
        home: "discover",
        explore: "experience",
        challenges: "challenge",
        "challenge-result": "verify",
        passport: "passport",
        opportunities: "early-talent"
      };
      const activeStep = stepMap[screenName] || "discover";
      
      document.querySelectorAll("[data-flow-step]").forEach((item) => {
        const step = item.getAttribute("data-flow-step");
        if (step === activeStep) {
          item.classList.add("bg-blue-600", "text-white", "ring-2", "ring-blue-400");
          item.classList.remove("bg-slate-800", "text-slate-300");
        } else {
          item.classList.remove("bg-blue-600", "text-white", "ring-2", "ring-blue-400");
          item.classList.add("bg-slate-800", "text-slate-300");
        }
      });
    },

    /* ==========================================================
       SCREEN 1: HOME (TALENT JOURNEY DASHBOARD)
    ========================================================== */
    renderHome() {
      const container = document.getElementById("home-dynamic-content");
      if (!container) return;

      const student = ChipPathData.student;
      const recent = ChipPathData.recentActivities;

      let html = `
        <!-- Live Classmate Test Notification Card -->
        <div class="mb-4 bg-gradient-to-r from-blue-900/90 to-indigo-900/90 text-white rounded-2xl p-3.5 border border-blue-500/40 shadow-md flex items-center justify-between">
          <div class="flex items-center space-x-2.5">
            <div class="w-8 h-8 rounded-xl bg-blue-500/30 border border-blue-400/40 flex items-center justify-center text-cyan-300 flex-shrink-0">
              <i data-lucide="sparkles" class="w-4 h-4"></i>
            </div>
            <div>
              <h4 class="text-xs font-bold text-white">Live Peer Testing Mode</h4>
              <p class="text-[11px] text-blue-200">Enter your name to generate your personalized Talent Passport!</p>
            </div>
          </div>
          <button onclick="App.openCustomizeStudentModal()" class="px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl shadow transition flex-shrink-0 ml-2">
            Customize & Test
          </button>
        </div>

        <!-- Welcome Hero Banner -->
        <div class="bg-gradient-to-r from-slate-900 via-slate-800 to-navy-900 text-white rounded-2xl p-5 mb-5 shadow-lg border border-slate-700/60 relative overflow-hidden">
          <div class="absolute -right-8 -bottom-10 w-36 h-36 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"></div>
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center space-x-2">
              <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-400/30">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse"></span>
                Active Talent Pipeline
              </span>
            </div>
            <span class="text-xs font-mono text-cyan-300 font-bold">${student.studentId}</span>
          </div>

          <h2 class="text-lg font-bold text-white tracking-tight mb-1">
            Welcome back, ${student.name.split(' ')[0]}
          </h2>
          <p class="text-xs text-slate-300 mb-4 leading-relaxed">
            Continue your journey into the semiconductor industry. Every verified activity contributes to your permanent Talent Passport.
          </p>

          <!-- Talent Passport Completion Bar -->
          <div class="bg-slate-800/80 rounded-xl p-3 border border-slate-700">
            <div class="flex items-center justify-between text-xs mb-1.5">
              <span class="font-medium text-slate-200 flex items-center">
                <i data-lucide="shield-check" class="w-3.5 h-3.5 text-blue-400 mr-1.5"></i>
                Talent Passport Completion
              </span>
              <span class="font-mono font-bold text-blue-400">${student.passportCompletion}%</span>
            </div>
            <div class="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
              <div class="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full transition-all duration-500" style="width: ${student.passportCompletion}%"></div>
            </div>
            <div class="flex justify-between items-center mt-2 text-[11px] text-slate-400">
              <span>${student.milestonesCompleted} / ${student.totalMilestones} Milestones Completed</span>
              <span class="text-emerald-400 font-medium">2 milestones remaining</span>
            </div>
          </div>
        </div>

        <!-- 5-Stage Journey Progress Tracker -->
        <div class="bg-white rounded-2xl p-4 mb-5 border border-slate-200/80 shadow-sm">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center">
              <i data-lucide="git-commit" class="w-4 h-4 text-blue-600 mr-1.5"></i>
              Pipeline Journey Tracker
            </h3>
            <span class="text-[11px] font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">Phase 1: High School</span>
          </div>

          <div class="relative flex items-center justify-between px-1 py-2">
            <div class="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-0.5 bg-slate-200 z-0"></div>
            <div class="absolute left-4 top-1/2 -translate-y-1/2 h-0.5 bg-blue-600 z-0" style="width: 70%"></div>

            ${ChipPathData.journeyStages.map((stage, idx) => `
              <div class="relative z-10 flex flex-col items-center group cursor-pointer" onclick="App.handleFlowStepClick('${stage.id}')">
                <div class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  stage.status === 'completed'
                    ? 'bg-slate-900 text-white ring-2 ring-emerald-500'
                    : stage.status === 'in-progress'
                    ? 'bg-blue-600 text-white ring-4 ring-blue-100 animate-pulse'
                    : 'bg-white border-2 border-slate-300 text-slate-400'
                }">
                  ${stage.status === 'completed' ? '✓' : idx + 1}
                </div>
                <span class="text-[10px] mt-1.5 font-semibold ${stage.status === 'in-progress' ? 'text-blue-600' : 'text-slate-600'}">
                  ${stage.name}
                </span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Recommended Next Action (Prominent Card) -->
        <div class="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-2xl p-4 mb-5 shadow-md border border-blue-800/60">
          <div class="flex items-center justify-between mb-2">
            <span class="text-[11px] font-semibold text-blue-300 bg-blue-500/20 px-2 py-0.5 rounded border border-blue-400/20 flex items-center">
              <i data-lucide="sparkles" class="w-3 h-3 mr-1"></i> Recommended Next Action
            </span>
            <span class="text-[11px] text-slate-300">Est. 20 mins</span>
          </div>
          <h4 class="text-sm font-bold text-white mb-1">Prove Your Potential: Smart Factory Challenge</h4>
          <p class="text-xs text-slate-300 mb-3 leading-relaxed">
            Optimize cleanroom wafer throughput and defect rates to earn your verified yield engineering credential.
          </p>
          <button onclick="App.switchScreen('challenges')" class="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl flex items-center justify-center space-x-1.5 shadow transition">
            <span>Launch STEM Challenge Simulator</span>
            <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
          </button>
        </div>

        <!-- Recent Verified Activities & Evidence -->
        <div class="mb-5">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center">
              <i data-lucide="history" class="w-4 h-4 text-slate-700 mr-1.5"></i>
              Verified Activity Evidence
            </h3>
            <span class="text-[11px] text-slate-500 font-medium">Real-time sync</span>
          </div>

          <div class="space-y-2.5">
            ${recent.map((act) => `
              <div class="bg-white rounded-xl p-3 border border-slate-200/80 shadow-sm flex items-center justify-between hover:border-blue-300 transition">
                <div class="flex items-start space-x-3">
                  <div class="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800 flex-shrink-0 mt-0.5">
                    <i data-lucide="${act.icon}" class="w-4.5 h-4.5 text-blue-600"></i>
                  </div>
                  <div>
                    <h4 class="text-xs font-bold text-slate-900 leading-tight mb-0.5">${act.title}</h4>
                    <div class="flex items-center space-x-2 text-[11px] text-slate-500">
                      <span>${act.category}</span>
                      <span>•</span>
                      <span>${act.date}</span>
                    </div>
                  </div>
                </div>
                <div class="text-right flex-shrink-0">
                  <span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <i data-lucide="check" class="w-2.5 h-2.5 mr-1"></i>
                    ${act.status}
                  </span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Key Strategic Principle Banner -->
        <div class="bg-slate-100 rounded-xl p-3 border border-slate-200 text-slate-700 flex items-start space-x-2.5 text-xs">
          <i data-lucide="info" class="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5"></i>
          <div>
            <span class="font-bold text-slate-900">Why ChipPath matters:</span>
            <p class="text-[11px] text-slate-600 mt-0.5">
              Every activity contributes directly to your persistent <strong>Talent Passport</strong>, allowing industry potential discovered in high school to be preserved for Stage 2 development.
            </p>
          </div>
        </div>
      `;

      container.innerHTML = html;
    },

    /* ==========================================================
       SCREEN 2: EXPLORE (Discover the Industry)
    ========================================================== */
    renderExplore() {
      const container = document.getElementById("explore-dynamic-content");
      if (!container) return;

      const activities = ChipPathData.exploreActivities;

      let html = `
        <div class="mb-4">
          <h2 class="text-base font-bold text-slate-900">Industry Exploration Hub</h2>
          <p class="text-xs text-slate-500">Discover virtual cleanrooms, corporate facilities, and engineer interactions.</p>
        </div>

        <!-- Filter Tags -->
        <div class="flex space-x-1.5 overflow-x-auto pb-2 mb-4 no-scrollbar text-xs">
          <button data-filter="all" class="explore-filter-btn px-3 py-1.5 rounded-full font-medium bg-blue-600 text-white shadow-sm flex-shrink-0">All Hubs</button>
          <button data-filter="tour" class="explore-filter-btn px-3 py-1.5 rounded-full font-medium bg-slate-100 text-slate-600 hover:bg-slate-200 flex-shrink-0">Virtual Tours</button>
          <button data-filter="visit" class="explore-filter-btn px-3 py-1.5 rounded-full font-medium bg-slate-100 text-slate-600 hover:bg-slate-200 flex-shrink-0">Company Visits</button>
          <button data-filter="interaction" class="explore-filter-btn px-3 py-1.5 rounded-full font-medium bg-slate-100 text-slate-600 hover:bg-slate-200 flex-shrink-0">Engineer AMAs</button>
          <button data-filter="career" class="explore-filter-btn px-3 py-1.5 rounded-full font-medium bg-slate-100 text-slate-600 hover:bg-slate-200 flex-shrink-0">Career Pathways</button>
        </div>

        <!-- Featured Activity: Virtual Semiconductor Factory Tour -->
        <div class="bg-gradient-to-br from-slate-900 via-navy-900 to-slate-950 text-white rounded-2xl p-5 mb-5 shadow-lg border border-slate-800 relative overflow-hidden">
          <div class="flex justify-between items-start mb-2">
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30">
              FEATURED IMMERSION
            </span>
            <span class="text-xs text-slate-300 flex items-center font-medium">
              <i data-lucide="clock" class="w-3.5 h-3.5 mr-1 text-slate-400"></i> 45 Mins
            </span>
          </div>

          <h3 class="text-base font-bold text-white mb-1.5">Virtual Semiconductor Factory Tour</h3>
          <p class="text-xs text-slate-300 mb-3.5 leading-relaxed">
            Explore how semiconductor components move from raw silicon ingot to sub-3nm nano-scale microprocessors inside ISO Class 1 cleanrooms.
          </p>

          <div class="flex flex-wrap gap-1.5 mb-4">
            <span class="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300 border border-slate-700 font-mono">Cleanroom ISO 1</span>
            <span class="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300 border border-slate-700 font-mono">EUV Lithography 13.5nm</span>
            <span class="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300 border border-slate-700 font-mono">300mm Wafer Flow</span>
          </div>

          <div class="grid grid-cols-2 gap-2">
            <button onclick="App.openVirtualTourModal()" class="py-2.5 px-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl flex items-center justify-center space-x-1.5 shadow transition">
              <i data-lucide="play-circle" class="w-4 h-4"></i>
              <span>Start Cleanroom Tour</span>
            </button>
            <button onclick="App.addToJourney('Virtual Factory Tour')" class="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 flex items-center justify-center space-x-1.5 transition">
              <i data-lucide="bookmark-plus" class="w-4 h-4"></i>
              <span>Add to Journey</span>
            </button>
          </div>
        </div>

        <!-- Activity Cards List -->
        <div id="explore-cards-list" class="space-y-3">
          ${activities.filter(a => !a.featured).map((act) => `
            <div class="bg-white rounded-xl p-4 border border-slate-200/80 shadow-sm hover:border-blue-300 transition" data-category="${act.type}">
              <div class="flex justify-between items-start mb-1.5">
                <span class="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                  ${act.tag}
                </span>
                <span class="text-[11px] text-slate-500 flex items-center">
                  <i data-lucide="clock" class="w-3 h-3 mr-1"></i> ${act.duration}
                </span>
              </div>

              <h4 class="text-xs font-bold text-slate-900 mb-1">${act.title}</h4>
              <p class="text-[11px] text-slate-500 mb-2 font-medium">Organized by: <span class="text-slate-700 font-semibold">${act.organizer}</span></p>
              <p class="text-xs text-slate-600 mb-3 leading-relaxed">${act.description}</p>

              <div class="flex flex-wrap gap-1 mb-3">
                ${act.skills.map(s => `
                  <span class="px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded text-[10px] font-medium border border-blue-100">${s}</span>
                `).join('')}
              </div>

              <div class="flex justify-between items-center pt-2 border-t border-slate-100">
                <span class="text-[11px] text-emerald-600 font-semibold flex items-center">
                  <i data-lucide="shield-check" class="w-3.5 h-3.5 mr-1"></i> Verified Evidence
                </span>
                <button onclick="App.viewActivityDetails('${act.id}')" class="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center space-x-1">
                  <span>View Activity</span>
                  <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      `;

      container.innerHTML = html;
    },

    filterExploreActivities(category) {
      const cards = document.querySelectorAll("#explore-cards-list > div");
      cards.forEach((card) => {
        if (category === "all" || card.getAttribute("data-category") === category) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    },

    /* ==========================================================
       SCREEN 3: STEM CHALLENGES
    ========================================================== */
    renderChallenges() {
      const container = document.getElementById("challenges-dynamic-content");
      if (!container) return;

      const challenges = ChipPathData.stemChallenges;

      let html = `
        <div class="mb-4">
          <h2 class="text-base font-bold text-slate-900">STEM Challenges: Prove Your Potential</h2>
          <p class="text-xs text-slate-500">Rigorous engineering scenarios to demonstrate technical aptitude.</p>
        </div>

        <!-- Featured Interactive Challenge: Smart Factory Challenge -->
        <div class="bg-white rounded-2xl p-4 mb-5 border-2 border-blue-600 shadow-md">
          <div class="flex justify-between items-center mb-2">
            <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 uppercase tracking-wider">
              FLAGSHIP STEM CHALLENGE (LIVE SIMULATOR)
            </span>
            <span class="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              Difficulty: Intermediate
            </span>
          </div>

          <h3 class="text-sm font-bold text-slate-900 mb-1">Smart Factory Process Challenge</h3>
          <p class="text-xs text-slate-600 mb-3">
            Design a simple solution to improve efficiency, throughput, and minimize defect rate in a semiconductor manufacturing process.
          </p>

          <!-- Interactive Challenge Simulator Embed -->
          <div class="bg-slate-900 text-white rounded-xl p-3 mb-4 border border-slate-800">
            <div class="flex justify-between items-center mb-2">
              <span class="text-xs font-mono font-bold text-blue-400 flex items-center">
                <i data-lucide="cpu" class="w-3.5 h-3.5 mr-1.5"></i>
                Fab Process Control Simulator
              </span>
              <span class="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">Live Physics Engine</span>
            </div>

            <div class="space-y-3 my-2 text-xs">
              <!-- Slider 1: Litho Exposure Time -->
              <div>
                <div class="flex justify-between text-[11px] text-slate-300 mb-1">
                  <span>Lithography Exposure Time (Stepper Cycle)</span>
                  <span class="font-mono text-blue-400 font-bold" id="val-exposure">45 ms (Ideal 45ms)</span>
                </div>
                <input type="range" id="sim-exposure" min="30" max="60" value="45" class="w-full">
              </div>

              <!-- Selector: CVD Deposition Mode -->
              <div>
                <div class="flex justify-between text-[11px] text-slate-300 mb-1">
                  <span>CVD Thin-Film Deposition Mode</span>
                  <span class="font-mono text-cyan-400 font-bold" id="val-cvd">Balanced Mode</span>
                </div>
                <div class="grid grid-cols-3 gap-1.5 text-[10px]">
                  <button type="button" onclick="App.setSimCVD('precision')" id="btn-cvd-precision" class="py-1 px-2 rounded bg-slate-800 text-slate-300 border border-slate-700 font-medium">Precision</button>
                  <button type="button" onclick="App.setSimCVD('balanced')" id="btn-cvd-balanced" class="py-1 px-2 rounded bg-blue-600 text-white border border-blue-500 font-semibold">Balanced</button>
                  <button type="button" onclick="App.setSimCVD('high-speed')" id="btn-cvd-highspeed" class="py-1 px-2 rounded bg-slate-800 text-slate-300 border border-slate-700 font-medium">High Speed</button>
                </div>
              </div>

              <!-- Slider 2: Metrology Sampling Rate -->
              <div>
                <div class="flex justify-between text-[11px] text-slate-300 mb-1">
                  <span>In-line Optical Metrology Sampling Rate</span>
                  <span class="font-mono text-emerald-400 font-bold" id="val-metrology">20% (Standard Benchmark)</span>
                </div>
                <input type="range" id="sim-metrology" min="5" max="50" value="20" class="w-full">
              </div>
            </div>

            <!-- Live Output Dashboard -->
            <div class="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-800 text-center font-mono">
              <div class="bg-slate-800/80 p-2 rounded-lg">
                <span class="text-[9px] text-slate-400 uppercase block">Yield Rate</span>
                <span class="text-xs font-bold text-emerald-400" id="sim-out-yield">92.4%</span>
              </div>
              <div class="bg-slate-800/80 p-2 rounded-lg">
                <span class="text-[9px] text-slate-400 uppercase block">Throughput</span>
                <span class="text-xs font-bold text-blue-400" id="sim-out-throughput">68 wfr/h</span>
              </div>
              <div class="bg-slate-800/80 p-2 rounded-lg">
                <span class="text-[9px] text-slate-400 uppercase block">Aptitude</span>
                <span class="text-xs font-bold text-amber-400" id="sim-out-aptitude">87 / 100</span>
              </div>
            </div>
          </div>

          <!-- Assessment Criteria Breakdown -->
          <div class="mb-4">
            <h4 class="text-xs font-bold text-slate-800 mb-2">Assessment Rubric & Weightage:</h4>
            <div class="grid grid-cols-2 gap-2 text-[11px]">
              <div class="p-2 bg-slate-50 rounded-lg border border-slate-200">
                <div class="font-semibold text-slate-800">Technical Aptitude (40%)</div>
                <div class="text-slate-500 text-[10px]">Lithography timing & CVD physics</div>
              </div>
              <div class="p-2 bg-slate-50 rounded-lg border border-slate-200">
                <div class="font-semibold text-slate-800">Systems Thinking (30%)</div>
                <div class="text-slate-500 text-[10px]">Bottleneck & buffer balancing</div>
              </div>
              <div class="p-2 bg-slate-50 rounded-lg border border-slate-200">
                <div class="font-semibold text-slate-800">Problem Solving (20%)</div>
                <div class="text-slate-500 text-[10px]">Defect density mitigation</div>
              </div>
              <div class="p-2 bg-slate-50 rounded-lg border border-slate-200">
                <div class="font-semibold text-slate-800">Feasibility & Innovation (10%)</div>
                <div class="text-slate-500 text-[10px]">Real-world fab manufacturing</div>
              </div>
            </div>
          </div>

          <button onclick="App.submitChallenge()" class="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl flex items-center justify-center space-x-1.5 shadow-md transition">
            <i data-lucide="award" class="w-4 h-4"></i>
            <span>Submit Solution & Verify Potential</span>
          </button>
        </div>

        <!-- Other Available Challenges -->
        <h3 class="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">Other Challenge Portfolios</h3>
        <div class="space-y-3">
          ${challenges.filter(c => c.id !== 'challenge-smart-factory').map((c) => `
            <div class="bg-white rounded-xl p-4 border border-slate-200/80 shadow-sm">
              <div class="flex justify-between items-start mb-1.5">
                <span class="px-2 py-0.5 rounded text-[10px] font-semibold ${
                  c.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-700'
                }">
                  ${c.status === 'Completed' ? `✓ Completed (${c.score}/100)` : 'Available'}
                </span>
                <span class="text-[11px] font-semibold text-slate-500">${c.difficulty}</span>
              </div>
              <h4 class="text-xs font-bold text-slate-900 mb-1">${c.title}</h4>
              <p class="text-[11px] text-slate-600 mb-3">${c.description}</p>
              
              <div class="flex justify-between items-center pt-2 border-t border-slate-100">
                <span class="text-[11px] text-slate-500">Domain: <strong class="text-slate-700">${c.domain}</strong></span>
                <button onclick="${c.status === 'Completed' ? 'App.switchScreen(\'challenge-result\')' : 'alert(\'Module loaded! Launching simulation...\')'}" class="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold">
                  ${c.status === 'Completed' ? 'View Evidence' : 'Start Challenge'}
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      `;

      container.innerHTML = html;
    },

    initSimulator() {
      const expSlider = document.getElementById("sim-exposure");
      const metSlider = document.getElementById("sim-metrology");

      if (expSlider) {
        expSlider.addEventListener("input", (e) => {
          const val = parseInt(e.target.value);
          SmartFactorySimulator.updateParam("exposureTime", val);
          const lbl = document.getElementById("val-exposure");
          if (lbl) lbl.textContent = `${val} ms ${val === 45 ? '(Ideal 45ms)' : ''}`;
          this.updateSimulatorOutputs();
        });
      }

      if (metSlider) {
        metSlider.addEventListener("input", (e) => {
          const val = parseInt(e.target.value);
          SmartFactorySimulator.updateParam("metrologySampling", val);
          const lbl = document.getElementById("val-metrology");
          if (lbl) lbl.textContent = `${val}% ${val >= 18 && val <= 25 ? '(Standard Benchmark)' : ''}`;
          this.updateSimulatorOutputs();
        });
      }
    },

    setSimCVD(mode) {
      SmartFactorySimulator.updateParam("cvdMode", mode);
      const modes = ["precision", "balanced", "high-speed"];
      modes.forEach((m) => {
        const btn = document.getElementById(`btn-cvd-${m === 'high-speed' ? 'highspeed' : m}`);
        if (btn) {
          if (m === mode) {
            btn.className = "py-1 px-2 rounded bg-blue-600 text-white border border-blue-500 font-semibold";
          } else {
            btn.className = "py-1 px-2 rounded bg-slate-800 text-slate-300 border border-slate-700 font-medium";
          }
        }
      });
      const lbl = document.getElementById("val-cvd");
      if (lbl) {
        const names = { precision: "Precision Mode", balanced: "Balanced Mode", "high-speed": "High Speed Mode" };
        lbl.textContent = names[mode] || mode;
      }
      this.updateSimulatorOutputs();
    },

    updateSimulatorOutputs() {
      const metrics = SmartFactorySimulator.calculateMetrics();
      const yOut = document.getElementById("sim-out-yield");
      const tOut = document.getElementById("sim-out-throughput");
      const aOut = document.getElementById("sim-out-aptitude");

      if (yOut) yOut.textContent = `${metrics.yieldRate}%`;
      if (tOut) tOut.textContent = `${metrics.throughput} wfr/h`;
      if (aOut) aOut.textContent = `${metrics.scores.overall} / 100`;
    },

    submitChallenge() {
      const metrics = SmartFactorySimulator.calculateMetrics();
      ChipPathData.student.aptitudeScore = metrics.scores.overall;
      ChipPathData.student.interestPercentile = metrics.scores.percentile;
      
      const ch = ChipPathData.stemChallenges.find(c => c.id === "challenge-smart-factory");
      if (ch) {
        ch.score = metrics.scores.overall;
        ch.criteria[0].score = metrics.scores.technicalAptitude;
        ch.criteria[1].score = metrics.scores.systemsThinking;
        ch.criteria[2].score = metrics.scores.problemSolving;
        ch.criteria[3].score = metrics.scores.innovationScore;
      }

      this.renderChallengeResult();
      this.renderPassport();
      this.renderHome();

      alert(`🎉 Congratulations ${ChipPathData.student.name}!\n\nSmart Factory Challenge Score: ${metrics.scores.overall}/100 (${metrics.scores.distinctionBadge}).\nTechnical evidence has been verified and minted into your permanent Talent Passport!`);

      this.switchScreen("challenge-result");
    },

    /* ==========================================================
       SCREEN 4: CHALLENGE RESULT (Verified Evidence)
    ========================================================== */
    renderChallengeResult() {
      const container = document.getElementById("challenge-result-dynamic-content");
      if (!container) return;

      const challenge = ChipPathData.stemChallenges.find(c => c.id === "challenge-smart-factory");
      const student = ChipPathData.student;

      let html = `
        <div class="mb-4">
          <span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <i data-lucide="check-circle" class="w-3 h-3 mr-1"></i> VERIFIED STEM EVIDENCE
          </span>
          <h2 class="text-base font-bold text-slate-900 mt-1">${challenge.title}</h2>
          <p class="text-xs text-slate-500">Comprehensive evidence recording potential for Stage 2 development.</p>
        </div>

        <!-- Overall Score Card -->
        <div class="bg-gradient-to-br from-slate-900 via-navy-900 to-slate-950 text-white rounded-2xl p-5 mb-5 shadow-lg border border-slate-800 relative">
          <div class="flex items-center justify-between mb-4">
            <div>
              <span class="text-xs text-slate-400 font-medium">Overall Result</span>
              <h3 class="text-2xl font-black text-white">${challenge.score} <span class="text-sm font-normal text-slate-400">/ 100</span></h3>
            </div>
            <div class="text-right">
              <span class="inline-block px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-xs font-bold">
                Distinction Level
              </span>
              <span class="block text-[11px] text-cyan-300 mt-1 font-mono">${student.interestPercentile} Cohort Ranking</span>
            </div>
          </div>

          <!-- 3 Pillar Metrics Required in Specification -->
          <div class="grid grid-cols-3 gap-2 text-center pt-3 border-t border-slate-800 font-mono">
            <div class="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700">
              <span class="text-[9px] text-slate-400 uppercase block">Tech Aptitude</span>
              <span class="text-sm font-bold text-blue-400">${challenge.criteria[0].score || 92} / 100</span>
            </div>
            <div class="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700">
              <span class="text-[9px] text-slate-400 uppercase block">Engagement</span>
              <span class="text-sm font-bold text-emerald-400">${student.engagementScore} / 100</span>
            </div>
            <div class="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700">
              <span class="text-[9px] text-slate-400 uppercase block">Demonstrated Int.</span>
              <span class="text-sm font-bold text-cyan-400">${student.interestPercentile}</span>
            </div>
          </div>
        </div>

        <!-- Detailed Rubric Competencies -->
        <div class="bg-white rounded-2xl p-4 mb-5 border border-slate-200/80 shadow-sm">
          <h3 class="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Rubric Competency Breakdown</h3>
          
          <div class="space-y-3">
            ${challenge.criteria.map(c => `
              <div>
                <div class="flex justify-between items-center text-xs mb-1">
                  <span class="font-semibold text-slate-800">${c.label} <span class="text-slate-400 font-normal">(${c.weight})</span></span>
                  <span class="font-mono font-bold text-blue-600">${c.score || 88} / 100</span>
                </div>
                <div class="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div class="bg-blue-600 h-2 rounded-full" style="width: ${c.score || 88}%"></div>
                </div>
                <p class="text-[11px] text-slate-500 mt-1">${c.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Earned Digital Credential Card -->
        <div class="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-4 mb-5 border border-amber-200">
          <div class="flex items-start space-x-3">
            <div class="w-11 h-11 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-md flex-shrink-0">
              <i data-lucide="shield-check" class="w-6 h-6"></i>
            </div>
            <div class="flex-1">
              <span class="text-[10px] font-bold text-amber-800 uppercase tracking-wider">Earned Digital Credential</span>
              <h4 class="text-xs font-bold text-slate-900">${challenge.earnedBadge ? challenge.earnedBadge.title : 'Smart Process Optimizer'}</h4>
              <p class="text-[11px] text-slate-600 mt-0.5">Verification Code: <span class="font-mono font-bold text-slate-800">${challenge.earnedBadge ? challenge.earnedBadge.code : 'CP-BADGE-YLD87'}</span></p>
              <span class="inline-flex items-center text-[10px] text-emerald-700 font-semibold mt-1">
                <i data-lucide="check-check" class="w-3 h-3 mr-1"></i> Added to Persistent Talent Passport
              </span>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="space-y-2">
          <button onclick="App.switchScreen('passport')" class="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center justify-center space-x-2 shadow-md transition">
            <i data-lucide="credit-card" class="w-4 h-4 text-blue-400"></i>
            <span>View in Talent Passport</span>
          </button>
          <button onclick="App.openQrVerificationModal()" class="w-full py-2.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl border border-slate-300 flex items-center justify-center space-x-1.5 transition">
            <i data-lucide="qr-code" class="w-3.5 h-3.5 text-slate-500"></i>
            <span>Inspect Cryptographic Verification Hash</span>
          </button>
        </div>
      `;

      container.innerHTML = html;
    },

    /* ==========================================================
       SCREEN 5: TALENT PASSPORT (FLAGSHIP SCREEN)
    ========================================================== */
    renderPassport() {
      const container = document.getElementById("passport-dynamic-content");
      if (!container) return;

      const student = ChipPathData.student;
      const pData = ChipPathData.passportSections;

      let html = `
        <!-- Verified Header Card -->
        <div class="bg-gradient-to-br from-slate-950 via-navy-950 to-slate-900 text-white rounded-3xl p-5 mb-5 shadow-xl border border-blue-900/50 relative overflow-hidden">
          <div class="absolute inset-0 opacity-10 pointer-events-none bg-semiconductor-grid"></div>

          <div class="relative z-10">
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center space-x-2">
                <div class="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs">CP</div>
                <span class="text-xs font-bold tracking-widest text-slate-300 uppercase">Talent Passport</span>
              </div>
              <span class="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
                <i data-lucide="check-check" class="w-3.5 h-3.5 mr-1 text-emerald-400"></i>
                ✓ Verified by ChipPath
              </span>
            </div>

            <div class="mb-4">
              <div class="flex justify-between items-start">
                <div>
                  <h2 class="text-lg font-black text-white tracking-tight">${student.name}</h2>
                  <p class="text-xs text-cyan-300 font-medium">${student.grade}</p>
                </div>
                <button onclick="App.openCustomizeStudentModal()" class="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-300 rounded-lg border border-slate-700">
                  ✏️ Edit
                </button>
              </div>
              <p class="text-[11px] text-slate-400 mt-1 font-mono">Target: ${student.targetDiscipline}</p>
            </div>

            <!-- Verification Metadata Strip -->
            <div class="bg-slate-900/90 rounded-2xl p-3 border border-slate-800 grid grid-cols-2 gap-2 text-[11px] font-mono">
              <div>
                <span class="text-[10px] text-slate-500 block uppercase">Passport ID</span>
                <span class="font-bold text-cyan-300">${student.studentId}</span>
              </div>
              <div>
                <span class="text-[10px] text-slate-500 block uppercase">Verification Date</span>
                <span class="text-slate-300">${student.verificationDate}</span>
              </div>
            </div>

            <!-- Stage 2 Handover Readiness Alert -->
            <div class="mt-3 p-2.5 rounded-xl bg-blue-500/10 border border-blue-400/30 text-[11px] text-blue-200 flex items-center justify-between">
              <span class="flex items-center">
                <i data-lucide="forward" class="w-3.5 h-3.5 mr-1.5 text-blue-400"></i>
                Stage 2 Pipeline Ready:
              </span>
              <span class="font-bold text-white">Consortium Fast-Track</span>
            </div>
          </div>
        </div>

        <!-- Passport Section Tabs / Accordions -->
        <div class="space-y-4">
          
          <!-- SECTION 1: INDUSTRY EXPOSURE -->
          <div class="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm">
            <div class="flex items-center justify-between mb-3">
              <h3 class="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center">
                <i data-lucide="building" class="w-4 h-4 text-blue-600 mr-1.5"></i>
                1. Industry Exposure Records
              </h3>
              <span class="text-[10px] font-mono bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-bold">9.5 Verified Hours</span>
            </div>

            <div class="space-y-2.5">
              ${pData.industryExposure.map(item => `
                <div class="p-3 bg-slate-50 rounded-xl border border-slate-200/70 hover:border-slate-300 transition">
                  <div class="flex justify-between items-start mb-1">
                    <h4 class="text-xs font-bold text-slate-900">${item.title}</h4>
                    <span class="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 flex items-center">
                      <i data-lucide="check" class="w-2.5 h-2.5 mr-0.5"></i> Verified
                    </span>
                  </div>
                  <div class="flex items-center space-x-2 text-[11px] text-slate-500 mb-1">
                    <span class="font-semibold text-slate-700">${item.partner}</span>
                    <span>•</span>
                    <span>${item.date}</span>
                  </div>
                  <p class="text-[11px] text-slate-600 leading-relaxed">${item.details}</p>
                  <div class="mt-2 text-[10px] font-mono text-slate-400">Ref: ${item.verificationCode} • ${item.hours}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- SECTION 2: STEM CHALLENGE RESULTS -->
          <div class="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm">
            <div class="flex items-center justify-between mb-3">
              <h3 class="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center">
                <i data-lucide="target" class="w-4 h-4 text-emerald-600 mr-1.5"></i>
                2. STEM Challenge Results
              </h3>
              <span class="text-[10px] font-mono bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-bold">2 Credentials</span>
            </div>

            <div class="space-y-2.5">
              ${pData.stemResults.map(res => `
                <div class="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
                  <div class="flex justify-between items-start mb-1">
                    <h4 class="text-xs font-bold text-slate-900">${res.title}</h4>
                    <span class="font-mono text-xs font-black text-blue-600 bg-white px-2 py-0.5 rounded border border-blue-200 shadow-sm">${res.score}</span>
                  </div>
                  <div class="text-[11px] text-emerald-700 font-semibold mb-1">${res.rating}</div>
                  <p class="text-[11px] text-slate-600 leading-relaxed">${res.summary}</p>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- SECTION 3: DIGITAL CREDENTIALS & COMPETENCY MATRIX -->
          <div class="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm">
            <div class="flex items-center justify-between mb-3">
              <h3 class="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center">
                <i data-lucide="award" class="w-4 h-4 text-amber-600 mr-1.5"></i>
                3. Digital Credentials & Skills
              </h3>
              <span class="text-[10px] font-mono bg-amber-50 text-amber-800 px-2 py-0.5 rounded font-bold">3 Badges</span>
            </div>

            <!-- Credentials Badges -->
            <div class="grid grid-cols-1 gap-2 mb-3">
              ${pData.credentials.map(c => `
                <div class="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div class="flex items-center space-x-2.5">
                    <div class="w-8 h-8 rounded-lg bg-navy-900 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                      <i data-lucide="cpu" class="w-4 h-4 text-cyan-400"></i>
                    </div>
                    <div>
                      <h4 class="text-xs font-bold text-slate-900 leading-tight">${c.title}</h4>
                      <span class="text-[10px] text-slate-500 font-mono">${c.badgeId} • ${c.issuer}</span>
                    </div>
                  </div>
                  <span class="text-[10px] text-emerald-700 font-semibold">✓ Verified</span>
                </div>
              `).join('')}
            </div>

            <!-- Competency Matrix -->
            <h4 class="text-[11px] font-bold text-slate-700 uppercase mb-2 mt-3">Standardized Semiconductor Competency Matrix</h4>
            <div class="space-y-2">
              ${pData.competencies.map(comp => `
                <div>
                  <div class="flex justify-between text-[11px] mb-0.5">
                    <span class="font-medium text-slate-700">${comp.name}</span>
                    <span class="font-mono text-slate-500 font-bold">${comp.level}% (${comp.benchmark})</span>
                  </div>
                  <div class="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div class="bg-gradient-to-r from-blue-600 to-indigo-600 h-1.5 rounded-full" style="width: ${comp.level}%"></div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- SECTION 4: PROGRAMME PARTICIPATION -->
          <div class="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm">
            <h3 class="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center">
              <i data-lucide="calendar" class="w-4 h-4 text-purple-600 mr-1.5"></i>
              4. Programme Participation History
            </h3>
            
            <div class="space-y-2">
              ${pData.programmeMilestones.map((m, idx) => `
                <div class="flex items-center justify-between p-2 rounded-lg ${m.status.includes('Completed') ? 'bg-slate-50' : 'bg-blue-50/50'} border border-slate-100 text-xs">
                  <div class="flex items-center space-x-2">
                    <span class="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      m.status.includes('Completed') ? 'bg-slate-900 text-white' : 'bg-blue-600 text-white'
                    }">${idx + 1}</span>
                    <div>
                      <span class="font-bold text-slate-800">${m.name}</span>
                      <span class="text-[10px] text-slate-500 block">${m.step} • ${m.date}</span>
                    </div>
                  </div>
                  <span class="text-[10px] font-semibold ${m.status.includes('Completed') ? 'text-emerald-700' : 'text-blue-700'}">${m.status}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Export & Public Verification Actions -->
        <div class="mt-5 space-y-2">
          <button onclick="App.exportDossierModal()" class="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl flex items-center justify-center space-x-2 shadow transition">
            <i data-lucide="download" class="w-4 h-4"></i>
            <span>Export Official Talent Dossier (PDF/Print)</span>
          </button>
          <button onclick="App.openQrVerificationModal()" class="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl flex items-center justify-center space-x-2 transition">
            <i data-lucide="qr-code" class="w-4 h-4 text-cyan-400"></i>
            <span>Public Verification Portal & QR Token</span>
          </button>
        </div>
      `;

      container.innerHTML = html;
    },

    /* ==========================================================
       SCREEN 6: OPPORTUNITIES (Early Talent Pool)
    ========================================================== */
    renderOpportunities() {
      const container = document.getElementById("opportunities-dynamic-content");
      if (!container) return;

      const opps = ChipPathData.earlyTalentOpportunities;

      let html = `
        <div class="mb-4">
          <div class="flex items-center justify-between">
            <h2 class="text-base font-bold text-slate-900">Early-Talent Pool: Stay Connected</h2>
            <span class="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">Post-High School</span>
          </div>
          <p class="text-xs text-slate-500">Light-touch re-engagement bridging high school potential to Stage 2 development.</p>
        </div>

        <!-- Strategic Stage 2 Handover Concept Card -->
        <div class="bg-gradient-to-r from-slate-900 via-navy-900 to-slate-950 text-white rounded-2xl p-4 mb-5 shadow-lg border border-slate-800">
          <div class="flex items-center space-x-2 mb-2">
            <i data-lucide="network" class="w-4 h-4 text-cyan-400"></i>
            <h3 class="text-xs font-bold text-white uppercase tracking-wider">The "Light-Touch Re-Engagement" Model</h3>
          </div>
          <p class="text-xs text-slate-300 leading-relaxed mb-3">
            ChipPath does not replace Stage 2. It creates the verified talent record that allows potential discovered in high school to be preserved, preventing talent leakage during university entry.
          </p>
          <div class="flex items-center justify-between text-[11px] text-cyan-300 bg-slate-800/80 p-2 rounded-xl border border-slate-700">
            <span>Verified Passport Handover:</span>
            <span class="font-bold text-white">Active Pipeline Connection</span>
          </div>
        </div>

        <!-- Opportunities List -->
        <div class="space-y-3">
          ${opps.map((opp) => `
            <div class="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm hover:border-blue-300 transition">
              <div class="flex justify-between items-start mb-1.5">
                <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                  ${opp.type}
                </span>
                <span class="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  ${opp.matchScore}
                </span>
              </div>

              <h4 class="text-xs font-bold text-slate-900 mb-1 leading-tight">${opp.title}</h4>
              <p class="text-[11px] text-slate-500 font-medium mb-2">Partner: <span class="text-slate-800 font-semibold">${opp.partner}</span></p>
              
              <p class="text-xs text-slate-600 mb-3 leading-relaxed">${opp.description}</p>

              <div class="flex items-center space-x-3 text-[11px] text-slate-500 mb-3">
                <span class="flex items-center"><i data-lucide="calendar" class="w-3 h-3 mr-1 text-slate-400"></i> ${opp.timing}</span>
                <span>•</span>
                <span class="flex items-center"><i data-lucide="map-pin" class="w-3 h-3 mr-1 text-slate-400"></i> ${opp.location}</span>
              </div>

              <div class="flex flex-wrap gap-1 mb-3">
                ${opp.tags.map(t => `
                  <span class="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-medium">${t}</span>
                `).join('')}
              </div>

              <button onclick="App.expressOpportunityInterest('${opp.id}')" class="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition">
                <span>${opp.actionText}</span>
                <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
              </button>
            </div>
          `).join('')}
        </div>
      `;

      container.innerHTML = html;
    },

    /* ==========================================================
       CLASSROOM AUDIENCE FEEDBACK SECTION
    ========================================================== */
    renderFeedbackSection() {
      const container = document.getElementById("class-feedbacks-container");
      if (!container) return;

      const list = ChipPathData.feedbackList;
      container.innerHTML = list.map(item => `
        <div class="p-3 bg-slate-800/80 rounded-xl border border-slate-700 text-xs text-slate-200">
          <div class="flex justify-between items-center mb-1">
            <span class="font-bold text-cyan-300">${item.name}</span>
            <div class="flex text-amber-400 text-xs">
              ${'★'.repeat(item.rating)}${'☆'.repeat(5 - item.rating)}
            </div>
          </div>
          <span class="inline-block px-1.5 py-0.5 bg-blue-900/50 text-blue-200 rounded text-[10px] mb-1.5 font-medium border border-blue-700/50">
            Favorite: ${item.favorite}
          </span>
          <p class="text-slate-300 text-[11px] leading-relaxed">"${item.comment}"</p>
          <span class="text-[10px] text-slate-500 mt-1 block">${item.time}</span>
        </div>
      `).join('');
    },

    openFeedbackModal() {
      const modal = document.getElementById("modal-feedback-form");
      if (modal) modal.classList.remove("hidden");
    },

    closeFeedbackModal() {
      const modal = document.getElementById("modal-feedback-form");
      if (modal) modal.classList.add("hidden");
    },

    submitFeedbackForm(e) {
      if (e) e.preventDefault();
      const nameInput = document.getElementById("feedback-author-name");
      const ratingInput = document.getElementById("feedback-rating");
      const favoriteInput = document.getElementById("feedback-favorite-feature");
      const commentInput = document.getElementById("feedback-comment");

      const authorName = nameInput && nameInput.value.trim() ? nameInput.value.trim() : "Peer Reviewer (Anonymous)";
      const rating = ratingInput ? parseInt(ratingInput.value) : 5;
      const favorite = favoriteInput ? favoriteInput.value : "Talent Passport";
      const comment = commentInput && commentInput.value.trim() ? commentInput.value.trim() : "Very professional and polished prototype!";

      const newFeedback = {
        name: authorName,
        rating,
        favorite,
        comment,
        time: "Just now"
      };

      ChipPathData.feedbackList.unshift(newFeedback);
      this.saveFeedbacks();
      this.renderFeedbackSection();
      this.closeFeedbackModal();
      alert("✓ Thank you for submitting your presentation feedback!");
    },

    /* ==========================================================
       CUSTOM STUDENT MODAL (FOR CLASSMATES TESTING)
    ========================================================== */
    openCustomizeStudentModal() {
      const modal = document.getElementById("modal-customize-student");
      if (modal) {
        const currentName = ChipPathData.student.name === "Anonymous" ? "" : ChipPathData.student.name;
        const currentGrade = ChipPathData.student.grade === "High School Student" ? "" : ChipPathData.student.grade;
        document.getElementById("cust-student-name").value = currentName;
        document.getElementById("cust-student-grade").value = currentGrade;
        modal.classList.remove("hidden");
      }
    },

    closeCustomizeStudentModal() {
      const modal = document.getElementById("modal-customize-student");
      if (modal) modal.classList.add("hidden");
    },

    saveCustomStudent(e) {
      if (e) e.preventDefault();
      const nameInput = document.getElementById("cust-student-name");
      const gradeInput = document.getElementById("cust-student-grade");
      const trackInput = document.getElementById("cust-student-track");

      const rawName = nameInput ? nameInput.value.trim() : "";
      const rawGrade = gradeInput ? gradeInput.value.trim() : "";
      const track = trackInput ? trackInput.value : "Semiconductor & Microelectronics Engineering";

      ChipPathData.student.name = rawName ? rawName : "Anonymous";
      ChipPathData.student.grade = rawGrade ? rawGrade : "High School Student";
      ChipPathData.student.targetDiscipline = track;
      ChipPathData.student.studentId = `CP-2026-${Math.floor(10000 + Math.random() * 90000)}`;

      localStorage.setItem("chippath_student", JSON.stringify(ChipPathData.student));

      this.renderAll();
      this.closeCustomizeStudentModal();
      alert(`✓ Profile updated successfully!\nName: ${ChipPathData.student.name}\nID: ${ChipPathData.student.studentId}`);
    },

    /* ==========================================================
       MODALS & INTERACTIVE OVERLAYS
    ========================================================== */
    openVirtualTourModal() {
      this.tourStep = 0;
      this.updateTourModalContent();
      const modal = document.getElementById("modal-virtual-tour");
      if (modal) modal.classList.remove("hidden");
    },

    closeVirtualTourModal() {
      const modal = document.getElementById("modal-virtual-tour");
      if (modal) modal.classList.add("hidden");
    },

    nextTourStep() {
      if (this.tourStep < this.tourStages.length - 1) {
        this.tourStep++;
        this.updateTourModalContent();
      } else {
        this.completeTour();
      }
    },

    prevTourStep() {
      if (this.tourStep > 0) {
        this.tourStep--;
        this.updateTourModalContent();
      }
    },

    updateTourModalContent() {
      const stage = this.tourStages[this.tourStep];
      const stepTitle = document.getElementById("tour-step-title");
      const stepIso = document.getElementById("tour-step-iso");
      const stepDesc = document.getElementById("tour-step-desc");
      const stepFocus = document.getElementById("tour-step-focus");
      const stepMetric = document.getElementById("tour-step-metric");
      const stepCounter = document.getElementById("tour-step-counter");
      const nextBtnText = document.getElementById("tour-next-btn-text");

      if (stepTitle) stepTitle.textContent = stage.title;
      if (stepIso) stepIso.textContent = stage.iso;
      if (stepDesc) stepDesc.textContent = stage.desc;
      if (stepFocus) stepFocus.textContent = stage.focus;
      if (stepMetric) stepMetric.textContent = stage.metric;
      if (stepCounter) stepCounter.textContent = `Stage ${this.tourStep + 1} / ${this.tourStages.length}`;

      if (nextBtnText) {
        nextBtnText.textContent = this.tourStep === this.tourStages.length - 1 ? "Complete Tour & Verify 3.5 Hours" : "Next Stage";
      }

      // Update progress dots
      const dotsContainer = document.getElementById("tour-progress-dots");
      if (dotsContainer) {
        dotsContainer.innerHTML = this.tourStages.map((_, idx) => `
          <div class="w-2 h-2 rounded-full ${idx === this.tourStep ? 'bg-blue-500 w-5' : (idx < this.tourStep ? 'bg-emerald-500' : 'bg-slate-700')} transition-all"></div>
        `).join('');
      }

      lucide.createIcons();
    },

    completeTour() {
      this.closeVirtualTourModal();
      alert(`✓ Virtual Semiconductor Cleanroom Tour completed!\n3.5 verified hours have been recorded and added to the Talent Passport for ${ChipPathData.student.name}.`);
      this.switchScreen("passport");
    },

    addToJourney(itemTitle) {
      alert(`✓ Added "${itemTitle}" to your active learning pathway.`);
    },

    viewActivityDetails(id) {
      const act = ChipPathData.exploreActivities.find(a => a.id === id);
      if (act) {
        alert(`Activity: ${act.title}\nOrganizer: ${act.organizer}\nDuration: ${act.duration}\n\n${act.description}`);
      }
    },

    expressOpportunityInterest(id) {
      const opp = ChipPathData.earlyTalentOpportunities.find(o => o.id === id);
      if (opp) {
        alert(`✓ Successfully registered early interest for: "${opp.title}".\nYour verified Talent Passport for ${ChipPathData.student.name} has been placed in the priority consortium queue.`);
      }
    },

    openQrVerificationModal() {
      const modal = document.getElementById("modal-qr-verification");
      if (modal) modal.classList.remove("hidden");
    },

    closeQrVerificationModal() {
      const modal = document.getElementById("modal-qr-verification");
      if (modal) modal.classList.add("hidden");
    },

    exportDossierModal() {
      window.print();
    }
  };

  // Expose App globally
  window.App = App;
  App.init();
});
