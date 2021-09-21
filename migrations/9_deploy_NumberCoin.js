const NumberCoin = artifacts.require("NumberCoin");

module.exports = function (deployer) {
  deployer.deploy(NumberCoin);
};