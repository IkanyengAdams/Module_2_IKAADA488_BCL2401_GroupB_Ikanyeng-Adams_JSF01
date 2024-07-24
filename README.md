# SwiftCart - README
Project Overview
SwiftCart is a single-page application designed to showcase a dynamic product listing with features such as product search, category-based filtering, and sorting. The application is built using Alpine.js, a minimal framework for composing JavaScript behavior in your HTML, and Tailwind CSS for styling. It allows users to view products, add them to favorites or cart, and interact with a modal to see more details about each product.

# Features
Product Listing: Displays a list of products fetched from a JSON file.
Search: Allows users to search for products by title.
Filtering: Enables filtering of products based on selected categories.
Sorting: Sorts products based on price, either in ascending or descending order.
Modal: Displays detailed information about a product in a modal when the product is clicked.
Favorites: Users can add products to their favorites.
Cart: Users can add products to their shopping cart.

# Technologies Used
HTML: Structure of the web page.
Tailwind CSS: For styling the web page.
Alpine.js: For reactive components and handling JavaScript logic.
JavaScript: Fetching and manipulating data.

# Setup and Installation
git clone https://github.com/yourusername/SwiftCart.git
cd SwiftCart

Install dependencies:

npm install

# Run the development server:

npm run dev

# File Descriptions
index.html
This is the main HTML file that contains the structure of the web page. It includes the header, search and sort form, and product listings. The Alpine.js data component is initialized here.

app.js
This JavaScript file contains the Alpine.js data component which includes state management, methods for fetching data, handling user interactions, and manipulating the product list.

data.json
This JSON file contains the sample product data used in the application. It includes an array of product objects with properties such as id, title, price, category, image, and rating.

tailwind.config.js
This configuration file for Tailwind CSS allows customization of the default Tailwind configuration.

postcss.config.js
This configuration file is for PostCSS, a tool used to transform CSS with JavaScript plugins.

vite.config.js
This configuration file is for Vite, a build tool that provides a faster and leaner development experience for modern web projects.

Alpine.js Data Component
The main logic of the application is handled in an Alpine.js data component. Here are the main properties and methods:

Properties
loading: Boolean indicating if the data is being loaded.
products: Array of products fetched from the JSON file.
categories: Array of unique product categories.
selectedCategory: Currently selected category for filtering.
sortOption: Current sorting option.
searchTerm: Current search term.
modalOpen: Boolean indicating if the modal is open.
selectedProduct: Currently selected product for displaying in the modal.
favourites: Array of products added to favourites.
cart: Array of products added to the cart.
