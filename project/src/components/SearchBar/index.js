export default Vue.component('search-bar', {
    template: `
    <input class="goods-search" type="text" @input="$emit('input', $event.target.value)">
    `
  })
