//jquery start
var khuyenMai = khuyen_mai();
$(function () {
    hien_thi_san_pham(khuyenMai);
    hien_thi_hang();
    changeSelectCompany();
    changeSelectPrice();

}); //jquery  end

//**hien thi san pham start**/
function hien_thi_san_pham(displayArr) {
    var container = $("#container");
    container.html("");
    if (typeof (displayArr) == "undefined") {
        displayArr = [];
    }
    for (i = 0; i < displayArr.length; i += 4) {
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
        price.innerHTML = "Giá gốc: " + displayArr[i]["price"].toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + "VNĐ";
        footer.append(price);
        var sale = document.createElement('p');
        sale.className = 'sale-';
        sale.innerHTML = "Giảm còn: " + displayArr[i]["sale"].toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + "VNĐ";
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
            price.innerHTML = "Giá gốc: " + displayArr[i + 1]["price"].toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + "VNĐ";
            footer.append(price);
            var sale = document.createElement('p');
            sale.className = 'sale-';
            sale.innerHTML = "Giảm còn: " + displayArr[i + 1]["sale"].toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + "VNĐ";
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
            price.innerHTML = "Giá gốc: " + displayArr[i + 2]["price"].toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + "VNĐ";
            footer.append(price);
            var sale = document.createElement('p');
            sale.className = 'sale-';
            sale.innerHTML = "Giảm còn: " + displayArr[i + 2]["sale"].toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + "VNĐ";
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
            price.innerHTML = "Giá gốc: " + displayArr[i + 3]["price"].toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + "VNĐ";
            footer.append(price);
            var sale = document.createElement('p');
            sale.className = 'sale-';
            sale.innerHTML = "Giảm còn: " + displayArr[i + 3]["sale"].toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + "VNĐ";
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
    pagination();
}
//**hien thi san pham end **//

/**phan trang start **/
function pagination() {
    $(".pager").remove();
    $('.paginated').each(function () {
        var currentPage = 0;
        var numPerPage = 3;
        var $table = $(this);
        $table.bind('repaginate', function () {
            $table.find('.row').hide().slice(currentPage * numPerPage, (currentPage + 1) * numPerPage).show();
        });
        $table.trigger('repaginate');
        var numRows = $table.find('.row').length;
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

    $(".pager").css({ 'margin-top': '5px', "text-align": "center" });
    $(".pager span").css({
        'padding': "0", "border-radius": '0', 'display': 'inline-block', 'width': '1.8em', 'height': '1.8em', 'line-height': '1.8em'
        , 'text-align': 'center', 'cursor': 'pointer', 'background': '#4DB3D1', 'color': '#fff', 'margin-right': '0.5em'
    });
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

//hien thi ten hang trong nut select company 
function hien_thi_hang() {
    var companySelect = document.getElementById("selectCompany");
    companySelect.innerHTML = "<select id='selectCompany'>" + "<option>Tất cả</option>" + hangStringOption() + "</select>";
}
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



/**loc theo company*/
function filter(option) {
    var arr = [];
    if (option == "Tất cả") {
        arr = khuyenMai;
    } else {
        $.each(khuyenMai, function () {
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


/**function khi thay doi select sortByPrice*/
function changeSelectPrice() {
    $('#sortByPrice').change(function () {
        var selectedOption = $(this).val();
        var arr = [];
        if (selectedOption.toLowerCase() == "Tăng dần".toLowerCase()) {
            arr = sortIncrease(khuyenMai);
            hien_thi_san_pham(arr);
        } else if (selectedOption.toLowerCase() == "Giảm dần".toLowerCase()) {
            arr = sortDecrease(khuyenMai);
            hien_thi_san_pham(arr);
        } else if (selectedOption.toLowerCase() == "5tr-10tr".toLowerCase()) {
            arr = filter5_10();
            hien_thi_san_pham(arr);
        }
        else if (selectedOption.toLowerCase() == "10tr-15tr".toLowerCase()) {
            arr = filter10_15();
            hien_thi_san_pham(arr);
        }
        else if (selectedOption.toLowerCase() == "15tr-20tr".toLowerCase()) {
            arr = filter15_20();
            hien_thi_san_pham(arr);
        }
        else if (selectedOption.toLowerCase() == "Trên 20tr".toLowerCase()) {
            arr = filter20();
            hien_thi_san_pham(arr);
        }
    });
}

function sortIncrease(arr) {
    var sort = arr.sort(compareIncrease);

    return sort;
}
function compareIncrease(a, b) {
    if (parseInt(a.sale) < parseInt(b.sale))
        return -1;
    if (parseInt(a.sale) > parseInt(b.sale))
        return 1;
    return 0;
}

function sortDecrease(arr) {
    var sort = arr.sort(compareDecrease);
    return sort;
}
function compareDecrease(a, b) {

    if (parseInt(a.sale) > parseInt(b.sale))
        return -1;
    if (parseInt(a.sale) < parseInt(b.sale))
        return 1;
    return 0;
}


function filter5_10() {
    var arr = [];
    $.each(khuyenMai, function () {
        if (5000000 < parseInt(this.sale) && parseInt(this.sale) < 10000000)
            arr.push(this);
    });
    return arr;
}
function filter10_15() {
    var arr = [];
    $.each(khuyenMai, function () {
        if (10000000 < parseInt(this.sale) && parseInt(this.sale) < 15000000)
            arr.push(this);
    });
    return arr;
}
function filter15_20() {
    var arr = [];
    $.each(khuyenMai, function () {
        if (15000000 < parseInt(this.sale) && parseInt(this.sale) < 20000000)
            arr.push(this);
    });
    return arr;
}
function filter20() {
    var arr = [];
    $.each(khuyenMai, function () {
        if (parseInt(this.sale) > 20000000)
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