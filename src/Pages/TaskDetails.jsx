import { useState, useContext, createContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Calendar, DollarSign, Mail, Clock, Users, ArrowLeft, Loader2 } from "lucide-react";
import { format } from "date-fns"; 
import { toast, Toaster } from "sonner"; // 💡 Toaster ইম্পোর্ট করা হলো 
import { Button } from "../Components/UI/Button"; 
import { Input } from "../Components/UI/Input"; 
import { Label } from "../Components/UI/Label"; 
import Layout from "../Components/UI/Layout"; 
import LoadingSpinner from "../Components/UI/LoadinSpinner"; 
import { Badge } from "../Components/UI/Badge";
import { Textarea } from "../Components/UI/Textarea";
import { initialTasks, categoryColors } from "../Components/JobCard"; 

const TaskContext = createContext(null);

// *** Mock Contexts (Omitted for brevity, assuming they are working) ***
const useTasks = () => {
    // ... (unchanged logic) ...
    const [tasks, setTasks] = useState(initialTasks);
    const [isLoading, setIsLoading] = useState(false);

    const getTaskById = (id) => {
        return tasks.find(task => task.id === id);
    };

    const incrementBidCount = (taskId) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === taskId ? { ...task, bidsCount: task.bidsCount + 1 } : task
            )
        );
    };

    return { getTaskById, incrementBidCount, isLoading };
};

const AuthContext = createContext(null);

const useAuth = () => {

    const user = { 
        id: "user_bidder_1", 
        name: "Freelancer Pro",
        email: "pro@example.com"
    };
    return { user };
};


const TaskDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { getTaskById, incrementBidCount, isLoading } = useTasks();

    const [bidAmount, setBidAmount] = useState("");
    const [bidMessage, setBidMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    // Note: userBidsCount should ideally come from a context/API, mocking here.
    const [userBidsCount, setUserBidsCount] = useState(3); 

    const task = getTaskById(id || ""); 

    if (isLoading) {
        return (
            <Layout>
                <div className="container mx-auto py-12">
                    <LoadingSpinner text="Loading task details..." />
                </div>
            </Layout>
        );
    }

    if (!task) {
        return (
            <Layout>
                {/* 💡 Toaster এখানে বা App.jsx এ থাকতে পারে */}
                <Toaster position="top-right" richColors /> 
                <div className="container mx-auto py-12 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Task Not Found</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        The task you're looking for doesn't exist or has been removed.
                    </p>
                    <Button asChild>
                        <Link to="/browse-tasks">Browse Other Tasks</Link>
                    </Button>
                </div>
            </Layout>
        );
    }

    const daysUntilDeadline = Math.ceil(
        (new Date(task.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    );

    const isOwner = user?.id === task.userId; 

    const handleBid = async () => {
        if (!bidAmount || parseFloat(bidAmount) <= 0) {
            toast.error("Please enter a valid bid amount");
            return;
        }

        if (!bidMessage.trim()) {
            toast.error("Please add a message with your bid");
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        incrementBidCount(task.id);
        setUserBidsCount((prev) => prev + 1);
        setBidAmount("");
        setBidMessage("");
        setIsSubmitting(false);

        // ✅ এই কলটি এখন কাজ করবে
        toast.success("Your bid has been submitted!");
    };

    return (
        <Layout>
            {/* 💡 FIX: Toaster কম্পোনেন্টটি এখানে যুক্ত করা হয়েছে */}
            <Toaster position="top-right" richColors /> 

            <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 max-w-7xl">

<Button 
    onClick={() => navigate(-1)} 
    // Remove 'variant="outline"' to use the default solid style
    className="flex items-center mb-6 bg-blue-500 text-white border-none shadow-md" 
>
    <ArrowLeft className="mr-2 h-4 w-4" />
    Go Back
</Button>
                {userBidsCount > 0 && (
                    <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-700 rounded-lg p-4 mb-6">
                        <p className="text-blue-700 dark:text-blue-300 font-medium">
                            You bid for <span className="font-bold">{userBidsCount}</span> opportunities on this platform.
                        </p>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                            <div className="flex items-start justify-between mb-4">
                                <Badge className={categoryColors[task.category] || categoryColors["Other"]}>
                                    {task.category}
                                </Badge>
                                {daysUntilDeadline <= 3 && daysUntilDeadline > 0 && (
                                    <Badge variant="destructive">Urgent</Badge>
                                )}
                            </div>

                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                {task.title}
                            </h1>

                            <div className="flex flex-wrap gap-4 mb-6">
                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                    <DollarSign className="h-5 w-5 text-green-500" />
                                    <span className="font-semibold text-gray-900 dark:text-white">{task.budget}</span>
                                    <span>Budget</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                    <Calendar className="h-5 w-5 text-blue-500" />
                                    {/* 🎯 date-fns.format ব্যবহার */}
                                    <span>{format(new Date(task.deadline), "MMM dd, yyyy")}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                    <Clock className="h-5 w-5 text-orange-500" />
                                    <span>
                                        {daysUntilDeadline > 0
                                            ? `${daysUntilDeadline} days left`
                                            : "Deadline passed"}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                    <Users className="h-5 w-5 text-purple-500" />
                                    <span>{task.bidsCount} bids</span>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Description</h2>
                                <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">{task.description}</p>
                            </div>
                        </div>

                        {/* Bid Section */}
                        {!isOwner && (
                            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Place Your Bid</h2>
                                <div className="space-y-4">
                                    <div className="space-y-2 dark:text-white">
                                        <Label htmlFor="bidAmount">Your Bid Amount (USD)</Label>
                                        <Input
                                            id="bidAmount"
                                            type="number"
                                            placeholder="e.g., 450"
                                            value={bidAmount}
                                            onChange={(e) => setBidAmount(e.target.value)}
                                            min="1"
                                        />
                                    </div>
                                    <div className="space-y-2 dark:text-white">
                                        <Label htmlFor="bidMessage">Message</Label>
                                        <Textarea
                                            id="bidMessage"
                                            placeholder="Introduce yourself and explain why you're the best fit for this task..."
                                            value={bidMessage}
                                            onChange={(e) => setBidMessage(e.target.value)}
                                            rows={4}
                                        />
                                    </div>
                                    <Button onClick={handleBid} className="w-full bg-blue-500 hover:bg-blue-600 text-white" disabled={isSubmitting}>
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Submitting...
                                            </>
                                        ) : (
                                            "Submit Bid"
                                        )}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* Sidebar Content */}
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Posted By</h2>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                                    <span className="text-lg font-medium text-blue-700 dark:text-blue-300">
                                        {task.userName.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">{task.userName}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Client</p>
                                </div>
                            </div>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                    <Mail className="h-4 w-4" />
                                    <span>{task.userEmail}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                    <Clock className="h-4 w-4" />
                                    
                                    <span>Posted {format(new Date(task.createdAt), "MMM dd, yyyy")}</span>
                                </div>
                            </div>
                        </div>

                        {isOwner && (
                            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Task Actions</h2>
                                <div className="space-y-3">
                                    <Button asChild variant="" className="w-full">
                                        <Link to={`/edit-task/${task.id}`}>Edit Task</Link>
                                    </Button>
                                    <Button variant="secondary" className="w-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600">
                                        View Bids ({task.bidsCount})
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default TaskDetails;