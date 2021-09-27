const dotenv = require("dotenv").config();

const pool = require("./db/init").getPoolInstance();


//Prepared statements
// const query = (parametros) => {
//     name: "Nombre_del_query",
//     text: "Sentencia SQL",
//     values: "Arreglo de valores parametrizados"
//     rowMode: "Array si se desea obtener los resultados como un arreglo, si no, se ignora"
// };

const createPreparedStatementQuery = (namePS, sqlQuery, valuesArray, mode) => ({
    name: namePS,
    text: sqlQuery,
    values: valuesArray,
    rowMode: mode
});



const poolQuery = (sqlQuery) => {

    return new Promise ( (resolve, reject) => {

        pool.connect( async (error_conexion, client, release) => {
    
            if (error_conexion) {
                console.log("hubo un error en la conexion: ", error_conexion.message);
            }
            else {
                    try {
                        const response = await client.query(sqlQuery);
                        resolve(response);
                    } catch (error) {
                        console.log("Hubo error en el query: ", error.message);
                        reject(error.message)
                    } finally {
                        release()
                        pool.end();
                    }
            };
        });
    })

};

// // caso 1: crear un nuevo estudainte
// const addStudentQuery = createPreparedStatementQuery(
//     "newStudent",
//     "INSERT INTO estudiantes (rut, nombre, curso, nivel) values ($1, $2, $3, $4) RETURNING *;",
//     ["8.333.222-8", "Jose Perez", "Solfeo", 1],
//     "array"
//     );

// poolQuery(addStudentQuery)
// .then ((data) => {
//     console.log(data.rows);
// })
// .catch ( (error) => {
//     console.log("No se pudo hacer la consulta: ", error);
// })

// // Caso 2: Consuñtar estudiantes registrados
// const allStudentsQuery = createPreparedStatementQuery(
//     "allStudent",
//     "SELECT * FROM estudiantes;",
//     [],
//     "array"
//     );

// poolQuery(allStudentsQuery)
// .then ((data) => {
//     console.log(data.rows);
// })
// .catch ( (error) => {
//     console.log("No se pudo hacer la consulta: ", error);
// });

// // Caso 3: Consultar estudiante registrado por su rut
// const studentsByRutQuery = createPreparedStatementQuery(
//     "studentByRut",
//     "SELECT * FROM estudiantes WHERE RUT = $1;",
//     ["8.333.222-1"],
//     "array"
//     );

// poolQuery(studentsByRutQuery)
// .then ((data) => {
//     console.log(data.rows);
// })
// .catch ( (error) => {
//     console.log("No se pudo hacer la consulta: ", error);
// });

// // Caso 4: Actualizar información de un estudiante
// const updateStudentQuery = createPreparedStatementQuery(
//     "updateStudentByRut",
//     "UPDATE estudiantes SET nombre = $2, curso = $3, nivel = $4 WHERE rut = $1 RETURNING *",
//     ["8.333.222-2", "Samuel Perez", "Teoría", 2],
//     "array"
//     );

// poolQuery(updateStudentQuery)
// .then ((data) => {
//     console.log(data.rows);
// })
// .catch ( (error) => {
//     console.log("No se pudo hacer la consulta: ", error);
// });

// Caso 5: Eliminar el registro de un estudiante
const deleteStudentQuery = createPreparedStatementQuery(
    "deleteStudentByRut",
    "DELETE FROM estudiantes WHERE rut = $1 RETURNING *",
    ["1r2344"],
    "array"
    );

poolQuery(deleteStudentQuery)
.then ((data) => {
    console.log(data.rows);
})
.catch ( (error) => {
    console.log("No se pudo hacer la consulta: ", error);
});









    