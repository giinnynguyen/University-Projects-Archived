          $(document).ready(function () {
              $('.tab-links a').click(function () {
                  // alert($(this).html());

                  var tab_id = $(this).attr('data-tab');
                  // alert(tab_id);

                  $('.tab-link').removeClass('active');
                  $(this).addClass('active');

                  $('.tab').removeClass('active');
                  $("#" + tab_id).addClass('active');

              });
              var checkEmail = true;

              $(".showpassword").each(function (index, input) {
                  var $input = $(input);
                  $('<label class="showpasswordlabel"/>').append(
                      $("<input type='checkbox' class='showpasswordcheckbox'/>").click(function () {
                          var change = $(this).is(":checked") ? "text" : "password";
                          var rep = $("<input type='" + change + "' />")
                              .attr("id", $input.attr("id"))
                              .attr("name", $input.attr("name"))
                              .attr('class', $input.attr('class'))
                              .attr("placeholder","Nhập mật khẩu")
                              .val($input.val())
                              .insertBefore($input);
                          $input.remove();
                          $input = rep;
                      })
                  ).append($("<span/>").text("Hiện mật khẩu")).insertAfter($input);
              });

              //validate form
              var checkEmail = false;              //email
              $("#email").blur(function () {
                  var email = $(this).val();
                  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                  if (email == "") {
                      $(".email-mess").text("Email không được để trống");
                      checkEmail = false;
                  } else if (!email.match(re)) {
                      $(".email-mess").text("Email không hợp lệ");
                      checkEmail = false;
                  }
                  else {
                      $.ajax({
                          url: '/Register/CheckEmailExist',
                          dataType: "json",
                          type: "GET",
                          contentType: 'application/json; charset=utf-8',
                          data: {
                              email: email
                          },
                          success: function (data) {
                              if (data == "Exist") {
                                  $(".email-mess").text("Email đã tồn tại");
                                  checkEmail = false;
                              } else {
                                  $(".email-mess").text("");
                                  checkEmail = true;
                              }
                          },
                          error: function (xhr) {
                              console.log("error email");
                          }
                      });
                  }
              });
              //end email

              //username
              var checkUser = false;
              $("#username").blur(function () {
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
                                  $(".user-mess").text("Username đã tồn tại");
                                  checkUser = false;
                              } else {
                                  $(".user-mess").text("");
                                  checkUser = true;
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
              $("#pass").blur(function () {
                  var pass = $(this).val();
                  if (pass == "" || pass.length < 8) {
                      $('.pass-mess').text("Mật khẩu phải có ít nhất 8 ký tự");
                      checkPass = false;
                  } else if (hasNumber(pass) && hasUppercase(pass)) {
                      $('.pass-mess').text("");
                      checkPass = true;
                  }
                  else {
                      $('.pass-mess').text("Mật khẩu phải chứa ít nhất 1 ký tự là số và 1 ký tự là chữ in hoa");
                      checkPass = false;
                  }
              });
              //end pass
              function hasNumber(myString) {
                  return /\d/.test(myString);
              }

              function hasUppercase(myString) {
                  return /[A-Z]+/.test(myString);
              }
             
              //submit form
              $(".form").submit(function (e) {
                  var email = $("#email").val();
                  var username = $("#username").val();
                  var pass = $("#pass").val();
                  e.preventDefault();
                  if (checkEmail == true && checkPass == true && checkUser == true) {
                      $.ajax({
                          url: 'Register/Register',
                          type: 'POST',
                          data: {
                              email: email,
                              username: username,
                              pass: pass
                          },
                          success: function (data) {
                              var url = $("#RedirectTo").val();
                              location.href = url;
                          },
                          error: function (xhr) {
                              console.log("errror-----");
                          }
                      });
                  } else {
                      //email false
                      if (checkEmail == false) {
                          var email = $("#email").val();
                          console.log(email);
                          var re = /^(([^<>()[\]\\.,;:\s@@\"]+(\.[^<>()[\]\\.,;:\s@@\"]+)*)|(\".+\"))@@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                          if (email == "") {
                              $(".email-mess").text("Email không được để trống");
                              checkEmail = false;
                          } else if (!email.match(re)) {
                              $(".email-mess").text("Email không hợp lệ");
                              checkEmail = false;
                          }
                          else {
                              $.ajax({
                                  url: '/Register/CheckEmailExist',
                                  dataType: "json",
                                  type: "GET",
                                  contentType: 'application/json; charset=utf-8',
                                  data: {
                                      email: email
                                  },
                                  success: function (data) {
                                      if (data == "Exist") {
                                          $(".email-mess").text("Email đã tồn tại");
                                          checkEmail = false;
                                      } else {
                                          $(".email-mess").text("");
                                          checkEmail = true;
                                      }
                                  },
                                  error: function (xhr) {
                                      console.log("error email");
                                  }
                              });
                          }
                      }
                      //end email false
                      //password false
                      if (checkPass == false) {
                          var pass = $("#pass").val();
                          if (pass == "" || pass.length < 8) {
                              $('.pass-mess').text("Mật khẩu phải có ít nhất 8 ký tự");
                              checkPass = false;
                          } else if (hasNumber(pass) && hasUppercase(pass)) {
                              $('.pass-mess').text("");
                              checkPass = true;
                          }
                          else {
                              $('.pass-mess').text("Mật khẩu phải chứa ít nhất 1 ký tự là số và 1 ký tự là chữ in hoa");
                              checkPass = false;
                          }
                      }
                      //end password false
                      //username false
                      if (checkUser == false) {
                          var username = $("#username").val();
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
                                          $(".user-mess").text("Username đã tồn tại");
                                          checkUser = false;
                                      } else {
                                          $(".user-mess").text("");
                                          checkUser = true;
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

          })
