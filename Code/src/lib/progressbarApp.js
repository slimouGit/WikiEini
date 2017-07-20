/**
Script animiert den Ladebalken
**/

function animateProgressBar() {
    var elem = document.getElementById("myBar");
    var width = 0;
    var id = setInterval(frame, 30);
    function frame() {
        if (width >= 100) {
            clearInterval(id);
        } else {
            width++;
            elem.style.width = width + '%';
        }
    }
}
