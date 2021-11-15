function direcionador() {
    var voltar = document.getElementById("voltar")
    voltar.addEventListener('click',volta)
    function volta() {
        window.location = "file:///Users/lucasferracin/Programação/progressoes/index.html"
    }
}