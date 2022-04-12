const AirDropper = artifacts.require("AirDropper");
const ERC20Test = artifacts.require("ERC20Test");
const { getContractAddress } = require("@openzeppelin/truffle-upgrades/dist/utils");
const web3 = require("web3");


contract('Vesting Test', (accounts) => {
    var testERC20;
    var airDropper;

    // Deploying ERC20 token in test environment
    it('Deployed ERC20', async() => {

        testERC20 = await ERC20Test.new("AD","AirDrop","100000000000000000000000000");
        assert(testERC20.address !== '', "Contract was deployed");

        airDropper = await AirDropper.deployed();
        assert(airDropper.address != "", "Contract was deployed");
        
    });


    it('SingleValue : Invalid Inputs', async() => {
        const airdrops = airDropper;
        try {
            await airdrops.singleValueAirdrop("0x0000000000000000000000000000000000000000",[],"0","0");
        } catch (error) {
            assert(error.message.includes("Invalid Details."));
        }
    })

    it('SingleValue : Zero Address', async() => {
        const airdrops = airDropper;
        const test = testERC20;
        // Approving transfer of tokens to contract
        await test.approve(airdrops.address, "10");
        try {
            await airdrops.singleValueAirdrop(testERC20.address,["0x0000000000000000000000000000000000000000"], "10", "10")
        } catch (error) {
            assert(error.message.includes("Zero Address Error"));
        }
    })

    it('SingleValue : Inconsistent Inputs', async() => {
        const airdrops = airDropper;
        const test = testERC20;
        // Approving transfer of tokens to contract
        await test.approve(airdrops.address, "10");
        try {
            await airdrops.singleValueAirdrop(testERC20.address,["0x1000000000000000000000000000000000000000"], "10", "1")
        } catch (error) {
            assert(error.message.includes("Inconsistency in AirDrop List"));
        }
    })

    it('SingleValue : Limit Breached', async() => {
        const airdrops = airDropper;
        const test = testERC20;
        // Approving transfer of tokens to contract
        await test.approve(airdrops.address, "11");
        let addresses = []
        for(let i=0; i<11; i++){
            addresses.push("0x1000000000000000000000000000000000000000");
        }
        try {
            await airdrops.singleValueAirdrop(testERC20.address,addresses, "11", "1")
        } catch (error) {
            assert(error.message.includes("AirDrop Limit Breached."));
        }
    })

    it('MultiValue : Invalid Inputs', async() => {
        const airdrops = airDropper;
        try {
            await airdrops.multiValueAirdrop("0x0000000000000000000000000000000000000000",[],["0"],"0");
        } catch (error) {
            assert(error.message.includes("Invalid Details."));
        }
    })

    it('MultiValue : Zero Input Error', async() => {
        const airdrops = airDropper;
        const test = testERC20;
        // Approving transfer of tokens to contract
        await test.approve(airdrops.address, "10");
        try {
            await airdrops.multiValueAirdrop(testERC20.address,["0x0000000000000000000000000000000000000000"], ["10"], "10")
        } catch (error) {
            assert(error.message.includes("Zero Input Error."));
        }
    })

    it('MultiValue : Inconsistent Inputs', async() => {
        const airdrops = airDropper;
        const test = testERC20;
        // Approving transfer of tokens to contract
        await test.approve(airdrops.address, "30");
        try {
            await airdrops.multiValueAirdrop(testERC20.address,["0x1000000000000000000000000000000000000000"], ["10","10"], "30")
        } catch (error) {
            assert(error.message.includes("Inconsistency in AirDrop List"));
        }
    })

    it('MultiValue : Limit Breached', async() => {
        const airdrops = airDropper;
        const test = testERC20;
        // Approving transfer of tokens to contract
        await test.approve(airdrops.address, "11");
        let addresses = []
        let tokens = []
        for(let i=0; i<11; i++){
            addresses.push("0x1000000000000000000000000000000000000000");
            tokens.push("1");
        }
        try {
            await airdrops.multiValueAirdrop(testERC20.address,addresses, tokens, "11")
        } catch (error) {
            assert(error.message.includes("AirDrop Limit Breached."));
        }
    })

    it('SingleValue : Successful Transaction to 3 users', async() => {
        const airdrops = airDropper;
        const test = testERC20;
        const airDropValue = "100";
        // Approving transfer of tokens to contract
        await test.approve(airdrops.address, "300");
        await airdrops.singleValueAirdrop(testERC20.address,["0xBC7a2925D5C194D1DbEdeB99F13c326851dC8230","0x6c368Bd8CC280a54Ad443583D0BC18E4036A2f41","0xdea1d0816d88B72F522991B5AB955ca808Dde18D"], "300", airDropValue);
        var addv1 = await testERC20.balanceOf("0xBC7a2925D5C194D1DbEdeB99F13c326851dC8230");
        var addv2 = await testERC20.balanceOf("0x6c368Bd8CC280a54Ad443583D0BC18E4036A2f41");
        var addv3 = await testERC20.balanceOf("0xdea1d0816d88B72F522991B5AB955ca808Dde18D");
        assert(addv1.toString(10) == airDropValue);
        assert(addv2.toString(10) == airDropValue);
        assert(addv3.toString(10) == airDropValue);
    })

    it('MultiValue : Successful Transaction to 3 users', async() => {
        const airdrops = airDropper;
        const test = testERC20;
        const airDropValue = "300";
        // Approving transfer of tokens to contract
        await test.approve(airdrops.address, "900");
        await airdrops.multiValueAirdrop(testERC20.address,["0x34F56f3C0Fec9fD02f12A562AA16ba63bC8819Ac","0x89ec56238fd1bd15CBF4DEa5604A8cfA4F250Aef","0x35E763A72681503f202A66078b8f4915104646D2"],["300","300","300"],"900");
        var addv1 = await testERC20.balanceOf("0x34F56f3C0Fec9fD02f12A562AA16ba63bC8819Ac");
        var addv2 = await testERC20.balanceOf("0x89ec56238fd1bd15CBF4DEa5604A8cfA4F250Aef");
        var addv3 = await testERC20.balanceOf("0x35E763A72681503f202A66078b8f4915104646D2");
        assert(addv1.toString(10) == airDropValue);
        assert(addv2.toString(10) == airDropValue);
        assert(addv3.toString(10) == airDropValue);
    })

    it('MultiValue : Inconsistent Amount of Tokens', async() => {
        const airdrops = airDropper;
        const test = testERC20;
        const airDropValue = "300";
        // Approving transfer of tokens to contract
        await test.approve(airdrops.address, "900");
        try {
            await airdrops.multiValueAirdrop(testERC20.address,["0x34F56f3C0Fec9fD02f12A562AA16ba63bC8819Ac","0x89ec56238fd1bd15CBF4DEa5604A8cfA4F250Aef","0x35E763A72681503f202A66078b8f4915104646D2"],["300","300","200"],"900");
        } catch (error) {
            assert(error.message.includes("Inconsistent Amount of Tokens"));
        }
    })

    it('Killing Contract', async() => {
        const airdrops = airDropper;
        try{
            await airdrops.kill();
        } catch (error) {
            console.log(error);
            assert(false);
        }
    })

    it('Revive Contract', async() => {
        const airdrops = airDropper;
        try{
            await airdrops.revive();
        } catch (error) {
            console.log(error);
            assert(false);
        }
    })

    it('Invalid : Setting Batch Limit', async() => {
        const airdrops = airDropper;
        try{
            await airdrops.setBatchLimit("0");
        } catch (error) {
            assert(error.message.includes("Invalid BatchLimit"));
        }
    })

    it('Setting Batch Limit', async() => {
        const airdrops = airDropper;
        try{
            await airdrops.setBatchLimit("10");
        } catch (error) {
            assert(false);
        }
    })

    it('SingleValue : Killed Contract Tx', async() => {
        const airdrops = airDropper;
        const test = testERC20;
        await test.approve(airdrops.address, "300");
        try{
            await airdrops.singleValueAirdrop(testERC20.address,["0xBC7a2925D5C194D1DbEdeB99F13c326851dC8230","0x6c368Bd8CC280a54Ad443583D0BC18E4036A2f41","0xdea1d0816d88B72F522991B5AB955ca808Dde18D"], "300", "100");
        } catch (error) {
            assert(error.message.includes("FailSafeMode: ACTIVE"));
        }
    })

    it('MultiValue : Killed Contract Tx', async() => {
        const airdrops = airDropper;
        const test = testERC20;
        await test.approve(airdrops.address, "900");
        try{
            await airdrops.multiValueAirdrop(testERC20.address,["0x34F56f3C0Fec9fD02f12A562AA16ba63bC8819Ac","0x89ec56238fd1bd15CBF4DEa5604A8cfA4F250Aef","0x35E763A72681503f202A66078b8f4915104646D2"],["300","300","300"],"900");
        } catch (error) {
            assert(error.message.includes("FailSafeMode: ACTIVE"));
        }
    })

})