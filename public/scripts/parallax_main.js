$(document).scroll(function () {
    var st = $(this).scrollTop();
    $(".main_pres_text").css({
        "background-position-y": (-st / 20)
    })
    $(".main_pres_text").css({
        "top": (-st / 5),
        "bottom": (st / 5)
    })

    if (st < 270) {
        $(".page").css({
            "background-position-y": (-st + 25)
        })
        $(".page").css({
            "top": (-st + 25),
            "bottom": (st + 25)
        })
    }
});