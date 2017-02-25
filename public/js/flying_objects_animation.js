window.addEventListener("load", function () {
    var hammer = new FlyingAnimation("hammer", "left", 5, 45);
    var nails = new FlyingAnimation("nails", "left", 10, 30);
    var wrench = new FlyingAnimation("wrench", "right", 7, 60);
});
var FlyingAnimation = (function () {
    function FlyingAnimation(element, side, startTime, cycleTime) {
        var _this = this;
        this.side = "left";
        this.moveRightID = null;
        this.moveLeftID = null;
        this.isPaused = false;
        this.item = element;
        startTime *= 1000;
        cycleTime *= 1000;
        this.side = side;
        setInterval(function () {
            if (_this.moveRightID == null && _this.moveLeftID == null) {
                if (_this.side == "left") {
                    _this.moveRight();
                }
                else if (_this.side == "right") {
                    _this.moveLeft();
                }
            }
        }, cycleTime);
        window.addEventListener("resize", function () {
            if (_this.side == "right") {
                document.getElementById(element).style.left = (window.innerWidth + 20).toString() + "px";
            }
        });
        setTimeout(function () {
            if (_this.side == "left") {
                _this.moveRight();
            }
            else if (_this.side == "right") {
                _this.moveLeft();
            }
        }, startTime);
    }
    FlyingAnimation.prototype.moveRight = function () {
        var elem = document.getElementById(this.item);
        var posX = -(elem.offsetHeight + 200);
        var speed = Math.random() + 1.5;
        elem.style.top = (Math.floor(Math.random() * (window.innerHeight - elem.offsetHeight - 50)) + 50).toString() + "px";
        if (this.moveLeftID != null) {
            window.cancelAnimationFrame(this.moveLeftID);
        }
        this.moveRightID = window.requestAnimationFrame(function () { return mr(); });
        function mr() {
            if (posX >= window.innerWidth - 60) {
                this.side = "right";
                window.cancelAnimationFrame(this.moveRightID);
                this.moveRightID = null;
            }
            else {
                posX += speed;
                elem.style.left = posX + 'px';
                window.requestAnimationFrame(mr);
            }
        }
    };
    FlyingAnimation.prototype.moveLeft = function () {
        var elem = document.getElementById(this.item);
        var leftLimit = -(elem.offsetHeight + 200);
        var posX = window.innerWidth + 40;
        var speed = Math.random() + 1.5;
        elem.style.top = (Math.floor(Math.random() * (window.innerHeight - elem.offsetHeight - 50)) + 50).toString() + "px";
        if (this.moveRightID != null) {
            cancelAnimationFrame(this.moveRightID);
        }
        this.moveLeftID = window.requestAnimationFrame(function () { return ml(); });
        function ml() {
            if (posX <= leftLimit) {
                this.side = "left";
                cancelAnimationFrame(this.moveLeftID);
                this.moveLeftID = null;
            }
            else {
                posX -= speed;
                elem.style.left = posX + 'px';
                window.requestAnimationFrame(ml);
            }
        }
    };
    return FlyingAnimation;
}());
//# sourceMappingURL=flying_objects_animation.js.map