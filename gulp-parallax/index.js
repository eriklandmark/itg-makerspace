/** Created by eriklandmark on 2017-01-27. */

/*var scene = document.getElementById('scene');
var parallax = new Parallax(scene, {
    calibrateX: false,
    calibrateY: true,
    invertX: false,
    invertY: true,
    limitX: false,
    limitY: 10,
    scalarX: 2,
    scalarY: 8,
    frictionX: 0.2,
    frictionY: 0.8,
    originX: 0.0,
    originY: 1.0
});*/

parallax.enable();

if (window.matchMedia("(min-width: 737px)and (min-device-width: 737px)and (-webkit-min-device-pixel-ratio: 1)").matches) {
    window.addEventListener("mousemove", movepictures, false);
}

window.addEventListener("load", function () {
    var deadline = 'Februari 23 2017 15:00:00 GMT+0100';
    initializeClock('tid_till_nästa_möte', deadline);
});

function movepictures(e) {
    //parralax(e, "content", 0.02);
    parralax(e, "arduino_logo", 0.13);
    parralax(e, "pi_logo", 0.1);
    parralax(e, "itg_logo", 0.04);
    parralax(e, "printer", 0.05);
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
