import "./style.css";
import Alpine from "alpinejs";
window.Alpine = Alpine;

const storeData = () => ({
  data: {
    products: [],
  },
  showModal: false,
  loading: true,
  init() {
    this.loading = true;
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((products) => {
        this.data.products = products;
      })
      .catch((error) => console.error("Error fetching data:", error))
      .finally(() => {
        this.loading = false;
      });
  },
});

document.addEventListener("alpine:init", () => {
  Alpine.data("storeData", storeData);
});

Alpine.start();

