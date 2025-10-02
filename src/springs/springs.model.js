import mongoose, { Schema, model } from "mongoose";

const springsSchema = new Schema(
  {
    carpeta: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Carpeta",
      required: true,
    },
    codigo: { type: String, required: true, unique: true },
    calibre: { type: String, required: true },
    tipo_resorte: { type: String, required: true },
    tipo_acero: { type: String, required: true },
    dia_externo: { type: String, required: true },
    dia_interno: { type: String, required: true },
    largo: { type: String, required: true },
    largo_argolla: { type: String }, 
    fecha_venta: { type: Date, required: true },
    costo: { type: Number, required: true }, 
    imagen: { type: String, default: null }, 
  },
  {
    versionKey: false,
    timestamps: true,
    collection: "springs",
  }
);

export default model("Resortes", springsSchema);
