import "./style.css";
import Alpine from "alpinejs";
window.Alpine = Alpine;

const storeData = () => ({
  data: {
    products: [],
  },
  categories: [],
  selectedCategory: '',
  showModal: false,
  selectedProduct: null,
  loading: true,
  init() {
    this.loading = true;
    Promise.all([
      fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((products) => {
          this.data.products = products;
        }),
      fetch("https://fakestoreapi.com/products/categories")
        .then((res) => res.json())
        .then((categories) => {
          this.categories = categories;
        }),
    ])
      .catch((error) => console.error("Error fetching data:", error))
      .finally(() => {
        this.loading = false;
      });
  },
  filterProducts() {
    if (this.selectedCategory === '') {
      return this.data.products;
    } else {
      return this.data.products.filter(
        (product) => product.category === this.selectedCategory
      );
    }
  },
  selectProduct(product) {
    this.selectedProduct = product;
    this.showModal = true;
  },
  closeModal() {
    this.showModal = false;
    this.selectedProduct = null;
  },
});

document.addEventListener("alpine:init", () => {
  Alpine.data("storeData", storeData);
});

Alpine.start();