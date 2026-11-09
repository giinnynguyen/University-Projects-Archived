if (!login) {
  window.location = "admin.html";
}
function hien_thi_khach_hang(displayArr) {
  String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  }
  var table = document.getElementById("product");
  table.innerHTML = "";
  if (typeof (displayArr) == "undefined") {
    displayArr = [];
  }

  for (i = 0; i < displayArr.length; i++) {
    var row = document.createElement('tr');
    table.appendChild(row);
    for (p in displayArr[i]) {
      var col = document.createElement('td');
      if (p == "pass") {
        var passLength = displayArr[i][p].length;
        for (var j = 0; j < passLength; j++) {
          col.textContent += "*";
        }
      }
      else {
        col.textContent = displayArr[i][p];
      }
      row.appendChild(col);
      if (p == "ten_khach_hang") {
        col.id = "customerName_row" + displayArr[i].ma_khach_hang;
      } else if (p == "phai") {
        col.id = "gender_row" + displayArr[i].ma_khach_hang;
      } else if (p == "ngay_sinh") {
        col.id = "birthday_row" + displayArr[i].ma_khach_hang;
      } else if (p == "dia_chi") {
        col.id = "address_row" + displayArr[i].ma_khach_hang;
      } else if (p == "dien_thoai") {
        col.id = "phone_row" + displayArr[i].ma_khach_hang;
      } else if (p == "email") {
        col.id = "email_row" + displayArr[i].ma_khach_hang;
      }
      else if (p == "pass") {
        col.id = "pass_row" + displayArr[i].ma_khach_hang;
      }

    }
    var operate = document.createElement('td');
    var deleteBtn = document.createElement('button');
    var edit = document.createElement('button');
    var save = document.createElement('button');
    save.className = "btn btn-success fa fa-save";
    save.style.display = "none";
    deleteBtn.className = "btn btn-danger fa fa-trash";
    deleteBtn.setAttribute("ma_khach_hang", displayArr[i].ma_khach_hang);
    edit.className = "btn btn-info fa fa-edit";
    edit.setAttribute("ma_khach_hang", displayArr[i].ma_khach_hang);
    save.setAttribute("ma_khach_hang", displayArr[i].ma_khach_hang)
    edit.id = "edit_button" + displayArr[i].ma_khach_hang;
    save.id = "save_button" + displayArr[i].ma_khach_hang;
    row.id = "row" + displayArr[i].ma_khach_hang;
    operate.appendChild(save);
    operate.appendChild(edit);
    operate.appendChild(deleteBtn);
    row.appendChild(operate);
    table.appendChild(row);

  }
  //click button trash 
  $("button.fa-trash").click(function () {
    delete_item($(this).attr("ma_khach_hang"));
  });
  // end click button trash
  /*** click button edit***/
  $("button.fa-edit").click(function () {
    // alert($(this).attr("ma_khach_hang"));
    edit_item($(this).attr("ma_khach_hang"));
  });
  /*** end click button edit***/
  /*** click button save***/
  $("button.fa-save").click(function () {
    save_item($(this).attr("ma_khach_hang"));
  });
  /*** end click button save***/
  pagination();
}
/*function delete*/
function delete_item(ma_khach_hang) {
  for (var i = 0; i < khach_hang.length; i++) {
    if (khach_hang[i].ma_khach_hang == ma_khach_hang) {
      khach_hang.splice(i, 1);
      window.localStorage.khach_hang = encodeURIComponent(JSON.stringify(khach_hang));
      hien_thi_khach_hang(khach_hang);
      return;
    }
  }
}
/* end delete*/
/* function edit*/
function edit_item(ma_khach_hang) {
  document.getElementById("edit_button" + ma_khach_hang).style.display = "none";
  document.getElementById("save_button" + ma_khach_hang).style.display = "inline-block";
  var customerName_row = document.getElementById("customerName_row" + ma_khach_hang);
  var gender_row = document.getElementById("gender_row" + ma_khach_hang);
  gender_row.className = "gender_row";
  var birthday_row = document.getElementById("birthday_row" + ma_khach_hang);
  birthday_row.className = "birthday_row";
  var address_row = document.getElementById("address_row" + ma_khach_hang);
  address_row.className = "address_row";
  var phone_row = document.getElementById("phone_row" + ma_khach_hang);
  phone_row.className = "phone_row";
  var email_row = document.getElementById("email_row" + ma_khach_hang);


  var customerName_data = customerName_row.innerHTML;
  var gender_data = gender_row.innerHTML;
  var birthday_data = birthday_row.innerHTML;
  var address_data = address_row.innerHTML;
  var phone_data = phone_row.innerHTML;
  var email_data = email_row.innerHTML;
  var phone = phone_data.replace(/\s/g, '');
  customerName_row.innerHTML = "<input class='customerName' type='text' id='customerName_text" + ma_khach_hang + "' value='" + customerName_data + "' required/>";
  gender_row.innerHTML = "<select id='gender_text" + ma_khach_hang + "' value='" + gender_data + "'><option>Nam</option><option>Nữ</option></select";
  birthday_row.innerHTML = "<input type='date' class='birthday' id='birthday_text" + ma_khach_hang + "' value='" + birthday_data + "'>";
  address_row.innerHTML = "<input class='address' type='text' id='address_text" + ma_khach_hang + "' value='" + address_data + "'>";
  phone_row.innerHTML = "<input type='number' title='số điện thoại gồm 10 hoặc 11 số' class'phone' maxlength='11' class='input-phone' id='phone_text" + ma_khach_hang + "' value='" + phone + "'>";
  email_row.innerHTML = "<input type='text' class='email' id='email_text" + ma_khach_hang + "' value='" + email_data + "'>";
  saveChange();
}
/* end edit*/

function emailEdit(email) {
  var result = [];
  for (var i = 0; i < khach_hang.length; i++) {
    if (khach_hang[i].email != email) {
      result.push(khach_hang[i]);
    }
  }
  return result;
}
function thisEmail(ma_khach_hang) {
  for (var i = 0; i < khach_hang.length; i++) {
    if (khach_hang[i].ma_khach_hang == ma_khach_hang) {
      return khach_hang[i].email;
    }
  }
}
/*function save*/
//save
function save_item(ma_khach_hang) {
  var customerName_val = document.getElementById("customerName_text" + ma_khach_hang).value;
  var gender_val = document.getElementById("gender_text" + ma_khach_hang).value;
  var birthday_val = document.getElementById("birthday_text" + ma_khach_hang).value;
  var address_val = document.getElementById("address_text" + ma_khach_hang).value;
  var phone_val = document.getElementById("phone_text" + ma_khach_hang).value;
  var email_val = document.getElementById("email_text" + ma_khach_hang).value;

  var email = thisEmail(ma_khach_hang);
  var checkEmail = emailEdit(email);
  var check = false;
  for (var i = 0; i < checkEmail.length; i++) {
    if (email_val == checkEmail[i].email) {
      check = true;
    }
  }

  if (phone_val.length == 11 || phone_val.length == 10) {
    if (birthday_val != "" && customerName_val != "" && address_val != "" && email_val != null && phone_val != "" && !check) {
      document.getElementById("customerName_row" + ma_khach_hang).innerHTML = customerName_val;
      document.getElementById("gender_row" + ma_khach_hang).innerHTML = gender_val;

      document.getElementById("address_row" + ma_khach_hang).innerHTML = address_val;

      document.getElementById("email_row" + ma_khach_hang).innerHTML = email_val;

      var pass = document.getElementById("pass_row" + ma_khach_hang).innerHTML;
      document.getElementById("edit_button" + ma_khach_hang).style.display = "inline-block";
      document.getElementById("save_button" + ma_khach_hang).style.display = "none";
      var phoneFormated;
      phone = phone_val.replace(/\s/g, '');
      if (phone.length == 10) {
        phoneFormated = phone.substr(0, 3) + ' ' + phone.substr(3, 3) + ' ' + phone.substr(6, 4);
      } else if (phone.length == 11) {
        phoneFormated = phone.substr(0, 4) + ' ' + phone.substr(4, 3) + ' ' + phone.substr(7, 4);
      }
      document.getElementById("phone_row" + ma_khach_hang).innerHTML = phoneFormated;

      var birthdayData = getDefaultDate(birthday_val);
      document.getElementById("birthday_row" + ma_khach_hang).innerHTML = birthdayData;
      var tmp = {
        "ma_khach_hang": ma_khach_hang,
        "ten_khach_hang": customerName_val,
        "phai": gender_val,
        "ngay_sinh": birthdayData,
        "dia_chi": address_val,
        "dien_thoai": phoneFormated,
        "email": email_val,
        "pass": pass
      };
      for (var i = 0; i < khach_hang.length; i++) {
        if (khach_hang[i].ma_khach_hang == ma_khach_hang) {
          khach_hang[i] = tmp;
          break;
        }
      };

      window.localStorage.khach_hang = encodeURIComponent(JSON.stringify(khach_hang));
    } else {
      if (birthday_val == "") {
        $("#birthday_text" + ma_khach_hang).css("border", "1px solid red");
      }
      if (customerName_val == "") {
        $("#customerName_text" + ma_khach_hang).css("border", "1px solid red");
      }
      if (address_val == "") {
        $("#address_text" + ma_khach_hang).css("border", "1px solid red");
      }
      if (phone_val == "") {
        $("#phone_text" + ma_khach_hang).css("border", "1px solid red");
      }

      if (email_val == "") {
        $("#email_text" + ma_khach_hang).css("border", "1px solid red");
      }
      if (check == true) {
        alert("Email đã tồn tại");
      }
    }
  } else {
    if (phone_val.length != 10 || phone_val.length != 11) {
      $("#phone_text" + ma_khach_hang).css("border", "1px solid red");
    }
  }
}
/*end save*/

function saveChange() {
  $('.customerName').keyup(function () {
    if ($(this).val() != "") {
      $(this).css("border", "1px solid green");
    } else {
      $(this).css("border", "1px solid red");
    }
  });

  $('.address').keyup(function () {
    if ($(this).val() != "") {
      $(this).css("border", "1px solid green");
    } else {
      $(this).css("border", "1px solid red");
    }
  });
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  $('.email').keyup(function () {
    if ($(this).val() != "" && $(this).val().match(re)) {
      $(this).css("border", "1px solid green");
    } else {
      $(this).css("border", "1px solid red");
    }
  });

  $('.phone').keyup(function () {
    console.log("abc");
    if ($(this).val() != "" || $(this).val().length == 10 || $(this).val().length == 11) {
      $(this).css("border", "1px solid green");
    } else {
      $(this).css("border", "1px solid red");
    }
  });

  $('.birthday').change(function () {
    if ($(this).val() != "") {
      $(this).css("border", "1px solid green");
    } else {
      $(this).css("border", "1px solid red");
    }
  });
}
/*add function*/
function add_item() {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var new_name = form.elements["name"].value;
  var new_gender = form.elements["gender"].value;
  var new_birthday = form.elements["birthday"].value;
  var new_address = form.elements["address"].value;
  var new_phone = form.elements["phone"].value;
  var new_email = form.elements["email"].value;
  var new_pass = form.elements["pass"].value;
  if (new_name != "" && new_birthday != "" && new_address != "" && new_phone != "" && new_pass != "" && new_email != "" && !checkEmailExist(new_email)) {
    $("#form-content").modal('hide');
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
    var ngaySinh = getDefaultDate(new_birthday);
    var id = ++index;
    var obj = {
      "ma_khach_hang": id,
      "ten_khach_hang": new_name,
      "phai": new_gender,
      "ngay_sinh": ngaySinh,
      "dia_chi": new_address,
      "dien_thoai": new_phone,
      "email": new_email,
      "pass": new_pass
    };
    khach_hang.unshift(obj);
    window.localStorage.khach_hang = encodeURIComponent(JSON.stringify(khach_hang));
    hien_thi_khach_hang(khach_hang);
  }
  else {
    if (new_email == "" || !new_email.match(re)) {
      $("#email").addClass("no-valid");
      $("#email").parent().find(".error").show();
    }
    if (checkEmailExist(new_email)) {
      $("#email").addClass("no-valid");
      $("#email").parent().find(".error").show();
      $("#email").removeClass("valid");
      $("#email").parent().find(".check").hide();
      $("#email").parent().find(".email-mess").show();
    }
    if (new_pass == "") {
      $("#pass").addClass("no-valid");
      $("#pass").parent().find(".error").show();
    }
    if (new_name == "") {
      $("#name").addClass("no-valid");
      $("#name").parent().find(".error").show();
    }
    if (new_birthday == "") {
      $("#birthday").addClass("no-valid");
      $("#birthday").parent().find(".error").show();
    }
    if (new_address == "") {
      $("#address").addClass("no-valid");
      $("#address").parent().find(".error").show();
    }
    if (new_phone == "") {
      $("#phone").addClass("no-valid");
      $("#phone").parent().find(".error").show();
    }

  }
}
/*end add*/

function getDefaultDate(curDate) {
  var dt = new Date(curDate);
  var date = dt.getDate();
  var month = parseInt(dt.getMonth());
  month++;
  var year = dt.getFullYear();
  if (month.toString().length == 1) {
    month = "0" + month
  }
  if (date.toString().length == 1) {
    date = "0" + date
  }
  return date.toString() + "/" + month.toString() + "/" + year.toString();
}

function checkEmailExist(email) {
  for (var i = 0; i < khach_hang.length; i++) {
    if (khach_hang[i].email == email) {
      return true;
    }
  }
  return false;
}

/*function search*/
function search(displayArr, keyWord) {
  var result = [];
  keyWord = keyWord.toLowerCase();
  for (var i = 0; i < displayArr.length; i++) {
    a = displayArr[i].ten_khach_hang.toLowerCase();
    if (a.search(keyWord) != -1) {
      result.push(displayArr[i]);
    }
  }
  hien_thi_khach_hang(result);
}
/*search end*/

/**phan trang start **/
function pagination() {
  $(".pager").remove();

  $('table.paginated').each(function () {
    var currentPage = 0;
    var numPerPage = 8;
    var $table = $(this);
    $table.bind('repaginate', function () {
      $table.find('tbody tr').hide().slice(currentPage * numPerPage, (currentPage + 1) * numPerPage).show();
    });
    $table.trigger('repaginate');
    var numRows = $table.find('tbody tr').length;
    var numPages = Math.ceil(numRows / numPerPage);
    var $pager = $('<div class="pager"></div>');
    for (var page = 0; page < numPages; page++) {
      $('<span class="page-number"></span>').text(page + 1).bind('click', {
        newPage: page
      }, function (event) {
        currentPage = event.data['newPage'];
        $table.trigger('repaginate');
        $(this).addClass('active').siblings().removeClass('active');
      }).appendTo($pager).addClass('clickable');
    }
    $pager.insertAfter($table).find('span.page-number:first').addClass('active');
  });
}
/**phan trang end **/

/** import/export start **/
function download(text, name, type) {
  var a = document.getElementById("a");
  var file = new Blob([text], {
    type: type
  });
  a.href = URL.createObjectURL(file);
  a.download = name;
  a.click();
}

function Export_Product() {
  var text = JSON.stringify(khach_hang);
  var name = "khach_hang.json";
  var type = "text/plain";
  download(text, name, type);
}

function Import_Product() {
  try {
    var fileToLoad = document.getElementById("fileImport").files[0];
    var fileReader = new FileReader();
    fileReader.onload = function (fileLoadedEvent) {
      var textFromFileLoaded = fileLoadedEvent.target.result;
      var khach_hang_import = JSON.parse((textFromFileLoaded));
      var except;
      for (var i = 0; i < khach_hang_import.length; i++) {
        except = true;
        for (var j = 0; j < khach_hang.length; j++) {
          if (parseInt(khach_hang[j].ma_khach_hang) == parseInt(khach_hang_import[i].ma_khach_hang)) {
            except = false;
            break;
          }
        }
        if (except) {
          khach_hang.push(khach_hang_import[i]);
        }
      }

      window.localStorage.khach_hang = encodeURIComponent(JSON.stringify(khach_hang));
      hien_thi_khach_hang(khach_hang);

    }
    fileReader.readAsText(fileToLoad, "UTF-8");
  } catch (err) {
    alert("Import thất bại!Tên file phải là đuôi json");
  }


}

/** import/export end **/

/**function khi thay doi select phai*/
function changeSelectCompany() {
  $('#gender').change(function () {
    var selectedOption = $(this).val();
    var arr = filter(selectedOption);
    hien_thi_khach_hang(arr);
  });
}
/**changeSelectCompany end*/

function changeSelectSort() {
  $('#sort').change(function () {
    var selectedOption = $(this).val();
    var arr = sortName(selectedOption);
    hien_thi_khach_hang(arr);
  });
}
function sortName(option) {
  var arr = [];
  if (option == "A-Z") {
    arr = khach_hang.sort(compareAZ);
  } else if (option == "Z-A") {
    arr = khach_hang.sort(compareZA);
  } else if (option == "Ngày sinh") {
    arr = khach_hang.sort(abc);
  }
  return arr;
}
function compareAZ(a, b) {
  if (a.ten_khach_hang < b.ten_khach_hang)
    return -1;
  if (a.ten_khach_hang > b.ten_khach_hang)
    return 1;
  return 0;
}
function compareZA(a, b) {
  if (a.ten_khach_hang > b.ten_khach_hang)
    return -1;
  if (a.ten_khach_hang < b.ten_khach_hang)
    return 1;
  return 0;
}

function abc(a, b) {
  var aComps = a.ngay_sinh.split("/");
  var bComps = b.ngay_sinh.split("/");
  aComps[1]--;
  bComps[1]--;
  var aDate = new Date(aComps[2], aComps[1], aComps[0]);
  var bDate = new Date(bComps[2], bComps[1], bComps[0]);
  return aDate.getTime() - bDate.getTime();
}

/**loc theo company*/
function filter(option) {
  var arr = [];
  if (option == "Tất cả") {
    arr = khach_hang;
  } else {
    $.each(khach_hang, function () {
      if (this.phai.toLowerCase() == option.toLowerCase())
        arr.push(this);
    });
  }
  return arr;
}
//** filter end**/


//jquery start
$(function () {
  hien_thi_khach_hang(khach_hang);
  changeSelectCompany();
  changeSelectSort();
  /***add click start**/
  $("button#submit").click(function () {
    add_item();
  });
  /**add click end**/
  /*event keyup input search*/
  $("#search").keyup(function () {
    if ($(this).val() != "")
      search(khach_hang, $(this).val());
    else
      hien_thi_khach_hang(khach_hang);
  });
  /* end event keyup input search*/
});//jquery  end

