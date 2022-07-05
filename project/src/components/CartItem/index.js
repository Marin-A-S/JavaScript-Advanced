export default Vue.component('cart-item', {
    props: [
      'item'
    ],
    template: `
      <div class="cart-list-item">
        <div>{{ item.product_name }}</div>
        <div class="quantity">
          <button type="button" class="quantity-left-button"
            @click="$emit('del', item.id_product)">-</button>
          <div class="quantity-value">{{ item.quantity }}</div>
          <button type="button" class="quantity-right-button"
            @click="$emit('add', item.id_product)">+</button>
        </div>
        <div class="price">{{ item.price }} &#8381</div>
        <div class="price-total">{{ item.quantity * item.price }} &#8381</div>
      </div>
    `
  })
