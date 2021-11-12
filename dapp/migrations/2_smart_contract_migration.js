const SmartContract = artifacts.require("TheBreadsFactory_Logo10k");

module.exports = function (deployer) {
  deployer.deploy(SmartContract, "Name", "Symbol", "https://");
};
