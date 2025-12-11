// src/Pages/AddTask.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { toast, Toaster } from 'sonner';
import Layout from "../Components/UI/Layout";
import { Button } from "../Components/UI/Button";
import { Input } from "../Components/UI/Input";
import { Label } from "../Components/UI/Label";
import { Textarea } from "../Components/UI/Textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectValue,
    SelectTrigger
} from "../Components/UI/Select";

// 🎯 আপনার আসল AuthProvider আমদানি করুন
import { AuthContext } from '../Provider/AuthProvider';

const TASK_CATEGORIES = [
    "Web Development",
    "Mobile Development",
    "Graphic Design",
    "Writing & Translation",
    "Data Entry",
];

// --- API Function (No change needed here) ---
const postTaskToDatabase = async (taskData) => {
    const URL = 'http://localhost:3000/task'; // MUST match your server URL

    const response = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to post task. Server responded with status ${response.status}. Message: ${errorText}`);
    }

    return response.json();
};

// --- ADD TASK COMPONENT ---

const AddTask = () => {
    // 🎯 মক useAuth এর বদলে আসল useContext ব্যবহার করা হয়েছে
    const { user, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    // State
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState(TASK_CATEGORIES[0] || "");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");
    const [budget, setBudget] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // 🎯 ইউজার ডেটা না পাওয়া গেলে বা লোডিং চললে ফর্ম সাবমিট হবে না
    const isAuthLoadingOrMissing = loading || !user;

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 0. Auth Check
        if (isAuthLoadingOrMissing) {
             toast.error("Authentication required. Please log in first.");
             return;
        }

        // 1. Validation (Same as before)
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

        if (new Date(deadlineDate).getTime() < today.getTime()) {
            toast.error("Deadline must be today or in the future.");
            return;
        }

        setIsLoading(true);

        try {
            // ⭐ FIX Logic: user.email থেকে নাম তৈরি করা হলো
            const emailLocalPart = user.email.split('@')[0];
            
            // ⭐ userName এর জন্য ফলব্যাক লজিক ব্যবহার করা হলো: 
            // 1. যদি displayName থাকে, সেটা ব্যবহার করো।
            // 2. যদি না থাকে, তাহলে ইমেলের @-এর আগের অংশটি ব্যবহার করো।
            const finalUserName = user.displayName || emailLocalPart; 

            const taskData = {
                title,
                category,
                description,
                deadline: deadlineDate.toISOString().split('T')[0],
                budget: parsedBudget,
                
                // ⭐ আসল Firebase/Auth ডেটা ব্যবহার করা হচ্ছে
                userEmail: user.email,
                userName: finalUserName, // ✅ এখানে ফিক্স করা হলো
                userId: user.uid,
            };

            await postTaskToDatabase(taskData);

            toast.success("Task posted successfully! Redirecting...");

            setTimeout(() => navigate("/my-tasks"), 500);

        } catch (error) {
            console.error("Task submission error:", error);
            toast.error("Failed to post task. Please try again. Check console.");
        } finally {
            setIsLoading(false);
        }
    };

    // Calculate minimum date for the date input (today's date in YYYY-MM-DD format)
    const minDate = new Date().toISOString().split('T')[0];

    // 💡 Auth Loading State
    if (loading) {
        return (
            <Layout>
                <div className="flex justify-center items-center min-h-[calc(100vh-64px)] py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="ml-2 text-xl dark:text-white">Loading user data...</p>
                </div>
            </Layout>
        );
    }

    // 💡 Not Logged In State
    if (!user) {
         return (
             <Layout>
                 <div className="flex justify-center items-center min-h-[calc(100vh-64px)] py-12 flex-col text-center">
                    <h2 className="text-3xl font-bold dark:text-white">You need to log in!</h2>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">Please log in to post a new task.</p>
                    <Button onClick={() => navigate('/login')} className="mt-6">Go to Login</Button>
                 </div>
             </Layout>
         );
       }


    return (
        <Layout>
            {/* Toaster component */}
            <Toaster position="top-right" richColors />

            <div className="flex justify-center items-start min-h-[calc(100vh-64px)] py-12 bg-gray-50 dark:bg-black">
                <div className="max-w-xl w-full p-4">

                    {/* Header Section */}
                    <div className="mb-10 text-center">
                        <h1 className="text-4xl font-semibold text-gray-900 dark:text-white mb-4">Post a New Task</h1>
                        <p className="text-xl text-gray-600 dark:text-gray-400">
                            Describe your task and let freelancers bid on it!
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-6 shadow-lg">

                        {/* 1. Task Title (No change) */}
                        <div className="space-y-2 dark:text-white">
                            <Label htmlFor="title">Task Title </Label>
                            <Input
                                id="title"
                                placeholder="e.g., Build a responsive website"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                maxLength={100}
                            />
                        </div>

                        {/* 2. Category Select (No change) */}
                        <div className="space-y-2 ">
                            <Label className="dark:text-white" htmlFor="category">Category </Label>
                            <Select
                                value={category}
                                onValueChange={setCategory}
                            >
                                <SelectTrigger>
                                     <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {TASK_CATEGORIES.map((cat) => (
                                         <SelectItem key={cat} value={cat}>
                                             {cat}
                                         </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* 3. Description (No change) */}
                        <div className="space-y-2 dark:text-white">
                            <Label htmlFor="description">Description </Label>
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

                        {/* 4. Deadline and Budget (No change) */}
                        <div className="grid grid-cols-2 gap-4">
                            {/* Deadline */}
                            <div className="space-y-2 dark:text-white">
                                <Label htmlFor="deadline">Deadline </Label>
                                <div className="relative">
                                    <Input
                                        id="deadline"
                                        type="date"
                                        value={deadline}
                                        onChange={(e) => setDeadline(e.target.value)}
                                        min={minDate}
                                        className={`appearance-none pr-3 ${
                                             !deadline ? 'text-transparent dark:text-transparent' : 'text-gray-900 dark:text-white'
                                         } focus:text-gray-900 dark:focus:text-white`}
                                    />

                                    {/* Custom "Pick a date" placeholder */}
                                    {!deadline && (
                                        <div
                                             className="absolute inset-0 flex items-center pl-3 pointer-events-none"
                                        >
                                             <span className="text-gray-500 dark:text-white">Pick a date</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Budget */}
                            <div className="space-y-2 dark:text-white">
                                <Label htmlFor="budget">Budget (USD) </Label>
                                <Input className="dark:text-white"
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

                        {/* 5. User Info (Read-Only) - ⭐ এখানে ইউজার ডেটা দেখানো হয়েছে */}
                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                            <div className="space-y-2">
                                <Label>Your Email (Posted By)</Label>
                                <Input
                                     value={user.email || "Loading..."} // Signed-in Mail
                                     readOnly
                                     className="bg-gray-100 dark:text-white dark:bg-gray-800 cursor-not-allowed"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Your Name</Label>
                                <Input
                                     // এখানেও userName এর জন্য একই ফিক্সড লজিক ব্যবহার করা হলো
                                     value={user.displayName || user.email.split('@')[0] || "Loading..."} 
                                     readOnly
                                     className="bg-gray-100 dark:text-white dark:bg-gray-800 cursor-not-allowed"
                                />
                            </div>
                        </div>

                        {/* 6. Action Buttons (Disable based on isAuthLoadingOrMissing or isLoading) */}
                        <div className="flex gap-4 pt-4">
                            <Button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="flex-1"
                                disabled={isLoading || isAuthLoadingOrMissing}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" className="flex-1" disabled={isLoading || isAuthLoadingOrMissing}>
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