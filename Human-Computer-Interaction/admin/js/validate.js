var err = false;
var simpleValidation = function () {
    var validateForm = $('form#validate-form');

    validateForm.each(function () {
        var validateForm = $(this);
        var validate = {};
        var validateThis = $(this).find('.validate');
        var validatingLength = $(this).find('.validate').length;
        var submitBtn = $(this).find('#submit');
        for (var i = 1; i <= validatingLength; i++) {
            validate['input' + i] = false;
        }

        $('.validate').blur(
            function () {
                var index = $(this).prevAll().length + 1;
                var validateThisVal = $(this).val();
                var validateThisType = $(this).attr(
                    'validateType');
                if (validateThisType == "email") {
                    // Email regex
                    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    if (!validateThisVal.match(re) || validateThisVal == "") {
                        $(this).addClass('not-valid');
                        $(this).removeClass('is-valid');
                        return validate['input' + 5] = false;
                    } else {
                        $(this).addClass('is-valid');
                        $(this)
                            .removeClass(
                                'not-valid');
                        return validate['input' + 5] = true;
                    }
                } else if (validateThisType == "phone") {
                    if (validateThisVal.length < 13 || validateThisVal == "") {
                        $(this).addClass('not-valid');
                        $(this).removeClass('is-valid');
                        return validate['input' + 4] = false;
                    } else {
                        $(this).addClass('is-valid');
                        $(this)
                            .removeClass(
                                'not-valid');
                        return validate['input' + 4] = true;
                    }
                } else if (validateThisType == "date") {
                    if (validateThisVal.length < 10 || validateThisVal == "") {
                        $(this).addClass('not-valid');
                        $(this).removeClass('is-valid');
                        return validate['input' + 2] = false;
                    } else {
                        $(this).addClass('is-valid');
                        $(this)
                            .removeClass(
                                'not-valid');
                        return validate['input' + 2] = true;
                    }
                } else if (validateThisType == "name") {
                    if (validateThisVal == "") {
                        $(this).addClass('not-valid');
                        $(this).removeClass('is-valid');
                        return validate['input' + 1] = false;
                    } else {
                        $(this).addClass('is-valid');
                        $(this)
                            .removeClass(
                                'not-valid');
                        return validate['input' + 1] = true;
                    }
                } else if (validateThisType == "address") {
                    if (validateThisVal == "") {
                        $(this).addClass('not-valid');
                        return validate['input' + 3] = false;
                    } else {
                        $(this).addClass('is-valid');
                        $(this).removeClass(
                            'not-valid');
                        return validate['input' + 3] = true;
                    }
                }
            });

        $("#submit").click(function () {
            // Prevents Default
            event.preventDefault();

            // Logging form errors
            var falseCtn = 0;
            var trueCtn = 0;
            for (var i = 1; i <= validatingLength; i++) {
                if (validate['input' + i] == false) {
                    ++falseCtn;

                }
                if (validate['input' + i] == true) {
                    ++trueCtn;
                }
                if (i == validatingLength)
                    break;
            }
            if (falseCtn > 0) {
                displayErr();
                err = true;

            } else {
                err = false;
                $("#form-content").modal('hide');
            }
        });
    });
};

function displayErr() {
    var validate = document.getElementsByClassName("validate");
    [].forEach.call(validate, function (el) {
        var type = el.getAttribute("validateType");
        var value = el.value;
        console.log(type);
        if (type == "email") {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!value.match(re) || value == "") {
                el.className = "not-valid";
            }
        }
        if (type == "phone") {
            if (value.length < 13 || value == "") {
                el.className = "not-valid";
            }
        }
        if (type == "date") {
            if (value.length < 10 || value == "") {
                el.className = "not-valid";
            }
        }
        else {
            if (value == "") {
                el.className = "not-valid";
            }
        }
    });
}
simpleValidation();