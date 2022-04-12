const AirDropper = artifacts.require("AirDropper");
const { deployProxy } = require("@openzeppelin/truffle-upgrades");

module.exports = async(deployer) => {
  
  const accounts = await web3.eth.getAccounts();
  await console.log("Deploying Contracts using:", accounts[0]);

  let airDropper = await deployProxy(AirDropper, [10], { kind: 'uups' });
  await console.log("AirDropper Address:",airDropper.address);

};
