import {
    queryAllGastos,
    queryFindGasto,
    queryCreateGasto,
    queryUpdateGasto,
    queryDeleteGasto
} from "../../db/gastos/gastosQueries.js";

const allGastosController = async (req, res) => {
    try {
        const gastos = await queryAllGastos();
        res.json(gastos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los gastos' });
    }
};

/**
 * Obtener un gasto por su ID especificado en la URL
 * @param {*} req 
 * @param {*} res 
 */
const findGastoController = async (req, res) => {
    try {
        const id = req.params.id;
        const gasto = await queryFindGasto(id);
        if (!gasto) {
            return res.status(404).json({ message: 'Gasto no encontrado' });
        }
        res.json(gasto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el gasto' });
    }
};

/**
 * Crear un nuevo gasto
 */
const createGastoController = async (req, res) => {
    try {
        const nuevoGasto = req.body;
        const resultado = await queryCreateGasto(nuevoGasto);
        res.status(201).json({ mensaje: 'Gasto creado exitosamente', id: resultado.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el gasto' });
    }
};

/**
 * Actualizar los datos de un gasto
 */
const updateGastoController = async (req, res) => {
    try {
        const id = req.params.id;
        const datosGasto = req.body;
        const resultado = await queryUpdateGasto(id, datosGasto);
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ message: 'Gasto no encontrado' });
        }
        res.json({ mensaje: 'Gasto actualizado exitosamente', gasto: resultado });
    } catch (error) { 
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el gasto' });
    }
};

/**
 * Eliminar un gasto
 */
const deleteGastoController = async (req, res) => {
    try {
        const id = req.params.id;
        const resultado = await queryDeleteGasto(id);
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ message: 'Gasto no encontrado' });
        }
        res.json({ mensaje: 'Gasto eliminado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el gasto' });
    }
};

export {
    allGastosController,
    findGastoController,
    createGastoController,
    updateGastoController,
    deleteGastoController
};