$(document).ready(() => {
  //console.log("Detail script Loaded!");

  const queryStr = window.location.search;
  const id = queryStr.toString().substring(4, queryStr.length);
  $.get(
    "https://5d76bf96515d1a0014085cf9.mockapi.io/product/" + id,
    (response) => {
      //console.log(response);
      const { name, preview, photos, description, brand, price } = response;

      $("#product-preview-big-img").prop({
        src: preview,
        alt: name,
      });

      $("#product-name").html(name);
      $("#product-brand").html(brand);
      $("#product-price").html(price);
      $("#product-description").html(description);

      photos.map((item, pos) => {
        // const smallImageWrapper = $("<div>").prop({
        //   class: "product-small-preview-img",
        //   id: "img-" + pos,
        // });

        const imageSmall = $("<img>").prop({
          class: "product-small-preview-img",
          id: "img-" + pos,
          src: item,
          alt: "image" + pos,
        });
        //smallImageWrapper.append(imageSmall);

        imageSmall.click(() => {
          changeBorder(pos, item);
        });
        $("#product-small-preview-img-wrapper").append(imageSmall);
      });

      changeBorder(0);

      $("#addto-cart-btn").click(() => {
        $("#addto-cart-btn").addClass("bigger");
        setTimeout(function () {
          $("#addto-cart-btn").removeClass("bigger");
        }, 200);
        handleCartClick(id, name, preview, price);
      });

      const handleCartClick = (id, name, preview, price) => {
        let productArr = [];
        let productObj = {
          id: id,
          name: name,
          preview: preview,
          price: price,
          count: 1,
        };
        let productList = window.localStorage.getItem("product-list");
        if (productList === null || productList === "") {
          productArr.push(productObj);
          window.localStorage.setItem(
            "product-list",
            JSON.stringify(productArr)
          );
          $("#cart-count").html(1);
        } else {
          addDataToStorage(productObj);
          let dataList = JSON.parse(
            window.localStorage.getItem("product-list")
          );
          let count = 0;

          //console.log("Data Found!");
          dataList.map((item) => {
            count += item.count;
            $("#cart-count").html(count);
          });
        }
      };

      const addDataToStorage = (obj) => {
        let isMatched = false; //initialy set it to false
        let productList = JSON.parse(
          window.localStorage.getItem("product-list")
        );

        productList.map((item, pos) => {
          //check if same id found
          if (obj.id === item.id) {
            item.count += 1;
            productList[pos] = item;
            window.localStorage.setItem(
              "product-list",
              JSON.stringify(productList)
            );
            //console.log("Id Matched!");
            isMatched = true; // if same items are found then we are setting it to true
          } else {
            isMatched = false; //else we are setting it to false
          }
        });
        if (!isMatched) {
          //if id is not matched then we are adding it to storage
          productList.push(obj);
          window.localStorage.setItem(
            "product-list",
            JSON.stringify(productList)
          );
          //console.log("Id not Matched!");
        }
      };
    }
  );

  const changeBorder = (id, url) => {
    $(".product-small-preview-img").removeClass(
      "product-small-preview-img-selected"
    );
    $("#img-" + id).addClass("product-small-preview-img-selected");
    $("#product-preview-big-img").prop({
      src: url,
    });
  };
});
