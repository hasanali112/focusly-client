/* eslint-disable @typescript-eslint/no-explicit-any */
import logo from "@/assets/logo.png";
import { useSignupMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hook";
import decodeToken from "@/utils/verifyToken";
import { Loader } from "lucide-react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Registration = () => {
  const { register, handleSubmit } = useForm();
  const [signup, { isLoading }] = useSignupMutation();
  const dispath = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await signup(data).unwrap();
      if (res?.data?.accessToken) {
        const user = decodeToken(res?.data?.accessToken);
        dispath(setUser({ user: user, token: res?.data?.accessToken }));
      }
      toast.success(res?.message);
      navigate(from, { replace: true });
    } catch (err: any) {
      toast.error(err.data.message);
    }
  };

  return (
    <div className="min-h-screen bg-purple-100 relative">
      <div className="max-w-[1400px] w-full mx-auto flex items-center justify-center pt-5 md:pt-10">
        <img src={logo} alt="Logo" className="w-24 h-24 md:w-36 md:h-36" />
      </div>
      <div className="flex items-center justify-center px-4 py-8">
        <div className="absolute inset-0 w-full h-full pointer-events-none opacity-10">
          <div
            className="absolute inset-0 w-full h-full bg-repeat"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='3' cy='3' r='3' fill='%239C92AC' fill-opacity='0.4'/%3E%3C/svg%3E")`,
              backgroundSize: "20px 20px",
            }}
          ></div>
        </div>

        <div className="flex flex-col md:flex-row w-full max-w-4xl overflow-hidden rounded-lg shadow-lg z-10 -translate-y-8">
          {/* Left side with purple gradient and wavy patterns - hidden on mobile */}
          <div className="hidden md:block relative md:w-1/2 bg-gradient-to-br from-purple-500 to-purple-700 p-8 text-white">
            {/* Decorative elements */}
            <div className="absolute top-8 left-16 text-xl font-thin text-white opacity-70">
              +
            </div>
            <div className="absolute top-8 right-16 h-2 w-2 rounded-full border border-white opacity-70"></div>

            {/* Wavy lines pattern */}
            <svg
              className="absolute bottom-16 left-0 w-full opacity-20"
              viewBox="0 0 200 100"
              fill="none"
            >
              <path
                d="M0 50C20 30 40 70 60 50C80 30 100 70 120 50C140 30 160 70 180 50C200 30 220 70 240 50"
                stroke="white"
                strokeWidth="1"
                strokeLinecap="round"
              />
              <path
                d="M0 60C20 40 40 80 60 60C80 40 100 80 120 60C140 40 160 80 180 60C200 40 220 80 240 60"
                stroke="white"
                strokeWidth="1"
                strokeLinecap="round"
              />
            </svg>

            {/* Grid dots pattern */}
            <div className="absolute top-32 right-8">
              <div className="grid grid-cols-3 gap-1">
                {[...Array(9)].map((_, i) => (
                  <div
                    key={i}
                    className="h-1 w-1 rounded-full bg-white opacity-60"
                  ></div>
                ))}
              </div>
            </div>

            <div className="mt-16">
              <h1 className="text-3xl font-bold">Welcome back!</h1>
              <p className="mt-2 text-white text-opacity-90">
                You can sign in to access with your
                <br />
                existing account.
              </p>
            </div>
          </div>

          {/* Mobile-only mini header with welcome text */}
          <div className="md:hidden w-full bg-gradient-to-br from-purple-500 to-purple-700 p-6 text-white text-center">
            <h1 className="text-xl font-bold">Welcome!</h1>
            <p className="mt-1 text-white text-opacity-90 text-sm">
              Create an account to get started
            </p>
          </div>

          {/* Right side with signup form */}
          <div className="w-full md:w-1/2 bg-white p-6 md:p-8">
            <div className="mx-auto">
              <h2 className="text-xl font-medium text-gray-700 mb-6">
                Sign Up
              </h2>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-4">
                  <div>
                    <div className="relative">
                      <input
                        type="text"
                        {...register("fullName")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                        placeholder="Full Name"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="relative">
                      <input
                        type="email"
                        {...register("email")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                        placeholder="Email"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="relative">
                      <input
                        type="password"
                        {...register("password")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                        placeholder="Password"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md flex items-center justify-center"
                    >
                      {isLoading ? (
                        <Loader className="animate-spin text-center" />
                      ) : (
                        "Sign Up"
                      )}
                    </button>
                  </div>
                </div>
              </form>

              <p className="mt-4 text-center text-sm text-gray-600">
                <Link
                  to="/login"
                  className="font-medium text-purple-600 hover:text-purple-500"
                >
                  Have an account? Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright footer */}
      <div className="w-full text-center pb-4 text-gray-500 text-sm py-4">
        &copy; {new Date().getFullYear()} EfficiZen. All rights reserved.
      </div>
    </div>
  );
};

export default Registration;
