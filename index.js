"use strict";

// CONSTANT
const [Lock, Max, Counter, Queue] = [
  Symbol("Lock"),
  Symbol("Max"),
  Symbol("Counter"),
  Symbol("Queue"),
];

class Promisolock {
  constructor(max) {
    this[Max] = max;
    this[Counter] = 0;
    this[Queue] = [];
  }

  async [Lock](callback) {
    try {
      if (this[Counter] >= this[Max]) {
        await new Promise((resolve) => this[Queue].push(resolve));
      }
      this[Counter]++;

      return await callback();
    } catch (error) {
      this[Queue].map((resolve) => resolve());

      throw error;
    } finally {
      this[Counter] > 0 && this[Counter]--;
      const resolve = this[Queue].shift();

      resolve && resolve();
    }
  }

  all(cbs = []) {
    if (!Array.isArray(cbs) || cbs.some((cb) => typeof cb !== "function")) {
      throw new TypeError("Expected an array of functions");
    }

    return Promise.all(cbs.map((cb) => this[Lock](cb)));
  }
}

module.exports = (max = 1) => {
  if (typeof max !== "number") {
    throw new TypeError("max must be a number");
  }

  return new Promisolock(max);
};
