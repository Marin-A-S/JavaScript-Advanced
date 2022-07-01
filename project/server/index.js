import express from "express";
import cors from "cors";
import { writeFile, readFile } from "fs/promises";

const CART = './public/cart_goods.json';
const GOODS = './public/goods.json';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const readCart = () => readFile(CART, 'utf-8')
  .then((cartFile) => {
    return JSON.parse(cartFile)
  });
const readGoods = () => readFile(GOODS, 'utf-8')
  .then((cartFile) => {
    return JSON.parse(cartFile)
  });

app.get('/cart', (req, res) => {

  Promise.all([
    readCart(),
    readGoods()
  ]).then(([cartList, goodsList]) => {
    return cartList.map((cartItem) => {
      const goodsItem = goodsList.find(({ id_product: goodsId }) => {
        return goodsId === cartItem.id_product
      });
      return {
        ...cartItem,
        ...goodsItem
      }
    })
  }).then((result) => {
    res.send(JSON.stringify(result))
  })

});
  
app.listen('8000', () => {
  console.log('server is starting!');
});