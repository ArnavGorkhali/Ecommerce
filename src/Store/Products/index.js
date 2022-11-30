import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const productState = {
  loading: false,
  error: "",
  products: []
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    return data;
  }
);


export const productsSlice = createSlice({
  name: "products",
  initialState: productState,
  reducers: {
    deleteProduct: (state, action) => {
      const productId = action.payload;
      const tempProducts = [...state.products].filter(
        (pd) => pd.id !== productId
      );
      state.products = tempProducts;
    },
    searchProduct: (state, action) => {
      const searchTerm = action.payload;
      if (!searchTerm) {
        return;
      }
      const searchedProduct = [...state.products].filter((pd) =>
        pd.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      state.products = searchedProduct;
    },
    
    sortProductByTitle: (state, action) => {
      const type = action.payload;
      console.log(type)
      if (type) {
        const sortProductByTitle = [...state.products].sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        state.products = sortProductByTitle;
      } else {
        const sortProductByTitle = [...state.products].sort((a, b) =>
          b.title.localeCompare(a.title)
        );
        state.products = sortProductByTitle;
      }
    },

    sortProductByPrice: (state, action) => {
      const type = action.payload;
      if (type) {
        const sortProduct = [...state.products].sort((a, b) =>
          a.price - b.price
        );
        state.products = sortProduct;
      } else {
        const sortProduct = [...state.products].sort((a, b) =>
          b.price - a.price
        );
        state.products = sortProduct;
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.error = "";
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = "";
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.products = [];
        state.error = action.payload;
      });
  }
});


export const { deleteProduct, searchProduct, sortProductByTitle, sortProductByPrice } = productsSlice.actions;

export default productsSlice.reducer;
