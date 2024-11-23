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
 * Carga la lista de gastos
 */
const queryAllGastos = () => {
    return new Promise((resolve, reject) => {
        config.query('SELECT * FROM gastos', (err, filas) => {
            respuesta(err, filas, resolve, reject);
        });
    });
};

/**
 * Buscar un gasto por su ID (llave primaria)
 */
const queryFindGasto = (id) => {
    return new Promise((resolve, reject) => {
        config.query('SELECT * FROM gastos WHERE id_gasto = ? LIMIT 1', [id], (err, filas) => {
            respuesta(err, filas, resolve, reject);
        });
    });
};

/**
 * Guardar un nuevo gasto
 */
const queryCreateGasto = async (gasto) => {
    const { descripcion, fecha, importe, individuo_id } = gasto;
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO gastos (descripcion, fecha, importe, individuo_id) VALUES (?, ?, ?, ?)';
        config.query(sql, [descripcion, fecha, importe, individuo_id], (err, resultado) => {
            respuesta(err, resultado, resolve, reject);
        });
    });
};

/**
 * Actualizar un gasto por su ID
 */
const queryUpdateGasto = (id, gasto) => {
    const { descripcion, fecha, importe, individuo_id } = gasto;
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE gastos SET descripcion = ?, fecha = ?, importe = ?, individuo_id = ? WHERE id_gasto = ?';
        config.query(sql, [descripcion, fecha, importe, individuo_id, id], (err, resultado) => {
            respuesta(err, resultado, resolve, reject);
        });
    });
};

/**
 * Eliminar un gasto por su ID
 */
const queryDeleteGasto = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM gastos WHERE id_gasto = ?';
        config.query(sql, [id], (err, resultado) => {
            respuesta(err, resultado, resolve, reject);
        });
    });
};

// Exportar todas las funciones definidas en este archivo
export {
    queryAllGastos,
    queryFindGasto,
    queryCreateGasto,
    queryUpdateGasto,
    queryDeleteGasto
};