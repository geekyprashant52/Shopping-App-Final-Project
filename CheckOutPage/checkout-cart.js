$(document).ready(() => {
  //console.log("Checkout cart!");
  let finalPrice = 0;
  //let finalCount = 0;

  const createLeftDiv = ({ preview, name, count, price }) => {
    //let count = 0;
    //finalCount += count;
    finalPrice += parseInt(price) * parseInt(count);
    const checkOutItemDiv = $("<div>").prop({
      class: "checkout-item-div",
    });
    const checkOutItemImgWrapper = $("<div>").prop({
      class: "checkout-item-img-wrapper",
    });
    const checkOutImage = $("<img>").prop({
      src: preview,
      alt: name + "img",
    });
    checkOutItemImgWrapper.append(checkOutImage);
    const checkOutItemInfoWrapper = $("<div>").prop({
      class: "checkout-item-info-wrapper",
    });
    const itemName = $("<h3>").prop({}).html(name);
    const itemCount = $("<p>").prop({}).html(`x${count}`);
    const itemPrice = $("<p>").prop({}).html(`Amount: Rs ${price}`);
    checkOutItemInfoWrapper.append(itemName, itemCount, itemPrice);
    checkOutItemDiv.append(checkOutItemImgWrapper, checkOutItemInfoWrapper);
    $("#left-div-checkout").append(checkOutItemDiv);
  };

  let dataList = window.localStorage.getItem("product-list");
  if (dataList === null || dataList === "") {
    //console.log("No data Found");
  } else {
    dataList = JSON.parse(dataList);
    dataList.map((item) => {
      createLeftDiv({ ...item });
      $("#checkout-price").html(finalPrice);
    });

    $("#total-cart-count").html(dataList.length);
  }

  $("#place-order-btn").click(() => {
    if (dataList === null || dataList === "") {
      //console.log("No data Found");
    } else {
      let productArray = [];
      dataList.map((item) => {
        productArray.push(item);
      });
      let dataObj = {
        amount: finalPrice,
        products: productArray,
      };
      $.post(
        "https://5d76bf96515d1a0014085cf9.mockapi.io/order",
        dataObj,
        function () {
          alert("Order Placed Successfully");
          window.localStorage.setItem("product-list", []);
          window.location.href = "/ThankYouPage/thankyou.html";
        }
      );
      finalPrice = 0;
    }
  });
});
