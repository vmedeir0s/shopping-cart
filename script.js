function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  // coloque seu código aqui
  event.target.remove();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const adicionaItemCarrinho = (item) => {
  const positionCar = document.querySelector('.cart__items');
  positionCar.appendChild(item);
};

const eventButton = async (event) => {
  const elementoPai = event.target.parentElement;
  const valueSku = getSkuFromProductItem(elementoPai);
  const itemBruto = await fetchItem(valueSku);
  const { id, title, price } = itemBruto;
  const objeto = {
    sku: id,
    name: title,
    salePrice: price,
  };
  adicionaItemCarrinho(createCartItemElement(objeto));
};

const getProducts = async () => {
  const results = await fetchProducts('computador');
  const positionSection = document.querySelector('.items');
  results.forEach((element) => {
    const objeto = {
      sku: element.id,
      name: element.title,
      image: element.thumbnail,
    };
    const result = createProductItemElement(objeto);
    result.addEventListener('click', eventButton);
    positionSection.appendChild(result); 
  });
};

window.onload = () => { 
   getProducts();
};