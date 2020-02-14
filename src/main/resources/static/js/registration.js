document.addEventListener("DOMContentLoaded", function (event) {
    redCrest.classList.remove("redCrest");
    redCrestSecond.classList.remove("redCrestSecond");
    exist.classList.remove("exist");
    okeyReg.classList.remove("okeyReg");
});

class Registrator {
    constructor(email, login, password) {
        this.email = email;
        this.login = login;
        this.password = password;
    }
}

var email = document.getElementById("postEmail");
var login = document.getElementById("postLog");
var password = document.getElementById("postPass");
var passwordRepeat = document.getElementById("postRepeatPass");
var buttonReg = document.getElementById("register");
var redCrest = document.getElementById("redCrest");
var redCrestSecond = document.getElementById("redCrestSecond");
var exist=document.getElementById("exist");
var okeyReg=document.getElementById("okeyReg");

email.addEventListener("input",function (event) {
    exist.classList.remove("exist");
});

login.addEventListener("input",function (event) {
    exist.classList.remove("exist");
});

password.addEventListener("input", function (event) {
    if (password.value != passwordRepeat.value) {
        if (redCrest.classList.contains("redCrest")) {
        } else {
            redCrest.classList.add("redCrest");
            redCrestSecond.classList.add("redCrestSecond");
        }
    } else {
        redCrest.classList.remove("redCrest");
        redCrestSecond.classList.remove("redCrestSecond");
    }
})

passwordRepeat.addEventListener("input", function (event) {
    if (password.value != passwordRepeat.value) {
        if (redCrestSecond.classList.contains("redCrestSecond")) {
        } else {
            redCrest.classList.add("redCrest");
            redCrestSecond.classList.add("redCrestSecond");
        }
    } else {
        redCrest.classList.remove("redCrest");
        redCrestSecond.classList.remove("redCrestSecond");
    }
})

buttonReg.addEventListener("click", function (event) {
    var registrator = new Registrator(email.value, login.value, password.value);

    if (password.value == passwordRepeat.value && password.value!="" && login.value!="" && email.value!="") {
        console.log(JSON.stringify(registrator));
        var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
        xmlhttp.open("POST", "/registrator");
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                alert("all is ok, user entered in database" + xmlhttp.response);
                console.log("OKEY");
                okeyReg.classList.add("okeyReg");
            }
            if (xmlhttp.readyState === 4 && xmlhttp.status === 302) {
                alert("pizda, login or email contain in database"+ xmlhttp.response);
                console.log("pizda, login or email contain in database");
                exist.classList.add("exist");
                okeyReg.classList.remove("okeyReg");
            }
        };
        xmlhttp.send(JSON.stringify(registrator));
    }
})