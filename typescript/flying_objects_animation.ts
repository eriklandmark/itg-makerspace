class FlyingAnimation {

    side: string = "left";
    moveRightID: number = null;
    moveLeftID: number = null;
    item: string;

    private timeout() {
        console.log("m " + this.moveRightID);
        if(this.moveRightID == null && this.moveLeftID == null) {
            if (this.side == "left") {
                this.moveRight();
            } else if (this.side == "right"){
                this.moveLeft();
            }
        }
    }

    private interval(time: number) {
        setTimeout(() => this.timeout(), time);
    }

    constructor (element: string, startTime: number, cycleTime: number) {
        this.item = element;
        startTime *= 1000;
        cycleTime *= 1000;


        setInterval(() => this.interval(startTime), cycleTime);
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

    public moveRight() {
        let elem = <HTMLImageElement> document.getElementById(this.item);
        console.log(elem.src);
        let rightLimit = window.innerWidth + 20;
        let posX = -(elem.offsetHeight + 100);
        let speed = Math.random() + 1;
        elem.style.top = (Math.floor(Math.random() * (window.innerHeight - elem.offsetHeight - 50)) + 50).toString() + "px";
        if(this.moveLeftID != null) {
            clearInterval(this.moveLeftID);
        }
        console.log(this.moveRightID);
        this.moveRightID = setInterval(frame, 1000/120);
        console.log(this.moveRightID);
        function frame() {
            if (posX >= rightLimit) {
                this.side = "right";
                clearInterval(2);
                this.moveRightID = null;
                console.log("hj");
            } else {
                posX += speed;
                elem.style.left = posX + 'px';
            }
        }
    }

    public moveLeft() {
        let elem = <HTMLImageElement> document.getElementById(this.item);
        let leftLimit = -(elem.offsetHeight + 100);
        let posX = window.innerWidth + 20;
        let speed = Math.random() + 1;
        elem.style.top = (Math.floor(Math.random() * (window.innerHeight - elem.offsetHeight - 50)) + 50).toString() + "px";
        if(this.moveRightID != null) {
            clearInterval(this.moveRightID);
        }
        this.moveLeftID = setInterval(frame, 1000/120);
        function frame() {
            if (posX <= leftLimit) {
                this.side = "left";
                clearInterval(this.moveLeftID);
                this.moveLeftID = null;
            } else {
                posX -= speed;
                elem.style.left = posX + 'px';
            }
        }
    }
}

window.addEventListener("load", function () {
    let hammer:FlyingAnimation = new FlyingAnimation("hammer", 5, 5);
})