class HelperEstimator {
  constructor(
    { periodType = 'days', timeToElapse, reportedCases },
    impactFactor
  ) {
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
        break;
      case 'months':
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

// available bed
const availableHospitalBeds = (data, severeCases) => (
  Math.floor(data.totalHospitalBeds * 0.35) - severeCases
);

// impact cases
const impactCases = (data) => {
  const infectionsByRequestedTime = new HelperEstimator(
    data,
    10
  ).infectionByRequestedTime();
  const currentlyInfected = new HelperEstimator(data, 10).currentlyInfected();
  const severeCasesByRequestedTime = Math.floor(
    infectionsByRequestedTime * 0.15
  );

  const hospitalBedsByRequestedTime = availableHospitalBeds(
    data,
    severeCasesByRequestedTime
  );

  return {
    infectionsByRequestedTime,
    currentlyInfected,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime
  };
};

// severe impact cases
const severeImpactCases = (data) => {
  const infectionsByRequestedTime = new HelperEstimator(
    data,
    10
  ).infectionByRequestedTime();
  const currentlyInfected = new HelperEstimator(data, 10).currentlyInfected();
  const severeCasesByRequestedTime = Math.floor(
    infectionsByRequestedTime * 0.15
  );
  const hospitalBedsByRequestedTime = availableHospitalBeds(
    data,
    severeCasesByRequestedTime
  );

  return {
    infectionsByRequestedTime,
    currentlyInfected,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime
  };
};

// covid19 impact estimator
const covid19ImpactEstimator = (data) => ({
  data,
  impact: impactCases(data),
  severeImpact: severeImpactCases(data)
});
export default covid19ImpactEstimator;
