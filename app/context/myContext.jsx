import React, { createContext, useState, useEffect } from "react";
import { get_user_infor } from "../api/user_api";

const MyContext = createContext();
const MyProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState({});
  const [count, setCount] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [store, setStore] = useState("");
  const [address, setAddress] = useState("");

  const getUserInfo = () => {
    get_user_infor()
      .then((data) => {
        if (data.result) {
          setUser(data.result);
          const newCart = data.result.cart || [];
          setCart(newCart);

          const totalItems = newCart.reduce(
            (total, item) => total + (item.quantity || 1),
            0
          );
          setCount(totalItems);
        }
      })
      .catch((error) => {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
      });
  };

  useEffect(() => {
    getUserInfo();
  }, [cart]);

  return (
    <MyContext.Provider
      value={{
        user,
        setUser,
        cart,
        setCart,
        count,
        setCount,
        quantity,
        setQuantity,
        getUserInfo,
        city,
        setCity,
        province,
        setProvince,
        store,
        setStore,
        address,
        setAddress,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyProvider };
