import fs from "fs";
import path from "path";

export default function getAbiHandler(req, res) {
  try {
    const dir = path.resolve(
      __dirname,
      "../../../../contracts/Counter.sol/Counter.json"
    );
    const file = fs.readFileSync(dir, "utf8");
    const json = JSON.parse(file);
    const abi = json.abi;
    res.status(200).json({ abi });
  } catch (e) {
    console.log(`e`, e);
  }
}
