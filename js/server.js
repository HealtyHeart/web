const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();
app.use(express.static(__dirname));
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "testdb"
});

db.connect(err => {
    if (err) throw err;
    console.log("Conectado a la base de datos MySQL.");
});

app.post("/save-note", (req, res) => {
    const { content } = req.body;
    const query = "INSERT INTO notas (contenido) VALUES (?)";
    db.query(query, [content], (err, result) => {
        if (err) throw err;
        res.sendStatus(200);
    });
});

app.get("/get-notes", (req, res) => {
    const query = "SELECT * FROM notas ORDER BY fecha_hora DESC";
    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
