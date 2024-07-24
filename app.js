 /**
   * Increments the product counter by 1
   */

document.addEventListener('alpine:init',() => {
  Alpine.data('index', () => ({
    productCounter: 10,
    addToCart() {
      this.productCounter++;
    },
  }))
})