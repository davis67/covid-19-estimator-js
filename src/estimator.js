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
      case weeks:
        period = this.timeToElapse * 7;
        break;
      case months:
        period = this.timeToElapse * 30;
        break;
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
    const factor = this.powerFactor();
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
  impact.currentlyInfected = new HelperEstimator(data, 10).currentlyInfected();
  severeImpact.infectionsByRequestedTime = new HelperEstimator(
    data,
    50
  ).infectionByRequestedTime();
  severeImpact.currentlyInfected = new HelperEstimator(
    data,
    50
  ).currentlyInfected();
  return { data, impact, severeImpact };
};

export default covid19ImpactEstimator;
