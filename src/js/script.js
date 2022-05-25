function createProductCard(product) {
  const productList = document.querySelector("ul");

  const productItem = document.createElement("li");

  productList.append(productItem);
  productItem.append(
    createProductImg(product.img),
    createProductTitle(product.nome),
    createProductCategory(product.secao),
    createProductPrice(product.preco)
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

function createProductPrice(price) {
  const productPrice = document.createElement("p");
  productPrice.id = "price";
  productPrice.innerText = `R$${price.toFixed(2).replace(".", ",")}`;
  return productPrice;
}

function createProductList() {
  const container = document.querySelector(".containerListaProdutos");
  const productList = document.createElement("ul");
  container.append(productList);
}

let precoTotal = 0;

function getProducts(produtos) {
  const productList = document.querySelector("ul");
  productList.remove();
  createProductList();
  precoTotal = 0;
  for (let index = 0; index < produtos.length; index++) {
    let produto = produtos[index];
    createProductCard(produto);
    precoTotal = precoTotal + produto.preco;
    productsSumPrice();
  }
}

function productsSumPrice() {
  const totalSum = document.getElementById("precoTotal");
  totalSum.innerText = precoTotal.toFixed(2).replace(".", ",");
}

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

const searchForm = document.querySelector(".search-bar form");
const searchInput = document.querySelector(".search-bar input");

searchInput.addEventListener("keyup", (event) => {
  event.preventDefault();
  target = searchInput.value.toLowerCase();

  let produtosPorCategoria = [];

  for (let index = 0; index < produtos.length; index++) {
    if (produtos[index].nome.toLowerCase().includes(target)) {
      produtosPorCategoria.push(produtos[index]);
    } else if (target == "") {
      produtosPorCategoria.push(produtos[index]);
    }
  }
  getProducts(produtosPorCategoria);
});

getProducts(produtos);
