$(document).ready(() => {
  //console.log("Script Loaded!");

  $(".center").slick({
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "0",
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "0",
          slidesToShow: 1,
        },
      },
    ],
  });

  $.get("https://5d76bf96515d1a0014085cf9.mockapi.io/product", (response) => {
    //console.log(response);
    response.map((item, pos) => {
      const { id, name, brand, isAccessory, preview, price } = item;
      const itemAnchorWrapper = $("<a>").prop({
        href: "/ProductDetails/productdetail.html?id=" + id,
        class: "item-anchor-wrapper",
      });
      const itemCardDiv = $("<div>").prop({
        class: "item-card",
      });
      const previeImg = $("<img>").prop({
        class: "item-preview-img",
        src: preview,
        alt: name,
      });

      const itemInfoWrapper = $("<div>").prop({
        class: "item-info-wrapper-div",
      });
      const itemName = $("<h3>").html(name);
      const itemBrand = $("<p>").html(brand);
      const itemPrice = $("<h3>")
        .prop({
          class: "item-price-text",
        })
        .html("Rs " + price);
      itemInfoWrapper.append(itemName, itemBrand, itemPrice);
      itemAnchorWrapper.append(previeImg);
      itemCardDiv.append(itemAnchorWrapper, itemInfoWrapper);

      if (isAccessory) {
        $("#accessories-item-card-wrapper").append(itemCardDiv);
      } else {
        $("#clothing-item-card-wrapper").append(itemCardDiv);
      }
    });
  });

  //$("#myCarousel").carousel({ interval: 2000 ,});
});
