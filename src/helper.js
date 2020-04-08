export default class Helper {
  constructor({ periodType, timeToElapse }, impactFactor) {
    this.periodType = periodType;
    this.timeToElapse = timeToElapse;
    this.impactFactor = impactFactor;
  }

  computeDuration = () => {
    switch (this.periodType) {
      case 'weeks':
        return this.timeToElapse * 7;
      case 'months':
        return this.timeToElapse * 30;
      default:
        return this.timeToElapse;
    }
  };

  powerFactor = () => {
    return Math.round(this.computeDuration() / 3);
  };

  currentlyInfected = () => {
    return this.reportedCases * this.impactFactor;
  };

  infectionByRequestedTime = () => {
    let factor = this.powerFactor();
    return this.currentlyInfected * 2 ** factor;
  };
}
