document.addEventListener('DOMContentLoaded', function () {
    window.onload = function () {
        document.body.classList.add('loading');
        window.setTimeout(function () {
            let preloader = document.getElementById('preload');
            document.body.classList.add('load');
            preloader.style.display = 'none';

            showSuccessfulBox();
        }, 1850);
    }
});

let x;
let notification = document.getElementById("notification");
function showSuccessfulBox() {
    window.setTimeout(function () {

    }, 1850);
    clearTimeout(x);
    notification.style.transform = "translateX(0)";
    x = setTimeout(() => {
        notification.style.transform = "translateX(400px)"
    }, 5000);
}
function closeSuccessfulBox() {
    notification.style.transform = "translateX(400px)";
}