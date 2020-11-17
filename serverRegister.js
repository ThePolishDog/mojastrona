var express = require("express")
var app = express()
var PORT = process.env.PORT || 3000;
const path = require("path");
const e = require("express");
let bool = true;
var bodyParser = require("body-parser");
const { on } = require("process");
const { table } = require("console");
app.use(bodyParser.urlencoded({ extended: true }));
let help = 3;
var logged = 0;
var tab = [
    { id: 0, login: "aniela", password: "421", student: undefined, age: 15, sex: "w" },
    { id: 1, login: "anndy", password: "4951", student: "on", age: 54, sex: "m" },
    { id: 2, login: "tabaluga", password: "tabaluga", student: undefined, age: 16, sex: "m" }
]
app.use(express.static('static'))
app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/main.html"))
})
app.get("/main", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/main.html"))
})

app.get("/register", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/register.html"))

})
app.get("/login", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/login.html"))
})
app.get("/admin", function (req, res) {
    if (logged == 1)
        res.sendFile(path.join(__dirname + "/static/admin.html"))
    else
        res.sendFile(path.join(__dirname + "/static/adminFalse.html"))
})
app.post("/logout", function (req, res) {
    logged = 0;
    res.redirect("/main")
})
app.post("/regForm", function (req, res) {
    for (let i = 0; i < tab.length; i++) {
        if (req.body.login == tab[i].login) {
            bool = false;
            console.log("Rejestracja się nie powiodła")
            res.sendFile(path.join(__dirname + "/static/registerExist.html"))
        }
    }
    if (bool) {
        let user = { id: help, login: req.body.login, password: req.body.password, student: req.body.student, age: req.body.age, sex: req.body.sex }
        tab.push(user)
        help++;
        console.log("Rejestracja się powiodła.")
        console.log(tab)
        res.sendFile(path.join(__dirname + "/static/registernE.html"))
    }
})
app.post("/logForm", function (req, res) {
    for (let i = 0; i < tab.length; i++) {
        if (req.body.login == tab[i].login) {
            if (req.body.password == tab[i].password) {
                logged = 1;
                res.sendFile(path.join(__dirname + "/static/logged.html"))
                i = tab.length
            }
            else {
                console.log("Błędne hasło.")
                i = tab.length
            }
        }
        else {
            console.log("Nie ma takiego loginu.")
        }
    }
    if (logged == 0) {
        res.sendFile(path.join(__dirname + "/static/notLogged.html"))
    }
})
app.post("/show", function (req, res) {
    if (logged == 1) {
        var page = '<body style="background-color: black;"> </body><div style="display: flex;flex-direction: row;"><form action="/sort" method="POST"><a style="font-size: 26px; color: yellow;" href="#" onclick="this.parentNode.submit()">Sort</a></form>'
        page += '<form action="/gender" method="POST"><a style="font-size: 26px; color: yellow; padding-left: 10px; padding-right: 10px" href="#" onclick="this.parentNode.submit()">Gender</a></form>'
        page += '<form action="/show" method="POST"><a style="font-size: 26px; color: yellow;" href="#" onclick="this.parentNode.submit()">Show</a></form></div>'
        page += "<table>"
        for (var i = 0; i < tab.length; i++) {
            page += "<tr>"
            page += "<td style='border: 1px white solid; width: 20vh; color: white;'>" + "Id: " + tab[i].id + "</td>"
            page += "<td style='border: 1px white solid; width: 30vh; color: white;'>" + "User: " + tab[i].login + " - " + tab[i].password + "</td>"
            if (tab[i].student == "on") {
                page += "<td style='border: 1px white solid; width: 20vh; color: white;'>" + "Uczeń: <input type='checkbox' checked disabled>" + "</td>"
            }
            else {
                page += "<td style='border: 1px white solid; width: 20vh; color: white;'>" + "Uczeń: <input type='checkbox' disabled>" + "</td>"
            }
            page += "<td style='border: 1px white solid; width: 20vh; color: white;'>" + "Wiek: " + tab[i].age + "</td>"
            if (tab[i].sex == "w")
                page += "<td style='border: 1px white solid; width: 10vh; color: white;'>" + "Płeć: Kobieta" + "</td>"
            else
                page += "<td style='border: 1px white solid; width: 10vh; color: white;'>" + "Płeć: Mężczyzna" + "</td>"
            page += "</tr>"
        }
        page += "</table>"
        res.send(page)
    }
    else {
        res.sendFile(path.join(__dirname + "/static/adminFalse.html"))
    }
})
app.post("/gender", function (req, res) {
    if (logged == 1) {
        var page = '<body style="background-color: black;"> </body><div style="display: flex;flex-direction: row;"><form action="/sort" method="POST"><a style="font-size: 26px; color: yellow;" href="#" onclick="this.parentNode.submit()">Sort</a></form>'
        page += '<form action="/gender" method="POST"><a style="font-size: 26px; color: yellow;padding-left: 10px; padding-right: 10px" href="#" onclick="this.parentNode.submit()">Gender</a></form>'
        page += '<form action="/show" method="POST"><a style="font-size: 26px; color: yellow;" href="#" onclick="this.parentNode.submit()">Show</a></form></div>'
        man = "<table>"
        woman = "<table>"
        for (var i = 0; i < tab.length; i++) {
            if (tab[i].sex == "m") {
                woman += "<tr><td style='border: 1px white solid; width: 30vh; color: white;'>" + "Id: " + tab[i].id + "</td>"
                woman += "<td style='border: 1px white solid; width: 70vh; color: white;'>" + "Płeć: Mężczyzna" + "</td></tr>"
            }
            else {
                man += "<tr><td style='border: 1px white solid; width: 30vh; color: white;'>" + "Id: " + tab[i].id + "</td>"
                man += "<td style='border: 1px white solid; width: 70vh; color: white;'>" + "Płeć: Kobieta" + "</td></tr>"
            }
        }
        man += "</table><br><br>"
        woman += "</table>"
        page += man + woman
        res.send(page)
    }
    else {
        res.sendFile(path.join(__dirname + "/static/adminFalse.html"))
    }
})
var helpme = 0;
app.post("/sort", function (req, res) {
    if (logged == 1) {
        var page = '<body style="background-color: black;"> </body><div style="display: flex;flex-direction: row; margin:10px"><form action="/sort" method="POST"><a style="font-size: 26px; color: yellow;"href="#" onclick="this.parentNode.submit()">Sort</a></form>'
        page += '<form action="/gender" method="POST"><a style="padding-left: 10px; padding-right: 10px; font-size: 26px; color: yellow;" href="#" onclick="this.parentNode.submit()">Gender</a></form>'
        page += '<form action="/show" method="POST"><a style="font-size: 26px; color: yellow;" href="#" onclick="this.parentNode.submit()">Show</a></form></div>'
        if (req.body.sort == 1)
            helpme = 1
        else
            helpme = 0
        if (helpme == 0) {
            page += '<form onchange="this.submit()" method="POST"><label for="sort" style="color: white;">Sortowanie:</label><br><label for="up"style="color: white;">Rosnąco:</label><input type="radio" value="0" id="option1" name="sort" checked="checked"><label for="down"style="color: white;">Malejąco:</label><input type="radio" value="1" id="option2" name="sort"></form>'
            tab.sort(function (a, b) {
                return a.age - b.age
            })
            page += "<table>"
            for (var i = 0; i < tab.length; i++) {
                page += "<tr>"
                page += "<td style='border: 1px white solid; width: 20vh; color: white;'>" + "Id: " + tab[i].id + "</td>"
                page += "<td style='border: 1px white solid; width: 50vh; color: white;'>" + "User: " + tab[i].login + " - " + tab[i].password + "</td>"
                page += "<td style='border: 1px white solid; width: 30vh; color: white;'>" + "Wiek: " + tab[i].age + "</td></tr>"
            }
            page += "</table>"
        }
        else {
            page += '<form onchange="this.submit()" method="POST"><label for="sort"style="color: white;">Sortowanie:</label><br><label for="up"style="color: white;">Rosnąco:</label><input type="radio" value="0" id="option1" name="sort" required=""><label for="down"style="color: white;">Malejąco:</label><input type="radio" value="1" id="option2" name="sort" checked="checked"></form>'
            tab.sort(function (a, b) {
                return b.age - a.age
            })
            page += "<table>"
            for (var i = 0; i < tab.length; i++) {
                page += "<tr>"
                page += "<td style='border: 1px white solid; width: 20vh; color: white;'>" + "Id: " + tab[i].id + "</td>"
                page += "<td style='border: 1px white solid; width: 50vh;color: white;'>" + "User: " + tab[i].login + " - " + tab[i].password + "</td>"
                page += "<td style='border: 1px white solid; width: 30vh;color: white;'>" + "Wiek: " + tab[i].age + "</td></tr>"
            }
            page += "</table>"
        }
        res.send(page)
    }
    else {
        res.sendFile(path.join(__dirname + "/static/adminFalse.html"))
    }
})
