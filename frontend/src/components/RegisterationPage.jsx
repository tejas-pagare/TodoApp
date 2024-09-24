import React, { useState } from "react";
import Header from "./Header";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

function RegisterationPage() {
  const [isLogin, setLogin] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onClickHandler = async (data) => {
    // console.log(data);
    //console.log(`http://localhost:3000/api/user/${isLogin ? 'login' : 'register'}`);
    if (isLogin) {
      //login
      try {
        const response = await axios.post(
          `http://localhost:3000/api/user/login`,
          {
            email: data.email,
            password: data.password,
          }
        );
        // console.log(typeof response.data);
        localStorage.setItem("todoToken", response.data.token);

        navigate("/");
      } catch (error) {
        alert("Something Went Wrong Try Again");
        console.log(error);
      }
    } else {
      try {
        const response = await axios.post(
          `http://localhost:3000/api/user/signup`,
          {
            username: data.username,
            email: data.email,
            password: data.password,
          }
        );
        //console.log(response.data);
        localStorage.setItem("todoToken", response.data.token);
        dispatch(
          addUser({
            username: data.username,
            email: data.email,

            token: response.data.token,
          })
        );
        navigate("/");
      } catch (error) {
        alert("Something Went Wrong Try Again");
        console.log(error);
      }
    }
  };

  return (
    <>
      <Header />
      <div
        onSubmit={handleSubmit(onClickHandler)}
        className="h-screen w-full flex items-center justify-center"
      >
        <form className="flex flex-col gap-4 justify-center items-center">
          {!isLogin && (
            <input
              required
              type="text"
              {...register("username")}
              className="bg-gray-100 p-2 outline-none rounded-md w-[250px]"
              placeholder="Enter Username"
            />
          )}
          <input
            required
            type="text"
            {...register("email")}
            className="bg-gray-100 p-2 outline-none rounded-md w-[250px]"
            placeholder="Enter Email"
          />
          <input
            required
            type="password"
            {...register("password")}
            className="bg-gray-100 p-2 outline-none rounded-md w-[250px]"
            placeholder="Enter Password"
          />

          <button className="bg-green-500 text-white w-[100px] rounded-md p-1 text-center ">
            {isLogin ? "Login" : "SignUp"}
          </button>
          <p
            className="text-sm text-gray-500 cursor-pointer"
            onClick={() => setLogin(!isLogin)}
          >
            {isLogin
              ? "New user click here to Login ?"
              : "Aready a user click here to Login"}
          </p>
        </form>
      </div>
    </>
  );
}

export default RegisterationPage;
