function createProductCard(product) {
  const productList = document.querySelector("ul");

  const productItem = document.createElement("li");
  productItem.id = product.id;

  const priceSection = document.createElement("div");
  priceSection.classList.add("price-section");

  productList.append(productItem);
  productItem.append(
    createProductImg(product.img),
    createProductTitle(product.nome),
    createProductCategory(product.secao),
    createProductComponentes(product.componentes),
    priceSection
  );
  priceSection.append(
    createProductPrice(product.preco),
    createProductCardButton(product.id)
  );
}

function createProductImg(image) {
  const productImg = document.createElement("img");
  productImg.src = image;
  return productImg;
}

function createProductTitle(title) {
  const productTitle = document.createElement("h3");
  productTitle.innerText = title;
  productTitle.id = "title";
  return productTitle;
}

function createProductCategory(category) {
  const productCategory = document.createElement("p");
  productCategory.innerText = category;
  productCategory.id = "category";
  return productCategory;
}

function createProductComponentes(componentes) {
  const listaComponentes = document.createElement("ul");
  listaComponentes.id = "lista-componentes";

  const comp = componentes.forEach((componente, index) => {
    const componenteItem = document.createElement("li");
    componenteItem.innerText = `${index + 1}. ${componente}`;
    listaComponentes.append(componenteItem);
  });
  return listaComponentes;
}

function createProductPrice(price) {
  const productPrice = document.createElement("p");
  productPrice.id = "price";
  productPrice.innerText = `R$${price.toFixed(2).replace(".", ",")}`;
  return productPrice;
}

function createProductCardButton(productId) {
  const cartButton = document.createElement("button");
  cartButton.innerText = "Comprar";
  cartButton.id = productId;
  cartButton.classList.add("cart-button");
  return cartButton;
}

function createProductRemoveCart(productId) {
  const removeButton = document.createElement("button");
  removeButton.id = productId;
  removeButton.classList.add("remove-button");
  return removeButton;
}

function cartEmpty() {
  const cartProducts = document.querySelector(".cart-products");
  cartProducts.style.height = "268px";

  const nadaText = document.createElement("p");
  nadaText.innerText = "Por enquanto não temos produtos no carrinho";

  const cartIcon = document.createElement("i");
  cartIcon.id = "cart-icon";
  cartIcon.classList.add("fa-solid", "fa-basket-shopping");

  cartProducts.append(cartIcon, nadaText);
}

function getProducts(produtos) {
  const productList = document.querySelector("ul");
  productList.innerHTML = "";
  for (let index = 0; index < produtos.length; index++) {
    let produto = produtos[index];
    createProductCard(produto);
  }
}

let precoTotal = 0;

function productsSumPrice() {
  const totalSum = document.querySelector("#total-price");
  totalSum.innerText = `R$ ${precoTotal.toFixed(2).replace(".", ",")}`;
}

function filterButtonsListener() {
  const filterMenu = document.querySelector(".product-filter");

  filterMenu.addEventListener("click", (event) => {
    target = event.target;

    let produtosPorCategoria = [];

    for (let index = 0; index < produtos.length; index++) {
      if (produtos[index].secao == target.id) {
        produtosPorCategoria.push(produtos[index]);
      }
      if (target.id == "all-products") {
        produtosPorCategoria.push(produtos[index]);
      }
    }

    getProducts(produtosPorCategoria);
  });
}
filterButtonsListener();

function filterInputListener() {
  const searchInput = document.querySelector(".search-bar input");

  searchInput.addEventListener("keyup", (event) => {
    event.preventDefault();
    target = searchInput.value.toLowerCase();

    const produtosPorCategoria = produtos.filter((produto) => {
      const productName = produto.nome.toLowerCase();
      const productSection = produto.secao.toLowerCase();
      const productCategory = produto.categoria.toLowerCase();
      if (
        productName.includes(target) ||
        productSection.includes(target) ||
        productCategory.includes(target)
      ) {
        return true;
      }
    });

    getProducts(produtosPorCategoria);
  });
}
filterInputListener();

getProducts(produtos);

let cartId = 0;

function addToCartListener() {
  const productListContainer = document.querySelector(".Lista-Produtos");
  const cartProducts = document.querySelector(".cart-products");

  productListContainer.addEventListener("click", (event) => {
    let target;
    event.preventDefault();
    if (event.target.classList == "cart-button") {
      target = event.target.id;
      if (cartId < 1) {
        cartProducts.innerHTML = "";
        const cartList = document.createElement("ul");
        cartList.classList.add("cart-list");
        cartProducts.append(cartList);
        removeButtonListener();
      }
    }

    produtos.forEach((produto) => {
      if (target == produto.id) {
        addProductCard(produto);
        precoTotal += produto.preco;
        productsSumPrice();
      }
    });
  });
}
addToCartListener();

function addProductCard(product) {
  const cartList = document.querySelector(".cart-list");

  const cartProduct = document.querySelector(".cart-products");
  cartProduct.style.height = "auto";

  const cartItem = document.createElement("li");
  cartItem.classList.add("item-cart");
  cartItem.id = product.id;
  cartId += 1;
  cartItem.classList.add(`cart-${cartId}`);

  const itemInfo = document.createElement("div");
  itemInfo.classList.add("item-info");

  cartItem.append(
    createProductImg(product.img),
    itemInfo,
    createProductRemoveCart(cartId)
  );
  itemInfo.append(
    createProductTitle(product.nome),
    createProductCategory(product.secao),
    createProductPrice(product.preco)
  );
  cartList.append(cartItem);
}

function removeItemCart(productId) {
  const listItem = document.querySelector(`.cart-${productId}`);
  listItem.remove();

  const productosId = listItem.id;
  const productPrice = produtos[productosId - 1].preco;
  precoTotal -= productPrice;
  productsSumPrice();
}

function removeButtonListener() {
  const cartList = document.querySelector(".cart-list");

  cartList.addEventListener("click", (event) => {
    const itemId = event.target.id;
    removeItemCart(itemId);

    if (cartList.childElementCount == 0) {
      cartId = 0;
      cartEmpty();
    }
  });
}

// Dark Mode

function darkBody() {
  const bodyClass = document.body.classList;
  bodyClass.toggle("body-dark");
}

function darkTitle() {
  const siteTitle = document.querySelector(".site-title");
  const titleClass = siteTitle.classList;
  titleClass.toggle("site-title-dark");
}

function darkInput() {
  const input = document.querySelector(".search-bar input");
  const inputClass = input.classList;
  inputClass.toggle("search-bar-dark");
  inputClass.toggle("input-search");
}

// function totalPriceDark() {
//   const div = document.querySelector(".containerPrecoTotal");
//   const divClass = div.classList;
//   divClass.toggle("containerPrecoTotal-dark");
// }

function listDark() {
  const listItem = document.querySelectorAll(".containerListaProdutos li");

  listItem.forEach((item) => {
    const ItemClass = item.classList;
    ItemClass.toggle("containerListaProdutos-dark");
  });
}

function darkMode() {
  const createIcon = document.querySelector(".fa-moon");
  const iconClass = createIcon.classList;
  const result = iconClass.toggle("fa-sun");
  darkBody();
  darkTitle();
  // totalPriceDark();
  darkInput();
  listDark();
}

function darkModeButton() {
  const darkButton = document.querySelector(".dark-button");

  darkButton.addEventListener("click", darkMode);
}
darkModeButton();
