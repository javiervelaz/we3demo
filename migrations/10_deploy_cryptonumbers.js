const Cryptonumbers = artifacts.require("Cryptonumbers");

module.exports = function (deployer) {
  deployer.deploy(Cryptonumbers);
};
