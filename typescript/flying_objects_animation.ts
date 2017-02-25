window.addEventListener("load", function () {
    let hammer:FlyingAnimation = new FlyingAnimation("hammer", "left", 5, 45);
    let nails:FlyingAnimation = new FlyingAnimation("nails", "left", 10, 30);
    let wrench:FlyingAnimation = new FlyingAnimation("wrench", "right", 7, 60);
});

class FlyingAnimation {

    side: string = "left";
    moveRightID: number = null;
    moveLeftID: number = null;
    item: string;
    isPaused: boolean = false;

    constructor (element: string, side: string, startTime: number, cycleTime: number) {
        this.item = element;
        startTime *= 1000;
        cycleTime *= 1000;
        this.side = side;

        setInterval(() => {
            if(this.moveRightID == null && this.moveLeftID == null) {
                if (this.side == "left") {
                    this.moveRight();
                } else if (this.side == "right"){
                    this.moveLeft();
                }
            }
        }, cycleTime);

        window.addEventListener("resize", () => {
            if (this.side == "right") {
                document.getElementById(element).style.left = (window.innerWidth + 20).toString() + "px";
            }
        });

        setTimeout(() => {
            if (this.side == "left") {
                this.moveRight();
            } else if (this.side == "right"){
                this.moveLeft();
            }
        }, startTime);
    }

    moveRight() {
        let elem = <HTMLImageElement> document.getElementById(this.item);
        let posX = -(elem.offsetHeight + 200);
        let speed = Math.random() + 1.5;
        elem.style.top = (Math.floor(Math.random() * (window.innerHeight - elem.offsetHeight - 50)) + 50).toString() + "px";
        if(this.moveLeftID != null) {
            window.cancelAnimationFrame(this.moveLeftID);
        }

        this.moveRightID = window.requestAnimationFrame(() => mr());

        function mr() {
            if (posX >= window.innerWidth - 60) {
                this.side = "right";
                window.cancelAnimationFrame(this.moveRightID);
                this.moveRightID = null;
            } else {
                posX += speed;
                elem.style.left = posX + 'px';
                window.requestAnimationFrame(mr);
            }
        }
    }

    moveLeft() {
        let elem = <HTMLImageElement> document.getElementById(this.item);
        let leftLimit = -(elem.offsetHeight + 200);
        let posX = window.innerWidth + 40;
        let speed = Math.random() + 1.5;
        elem.style.top = (Math.floor(Math.random() * (window.innerHeight - elem.offsetHeight - 50)) + 50).toString() + "px";
        if(this.moveRightID != null) {
            cancelAnimationFrame(this.moveRightID);
        }

        this.moveLeftID = window.requestAnimationFrame(() => ml());

        function ml() {
            if (posX <= leftLimit) {
                this.side = "left";
                cancelAnimationFrame(this.moveLeftID);
                this.moveLeftID = null;
            } else {
                posX -= speed;
                elem.style.left = posX + 'px';
                window.requestAnimationFrame(ml);
            }
        }
    }
}
