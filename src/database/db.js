// importar dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose()

// criar o objeto q fará opracoes no bd
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db
// // utilizar o objeto do banco de dados para nossas operacoes
// // db.serialize( () => {
// // //     // com comandos SQL vamos:

// // //     // 1 criar uma tabela 
// // //     db.run(`
// // //         CREATE TABLE IF NOT EXISTS places (
// // //             id INTEGER PRIMARY KEY AUTOINCREMENT,
// // //             image TEXT,
// // //             name TEXT,
// // //             adress TEXT,
// // //             adress2 TEXT,
// // //             state TEXT,
// // //             city TEXT,
// // //             items TEXT
// // //         );
// // //     `)

// //     // 2 inserir dados na tabela 
// //     const query = `
// //         INSERT INTO places (
// //             image,
// //             name,
// //             adress,
// //             adress2,
// //             state,
// //             city,
// //             items
// //         ) VALUES (?,?,?,?,?,?,?);
// //     `
// //     const values = [
// //         "https://images.unsplash.com/photo-1587916849729-61978d3f0601?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1266&q=80",
// //         "Colectoria",
// //         "Guilherme de Gemballa, Jardim América",
// //         "Nº 260",
// //         "Santa Catarina",
// //         "Rio do Sul"
// //     ]

// //     const afterIsertData = function(err) {
// //         if (err) {
// //             return console.log(err)
// //         }

// //         console.log("Cadastrado com sucesso!")
// //         console.log(this)
// //     }

// //     db.run(query, values, afterIsertData) 

    // 3 consultar os dados na tabela
    // db.all(`SELECT * FROM places`, function(err, rows) {
    //     if (err) {
    //         console.log(err)
    //     }

    //     console.log("Aqui estão seus registros: ")
    //     console.log(rows)
    // })

//     // // 4 deletar um dado da tabela
//     db.run("DELETE FROM places WHERE id=?", [21], function(err) {
//         if (err) {
//             console.log(err)
//         }

//         console.log("Registro deletado com sucesso!")
//     })

// // })