import React, { use } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../Authentication/AuthContext/AuthContext";

const Login = () => {
  const { loginUser } = use(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    const email = data.email;
    const password = data.password;
    loginUser(email, password)
      .then(() => {
        console.log("Login Successful");
        navigate("/");
      })
      .catch((errors) => {
        console.log(errors.code);
      });
  };

  return (
    <div>
      <div className="mt-20 flex justify-center">
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="form md:w-sm w-xs px-5"
        >
          <h3 className="text-3xl md:text-4xl font-bold">Welcome Back</h3>
          <p className="text-sm font-semibold mb-5">Login with ZapShift</p>

          <fieldset className="fieldset">
            {/* Email */}
            <label className="label">Email</label>
            <input
              type="email"
              className="input w-full"
              placeholder="Email"
              {...register("email", { required: true })}
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500">Email is required</p>
            )}

            {/* Password */}
            <label className="label">Password</label>
            <input
              type="password"
              className="input w-full"
              placeholder="Password"
              {...register("password", { required: true, minLength: 6 })}
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500">
                Password can't be less than 8 character
              </p>
            )}

            <div>
              <p className="font-semibold">
                Don't have an account?
                <Link
                  className="link link-hover text-lime-400 hover:text-lime-500"
                  to="/register"
                >
                  {" "}
                  Register
                </Link>
              </p>
            </div>
            <button className="btn btn-primary text-black font-bold mt-4">
              Login
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Login;
