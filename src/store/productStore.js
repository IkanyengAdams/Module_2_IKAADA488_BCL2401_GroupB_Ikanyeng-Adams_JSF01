import { create } from "zustand";

export const useProductStore = create((set, get) => ({
  products: [],
  originalProducts: [],
  loading: false,
  error: false,
  sorting: "default",
  searchTerm: "",
  filterItem: "All categories",

  setSorting: (sorting) => {
    set({ sorting: sorting });
  },

  setSearchTerm: (searchTerm) => {
    set({ searchTerm: searchTerm });
  },

  setFilterItem: (category) => {
    set({ filterItem: category });
  },

  fetchProducts: async () => {
    if (get().filterItem !== "All categories") {
      try {
        set({ loading: true });
        const response = await fetch(
          `https://fakestoreapi.com/products/category/${get().filterItem}`
        );
        if (!response.ok) {
          throw new Error(
            "Data fetching failed, please check your network connection"
          );
        }
        const data = await response.json();
        set({
          products: data,
          originalProducts: JSON.parse(JSON.stringify(data)),
          loading: false,
        });
      } catch (error) {
        set({ error: error });
      } finally {
        get().sortProducts();
        get().searchProducts();
      }
    } else {
      try {
        set({ loading: true });
        const response = await fetch(`https://fakestoreapi.com/products`);
        if (!response.ok) {
          throw new Error(
            "Data fetching failed :( , please check your network connection and reload."
          );
        }
        const data = await response.json();
        set({
          products: data,
          originalProducts: JSON.parse(JSON.stringify(data)),
          loading: false,
        });
      } catch (error) {
        set({ error: error });
      } finally {
        get().sortProducts();
        get().searchProducts();
      }
    }
  },

  sortProducts: () => {
    if (get().sorting !== "default") {
      set({
        products: get().products.sort((a, b) =>
          get().sorting === "low" ? a.price - b.price : b.price - a.price
        ),
      });
    } else {
      const { originalProducts } = useProductStore.getState();
      set({ products: JSON.parse(JSON.stringify(originalProducts)) });
    }
  },

  searchProducts: () => {
    const { originalProducts } = useProductStore.getState();
    if (get().searchTerm.trim() !== "") {
      const filteredProducts = originalProducts.filter((product) =>
        product.title.toLowerCase().includes(get().searchTerm.toLowerCase())
      );

      set({
        ...get(),
        products: JSON.parse(JSON.stringify(filteredProducts)),
      });
    }
  },
}));
