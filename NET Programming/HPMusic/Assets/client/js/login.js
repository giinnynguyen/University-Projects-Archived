$(function () {
    //username
    var checkUser = false;
    $("#User_username").blur(function () {
        var username = $(this).val();
        if (username == "") {
            $('.user-mess').text("Username không được để trống");
            checkUser = false;
        } else {
            $.ajax({
                url: '/Register/CheckUserExist',
                dataType: "json",
                type: "GET",
                contentType: 'application/json; charset=utf-8',
                data: {
                    username: username
                },
                success: function (data) {
                    if (data == "Exist") {
                        $(".user-mess").text("");
                        checkUser = true;
                    } else {
                        $(".user-mess").text("Username không tồn tại");
                        checkUser = false;
                    }
                },
                error: function (xhr) {
                    console.log("error checkusername");
                }
            });
        }
    });
    //end user
    //password
    var checkPass = false;
    $("#User_pass").blur(function () {
        var pass = $(this).val();
        if (pass == "") {
            $('.pass-mess').text("Mật khẩu không được để trống");
            checkPass = false;
        } else {
            $('.pass-mess').text("");
            checkPass = true;
        }
    });
    //end pass


    $(".form").submit(function (e) {
        var username = $("#User_username").val();
        var pass = $("#User_pass").val();
        e.preventDefault();
        if (checkPass == true && checkUser == true) {
            $.ajax({
                url: 'Login/Login',
                type: 'POST',
                data: {
                    username: username,
                    pass: pass
                },
                success: function (data) {
                    console.log(data);
                    if (data == "OK") {
                        var url = $("#RedirectTo").val();
                        location.href = url;
                    } else {
                        $(".pass-mess").text("Username hoặc mật khẩu không đúng");
                    }
                },
                error: function (xhr) {
                    console.log("errror-----");
                }
            });
        } else {
            //password false
            if (checkPass == false) {
                var pass = $("#User_pass").val();
                if (pass == "") {
                    $('.pass-mess').text("Mật khẩu không được để trống");
                    checkPass = false;
                } else{
                    $('.pass-mess').text("");
                    checkPass = true;
                }
            }
            //end password false
            //username false
            if (checkUser == false) {
                var username = $("#User_username").val();
                if (username == "") {
                    $('.user-mess').text("Username không được để trống");
                    checkUser = false;
                } else {
                    $.ajax({
                        url: '/Register/CheckUserExist',
                        dataType: "json",
                        type: "GET",
                        contentType: 'application/json; charset=utf-8',
                        data: {
                            username: username
                        },
                        success: function (data) {
                            if (data == "Exist") {
                                $(".user-mess").text("");
                                checkUser = true;
                            } else {
                                $(".user-mess").text("Username không tồn tại");
                                checkUser = false;
                            }
                        },
                        error: function (xhr) {
                            console.log("error checkusername");
                        }
                    });
                }
            }
            //end username false
        }
    });

});