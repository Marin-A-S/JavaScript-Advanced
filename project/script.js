const BASE_URL = 'https://raw.githubusercontent.com/Marin-A-S/online-store-api/lesson-3/responses';
const GOODS = `${BASE_URL}/catalogData.json`;
const GOODS_BASKET = `${BASE_URL}/getBasket.json`;

function service(url) {
  return fetch(url).then((res) => res.json())
}

window.onload = () => {
  const app = new Vue({
    el: '#root',
    data: {
      items: [],
      filteredItems: [],
      searchValue: '',
      isCartVisible: false,
      whileCartIsEmpty: true,
      emptyCart: false,
    },
    methods: {
      fetchGoods() {
        service(GOODS).then((data) => {
          this.items = data;
          this.filteredItems = data;
          this.whileCartIsEmpty = false;
        });
      },
      filterItems() {
        this.filteredItems = this.items.filter(({ product_name }) => {
          return product_name.match(new RegExp(this.searchValue, 'gui'))
        })
      },
      cartVisibilityChange() {
        if (this.isCartVisible) {
          this.isCartVisible = false;
        }
        else {
          this.isCartVisible = true;
        }
      }
    },
    computed: {
      calculatePrice() {
        return this.items.reduce((prev, { price }) => prev + price, 0);
      },
    },
      mounted() {
      this.fetchGoods();
    }
  });
}