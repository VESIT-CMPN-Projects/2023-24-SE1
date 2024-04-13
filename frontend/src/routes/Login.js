import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase-config';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

const LoginComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await auth.signInWithEmailAndPassword(email, password);
            history('/Dashboard');
        } catch (error) {
            setError(error.message);
        }
    }

    const handleForgotPassword = async () => {
        try {
            await auth.sendPasswordResetEmail(email);
            alert('Password reset email sent. Please check your inbox.');
        } catch (error) {
            setError(error.message);
        }
    };


    return (
        <div className="fullpage h-max bg-blue-100">
            <div className="fullpage w-full h-max bg-blue-100">
                <div className="flex flex-col items-center justify-center h-max py-2">
                    <div className="flex flex-col items-center justify-center rounded shadow">
                        <div className="flex items-center justify-center h-1/2 w-full">
                            <img src={logo} alt="Logo" className='h-96 w-full'/>
                        </div>
                        <form className="flex flex-col items-center justify-center w-full p-10" onSubmit={handleSubmit}>
                            <input
                                className="w-full h-10 px-3 mb-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                className="w-full h-10 px-3 mb-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {error && <p className="text-red-500">You Have Entered Incorrect Credentials</p>}
                            <button
                                className="w-full h-10 px-3 mb-2 text-base font-bold text-white transition duration-500 ease-in-out transform bg-blue-500 rounded-lg hover:bg-blue-600 hover:to-translate-x-1 active:translate-x-2 focus:shadow-outline focus:outline-none"
                                type="submit"
                            >
                                Login
                            </button>
                            <button
                                className="w-full h-10 px-3 mb-2 text-base font-bold text-white transition duration-500 ease-in-out transform bg-blue-500 rounded-lg hover:bg-blue-600 hover:to-translate-x-1 active:translate-x-2 focus:shadow-outline focus:outline-none"
                                type="submit" onClick={handleForgotPassword}
                            >
                                Forgot Password?
                            </button>
                            <Link
                                to="/"
                                className="flex items-center justify-center w-full h-10 px-3 mb-2 text-base font-bold text-white transition duration-500 ease-in-out transform bg-red-600 rounded-lg hover:bg-red-700 hover:to-translate-x-1 active:translate-x-2 focus:shadow-outline focus:outline-none"
                                type="button"
                            >
                                Home
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginComponent;
