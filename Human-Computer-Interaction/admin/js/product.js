if (!login) {
    window.location = "admin.html";
}
var editClicked = false;

//hien thi ten hang trong nut select company 
function hien_thi_hang() {
    var companySelect = document.getElementById("selectCompany");
    companySelect.innerHTML = "<select id='selectCompany'>" + "<option>Tất cả</option>" + hangStringOption() + "</select>";
}

function hien_thi_san_pham(displayArr) {
    var table = document.getElementById("product");
    table.innerHTML = "";
    if (typeof (displayArr) == "undefined") {
        displayArr = [];
    }
    for (i = 0; i < displayArr.length; i++) {
        var row = document.createElement('tr');
        table.appendChild(row);
        for (p in displayArr[i]) {
            if (p == 'detail') {
                var td = document.createElement('td');
                var detail = document.createElement('button');
                detail.className = "viewDetail";
                detail.innerHTML = "Xem chi tiết";
                detail.id = "myBtn" + displayArr[i].ma_san_pham;
                td.appendChild(detail);
                row.appendChild(td);
                //create modal detail
                var modal = document.createElement('div');
                modal.className = "modal";
                modal.id = "myModal" + displayArr[i].ma_san_pham;
                detail.setAttribute("ma_san_pham", displayArr[i].ma_san_pham);
            } else if (p == "image") {
                var td = document.createElement('td');
                row.appendChild(td);
                var imageProduct = document.createElement('img');
                imageProduct.src = baseUrl + "/imageProduct/" + displayArr[i][p];
                imageProduct.id = "/imageProduct" + displayArr[i].ma_san_pham;
                td.appendChild(imageProduct);
                td.id = "image_row" + displayArr[i].ma_san_pham;
            } else if (p == "productName") {
                var col = document.createElement('td');
                row.appendChild(col);
                var productName = document.createElement('p');
                productName.innerHTML = displayArr[i][p];
                productName.id = "productName_row" + displayArr[i].ma_san_pham;
                col.appendChild(productName);
            }
            else if (p == "price") {
                var col = document.createElement('td');
                col.textContent = parseInt(displayArr[i][p]).formatMoney(0, ",", ".");
                row.appendChild(col);
            }
            else if (p == "sale") {
                var col = document.createElement('td');
                col.textContent = parseInt(displayArr[i][p]).formatMoney(0, ",", ".");
                row.appendChild(col);
            }
            else {
                var col = document.createElement('td');
                col.textContent = displayArr[i][p];
                row.appendChild(col);
            }
            // set id start
            if (p == "amount") {
                col.id = "amount_row" + displayArr[i].ma_san_pham;
            } else if (p == "company") {
                col.id = "company_row" + displayArr[i].ma_san_pham;
            } else if (p == "price") {
                col.id = "price_row" + displayArr[i].ma_san_pham;
            } else if (p == "sale") {
                col.id = "sale_row" + displayArr[i].ma_san_pham;
            } else if (p == "dateCreate") {
                col.id = "dateCreate_row" + displayArr[i].ma_san_pham;
            } else if (p == "ma_san_pham") {
                col.id = "id_row" + displayArr[i].ma_san_pham;
            }
            //set id end
            else if (p == "newProduct") {
                if (displayArr[i]["newProduct"] == "yes") {
                    var rowProduct = document.getElementById("productName_row" + displayArr[i].ma_san_pham);
                    var newLabel = document.createElement('span');
                    newLabel.className = "newLabel fa fa-new";
                    newLabel.innerHTML = "New";
                    rowProduct.parentNode.appendChild(newLabel);
                }
            }
        }

        var operate = document.createElement('td');
        var deleteBtn = document.createElement('button');
        var edit = document.createElement('button');
        var save = document.createElement('button');
        save.className = "btn btn-success fa fa-save";
        save.style.display = "none";
        deleteBtn.className = "btn btn-danger fa fa-trash";
        deleteBtn.setAttribute("ma_san_pham", displayArr[i].ma_san_pham);
        edit.className = "btn btn-info fa fa-edit";
        edit.setAttribute("ma_san_pham", displayArr[i].ma_san_pham);
        save.setAttribute("ma_san_pham", displayArr[i].ma_san_pham)
        edit.id = "edit_button" + displayArr[i].ma_san_pham;
        save.id = "save_button" + displayArr[i].ma_san_pham;
        row.id = "row" + displayArr[i].ma_san_pham;
        operate.appendChild(save);
        operate.appendChild(edit);
        operate.appendChild(deleteBtn);
        row.appendChild(operate);
        table.appendChild(row);

    }
    //click button trash 
    $("button.fa-trash").click(function () {
        delete_item($(this).attr("ma_san_pham"));
    });
    // end click button trash
    /*** click button edit***/
    $("button.fa-edit").click(function () {
        // alert($(this).attr(ma_san_pham));
        edit_item($(this).attr("ma_san_pham"));
    });
    /*** end click button edit***/
    /*** click button save***/
    $("button.fa-save").click(function () {
        save_item($(this).attr("ma_san_pham"));
    });
    /*** end click button save***/
    /**showDetail start*/
    $(".viewDetail").click(function () {
        showDetail($(this).attr("ma_san_pham"));
    });
    /***showDetail end***/
    pagination();
}
//end function hien thi san pham

//show detail start
function showDetail(ma_san_pham) {
    var modal = document.getElementById('myModal');
    var btn = document.getElementById("myBtn" + ma_san_pham);
    modal.style.display = "block";
    //neu nut edit duoc click
    if (editClicked == true) { } else {
        //neu edit chua duoc bam thi do du lieu tu product detail vao
        setDataDetail(ma_san_pham);
    }
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
/*show detail end*/

/** dua du lieu dua tren ma san pham vao modal detail**/
function setDataDetail(ma_san_pham) {
    var table = document.getElementById("tableDetail");
    table.innerHTML = "";
    var sanpham = getItem(ma_san_pham);
    var detail = sanpham.detail;
    var h1 = document.getElementById("h1");
    h1.innerHTML = sanpham.productName;
    for (p in detail) {
        var row = document.createElement('tr');
        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        td1.innerHTML = p;
        td2.innerHTML = detail[p];
        td2.id = p + ma_san_pham;
        row.appendChild(td1);
        row.appendChild(td2);
        table.appendChild(row);
    }
}

/*function getItem start*/
function getItem(ma_san_pham) {
    for (var i = 0; i < product.length; i++) {
        if (product[i].ma_san_pham == ma_san_pham) {
            return product[i];
        }
    }
}
/*function getItem end*/

/*function delete*/
function delete_item(ma_san_pham) {
    for (var i = 0; i < product.length; i++) {
        if (product[i].ma_san_pham == ma_san_pham) {
            product.splice(i, 1);
            window.localStorage.product = encodeURIComponent(JSON.stringify(product));
            hien_thi_san_pham(product);
            return;
        }
    }
}
/* end delete*/
/* function edit*/
function edit_item(ma_san_pham) {
    editClicked = true;
    //an nut edit va hien nut save
    document.getElementById("edit_button" + ma_san_pham).style.display = "none";
    document.getElementById("save_button" + ma_san_pham).style.display = "inline-block";

    var productName_row = document.getElementById("productName_row" + ma_san_pham);
    var amount_row = document.getElementById("amount_row" + ma_san_pham);
    var company_row = document.getElementById("company_row" + ma_san_pham);
    var price_row = document.getElementById("price_row" + ma_san_pham);
    var sale_row = document.getElementById("sale_row" + ma_san_pham);

    var productName_data = productName_row.innerHTML;
    var amount_data = amount_row.innerHTML;
    var company_data = company_row.innerHTML;
    var price_data = price_row.innerHTML;
    var sale_data = sale_row.innerHTML;

    productName_row.innerHTML = "<input type='text' id='productName_text" + ma_san_pham + "' value='" + productName_data + "'>";
    amount_row.innerHTML = "<input type='text' id='amount_text" + ma_san_pham + "' value='" + amount_data + "'>";
    company_row.innerHTML = "<select id='company_text" + ma_san_pham + "' value='" + company_data + "'>" + hangStringOption() + "</select>";
    price_row.innerHTML = "<input type='text' min='1' id='price_text" + ma_san_pham + "' value='" + price_data + "'>";
    sale_row.innerHTML = "<input type='text' min='1' id='sale_text" + ma_san_pham + "' value='" + sale_data + "'>";
    //image_row.innerHTML += "<input class='file' type='file' onchange='previewFile("+ma_san_pham+")'' id='image_text" + ma_san_pham + "' value='" + image_data + "'>";


    //edit detail start
    var sanpham = getItem(ma_san_pham);
    var detail = sanpham.detail;
    var table = document.getElementById("tableDetail");
    table.innerHTML = "";
    for (p in detail) {
        var row = document.createElement('tr');
        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        td2.id = p + ma_san_pham;
        td1.innerHTML = p;
        td2.innerHTML = "<input type='text' id='" + p + "_text" + ma_san_pham + "' value='" + detail[p] + "'>";
        row.appendChild(td1);
        row.appendChild(td2);
        table.appendChild(row);
    }
    var rowSave = document.createElement('tr');
    var tdSave = document.createElement('td');
    var save = document.createElement('button');
    save.className = "btn btn-success";
    save.innerHTML = "Cập nhật";
    table.appendChild(rowSave);
    rowSave.appendChild(tdSave);
    tdSave.appendChild(save);
    tdSave.colSpan = "2";
    tdSave.style.textAlign = "center";
    //su kien click nut cap nhat
    var modal = document.getElementById('myModal');
    save.onclick = function () {
        modal.style.display = "none";
    }
    //su kien click nut save end
    //edit detail end


    ///edit image start
    //style input choose file
    // var img = document.getElementById("imageProduct"+ma_san_pham);
    // img.style.zIndex = "-1";
    // var span = document.createElement('span');
    // span.className = 'fa fa-upload';
    // image_row.appendChild(span);

    //edit image end

    productName_row.style.margin = '0';
}
/* end edit*/


/**xu ly edit hinh anh**/
function previewFile(ma_san_pham) {
    var preview = document.getElementById("imageProduct" + ma_san_pham);
    $('.fa-upload').css("z-index", "-1");
    preview.style.zIndex = "999";
    console.log(preview.src);
    var file = document.querySelector('input[type=file]').files[0]; //sames as here
    var reader = new FileReader();
    reader.onloadend = function () {
        product[0].image = reader.result;
        preview.src = reader.result;
    }
    console.log(preview.src);
    if (file) {
        reader.readAsDataURL(file); //reads the data as a URL
    } else {
        preview.src = "";
    }
    window.localStorage.product = encodeURIComponent(JSON.stringify(product));
}
/**end xu ly edit hinh anh **/

/*function save*/
//save
function save_item(ma_san_pham) {
    var productName_val = document.getElementById("productName_text" + ma_san_pham).value;
    var amount_val = document.getElementById("amount_text" + ma_san_pham).value;
    var company_val = document.getElementById("company_text" + ma_san_pham).value;
    var price_val = document.getElementById("price_text" + ma_san_pham).value;
    var sale_val = document.getElementById("sale_text" + ma_san_pham).value;

    document.getElementById("productName_row" + ma_san_pham).innerHTML = productName_val;
    document.getElementById("amount_row" + ma_san_pham).innerHTML = amount_val;
    document.getElementById("company_row" + ma_san_pham).innerHTML = company_val;
    document.getElementById("price_row" + ma_san_pham).innerHTML = price_val;
    document.getElementById("sale_row" + ma_san_pham).innerHTML = sale_val;

    document.getElementById("edit_button" + ma_san_pham).style.display = "inline-block";
    document.getElementById("save_button" + ma_san_pham).style.display = "none";

    //save detail start
    var cpu_val = document.getElementById("CPU_text" + ma_san_pham).value;

    var bufferMemory_val = document.getElementById("Bộ nhớ đệm_text" + ma_san_pham).value;
    var ram_val = document.getElementById("RAM_text" + ma_san_pham).value;
    var hdd_val = document.getElementById("Ổ cứng_text" + ma_san_pham).value;
    var dvd_val = document.getElementById("Đĩa quang_text" + ma_san_pham).value;
    var vga_val = document.getElementById("Đồ họa_text" + ma_san_pham).value;
    var screen_val = document.getElementById("Màn hình_text" + ma_san_pham).value;
    var audio_val = document.getElementById("Âm thanh_text" + ma_san_pham).value;
    var wifi_val = document.getElementById("WiFi_text" + ma_san_pham).value;
    var lan_val = document.getElementById("LAN_text" + ma_san_pham).value;
    var pin_val = document.getElementById("PIN_text" + ma_san_pham).value;
    var hdh_val = document.getElementById("Hệ điều hành_text" + ma_san_pham).value;

    document.getElementById("CPU" + ma_san_pham).innerHTML = cpu_val;
    document.getElementById("Bộ nhớ đệm" + ma_san_pham).innerHTML = bufferMemory_val;
    document.getElementById("RAM" + ma_san_pham).innerHTML = ram_val;
    document.getElementById("Ổ cứng" + ma_san_pham).innerHTML = hdd_val;
    document.getElementById("Đĩa quang" + ma_san_pham).innerHTML = dvd_val;
    document.getElementById("Đồ họa" + ma_san_pham).innerHTML = vga_val;
    document.getElementById("Màn hình" + ma_san_pham).innerHTML = screen_val;
    document.getElementById("Âm thanh" + ma_san_pham).innerHTML = audio_val;
    document.getElementById("WiFi" + ma_san_pham).innerHTML = wifi_val;
    document.getElementById("LAN" + ma_san_pham).innerHTML = lan_val;
    document.getElementById("PIN" + ma_san_pham).innerHTML = pin_val;
    document.getElementById("Hệ điều hành" + ma_san_pham).innerHTML = hdh_val;

    //save detail end

    var ma_san_pham_val = document.getElementById("id_row" + ma_san_pham).innerHTML;
    var dateCreate_val = document.getElementById("dateCreate_row" + ma_san_pham).innerHTML;
    var tmp = {
        "ma_san_pham": ma_san_pham_val,
        "productName": productName_val,
        "amount": amount_val,
        "company": company_val,
        "price": price_val,
        "sale": sale_val,
        "image": "",
        "newProduct": "yes",
        "dateCreate": dateCreate_val,
        "detail": {
            "CPU": cpu_val,
            "Bộ nhớ đệm": bufferMemory_val,
            "RAM": ram_val,
            "Ổ cứng": hdd_val,
            "Đĩa quang": dvd_val,
            "Đồ họa": vga_val,
            "Màn hình": screen_val,
            "Âm thanh": audio_val,
            "WiFi": wifi_val,
            "LAN": lan_val,
            "PIN": pin_val,
            "Hệ điều hành": hdh_val
        }
    };
    for (var i = 0; i < product.length; i++) {
        if (product[i].ma_san_pham == ma_san_pham) {
            product[i] = tmp;
            break;
        }
    };
    window.localStorage.product = encodeURIComponent(JSON.stringify(product));
    editClicked = false;
}
/*end save*/


/*hangStringOption start*/
/***
tra ve mot chuoi option, mot option la ten cua mot hang trong bang quan ly hang
***/
function hangStringOption() {
    String.prototype.capitalize = function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }
    var companyString = "";
    for (var i = 0; i < company.length; i++) {
        var hangName = company[i].ma_hang.toLowerCase().capitalize();
        companyString += "<option>" + hangName + "</option>"
    };
    return companyString;
}
/*hangStringOption end*/

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

Number.prototype.formatMoney = function (c, d, t) {
    var n = this,
        c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};
/*add function*/
function add_item() {
    $("#form-content").modal('hide');
    var index;
    if (product.length <= 0) {
        index = 0;
    } else {
        index = product[0].ma_san_pham;
    }
    var x = "";
    for (var i = 0; i < product.length; i++) {
        if (index < parseInt(product[i].ma_san_pham)) {
            index = product[i].ma_san_pham;
        }

    }
    var id = ++index;
    var new_product_name = form.elements["productName"].value;
    var new_amount = form.elements["amount"].value;
    var new_company = form.elements["company"].value;
    var new_price = form.elements["price"].value;
    var price = new_price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");

    var new_sale = form.elements["sale"].value;
    var new_image = form.elements["image"].value;
    //cau hinh
    var cpu = form.elements["cpu"].value;
    var buffer = form.elements["bufferMemory"].value;
    var ram = form.elements["ram"].value;
    var hdd = form.elements["hdd"].value;
    var dvd = form.elements["dvd"].value;
    var vga = form.elements["vga"].value;
    var screenA = form.elements["screen"].value;
    var audio = form.elements["audio"].value;
    var wifi = form.elements["wifi"].value;
    var lan = form.elements["lan"].value;
    var pin = form.elements["pin"].value;
    var hdh = form.elements["hdh"].value;

    //current date
    var time = new Date();
    abc = time.toLocaleDateString().split('/');
    var dateCreate = abc[0] + "/" + abc[1] + "/" + abc[2];
    var productObj = {
        "ma_san_pham": id,
        "productName": new_product_name,
        "amount": new_amount,
        "company": new_company,
        "price": price,
        "sale": new_sale,
        "image": new_image,
        "newProduct": "yes",
        "dateCreate": dateCreate,
        "detail": {
            "CPU": cpu,
            "Bộ nhớ đệm": buffer,
            "RAM": ram,
            "Ổ cứng": hdd,
            "Đĩa quang": dvd,
            "Đồ họa": vga,
            "Màn hình": screenA,
            "Âm thanh": audio,
            "WiFi": wifi,
            "LAN": lan,
            "PIN": pin,
            "Hệ điều hành": hdh
        }
    };
    product.unshift(productObj);
    window.localStorage.product = encodeURIComponent(JSON.stringify(product));
    hien_thi_san_pham(product);
}
/*end add*/

/**loc theo company*/
function filter(option) {
    var arr = [];
    if (option == "Tất cả") {
        arr = product;
    } else {
        $.each(product, function () {
            if (this.company.toLowerCase() == option.toLowerCase())
                arr.push(this);
        });
    }
    return arr;
}

/**function khi thay doi select company*/
function changeSelectCompany() {
    $('#selectCompany').change(function () {
        var selectedOption = $(this).val();
        var arr = filter(selectedOption);
        hien_thi_san_pham(arr);
    });
}
/**changeSelectCompany end*/

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
    hien_thi_san_pham(result);
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


/*function search*/
function search(displayArr, keyWord) {
    var result = [];
    keyWord = keyWord.toLowerCase().trim();
    for (var i = 0; i < displayArr.length; i++) {
        a = displayArr[i].productName.toLowerCase();
        if (a.search(keyWord) != -1) {
            result.push(displayArr[i]);
        }
    }
    hien_thi_san_pham(result);

}
/*search end*/

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
    var text = JSON.stringify(product);
    var name = "product.json";
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
                for (var j = 0; j < product.length; j++) {
                    if (parseInt(product[j].ma_san_pham) == parseInt(product_import[i].ma_san_pham)) {
                        except = false;
                        break;
                    }
                }
                if (except) {
                    product.push(product_import[i]);
                }
            }

            window.localStorage.product = encodeURIComponent(JSON.stringify(product));
            hien_thi_san_pham(product);

        }
        fileReader.readAsText(fileToLoad, "UTF-8");
    } catch (err) {
        alert("Import thất bại!Tên file phải là đuôi json");
    }


}
//jquery start
$(function () {
    hien_thi_hang();
    hien_thi_san_pham(product);

    changeSelectCompany();

    /***add click start**/
    $("button#submit").click(function () {
        add_item();
    });
    /**add click end**/
    /*event keyup input search*/
    $("#search").keyup(function () {
        if ($(this).val() != "")
            search(product, $(this).val());
        else
            hien_thi_san_pham(product);
    });
    /* end event keyup input search*/


}); //jquery  end