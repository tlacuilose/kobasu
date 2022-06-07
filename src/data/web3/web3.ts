import Web3 from 'web3';
import { BlockHeader, Block } from 'web3-eth';

declare global {
  interface Window{
    ethereum?:any
    web3?: Web3
  }
}

export const ethEnabled = async () => {
  if (window.ethereum) {
    await window.ethereum.request({method: 'eth_requestAccounts'});

    window.web3 = new Web3(window.ethereum);

    return true;
  }

  return false;
}
// export const web3 = new Web3('ws://127.0.0.1:9545/')
