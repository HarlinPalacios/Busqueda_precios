import Resortes from "./springs.model.js"

//Agregar resortes al inventario
export const createSprings = async (req, res) => {
    try{
        const { carpeta, codigo, calibre, dia_externo, dia_interno, largo, fecha_venta, costo} = req.body;

        const resorte = new Resortes({
            carpeta,
            codigo,
            calibre,
            dia_externo,
            dia_interno,
            largo,
            fecha_venta,
            costo
        });

        await resorte.save()

        return res.status(200).json({
            message: "Resortes agregado exitosamente",
            useDetails: {
                carpeta: resorte.carpeta,
                codigo: resorte.codigo,
                calibre: resorte.calibre,
                dia_externo: resorte.dia_externo,
                dia_interno: resorte.dia_interno,
                largo: resorte.largo,
                fecha_venta: resorte.fecha_venta,
                costo: resorte.costo
            }
        })
    }catch(error){
        return res.status(500).json({
            message: "Error al agregar el resortes",
            error: error.message
        })
    }
}

//Buscar resortes por Codigo o Calibre
export const getSprings = async (req, res) => {
    try{
        const { codigo, calibre } = req.query;

        const filtros = {};

        if(codigo) filtros.codigo = codigo;
        if(calibre) filtros.calibre = calibre;

        const resultados = await Resortes.find(filtros);

        if(!resultados.length){
            return res.status(404).json({
                messaje: "No se encontraron resortes."
            })
        }

        return res.status(200).json({
            message: "Resortes encontrados",
            data: resultados
        })
    }catch(error){
        return res.status(500).json({
            message: error.message
        })
    }
}

//Actualizar Resorte por ID
export const updateSpringsById = async (req, res) => {
    try{
        const { id } = req.params
        const data = req.body

        const resorte = await Resortes.findByIdAndUpdate(id, data, {new: true})

        if(!resorte){
            return res.status(404).json({
                message: "Resorte no encontrado"
            });
        }

        return res.status(200).json({
            message: "Resorte actualizado",
            resorte
        })
    }catch(error){
        return res.status(500).json({
            messaje: error.message
        })
    }
}

//Eliminar Resorte pr ID
export const deleteSprings = async (req, res) => {
    try{
        const { id } = req.params
        const resorte = await Resortes.findByIdAndDelete(id)

        if(!resorte){
            return res.status(404).json({
                message: "Resorte no encontrado"
            })
        }

        return res.status(200).json({
            message: "Resortes eliminado Exitosamente"
        })
    }catch(error){
        return res.status(500).json({
            message: error.message
        })
    }
}