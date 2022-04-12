const AirDropper = artifacts.require("AirDropper");
const ERC20Test = artifacts.require("ERC20Test");

module.exports = async(deployer) => {
  
    // const accounts = await web3.eth.getAccounts();
    // await console.log("Deploying Contracts using:", accounts[0]);

    // // const erc20 = await deployer.deploy(ERC20Test, "AD","AirDrop","100000000000000000000000000");
    // // await console.log("ERC20 Token Address:", erc20.address);

    // const tester20 = await ERC20Test.deployed();
    // await console.log("ERC20 Token Address:", tester20.address);

    // const airDropper = await AirDropper.deployed();
    // await console.log("AirDropper Address:", airDropper.address);

    // let erc20Obj = await ERC20Test.at(tester20.address);
    // let airObj = await AirDropper.at(airDropper.address);
    // let recipients = [];

    // console.log("AirDrop to 100 Address");
    // console.log("Approving Tokens");
    
    // await erc20Obj.approve(airDropper.address, "10000");
    
    // for(let i = 0; i < 100; i++){
    //     recipients.push("0xBC7a2925D5C194D1DbEdeB99F13c326851dC8230");
    // }

    // console.log("Single AirDrop Tx");
    
    // await airObj.singleValueAirdrop(
    //     "0xcA18C01aF4D33472c6a58EecbbF4b57a20FF797f",
    //     recipients,
    //     "10000",
    //     "100"
    // );

    // console.log("AirDrop to 200 Address");
    // console.log("Approving Tokens");
    // await erc20Obj.approve(airDropper.address, "20000");
    
    // recipients = [];
    // for(let i = 0; i < 200; i++){
    //     recipients.push("0xBC7a2925D5C194D1DbEdeB99F13c326851dC8230");
    // }

    // console.log("Single AirDrop Tx");
    // await airObj.singleValueAirdrop(
    //     "0xcA18C01aF4D33472c6a58EecbbF4b57a20FF797f",
    //     recipients,
    //     "20000",
    //     "100"
    // );

    // console.log("AirDrop to 300 Address");
    // console.log("Approving Tokens");
    // await erc20Obj.approve(airDropper.address, "30000");
    
    // recipients = [];
    // for(let i = 0; i < 300; i++){
    //     recipients.push("0xBC7a2925D5C194D1DbEdeB99F13c326851dC8230");
    // }

    // console.log("Single AirDrop Tx");
    // await airObj.singleValueAirdrop(
    //     "0xcA18C01aF4D33472c6a58EecbbF4b57a20FF797f",
    //     recipients,
    //     "30000",
    //     "100"
    // );

    // console.log("AirDrop to 400 Address");
    // console.log("Approving Tokens");
    // await erc20Obj.approve(airDropper.address, "40000");
    
    // recipients = [];
    // for(let i = 0; i < 400; i++){
    //     recipients.push("0xBC7a2925D5C194D1DbEdeB99F13c326851dC8230");
    // }

    // console.log("Single AirDrop Tx");
    // await airObj.singleValueAirdrop(
    //     "0xcA18C01aF4D33472c6a58EecbbF4b57a20FF797f",
    //     recipients,
    //     "40000",
    //     "100"
    // );

    // console.log("AirDrop to 500 Address");
    // console.log("Approving Tokens");
    // await erc20Obj.approve(airDropper.address, "50000");
    
    // recipients = [];
    // for(let i = 0; i < 500; i++){
    //     recipients.push("0xBC7a2925D5C194D1DbEdeB99F13c326851dC8230");
    // }

    // console.log("Single AirDrop Tx");
    // await airObj.singleValueAirdrop(
    //     "0xcA18C01aF4D33472c6a58EecbbF4b57a20FF797f",
    //     recipients,
    //     "50000",
    //     "100"
    // );


    // console.log("AirDrop to 600 Address");
    // console.log("Approving Tokens");
    // await erc20Obj.approve(airDropper.address, "60000");
    
    // recipients = [];
    // for(let i = 0; i < 600; i++){
    //     recipients.push("0xBC7a2925D5C194D1DbEdeB99F13c326851dC8230");
    // }

    // console.log("Single AirDrop Tx");
    // await airObj.singleValueAirdrop(
    //     "0xcA18C01aF4D33472c6a58EecbbF4b57a20FF797f",
    //     recipients,
    //     "60000",
    //     "100"
    // );

    // console.log("AirDrop to 700 Address");
    // console.log("Approving Tokens");
    // await erc20Obj.approve(airDropper.address, "70000");
    
    // recipients = [];
    // for(let i = 0; i < 700; i++){
    //     recipients.push("0xBC7a2925D5C194D1DbEdeB99F13c326851dC8230");
    // }

    // console.log("Single AirDrop Tx");
    // await airObj.singleValueAirdrop(
    //     "0xcA18C01aF4D33472c6a58EecbbF4b57a20FF797f",
    //     recipients,
    //     "70000",
    //     "100"
    // );

    // console.log("AirDrop to 800 Address");
    // console.log("Approving Tokens");
    // await erc20Obj.approve(airDropper.address, "80000");
    
    // recipients = [];
    // for(let i = 0; i < 800; i++){
    //     recipients.push("0xBC7a2925D5C194D1DbEdeB99F13c326851dC8230");
    // }

    // console.log("Single AirDrop Tx");
    // await airObj.singleValueAirdrop(
    //     "0xcA18C01aF4D33472c6a58EecbbF4b57a20FF797f",
    //     recipients,
    //     "80000",
    //     "100"
    // );


    // console.log("AirDrop to 900 Address");
    // console.log("Approving Tokens");
    // await erc20Obj.approve(airDropper.address, "90000");
    
    // recipients = [];
    // for(let i = 0; i < 900; i++){
    //     recipients.push("0xBC7a2925D5C194D1DbEdeB99F13c326851dC8230");
    // }

    // console.log("Single AirDrop Tx");
    // await airObj.singleValueAirdrop(
    //     "0xcA18C01aF4D33472c6a58EecbbF4b57a20FF797f",
    //     recipients,
    //     "90000",
    //     "100"
    // );


    // console.log("AirDrop to 1000 Address");
    // console.log("Approving Tokens");
    // await erc20Obj.approve(airDropper.address, "100000");
    
    // recipients = [];
    // for(let i = 0; i < 1000; i++){
    //     recipients.push("0xBC7a2925D5C194D1DbEdeB99F13c326851dC8230");
    // }

    // console.log("Single AirDrop Tx");
    // await airObj.singleValueAirdrop(
    //     "0xcA18C01aF4D33472c6a58EecbbF4b57a20FF797f",
    //     recipients,
    //     "100000",
    //     "100"
    // );

    // console.log("AirDrop to 1100 Address");
    // console.log("Approving Tokens");
    // await erc20Obj.approve(airDropper.address, "110000");
    
    // recipients = [];
    // for(let i = 0; i < 1100; i++){
    //     recipients.push("0xBC7a2925D5C194D1DbEdeB99F13c326851dC8230");
    // }

    // console.log("Single AirDrop Tx");
    // await airObj.singleValueAirdrop(
    //     "0xcA18C01aF4D33472c6a58EecbbF4b57a20FF797f",
    //     recipients,
    //     "110000",
    //     "100"
    // );

    // console.log("AirDrop to 1750 Address");
    // console.log("Approving Tokens");
    // await erc20Obj.approve(airDropper.address, "175000");
    
    // recipients = [];
    // for(let i = 0; i < 1750; i++){
    //     recipients.push("0xBC7a2925D5C194D1DbEdeB99F13c326851dC8230");
    // }

    // console.log("Single AirDrop Tx");
    // await airObj.singleValueAirdrop(
    //     "0xcA18C01aF4D33472c6a58EecbbF4b57a20FF797f",
    //     recipients,
    //     "175000",
    //     "100"
    // );

//     console.log("AirDrop to 2000 Address");
//     console.log("Approving Tokens");
//     await erc20Obj.approve(airDropper.address, "200000");
    
//     recipients = [];
//     for(let i = 0; i < 2000; i++){
//         recipients.push("0xBC7a2925D5C194D1DbEdeB99F13c326851dC8230");
//     }

//     console.log("Single AirDrop Tx");
//     await airObj.singleValueAirdrop(
//         "0xcA18C01aF4D33472c6a58EecbbF4b57a20FF797f",
//         recipients,
//         "200000",
//         "100"
//     );

//     console.log("AirDrop to 2250 Address");
//     console.log("Approving Tokens");
//     await erc20Obj.approve(airDropper.address, "225000");
    
//     recipients = [];
//     for(let i = 0; i < 2250; i++){
//         recipients.push("0xBC7a2925D5C194D1DbEdeB99F13c326851dC8230");
//     }

//     console.log("Single AirDrop Tx");
//     await airObj.singleValueAirdrop(
//         "0xcA18C01aF4D33472c6a58EecbbF4b57a20FF797f",
//         recipients,
//         "225000",
//         "100"
//     );
  };