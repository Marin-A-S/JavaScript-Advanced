import { CART } from '/src/constants';
import { serviceWithBody } from '/src/services';

export default Vue.component('good', {
    props: [
      'item'
    ],
    template: `
      <div class="goods-item">
        <h3>{{ item.product_name }}</h3>
        <img :src="'./assets/images/' + item.product_name + '.jpg'"
          alt="Product image">
        <div class="add-to-cart">
          <p>{{ item.price }} &#8381;</p>
          <custom-button class="add-button" @click="this.addGood">
            Add to cart
          </custom-button>
        </div>
      </div>
    `,
    methods: {
      addGood() {
        serviceWithBody(CART, "POST", {
          id: this.item.id_product
        })
      }
    }
  })
