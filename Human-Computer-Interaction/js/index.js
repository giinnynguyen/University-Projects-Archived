//jquery start
$(function () {
    hien_thi_san_pham(product);
    san_pham_khuyen_mai();
    hien_thi_mua_nhieu();
    $('.addToCart').click(function () {
        alert("Thêm thành công vào giỏ hàng")
    });
}); //jquery  end

//**hien thi san pham start**/
function hien_thi_san_pham(displayArr) {
    var container = $("#container");
    if (typeof (displayArr) == "undefined") {
        displayArr = [];
    }
    for (i = 0; i < 8; i += 4) {
        var table = document.createElement('div');
        table.className = 'row';
        container.append(table);
        //col 1
        var box = document.createElement('div');
        box.className = 'col-md-3';
        table.append(box);
        //tao new product (hinh anh)
        var new_pr = document.createElement('a');
        new_pr.className = 'new-pr';
        box.append(new_pr);
        //chen hinh anh product
        var image = document.createElement('img');
        image.src = baseUrl + "/imageProduct/" + displayArr[i]["image"];
        new_pr.append(image);
        //footer pproduct
        var footer = document.createElement('div');
        footer.className = 'footer';
        box.append(footer);
        //ten san pham
        var name = document.createElement('p');
        name.innerHTML = displayArr[i]["productName"];
        footer.append(name);
        //gia goc
        var price = document.createElement('p');
        price.className = 'price';
        price.innerHTML = "Giá gốc: " + parseInt(displayArr[i]["price"]).formatMoney(0, ",", ".") + "VNĐ";
        footer.append(price);
        var sale = document.createElement('p');
        sale.className = 'sale-';
        sale.innerHTML = "Giảm còn: " + parseInt(displayArr[i]["sale"]).formatMoney(0, ",", ".") + "VNĐ";
        footer.append(sale);
        var cart = document.createElement('a');
        var list = document.createElement('a');
        cart.className = 'fa fa-shopping-cart shopping-cart';
        list.className = 'fa fa-list-ul detail';
        list.href = 'detail.html?ma_san_pham=' + displayArr[i]["ma_san_pham"];
        cart.setAttribute('data-remodal-target', 'modal');
        cart.setAttribute('onclick', "openCart(" + displayArr[i]['ma_san_pham'] + ")");
        var div = document.createElement('div');
        div.className = 'div';
        div.append(cart);
        var div1 = document.createElement('div');
        div1.className = 'div1';
        div1.append(list);
        footer.append(div);
        footer.append(div1);
        if (parseInt(displayArr[i].price) != parseInt(displayArr[i].sale)) {
            var divSale = document.createElement('div');
            divSale.className = "divSale";
            box.appendChild(divSale);
            var saleShape = document.createElement('div');
            saleShape.className = "round-star-label";
            divSale.appendChild(saleShape);
            var span = document.createElement('span');
            span.className = 'saleTitle';
            span.innerHTML = percentPerSale(displayArr[i]) + "%";
            saleShape.appendChild(span);
        }

        //col 2
        if (typeof (displayArr[i + 1]) != "undefined") {
            var box = document.createElement('div');
            box.className = 'col-md-3';
            table.append(box);
            //tao new product (hinh anh)
            var new_pr = document.createElement('a');
            new_pr.className = 'new-pr';
            box.append(new_pr);
            //chen hinh anh product
            var image = document.createElement('img');
            image.src = baseUrl + "/imageProduct/" + displayArr[i + 1]["image"];
            new_pr.append(image);
            //footer pproduct
            var footer = document.createElement('div');
            footer.className = 'footer';
            box.append(footer);
            //ten san pham
            var name = document.createElement('p');
            name.innerHTML = displayArr[i + 1]["productName"];
            footer.append(name);
            //gia goc
            var price = document.createElement('p');
            price.className = 'price';
            price.innerHTML = "Giá gốc: " + parseInt(displayArr[i + 1]["price"]).formatMoney(0, ",", ".") + "VNĐ";
            footer.append(price);
            var sale = document.createElement('p');
            sale.className = 'sale-';
            sale.innerHTML = "Giảm còn: " + parseInt(displayArr[i + 1]["sale"]).formatMoney(0, ",", ".") + "VNĐ";
            footer.append(sale);
            var cart = document.createElement('a');
            var list = document.createElement('a');
            cart.className = 'fa fa-shopping-cart shopping-cart';
            list.className = 'fa fa-list-ul detail';
            list.href = 'detail.html?ma_san_pham=' + displayArr[i + 1]["ma_san_pham"];
            cart.setAttribute('data-remodal-target', 'modal');
            cart.setAttribute('onclick', "openCart(" + displayArr[i + 1]['ma_san_pham'] + ")");
            var div = document.createElement('div');
            div.className = 'div';
            div.append(cart);
            var div1 = document.createElement('div');
            div1.className = 'div1';
            div1.append(list);
            footer.append(div);
            footer.append(div1);
            if (parseInt(displayArr[i + 1].price) != parseInt(displayArr[i + 1].sale)) {
                var divSale = document.createElement('div');
                divSale.className = "divSale";
                box.appendChild(divSale);
                var saleShape = document.createElement('div');
                saleShape.className = "round-star-label";
                divSale.appendChild(saleShape);
                var span = document.createElement('span');
                span.className = 'saleTitle';
                span.innerHTML = percentPerSale(displayArr[i + 1]) + "%";
                saleShape.appendChild(span);
            }
        }


        //col 3
        if (typeof (displayArr[i + 2]) != "undefined") {
            var box = document.createElement('div');
            box.className = 'col-md-3';
            table.append(box);
            //tao new product (hinh anh)
            var new_pr = document.createElement('a');
            new_pr.className = 'new-pr';
            box.append(new_pr);
            //chen hinh anh product
            var image = document.createElement('img');
            image.src = baseUrl + "/imageProduct/" + displayArr[i + 2]["image"];
            new_pr.append(image);
            //footer pproduct
            var footer = document.createElement('div');
            footer.className = 'footer';
            box.append(footer);
            //ten san pham
            var name = document.createElement('p');
            name.innerHTML = displayArr[i + 2]["productName"];

            footer.append(name);
            //gia goc
            var price = document.createElement('p');
            price.className = 'price';
            price.innerHTML = "Giá gốc: " + parseInt(displayArr[i + 2]["price"]).formatMoney(0, ",", ".") + "VNĐ";
            footer.append(price);
            var sale = document.createElement('p');
            sale.className = 'sale-';
            sale.innerHTML = "Giảm còn: " + parseInt(displayArr[i + 2]["sale"]).formatMoney(0, ",", ".") + "VNĐ";
            footer.append(sale);
            var cart = document.createElement('a');
            var list = document.createElement('a');
            cart.className = 'fa fa-shopping-cart shopping-cart';
            list.className = 'fa fa-list-ul detail';
            list.href = 'detail.html?ma_san_pham=' + displayArr[i + 2]["ma_san_pham"];
            cart.setAttribute('data-remodal-target', 'modal');
            cart.setAttribute('onclick', "openCart(" + displayArr[i + 2]['ma_san_pham'] + ")");
            var div = document.createElement('div');
            div.className = 'div';
            div.append(cart);
            var div1 = document.createElement('div');
            div1.className = 'div1';
            div1.append(list);
            footer.append(div);
            footer.append(div1);
            if (parseInt(displayArr[i + 2].price) != parseInt(displayArr[i + 2].sale)) {
                var divSale = document.createElement('div');
                divSale.className = "divSale";
                box.appendChild(divSale);
                var saleShape = document.createElement('div');
                saleShape.className = "round-star-label";
                divSale.appendChild(saleShape);
                var span = document.createElement('span');
                span.className = 'saleTitle';
                span.innerHTML = percentPerSale(displayArr[i + 2]) + "%";
                saleShape.appendChild(span);
            }
        }

        //col 4
        if (typeof (displayArr[i + 3]) != "undefined") {
            var box = document.createElement('div');
            box.className = 'col-md-3';
            table.append(box);
            //tao new product (hinh anh)
            var new_pr = document.createElement('a');
            new_pr.className = 'new-pr';
            box.append(new_pr);
            //chen hinh anh product
            var image = document.createElement('img');
            image.src = baseUrl + "/imageProduct/" + displayArr[i + 3]["image"];
            new_pr.append(image);
            //footer pproduct
            var footer = document.createElement('div');
            footer.className = 'footer';
            box.append(footer);
            //ten san pham
            var name = document.createElement('p');
            name.innerHTML = displayArr[i + 3]["productName"];
            footer.append(name);
            //gia goc
            var price = document.createElement('p');
            price.className = 'price';
            price.innerHTML = "Giá gốc: " + parseInt(displayArr[i + 3]["price"]).formatMoney(0, ",", ".") + "VNĐ";
            footer.append(price);
            var sale = document.createElement('p');
            sale.className = 'sale-';
            sale.innerHTML = "Giảm còn: " + parseInt(displayArr[i + 3]["sale"]).formatMoney(0, ",", ".") + "VNĐ";
            footer.append(sale);
            var cart = document.createElement('a');
            var list = document.createElement('a');
            cart.className = 'fa fa-shopping-cart shopping-cart';
            list.className = 'fa fa-list-ul detail';
            list.href = 'detail.html?ma_san_pham=' + displayArr[i + 3]["ma_san_pham"];
            cart.setAttribute('data-remodal-target', 'modal');
            cart.setAttribute('onclick', "openCart(" + displayArr[i + 3]['ma_san_pham'] + ")");
            var div = document.createElement('div');
            div.className = 'div';
            div.append(cart);
            var div1 = document.createElement('div');
            div1.className = 'div1';
            div1.append(list);
            footer.append(div);
            footer.append(div1);
            if (parseInt(displayArr[i + 3].price) != parseInt(displayArr[i + 3].sale)) {
                var divSale = document.createElement('div');
                divSale.className = "divSale";
                box.appendChild(divSale);
                var saleShape = document.createElement('div');
                saleShape.className = "round-star-label";
                divSale.appendChild(saleShape);
                var span = document.createElement('span');
                span.className = 'saleTitle';
                span.innerHTML = percentPerSale(displayArr[i + 3]) + "%";
                saleShape.appendChild(span);
            }
        }
    }
}

function khuyen_mai() {
    var khuyen_mai = [];
    for (var i = 0; i < product.length; i++) {
        if (parseInt(product[i].price) != parseInt(product[i].sale)) {
            khuyen_mai.push(product[i]);
        }
    }
    //sort khuyen mai
    var sort = khuyen_mai.sort(compare);
    return sort;
}

function compare(a, b) {
    if ((parseInt(a.price) - parseInt(a.sale)) > (parseInt(b.price) - parseInt(b.sale)))
        return -1;
    if ((parseInt(a.price) - parseInt(a.sale)) < (parseInt(b.price) - parseInt(b.sale)))
        return 1;
    return 0;
}


function san_pham_khuyen_mai() {
    var khuyenMai = khuyen_mai();
    $('.first-sale').html("<img src=" + baseUrl + "/imageProduct/" + khuyenMai[0].image + " alt ='image'/>");
    $('.second-sale').html("<img src=" + baseUrl + "/imageProduct/" + khuyenMai[1].image + " alt ='image'/>");
    $('.third-sale').html("<img src=" + baseUrl + "/imageProduct/" + khuyenMai[2].image + " alt ='image'/>");
    $("#demo").attr("src", baseUrl + "/imageProduct/" + khuyenMai[0].image);
    $(".com-info .name").html("" + khuyenMai[0].productName);
    $('.cpu').html("<label>CPU:&nbsp;</label>" + khuyenMai[0]["detail"].CPU);
    $('.ram').html("<label>Bộ nhớ:&nbsp;</label>" + khuyenMai[0]["detail"].RAM);
    $('.vga').html("<label>Đồ họa:&nbsp;</label>" + khuyenMai[0]["detail"]["Đồ họa"]);
    $('.buffer').html("<label>Bộ nhớ đệm:&nbsp;</label>" + khuyenMai[0]["detail"]["Bộ nhớ đệm"]);
    $('.hdd').html("<label>Ổ cứng:&nbsp;</label>" + khuyenMai[0]["detail"]["Ổ cứng"]);
    $('.audio').html("<label>Âm thanh:&nbsp;</label>" + khuyenMai[0]["detail"]["Âm thanh"]);
    $('.originPrice').html("<label>Giá gốc:&nbsp;</label>" + parseInt(khuyenMai[0]["price"]).formatMoney(0, ",", ".") + " VNĐ");
    $('.price1').html("<b>Giảm còn: </b> <font style='font-size: 28px;color: red'>" + parseInt(khuyenMai[0]["sale"]).formatMoney(0, ",", ".") + " <sup>VNĐ</sup></font>");
    $('.percent').html("-" + percentPerSale(khuyenMai[0]) + "%");
    $('.addToCart').attr('onclick', "addToCart(" + khuyenMai[0]['ma_san_pham'] + ",1)");
}
function change(index) {
    var khuyenMai = khuyen_mai();
    $("#demo").attr("src", baseUrl + "/imageProduct/" + khuyenMai[index].image);
    $(".com-info .name").html("" + khuyenMai[index].productName);
    $('.cpu').html("<label>CPU:&nbsp;</label>" + khuyenMai[index]["detail"].CPU);
    $('.ram').html("<label>Bộ nhớ:&nbsp;</label>" + khuyenMai[index]["detail"].RAM);
    $('.vga').html("<label>Đồ họa:&nbsp;</label>" + khuyenMai[index]["detail"]["Đồ họa"]);
    $('.buffer').html("<label>Bộ nhớ đệm:&nbsp;</label>" + khuyenMai[index]["detail"]["Bộ nhớ đệm"]);
    $('.hdd').html("<label>Ổ cứng:&nbsp;</label>" + khuyenMai[index]["detail"]["Ổ cứng"]);
    $('.audio').html("<label>Âm thanh:&nbsp;</label>" + khuyenMai[index]["detail"]["Âm thanh"]);
    $('.originPrice').html("<label>Giá gốc:&nbsp;</label>" + parseInt(khuyenMai[index]["price"]).formatMoney(0, ",", ".") + " VNĐ");
    $('.price1').html("<b>Giảm còn: </b> <font style='font-size: 28px; color: red'>" + parseInt(khuyenMai[index]["sale"]).formatMoney(0, ",", ".") + " <sup>VNĐ</sup></font>");
    $('.percent').html("-" + percentPerSale(khuyenMai[index]) + "%");
    $('.addToCart').attr('onclick', "addToCart(" + khuyenMai[index]['ma_san_pham'] + ",1)");
}

//phan tram giam gia
function percentPerSale(arr) {
    var sale = parseInt(arr.sale);
    var price = parseInt(arr.price);
    var priceSale = price - sale; //so tien giam gia
    var percent = (priceSale * 100) / price;
    var result = Math.round(percent * 100) / 100;
    return result;
}

//san pham ban chay
function sp_ban_chay(hoa_don_chi_tiet) {
    var kq = [];
    var hasArr = false;
    for (var i = 0; i < hoa_don_chi_tiet.length; i++) {
        hasArr = false;
        for (var j = 0; j < kq.length; j++) {
            if (kq[j].ma_san_pham == hoa_don_chi_tiet[i].ma_san_pham) {
                hasArr = true;
                kq[j].so_luong = parseInt(kq[j].so_luong) + parseInt(hoa_don_chi_tiet[i].so_luong);
                break;
            }
        }
        if (!hasArr) {
            kq.push({
                ma_san_pham: hoa_don_chi_tiet[i].ma_san_pham,
                so_luong: hoa_don_chi_tiet[i].so_luong
            });
        }

    }
    kq.sort(function (a, b) { return b.so_luong - a.so_luong });
    var arr_sp_ban_chay = [];
    for (var i = 0; i < kq.length; i++) {
        for (var j = 0; j < product.length; j++) {
            if (product[j].ma_san_pham == kq[i].ma_san_pham) {
                arr_sp_ban_chay.push(product[j]);
                break;
            };
        };
    };
    return arr_sp_ban_chay;
}

function hien_thi_mua_nhieu() {
    var displayArr = sp_ban_chay(ct_don_hang);
    console.log(displayArr);
    var container = $("#container-best");
    if (typeof (displayArr) == "undefined") {
        displayArr = [];
    }
    for (i = 0; i < 8; i += 4) {
        if (typeof (displayArr[i]) != "undefined") {
            var table = document.createElement('div');
            table.className = 'row';
            container.append(table);
            //col 1
            var box = document.createElement('div');
            box.className = 'col-md-3';
            table.append(box);
            //tao new product (hinh anh)
            var new_pr = document.createElement('a');
            new_pr.className = 'new-pr';
            box.append(new_pr);
            //chen hinh anh product
            var image = document.createElement('img');
            image.src = baseUrl + "/imageProduct/" + displayArr[i]["image"];
            new_pr.append(image);
            //footer pproduct
            var footer = document.createElement('div');
            footer.className = 'footer';
            box.append(footer);
            //ten san pham
            var name = document.createElement('p');
            name.innerHTML = displayArr[i]["productName"];
            footer.append(name);
            //gia goc
            var price = document.createElement('p');
            price.className = 'price';
            price.innerHTML = "Giá gốc: " + parseInt(displayArr[i]["price"]).formatMoney(0, ",", ".") + "VNĐ";
            footer.append(price);
            var sale = document.createElement('p');
            sale.className = 'sale-';
            sale.innerHTML = "Giảm còn: " + parseInt(displayArr[i]["sale"]).formatMoney(0, ",", ".") + "VNĐ";
            footer.append(sale);
            var cart = document.createElement('a');
            var list = document.createElement('a');
            cart.className = 'fa fa-shopping-cart shopping-cart';
            list.className = 'fa fa-list-ul detail';
            list.href = 'detail.html?ma_san_pham=' + displayArr[i]["ma_san_pham"];
            cart.setAttribute('data-remodal-target', 'modal');
            cart.setAttribute('onclick', "openCart(" + displayArr[i]['ma_san_pham'] + ")");
            var div = document.createElement('div');
            div.className = 'div';
            div.append(cart);
            var div1 = document.createElement('div');
            div1.className = 'div1';
            div1.append(list);
            footer.append(div);
            footer.append(div1);
            if (parseInt(displayArr[i].price) != parseInt(displayArr[i].sale)) {
                var divSale = document.createElement('div');
                divSale.className = "divSale";
                box.appendChild(divSale);
                var saleShape = document.createElement('div');
                saleShape.className = "round-star-label";
                divSale.appendChild(saleShape);
                var span = document.createElement('span');
                span.className = 'saleTitle';
                span.innerHTML = percentPerSale(displayArr[i]) + "%";
                saleShape.appendChild(span);
            }
        }


        //col 2
        if (typeof (displayArr[i + 1]) != "undefined") {
            var box = document.createElement('div');
            box.className = 'col-md-3';
            table.append(box);
            //tao new product (hinh anh)
            var new_pr = document.createElement('a');
            new_pr.className = 'new-pr';
            box.append(new_pr);
            //chen hinh anh product
            var image = document.createElement('img');
            image.src = baseUrl + "/imageProduct/" + displayArr[i + 1]["image"];
            new_pr.append(image);
            //footer pproduct
            var footer = document.createElement('div');
            footer.className = 'footer';
            box.append(footer);
            //ten san pham
            var name = document.createElement('p');
            name.innerHTML = displayArr[i + 1]["productName"];
            footer.append(name);
            //gia goc
            var price = document.createElement('p');
            price.className = 'price';
            price.innerHTML = "Giá gốc: " + parseInt(displayArr[i + 1]["price"]).formatMoney(0, ",", ".") + "VNĐ";
            footer.append(price);
            var sale = document.createElement('p');
            sale.className = 'sale-';
            sale.innerHTML = "Giảm còn: " + parseInt(displayArr[i + 1]["sale"]).formatMoney(0, ",", ".") + "VNĐ";
            footer.append(sale);
            var cart = document.createElement('a');
            var list = document.createElement('a');
            cart.className = 'fa fa-shopping-cart shopping-cart';
            list.className = 'fa fa-list-ul detail';
            list.href = 'detail.html?ma_san_pham=' + displayArr[i + 1]["ma_san_pham"];
            cart.setAttribute('data-remodal-target', 'modal');
            cart.setAttribute('onclick', "openCart(" + displayArr[i + 1]['ma_san_pham'] + ")");
            var div = document.createElement('div');
            div.className = 'div';
            div.append(cart);
            var div1 = document.createElement('div');
            div1.className = 'div1';
            div1.append(list);
            footer.append(div);
            footer.append(div1);
            if (parseInt(displayArr[i + 1].price) != parseInt(displayArr[i + 1].sale)) {
                var divSale = document.createElement('div');
                divSale.className = "divSale";
                box.appendChild(divSale);
                var saleShape = document.createElement('div');
                saleShape.className = "round-star-label";
                divSale.appendChild(saleShape);
                var span = document.createElement('span');
                span.className = 'saleTitle';
                span.innerHTML = percentPerSale(displayArr[i = 1]) + "%";
                saleShape.appendChild(span);
            }
        }


        //col 3
        if (typeof (displayArr[i + 2]) != "undefined") {
            var box = document.createElement('div');
            box.className = 'col-md-3';
            table.append(box);
            //tao new product (hinh anh)
            var new_pr = document.createElement('a');
            new_pr.className = 'new-pr';
            box.append(new_pr);
            //chen hinh anh product
            var image = document.createElement('img');
            image.src = baseUrl + "/imageProduct/" + displayArr[i + 2]["image"];
            new_pr.append(image);
            //footer pproduct
            var footer = document.createElement('div');
            footer.className = 'footer';
            box.append(footer);
            //ten san pham
            var name = document.createElement('p');
            name.innerHTML = displayArr[i + 2]["productName"];

            footer.append(name);
            //gia goc
            var price = document.createElement('p');
            price.className = 'price';
            price.innerHTML = "Giá gốc: " + parseInt(displayArr[i + 2]["price"]).formatMoney(0, ",", ".") + "VNĐ";
            footer.append(price);
            var sale = document.createElement('p');
            sale.className = 'sale-';
            sale.innerHTML = "Giảm còn: " + parseInt(displayArr[i + 2]["sale"]).formatMoney(0, ",", ".") + "VNĐ";
            footer.append(sale);
            var cart = document.createElement('a');
            var list = document.createElement('a');
            cart.className = 'fa fa-shopping-cart shopping-cart';
            list.className = 'fa fa-list-ul detail';
            list.href = 'detail.html?ma_san_pham=' + displayArr[i + 2]["ma_san_pham"];
            cart.setAttribute('data-remodal-target', 'modal');
            cart.setAttribute('onclick', "openCart(" + displayArr[i + 2]['ma_san_pham'] + ")");
            var div = document.createElement('div');
            div.className = 'div';
            div.append(cart);
            var div1 = document.createElement('div');
            div1.className = 'div1';
            div1.append(list);
            footer.append(div);
            footer.append(div1);
            if (parseInt(displayArr[i + 2].price) != parseInt(displayArr[i + 2].sale)) {
                var divSale = document.createElement('div');
                divSale.className = "divSale";
                box.appendChild(divSale);
                var saleShape = document.createElement('div');
                saleShape.className = "round-star-label";
                divSale.appendChild(saleShape);
                var span = document.createElement('span');
                span.className = 'saleTitle';
                span.innerHTML = percentPerSale(displayArr[i + 2]) + "%";
                saleShape.appendChild(span);
            }
        }

        //col 4
        if (typeof (displayArr[i + 3]) != "undefined") {
            var box = document.createElement('div');
            box.className = 'col-md-3';
            table.append(box);
            //tao new product (hinh anh)
            var new_pr = document.createElement('a');
            new_pr.className = 'new-pr';
            box.append(new_pr);
            //chen hinh anh product
            var image = document.createElement('img');
            image.src = baseUrl + "/imageProduct/" + displayArr[i + 3]["image"];
            new_pr.append(image);
            //footer pproduct
            var footer = document.createElement('div');
            footer.className = 'footer';
            box.append(footer);
            //ten san pham
            var name = document.createElement('p');
            name.innerHTML = displayArr[i + 3]["productName"];
            footer.append(name);
            //gia goc
            var price = document.createElement('p');
            price.className = 'price';
            price.innerHTML = "Giá gốc: " + parseInt(displayArr[i + 3]["price"]).formatMoney(0, ",", ".") + "VNĐ";
            footer.append(price);
            var sale = document.createElement('p');
            sale.className = 'sale-';
            sale.innerHTML = "Giảm còn: " + parseInt(displayArr[i + 3]["sale"]).formatMoney(0, ",", ".") + "VNĐ";
            footer.append(sale);
            var cart = document.createElement('a');
            var list = document.createElement('a');
            cart.className = 'fa fa-shopping-cart shopping-cart';
            list.className = 'fa fa-list-ul detail';
            list.href = 'detail.html?ma_san_pham=' + displayArr[i + 3]["ma_san_pham"];
            cart.setAttribute('data-remodal-target', 'modal');
            cart.setAttribute('onclick', "openCart(" + displayArr[i + 3]['ma_san_pham'] + ")");
            var div = document.createElement('div');
            div.className = 'div';
            div.append(cart);
            var div1 = document.createElement('div');
            div1.className = 'div1';
            div1.append(list);
            footer.append(div);
            footer.append(div1);
            if (parseInt(displayArr[i + 3].price) != parseInt(displayArr[i + 3].sale)) {
                var divSale = document.createElement('div');
                divSale.className = "divSale";
                box.appendChild(divSale);
                var saleShape = document.createElement('div');
                saleShape.className = "round-star-label";
                divSale.appendChild(saleShape);
                var span = document.createElement('span');
                span.className = 'saleTitle';
                span.innerHTML = percentPerSale(displayArr[i + 3]) + "%";
                saleShape.appendChild(span);
            }
        }
    }
}