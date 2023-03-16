import { myProductsService } from "../../services/payment.services.js";
import { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/auth.context";

function ListOfProducts() {
  const [productsList, setProductsList] = useState([]);

  useEffect(() => {
    getMyProducts();
  }, []);

  const getMyProducts = async () => {
    try {
      const data = await myProductsService();
      console.log(data)
    } catch (error) {}
  };

  return <div>{productsList}</div>;
}

export default ListOfProducts;
