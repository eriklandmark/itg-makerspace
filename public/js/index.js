/** Created by eriklandmark on 2017-01-27. */

var hammerSide = true;
var moveRightID = null;
var moveLeftID = null;

window.addEventListener("load", function () {
    var deadline = 'Februari 23 2017 15:00:00 GMT+0100';
    initializeClock('tid_till_nästa_möte', deadline);

    setTimeout(function () {
        moveHammerRight()
    }, 5000);
});

window.addEventListener("resize", function (event) {
    if (hammerSide) {
        console.log("hej");
    } else {
        document.getElementById("hammer").style.left = (window.innerWidth + 20).toString() + "px";
    }
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

int = setInterval(function () {
    setTimeout(function () {
        if(moveRightID == null && moveLeftID == null) {
            if (hammerSide) {
                moveHammerRight();
            } else {
                moveHammerLeft();
            }
        }
    }, 5000);
}, 55000);

function moveHammerRight() {
    var elem = document.getElementById("hammer");
    var rightLimit = window.innerWidth + 20;
    var posX = -(elem.offsetHeight + 100);
    var speed = Math.random() + 1;
    elem.style.top = (Math.floor(Math.random() * (window.innerHeight - elem.offsetHeight - 50)) + 50).toString() + "px";
    if(moveLeftID != null) {
        clearInterval(moveLeftID);
    }
    moveRightID = setInterval(frame, 1000/120);
    function frame() {
        if (posX >= rightLimit) {
            hammerSide = false;
            clearInterval(moveRightID);
            moveRightID = null;
        } else {
            posX += speed;
            elem.style.left = posX + 'px';
        }
    }
}

function moveHammerLeft() {
    var elem = document.getElementById("hammer");
    var leftLimit = -(elem.offsetHeight + 100);
    var posX = window.innerWidth + 20;
    var speed = Math.random() + 1;
    elem.style.top = (Math.floor(Math.random() * (window.innerHeight - elem.offsetHeight - 50)) + 50).toString() + "px";
    if(moveRightID != null) {
        clearInterval(moveRightID);
    }
    moveLeftID = setInterval(frame, 1000/120);
    function frame() {
        if (posX <= leftLimit) {
            hammerSide = true;
            clearInterval(moveLeftID);
            moveLeftID = null;
        } else {
            posX -= speed;
            elem.style.left = posX + 'px';
        }
    }
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
