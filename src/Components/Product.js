import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../Store/Products";
import ProductDetails from "./ProductDetails"
import { Link } from "react-router-dom";
import { addToCart } from "../Store/Products/CartSlice";


const Product = ({ product }) => {
  const { title, price, description, category, image, rating, id } = product;
  const { rate } = rating;
  const dispatch = useDispatch();

  const deleteCurrentProduct = () => {
    dispatch(deleteProduct(id));
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product))
  }

  const l = useSelector(state => state.cart)

  return (
    <>
      <div className="col col-3 pb-5">
        <div className="card">
          <img className="card-img-top" src={image} alt="Card image cap" />
          <div className="card-body">
            <h5 className="card-title">
              {title} - ${price}
            </h5>
            <div className="badge badge-dark text-danger">{category}</div>
            <Link to={`/product/${id}`} className="btn btn-primary my-1">
              {" "}
              Product Details
            </Link>
            <span className="btn btn-warning" onClick={() => handleAddToCart (product)}><Link to={'/cart'}>Add to Cart</Link>
            </span>
            <span className="btn btn-danger" onClick={deleteCurrentProduct}>
              Delete
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
