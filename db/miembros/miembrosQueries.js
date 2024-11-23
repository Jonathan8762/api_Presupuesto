import config from '../../config.js';

// Función que ayuda a manejar la respuesta de la base de datos
const respuesta = (err, result, resolve, reject) => {
    if (err) {
        console.log(err);
        reject(err);
    } else {
        resolve(result);
    }
};

/**
 * Carga la lista de miembros
 */
const queryAllMiembros = () => {
    return new Promise((resolve, reject) => {
        config.query('SELECT * FROM miembros', (err, filas) => {
            respuesta(err, filas, resolve, reject);
        });
    });
};

/**
 * Buscar un miembro por su ID (llave primaria)
 */
const queryFindMiembro = (id) => {
    return new Promise((resolve, reject) => {
        config.query('SELECT * FROM miembros WHERE id_individuo = ? LIMIT 1', [id], (err, filas) => {
            respuesta(err, filas, resolve, reject);
        });
    });
};

/**
 * Guardar un nuevo miembro
 */
const queryCreateMiembro = async (miembro) => {
    const { nombre, apellido, fecha_nacimiento, ingreso_mensual, ocupacion, familia } = miembro;
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO miembros (nombre, apellido, fecha_nacimiento, ingreso_mensual, ocupacion, familia) VALUES (?, ?, ?, ?, ?, ?)';
        config.query(sql, [nombre, apellido, fecha_nacimiento, ingreso_mensual, ocupacion, familia], (err, resultado) => {
            respuesta(err, resultado, resolve, reject);
        });
    });
};

/**
 * Actualizar un miembro por su ID
 */
const queryUpdateMiembro = (id, miembro) => {
    const { nombre, apellido, fecha_nacimiento, ingreso_mensual, ocupacion, familia } = miembro;
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE miembros SET nombre = ?, apellido = ?, fecha_nacimiento = ?, ingreso_mensual = ?, ocupacion = ?, familia = ? WHERE id_individuo = ?';
        config.query(sql, [nombre, apellido, fecha_nacimiento, ingreso_mensual, ocupacion, familia, id], (err, resultado) => {
            respuesta(err, resultado, resolve, reject);
        });
    });
};

/**
 * Eliminar un miembro por su ID
 */
const queryDeleteMiembro = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM miembros WHERE id_individuo = ?';
        config.query(sql, [id], (err, resultado) => {
            respuesta(err, resultado, resolve, reject);
        });
    });
};

// Exportar todas las funciones definidas en este archivo
export {
    queryAllMiembros,
    queryFindMiembro,
    queryCreateMiembro,
    queryUpdateMiembro,
    queryDeleteMiembro
};
