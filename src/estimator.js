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
    return Math.floor(this.computeDuration() / 3);
  }

  currentlyInfected() {
    return this.reportedCases * this.impactFactor;
  }

  infectionByRequestedTime() {
    const factor = this.powerFactor();
    return this.currentlyInfected() * 2 ** factor;
  }
}

// dollars in flight

const dollarsInFlightComputation = (
  noOfInfections,
  avgIncomePopulationInPercentage,
  avgDailyIncomeInDollars,
  period
) => {
  const finalResult = noOfInfections
    * avgIncomePopulationInPercentage
    * avgDailyIncomeInDollars
    * period;

  return Number(finalResult.toFixed(2));
};

// impact cases
const impactCases = (data) => {
  const infectionsByRequestedTime = new HelperEstimator(
    data,
    10
  ).infectionByRequestedTime();
  const currentlyInfected = new HelperEstimator(data, 10).currentlyInfected();
  const severeCasesByRequestedTime = Math.trunc(
    infectionsByRequestedTime * 0.15
  );

  const availBeds = data.totalHospitalBeds * 0.35;
  const hospitalBedsByRequestedTime = Math.trunc(
    availBeds - severeCasesByRequestedTime
  );
  const casesForICUByRequestedTime = infectionsByRequestedTime * 0.05;

  const casesForVentilatorsByRequestedTime = infectionsByRequestedTime * 0.02;

  const period = new HelperEstimator(data, 10).computeDuration();

  const dollarsInFlight = dollarsInFlightComputation(
    infectionsByRequestedTime,
    data.region.avgDailyIncomePopulation,
    data.region.avgDailyIncomeInUSD,
    period
  );
  return {
    infectionsByRequestedTime,
    currentlyInfected,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime,
    casesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime,
    dollarsInFlight
  };
};

// severe impact cases
const severeImpactCases = (data) => {
  const infectionsByRequestedTime = new HelperEstimator(
    data,
    50
  ).infectionByRequestedTime();
  const currentlyInfected = new HelperEstimator(data, 50).currentlyInfected();
  const severeCasesByRequestedTime = Math.trunc(
    infectionsByRequestedTime * 0.15
  );
  const availBeds = data.totalHospitalBeds * 0.35;
  const hospitalBedsByRequestedTime = Math.trunc(
    availBeds - severeCasesByRequestedTime
  );
  const casesForICUByRequestedTime = infectionsByRequestedTime * 0.05;

  const casesForVentilatorsByRequestedTime = infectionsByRequestedTime * 0.02;

  const period = new HelperEstimator(data, 50).computeDuration();

  const dollarsInFlight = dollarsInFlightComputation(
    infectionsByRequestedTime,
    data.region.avgDailyIncomePopulation,
    data.region.avgDailyIncomeInUSD,
    period
  );

  return {
    infectionsByRequestedTime,
    currentlyInfected,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime,
    casesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime,
    dollarsInFlight
  };
};

// covid19 impact estimator
const covid19ImpactEstimator = (data) => ({
  data,
  impact: impactCases(data),
  severeImpact: severeImpactCases(data)
});

export default covid19ImpactEstimator;
