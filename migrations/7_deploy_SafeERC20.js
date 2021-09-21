const SafeERC20 = artifacts.require("SafeERC20");

module.exports = function (deployer) {
  deployer.deploy(SafeERC20);
};
