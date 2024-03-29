import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      let maxPrice = action.payload.map((product) => product.price);
      maxPrice = Math.max(...maxPrice);

      return {
        ...state,
        all_products: [...action.payload],
        filtered_products: [...action.payload],
        filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
      };
    case SET_GRIDVIEW:
      return { ...state, grid_view: true };
    case SET_LISTVIEW:
      return { ...state, grid_view: false };
    case UPDATE_SORT:
      return { ...state, sort: action.payload };
    case SORT_PRODUCTS:
      const { sort, filtered_products } = state;
      let tempProduct = [...filtered_products];
      if (sort === "price-lowest") {
        tempProduct = tempProduct.sort((a, b) => {
          return a.price - b.price;
        });
      }
      if (sort === "price-highest") {
        tempProduct = tempProduct.sort((a, b) => {
          return b.price - a.price;
        });
      }
      if (sort === "name-a") {
        tempProduct = tempProduct.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      }
      if (sort === "name-z") {
        tempProduct = tempProduct.sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
      }
      return { ...state, filtered_products: tempProduct };

    case UPDATE_FILTERS:
      const { name, value } = action.payload;

      return { ...state, filters: { ...state.filters, [name]: value } };

    case FILTER_PRODUCTS:
      // console.log(state);
      const { all_products } = state;
      let tempProducts = [...all_products];
      const { text, category, company, color, price, shipping } = state.filters;

      // filtering
      // text
      if (text) {
        tempProducts = tempProducts.filter((product) => {
          // console.log(product);
          return product.name.toLowerCase().includes(text);
        });
      }
      //category
      if (category !== "all") {
        tempProducts = tempProducts.filter((product) => {
          console.log(product);

          return product.category === category;
        });
      }
      //company
      if (company !== "all") {
        tempProducts = tempProducts.filter((product) => {
          return product.company === company;
        });
      }
      //color
      if (color !== "all") {
        tempProducts = tempProducts.filter((product) => {
          return product.colors.includes(color);
          // return product.colors.find((c) => c===color);
        });
      }
      // price
      if (price) {
        tempProducts = tempProducts.filter((product) => product.price <= price);
      }
      // shipping
      if (shipping) {
        tempProducts = tempProducts.filter(
          (product) => product.shipping === true
        );
      }

      return { ...state, filtered_products: tempProducts };

    case CLEAR_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          text: "",
          company: "all",
          category: "all",
          color: "all",

          price: state.filters.max_price,
          shipping: false,
        },
      };

    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default filter_reducer;
