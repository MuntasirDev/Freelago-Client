import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import JobCard, { initialTasks } from "../Components/JobCard";
import { ArrowRight, Search, Users, Shield, Zap, Code, Palette, PenTool, Megaphone, Database, Video, ChevronLeft, ChevronRight } from "lucide-react";

const heroSlides = [
    {
        title: "Find the Perfect Freelancer",
        subtitle: "Connect with talented professionals ready to bring your projects to life",
        cta: "Browse Tasks",
        link: "/browse-tasks", 
    },
    {
        title: "Post Your Task Today",
        subtitle: "Describe what you need and let skilled freelancers compete for your project",
        cta: "Post a Task",
        link: "/add-task",
    },
    {
        title: "Get Work Done Fast",
        subtitle: "Quality work delivered on time with our secure platform",
        cta: "Get Started", 
        link: "/auth/register", 
    },
];

const categories = [
    { name: "Web Development", icon: Code, color: "bg-blue-500" },
    { name: "Design", icon: Palette, color: "bg-pink-500" },
    { name: "Writing", icon: PenTool, color: "bg-green-500" },
    { name: "Marketing", icon: Megaphone, color: "bg-orange-500" },
    { name: "Data Entry", icon: Database, color: "bg-yellow-500" },
    { name: "Video Editing", icon: Video, color: "bg-red-500" },
];



const Home = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const isLoading = false; 
    const isLoggedIn = false; 
    const protectedLink = "/browse-tasks"; 
    const ctaLink = isLoggedIn ? "/profile" : "/auth/register";
    const ctaText = "Create Account"; 


    
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  
    const baseButtonClass = "inline-flex items-center justify-center rounded-lg px-6 py-3 text-lg font-medium transition-colors shadow-md";
    const primaryButtonClass = `${baseButtonClass} bg-blue-500 hover:bg-blue-600 text-white`;
    const outlineButtonClass = `${baseButtonClass} bg-white dark:bg-gray-800 text-blue-500 dark:text-blue-300 border border-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700`;

    return (
        <div className="min-h-screen bg-white  dark:bg-black">
            
            
            <section className="relative bg-gray-100 dark:bg-black py-20 lg:py-32 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="min-h-[200px] flex flex-col justify-center">
                            {heroSlides.map((slide, index) => (
                                <div
                                    key={index}
                                    className={`transition-all duration-500 ${
                                        index === currentSlide
                                            ? "opacity-100 translate-y-0"
                                            : "opacity-0 absolute translate-y-4 pointer-events-none w-full"
                                    }`}
                                >
                                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">
                                        {slide.title}
                                    </h1>
                                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8">
                                        {slide.subtitle}
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                        <Link 
                                            
                                            to={slide.title === "Get Work Done Fast" ? ctaLink : slide.link} 
                                            className={primaryButtonClass}
                                        >
                                            {slide.title === "Get Work Done Fast" ? ctaText : slide.cta}
                                            <ArrowRight className="ml-2 h-5 w-5" />
                                        </Link>
                                        <Link to={protectedLink} className={outlineButtonClass}>
                                            <Search className="mr-2 h-5 w-5" />
                                            Explore Tasks
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>

                       
                        <div className="flex items-center justify-center gap-4 mt-8">
                            <button onClick={prevSlide} className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                                <ChevronLeft className="h-5 w-5" />
                            </button>
                            <div className="flex gap-2">
                                {heroSlides.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentSlide(index)}
                                        className={`h-2 rounded-full transition-all ${
                                            index === currentSlide ? "w-8 bg-blue-500" : "w-2 bg-gray-400 dark:bg-gray-600"
                                        }`}
                                    />
                                ))}
                            </div>
                            <button onClick={nextSlide} className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                                <ChevronRight className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                  
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
                        {[
                            { label: "Active Freelancers", value: "10,000+" },
                            { label: "Tasks Completed", value: "50,000+" },
                            { label: "Happy Clients", value: "8,500+" },
                            { label: "Countries", value: "150+" },
                        ].map((stat, index) => (
                            <div
                                key={index}
                                className="text-center p-4 rounded-xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 shadow-sm"
                            >
                                <div className="text-2xl md:text-3xl font-bold text-blue-500 dark:text-blue-300">{stat.value}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
          
            <section className="py-16 lg:py-24 dark:bg-black">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Featured Task Showcase</h2>
                        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            A showcase of the latest and most exciting tasks on our platform, dynamically loaded from the source data.
                        </p>
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center py-12">
                            
                        </div>
                    ) : (
                       
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          
                            {initialTasks.map((task) => (
                                
                                <JobCard key={task.id} task={task} /> 
                            ))}
                        </div>
                    )}

                    <div className="text-center mt-10">
                        <Link to={protectedLink} className={outlineButtonClass}>
                            View All Tasks
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-16 lg:py-24 bg-gray-100 dark:bg-black">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">How It Works</h2>
                        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Get started in just a few simple steps
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {[
                            {
                                step: "1",
                                title: "Post Your Task",
                                description: "Describe what you need, set your budget and deadline. It only takes a few minutes.",
                                icon: PenTool,
                            },
                            {
                                step: "2",
                                title: "Receive Bids",
                                description: "Talented freelancers will bid on your task. Review their profiles and proposals.",
                                icon: Users,
                            },
                            {
                                step: "3",
                                title: "Get It Done",
                                description: "Choose the best freelancer and get your project completed on time.",
                                icon: Zap,
                            },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="relative bg-white dark:bg-gray-700 rounded-2xl p-8 border border-gray-200 dark:border-gray-600 text-center shadow-lg hover:shadow-xl transition-shadow"
                            >
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">
                                    {item.step}
                                </div>
                                <div className="h-16 w-16 rounded-2xl bg-blue-500/10 dark:bg-blue-900/50 flex items-center justify-center mx-auto mb-6 mt-2">
                                    <item.icon className="h-8 w-8 text-blue-500 dark:text-blue-300" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{item.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

           
            <section className="py-16 lg:py-24 dark:bg-black">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold dark:text-white mb-4">
  Popular Categories
</h2>
                        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Explore tasks across various categories and find work that matches your skills
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {categories.map((category, index) => (
                            <Link
                                key={index}
                                
                                to={`/browse-tasks?category=${encodeURIComponent(category.name)}`}
                                className="group bg-white dark:bg-gray-700 rounded-xl p-6 border border-gray-200 dark:border-gray-600 text-center shadow-sm hover:shadow-lg transition-shadow"
                            >
                                <div className={`h-14 w-14 rounded-xl ${category.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                                    <category.icon className="h-7 w-7 text-white" />
                                </div>
                                <h3 className="text-sm font-medium text-gray-900 dark:text-white">{category.name}</h3>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trust Section */}
            <section className="py-16 lg:py-24 bg-blue-500 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                Your Security is Our Priority
                            </h2>
                            <p className="text-white/80 mb-8">
                                We provide a secure platform for freelancers and clients to connect, collaborate, and get work done with confidence.
                            </p>
                            <div className="space-y-4">
                                {[
                                    { icon: Shield, text: "Secure payments and escrow protection" },
                                    { icon: Users, text: "Verified freelancer profiles" },
                                    { icon: Zap, text: "24/7 customer support" },
                                ].map((item, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center">
                                            <item.icon className="h-5 w-5" />
                                        </div>
                                        <span>{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="text-center lg:text-right">
                            <div className="inline-block bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
                                <div className="text-6xl font-bold mb-2">98%</div>
                                <div className="text-white/80">Customer Satisfaction</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 lg:py-24 dark:bg-black">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 p-8 md:p-12 text-center max-w-4xl mx-auto shadow-xl">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Ready to Get Started?
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                            Join thousands of freelancers and clients who are already achieving their goals on FreelaGo.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                           
                            <Link to={ctaLink} className={primaryButtonClass}> 
                                {ctaText} 
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                            <Link to={protectedLink} className={outlineButtonClass}>Browse Tasks</Link> 
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;