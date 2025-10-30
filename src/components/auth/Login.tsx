import {useState} from 'react';
import {Eye, EyeOff, LogIn, User} from 'lucide-react';
import GeoCard from "@/components/GeoCard.tsx";
import GeoButton from "@/components/GeoButton.tsx";

export function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        console.log('Login attempt:', formData);
    };

    return (
        <GeoCard
            icon={<LogIn className="text-deep-purple-600 w-6 h-6"/>}
            title="Masuk ke GeoViz"
            content={
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="username" className="text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-gray-400"/>
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
                                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24"
                                     stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
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
                                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600"/>
                                ) : (
                                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600"/>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            }
            buttons={
                <GeoButton
                    onClick={handleSubmit}
                    icon={<LogIn className="w-5 h-5 mr-2"/>}
                    text="Masuk"
                    variant="primary"
                    isLoading={false}
                />
            }
        />
    );
}