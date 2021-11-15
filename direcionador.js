function direcionador() {
    var direcionadorPA = document.getElementById("PA")
    var direcionadorPG = document.getElementById("PG")
    var voltar = document.getElementById("voltar")
    direcionadorPA.addEventListener('click',clicarPA)
    direcionadorPG.addEventListener('click',clicarPG)
    voltar.addEventListener('click',volta)
    function clicarPA() {
        window.location = "https://lucastoupitzen.github.io/progressoes/progre_pa.html"
    }
    function clicarPG() {
        window.location = "https://lucastoupitzen.github.io/progressoes/progre_pg.html"
    }
    function volta() {
        window.location = "file:///Users/lucasferracin/Programação/progressoes/index.html"
    }
}
