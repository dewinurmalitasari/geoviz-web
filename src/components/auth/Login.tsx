import { useState } from 'react';
import { Eye, EyeOff, User, LogIn } from 'lucide-react';

export function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle login logic here
        console.log('Login attempt:', formData);
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-8">
            {/*TODO: Fix this and compartmentalize*/}


            {/* Login Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover border border-gray-100 w-full max-w-md">
                {/* Gradient Top Bar */}
                <div className="h-2 bg-gradient-to-r from-deep-purple-400 to-deep-purple-600"></div>

                <div className="p-6 md:p-8">
                    {/* Header */}
                    <div className="flex items-center mb-6">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-deep-purple-100 to-deep-purple-200 flex items-center justify-center mr-4">
                            <LogIn className="text-deep-purple-600 w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-bold text-deep-purple-800">Masuk ke GeoViz</h2>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Username Field */}
                        <div className="space-y-2">
                            <label htmlFor="username" className="text-sm font-medium text-gray-700">
                                Username
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    required
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-deep-purple-500 focus:border-deep-purple-500 transition-all duration-200"
                                    placeholder="Masukkan username"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-deep-purple-500 focus:border-deep-purple-500 transition-all duration-200"
                                    placeholder="Masukkan password"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="w-full flex justify-center items-center px-5 py-3 rounded-xl bg-gradient-to-r from-deep-purple-500 to-deep-purple-700 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                        >
                            <span>Masuk</span>
                            <LogIn className="ml-2 w-4 h-4" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}