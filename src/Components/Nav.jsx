// Nav.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Sun, Moon, LogOut } from "lucide-react"; 

// import { useAuth } from "./contexts/AuthContext"; // ⚠️ Currently UNUSED to prevent errors

// --- Utility function for basic styling (replaces Button component) ---
const baseButtonStyle = "px-3 py-1 text-sm font-medium transition-colors cursor-pointer rounded-lg";
const primaryButtonStyle = "bg-blue-500 hover:bg-blue-600 text-white shadow-md";
const secondaryButtonStyle = "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white";
const iconButtonStyle = "p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  
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

  const user = null; 
  const logout = () => { console.log("Dummy Logout"); };
  

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/browse-tasks", label: "Browse Tasks" },
    { to: "/add-task", label: "Add Task" },
    { to: "/my-tasks", label: "My Posted Tasks" },
      
  ];

  return (
    <header className=" z-50 glass-effect border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-900 dark:text-white"> <span className="text-blue-500 ultra-regular font-extrabold text-4xl">F</span>reelaGo</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle Button */}
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

            {/* User Auth/Profile Section (Will only show Login/Sign Up since user is null) */}
            {user ? (
              <div className="flex items-center gap-3">
                <img
                  src={user.photoURL || 'placeholder-avatar.png'} 
                  alt={user.name || 'User Profile'}
                  className="h-9 w-9 rounded-full border-2 border-blue-500 cursor-pointer"
                  title={user.name || 'User'}
                />
                
                <button 
                    onClick={handleLogout}
                    className={`${baseButtonStyle} ${secondaryButtonStyle} flex items-center gap-1`}
                >
                  <LogOut className="h-4 w-4" />
                  Log Out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className={`${baseButtonStyle} text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700`}>
                  Login
                </Link>
                <Link to="/register" className={`${baseButtonStyle} ${primaryButtonStyle}`}>
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button & Theme Toggle */}
          <div className="flex md:hidden items-center gap-2">
            {/* Mobile Theme Toggle */}
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
            {/* Hamburger/Close Button */}
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
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700 animate-fade-in">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
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
                {user ? (
                  <div className="px-4 py-2 flex items-center justify-between">
                    {/* Logged in state (will not show up now) */}
                  </div>
                ) : (
                  <div className="px-4 flex gap-2">
                    <Link to="/login" 
                          onClick={() => setIsMenuOpen(false)}
                          className={`${baseButtonStyle} ${secondaryButtonStyle} flex-1 text-center`}
                    >
                      Login
                    </Link>
                    <Link to="/register" 
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

