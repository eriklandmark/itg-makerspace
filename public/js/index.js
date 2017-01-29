/** Created by eriklandmark on 2017-01-27. */
if (window.matchMedia("(min-width: 737px)and (min-device-width: 737px)and (-webkit-min-device-pixel-ratio: 1)").matches) {
    console.log("Is Desktop..");
    window.addEventListener("mousemove", movepictures, false);
}
window.addEventListener("load", function () {
    var deadline = 'Februari 1 2017 15:00:00 GMT+0100';
    initializeClock('tid_till_nästa_möte', deadline);
});
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
function initializeClock(id, endtime) {
    var clock = document.getElementById(id);
    var timeinterval = setInterval(function () {
        var t = getTimeRemaining(endtime);
        clock.innerHTML = 'om ' + t.days + ' dag(ar), ' +
            t.hours + ' timmar, ' +
            t.minutes + ' minuter och ' +
            t.seconds + " sekunder.";
        if (t.total <= 0) {
            clearInterval(timeinterval);
        }
    }, 1000);
}
function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date().toString());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}
