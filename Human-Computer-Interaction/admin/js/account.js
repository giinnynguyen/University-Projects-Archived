if (!login) {
  window.location = "admin.html";
}


function hien_thi_tai_khoan(displayArr) {
  var table = document.getElementById("table-kh");
  table.innerHTML = "";
  if (typeof (displayArr) == "undefined") {
    displayArr = [];
  }

  for (i = 0; i < displayArr.length; i++) {
    var row = document.createElement('tr');
    table.appendChild(row);
    for (p in displayArr[i]) {
      var col = document.createElement('td');
      if (p == "status") {
        var status = document.createElement('input');
        status.type = "checkbox";
        status.disabled = true;
        status.id = "check" + displayArr[i].ma;
        if (displayArr[i][p] == 1) {
          status.checked = true;
        } else {
          status.checked = false;
        }
        col.appendChild(status);
      } else if (p == "pass") {
        col.id = "pass_row" + displayArr[i].ma;
        var passLength = displayArr[i][p].length;
        for (var j = 0; j < passLength; j++) {
          col.textContent += "*";
        }
      }
      else {
        col.textContent = displayArr[i][p];
      }
      row.appendChild(col);
      if (p == "ma") {
        col.id = "ma_row" + displayArr[i].ma;
      } else if (p == "name") {
        col.id = "name_row" + displayArr[i].ma;
      } else if (p == "fullname") {
        col.id = "fullname_row" + displayArr[i].ma;
      } else if (p == "email") {
        col.id = "email_row" + displayArr[i].ma;
      } else if (p == "type") {
        col.id = "type_row" + displayArr[i].ma;
      }
      else if (p == "status") {
        col.id = "status_row" + displayArr[i].ma;
      } else if (p == "date") {
        col.id = "date_row" + displayArr[i].ma;
      } else if (p == "lastlogin") {
        col.id = "lastlogin_row" + displayArr[i].ma;
      }

    }
    var operate = document.createElement('td');
    var deleteBtn = document.createElement('button');
    var edit = document.createElement('button');
    var save = document.createElement('button');
    save.className = "btn btn-success fa fa-save";
    save.style.display = "none";
    deleteBtn.className = "btn btn-danger fa fa-trash";
    deleteBtn.setAttribute("ma", displayArr[i].ma);
    edit.className = "btn btn-info fa fa-edit";
    edit.setAttribute("ma", displayArr[i].ma);
    save.setAttribute("ma", displayArr[i].ma)
    edit.id = "edit_button" + displayArr[i].ma;
    save.id = "save_button" + displayArr[i].ma;
    row.id = "row" + displayArr[i].ma;
    operate.appendChild(save);
    operate.appendChild(edit);
    operate.appendChild(deleteBtn);
    row.appendChild(operate);
    table.appendChild(row);

  }
  //click button trash 
  $("button.fa-trash").click(function () {
    delete_item($(this).attr("ma"));
  });
  // end click button trash
  /*** click button edit***/
  $("button.fa-edit").click(function () {
    // alert($(this).attr("ma_khach_hang"));
    edit_item($(this).attr("ma"));
  });
  /*** end click button edit***/
  /*** click button save***/
  $("button.fa-save").click(function () {
    save_item($(this).attr("ma"));
  });
  /*** end click button save***/
  pagination();

}
/*function delete*/
function delete_item(ma) {
  for (var i = 0; i < accounts.length; i++) {
    if (accounts[i].ma == ma) {
      accounts.splice(i, 1);
      window.localStorage.accounts = encodeURIComponent(JSON.stringify(accounts));
      hien_thi_tai_khoan(accounts);
      return;
    }
  }
}

function passAcc(ma) {
  var pass;
  for (var i = 0; i < accounts.length; i++) {
    if (ma == accounts[i].ma)
      pass = accounts[i].pass;
  }
  return pass;
}

/* end delete*/
/* function edit*/
function edit_item(ma) {
  document.getElementById("edit_button" + ma).style.display = "none";
  document.getElementById("save_button" + ma).style.display = "inline-block";
  var name_row = document.getElementById("name_row" + ma);
  var email_row = document.getElementById("email_row" + ma);
  var pass_row = document.getElementById("pass_row" + ma);
  var type_row = document.getElementById("type_row" + ma);
  document.getElementById("check" + ma).disabled = false;


  var name_data = name_row.innerHTML;
  var email_data = email_row.innerHTML;
  var pass_data = pass_row.innerHTML;
  var type_data = type_row.innerHTML;
  name_row.innerHTML = "<input type='text' id='name_text" + ma + "' value='" + name_data + "'>";
  email_row.innerHTML = "<input type='text' id='email_text" + ma + "' value='" + email_data + "'>";
  pass_row.innerHTML = "<input type='text' id='pass_text" + ma + "' value='" + passAcc(ma) + "'>";
  type_row.innerHTML = "<select id='type_text" + ma + "'><option>admin</option><option>nhân viên</option></select>";
}
/* end edit*/

/*function save*/
//save
function save_item(ma) {
  document.getElementById("check" + ma).disabled = true;
  var name_val = document.getElementById("name_text" + ma).value;
  var email_val = document.getElementById("email_text" + ma).value;
  var pass_val = document.getElementById("pass_text" + ma).value;
  var type_val = document.getElementById("type_text" + ma).value;
  document.getElementById("name_row" + ma).innerHTML = name_val;
  document.getElementById("email_row" + ma).innerHTML = email_val;

  document.getElementById("type_row" + ma).innerHTML = type_val;
  var ma_val = document.getElementById("ma_row" + ma).innerHTML;
  var date_val = document.getElementById("date_row" + ma).innerHTML;
  document.getElementById("edit_button" + ma).style.display = "inline-block";
  document.getElementById("save_button" + ma).style.display = "none";
  var pass = "";
  for (var i = 0; i < pass_val.length; i++) {
    pass += "*";
  }
  document.getElementById("pass_row" + ma).innerHTML = pass;

  var tmp = {
    "ma": ma_val,
    "name": name_val,
    "email": email_val,
    "pass": pass_val,
    "type": type_val,
    "status": document.getElementById("check" + ma).value,
    "date": date_val,
  };
  for (var i = 0; i < accounts.length; i++) {
    if (accounts[i].ma == ma) {
      accounts[i] = tmp;
      break;
    }
  };
  window.localStorage.accounts = encodeURIComponent(JSON.stringify(accounts));
}
/*end save*/

/*add function*/
function add_item() {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  var new_name = form.elements["name"].value;
  var new_email = form.elements["email"].value;
  var new_pass = form.elements["pass"].value;
  if (new_email != "" && new_name != "" && new_pass != "" && new_email.match(re) && !checkEmailExist(new_email)) {
    $("#form-content").modal('hide');
    var index;
    if (accounts.length <= 0) {
      index = 0;
    } else {
      index = accounts[0].ma;
    }
    var x = "";
    for (var i = 0; i < accounts.length; i++) {
      if (index < parseInt(accounts[i].ma)) {
        index = accounts[i].ma;
      }
    }
    var id = ++index;
    var new_type = form.elements["type"].value;
    var time = new Date();
    abc = time.toLocaleDateString().split('/');
    var dateCreate = abc[0] + "/" + abc[1] + "/" + abc[2];
    var obj = {
      "ma": id,
      "name": new_name,
      "email": new_email,
      "pass": new_pass,
      "type": new_type,
      "status": 1,
      "date": dateCreate
    };
    accounts.unshift(obj);
    window.localStorage.accounts = encodeURIComponent(JSON.stringify(accounts));
    hien_thi_tai_khoan(accounts);
  } else {
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
  }
}
/*end add*/


function checkEmailExist(email) {
  var check = false;
  for (var i = 0; i < accounts.length; i++) {
    if (accounts[i].email == email) {
      return true;
    }
  }
  return false;
}

/*function search*/
function search(displayArr, keyWord) {
  var result = [];
  keyWord = keyWord.toLowerCase().trim();
  console.log(displayArr);
  for (var i = 0; i < displayArr.length; i++) {
    a = displayArr[i].name.toLowerCase();
    if (a.search(keyWord) != -1) {
      result.push(displayArr[i]);
    }
    b = displayArr[i].email.toLowerCase();
    if (b.search(keyWord) != -1) {
      result.push(displayArr[i]);
    }
  }
  hien_thi_tai_khoan(result);
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
/**import/export start**/
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
  var text = JSON.stringify(accounts);
  var name = "accounts.json";
  var type = "text/plain";
  download(text, name, type);
}

function Import_Product() {
  try {
    var fileToLoad = document.getElementById("fileImport").files[0];
    var fileReader = new FileReader();
    fileReader.onload = function (fileLoadedEvent) {
      var textFromFileLoaded = fileLoadedEvent.target.result;
      var product_import = JSON.parse((textFromFileLoaded));
      var except;
      for (var i = 0; i < product_import.length; i++) {
        except = true;
        for (var j = 0; j < accounts.length; j++) {
          if (parseInt(accounts[j].ma) == parseInt(product_import[i].ma)) {
            except = false;
            break;
          }
        }
        if (except) {
          accounts.push(product_import[i]);
        }
      }

      window.localStorage.accounts = encodeURIComponent(JSON.stringify(accounts));
      hien_thi_tai_khoan(accounts);

    }
    fileReader.readAsText(fileToLoad, "UTF-8");
  } catch (err) {
    alert("Import thất bại!Tên file phải là đuôi json");
  }


}

//jquery start
$(function () {
  hien_thi_tai_khoan(accounts);
  /***add click start**/
  $("button#submit").click(function () {
    add_item();
  });
  /**add click end**/
  /*event keyup input search*/
  $("#search").keyup(function () {
    if ($(this).val() != "")
      search(accounts, $(this).val());
    else
      hien_thi_tai_khoan(accounts);
  });
  /* end event keyup input search*/
});//jquery  end

