import {CART} from '/src/constants';
import {service, serviceWithBody} from '/src/services';

export default Vue.component('cart', {
    data() {
      return {
        cartList: []
      }
    },
    template: `
      <div class="cart-window">
        <div class="cart-header">
          <div class="cart-header-text">YOUR SHOPPING CART</div>
          <button type="button" class="cart-close" @click="$emit('close')">
            CLOSE
          </button>
        </div>

        <div class="cart-list">
          <div class="cart-list-header">
            <div>Product name</div>
            <div>Quantity, pcs</div>
            <div>Price / pc</div>
            <div>Total price</div>
          </div>

          <cart-item v-for="item in cartList" :item="item"
            @add="addGood" @del="delGood"></cart-item>

          <div class="cart-result">
            <div>Overall price: </div>
            <div>{{ getOverallCartPrice }} &#8381</div>
          </div>
        </div>
      </div>
    `,
    mounted() {
      service(CART).then((data) => {
        this.cartList = data
      })
    },
    methods: {
      addGood(id) {
        serviceWithBody(CART, "POST", {
          id
        }).then((data) => {
          this.cartList = data;
        })
      },
      delGood(id) {
        serviceWithBody(CART, "DELETE", {
          id
        }).then((data) => {
          this.cartList = data;
        })
      }
    },
    computed: {
      getOverallCartPrice() {
        const goodsCost = this.cartList.map((el) =>
          el.price * el.quantity);
        return goodsCost.reduce((prev, curr) => 
          prev + curr, 0)
      }
    },
  })
