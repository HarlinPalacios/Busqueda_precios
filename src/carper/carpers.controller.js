import { mongoose } from "mongoose";
import Resortes from "../springs/springs.model.js";
import Carpeta from "../carper/carpers.model.js"
import Springs from "../springs/springs.model.js";

export const createCarpeta = async (req, res) => {
  try {
    const { carpeta } = req.body;
 
    if (!carpeta) {
      return res.status(400).json({ message: "El nombre es requerido" });
    }

    const carpetaExistente = await Carpeta.findOne({ carpeta });
    if (carpetaExistente) {
      return res.status(409).json({ message: "Ya existe una carpeta con ese nombre" });
    }

    const nuevaCarpeta = new Carpeta({ carpeta });
    await nuevaCarpeta.save();

    return res.status(201).json({
      message: "Carpeta creada exitosamente",
      carpeta: nuevaCarpeta,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al crear la carpeta",
      error: error.message,
    });
  }
};

// Listar todas las carpetas
export const getCarpetas = async (req, res) => {
  try {
    const carpetas = await Carpeta.find({}, { carpeta: 1 });
    res.status(200).json(carpetas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener carpetas" });
  }
};

// Obtener resortes por carpeta
export const getSpringsByCarpeta = async (req, res) => {
  try {
    const { carpetaId } = req.params;

    // Asegúrate de convertir el ID a ObjectId
    const objectId = new mongoose.Types.ObjectId(carpetaId);

    const resortes = await Resortes.find({ carpeta: objectId });

    return res.status(200).json(resortes);
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener resortes por carpeta",
      error: error.message,
    });
  }
};

// Eliminar carpeta por ID
export const deleteCarpeta = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    // Buscar carpeta
    const carpeta = await Carpeta.findById(id);

    if (!carpeta) {
      return res.status(404).json({
        message: "Carpeta no encontrada",
      });
    }

    // Eliminar carpeta
    await Carpeta.findByIdAndDelete(id);

    // 🔥 Eliminar resortes asociados a la carpeta
    await Springs.deleteMany({ carpeta: id });

    return res.status(200).json({
      message: "Carpeta eliminada",
    });
  } catch (error) {
    console.error("Error eliminando carpeta y resortes:", error);
    return res.status(500).json({
      message: error.message,
    });
  }
};
