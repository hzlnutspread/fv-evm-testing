import { ethers } from "ethers";

const CONTRACT_ADDRESS = "0xcf1b2e11c7329f3a73ac62f0cfc66d0225a42f78";

export const getCount = async (abi, signer) => {
  const contractWithSigner = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
  const tx = await contractWithSigner.getCount();
  const value = await tx.toString();
  return value;
};

export const increment = async (abi, signer) => {
  console.log(signer);
  const contractWithSigner = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
  const tx = await contractWithSigner.increment();
  console.log(tx);
};

export const decrement = async (abi, signer) => {
  const contractWithSigner = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
  const tx = await contractWithSigner.decrement();
  console.log(tx);
};

// console.log(`Transaction to address: ${receipt.to}\n`);
// console.log(`Transaction from address: ${receipt.from}\n`);
// console.log(`Transaction address: ${receipt.contractAddress}\n`);
