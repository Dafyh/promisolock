module.exports = {
  coverageDirectory: "./coverage/",
  collectCoverage: true,
  collectCoverageFrom: ["<rootDir>/src/*.js", "<rootDir>/index.js"],
  coverageReporters: ["lcov", "html", "text-summary", "clover"],
  testPathIgnorePatterns: ["/node_modules/"],
};
