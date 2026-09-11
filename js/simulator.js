/**
 * ChipPath - Smart Factory Challenge Interactive Simulator & Rubric Engine
 */

const SmartFactorySimulator = {
  state: {
    exposureTime: 45, // ms (ideal 42-48)
    cvdMode: "balanced", // precision, balanced, high-speed
    handlingSpeed: 85, // % speed
    metrologySampling: 20, // % wafers sampled
    airPurityLevel: 98 // %
  },

  calculateMetrics() {
    const s = this.state;
    
    // Lithography penalty (deviation from ideal 45ms)
    const exposureDelta = Math.abs(s.exposureTime - 45);
    const lithoEfficiency = Math.max(0, 100 - exposureDelta * 3.5);

    // CVD mode effects
    let cvdYieldFactor = 1.0;
    let cvdThroughputFactor = 1.0;
    if (s.cvdMode === "precision") {
      cvdYieldFactor = 1.08;
      cvdThroughputFactor = 0.88;
    } else if (s.cvdMode === "high-speed") {
      cvdYieldFactor = 0.82;
      cvdThroughputFactor = 1.25;
    } else {
      cvdYieldFactor = 1.02;
      cvdThroughputFactor = 1.05;
    }

    // Handling & Air Purity
    const handlingDefectRisk = s.handlingSpeed > 90 ? (s.handlingSpeed - 90) * 1.5 : 0;
    const airQualityBonus = (s.airPurityLevel - 90) * 0.5;

    // Metrology benefit vs speed
    const inspectionPenalty = s.metrologySampling * 0.15;
    const defectCatchRate = Math.min(99, 65 + s.metrologySampling * 1.2);

    // Final Yield (%)
    let rawYield = (lithoEfficiency * 0.45 + 50 * cvdYieldFactor - handlingDefectRisk + airQualityBonus);
    const yieldRate = Math.min(98.8, Math.max(55.0, rawYield)).toFixed(1);

    // Throughput (wafers/hr)
    let rawThroughput = (60 * (s.handlingSpeed / 80) * cvdThroughputFactor - inspectionPenalty);
    const throughput = Math.min(85, Math.max(25, Math.round(rawThroughput)));

    // Defect Density (defects / cm²)
    const defectDensity = Math.max(0.012, (0.095 - (yieldRate - 60) * 0.002 + handlingDefectRisk * 0.005)).toFixed(3);

    // Rubric Grading (0-100)
    const technicalAptitude = Math.round(Math.min(98, 70 + (yieldRate - 75) * 0.9 + (throughput > 50 ? 8 : 2)));
    const systemsThinking = Math.round(Math.min(96, 68 + (s.cvdMode === 'balanced' ? 12 : 6) + (s.metrologySampling >= 15 && s.metrologySampling <= 25 ? 14 : 6)));
    const problemSolving = Math.round(Math.min(97, 72 + (defectDensity < 0.035 ? 15 : 5) + (s.airPurityLevel > 95 ? 10 : 3)));
    const innovationScore = Math.round(Math.min(94, 75 + (yieldRate > 90 && throughput > 55 ? 16 : 6)));

    const overallScore = Math.round(
      technicalAptitude * 0.4 +
      systemsThinking * 0.3 +
      problemSolving * 0.2 +
      innovationScore * 0.1
    );

    let distinctionBadge = "Proficient";
    if (overallScore >= 90) distinctionBadge = "High Distinction (Top 2% Cohort)";
    else if (overallScore >= 85) distinctionBadge = "Distinction (Top 6% Cohort)";
    else if (overallScore >= 75) distinctionBadge = "Merit (Top 18% Cohort)";

    return {
      yieldRate: parseFloat(yieldRate),
      throughput,
      defectDensity: parseFloat(defectDensity),
      defectCatchRate: Math.round(defectCatchRate),
      scores: {
        overall: overallScore,
        technicalAptitude,
        systemsThinking,
        problemSolving,
        innovationScore,
        distinctionBadge,
        percentile: overallScore >= 90 ? "Top 2%" : (overallScore >= 85 ? "Top 5%" : "Top 15%")
      }
    };
  },

  updateParam(param, value) {
    if (param in this.state) {
      this.state[param] = value;
    }
  }
};

if (typeof window !== "undefined") {
  window.SmartFactorySimulator = SmartFactorySimulator;
}
