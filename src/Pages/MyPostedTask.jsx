import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Edit2, Trash2, Eye, Plus, Calendar, DollarSign, Users } from "lucide-react"; 
import { format } from "date-fns";
import Layout from "../Components/UI/Layout"; 
import { toast } from "sonner"; 

// --- Configuration and Mock Data ---

const categoryColors = {
    "Web Development": "badge-primary",
    "Mobile Development": "badge-secondary",
    "Design": "badge-accent",
    "Writing": "badge-info",
    "Marketing": "badge-success",
    "Data Entry": "badge-warning",
    "Video Editing": "badge-error",
    "Other": "badge-neutral",
};

// Mock Task Structure
const initialMockTasks = [
    {
        id: "1",
        title: "Develop API Endpoint for User Auth",
        category: "Web Development",
        budget: "500",
        // Deadline 7 days from now
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        bidsCount: 12,
    },
    {
        id: "2",
        title: "Design Landing Page for SaaS Product",
        category: "Design",
        budget: "1200",
        // Deadline 14 days from now
        deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        bidsCount: 5,
    },
    {
        id: "3",
        title: "Fix broken CSS on Mobile View",
        category: "Mobile Development",
        budget: "150",
        // Deadline 2 days ago (for variety)
        deadline: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        bidsCount: 1,
    },
];

const MyPostedTasks = () => {
    const [myTasks, setMyTasks] = useState(initialMockTasks);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);

    // Simulation of task deletion
    const handleDelete = () => {
        if (taskToDelete) {
            setIsLoading(true); 
            
            // Simulate API call delay
            setTimeout(() => {
                setMyTasks(prevTasks => prevTasks.filter(task => task.id !== taskToDelete.id));
                toast.success(`Task "${taskToDelete.title}" deleted successfully.`);
                setDeleteModalOpen(false);
                setTaskToDelete(null);
                setIsLoading(false);
            }, 500);
        }
    };

    const openDeleteModal = (id, title) => {
        setTaskToDelete({ id, title });
        setDeleteModalOpen(true);
    };

    if (isLoading) {
        return (
            <Layout>
                <div className="container-custom py-12 flex justify-center">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="container-custom py-8">
                
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">My Posted Tasks</h1>
                        <p className="text-base-content/70">Manage all the tasks you've posted</p>
                    </div>
                    {/* Post New Task Button */}
                    <Link to="/add-task" className="btn bg-blue-500 text-white hover:bg-blue-700 rounded-lg">
                        <Plus className="h-4 w-4" />
                        Post New Task
                    </Link>
                </div>

                {/* Empty State */}
                {myTasks.length === 0 ? (
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body items-center text-center py-12">
                            <div className="h-24 w-24 rounded-full bg-base-200 flex items-center justify-center mb-4">
                                <Plus className="h-12 w-12 text-base-content/30" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">No tasks yet</h3>
                            <p className="text-base-content/70 mb-6">You haven't posted any tasks yet.</p>
                            <Link to="/add-task" className="btn bg-blue-500 text-white hover:bg-blue-700 rounded-lg">
                                <Plus className="h-4 w-4" />
                                Post Your First Task
                            </Link>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Mobile View (Cards) */}
                        <div className="lg:hidden space-y-4">
                            {myTasks.map((task) => (
                                <div key={task.id} className="card bg-base-100 shadow-md">
                                    <div className="card-body p-4">
                                        <div className="flex items-start justify-between mb-3">
                                            {/* Category Badge */}
                                            <span className={`badge ${categoryColors[task.category] || "badge-neutral"}`}>
                                                {task.category}
                                            </span>
                                            <div className="flex items-center gap-1 text-sm text-base-content/70">
                                                <Users className="h-4 w-4" />
                                                <span>{task.bidsCount} bids</span>
                                            </div>
                                        </div>
                                        
                                        <h3 className="font-semibold line-clamp-1 mb-2">{task.title}</h3>
                                        
                                        {/* Details Row */}
                                        <div className="flex items-center gap-4 text-sm text-base-content/70 mb-4">
                                            <div className="flex items-center gap-1">
                                                <DollarSign className="h-4 w-4" />
                                                **${task.budget}**
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-4 w-4" />
                                                {format(new Date(task.deadline), "MMM dd")}
                                            </div>
                                        </div>
                                        
                                        {/* Action Buttons */}
                                        <div className="flex gap-2">
                                            <button
                                                className="btn btn-outline btn-sm flex-1"
                                                onClick={() => navigate(`/task/${task.id}`)}
                                            >
                                                <Eye className="h-4 w-4" />
                                                View
                                            </button>
                                            <button
                                                className="btn btn-outline btn-sm flex-1"
                                                onClick={() => navigate(`/edit-task/${task.id}`)}
                                            >
                                                <Edit2 className="h-4 w-4" />
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-error btn-sm"
                                                onClick={() => openDeleteModal(task.id, task.title)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Desktop View (Table) */}
                        <div className="hidden lg:block card bg-base-100 shadow-xl overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="table w-full">
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Category</th>
                                            <th>Budget</th>
                                            <th>Deadline</th>
                                            <th>Bids</th>
                                            <th className="text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {myTasks.map((task) => (
                                            <tr key={task.id}>
                                                <td className="font-medium max-w-[200px] truncate">{task.title}</td>
                                                <td>
                                                    {/* Category Badge */}
                                                    <span className={`badge ${categoryColors[task.category] || "badge-neutral"}`}>
                                                        {task.category}
                                                    </span>
                                                </td>
                                                <td>**${task.budget}**</td>
                                                <td>{format(new Date(task.deadline), "MMM dd, yyyy")}</td>
                                                <td>
                                                    <div className="flex items-center gap-1">
                                                        <Users className="h-4 w-4 text-base-content/70" />
                                                        {task.bidsCount}
                                                    </div>
                                                </td>
                                                <td className="text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        {/* View */}
                                                        <button
                                                            className="btn btn-ghost btn-sm"
                                                            onClick={() => navigate(`/task/${task.id}`)}
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                        </button>
                                                        {/* Edit */}
                                                        <button
                                                            className="btn btn-ghost btn-sm"
                                                            onClick={() => navigate(`/edit-task/${task.id}`)}
                                                        >
                                                            <Edit2 className="h-4 w-4" />
                                                        </button>
                                                        {/* Delete */}
                                                        <button
                                                            className="btn btn-ghost btn-sm text-error"
                                                            onClick={() => openDeleteModal(task.id, task.title)}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                        {/* Bids Button */}
                                                        <button
                                                            className="btn btn-secondary btn-sm"
                                                            onClick={() => toast.info(`Navigating to view bids for: ${task.title}`)}
                                                        >
                                                            Bids
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}

                {/* Delete Confirmation Modal */}
                <dialog className={`modal ${deleteModalOpen ? "modal-open" : ""}`}>
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Delete Task</h3>
                        <p className="py-4">
                            Are you sure you want to delete **"{taskToDelete?.title}"**? This action cannot be undone.
                        </p>
                        <div className="modal-action">
                            <button className="btn" onClick={() => setDeleteModalOpen(false)}>
                                Cancel
                            </button>
                            <button className="btn btn-error" onClick={handleDelete} disabled={isLoading}>
                                {isLoading ? <span className="loading loading-spinner"></span> : 'Delete'}
                            </button>
                        </div>
                    </div>
                    {/* Modal Backdrop to close when clicking outside */}
                    <form method="dialog" className="modal-backdrop">
                        <button onClick={() => setDeleteModalOpen(false)}>close</button>
                    </form>
                </dialog>
            </div>
        </Layout>
    );
};

export default MyPostedTasks;