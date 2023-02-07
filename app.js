const express = require('express');
const cors = require("cors")
const app = express();
app.set("views", "views");
app.set("view engine", "ejs");
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));



const getResult = (angka, t) => {

    const plusZero = function (lg) {
        if (lg == 0) {
            return 0;
        }
        else {
            let output = "";
            for (let i = 1; i <= lg; i++) {
                output += "0";
            }
            return output;
        }
    }

    let resp = "";
    if (t == "biasa") {
        resp = "0\n";
        let dd = [];

        for (let i = 1; i <= angka; i++) {
            if (angka % i == 0) {
                dd.push(i);
            }
        }

        for (let j = 1; j <= 10; j++) {
            const nn = dd[j] + plusZero(j);
            if (parseInt(nn) < parseInt(angka) && nn.length != angka.length) {
                resp += nn.toString() + "\n";
            }
        }
        resp += angka;
    }
    else if (t == "ganjil") {
        for (let idx = 0; idx <= angka; idx++) {
            resp += (idx % 2) ? idx.toString() + "\n" : "";
        }
    }
    else if (t == "prima") {
        resp = "";
        let prima = [];
        for (let i = 1; i <= angka; i++) {
            if (angka % i == 0) {
                prima.push(i);
            }
        }
        for (let i = 0; i < prima.length; i++) {
            resp += prima[i] + "\n";
        }

    }
    return resp;
}


app.get("/", (req, res) => {
    res.render('index');
});

app.post("/get-result", (req, res) => {
    const { angka, type } = req.body;
    let msg = "";
    let result = null;

    if (angka && type) {
        if (type == "ganjil" && angka.length > 4) {
            result = 0;
            msg = "Gagal, Generate angka ganjil maksimal angka >= 1000";
        }
        else {
            result = getResult(angka, type);
        }
    }
    res.json({
        data: result,
        message: msg
    })
})




const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log("Server started for port: " + PORT))