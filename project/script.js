const goods = [
  { title: 'Duck', price: 240, img: 'images/Duck.jpg' },
  { title: 'Eagle', price: 320, img: 'images/Eagle.jpg' },
  { title: 'Owl', price: 295, img: 'images/Owl.jpg' },
  { title: 'Peafowl', price: 200, img: 'images/Peafowl.jpg' },
  { title: 'Sparrow', price: 175, img: 'images/Sparrow.jpg' },
];

const BASE_URL = 'https://raw.githubusercontent.com/Marin-A-S/online-store-api/lesson-3/responses';
const GOODS = `${BASE_URL}/catalogData.json`;
const GOODS_BASKET = `${BASE_URL}/getBasket.json`;

function service(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url)
  xhr.send();

  const loadHandler = () => {
    callback(JSON.parse(xhr.response))
  }
  xhr.onload = loadHandler;
}

class GoodsItem {
  constructor({ product_name, price, img }) {
    this.product_name = product_name;
    this.price = price;
    this.img = img;
  }

  render() {
    return `
    <div class="goods-item">
      <h3>${this.product_name}</h3>
      <img src="images/${this.product_name}.jpg" alt="Product image">
      <p>${this.price} &#8381;</p>
    </div>
  `;
  }
}

class GoodsList {
  items = [];

  fetchGoods(callback) {
    service(GOODS, (data) => {
      this.items = data;
      callback()
    });
  }

  calculatePrice() {
    return this.items.reduce((prev, { price }) => prev + price, 0)
  }

  render() {
    const goods = this.items.map(item => {
      const goodItem = new GoodsItem(item);
      return goodItem.render()
    }).join('');

    document.querySelector('.goods-list').innerHTML = goods;
  }
}

class BasketGoodsList {
  items = [];
  fetchGoods() {
    service(GOODS_BASKET, (data) => {
      this.items = data.contents;
    });
  }
}

const goodsList = new GoodsList();
goodsList.fetchGoods(() => {
  goodsList.render();
  goodsList.calculatePrice();
});

const basketGoodsList = new BasketGoodsList();
basketGoodsList.fetchGoods();
