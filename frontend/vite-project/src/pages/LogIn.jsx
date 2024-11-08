import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

export function LogInForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignIn = async (data) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("result of login: ",result)
        localStorage.setItem('token', result.access_token); 
        navigate('/'); 
      } else {
        setErrorMessage('The email or password you entered is incorrect.');
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex w-screen items-center justify-center min-h-screen bg-gradient-to-br from-green-400 to-blue-600 p-6">
      <form 
        onSubmit={handleSubmit(handleSignIn)} 
        className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Welcome Back!</h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          Sign in to your account
        </p>

        {errorMessage && <p className="text-red-500 text-sm text-center mb-4">{errorMessage}</p>}

        <div className="space-y-4">
          <div>
            <input
              type="text"
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
              {...register("password", { required: true, minLength: 8 })}
              className={`w-full p-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">Password is required.</p>}
          </div>
        </div>

        <button 
          type="submit" 
          className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold py-3 rounded-md shadow-lg hover:shadow-2xl hover:from-blue-500 hover:to-green-500 transition duration-300"
        >
          Sign In
        </button>

        <div className="text-center pt-4">
          <p className="text-gray-600 text-sm">Don't have an account?</p>
          <Link 
            to="/signup" 
            className="text-green-500 font-semibold mt-2 underline hover:text-green-700 transition duration-200"
          >
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}
