import "./style.css";
import Alpine from "alpinejs";
window.Alpine = Alpine;
import focus from "@alpinejs/focus";

Alpine.plugin(focus);

/**
 * Initializes and returns the store data object for Alpine.js
 * @returns {object} The store data object
 */
const storeData = () => ({
  products: [],
  allProducts: [],
  modalOpen: false,
  categories: [],
  selectedCategory: "",
  searchQuery: "",
  showModal: false,
  open: false,
  selectedProduct: null,
  loading: true,
  filterProducts: [],
  dropdownOpen: false,
  filterItem: "All categories",
  categories: [],
  searchValue: "",
  sorting: "",
  showLogin: false,
  productCounter: 10,

  /**
   * Increments the product counter by 1
   */
  addToCart() {
    this.productCounter++;
  },

  /**
   * Filters products based on the search value
   * @param {string} searchValue - The search term entered by the user
   */
  searchProducts(searchValue) {
    this.searchValue = searchValue;

    if (this.searchValue.trim() !== "") {
      const filteredProducts = this.allProducts.filter((product) =>
        product.title.toLowerCase().includes(this.searchValue.toLowerCase())
      );
      this.products = JSON.parse(JSON.stringify(filteredProducts));
    } else {
      this.products = JSON.parse(JSON.stringify(this.allProducts));
    }
  },

  /**
   * Fetches and loads products from the API
   */
  loadProducts() {
    this.loading = true;
    let url = "https://fakestoreapi.com/products";
    if (this.filterItem !== "All categories") {
      url = `${url}/category/${this.filterItem}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((products) => {
        if (this.searchTerm) {
          products = products.filter((product) =>
            product.title.toLowerCase().includes(this.searchTerm.toLowerCase())
          );
        }

        if (this.sorting === "Price: low to high") {
          products = products.sort((a, b) => a.price - b.price);
        } else if (this.sorting === "Price: high to low") {
          products = products.sort((a, b) => b.price - a.price);
        }

        this.products = products;
        this.loading = false;
      });
  },

  /**
   * Initializes the store data by fetching products and categories
   */
  init() {
    this.loading = true;
    Promise.all([
      fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((products) => {
          this.products = products;
          this.allProducts = products;
          this.filterProducts();
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

  /**
   * Filters products based on selected category and search query
   * @returns {Array} Filtered products array
   */
  filterProducts() {
    let filteredProducts = this.products;
    if (this.selectedCategory !== "") {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === this.selectedCategory
      );
    }
    if (this.searchQuery !== "") {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
    return filteredProducts;
  },

  /**
   * Selects a product to display in the modal
   * @param {object} product - The product object to be displayed
   */
  selectProduct(product) {
    this.selectedProduct = product;
    this.showModal = true;
  },

  /**
   * Closes the product detail modal
   */
  closeModal() {
    this.showModal = false;
    this.selectedProduct = null;
  },
});

document.addEventListener("alpine:init", () => {
  Alpine.data("storeData", storeData);
});

Alpine.start();
