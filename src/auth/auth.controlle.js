import { hash, verify } from "argon2";
import User from "../auth/auth.model.js"
import { generateJWT } from "../helpers/generate-jwt.js"

export const login = async (req, res) => {
    const {email, password} = req.body;
    try{
        const user = await User.findOne({
            $or: [{ email: email }]
        });

        if(!user) {
            return res.status(400).json({
                message: "Credenciales Invalidas",
                error: "El correo electronico es invalida"
            })
        }

        const validPassword = await verify(user.password, password);
        if(!validPassword) {
            return res.status(400).json({
                message: "Credenciales Ivalidas",
                error: "La contraseña es invalida"
            })
        }

        const token = await generateJWT(user.id)

        return res.status(200).json({
            message: "Login Exitodo",
            userDatails: {
                email: user.email,
                role: user.role,
                token: token,
            }
        })
    }catch(error) {
        return res.status(500).json({
            message: "Error del servidor",
            error: error.message
        })
    }
}

const AddUserAdmin = async () => {
    try{
        const adminExists = await User.findOne({role: "ADMIN_ROLE" });

        if(adminExists) {
            console.log("El administrador ya existe en la base de datos")
            return;
        }

        const hashedPassword = await hash("Maritza2025*")

        const userAdmin = new User({
            email: "uniresortes@gmail.com",
            password: hashedPassword,
            role: "ADMIN_ROLE"
        })

        await userAdmin.save()

        console.log("Administrador creado Exitosamente")
    }catch(error) {
        console.log("Error al crear el administrador",
            error.message
        )
    }
}

export default AddUserAdmin;
