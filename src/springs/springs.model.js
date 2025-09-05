import { Schema, model} from "mongoose"

const springsSchema = new Schema({
    carpeta: {
        type: String,
        required: true
    },
    codigo: {
        type: String,
    },
    calibre: {
        type: String,
        required: true
    },
    dia_externo: {
        type: String
    },
    dia_interno: {
        type: String
    },
    largo: {
        type: String
    },
    fecha_venta: {
        type: Date
    },
    costo: {
        type: Number,
        required: true
    }
},
{
    versionKey: false,
    timestamps: true,
    collection: "springs"
}
)

export default model("Resortes", springsSchema);