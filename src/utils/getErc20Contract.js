import { assetIdToERC20Address, ERC20_ABI } from "@therootnetwork/evm";
import { Contract } from "ethers";

export function getERC20Contract(assetId, signer) {
  const assetAddress = assetIdToERC20Address(assetId);
  return new Contract(assetAddress, ERC20_ABI, signer);
}
