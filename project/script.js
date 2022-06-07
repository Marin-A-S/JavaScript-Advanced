const goods = [
  { title: 'Duck', price: 240, img: 'images/Duck.jpg' },
  { title: 'Eagle', price: 320, img: 'images/Eagle.jpg' },
  { title: 'Owl', price: 295, img: 'images/Owl.jpg' },
  { title: 'Peafowl', price: 200, img: 'images/Peafowl.jpg' },
  { title: 'Sparrow', price: 175, img: 'images/Sparrow.jpg' },
];

const renderGoodsItem = ({ title = '', price = 0, img = '' }) => `
  <div class="goods-item">
    <h3>${title}</h3>
    <img src="${img}" alt="Product image">
    <p>${price} &#8381;</p>
  </div>
`;

const renderGoodsList = (list = []) => {
  let goodsList = list.map(item => renderGoodsItem(item));
  document.querySelector('.goods-list').innerHTML = goodsList.join('');
}

renderGoodsList(goods);