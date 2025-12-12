// src/pages/Login.jsx

import { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, Loader2 } from "lucide-react";
import { Button } from "../Components/UI/Button";
import { Input } from "../Components/UI/Input";
import { Label } from "../Components/UI/Label";
import { toast } from "sonner";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from '../Provider/AuthProvider'; 


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false); 
    
    
    const { signIn, googleSignIn, loading } = useContext(AuthContext); 
    
    const navigate = useNavigate();
    const location = useLocation();

   
    const from = location.state?.from || "/"; 

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error("Please fill in all fields");
            return;
        }

        setIsLoading(true);
        
        try {
           
            await signIn(email, password); 
            
            toast.success("Login successful!");
           
            navigate(from, { replace: true });
            
        } catch (error) {
            console.error("Login error:", error.message);
            
            toast.error(error.message || "Login failed"); 
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        try {
            
            await googleSignIn(); 
            
            toast.success("Welcome! (Google Login)");
            navigate(from, { replace: true });
            
        } catch (error) {
            console.error("Google login error:", error.message);
            toast.error(error.message || "Google login failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-background">
            
            <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        
                        <Link to="/" className="inline-flex items-center gap-2 mb-6">
            
                        <span className="text-xl font-bold text-gray-900 dark:text-white"> <span className="text-blue-500 ultra-regular font-extrabold text-4xl">F</span>reelaGo</span>
                    
                        </Link>
                        
                        <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
                        <p className="text-muted-foreground">Sign in to continue to your account</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10"
                                    disabled={isLoading || loading}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <Label htmlFor="password">Password</Label>
                                <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                                    Forgot Password?
                                </Link>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10 pr-10"
                                    disabled={isLoading || loading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 rounded-full transition-colors"
                                    disabled={isLoading || loading}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        <Button type="submit" className="w-full shadow-lg" size="lg" disabled={isLoading || loading}>
                            {(isLoading || loading) ? ( 
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </Button>
                    </form>

                    <div className="relative my-8">
                        <div className="relative flex items-center my-4">
                            <div className="grow border-t"></div>
                            <span className="px-3 text-sm text-muted-foreground bg-background">
                                Or continue with
                            </span>
                            <div className="grow border-t"></div>
                        </div>
                    </div>

                    <Button 
                        onClick={handleGoogleLogin} 
                        className="flex items-center justify-center gap-2 w-full shadow-lg"
                        disabled={isLoading || loading}
                    > 
                        
                        <FaGoogle className="h-5 w-5 " />
                        Continue with Google
                    </Button>

                    <p className="text-center mt-6 text-sm text-muted-foreground">
                        Don't have an account?{" "}
                        <Link to="/auth/register" className="text-primary hover:underline font-medium">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>

            
            <div className="hidden lg:flex flex-1 bg-linear-to-br from-primary to-accent items-center justify-center p-12">
                <div className="text-white max-w-md">
                    <h2 className="text-4xl font-bold mb-6">Find the best freelancers for your projects</h2>
                    <p className="text-primary-foreground/80 text-lg">
                        Join thousands of businesses and freelancers who trust **FreelaGo** for quality work delivered on time.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;