document.addEventListener('DOMContentLoaded', function () {
    window.onload = function () {
        document.body.classList.add('loading');
        window.setTimeout(function () {
            let preloader = document.getElementById('preload');
            document.body.classList.add('load');
            preloader.style.display = 'none';

            showErrorBox();
        }, 1850);
    }
});

let xErr;
let notificationError = document.getElementById("notification-err");
function showErrorBox() {
    window.setTimeout(function () {

    }, 1850);
    clearTimeout(xErr);
    notificationError.style.transform = "translateX(0)";
    xErr = setTimeout(() => {
        notificationError.style.transform = "translateX(400px)"
    }, 5000);
}
function closeErrorBox() {
    notificationError.style.transform = "translateX(400px)";
}