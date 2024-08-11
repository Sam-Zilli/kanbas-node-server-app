import mongoose from "mongoose";
import moduleSchema from "./schema.js";
const Module = mongoose.model("Module", moduleSchema);
export default Module;