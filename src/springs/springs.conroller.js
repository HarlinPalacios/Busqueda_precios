import Resortes from './springs.model.js';

// Controlador para crear el resorte
export const createSprings = async (req, res) => {
  try {
    const {
      carpeta,
      codigo,
      calibre,
      tipo_resorte,
      dia_externo,
      dia_interno,
      largo,
      largo_argolla,
      tipo_acero,
      fecha_venta,
      costo,
    } = req.body;

    const imagen = req.file ? `/uploads/${req.file.filename}` : null;

     const normalize = (value) =>
      typeof value === "string" ? value.replace(/\s/g, "").toLowerCase() : value;

    const codigoExistente = await Resortes.findOne({ codigo: normalize(codigo) });

    if (codigoExistente) {
      return res.status(400).json({
        message: "Ya existe un resorte con este código. Cámbialo para continuar.",
      });
    }

    const resorte = new Resortes({
      carpeta,
      codigo,
      calibre,
      tipo_resorte,
      dia_externo,
      dia_interno,
      largo,
      largo_argolla,
      tipo_acero,
      fecha_venta,
      costo,
      imagen,
    });

    await resorte.save();

    res.status(201).json({
      message: "Resorte creado exitosamente",
      useDetails: {
        carpeta,
        codigo: resorte.codigo,
        calibre: resorte.calibre,
        tipo_resorte: resorte.tipo_resorte,
        tipo_acero: resorte.tipo_acero,
        dia_externo: resorte.dia_externo,
        dia_interno: resorte.dia_interno,
        largo: resorte.largo,
        largo_argolla: resorte.largo_argolla,
        fecha_venta: resorte.fecha_venta,
        costo: resorte.costo,
        imagen: resorte.imagen,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al crear el resorte",
      error: error.message,
    });
  }
};

//Buscar resortes por Codigo o Calibre
export const getSprings = async (req, res) => {
  try {
    const { codigo, calibre, carpeta } = req.query;

    const filtros = {};

    if (carpeta) filtros.carpeta = carpeta;
    if (codigo) filtros.codigo = codigo;
    if (calibre) filtros.calibre = calibre;

    const resultados = await Resortes.find(filtros);

    if (!resultados.length) {
      return res.status(404).json({
        messaje: "No se encontraron resortes."
      });
    }

    return res.status(200).json({
      message: "Resortes encontrados",
      data: resultados
    });
  } catch(error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

//Actualizar Resorte por ID
export const updateSpringsById = async (req, res) => {
    try {
        const { id } = req.params
        let data = req.body

        // Si hay archivo nuevo, reemplazar el campo imagen
        if (req.file) {
            data.imagen = `/uploads/${req.file.filename}`;
        }

        const resorte = await Resortes.findByIdAndUpdate(id, data, { new: true })

        if (!resorte) {
            return res.status(404).json({ message: "Resorte no encontrado" });
        }

        return res.status(200).json({
            message: "Resorte actualizado",
            resorte
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
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