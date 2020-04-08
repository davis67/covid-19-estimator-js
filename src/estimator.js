import HelperEstimator from './helper';
const covid19ImpactEstimator = (data) => {
  let impact = {};
  let severeImpact = {};

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
