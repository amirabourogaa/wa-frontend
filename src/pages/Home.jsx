import { Fragment, useContext, useEffect, useState } from "react";
import Wrapper from "../components/wrapper/Wrapper";
import Section from "../components/Section";
// import { discoutProducts } from "../utils/products";
import SliderHome from "../components/Slider";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import { getAllProducts } from "../services/productService";
import { DarkModeContext } from "../contexte";
import NavBar from "../components/Navbar/Navbar";

const Home = () => {
  const [darkMode,setDarkMode]=useContext(DarkModeContext)
  const [prod, setProd] = useState([]);

  useEffect(() => {
     getAllProducts().then((a)=>{
      if(a){

        setProd(a);
      }else {
        setProd([])
      }
     })
  }, []);

  // const newProds= prod.filter((discProd)=> discProd.newProduct ==true)

  var newArrivalData = prod.filter(
    (item) => item.category === "mobile" || item.category.includes("puff")
  );

  var bestSales = prod.filter((item) => item.reviews[0]?.rating>3);


  useWindowScrollToTop();

  return (
    <Fragment>
      <NavBar />
          <SliderHome />
          <Wrapper />
          <Section
            title="Big Discount"
            bgColor={darkMode ? "#f6f9fc" : "#1c1c1c"}
            color={darkMode ? "#1c1c1c" : "white"}
            productItems={prod}
          />
          <Section
            title="New Arrivals"
            bgColor={darkMode ? "#f6f9fc" : "#1c1c1c"}
            color={darkMode ? "#1c1c1c" : "white"}
            productItems={newArrivalData}
          />
          <Section
            title="Best Sales"
            bgColor={darkMode ? "#f6f9fc" : "#1c1c1c"}
            color={darkMode ? "#1c1c1c" : "white"}
            productItems={bestSales}
          />
     
    </Fragment>
  );
};

export default Home;
