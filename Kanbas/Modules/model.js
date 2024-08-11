import mongoose from "mongoose";
import moduleSchema from "./schema.js";

const Module = mongoose.model("ModuleModel", moduleSchema);
export default Module;