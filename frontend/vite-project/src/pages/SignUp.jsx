import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export function SignUpForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const onSignUp = async (data) => {
    setErrorMessage(""); // Reset error message
    
    // Combine firstName and lastName into a single name field
    const formattedData = {
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      password: data.password,
    };
    
    try {
      const response = await fetch("http://127.0.0.1:8000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.detail || "Sign up failed");
        return;
      }

      const result = await response.json();
      localStorage.setItem("token", result.access_token); // Store JWT token in local storage
      navigate("/"); // Redirect to home page
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex w-screen items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 p-6">
      <form 
        onSubmit={handleSubmit(onSignUp)} 
        className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Create Your Account</h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          Access exclusive features with us.
        </p>

        {errorMessage && <p className="text-red-500 text-center text-sm mb-4">{errorMessage}</p>}

        <div className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="First Name"
              {...register("firstName", { required: true, maxLength: 80 })}
              className={`w-full p-3 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.firstName && <p className="text-red-500 text-xs mt-1">First name is required.</p>}
          </div>

          <div>
            <input
              type="text"
              placeholder="Last Name"
              {...register("lastName", { required: true, maxLength: 100 })}
              className={`w-full p-3 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.lastName && <p className="text-red-500 text-xs mt-1">Last name is required.</p>}
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
              className={`w-full p-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">Please enter a valid email.</p>}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: true, minLength: 8, maxLength: 40 })}
              className={`w-full p-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">Password must be at least 8 characters.</p>}
          </div>
        </div>

        <button 
          type="submit" 
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 rounded-md shadow-lg hover:shadow-2xl hover:from-purple-500 hover:to-blue-500 transition duration-300"
        >
          Sign Up
        </button>

        <div className="text-center pt-4">
          <p className="text-gray-600 text-sm">Already have an account?</p>
          <Link 
            to="/login"
            className="text-blue-500 font-semibold mt-2 underline hover:text-blue-700 transition duration-200"
          >
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
}
