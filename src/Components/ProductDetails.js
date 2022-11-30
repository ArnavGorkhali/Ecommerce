import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../Store/Products"; 
import { addToCart } from "../Store/Products/CartSlice";
import { Link } from "react-router-dom";

const ProductDetails = () => {
    
    const { productId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [Product, setProduct] = useState([]);
    const [Loading, setLoading] = useState(false);
    // const { title, price, description, category, image, rating, id } = product;

    const handleAddToCart = () => {
        dispatch(addToCart(Product));
        debugger
        navigate("/Cart")
    
    
      };
  
    useEffect(() => {
      const getProduct = async () => {
        setLoading(true);

        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        setProduct(await response.json());
        console.log(ProductDetails, 'product detail');
        setLoading(false);
      };
      getProduct();
    }, []);
    
    const l = useSelector(state => state.cart)
//   useEffect(() => {
//     if (productId && productId !== "") fetchProductDetail(productId);
//     return () => {
//       dispatch(deleteProduct());
//     };
//   }, [productId]);
  return (
    <>
    <div className="container">
      <div className="row">
        {Loading ? (
          <div> Loading...</div>
        ) : (
          <>
            <div className="col-md-6 my-4">
              <img
                src={Product.image}
                alt={Product.title}
                height="300px"
                width="300px"
              />
            </div>

            <div className="col-md-6">
              <h4 className="text-uppercase text-black-50">
                {" "}
                {Product.category}{" "}
              </h4>
              <h1 className="display-5"> {Product.title}</h1>
              <p className="lead">
                Rating: {Product.rating && Product.rating.rate}{" "}
                <i className="fa-solid fa-star"></i>
              </p>
              <p className="lead">{Product.description}</p>
            </div>
          </>
        )}
        <span className="btn btn-warning" onClick={() => handleAddToCart()}><Link to={'/cart'}>Add to Cart</Link></span>
      </div>
    </div>
  </>
  );
};

export default ProductDetails;