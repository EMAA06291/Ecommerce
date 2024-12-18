import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useFormik } from "formik";
import { object, string } from "yup";
import { UserContext } from "../../Context/User.context";
import loginPic from "../../assets/images/login.webp";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Login = () => {
  const eye = <FontAwesomeIcon icon={faEye} />;
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  <i onClick={togglePasswordVisiblity}>{eye}</i>;
  const { setToken } = useContext(UserContext);
  const navigate = useNavigate();
  const [notValidEmailPass, setNotValidEmailPass] = useState(null);

  const passRejex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

  const validationSchema = object({
    email: string().required("Email is required").email("Email is invalid"),
    password: string()
      .required("Password is required")
      .matches(passRejex, "Password must meet complexity requirements"),
  });

  const sendDatatoLogin = async (values) => {
    const loadingToastId = toast.loading("Waiting...");
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );
      if (data.message === "success" && data.token) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        toast.success("Welcome!", { icon: "❤️" });
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        toast.error("Login failed.");
      }
    } catch (error) {
      toast.error(
        error.response ? error.response.data.message : "Something went wrong"
      );
    } finally {
      toast.dismiss(loadingToastId);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: sendDatatoLogin,
  });

  return (
    <>
      <div className="grid grid-cols-12  container justify-center   ">
        {" "}
        <form
          onSubmit={formik.handleSubmit}
          className="xl:col-span-6 md:col-span-6   xsm:col-span-12 mt-24 lg:mt-28 lg:ms-28 md-[-50%]"
        >
          {" "}
          <h1 className="text-3xl font-extrabold  mb-5 text-center">
            <i className="fa-regular fa-circle-user "></i> Log in
          </h1>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              className="form-control w-full pt-3"
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email && (
              <p className="text-red-600 mt-2 text-sm">{formik.errors.email}</p>
            )}
            {notValidEmailPass && (
              <p className="text-red-600 mt-2 text-sm">{notValidEmailPass}</p>
            )}
          </div>
          <div className="mb-4 relative">
            <input
              type={passwordShown ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              className="form-control w-full pt-3 relative"
              onBlur={formik.handleBlur}
            />
            <i
              className="-translate-x-1 -translate-y-1 absolute bottom-0 xsm:right-2"
              onClick={togglePasswordVisiblity}
            >
              {eye}
            </i>
          </div>
          {formik.errors.password && formik.touched.password && (
            <p className="text-red-600 mt-2 text-sm">
              {formik.errors.password}
            </p>
          )}
          <button
            type="submit"
            className="btn bg-primary-70 hover:bg-primary-100 text-white font-semibold w-full  h-10"
          >
            Log In
          </button>
        </form>{" "}
        <div className="image-icon  xl:col-span-6 xsm:col-span-12 md:col-span-6 w-[90%]">
          <img src={loginPic} alt="" className="w-full md:mt-16" />
        </div>
      </div>
    </>
  );
};

export default Login;
