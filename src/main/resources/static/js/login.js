document.addEventListener("DOMContentLoaded", function (event) {
   wrong.classList.remove("wrong");
});
class User {
    constructor(log, pass) {
        this.login = log;
        this.password = pass;
    }

}

let log = document.querySelector(".textLog");
let pass = document.querySelector(".textPass");
let go = document.getElementById("go");
let wrong =document.getElementById("wrong");

log.addEventListener("input",function (event) {
    wrong.classList.remove("wrong");
});
pass.addEventListener("input",function (event) {
    wrong.classList.remove("wrong");
});

go.addEventListener('click', function (event) {

    let user = new User(log.value, pass.value);

        if (log.value != "" && pass.value != "") {
        var xhr = new XMLHttpRequest();
        var url = "/loger";
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        /*  xhr.addEventListener('redystatechange',function () {
              if (xhr.readyState === 4 && xhr.status === 200) {
                  alert(xhr.response);
                  console.log("OKEY");
              }
          })*/
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                alert("OKEY, vse verno"+xhr.response);
                console.log("OKEY");
                //перейти на страницу игры
                window.location.href = "/game";
            }
            if (xhr.readyState === 4 && xhr.status === 302) {
                alert("pizda, ne verno"+xhr.response);
                console.log("pizda, ne verno");
                wrong.classList.add("wrong");
                //вставить текст, что логин или пароль введен не верно
            }
        };
        var data = JSON.stringify(user);
        xhr.send(data);
    }
})
