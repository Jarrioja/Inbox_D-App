const assert = require ('assert');
const ganache = require ('ganache-cli');
const Web3 = require ('web3');
// const provider = ganache.provider();
// const web3 = new Web3(provider);
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require ('../compile');

let accounts;
let inbox;
const INITIAL_STRING = 'Hi There!'


beforeEach (async () => {
    // Obtener una lista de todas las cuentas
accounts = await web3.eth.getAccounts();
    //usar una de las cuentas para desplegar el contrato
inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy ({  data: bytecode, arguments:[INITIAL_STRING]  })
    .send({ from: accounts[0], gas:'1000000'  });

   // inbox.setProvider(provider);
});

describe('Inbox', ()=> {
    it('deploys a contract', () =>{
        //verificar que el contrato se desplego correctamente
        //assert.ok(inbox.options.address);
    });

    it('has a default message', async () =>{
        const message = await inbox.methods.message().call();
        assert.equal(message, INITIAL_STRING );
    });

    it('can change the message', async() =>{
        await inbox.methods.setMessage('bye').send({ from: accounts[0]   });        
        const message = await inbox.methods.message().call();
        assert.equal(message, 'bye');
    });
});