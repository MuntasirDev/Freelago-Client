import { useState, useMemo } from "react";
import { useLoaderData, useSearchParams } from "react-router-dom"; 
import { Search, Filter, X } from "lucide-react";
import { Button } from "../Components/UI/Button"; 
import { Input } from "../Components/UI/Input"; 
import { Select, SelectContent, SelectItem } from "../Components/UI/Select"; 
import { SelectTrigger, SelectValue } from "../Components/UI/Select"; 
import Layout from "../Components/UI/Layout"; 
import LoadingSpinner from "../Components/UI/LoadinSpinner"; 
import JobCard, { TASK_CATEGORIES, initialTasks } from "../Components/JobCard"; 

const BrowseTasks = () => {
   
    const tasksFromLoader = useLoaderData();

   
    let loadedTasks = [];

    if (Array.isArray(tasksFromLoader)) {
       
        loadedTasks = tasksFromLoader;
    } else if (tasksFromLoader && Array.isArray(tasksFromLoader.tasks?.data)) {
       
        loadedTasks = tasksFromLoader.tasks.data;
    } else if (tasksFromLoader && Array.isArray(tasksFromLoader.data)) {
        
        loadedTasks = tasksFromLoader.data;
    }
        
  
    const loadedTaskIds = new Set(loadedTasks.map(task => task.id));

    
    const unLoadedInitialTasks = initialTasks.filter(task => !loadedTaskIds.has(task.id));

   
    const allTasks = [...loadedTasks, ...unLoadedInitialTasks];
    
   
    const isLoading = false; 
    
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "all");
    const [sortBy, setSortBy] = useState("deadline");

    const filteredTasks = useMemo(() => {
        
        let result = [...allTasks]; 

        
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                (task) =>
                    task.title.toLowerCase().includes(query) ||
                    task.description.toLowerCase().includes(query)
            );
        }

       
        if (selectedCategory && selectedCategory !== "all") {
            result = result.filter((task) => task.category === selectedCategory);
        }

        switch (sortBy) {
            case "deadline":
              
                result.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
                break;
            case "budget-high":
              
                result.sort((a, b) => b.budget - a.budget);
                break;
            case "budget-low":
               
                result.sort((a, b) => a.budget - b.budget);
                break;
            case "newest":
                
                result.sort((a, b) => new Date(b.createdAt || a.id).getTime() - new Date(a.createdAt || b.id).getTime());
                break;
            default:
                break;
        }

        return result;
    }, [allTasks, searchQuery, selectedCategory, sortBy]); 

    const handleSearch = (e) => {
        e.preventDefault();
        const params = new URLSearchParams(searchParams);
        if (searchQuery) {
            params.set("search", searchQuery);
        } else {
            params.delete("search");
        }
        setSearchParams(params);
    };

    const clearFilters = () => {
        setSearchQuery("");
        setSelectedCategory("all");
        setSortBy("deadline");
        setSearchParams({});
    };

    const hasActiveFilters = searchQuery || selectedCategory !== "all";

    return (
        <Layout>
            <div className="container-custom mx-auto max-w-7xl px-4 py-8 bg-white dark:bg-black">
                
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold dark:text-white text-gray-900 mb-2">Browse Tasks</h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Find the perfect task that matches your skills and interests. Total Tasks Available: {allTasks.length}
                    </p>
                </div>

                {/* Filters/Search Bar */}
                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 mb-8">
                    <form onSubmit={handleSearch} className="flex flex-col lg:flex-row gap-4 items-center">
                        <div className="flex-1 relative w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Search tasks by title or description..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                            />
                        </div>

                        {/* Category Select */}
                        <Select value={selectedCategory} onValueChange={setSelectedCategory} className="w-full lg:w-[200px]">
                            <SelectTrigger className="w-full lg:w-[200px]">
                                <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                                <SelectItem value="all" className="dark:text-white">All Categories</SelectItem>
                                {TASK_CATEGORIES.map((category) => (
                                    <SelectItem key={category} value={category} className="dark:text-white">
                                        {category}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {/* Sort By Select */}
                        <Select value={sortBy} onValueChange={setSortBy} className="w-full lg:w-[180px]">
                            <SelectTrigger className="w-full lg:w-[180px]">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                                <SelectItem value="deadline" className="dark:text-white">Deadline (Soonest)</SelectItem>
                                <SelectItem value="newest" className="dark:text-white">Newest First</SelectItem>
                                <SelectItem value="budget-high" className="dark:text-white">Budget (High to Low)</SelectItem>
                                <SelectItem value="budget-low" className="dark:text-white">Budget (Low to High)</SelectItem>
                            </SelectContent>
                        </Select>

                        <Button type="submit" className="w-full lg:w-auto">
                            <Filter className="mr-2 h-4 w-4" />
                            Apply
                        </Button>

                        {hasActiveFilters && (
                            <Button type="button" variant="ghost" onClick={clearFilters} className="w-full lg:w-auto dark:text-white dark:hover:bg-gray-800">
                                <X className="mr-2 h-4 w-4" />
                                Clear
                            </Button>
                        )}
                    </form>
                </div>

                {/* Results Section */}
                {isLoading ? (
                    <div className="flex justify-center py-12">
                        <LoadingSpinner text="Loading tasks..." />
                    </div>
                ) : filteredTasks.length === 0 ? (
                    <div className="text-center py-12 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
                        <div className="h-24 w-24 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
                            <Search className="h-12 w-12 text-gray-500 dark:text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No tasks found</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            Try adjusting your filters or search query
                        </p>
                        {hasActiveFilters && (
                            <Button onClick={clearFilters}>
                                Clear Filters
                            </Button>
                        )}
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredTasks.map((task, index) => (
                                <div
                                    key={task.id}
                                    className="animate-fade-in"
                                    style={{ animationDelay: `${0.05 * index}s` }}
                                >
                                    <JobCard task={task} />
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </Layout>
    );
};

export default BrowseTasks;