const promisolock = require("./index");

// Globals
let count = 0;

// CONSTANTS
const func = async () => {
  const y = count;
  await Promise.resolve(setTimeout(() => void 0, 10));
  count++;

  return y;
};

describe("promisolock function", () => {
  it("Should throw an typeError if max is not a number", () => {
    return expect(() => promisolock("1")).toThrow(TypeError);
  });

  describe("all method", () => {
    beforeEach(() => void (count = 0));

    it("Should init max at 1", () => {
      const array = Array(4).fill(() => func());
      return expect(promisolock().all(array)).resolves.toEqual([0, 1, 2, 3]);
    });

    it("Should throw an error if one of promise is rejected", () => {
      const array = Array(4)
        .fill(() => func())
        .concat([() => Promise.reject(new Error("throw"))])
        .reverse();

      return expect(() => promisolock(3).all(array)).rejects.toThrowError(
        "throw",
      );
    });

    it("Should throw an error if argument is not an array", () => {
      return expect(() => promisolock(4).all("")).toThrow(TypeError);
    });

    it("Should throw an error if array does not contain any functions", () => {
      return expect(() => promisolock(4).all([""])).toThrow(TypeError);
    });

    it("Should handle the promise.all", async () => {
      const array = Array(4).fill(() => func());
      (await promisolock(4).all(array).then(expect)).toEqual([0, 0, 0, 0]);

      count = 0;
      (await promisolock(1).all(array).then(expect)).toEqual([0, 1, 2, 3]);
    });

    it("Should return empty array", () => {
      return expect(promisolock(1).all()).resolves.toEqual([]);
    });
  });
});
