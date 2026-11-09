//jquery start
$(function () {
	hien_thi_san_pham();
	$(".addToCart").click(function () {
		alert("Thêm thành công vào giỏ hàng");
		addToCart(getURLParameter('ma_san_pham'), $(".so_luong").val());
		console.log(loginUser.cart);
	});
}); //jquery  end

function getURLParameter(name) {
	return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}
var ma_san_pham = getURLParameter('ma_san_pham');
console.log(ma_san_pham);

function selectProduct(ma_san_pham) {
	for (var i = 0; i < product.length; i++) {
		if (product[i].ma_san_pham == ma_san_pham) {
			console.log(product[i])
			return product[i];
		}
	}
}
function hien_thi_san_pham() {
	var productDetail = selectProduct(ma_san_pham);
	$("#product-image").html("<img src='" + baseUrl + "/imageProduct/" + productDetail.image + "'>");
	$("#product-info h1").html("" + productDetail.productName);
	$(".priceDetail").html("Giá gốc: <del>" + productDetail.price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + "</del> VNĐ");
	$(".company").html("Hãng: " + productDetail.company);
	$(".priceAfterSale").html("Giá ưu đãi:  <span>" + productDetail.sale.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + " VNĐ </span>");
	$(".cpu").html("" + productDetail["detail"]["CPU"]);
	$(".memory").html("" + productDetail["detail"]["RAM"]);
	$(".buffer").html("" + productDetail["detail"]["Bộ nhớ đệm"]);
	$(".vga").html("" + productDetail["detail"]["Đồ họa"]);
	$(".screen").html("" + productDetail["detail"]["Màn hình"]);
	$(".hdh").html("" + productDetail["detail"]["Hệ điều hành"]);
	$(".wifi").html("" + productDetail["detail"]["WiFi"]);
	$(".pin").html("" + productDetail["detail"]["PIN"]);
	$(".hdd").html("" + productDetail["detail"]["Ổ cứng"]);
	$(".dvd").html("" + productDetail["detail"]["Đĩa quang"]);
	$(".audio").html("" + productDetail["detail"]["Âm thanh"]);
	$(".lan").html("" + productDetail["detail"]["LAN"]);
}


