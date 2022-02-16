import mongoose from "mongoose";

const tokenSchema = mongoose.Schema({
  projectName: { type: String, required: true },
  projectDiscription: { type: String, required: true },
  tokenSymbol: { type: String, required: true },
  tokenDecimel: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  transationHash: { type: String, required: true },
});

export default mongoose.model("ODI", tokenSchema);
