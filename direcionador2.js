function direcionador() {
    var voltar = document.getElementById("voltar")
    voltar.addEventListener('click',volta)
    function volta() {
        window.location = "https://lucastoupitzen.github.io/progressoes/"
    }
}