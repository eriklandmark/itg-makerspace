var FlyingAnimation = (function () {
    function FlyingAnimation(element, startTime, cycleTime) {
        var _this = this;
        this.side = "left";
        this.moveRightID = null;
        this.moveLeftID = null;
        this.item = element;
        startTime *= 1000;
        cycleTime *= 1000;
        setInterval(function () { return _this.interval(startTime); }, cycleTime);
        setInterval(function () {
        }, cycleTime);
        /*window.addEventListener("resize", function () {
            if (this.side == "right") {
                document.getElementById(element).style.left = (window.innerWidth + 20).toString() + "px";
            }
        });*/
        /*window.addEventListener("load", function () {
            setTimeout(function () {
            }, startTime);
        });*/
        this.moveRight();
    }
    FlyingAnimation.prototype.timeout = function () {
        console.log("m " + this.moveRightID);
        if (this.moveRightID == null && this.moveLeftID == null) {
            if (this.side == "left") {
                this.moveRight();
            }
            else if (this.side == "right") {
                this.moveLeft();
            }
        }
    };
    FlyingAnimation.prototype.interval = function (time) {
        var _this = this;
        setTimeout(function () { return _this.timeout(); }, time);
    };
    FlyingAnimation.prototype.moveRight = function () {
        var elem = document.getElementById(this.item);
        console.log(elem.src);
        var rightLimit = window.innerWidth + 20;
        var posX = -(elem.offsetHeight + 100);
        var speed = Math.random() + 1;
        elem.style.top = (Math.floor(Math.random() * (window.innerHeight - elem.offsetHeight - 50)) + 50).toString() + "px";
        if (this.moveLeftID != null) {
            clearInterval(this.moveLeftID);
        }
        console.log(this.moveRightID);
        this.moveRightID = setInterval(frame, 1000 / 120);
        console.log(this.moveRightID);
        function frame() {
            if (posX >= rightLimit) {
                this.side = "right";
                clearInterval(2);
                this.moveRightID = null;
                console.log("hj");
            }
            else {
                posX += speed;
                elem.style.left = posX + 'px';
            }
        }
    };
    FlyingAnimation.prototype.moveLeft = function () {
        var elem = document.getElementById(this.item);
        var leftLimit = -(elem.offsetHeight + 100);
        var posX = window.innerWidth + 20;
        var speed = Math.random() + 1;
        elem.style.top = (Math.floor(Math.random() * (window.innerHeight - elem.offsetHeight - 50)) + 50).toString() + "px";
        if (this.moveRightID != null) {
            clearInterval(this.moveRightID);
        }
        this.moveLeftID = setInterval(frame, 1000 / 120);
        function frame() {
            if (posX <= leftLimit) {
                this.side = "left";
                clearInterval(this.moveLeftID);
                this.moveLeftID = null;
            }
            else {
                posX -= speed;
                elem.style.left = posX + 'px';
            }
        }
    };
    return FlyingAnimation;
}());
window.addEventListener("load", function () {
    var hammer = new FlyingAnimation("hammer", 5, 5);
});
//# sourceMappingURL=flying_objects_animation.js.map