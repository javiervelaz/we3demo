const displayGreeting = async (greeting, contract,accounts,web3) => {
  //let number = await contract.methods.createRandomNumber
  //greeting = await contract.methods.sayHello().call();  
  $("#wallet").html(
    "wallet:" + accounts[0] + "<br>  Saldo:" + await web3.eth.getBalance(accounts[0])/1000000000000000000
  );
  //llama al evento NewNumber
  contract.events.NewNumber()
  .on('data', (event) => {
    //console.log(event.returnValues);
    let html = "<p>ID numero"+event.returnValues['numberId']+"<br>";
    html += "Numero adquirido "+event.returnValues['naturalNumber']+"</p>";
    $("#adquirir").html(
      html
     );
  })
.on('error', console.error);
contract.events.Transfer()
  .on('data', (event) => {
    console.log(event);
    let html = "<p>ID numero"+event.returnValues[2]+"<br>";
    html += "Numero transferido desde wallet :"+event.returnValues[0]+" a wallet :"+ event.returnValues[1]+"</p>";
    $("#transfer").html(
      html
    );
  })
.on('error', console.error);

var bal = await contract.methods.balanceOf(accounts[0]).call();
$("#balance").html("Esta cuenta tiene " +bal + " numeros adquiridos");  
      
};

const updateGreeting = (greeting, contract, accounts,web3) => {
  let input;
  $("#input").on("change", (e) => {
    input = e.target.value;
  });
  $("#form1").on("submit", async (e) => {
    e.preventDefault();
    await contract.methods
      .createRandomNumber(input)
      .send({ from: accounts[0], gas: 6721975 });
      var bal = await contract.methods.balanceOf(accounts[0]).call();
      $("#balance").html("Esta cuenta tiene " +bal + " numeros adquiridos");  
      displayGreeting(greeting, contract,accounts,web3);
  });
  let input2;
  $("#input2").on("change", (el) => {
    input2 = el.target.value;
  });
  $("#form2").on("submit", async (er) => {
    er.preventDefault();
    var owner = await contract.methods.ownerOf(input2).call();
    console.log(owner);
    $("#owner").html("El nro " + input + "pertenece a: " + owner);  
  });
  let input3;
  let input4;
  $("#input3").on("change", (el) => {
    input3 = el.target.value;
  });
  $("#input4").on("change", (el) => {
    input4 = el.target.value;
  });
  $("#form3").on("submit", async (er) => {
    er.preventDefault();
    console.log(input3,input4);
    var transfer = await contract.methods.transfer(input3,input4)
      .send({ from: accounts[0], gas: 6721975 })
  });
 
  //console.log(bal);
};

async function greetingApp() {
  const web3 = await getWeb3();
  const accounts = await web3.eth.getAccounts();
  const contract = await getContract(web3);
  //const contract2 = await getContract2(web3);
  let greeting;
  
  displayGreeting(greeting, contract,accounts,web3);
  updateGreeting(greeting, contract, accounts,web3);


}

greetingApp();



