import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../firebaseConfig'; // Import `auth`
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'; // Import hàm đăng nhập

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Hook để điều hướng

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null); // Xóa lỗi cũ

        try {
            // Dùng hàm của Firebase để tạo user mới
            const userCredential = await signInWithEmailAndPassword(auth, email, password);

            // Đăng ký thành công!
            console.log('User đã đăng nhập:', userCredential.user);
            // Chuyển người dùng đến trang đăng nhập
            navigate('/');

        } catch (err) {
            // Xử lý lỗi (ví dụ: email đã tồn tại, mật khẩu quá yếu)
            console.error(err.message);
            setError(err.message);
            alert(`Lỗi: ${err.message}`);
        }
    };

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="w-3/4 flex flex-col items-center justify-center px-6 py-8 mx-auto">
                <div
                    className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 ">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Login your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                                    email</label>
                                <input type="email" name="email" id="email"
                                       value={email}
                                       onChange={(e) => setEmail(e.target.value) }
                                       className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       placeholder="name@company.com" required/>
                            </div>
                            <div>
                                <label htmlFor="password"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••"
                                       value={password}
                                       onChange={(e) => setPassword(e.target.value) }
                                       minLength={6}
                                       className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       required=""/>
                            </div>
                            {error && <p className="text-red-500">{error}</p>}
                            <button type="submit"
                                    className="w-full text-white bg-p-600 hover:bg-p-700 cursor-pointer focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                Login
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet?
                                <Link to="/register"
                                      className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;