import {
  queryAllAhorros,
  queryFindAhorro,
  queryCreateAhorro,
  queryUpdateAhorro,
  queryDeleteAhorro
} from "../../db/ahorro/ahorroQueries.js";

const allAhorrosController = async (req, res) => {
  try {
    const ahorros = await queryAllAhorros();
    res.json(ahorros);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los ahorros' });
  }
};

/**
 * Obtener un ahorro por su ID especificado en la URL
 * @param {*} req 
 * @param {*} res 
 */
const findAhorroController = async (req, res) => {
  try {
    const id = req.params.id;
    const ahorro = await queryFindAhorro(id);
    if (!ahorro) {
      return res.status(404).json({ message: 'Ahorro no encontrado' });
    }
    res.json(ahorro);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el ahorro' });
  }
};

/**
 * Crear un nuevo ahorro
 */
const createAhorroController = async (req, res) => {
  try {
    const nuevoAhorro = req.body;
    const resultado = await queryCreateAhorro(nuevoAhorro);
    res.status(201).json({ mensaje: 'Ahorro creado exitosamente', id: resultado.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el ahorro' });
  }
};

/**
 * Actualizar los datos de un ahorro
 */
const updateAhorroController = async (req, res) => {
  try {
    const id = req.params.id;
    const datosAhorro = req.body;
    const resultado = await queryUpdateAhorro(id, datosAhorro);
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ message: 'Ahorro no encontrado' });
    }
    res.json({ mensaje: 'Ahorro actualizado exitosamente', ahorro: resultado });
  } catch (error) {  
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el ahorro' });
  }
};

/**
 * Eliminar un ahorro
 */
const deleteAhorroController = async (req, res) => {
  try {
    const id = req.params.id;
    const resultado = await queryDeleteAhorro(id);
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ message: 'Ahorro no encontrado' });
    }
    res.json({ mensaje: 'Ahorro eliminado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el ahorro' });
  }
};

export {
  allAhorrosController,
  findAhorroController,
  createAhorroController,
  updateAhorroController,
  deleteAhorroController
};