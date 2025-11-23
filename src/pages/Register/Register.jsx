import React, { use } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Authentication/AuthContext/AuthContext";
import { Link, useNavigate } from "react-router";
import { updateProfile } from "firebase/auth";
import { FaArrowUp, FaRegUserCircle } from "react-icons/fa";
import { HiUserCircle } from "react-icons/hi";

const Register = () => {
  const { registerUser } = use(AuthContext);
  const navigate = useNavigate();

  // React hook form property
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Form Submit
  const handleRegister = (data) => {
    console.log(data);
    registerUser(data.email, data.password)
      .then((res) => {
        console.log(res.user);
        console.log("registration successful");
        updateProfile(res.user, {
          displayName: data.name,
          photoURL: data.photoURL,
        })
          .then(() => {
            console.log("Profile Updated");
            navigate("/");
          })
          .catch((errors) => {
            console.log(errors);
          });
      })
      .catch((error) => {
        console.log(error.code);
      });
  };

  return (
    <div>
      <div className="mt-20 flex justify-center">
        <form
          onSubmit={handleSubmit(handleRegister)}
          className="form md:w-sm w-xs px-5"
        >
          <h3 className="text-3xl md:text-4xl font-bold">Create an Acount</h3>
          <p className="text-sm font-semibold mb-5">Register with ZapShift</p>

          <div className="flex">
            <HiUserCircle size={40} color="grey" />
            <FaArrowUp color="#b7d55c" className="mt-6 -ml-5" />
          </div>

          <fieldset className="fieldset">
            {/* Name */}
            <label className="label">Name</label>
            <input
              type="text"
              // {...register("email", { required: true })}
              {...register("name", { required: true })}
              className="input w-full"
              placeholder="Name"
            />
            {errors.name?.type === "required" && (
              <p className="text-red-500">Name required</p>
            )}

            {/* Photo */}
            <label className="label">Photo</label>
            <input
              type="text"
              {...register("photoURL")}
              className="input w-full"
              placeholder="Photo URL"
            />

            {/* Email */}
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input w-full"
              placeholder="Email"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500">Email Required</p>
            )}

            {/* Password */}
            <label className="label">Password</label>
            <input
              type="password"
              {...register("password", {
                required: true,
                minLength: 6,
                pattern: /[A-Z]/,
              })}
              className="input w-full"
              placeholder="Password"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500">
                Password length must be at least 8 character
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-500">
                Password must have a uppercase letter
              </p>
            )}

            <div>
              <p className="font-semibold">
                Already have an account?
                <Link
                  className="link link-hover text-lime-400 hover:text-lime-500"
                  to="/login"
                >
                  {" "}
                  Login
                </Link>
              </p>
            </div>
            <button className="btn btn-primary text-black font-bold mt-4">
              Register
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Register;
