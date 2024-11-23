import {
    queryAllMiembros,
    queryFindMiembro,
    queryCreateMiembro,
    queryUpdateMiembro,
    queryDeleteMiembro
} from "../../db/miembros/miembrosQueries.js";

const allMiembrosController = async (req, res) => {
    try {
        const miembros = await queryAllMiembros();
        res.json(miembros);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al buscar los miembros' });
    }
};

/**
 * Obtener un miembro por su ID especificado en la URL
 * @param {*} req 
 * @param {*} res 
 */
const findMiembroController = async (req, res) => {
    try {
        const id = req.params.id;
        const miembro = await queryFindMiembro(id);
        if (!miembro) {
            return res.status(404).json({ message: 'Miembro no encontrado' });
        }
        res.json(miembro);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al encontrar al miembro' });
    }
};

/**
 * Crear un nuevo miembro
 */
const createMiembroController = async (req, res) => {
    try {
        const nuevoMiembro = req.body;
        const resultado = await queryCreateMiembro(nuevoMiembro);
        res.status(201).json({ mensaje: 'Miembro creado exitosamente', id: resultado.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el miembro' });
    }
};

/**
 * Actualizar los datos de un miembro
 */
const updateMiembroController = async (req, res) => {
    try {
        const id = req.params.id;
        const datosMiembro = req.body;
        const resultado = await queryUpdateMiembro(id, datosMiembro);
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ message: 'Miembro no encontrado' });
        }
        res.json({ mensaje: 'Miembro actualizado exitosamente', miembro: resultado });
    } catch (error) { 
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el miembro' });
    }
};

/**
 * Eliminar un miembro
 */
const deleteMiembroController = async (req, res) => {
    try {
        const id = req.params.id;
        const resultado = await queryDeleteMiembro(id);
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ message: 'Miembro de la familia no encontrado' });
        }
        res.json({ mensaje: 'Miembro eliminado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar' });
    }
};

export {
    allMiembrosController,
    findMiembroController,
    createMiembroController,
    updateMiembroController,
    deleteMiembroController
};
