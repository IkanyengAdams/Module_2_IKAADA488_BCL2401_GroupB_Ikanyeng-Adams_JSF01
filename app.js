document.addEventListener('alpine:init',() => {
  Alpine.data('index', () => ({
    productCounter: 9,
  }))
})