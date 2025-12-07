import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarIcon, Loader2 } from "lucide-react";
// Sonner Toast ইম্পোর্ট করা হলো 
import { toast } from 'sonner'; 

// --- UI COMPONENT IMPORTS ---
// UI কম্পোনেন্ট পাথ ঠিক করা হয়েছে
import Layout from "../Components/UI/Layout"; 
import { Button } from "../Components/UI/Button";
import { Input } from "../Components/UI/Input";
import { Label } from "../Components/UI/Label"; 
import { Textarea } from "../Components/UI/Textarea"; 
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectValue 
} from "../Components/UI/Select";

// --- ডেটা এবং ইউটিলিটি ইম্পোর্ট ---
import { TASK_CATEGORIES } from "../Components/JobCard"; 

// ****************************
// --- MOCK CONTEXTS (For Demo) ---
// ****************************

// Auth Context (ব্যবহারকারীর তথ্য)
const useAuth = () => ({
    user: {
        email: "user@gmail.com", 
        name: "Google User",
        id: "mock-user-123",
    },
});

// Task Context (ডাটা সাবমিট লজিক)
const useTasks = () => ({
    addTask: (taskData) => {
        console.log("Mock Task Submission:", taskData);
        // Simulate successful async operation
        return new Promise(resolve => setTimeout(resolve, 1500)); 
    },
});

// ****************************
// --- ADD TASK COMPONENT ---
// ****************************

const AddTask = () => {
    const { user } = useAuth();
    const { addTask } = useTasks();
    const navigate = useNavigate();

    // State
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState(""); 
    const [budget, setBudget] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 1. Validation
        if (!title || !category || !description || !deadline || !budget) {
            toast.error("Please fill in all required fields.");
            return;
        }

        const parsedBudget = parseFloat(budget);

        if (isNaN(parsedBudget) || parsedBudget <= 0) {
            toast.error("Budget must be a number greater than $0.");
            return;
        }

        const deadlineDate = new Date(deadline);
        const today = new Date();
        today.setHours(0, 0, 0, 0); 
        
        if (deadlineDate < today) {
            toast.error("Deadline must be today or in the future.");
            return;
        }

        setIsLoading(true);

        try {
            await addTask({
                title,
                category,
                description,
                deadline: deadlineDate.toISOString(), 
                budget: parsedBudget,
                userEmail: user.email,
                userName: user.name,
                userId: user.id,
            });

            toast.success("Task posted successfully! Redirecting...");
            
            // simulate successful navigation after a short delay
            setTimeout(() => navigate("/my-tasks"), 500); 

        } catch (error) {
            console.error("Task submission error:", error);
            toast.error("Failed to post task. Please try again.");
        } 
        // Note: finally ব্লকটি এখানে বাদ দেওয়া হয়েছে কারণ navigate() কল করা হচ্ছে। 
        // যদি navigate() না করা হতো, তবে setIsLoading(false) ব্যবহার করা হতো।
    };

    // Calculate minimum date for the date input (today's date in YYYY-MM-DD format)
    const minDate = new Date().toISOString().split('T')[0];

    return (
        <Layout>
            <div className="flex justify-center items-start min-h-[calc(100vh-64px)] py-12 bg-gray-50 dark:bg-gray-900">
                <div className="max-w-xl w-full p-4">
                    
                    {/* Header Section */}
                    <div className="mb-8 text-center">
                        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">Post a New Task</h1>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Describe your task and let freelancers bid on it
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 space-y-6 shadow-lg">
                        
                        {/* 1. Task Title */}
                        <div className="space-y-2">
                            <Label htmlFor="title">Task Title *</Label>
                            <Input
                                id="title"
                                placeholder="e.g., Build a responsive website"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                maxLength={100}
                            />
                        </div>

                        {/* 2. Category Select */}
                        <div className="space-y-2">
                            <Label htmlFor="category">Category *</Label>
                            <Select value={category} onValueChange={setCategory}>
                                <SelectValue placeholder="Select a category" />
                                <SelectContent>
                                    {/* JobCard থেকে ইম্পোর্ট করা TASK_CATEGORIES ব্যবহার করা হলো */}
                                    {TASK_CATEGORIES.map((cat) => (
                                        <SelectItem key={cat} value={cat}>
                                            {cat}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* 3. Description */}
                        <div className="space-y-2">
                            <Label htmlFor="description">Description *</Label>
                            <Textarea
                                id="description"
                                placeholder="Describe what needs to be done in detail..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={5}
                                maxLength={1000}
                            />
                            <p className="text-xs text-gray-500 dark:text-gray-400 text-right">
                                {description.length}/1000
                            </p>
                        </div>

                      
                          {/* 4. Deadline and Budget (Two Columns) */}
<div className="grid grid-cols-2 gap-4">
    {/* Deadline */}



    {/* Budget */}
    <div className="space-y-2">
        <Label htmlFor="budget">Budget (USD) *</Label>
        <Input
            id="budget"
            type="number"
            placeholder="e.g., 500"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            min="1"
            step="1"
        />
    </div>
</div>
                        {/* 5. User Info (Read-Only) */}
                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <div className="space-y-2">
                                <Label>Your Email</Label>
                                <Input 
                                    value={user.email || ""} 
                                    readOnly 
                                    className="bg-gray-100 dark:bg-gray-700 cursor-not-allowed" 
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Your Name</Label>
                                <Input 
                                    value={user.name || ""} 
                                    readOnly 
                                    className="bg-gray-100 dark:bg-gray-700 cursor-not-allowed" 
                                />
                            </div>
                        </div>

                        {/* 6. Action Buttons */}
                        <div className="flex gap-4 pt-4">
                            <Button 
                                type="button" 
                                variant="" 
                                onClick={() => navigate(-1)} // ✅ Cancel Button Fix
                                className="flex-1 bg-blue-500"
                                disabled={isLoading} // Loading অবস্থায় বাটন ডিজেবল
                            >
                                Cancel
                            </Button>
                            <Button type="submit" className="flex-1" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Posting...
                                    </>
                                ) : (
                                    "Post Task"
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default AddTask;