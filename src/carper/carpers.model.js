import { Schema, model } from "mongoose";

const carpetaSchema = new Schema({
  carpeta: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
}, 
{
    versionKey: false,
    timestamps: true,
    collection: "carpetas"
}
)

export default model("Carpetas", carpetaSchema);