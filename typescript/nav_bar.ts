/**
 * Created by erikl on 2017-01-29.
 */

window.addEventListener("load", function () {
    document.getElementById("page_title").innerText = document.title.substr(document.title.indexOf(" - ") == -1 ? 0 : document.title.indexOf(" - ") + 3);
});

let opened = false;
let interval = null;
let elem = document.getElementById("drop_down_menu");

function openMenu() {
    clearInterval(interval);
    let pos = 0;
    let mark = 0;
    if (window.matchMedia("(orientation: portrait)").matches) {
        pos = (opened ? 550 : 0 );
        mark = (opened ? 0 : 550 );
    } else {
        pos = (opened ? 400 : 0 );
        mark = (opened ? 0 : 400 );
    }
    interval = setInterval(function () {
        if (!opened) {
            if (pos >= mark) {
                clearInterval(interval);
                opened = true;
            } else {
                pos += 10;
                elem.style.transform = 'translateY(' + pos + 'px)';
            }
        } else {
            if (pos <= mark) {
                clearInterval(interval);
                opened = false
            } else {
                pos -= 10;
                elem.style.transform = 'translateY(' + pos + 'px)';
            }
        }
    }, 1);
}

function menu_click(button: string) {
    window.open("/" + button, "_self");
}