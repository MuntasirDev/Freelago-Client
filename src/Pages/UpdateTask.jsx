import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; 
import { Loader2 } from "lucide-react";
import { toast, Toaster } from 'sonner';

// --- UI Components ---
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

// --- Contexts ---
import { AuthContext } from '../Provider/AuthProvider';

// --- Constants ---
const TASK_CATEGORIES = [
    "Web Development",
    "Mobile Development",
    "Graphic Design",
    "Writing & Translation",
    "Data Entry",
    "Video Editing",
    "Other",
];

// --- API Functions ---
// টাস্ক ডেটা লোড করার ফাংশন
const fetchTaskDetails = async (id) => {
    const URL = `http://localhost:3000/tasks/${id}`; 
    const response = await fetch(URL);

    if (!response.ok) {
        throw new Error(`Failed to fetch task details. Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
};

// টাস্ক আপডেট করার ফাংশন (PUT/PATCH রিকোয়েস্ট)
const updateTaskToDatabase = async (taskId, taskData) => {
    const URL = `http://localhost:3000/tasks/${taskId}`; 
    
    const response = await fetch(URL, {
        method: 'PUT', // PUT ব্যবহার করা হলো
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update task. Server responded with status ${response.status}. Message: ${errorText}`);
    }

    return response.json();
};

// --- UPDATE TASK COMPONENT ---

const UpdateTask = () => {
    // 1. Context & Hooks
    const { user, loading } = useContext(AuthContext);
    const navigate = useNavigate();
    const { id: taskId } = useParams(); 

    // 2. State Management
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");
    const [budget, setBudget] = useState("");
    const [isLoading, setIsLoading] = useState(false); 
    const [isFetchingTask, setIsFetchingTask] = useState(true); 
    const [originalTask, setOriginalTask] = useState(null); 
    const minDate = new Date().toISOString().split('T')[0];
    const isAuthLoadingOrMissing = loading || !user;
    useEffect(() => {
        if (loading) return; 

        if (!taskId) {
            setIsFetchingTask(false);
            toast.error("Task ID is missing in the URL.");
            return;
        }

        if (!user) {
            setIsFetchingTask(false);
            return;
        }

        const loadTaskData = async () => {
            setIsFetchingTask(true);
            try {
                const data = await fetchTaskDetails(taskId);
                if (data.userEmail !== user.email) {
                    toast.error("You are not authorized to edit this task.");
                    navigate('/my-tasks');
                    return;
                }

                setOriginalTask(data);
                setTitle(data.title || "");
                setCategory(data.category || TASK_CATEGORIES[0]);
                setDescription(data.description || "");
                
                
                const datePart = data.deadline ? new Date(data.deadline).toISOString().split('T')[0] : "";
                setDeadline(datePart); 
                
                setBudget(String(data.budget) || "");

            } catch (error) {
                console.error("Task loading error:", error);
                toast.error("Failed to load task details. " + error.message);
            } finally {
                setIsFetchingTask(false);
            }
        };

        loadTaskData();
        
    }, [taskId, user, loading, navigate]);


    
    const handleSubmit = async (e) => {
        e.preventDefault();

        
        if (isAuthLoadingOrMissing || !originalTask) {
             toast.error("Cannot update: Authentication or task data missing.");
             return;
        }

      
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
        
        
        if (originalTask.userEmail !== user.email) {
            toast.error("Error: Task owner mismatch.");
            return;
        }

        setIsLoading(true);

        try {
            const emailLocalPart = user.email.split('@')[0];
            const finalUserName = user.displayName || emailLocalPart; 
            const updatedTaskData = {
                title,
                category,
                description,
                deadline: deadlineDate.toISOString().split('T')[0], 
                budget: parsedBudget,
                userEmail: user.email,
                userName: finalUserName, 
                userId: user.uid,
            };

            await updateTaskToDatabase(taskId, updatedTaskData);

            toast.success("Task updated successfully! Redirecting...");

            setTimeout(() => navigate("/my-tasks"), 500);

        } catch (error) {
            console.error("Task update error:", error);
            toast.error("Failed to update task. Please try again. Check console.");
        } finally {
            setIsLoading(false);
        }
    };

    
    if (loading || isFetchingTask) {
        return (
            <Layout>
                <div className="flex justify-center items-center min-h-[calc(100vh-64px)] py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="ml-2 text-xl dark:text-white">Loading task details...</p>
                </div>
            </Layout>
        );
    }

    if (!user) {
        return (
            <Layout>
                <div className="flex justify-center items-center min-h-[calc(100vh-64px)] py-12 flex-col text-center">
                    <h2 className="text-3xl font-bold dark:text-white">You need to log in!</h2>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">Please log in to update a task.</p>
                    <Button onClick={() => navigate('/login')} className="mt-6">Go to Login</Button>
                </div>
            </Layout>
        );
    }
    
    if (!originalTask && !isFetchingTask) {
        return (
            <Layout>
                <div className="flex justify-center items-center min-h-[calc(100vh-64px)] py-12 flex-col text-center">
                    <h2 className="text-3xl font-bold dark:text-white">Task Not Found</h2>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">The task you are looking for does not exist or you don't have access.</p>
                    <Button onClick={() => navigate('/my-tasks')} className="mt-6">Go to My Tasks</Button>
                </div>
            </Layout>
        );
    }

   
    return (
        <Layout>
            <Toaster position="top-right" richColors />

            <div className="flex justify-center items-start min-h-[calc(100vh-64px)] py-12 bg-gray-50 dark:bg-black">
                <div className="max-w-xl w-full p-4">

                   
                    <div className="mb-10 text-center">
                        <h1 className="text-4xl font-semibold text-gray-900 dark:text-white mb-4">Update Task: {originalTask?.title}</h1>
                        <p className="text-xl text-gray-600 dark:text-gray-400">
                            Modify the details of your posted task.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-6 shadow-lg">

                       
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
                        <div className="grid grid-cols-2 gap-4">
                         
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
                                   
                                    {!deadline && (
                                        <div
                                            className="absolute inset-0 flex items-center pl-3 pointer-events-none"
                                        >
                                            <span className="text-gray-500 dark:text-white">Pick a date</span>
                                        </div>
                                    )}
                                </div>
                            </div>

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

                       
                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                            <div className="space-y-2">
                                <Label>Your Email (Posted By)</Label>
                                <Input
                                        value={user.email || "Loading..."} 
                                        readOnly 
                                        className="bg-gray-100 dark:text-white dark:bg-gray-800 cursor-not-allowed"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Your Name</Label>
                                <Input
                                        value={user.displayName || user.email.split('@')[0] || "Loading..."} 
                                        readOnly 
                                        className="bg-gray-100 dark:text-white dark:bg-gray-800 cursor-not-allowed"
                                />
                            </div>
                        </div>

                        
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
                                            Updating...
                                        </>
                                ) : (
                                        "Update Task"
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default UpdateTask;