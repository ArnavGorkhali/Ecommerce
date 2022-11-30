import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "./Components/Product";
import { fetchProducts, searchProduct, sortProductByTitle } from "./Store/Products";
import { sortProductByPrice } from "./Store/Products";
import {
  selectProducrs,
  selectProducrsLoading
} from "./Store/Products/sector";
import "./styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./Components/Cart";
import ProductDetails from "./Components/ProductDetails";
import Header from "./Components/Header";

export default function App() {
  const data = useSelector(selectProducrs);
  const loading = useSelector(selectProducrsLoading);
  const dispatch = useDispatch();
  const handleFetchProducts = () => {
    dispatch(fetchProducts());
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const searchTerm = e.target.value;
    if (!searchTerm) {
      handleFetchProducts();
      return;
    }
    dispatch(searchProduct(searchTerm));
  };

  const [isAscending, setIsAscending] = useState(false);
  const [sort, setSort] = useState(false);

  const handleSortByTitle = () => {
    dispatch(sortProductByTitle(isAscending));
    setIsAscending(!isAscending);
  }

  const handleSortByPrice = () => {
    dispatch(sortProductByPrice(sort));
    setSort(!sort);
  }

  useEffect(() => {
    handleFetchProducts();
  }, []);

  if (loading) return "Loading....";

  return (
    <BrowserRouter>
      {/* <Header /> */}
        <Routes>
            <Route path = "/" element = {
              <div className="container p-5">
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="input-group mb-3">
                  <input
                    type="search"
                    className="form-control"
                    placeholder="search"
                    onChange={handleSearch}
                  />
                  <button type="submit" className="btn btn-primary">
                    search
                  </button>
                </div>
                <div className="input-group mb-3">
                  <button type="sort" className="btn btn-primary m-2" onClick={handleSortByTitle}>
                    Sort By Title
                  </button>
                  <button type="sort" className="btn btn-primary m-2" onClick={handleSortByPrice}>
                    Sort By Price
                  </button>
                </div>
              </form>
              <div className="row">
                {data.map((pd) => (
                  <Product product={pd} key={pd.id} />
                ))}
              </div>
            </div>
            }></Route>
            <Route path="/product/:productId" element={<ProductDetails/>} />
            <Route path = "/cart" element = {<Cart />}></Route>     
    </Routes>
    </BrowserRouter>
  );
}
