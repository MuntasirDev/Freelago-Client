import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Filter, X } from "lucide-react";

// Assuming these are custom/shadcn UI components
import { Button } from "../Components/UI/Button"; 
import { Input } from "../Components/UI/Input"; 
import { Select, SelectContent, SelectItem } from "../Components/UI/Select"; 
import { SelectTrigger, SelectValue } from "../Components/UI/Select"; 

import Layout from "../Components/UI/Layout"; 
import LoadingSpinner from "../Components/UI/LoadinSpinner"; 

import JobCard, {
    initialTasks,
    TASK_CATEGORIES,
} from "../Components/JobCard";

const BrowseTasks = () => {
    // Mock data and state to simulate a loaded component
    const tasks = initialTasks;
    const isLoading = false;
    
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "all");
    const [sortBy, setSortBy] = useState("deadline");

    const filteredTasks = useMemo(() => {
        let result = [...tasks];

        // Filtering by search query (title or description)
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                (task) =>
                    task.title.toLowerCase().includes(query) ||
                    task.description.toLowerCase().includes(query)
            );
        }

        // Filtering by category
        if (selectedCategory && selectedCategory !== "all") {
            result = result.filter((task) => task.category === selectedCategory);
        }

        // Sorting
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
                result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                break;
            default:
                break;
        }

        return result;
    }, [tasks, searchQuery, selectedCategory, sortBy]);

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

    // Check if any filter is active for the "Clear" button
    const hasActiveFilters = searchQuery || selectedCategory !== "all";

    return (
        <Layout>
            <div className="container-custom mx-auto max-w-7xl px-4 py-8">
                
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Tasks</h1>
                    <p className="text-gray-600">
                        Find the perfect task that matches your skills and interests
                    </p>
                </div>

                {/* Filters/Search Bar */}
                <div className="bg-white rounded-xl border border-gray-200 p-4 mb-8">
                    <form onSubmit={handleSearch} className="flex flex-col lg:flex-row gap-4 items-center">
                        <div className="flex-1 relative w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Search tasks by title or description..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>

                        {/* Category Select */}
                        <Select value={selectedCategory} onValueChange={setSelectedCategory} className="w-full lg:w-[200px]">
                            <SelectTrigger className="w-full lg:w-[200px]">
                                <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Categories</SelectItem>
                                {TASK_CATEGORIES.map((category) => (
                                    <SelectItem key={category} value={category}>
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
                            <SelectContent>
                                <SelectItem value="deadline">Deadline (Soonest)</SelectItem>
                                <SelectItem value="newest">Newest First</SelectItem>
                                <SelectItem value="budget-high">Budget (High to Low)</SelectItem>
                                <SelectItem value="budget-low">Budget (Low to High)</SelectItem>
                            </SelectContent>
                        </Select>

                        <Button type="submit" className="w-full lg:w-auto">
                            <Filter className="mr-2 h-4 w-4" />
                            Apply
                        </Button>

                        {hasActiveFilters && (
                            <Button type="button" variant="ghost" onClick={clearFilters} className="w-full lg:w-auto">
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
                    <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                        <div className="h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                            <Search className="h-12 w-12 text-gray-500" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No tasks found</h3>
                        <p className="text-gray-600 mb-4">
                            {hasActiveFilters
                                ? "Try adjusting your filters or search query"
                                : "There are no tasks available at the moment"}
                        </p>
                        {hasActiveFilters && (
                            <Button onClick={clearFilters}>
                                Clear Filters
                            </Button>
                        )}
                    </div>
                ) : (
                    <>
                        <p className="text-sm text-gray-600 mb-4">
                            Showing **{filteredTasks.length}** task{filteredTasks.length !== 1 ? "s" : ""}
                        </p>
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