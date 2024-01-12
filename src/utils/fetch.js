export const fetchAbi = async () => {
  try {
    const response = await fetch("api/getAbi");
    const data = await response.json();
    return data.abi;
  } catch (error) {
    console.error("Error handling abi:", error);
  }
};
