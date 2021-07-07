$(document).ready(() => {
  //console.log("BaseCount loaded!");
  let count = 0;
  let isHamActive = false;
  function setCartCount(dataList) {
    //console.log("Data Found!");
    dataList.map((item) => {
      count += item.count;
    });
    $("#cart-count").html(count);
  }

  //window.localStorage.setItem("product-list");

  let dataList = window.localStorage.getItem("product-list");
  if (dataList === null || dataList === "") {
    //console.log("No data Found");
  } else {
    dataList = JSON.parse(dataList);
    setCartCount(dataList);
  }

  $("#cart-count-div").click(() => {
    window.location.href = "/CheckOutPage/checkout-cart.html";
  });

  $("#hamburger-icon").click(() => {
    if (isHamActive) {
      $("#hamburger-nav-div").removeClass("nav-active");
      $("#hamburger-icon-i").addClass("fa-bars");
      $("#hamburger-icon-i").removeClass("fa-times");
      $(".homepage-div").css("padding-top", "4%");
      isHamActive = false;
    } else {
      $("#hamburger-nav-div").addClass("nav-active");
      $("#hamburger-icon-i").addClass("fa-times");
      $("#hamburger-icon-i").removeClass("fa-bars");
      $(".homepage-div").css("padding-top", "12%");
      isHamActive = true;
    }
  });
});
