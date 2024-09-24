import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addUser, removeUser } from "../utils/userSlice";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  useEffect(() => {
    if (localStorage.getItem("todoToken")) {
      navigate("/");
      return;
    }
    const fetchData = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/user/userInfo",
        {
          headers: {
            token: localStorage.getItem("todoToken"),
          },
        }
      );
      // console.log(response);
      dispatch(
        addUser({
          username: response.data.data.username,
          email: response.data.data.email,
          token: localStorage.getItem("todoToken"),
        })
      );
    };

    fetchData();
  }, []);

  const onClickSignOutHandler = () => {
    localStorage.removeItem("todoToken");
    dispatch(removeUser());
    navigate("/register");
  };

  return (
    <div className="py-2 px-6 flex justify-between items-center ">
      <Link to={"/"}>
        <h1 className="text-black text-3xl  font-bold">myTodos</h1>
      </Link>
      <div className="flex gap-4">
        <Link to={"/register"} className="text-md text-gray-500 ">
          Register
        </Link>
        {
          user&&<button
          onClick={onClickSignOutHandler}
          className="px-2 bg-gray-800 py-1 rounded-md text-white "
        >
          
          Sign Out
        </button>
        }
      </div>
    </div>
  );
}

export default Header;
