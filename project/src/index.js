import './style.css';
import './components/CartItem';
import './components/SearchBar';
import './components/Cart';
import './components/CustomButton';
import './components/Good';
import { GOODS, CART } from './constants';
import { service } from './services';

window.onload = () => {
  const app = new Vue({
    el: '#root',
    data: {
      items: [],
      cartList: [],
      searchValue: '',
      isCartVisible: false,
    },
    methods: {
      showCart() {
        this.isCartVisible = true
      },
      closeCart() {
        this.isCartVisible = false
      }
    },
    mounted() {
      service(GOODS).then((data) => {
        this.items = data;
        this.filteredItems = data;
        return data;
      })
      service(CART).then((data) => {
        this.cartList = data;
        return data;
      })
    },
    computed: {
      filteredItems() {
        return this.items.filter(({ product_name }) => {
          return product_name.match(new RegExp(this.searchValue, 'gui'))
        })
      },
      getOverallPrice() {
        return this.items.reduce((prev, { price }) => prev + price, 0)
      }
    },
  });
}
