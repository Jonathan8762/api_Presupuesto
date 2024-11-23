import config from '../../config.js';

// Funcion que ayuda a manejar la respuesta de la base de datos
const respuesta = (err, result, resolve, reject) => {
    if (err) {
        console.log(err);
        reject(err);
    } else {
        resolve(result);
    }
};

/**
 * Carga la lista de ahorros
 */
const queryAllAhorros = () => {
    return new Promise((resolve, reject) => {
        config.query('SELECT * FROM ahorro', (err, filas) => {
            respuesta(err, filas, resolve, reject);
        });
    });
};

/**
 * Buscar un ahorro por su ID (llave primaria)
 */
const queryFindAhorro = (id) => {
    return new Promise((resolve, reject) => {
        config.query('SELECT * FROM ahorro WHERE id_ahorro = ? LIMIT 1', [id], (err, filas) => {
            respuesta(err, filas, resolve, reject);
        });
    });
};

/**
 * Guardar un nuevo ahorro
 */
const queryCreateAhorro = async (ahorro) => {
    const { descripcion, fecha, importe, individuo_id } = ahorro;
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO ahorro (descripcion, fecha, importe, individuo_id) VALUES (?, ?, ?, ?)';
        config.query(sql, [descripcion, fecha, importe, individuo_id], (err, resultado) => {
            respuesta(err, resultado, resolve, reject);
        });
    });
};

/**
 * Actualizar un ahorro por su ID
 */
const queryUpdateAhorro = (id, ahorro) => {
    const { descripcion, fecha, importe, individuo_id } = ahorro;
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE ahorro SET descripcion = ?, fecha = ?, importe = ?, individuo_id = ? WHERE id_ahorro = ?';
        config.query(sql, [descripcion, fecha, importe, individuo_id, id], (err, resultado) => {
            respuesta(err, resultado, resolve, reject);
        });
    });
};

/**
 * Eliminar un ahorro por su ID
 */
const queryDeleteAhorro = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM ahorro WHERE id_ahorro = ?';
        config.query(sql, [id], (err, resultado) => {
            respuesta(err, resultado, resolve, reject);
        });
    });
};

// Exportar todas las funciones definidas en este archivo
export {
    queryAllAhorros,
    queryFindAhorro,
    queryCreateAhorro,
    queryUpdateAhorro,
    queryDeleteAhorro
};