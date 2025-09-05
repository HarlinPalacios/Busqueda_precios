import { Schema, model } from "mongoose"

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["ADMIN_ROLE"]
    },
    status: {   
        type: Boolean,
        default: true
    }
},{
    versionKey: false,
    timestamps: true
});

userSchema.methods.toJSON = function() {
    const { password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
}

export default model("User", userSchema);