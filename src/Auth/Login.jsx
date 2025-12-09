import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, Loader2 } from "lucide-react";
import { Button } from "../Components/UI/Button";
import { Input } from "../Components/UI/Input";
import { Label } from "../Components/UI/Label";
import { toast } from "sonner";
import { FaGoogle } from "react-icons/fa";


const useAuth = () => {
   
    const login = async (email, password) => {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        if (email && password) {
             return { success: true };
        }
        return { success: false, error: "Missing email or password (Mocked)" };
    };

    const googleLogin = async () => {
        await new Promise(resolve => setTimeout(resolve, 800));
        return { success: true };
    };
    
  
    const user = null; 
    const logout = () => { console.log("Dummy Logout"); };

    return { user, login, googleLogin, logout };
};


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false); 
    
    
    const { login, googleLogin } = useAuth(); 
    
    const navigate = useNavigate();
    const location = useLocation();

  
    const from = (location.state)?.from?.pathname || "/"; 

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error("Please fill in all fields");
            return;
        }

        setIsLoading(true);
        const result = await login(email, password); 
        setIsLoading(false);

        if (result.success) {
            toast.success("Welcome back! (Mock Login)");
            navigate(from, { replace: true });
        } else {
            toast.error(result.error || "Login failed (Mock Error)");
        }
    };

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        const result = await googleLogin();
        setIsLoading(false);

        if (result.success) {
            toast.success("Welcome! (Mock Google)");
            navigate(from, { replace: true });
        } else {
            toast.error(result.error || "Google login failed (Mock Error)");
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
                                    disabled={isLoading}
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
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 rounded-full transition-colors"
                                    disabled={isLoading}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        <Button type="submit" className="w-full shadow-lg" size="lg" disabled={isLoading}>
                            {isLoading ? ( 
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
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full  border-border" />
                        </div>
                        <div class="relative flex items-center my-4">
  <div class="grow border-t"></div>
  <span class="px-3 text-sm text-muted-foreground bg-background">
    Or continue with
  </span>
  <div class="grow border-t"></div>
</div>

                    </div>
                        <Button 
   
    className="flex items-center justify-center gap-2 w-full shadow-lg"
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