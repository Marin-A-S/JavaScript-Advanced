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
  .then((goodsFile) => {
    return JSON.parse(goodsFile)
  });

function getReformBasket() {
  return Promise.all([
    readGoods(),
    readCart()
  ]).then(([goodsList, cartList]) => {
    const result = cartList.map((cartItem) => {
      const { id_product: _cartItemId } = cartItem;
      const goodsItem = goodsList.find(({ id_product: _goodsItemId }) =>
      _goodsItemId == _cartItemId);
      return {
        ...cartItem,
        ...goodsItem
      }
    })
    return result
  });
}

app.post('/cart', (res, req) => {

  readCart().then((cartList) => {
    const cartItem = cartList.find(({ id_product: _id }) => _id === res.body.id);
    if (!cartItem) {
      cartList.push({
        id_product: res.body.id,
        quantity: 1,
      })
    } else {
      cartList = cartList.map((cartItem) => {
        if (cartItem.id_product === res.body.id) {
          return {
            ...cartItem,
            quantity: cartItem.quantity + 1
          }
        } else {
          return cartItem
        }
      })
    }
    return writeFile(CART, JSON.stringify(cartList)).then(() => {
      return getReformBasket()
    }).then((result) => {
      req.send(result)
    })
  })
});

app.delete('/cart', (res, req) => {
  readCart().then((cartList) => {
    const cartItem = cartList.find(({ id_product: _id }) => _id === res.body.id);
      if (cartItem.quantity === 1) {
        cartList = cartList.filter(({ id_product: _id }) => _id !== res.body.id);
      } else {
        cartList = cartList.map((cartItem) => {
          if (cartItem.id_product === res.body.id) {
            return {
              ...cartItem,
              quantity: cartItem.quantity - 1
            }
          } else {
            return cartItem
          }
        })
      }
      return writeFile(CART, JSON.stringify(cartList)).then(() => {
        return getReformBasket()
      }).then((result) => {
        req.send(result)
      })
  })
});

app.get('/cart', (res, req) => {
  getReformBasket().then((result) => {
    req.send(JSON.stringify(result))
  })
});
  
app.listen('8000', () => {
  console.log('server is starting!');
});
