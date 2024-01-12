import { getPublicProvider } from "@therootnetwork/api";
import { providers, Wallet, JsonRpcProvider } from "ethers";

export const withEthersProvider = async (callback) => {
  const { provider, wallet } = provideEthersProvider();
  await callback(provider, wallet).catch((error) => {
    console.log(error);
  });
};

export const provideEthersProvider = () => {
  const provider = getEthersProvider();
  const wallet = new Wallet(process.env.PRIVATE_KEY, provider);
  return { provider, wallet };
};

export const getEthersProvider = () => {
  const provider = new providers.JsonRpcProvider(
    getPublicProviderUrl("porcini")
  );
  return provider;
};
