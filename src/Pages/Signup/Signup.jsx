import axios from "axios";
import { useFormik } from "formik";
import { object, ref, string } from "yup";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import signupImg from "../../assets/images/signin-DlR7P608.png";

export default function Signup() {
  const eye = <FontAwesomeIcon icon={faEye} />;
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const navigate = useNavigate();
  const [accExistErr, setAccExistErr] = useState(null);
  const passRejex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  const phoneRejex = /^(02)?01[0125][0-9]{8}$/;
  const validationSchema = object({
    name: string()
      .required("name is required")
      .min(3, "name must be atleast 3 characters ")
      .max(25, "name cannot exceed 25 characters"),
    email: string().required("email is required").email("email is invalid"),
    password: string()
      .required("password is required")
      .matches(
        passRejex,
        "password shold be Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"
      ),
    rePassword: string()
      .required("confirm password is required")
      .oneOf(
        [ref("password")],
        "password and confirm password shold be the same "
      ),
    phone: string().required().matches(phoneRejex, "egyption numbers onlyyyy"),
  });
  async function sendDataToRegister(values) {
    const loadingToastId = toast.loading("waiting..");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
        method: "POST",
        data: values,
      };
      let { data } = await axios.request(options);
      if (data.message == "success") {
        toast.success("user created successfully ", {
          icon: "👏",
        });
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setAccExistErr(error.response.data.message);
    } finally {
      toast.dismiss(loadingToastId);
    }
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: sendDataToRegister,
  });

  return (
    <>
      <Toaster />
      <h1 className="text-xl text-slte-700 font-semibold mb-5 text-center">
        <i className="fa-regular fa-circle-user"></i> Register Now
      </h1>
      
      <div className="flex flex-col md:flex-row gap-8 justify-center items-center px-4">
   
        <div className="w-full md:w-1/2 flex justify-center">
          <img src={signupImg} alt="" className="w-full max-w-xs md:max-w-none" />
        </div>
        
        <div className="w-full max-w-md">
          <form className="space-y-3" onSubmit={formik.handleSubmit}>
            <div className="name">
              <input
                type="text"
                name="name"
                placeholder="Type your name"
                value={formik.values.name}
                onChange={formik.handleChange}
                className="form-control w-full"
                onBlur={formik.handleBlur}
              />
              {formik.errors.name && formik.touched.name && (
                <p className="text-red-600 mt-2 text-sm">{formik.errors.name}</p>
              )}
            </div>
            
            <div className="email">
              <input
                type="email"
                name="email"
                placeholder="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                className="form-control w-full"
                onBlur={formik.handleBlur}
              />
              {formik.errors.email && formik.touched.email && (
                <p className="text-red-600 mt-2 text-sm">{formik.errors.email}</p>
              )}
              {accExistErr && (
                <p className="text-red-600 mt-2 text-sm">{accExistErr}</p>
              )}
            </div>
            
            <div className="password relative">
              <input
                type={passwordShown ? "text" : "password"}
                name="password"
                placeholder="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                className="form-control w-full"
                onBlur={formik.handleBlur}
              />
              <i
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={togglePasswordVisiblity}
              >
                {eye}
              </i>
            </div>
            {formik.errors.password && formik.touched.password && (
              <p className="text-red-600 mt-2 text-sm">{formik.errors.password}</p>
            )}
            
            <div className="repassword relative">
              <input
                type={passwordShown ? "text" : "password"}
                name="rePassword"
                placeholder="rePassword"
                value={formik.values.rePassword}
                onChange={formik.handleChange}
                className="form-control w-full"
                onBlur={formik.handleBlur}
              />
              <i
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={togglePasswordVisiblity}
              >
                {eye}
              </i>
            </div>
            {formik.errors.rePassword && formik.touched.rePassword && (
              <p className="text-red-600 mt-2 text-sm">{formik.errors.rePassword}</p>
            )}
            
            <div className="phone">
              <input
                type="tel"
                name="phone"
                className="form-control w-full"
                value={formik.values.phone}
                onChange={formik.handleChange}
                placeholder="phone number"
                onBlur={formik.handleBlur}
              />
              {formik.errors.phone && formik.touched.phone && (
                <p className="text-red-600 mt-2 text-sm">{formik.errors.phone}</p>
              )}
            </div>
            
            <button
              className="btn bg-primary-70 hover:bg-primary-100 text-white font-semibold w-full"
              type="submit"
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    </>
  );
}