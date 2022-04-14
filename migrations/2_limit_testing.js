const AirDropper = artifacts.require("AirDropper");
const ERC20Test = artifacts.require("ERC20Test");
var ethers = require('ethers');  
var crypto = require('crypto');

module.exports = async(deployer) => {
  
    function generateNewAddress() {
      var id = crypto.randomBytes(32).toString('hex');
      var privateKey = "0x"+id;
      // console.log("SAVE BUT DO NOT SHARE THIS:", privateKey);

      var wallet = new ethers.Wallet(privateKey);
      console.log("Address: " + wallet.address);
      return wallet.address;
    }
    const accounts = await web3.eth.getAccounts();
    await console.log("Deploying Contracts using:", accounts[0]);

    // const erc20 = await deployer.deploy(ERC20Test, "AD","AirDrop","100000000000000000000000000");
    // await console.log("ERC20 Token Address:", erc20.address);

    const tester20 = await ERC20Test.deployed();
    await console.log("ERC20 Token Address:", tester20.address);

    const airDropper = await AirDropper.deployed();
    await console.log("AirDropper Address:", airDropper.address);

    let erc20Obj = await ERC20Test.at(tester20.address);
    let airObj = await AirDropper.at(airDropper.address);
    let recipients = [];

    console.log("AirDrop to 10 Address");
    console.log("Approving Tokens");
    await erc20Obj.approve(airDropper.address, "100");
    
    recipients = [];
    for(let i = 0; i < 1; i++){
        recipients.push(generateNewAddress());
    }

    console.log("Single AirDrop Tx");
    await airObj.singleValueAirdrop(
        "0xcA18C01aF4D33472c6a58EecbbF4b57a20FF797f",
        recipients,
        "100",
        "100"
    );
  };