import Looding from "../../Components/Looding/Looding";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Cartcontext } from "../../Context/Cart.context";
import ReactImageGallery from "react-image-gallery";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Card from "../../Components/Card/Card";

export default function ProductDetails() {
  const [related, setRelated] = useState(null);
  const [productDetails, setProductDetails] = useState(null);
  const { addProductToCart } = useContext(Cartcontext);
  const { id } = useParams();

  async function getProductDetails() {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/products/${id}`,
        method: "GET",
      };
      let { data } = await axios.request(options);
      console.log("Product Details Loaded:", data); 
      setProductDetails(data.data);
    } catch (error) {
      console.error("Error loading product details:", error);
      alert("Failed to load product details. Please try again later.");
    }
  }

  async function getRelatedProducts() {
    if (!productDetails || !productDetails.category) {
      console.log(
        "Category ID is missing or product details are not available"
      );
      return; 
    }

    const categoryId = productDetails.category._id;
    console.log("Fetching related products for category ID:", categoryId);

    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryId}`,
        method: "GET",
      };
      let { data } = await axios.request(options);
      console.log("Related Products Loaded:", data); 
      setRelated(data.data);
    } catch (error) {
      console.log("Error loading related products:", error);
    }
  }

  useEffect(() => {
    getProductDetails();
  }, [id]);

  useEffect(() => {
    if (productDetails && productDetails.category) {
      getRelatedProducts(); 
    }
  }, [productDetails]);

  console.log("Product Details:", productDetails);
  console.log("Related Products:", related);

  return (
    <>
      {productDetails ? (
        <>
          <section className="grid gap-10 grid-cols-12 space-y-5 justify-center items-center container">
            <div className="md:col-span-3 xsm:col-span-12 shadow-2xl shadow-black xsm:w-[50%] md:w-full">
              <ReactImageGallery
                showPlayButton={false}
                showNav={false}
                items={
                  productDetails?.images?.map((image) => ({
                    original: image,
                    thumbnail: image,
                  })) || []
                }
                alt={productDetails.title}
                className="w-full rounded-md"
              />
            </div>

            <div className="md:col-span-8 xsm:col-span-12 space-y-7">
              <div>
                <h2 className="text-2xl font-semibold text-gray-600">
                  {productDetails.title}
                </h2>
                <h3 className="text-primary-600 font-semibold">
                  {productDetails.category.name}
                </h3>
              </div>
              <p className="text-gray-600">{productDetails.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-xl font-semibold text-gray-700 bg-primary-60 bg-opacity-40">
                  {productDetails.price} LE
                </span>
                <div className="flex items-center">
                  <i className="fa-solid fa-star mr-2 text-yellow-500"></i>
                  <span className="text-gray-600 font-medium">
                    {productDetails.ratingsAverage}
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  addProductToCart({ productId: id });
                }}
                className="btn bg-primary-100 hover:bg-primary-300 transition-colors duration-300 w-full text-white"
              >
                Add to cart
              </button>
            </div>
          </section>
          <section className="mt-10 ">
            <h2 className="text-xl font-semibold text-gray-700 mb-5">
              Related Products
            </h2>
            {related ? (
              <Swiper spaceBetween={15} slidesPerView={4}>
                {related.map((product) => (
                  <SwiperSlide key={product.id}>
                    <Card productInfo={product} />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <Looding />
            )}
          </section>
        </>
      ) : (
        <Looding />
      )}
    </>
  );
}
