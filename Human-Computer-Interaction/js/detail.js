//jquery start
$(function () {
	hien_thi_san_pham();
	$(".addToCart").click(function () {
		alert("Added to cart successfully");
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
	$(".priceDetail").html("Original price: <del>" + productDetail.price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + "</del> VND");
	$(".company").html("Brand: " + productDetail.company);
	$(".priceAfterSale").html("Sale price:  <span>" + productDetail.sale.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + " VND </span>");
	$(".cpu").html("" + productDetail["detail"]["CPU"]);
	$(".memory").html("" + productDetail["detail"]["RAM"]);
	$(".buffer").html("" + productDetail["detail"]["Cache"]);
	$(".vga").html("" + productDetail["detail"]["Graphics"]);
	$(".screen").html("" + productDetail["detail"]["Display"]);
	$(".hdh").html("" + productDetail["detail"]["Operating system"]);
	$(".wifi").html("" + productDetail["detail"]["WiFi"]);
	$(".pin").html("" + productDetail["detail"]["PIN"]);
	$(".hdd").html("" + productDetail["detail"]["Hard drive"]);
	$(".dvd").html("" + productDetail["detail"]["Optical drive"]);
	$(".audio").html("" + productDetail["detail"]["Audio"]);
	$(".lan").html("" + productDetail["detail"]["LAN"]);
}


