export default Vue.component('custom-button', {
    template: `
      <button type="button" @click="$emit('click')">
        <slot></slot>
      </button>
    `
  });
