window.onscroll = function () {

    myfuntion();
};

function myfuntion() {
    var height = $("#header").height();
    if (window.scrollY > height) {
        console.log(height);
        $("#menu").addClass("fixed");
    } else {
        $("#menu").removeClass("fixed");
    }
}

function nav() {
    for (var i = 0; i < company.length; i++) {

    }
}
$(document)
    .ready(
        function () {
            $(window)
                .scroll(
                    function () {
                        if ($(this).scrollTop() > 200) {
                            $(".gotop").fadeIn(200);
                        } else {
                            $(".gotop").fadeOut(200);
                        }
                        var body = document.body, html = document.documentElement;

                        if ($(window).scrollTop()
                            + $(window).height() == $(
                                document).height()) {
                            $(".goBottomBtn").fadeOut(200);
                        } else {
                            $(".goBottomBtn").fadeIn(200);
                        }
                    });
            // Scroll Page to Top when clicked on "go to top" button
            $(".gotop").click(function (event) {
                event.preventDefault();
                $("html, body").animate({
                    scrollTop: 0
                });
            });
            // Scroll Page to Top when clicked on "go to bottom" button
            $(".goBottomBtn").click(function (event) {
                $("html, body").animate({ scrollTop: $(document).height() - $(window).height() });
            });




            $("#register").click(function () {
                add_item();
            });

            $(".shopping-cart").hover(function () {
                $(this).parent().addClass('relative');
                $(this).parent().append("<div class='box'><div class='arrow_box'>Chọn mua</div></div>");
            },
                function () {
                    $(this).parent().removeClass('relative');
                    $(".box").remove();
                });

            $(".detail").hover(function () {
                $(this).parent().addClass('relative');
                $(this).parent().append("<div class='box1'><div class='arrow_box'>Chi tiết</div></div>");
            },
                function () {
                    $(this).parent().removeClass('relative');
                    $(".box1").remove();
                });

        });




/*add function*/
function add_item() {
    if (err != true) {
        var index;
        if (khach_hang.length <= 0) {
            index = 0;
        } else {
            index = khach_hang[0].ma_khach_hang;
        }
        var x = "";
        for (var i = 0; i < khach_hang.length; i++) {
            if (index < parseInt(khach_hang[i].ma_khach_hang)) {
                index = khach_hang[i].ma_khach_hang;
            }

        }
        var id = ++index;
        var new_name = form.elements["username"].value;
        var new_gender = form.elements["gender"].value;
        var new_birthday = form.elements["date"].value;
        var new_address = form.elements["address"].value;
        var new_phone = form.elements["phone"].value;
        var new_email = form.elements["email"].value;
        var new_pass = form.elements["pass"].value;
        var obj = {
            "ma_khach_hang": id,
            "ten_khach_hang": new_name,
            "phai": new_gender,
            "ngay_sinh": new_birthday,
            "dia_chi": new_address,
            "dien_thoai": new_phone,
            "email": new_email,
            "pass": new_pass
        };
        khach_hang.unshift(obj);
        window.localStorage.khach_hang = encodeURIComponent(JSON.stringify(khach_hang));
        hien_thi_khach_hang(khach_hang);
    }
}

/*end add*/