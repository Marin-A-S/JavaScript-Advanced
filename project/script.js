const goods = [
  { title: 'Duck', price: 240, img: 'images/Duck.jpg' },
  { title: 'Eagle', price: 320, img: 'images/Eagle.jpg' },
  { title: 'Owl', price: 295, img: 'images/Owl.jpg' },
  { title: 'Peafowl', price: 200, img: 'images/Peafowl.jpg' },
  { title: 'Sparrow', price: 175, img: 'images/Sparrow.jpg' },
];

class GoodsItem {
  constructor({ title, price, img }) {
    this.title = title;
    this.price = price;
    this.img = img;
  }

  render() {
    return `
    <div class="goods-item">
      <h3>${this.title}</h3>
      <img src="${this.img}" alt="Product image">
      <p>${this.price} &#8381;</p>
    </div>
  `;
  }
}

class GoodsList {
  items = [];

  fetchGoods() {
    this.items = goods;
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

const goodsList = new GoodsList();
goodsList.fetchGoods();
goodsList.render();