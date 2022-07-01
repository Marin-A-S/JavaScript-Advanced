const BASE_URL = 'http://localhost:8000/';
const GOODS = `${BASE_URL}goods.json`;
const GOODS_CART = `${BASE_URL}cart`;

function service(url) {
  return fetch(url).then((res) => res.json())
}

window.onload = () => {
  Vue.component('search-bar', {
    template: `
    <input class="goods-search" type="text" @input="$emit('input', $event.target.value)">
    `
  })
  Vue.component('cart', {
    data() {
      return {
        cartGoodsItems: []
      }
    },
    props: {
      cartList: Array,
      overallPrice: Number,
    },
    template: `
      <div class="cart-window">
        <div class="cart-header">
          YOUR SHOPPING CART
        </div>

        <div class="cart-list">
          <div class="goods-item">
            <div>Product name</div>
            <div>Quantity, pcs</div>
            <div>Price per piece</div>
            <div>Total price</div>
          </div>

          <good v-for="item in this.cartList" :item="item"></good>

          <div class="cart-result">
            Overall price: {{ this.overallPrice }}&#8381
          </div>

          <div class="cart-list-close" v-on:click="$emit('close')">
            CLOSE
          </div>
        </div>
      </div>
    `,

    mounted() {
      service(GOODS_CART).then((data) => {
        this.cartGoodsItems = data
      })
    }
  })
  Vue.component('good', {
    props: [
      'item'
    ],    
    template: `
      <div class="goods-item">
        <div>{{ item.product_name }}</div>
        <div class="quantity">
          <button><img src="cart-icon-minus.png" title="Decrease quantity"
            alt="Decrease quantity">
          </button>
          <div>{{ item.quantity }}</div>
          <button><img src="cart-icon-plus.png" title="Increase quantity"
            alt="Increase quantity">
          </button>
        </div>
        <div class="price">{{ item.price }}&#8381</div>
        <div class="price-total">&#36;{{ item.quantity * item.price }}</div>
      </div>
    `
  })
  Vue.component('custom-button', {
    template: `
      <button type="button" v-on:click="$emit('click')">
        <slot></slot>
      </button>
    `
  })
  const app = new Vue({
    el: '#root',
    data: {
      items: [],
      searchValue: '',
      isCartVisible: false,
      emptyCart: false,
    },
    methods: {
      cartVisibilityChange() {
        this.isCartVisible = !this.isCartVisible
      }      
    },
    mounted() {
      service(GOODS).then((data) => {
        this.items = data;
        this.filteredItems = data;
        return data;
      })
    },
    computed: {
      filteredItems() {
        return this.items.filter(({ product_name }) => {
          return product_name.match(new RegExp(this.searchValue, 'gui'))
        })
      },      
      calculatePrice() {
        return this.filteredItems.reduce((prev, { price }) => prev + price, 0);
      },
    },
  });
}