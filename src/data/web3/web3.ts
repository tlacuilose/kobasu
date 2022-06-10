import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
const NekobasuAbi = require('./abi/Nekobasu.json');

const contractAddress = '0x8AAeceBD1Dc25A69Dd89F997e78171b91a973E36';

declare global {
  interface Window {
    ethereum?: any;
    web3?: Web3;
    nekobasu?: any;
    account?: any;
  }
}

const reloadWindow = () => window.location.reload();

export const initDapp = async () => {
  if (!window.nekobasu) {
    window.ethereum.on('chainChanged', reloadWindow);
    window.ethereum.on('accountsChanged', reloadWindow);
    window.web3 = new Web3(window.ethereum);
    window.web3.eth.handleRevert = true;

    let accounts = await ethGetAccounts();
    window.account = accounts[0];

    window.nekobasu = new window.web3!.eth.Contract(
      NekobasuAbi.abi as AbiItem[],
      contractAddress,
    ) as any;
  }
};

const removeEthListeners = () => {
  window.ethereum.removeListener('chainChanged', reloadWindow);
  window.ethereum.removeListener('accountsChanged', reloadWindow);
};

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
