// src/components/MyPostedTask.jsx (কোনো পরিবর্তন ছাড়াই এটি মডিউলারাইজড)

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Edit2, Trash2, Eye, Plus, Calendar, DollarSign, Users } from "lucide-react";
import { format } from "date-fns";
import { toast, Toaster } from "sonner";

// --- 1. UI Components Import (assuming path is correct and index.jsx handles sub-exports) ---
import { 
    Button, Badge, Layout, LoadingSpinner, 
    Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
    AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel
} from "../Components/UI/Calender"; 


const MyPostedTask = () => {
    // Hooks initialization
    const { user } = useAuth();
    const { getUserTasks, deleteTask, isLoading } = useTasks();
    const navigate = useNavigate(); 
    const [openAlertId, setOpenAlertId] = useState(null);

    const myTasks = getUserTasks(user?.id || "");

    const handleDelete = (taskId) => {
        deleteTask(taskId);
        toast.success("Task deleted successfully");
        setOpenAlertId(null);
    };

    const mockNavigate = (path) => toast.info(`Navigating to: ${path}`);
    

    if (isLoading) {
        return (
            <Layout>
                <div className="container-custom py-12">
                    <LoadingSpinner text="Loading your tasks..." />
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            {/* Toaster for notifications */}
            <Toaster position="top-right" richColors />

            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                {/* Header and Post New Task Button */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Posted Tasks</h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Manage all the tasks you've posted on FreelaGo
                        </p>
                    </div>
                    <Button asChild>
                        <Link to="/add-task" onClick={() => mockNavigate("/add-task")}>
                            <Plus className="mr-2 h-4 w-4" />
                            Post New Task
                        </Link>
                    </Button>
                </div>

                {myTasks.length === 0 ? (
                    /* Empty State (Your original logic) */
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-12 text-center">
                        <div className="h-24 w-24 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mx-auto mb-4">
                            <Plus className="h-12 w-12 text-gray-500 dark:text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No tasks yet</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            You haven't posted any tasks yet. Start by creating your first task!
                        </p>
                        <Button asChild>
                            <Link to="/add-task" onClick={() => mockNavigate("/add-task")}>
                                <Plus className="mr-2 h-4 w-4" />
                                Post Your First Task
                            </Link>
                        </Button>
                    </div>
                ) : (
                    <>
                        {/* Mobile View */}
                        <div className="lg:hidden space-y-4">
                             {myTasks.map((task) => (
                                <div key={task.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
                                    <div className="flex items-start justify-between mb-3">
                                        <Badge className={categoryColors[task.category] || categoryColors["Other"]}>
                                            {task.category}
                                        </Badge>
                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                            {task.bidsCount} bids
                                        </span>
                                    </div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">
                                        {task.title}
                                    </h3>
                                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                                        <div className="flex items-center gap-1">
                                            <DollarSign className="h-4 w-4" />
                                            ${task.budget}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Calendar className="h-4 w-4" />
                                            {format(new Date(task.deadline), "MMM dd")}
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => mockNavigate(`/task/${task.id}`)}
                                            className="flex-1"
                                        >
                                            <Eye className="mr-1 h-4 w-4" /> View
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => mockNavigate(`/edit-task/${task.id}`)}
                                            className="flex-1"
                                        >
                                            <Edit2 className="mr-1 h-4 w-4" /> Edit
                                        </Button>
                                        
                                        <AlertDialog open={openAlertId === task.id} onOpenChange={(open) => setOpenAlertId(open ? task.id : null)}>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="destructive" size="sm" onClick={() => setOpenAlertId(task.id)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </AlertDialogTrigger>
                                            {openAlertId === task.id && (
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Delete Task</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Are you sure you want to delete "{task.title}"? This action cannot be undone.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel onClick={() => setOpenAlertId(null)}>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() => handleDelete(task.id)}
                                                            className="bg-red-600 hover:bg-red-700 text-white"
                                                        >
                                                            Delete
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            )}
                                        </AlertDialog>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Desktop View */}
                        <div className="hidden lg:block bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-gray-50 dark:bg-gray-700">
                                        <TableHead>Title</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead>Budget</TableHead>
                                        <TableHead>Deadline</TableHead>
                                        <TableHead>Bids</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {myTasks.map((task) => (
                                        <TableRow key={task.id}>
                                            <TableCell className="font-medium max-w-[200px] truncate text-gray-900 dark:text-white">
                                                {task.title}
                                            </TableCell>
                                            <TableCell>
                                                <Badge className={categoryColors[task.category] || categoryColors["Other"]}>
                                                    {task.category}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-gray-900 dark:text-white">${task.budget}</TableCell>
                                            <TableCell className="text-gray-600 dark:text-gray-400">{format(new Date(task.deadline), "MMM dd, yyyy")}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1 text-gray-900 dark:text-white">
                                                    <Users className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                                    {task.bidsCount}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button variant="ghost" size="sm" onClick={() => mockNavigate(`/task/${task.id}`)} title="View Task">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="sm" onClick={() => mockNavigate(`/edit-task/${task.id}`)} title="Edit Task">
                                                        <Edit2 className="h-4 w-4" />
                                                    </Button>
                                                    
                                                    <AlertDialog open={openAlertId === task.id} onOpenChange={(open) => setOpenAlertId(open ? task.id : null)}>
                                                        <AlertDialogTrigger asChild>
                                                            <Button variant="ghost" size="sm" onClick={() => setOpenAlertId(task.id)} title="Delete Task">
                                                                <Trash2 className="h-4 w-4 text-red-500 dark:text-red-400" />
                                                            </Button>
                                                        </AlertDialogTrigger>
                                                        {openAlertId === task.id && (
                                                            <AlertDialogContent>
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle>Delete Task</AlertDialogTitle>
                                                                    <AlertDialogDescription>
                                                                        Are you sure you want to delete "{task.title}"? This action cannot be undone.
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel onClick={() => setOpenAlertId(null)}>Cancel</AlertDialogCancel>
                                                                    <AlertDialogAction
                                                                        onClick={() => handleDelete(task.id)}
                                                                        className="bg-red-600 hover:bg-red-700 text-white"
                                                                    >
                                                                        Delete
                                                                    </AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        )}
                                                    </AlertDialog>
                                                    <Button
                                                        variant="secondary"
                                                        size="sm"
                                                        onClick={() => toast.info(`Viewing ${task.bidsCount} bids for ${task.title}`)}
                                                    >
                                                        Bids ({task.bidsCount})
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </>
                )}
            </div>
        </Layout>
    );
};

export default MyPostedTask;