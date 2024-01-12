import { ethers } from "ethers";
import { Inter } from "next/font/google";
import { fetchAbi } from "../utils/fetch";
import { getCount, increment, decrement } from "../utils/contractFunctions";
import { useEffect, useState } from "react";
import { getPublicProviderUrl } from "@therootnetwork/api";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [signer, setSigner] = useState(null);
  const [abiData, setAbiData] = useState(null);
  const [provider, setProvider] = useState({});
  const [selectedAddress, setSelectedAddress] = useState("");
  const [showSwitchNetworkButton, setShowSwitchNetworkButton] = useState(false);

  // ============================= USE EFFECTS START =============================
  useEffect(() => {
    setup();
    if (window.ethereum) {
      handleChainChanged();
    }
  }, []);

  useEffect(() => {
    setProvider(
      new ethers.providers.JsonRpcProvider(
        getPublicProviderUrl("porcini", false),
        7672
      )
    );
  }, []);
  // ============================= USE EFFECTS END =============================

  // ============================= WALLET CONNECT START =============================
  const setup = async () => {
    window.ethereum.on("chainChanged", handleChainChanged);
  };

  const handleChainChanged = async () => {
    const chainId = await window.ethereum.request({
      method: "eth_chainId",
    });

    setShowSwitchNetworkButton(chainId !== "0x1df8");
  };

  const handleSwitchNetworkClick = async () => {
    console.log("switching to porcini...");
    if (window.ethereum) {
      console.log("detected metamask");
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [
            {
              chainId: "0x1df8",
            },
          ],
        });
      } catch (error) {
        console.log("error switching to porcini...");
      }
    } else {
      console.log("already connected to porcini...");
    }
  };

  const handleConnectWallet = async () => {
    console.log("connecting wallet");
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
    }
    console.log("successfully connected wallet");
  };

  const requestAccount = async () => {
    console.log("connect wallet button clicked...");

    const chainId = await window.ethereum.request({
      method: "eth_chainId",
    });
    console.log(`current chain ID: ${chainId}`);

    if (window.ethereum) {
      console.log("detected metamask");
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        const wallet = accounts[0];
        setSelectedAddress(wallet);

        const signer = await getSigner(provider, wallet);
        setSigner(signer);
      } catch (error) {
        console.log("error connecting...");
      }
    } else {
      console.log("metamask not detected");
    }
  };

  const getSigner = async (provider, connectedWallet) => {
    const signer = provider.getSigner(connectedWallet);
    return signer;
  };

  // ============================= WALLET CONNECT END =============================

  const handleLogAbi = async () => {
    try {
      const data = await fetchAbi();
      setAbiData(data);
      console.log(data);
    } catch (error) {
      console.error("Error handling abi:", error);
    }
  };

  const handleGetCount = async () => {
    console.log("calling contract function `getCount()`");
    const abi = await fetchAbi();
    const currentCount = await getCount(abi, signer);
    console.log(currentCount);
  };

  const handleIncrement = async () => {
    console.log("calling contract function `increment()`");
    const abi = await fetchAbi();
    await increment(abi, signer);
  };

  const handleDecrement = async () => {
    console.log("calling contract function `decrement()`");
    const abi = await fetchAbi();
    await decrement(abi, signer);
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center p-24 ${inter.className}`}
    >
      {showSwitchNetworkButton ? (
        <>
          <div className="mt-2">
            you are not connected to porcini, please click here to switch chains
          </div>
          <button
            className=" bg-[#FFFFFF] mt-2 p-2 rounded-lg text-[#151515]"
            onClick={handleSwitchNetworkClick}
          >
            switch to porcini
          </button>
        </>
      ) : (
        <>
          <button
            className="border-[2px] border-[#FFFFFF] p-2 mb-2 rounded-lg"
            onClick={handleConnectWallet}
          >
            connect wallet
          </button>
          <div>testing evm code</div>
          <div>testing evm code</div>
          <button
            className="border-[2px] border-[#FFFFFF] p-2 mt-2 rounded-lg"
            onClick={handleLogAbi}
          >
            log ABI
          </button>
          <div>
            <button
              className="border-[2px] border-[#FFFFFF] p-2 mt-[48px] rounded-lg"
              onClick={handleGetCount}
            >
              get count
            </button>
            <button
              className="border-[2px] border-[#FFFFFF] p-2 mt-2 rounded-lg"
              onClick={handleIncrement}
            >
              increment
            </button>
            <button
              className="border-[2px] border-[#FFFFFF] p-2 mt-2 rounded-lg"
              onClick={handleDecrement}
            >
              decrement
            </button>
          </div>
        </>
      )}
    </main>
  );
}
