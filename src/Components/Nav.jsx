// src/Components/Nav.jsx (FINAL)

import { useState, useEffect, useContext } from "react"; 
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Sun, Moon, LogOut, User, Loader2 } from "lucide-react"; 
import { AuthContext } from '../Provider/AuthProvider'; // ⭐ Firebase Auth Context ইম্পোর্ট করা হলো

// ⭐ মক Auth লজিক সম্পূর্ণভাবে সরিয়ে দেওয়া হলো

// স্টাইল কনস্ট্যান্টস (অপরিবর্তিত)
const baseButtonStyle = "px-3 py-1 text-sm font-medium transition-colors cursor-pointer rounded-lg";
const primaryButtonStyle = "bg-blue-500 hover:bg-blue-600 text-white shadow-md";
const secondaryButtonStyle = "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white";
const iconButtonStyle = "p-2 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700";

const Nav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    // ⭐ Auth Hook: useContext ব্যবহার করে আসল Firebase স্টেট নেওয়া হলো
    const { user, logOut, loading } = useContext(AuthContext); 
    
    // Theme Logic (অপরিবর্তিত)
    const [theme, setTheme] = useState(() => {
        const stored = localStorage.getItem("freelago_theme");
        return (stored === "dark" ? "dark" : "light");
    });

    useEffect(() => {
        localStorage.setItem("freelago_theme", theme);
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };
    
    const navigate = useNavigate();
    
    // ⭐ আসল logOut ফাংশন ব্যবহার করা হলো
    const handleLogout = async () => { 
        try {
            await logOut(); // AuthContext থেকে আসা logOut ফাংশন
            navigate("/");
            setIsMenuOpen(false);
        } catch (error) {
            console.error("Logout Error:", error);
        }
    };

    // নেভিগেশন লিঙ্ক লজিক
    const baseLinks = [
        { to: "/", label: "Home" },
    ];

    const protectedLinks = [
        { to: "/browse-tasks", label: "Browse Tasks" },
        { to: "/add-task", label: "Add Task" },
        { to: "/my-tasks", label: "My Posted Tasks" }
    ];

    // user লগইন করা থাকলে protectedLinks যোগ করা হবে
    // loading অবস্থায় শুধু baseLinks রেন্ডার হবে বা লোডিং স্পিনার দেখানো যেতে পারে
    const navLinks = (user && !loading) ? [...baseLinks, ...protectedLinks] : baseLinks;

    return (
        <header className="sticky top-0 z-50 bg-white dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    
                    {/* Logo/Brand (অপরিবর্তিত) */}
                    <Link to="/" className="flex items-center gap-2">
                        <span className="text-xl font-bold text-gray-900 dark:text-white"> 
                            <span className="text-blue-500 ultra-regular font-extrabold text-4xl">F</span>reelaGo
                        </span>
                    </Link>

                    {/* Desktop Navigation Links (Conditional Rendering) */}
                    <nav className="hidden md:flex items-center gap-6">
                        {(loading) ? ( 
                            <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                        ) : (
                            navLinks.map((link) => ( 
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className="text-sm font-medium text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))
                        )}
                    </nav>

                    {/* Desktop Auth & Theme */}
                    <div className="hidden md:flex items-center gap-3">
                        
                        {/* Theme Toggle (অপরিবর্তিত) */}
                        <button
                            onClick={toggleTheme}
                            className={iconButtonStyle}
                            aria-label="Toggle theme"
                        >
                            {theme === "light" ? (
                                <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                            ) : (
                                <Sun className="h-5 w-5 text-yellow-500" />
                            )}
                        </button>

                        {/* Auth Buttons */}
                        {loading ? ( // লোডিং স্পিনার
                            <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                        ) : user ? ( // ইউজার লগইন করা
                            <div className="flex items-center gap-3">
                                
                                <Link to="/profile" title={user.displayName || 'User Profile'}>
                                    <User className="h-6 w-6 text-blue-500 dark:text-blue-400 border border-blue-500 rounded-full p-1" />
                                </Link>
                                
                                <button 
                                    onClick={handleLogout}
                                    className={`${baseButtonStyle} ${secondaryButtonStyle} flex items-center gap-1`}
                                >
                                    <LogOut className="h-4 w-4" />
                                    Log Out
                                </button>
                            </div>
                        ) : ( // ইউজার লগআউট করা
                            <div className="flex items-center gap-2">
                                
                                <Link 
                                    to="/auth/login" 
                                    className={`${baseButtonStyle} text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700`}
                                >
                                    Login
                                </Link>
                                
                                <Link 
                                    to="/auth/register" 
                                    className={`${baseButtonStyle} ${primaryButtonStyle}`}
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Toggle & Theme (অপরিবর্তিত) */}
                    <div className="flex md:hidden items-center gap-2">
                        
                        <button
                            onClick={toggleTheme}
                            className={iconButtonStyle}
                            aria-label="Toggle theme"
                        >
                            {theme === "light" ? (
                                <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                            ) : (
                                <Sun className="h-5 w-5 text-yellow-500" />
                            )}
                        </button>
                        
                        <button
                            className={iconButtonStyle}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        >
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Content */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700 animate-fade-in bg-white dark:bg-gray-800 absolute w-full left-0 shadow-lg top-16">
                        <nav className="flex flex-col gap-1">
                            
                            {navLinks.map((link) => ( // শুধুমাত্র user থাকলে protected লিঙ্কগুলো রেন্ডার হবে
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            
                            <div className="border-t border-gray-200 dark:border-gray-700 mt-2 pt-2">
                                {loading ? (
                                    <div className="px-4 py-2 flex justify-center"><Loader2 className="h-5 w-5 animate-spin text-blue-500" /></div>
                                ) : user ? (
                                    <div className="px-4 py-2 flex items-center justify-between">
                                        <Link 
                                            to="/profile" 
                                            onClick={() => setIsMenuOpen(false)}
                                            className="text-sm font-medium text-gray-900 dark:text-white flex items-center gap-2"
                                        >
                                            <User className="h-5 w-5" /> {user.displayName || 'Profile'}
                                        </Link>
                                        <button 
                                            onClick={handleLogout}
                                            className={`${baseButtonStyle} ${secondaryButtonStyle} flex items-center gap-1`}
                                        >
                                            <LogOut className="h-4 w-4" /> Log Out
                                        </button>
                                    </div>
                                ) : (
                                    
                                    <div className="px-4 flex gap-2">
                                        
                                        <Link to="/auth/login" 
                                            onClick={() => setIsMenuOpen(false)}
                                            className={`${baseButtonStyle} ${secondaryButtonStyle} flex-1 text-center`}
                                        >
                                            Login
                                        </Link>
                                        
                                        <Link to="/auth/register" 
                                            onClick={() => setIsMenuOpen(false)}
                                            className={`${baseButtonStyle} ${primaryButtonStyle} flex-1 text-center`}
                                        >
                                            Sign Up
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Nav;