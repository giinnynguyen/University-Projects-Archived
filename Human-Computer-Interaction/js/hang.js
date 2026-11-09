$(function () {
    hien_thi_hang();




});

function hien_thi_san_pham(displayArr) {
    var container = $(".container");
    if (typeof (displayArr) == "undefined") {
        displayArr = [];
    }
    for (i = 0; i < 4; i += 4) {
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
            sale.innerHTML = "Giảm còn: " + parseInt(displayArr[i + 3]["salse"]).formatMoney(0, ",", ".") + "VNĐ";
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
//**hien thi san pham end **//

//**hien thi hang start**/
function hien_thi_hang() {
    var showProduct = document.getElementById("product");
    for (var i = 0; i < company.length; i++) {
        var container = document.createElement('div');
        container.className = 'container';
        showProduct.appendChild(container);
        var row12 = document.createElement('div');
        row12.className = 'row text-center';
        container.appendChild(row12);
        var col12 = document.createElement('div');
        col12.className = 'col-md-12';
        row12.appendChild(col12);
        var title = document.createElement('h1');
        title.innerHTML = company[i]["ten_hang"] + " <a class='viewAll' href='hang.html?ma_hang=" + company[i]["ma_hang"] + "'><span class='fa fa-arrow-down'></span></a>";
        row12.appendChild(title);
        var congty = company[i]["ma_hang"];
        var arr = filter(congty);
        hien_thi_san_pham(arr);
    }
}
/**hien thi hang end **/
function filter(option) {
    var arr = [];
    $.each(product, function () {
        if (this.company.toLowerCase() == option.toLowerCase())
            arr.push(this);
    });
    return arr;
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