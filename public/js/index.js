/** Created by eriklandmark on 2017-01-27. */

window.addEventListener("load", function () {
    var deadline = 'Februari 23 2017 15:00:00 GMT+0100';
    initializeClock('tid_till_nästa_möte', deadline);
});

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
    return {
        'total': t,
        'days': Math.floor(t / (1000 * 60 * 60 * 24)),
        'hours': Math.floor((t / (1000 * 60 * 60)) % 24),
        'minutes': Math.floor((t / 1000 / 60) % 60),
        'seconds': Math.floor((t / 1000) % 60)
    };
}
