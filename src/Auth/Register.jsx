import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, Image, Loader2, Check, X } from "lucide-react";
import { Button } from "../Components/UI/Button";
import { Input } from "../Components/UI/Input";
import { Label } from "../Components/UI/Label"; 
import { toast } from "sonner";
import { FaGoogle } from "react-icons/fa";

const useAuth = () => {
   
    const register = async (name, email, password, photoURL) => {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        if (email && password && name) {
            
            console.log("Mock Registration Success:", { name, email, photoURL });
            return { success: true };
        }
        return { success: false, error: "Registration failed due to missing inputs (Mocked)" };
    };

    const googleLogin = async () => {
        await new Promise(resolve => setTimeout(resolve, 800));
       
        console.log("Mock Google Login Success");
        return { success: true };
    };

    
    const login = async (email, password) => { 
        await new Promise(resolve => setTimeout(resolve, 800));
        if (email && password) {
             console.log("Mock Login Attempt Success");
             return { success: true };
        }
        return { success: false, error: "Missing email or password (Mocked)" };
    };

    return { register, googleLogin, login };
};


const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [photoURL, setPhotoURL] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
   
    const { register, googleLogin } = useAuth(); 
    const navigate = useNavigate();

    const passwordValidation = {
        hasUppercase: /[A-Z]/.test(password),
        hasLowercase: /[a-z]/.test(password),
        hasMinLength: password.length >= 6,
    };

    const isPasswordValid = Object.values(passwordValidation).every(Boolean);

    const handleSubmit = async (e) => { 
        e.preventDefault();

        if (!name || !email || !password) {
            toast.error("Please fill in all required fields");
            return;
        }

        if (!isPasswordValid) {
            toast.error("Please meet all password requirements");
            return;
        }

        setIsLoading(true);
        
        const result = await register(name, email, password, photoURL);
        setIsLoading(false);

        if (result.success) {
            toast.success("Account created successfully!");
            navigate("/");
        } else {
            toast.error(result.error || "Registration failed");
        }
    };

    const handleGoogleLogin = async () => {
        setIsLoading(true);
      
        const result = await googleLogin();
        setIsLoading(false);

        if (result.success) {
            toast.success("Welcome to FreelaGo!");
            navigate("/");
        } else {
            toast.error(result.error || "Google login failed");
        }
    };

    
    const ValidationItem = ({ valid, text }) => (
        <div className={`flex items-center gap-2 text-sm ${valid ? "text-green-500" : "text-muted-foreground"}`}>
            {valid ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
            {text}
        </div>
    );

    return (
        <div className="min-h-screen flex">
            
            <div className="hidden lg:flex flex-1 bg-linear-to-br from-primary to-accent items-center justify-center p-12">
                <div className="text-white max-w-md">
                    <h2 className="text-4xl font-bold mb-6">Start your freelancing journey today</h2>
                    <p className="text-white/80 text-lg">
                        Create an account to post tasks, bid on projects, and connect with talented professionals worldwide.
                    </p>
                </div>
            </div>

            <div className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <Link to="/" className="inline-flex items-center gap-2 mb-6">
                        
             
                        <span className="text-xl font-bold text-gray-900 dark:text-white"> <span className="text-blue-500 ultra-regular font-extrabold text-4xl">F</span>reelaGo</span>
                    
                        </Link>
                        <h1 className="text-2xl font-bold text-foreground mb-2">Create Account</h1>
                        <p className="text-muted-foreground">Sign up to get started</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                       
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name *</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Enter your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="pl-10"
                                    required
                                />
                            </div>
                        </div>

                       
                        <div className="space-y-2">
                            <Label htmlFor="email">Email *</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10"
                                    required
                                />
                            </div>
                        </div>


                        <div className="space-y-2">
                            <Label htmlFor="photoURL">Photo URL (Optional)</Label>
                            <div className="relative">
                                <Image className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input
                                    id="photoURL"
                                    type="url"
                                    placeholder="Enter your photo URL"
                                    value={photoURL}
                                    onChange={(e) => setPhotoURL(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>

                       
                        <div className="space-y-2">
                            <Label htmlFor="password">Password *</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Create a password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10 pr-10"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                            {password && (
                                <div className="mt-2 space-y-1 p-3 bg-secondary rounded-lg">
                                    <ValidationItem valid={passwordValidation.hasUppercase} text="One uppercase letter" />
                                    <ValidationItem valid={passwordValidation.hasLowercase} text="One lowercase letter" />
                                    <ValidationItem valid={passwordValidation.hasMinLength} text="At least 6 characters" />
                                </div>
                            )}
                        </div>


                        <Button type="submit" className="w-full" size="lg" disabled={isLoading || !isPasswordValid}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating account...
                                </>
                            ) : (
                                "Create Account"
                            )}
                        </Button>
                    </form>

                    
                    <div className="relative my-6">
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
                        Already have an account?{" "}
                        <Link to="/auth/login" className="text-primary hover:underline font-medium">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;