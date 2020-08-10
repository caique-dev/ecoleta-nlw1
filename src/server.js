const 
    express = require("express")
    server = express()

const db = require("./database/db.js")

// configurar pasta publica
server.use(express.static("public"))

// habilitando o uso do req.body
server.use(express.urlencoded({extended: true}))

// utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views",  {
    express: server,
    noCache: true
})

// configurar caminhos da aplicacao
// página inicial 
server.get("/", (req, res) => { // req = requisicao/pedido | res = resposta
    return res.render("index.html")
})

// create point
server.get("/create-point", (req, res) => {

    // req.query = parâmetros da url - PHP
    // console.log(req.query)

    return res.render("create-point.html" )
})

// envio dos dados
server.post("/savepoint", (req, res) => {
    
    // req.body: corpo do formulario
    console.log(req.body)

    // inserir dados no bd
    const query = `
        INSERT INTO places (
            image,
            name,
            adress,
            adress2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `
    const values = [
        req.body.image,
        req.body.name,
        req.body.adress,
        req.body.adress2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    const afterIsertData = function(err) {
        if (err) {
            console.log(err)
            return res.send("Erro no cadastro!")
        }

        console.log("Cadastrado com sucesso!")
        console.log(this)

        return res.render("create-point.html", { saved: true })
    }

    db.run(query, values, afterIsertData)

})

// serch results
server.get("/search", (req, res) => { 
    
    const search = req.query.search

    if (search == "") {
        return res.render("search-results.html", { total: 0 })
    }

    // pegar os dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if (err) {
            console.log(err)
        }

        const total = rows.length

        // mostrar a página HTML com os dados do banco de dados
        return res.render("search-results.html", { places: rows, total })
    })

    
})

// ligar o servidor
server.listen(3000)