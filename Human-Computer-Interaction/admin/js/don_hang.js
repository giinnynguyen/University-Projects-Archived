function hien_thi_don_hang(displayArr) {
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
            if (p == "trang_thai") {

                if (displayArr[i][p] == "0") {
                    col.textContent = "Chưa xử lý";
                } else if (displayArr[i][p] == "1") {
                    col.textContent = "Hoàn Thành";
                } else {
                    col.textContent = "Hủy đơn hàng";
                }
            } else if (p == "ma_khach_hang") {
                var ten_khach_hang = tim_ten_khach_hang_theo_ma_kh(displayArr[i][p]);
                col.textContent = ten_khach_hang;
            }
            else if (p == "Tri_gia") {
                col.textContent = parseInt(displayArr[i][p]).formatMoney(0, ",", ".");
            }
            else {
                col.textContent = displayArr[i][p];
            }
            row.appendChild(col);
        }
        var operate = document.createElement('td');
        var deleteBtn = document.createElement('button');
        var edit = document.createElement('button');
        var save = document.createElement('button');
        save.className = "btn btn-success fa fa-save";
        save.style.display = "none";
        deleteBtn.className = "btn btn-danger fa fa-trash";
        deleteBtn.setAttribute("ma_don_hang", displayArr[i].ma_don_hang);
        edit.className = "btn btn-info fa fa-info";
        edit.setAttribute("ma_don_hang", displayArr[i].ma_don_hang);
        save.setAttribute("ma_don_hang", displayArr[i].ma_don_hang)
        edit.id = "edit_button" + displayArr[i].ma_don_hang;
        save.id = "save_button" + displayArr[i].ma_don_hang;
        row.id = "row" + displayArr[i].ma_don_hang;
        operate.appendChild(save);
        operate.appendChild(edit);
        operate.appendChild(deleteBtn);
        row.appendChild(operate);
        table.appendChild(row);
    }
    //click button trash 
    $("button.fa-trash").click(function () {
        delete_item($(this).attr("ma_don_hang"));
    });
    $("button.fa-info").click(function () {
        // alert($(this).attr("ma_don_hang"));
        showDetail($(this).attr("ma_don_hang"));
    });
}

$(function () {
    hien_thi_don_hang(don_hang);
});

//jquery  end

function delete_item(ma_don_hang) {
    for (var i = 0; i < don_hang.length; i++) {
        if (don_hang[i].ma_don_hang == ma_don_hang) {
            don_hang.splice(i, 1);
            window.localStorage.don_hang = encodeURIComponent(JSON.stringify(don_hang));
            hien_thi_don_hang(don_hang);
            return;
        }
    }
}

function tim_ten_khach_hang_theo_ma_kh(ma_khach_hang) {
    for (var i = 0; i < khach_hang.length; i++) {
        if (ma_khach_hang == khach_hang[i].ma_khach_hang) {
            return khach_hang[i].ten_khach_hang;
        }
    };
}

function showDetail(ma_don_hang) {
    var modal = document.getElementById('myModal');
    modal.style.display = "block";
    //neu nut edit duoc click
    setData(ma_don_hang);
    var span = document.getElementsByClassName("close");
    $(".close").click(function () {
        modal.style.display = "none";
    });
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

function tim_ten_san_pham_theo_ma_san_pham(ma_san_pham) {
    for (var i = 0; i < product.length; i++) {
        if (product[i].ma_san_pham == ma_san_pham) {
            return product[i].productName;
        }
    };
}

function setData(ma_don_hang) {

    var table = document.getElementById("ctdh");
    table.innerHTML = "";
    var x = 1;
    for (var i = 0; i < ct_don_hang.length; i++) {
        if (ct_don_hang[i].ma_don_hang == ma_don_hang) {
            addItem(x++, tim_ten_san_pham_theo_ma_san_pham(ct_don_hang[i].ma_san_pham), ct_don_hang[i].so_luong, ct_don_hang[i].don_gia);

        };
    };
}

function addItem(stt, ten_san_pham, so_luong, don_gia) {
    var table = document.getElementById("ctdh");
    var tr = document.createElement('tr');
    table.appendChild(tr);

    var td1 = document.createElement('td');
    td1.textContent = stt;
    tr.appendChild(td1);

    var td2 = document.createElement('td');
    td2.textContent = ten_san_pham;
    tr.appendChild(td2);

    var td3 = document.createElement('td');
    td3.textContent = so_luong;
    tr.appendChild(td3);

    var td4 = document.createElement('td');
    td4.textContent = don_gia;
    tr.appendChild(td4);
}