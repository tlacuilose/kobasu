import Web3 from 'web3';

declare global {
  interface Window {
    ethereum?: any;
    web3?: Web3;
  }
}

export const ethConnectAndAccounts = async () =>
  await window.ethereum.request({ method: 'eth_requestAccounts' });

export const ethGetAccounts = async () =>
  await window.ethereum.request({ method: 'eth_accounts' });

export const ethRequestConnection = async () => {
  if (window.ethereum) {
    await ethConnectAndAccounts();

    window.web3 = new Web3(window.ethereum);
  } else {
    alert('Get MetaMask!');
  }
};

// export const web3 = new Web3('ws://127.0.0.1:9545/')
