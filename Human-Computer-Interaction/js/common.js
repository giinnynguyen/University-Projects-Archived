//jquery start

$(function () {
    $('.remodal-cancel').click(function () {
        $('.white-menu').css('zIndex', 999999);
        $('.saleTitle').css('zIndex', 999999);

    });
    // $("#search").keyup(function(){
    //     search(product,$(this).val());
    // });
}); //jquery  end

/*function search*/
// function search(displayArr, keyWord) {
//     var result = [];
//     keyWord = keyWord.toLowerCase();
//     for (var i = 0; i < displayArr.length; i++) {
//         a = displayArr[i].ten_khach_hang.toLowerCase();
//         if (a.search(keyWord) != -1) {
//             result.push(displayArr[i]);
//         }
//     }
//     hien_thi_san_pham(result);
// }
/*search end*/

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

function openCart(ma_san_pham) {
    $('.saleTitle').css('zIndex', -1);
    $('.white-menu').css('zIndex', -1);
    var productOpen = sanpham(ma_san_pham);
    $('.imageProduct').attr('src', baseUrl + "/imageProduct/" + productOpen.image);
    $('.nameProduct').html("" + productOpen.productName);


    addToCart(ma_san_pham, 1);
}

function sanpham(ma_san_pham) {
    for (var i = 0; i < product.length; i++) {
        if (product[i].ma_san_pham == ma_san_pham)
            return product[i];
    }
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