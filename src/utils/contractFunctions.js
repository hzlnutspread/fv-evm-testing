import { ethers } from "ethers";
import { getERC20Contract } from "./getErc20Contract";

const CONTRACT_ADDRESS = "0xcf1b2e11c7329f3a73ac62f0cfc66d0225a42f78";
const ASTO_ASSET_ID = 17_508;

export const transferToken = async (signer) => {
  const erc20ContractWithSigner = getERC20Contract(ASTO_ASSET_ID, signer);
  const target = signer._address;
  const amount = 0.1 * Math.pow(10, 18); // 0.1 ASTO
  const tx = await erc20ContractWithSigner.transfer(target, amount.toString());
  const receipt = await tx.wait();
  console.log(receipt);
};

export const getCount = async (abi, signer) => {
  const contractWithSigner = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
  const tx = await contractWithSigner.getCount();
  const value = await tx.toString();
  return value;
};

export const incrementCount = async (abi, signer) => {
  console.log(signer);
  console.log(abi);
  const contractWithSigner = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
  console.log(contractWithSigner);
  const tx = await contractWithSigner.increment();
  console.log(tx);
};

export const decrementCount = async (abi, signer) => {
  console.log(signer);
  console.log(abi);
  const contractWithSigner = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
  const tx = await contractWithSigner.decrement();
  console.log(tx);
};

// console.log(`Transaction to address: ${receipt.to}\n`);
// console.log(`Transaction from address: ${receipt.from}\n`);
// console.log(`Transaction address: ${receipt.contractAddress}\n`);
