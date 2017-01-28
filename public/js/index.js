/**
 * Created by eriklandmark on 2017-01-27.
 */
window.addEventListener("mousemove", movepictures, false);
function movepictures(e) {
    parralax(e, "content", 0.02);
    parralax(e, "pi_logo", 0.05);
    parralax(e, "arduino_logo", 0.09);
    parralax(e, "itg_logo", 0.04);
    parralax(e, "printer", 0.03);
}
function parralax(e, element, friction) {
    var posX = (e.clientX * -friction) / 2.0;
    var posY = (e.clientY * -friction) / 2.0;
    document.getElementById(element).style.transform = 'translate(' + posX + 'px, ' + posY + 'px)';
}
