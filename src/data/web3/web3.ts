import { start } from 'repl';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils'
const NekobasuAbi = require('./Nekobasu.json');

const contractAddress = '0xDA569986B60Df3191ab52d7C877DB8CF0fd8c190';

declare global {
  interface Window {
    ethereum?: any;
    web3?: Web3;
    nekobasu?: any;
    account?: any;
  }
}

const reloadWindow = () =>
  window.location.reload();

const startTrip = async () => {
    return new Promise((resolve, reject) => {
      window.nekobasu.methods.startTrip().send({from: window.account})
      .on('receipt', (receipt: any) => {
        resolve(receipt);
      })
      .on('error', (error: any) => {
        alert(error.message);
        reject(error);
      })
    });
}

export const initDapp = async () => {
  window.ethereum.on('chainChanged', reloadWindow);
  window.ethereum.on('accountsChanged', reloadWindow);
  window.web3 = new Web3(window.ethereum);
  window.web3.eth.handleRevert = true;


  let accounts = await ethGetAccounts()
  window.account = accounts[0];
  window.nekobasu = new window.web3!.eth.Contract(NekobasuAbi.abi as AbiItem[], contractAddress) as any;

  try {
    let receipt = await startTrip();
    console.log(receipt);
  } catch (err) {
    console.log(err);
  }
}

const removeEthListeners = () => {
  window.ethereum.removeListener('chainChanged', reloadWindow);
  window.ethereum.removeListener('accountsChanged', reloadWindow);
}

export const ethConnectAndAccounts = async () => 
  await window.ethereum.request({ method: 'eth_requestAccounts' });

export const ethGetAccounts = async () =>
  await window.ethereum.request({ method: 'eth_accounts' });

export const ethRequestConnection = async (onSuccess: () => void) => {
  if (window.ethereum) {
    await ethConnectAndAccounts();

    initDapp();

    onSuccess();


  } else {
    alert('Get MetaMask!');
  }
};

export const offerTrip = async () => {
  if (window.nekobasu) {
    console.log(window.nekobasu);
  }
}


// export const web3 = new Web3('ws://127.0.0.1:9545/')
