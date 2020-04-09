class HelperEstimator {
  constructor({ periodType, timeToElapse, reportedCases }, impactFactor) {
    this.periodType = periodType;
    this.timeToElapse = timeToElapse;
    this.reportedCases = reportedCases;
    this.impactFactor = impactFactor;
  }

  computeDuration() {
    let period;
    switch (this.periodType) {
      case 'weeks':
        period = this.timeToElapse * 7;
      case 'months':
        period = this.timeToElapse * 30;
      default:
        period = this.timeToElapse;
    }
    return period;
  }

  powerFactor() {
    return Math.round(this.computeDuration() / 3);
  }

  currentlyInfected() {
    return this.reportedCases * this.impactFactor;
  }

  infectionByRequestedTime() {
    let factor = this.powerFactor();
    return this.currentlyInfected() * 2 ** factor;
  }
}

const covid19ImpactEstimator = (data) => {
  const impact = {};
  const severeImpact = {};

  impact.infectionsByRequestedTime = new HelperEstimator(
    data,
    10
  ).infectionByRequestedTime();
  severeImpact.currentlyInfected = new HelperEstimator(
    data,
    50
  ).infectionByRequestedTime();
  return { data, impact, severeImpact };
};

export default covid19ImpactEstimator;
