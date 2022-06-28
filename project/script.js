const BASE_URL = 'https://raw.githubusercontent.com/Marin-A-S/online-store-api/lesson-3/responses';
const GOODS = `${BASE_URL}/catalogData.json`;
const GOODS_BASKET = `${BASE_URL}/getBasket.json`;

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
    template: `
      <div class="cart-window">
        <div class="cart-list">
          <div class="goods-item">
            <h3>Product_name</h3>
            <img src="images/Eagle.jpg" alt="Product image">
            <p>Price</p>
          </div>
          <div class="cart-list-close" v-on:click="$emit('close')">
            CLOSE
          </div>
        </div>
      </div>
    `
  })
  Vue.component('good', {
    props: [
      'item'
    ],    
    template: `
      <div class="goods-item">
         <h3>{{ item.product_name }}</h3>
         <img src="images/Duck.jpg" alt="Product image">
         <p>{{ item.price }}&#8381;</p>
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