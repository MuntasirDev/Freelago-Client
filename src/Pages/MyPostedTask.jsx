import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Edit2, Trash2, Eye, Plus, Calendar, DollarSign, Users, Briefcase } from "lucide-react"; 
import { format } from "date-fns";
import { toast } from "sonner"; 
import Layout from "../Components/UI/Layout"; 
import { AuthContext } from '../Provider/AuthProvider'; 

const categoryColors = {
    "Web Development": "badge-primary",
    "Mobile Development": "badge-secondary",
    "Graphic Design": "badge-accent", 
    "Writing & Translation": "badge-neutral", 
    "Data Entry": "badge-warning",
    "Video Editing": "badge-error",
    "Other": "badge-neutral",
};

const initialMockTasks = []; 

const MyPostedTasks = () => {
    const { user, loading } = useContext(AuthContext); 
    const [myTasks, setMyTasks] = useState(initialMockTasks);
    const [isFetching, setIsFetching] = useState(true); 
    const navigate = useNavigate();
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);

    useEffect(() => {
        if (user && user.email && !loading) {
            const fetchMyTasks = async () => {
                setIsFetching(true);
                const email = user.email; 
                
                const API_URL = `http://localhost:3000/my-tasks/${email}`; 
                
                try {
                    const response = await fetch(API_URL);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    
                    const formattedData = data.map(task => ({
                        ...task,
                        id: task._id 
                    }));
                    setMyTasks(formattedData);
                } catch (error) {
                    console.error("Failed to fetch my tasks:", error);
                    toast.error("Failed to load your tasks. Please ensure the API is running.");
                    setMyTasks([]);
                } finally {
                    setIsFetching(false);
                }
            };
            fetchMyTasks();
        } else if (!user && !loading) {
            setIsFetching(false);
        }
    }, [user, loading]); 

    const handleDelete = async () => {
        if (!taskToDelete || !taskToDelete.id) return;
        
        setIsFetching(true); 
        
        const DELETE_API_URL = `http://localhost:3000/task/${taskToDelete.id}`;
        
        try {
            const response = await fetch(DELETE_API_URL, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }
            
            setMyTasks(prevTasks => prevTasks.filter(task => task.id !== taskToDelete.id));
            toast.success(`Task "${taskToDelete.title}" deleted successfully.`);
            
            setDeleteModalOpen(false);
            setTaskToDelete(null);

        } catch (error) {
            console.error("Deletion error:", error);
            toast.error(`Failed to delete the task: ${error.message}`);
        } finally {
            setIsFetching(false);
        }
    };

    const openDeleteModal = (id, title) => {
        setTaskToDelete({ id, title });
        setDeleteModalOpen(true);
    };

    // 💡 লোডিং বা লগইন চেক
    if (loading || isFetching) {
        return (
            <Layout>
                <div className="container-custom py-12 flex justify-center min-h-screen">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>
            </Layout>
        );
    }
    
    if (!user) {
        return (
            <Layout>
                <div className="container-custom py-12 text-center min-h-screen">
                    <h2 className="text-2xl font-bold dark:text-white">Access Denied</h2>
                    <p className="mt-4 dark:text-gray-400">You need to be logged in to view your posted tasks.</p>
                    <Link to="/login" className="btn bg-blue-500 text-white hover:bg-blue-700 mt-6">Go to Login</Link>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="container-custom py-8 dark:text-white">
                 
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">My Posted Tasks</h1>
                        <p className="text-base-content/70 dark:text-gray-400">
                            Manage all the tasks you've posted
                            
                        </p>
                    </div>
                    
                    <Link to="/add-task" className="btn bg-blue-500 text-white hover:bg-blue-700 rounded-lg">
                        <Plus className="h-4 w-4" />
                        Post New Task
                    </Link>
                </div>

                {myTasks.length === 0 ? (
                    
                    <div className="card bg-base-100 shadow-xl dark:bg-gray-800 dark:text-white">
                        <div className="card-body items-center text-center py-12">
                            <div className="h-24 w-24 rounded-full bg-base-200 dark:bg-gray-700 flex items-center justify-center mb-4">
                                <Briefcase className="h-12 w-12 text-base-content/30 dark:text-gray-500" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">No tasks yet</h3>
                            <p className="text-base-content/70 dark:text-gray-400 mb-6">You haven't posted any tasks yet.</p>
                            <Link to="/add-task" className="btn bg-blue-500 text-white hover:bg-blue-700 rounded-lg">
                                <Plus className="h-4 w-4" />
                                Post Your First Task
                            </Link>
                        </div>
                    </div>
                ) : (
                    <>
                       
                        <div className="md:hidden space-y-4 ">
                            {myTasks.map((task) => (
                                <div key={task.id} className="card bg-base-100 shadow-lg dark:bg-gray-800 dark:text-white border border-gray-700/50">
                                    <div className="card-body p-5 space-y-3">
                                        
                                        
                                        <div className="flex justify-between items-start">
                                            <h2 className="card-title text-xl font-bold max-w-[80%]">{task.title}</h2>
                                            <span className={`badge p-5 text-white font-bold text-xs  ${categoryColors[task.category] || "badge-neutral"} `}>{task.category}</span>
                                        </div>

                                       
                                        <div className="flex flex-col space-y-2 text-sm text-gray-500 dark:text-gray-400">
                                            <div className="flex items-center gap-2">
                                                <DollarSign className="h-4 w-4 text-green-500" />
                                                <span>Budget: <span className="font-semibold text-gray-900 dark:text-white">${task.budget}</span></span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4 text-red-500" />
                                                <span>Deadline: <span className="font-semibold">{format(new Date(task.deadline), "MMM dd, yyyy")}</span></span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Users className="h-4 w-4 text-blue-500" />
                                                <span>Bids: <span className="font-semibold text-gray-900 dark:text-white">{task.bidsCount || 0}</span></span>
                                            </div>
                                        </div>
                                        
                                        {/* Actions */}
                                        <div className="card-actions justify-end pt-3 border-t border-gray-200 dark:border-gray-700 mt-3">
                                            <button
                                                 className="btn btn-ghost btn-xs sm:btn-sm text-blue-500" 
                                                 onClick={() => navigate(`/task/${task.id}`)}
                                            >
                                                <Eye className="h-4 w-4" /> View
                                            </button>
                                           
                                            <button
                                                 className="btn btn-ghost btn-xs sm:btn-sm text-yellow-600"
                                                 onClick={() => navigate(`/update/${task.id}`)} 
                                            >
                                                <Edit2 className="h-4 w-4" /> Edit
                                            </button>
                                            <button
                                                 className="btn btn-error btn-xs sm:btn-sm text-white"
                                                 onClick={() => openDeleteModal(task.id, task.title)}
                                            >
                                                <Trash2 className="h-4 w-4" /> Delete
                                            </button>
                                            <button
                                                 className="btn btn-primary btn-xs sm:btn-sm text-white"
                                                 onClick={() => toast.info(`Navigating to view bids for: ${task.title}`)}
                                            >
                                                Bids ({task.bidsCount || 0})
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="hidden md:block card bg-base-100 shadow-xl overflow-hidden dark:bg-gray-800 dark:text-white">
                            <div className="overflow-x-auto">
                                <table className="table w-full text-base dark:text-white">
                                    <thead>
                                        <tr className='dark:bg-gray-700 dark:text-white'>
                                            <th className='text-base'>Category</th>
                                            <th className='text-base'>Title</th>
                                            <th className='text-base'>Budget</th>
                                            <th className='text-base'>Deadline</th>
                                            <th className='text-base'>Bids</th>
                                            <th className='text-right text-base'>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {myTasks.map((task) => (
                                            <tr key={task.id} className="hover:bg-base-200 dark:hover:bg-gray-700/50">
                                                <td>
                                               <span className={`badge p-3 text-white font-bold text-xs ${categoryColors[task.category] || "badge-neutral"} `}>
                                                    {task.category}
                                                        </span>
                                                             </td>
                                                <td className="font-medium max-w-[200px] whitespace-nowrap overflow-hidden text-ellipsis">
                                               <span className="truncate block max-w-full" title={task.title}>
                                                                 {task.title}
                                                       </span>
                                                    </td>
                                                <td><DollarSign className="h-4 w-4 inline mr-1 text-green-500" />{task.budget}</td>
                                                <td className='whitespace-nowrap'>{format(new Date(task.deadline), "MMM dd, yyyy")}</td>
                                                <td>
                                                    <div className="flex items-center gap-1">
                                                        <Users className="h-4 w-4 text-blue-500" />
                                                        {task.bidsCount || 0}
                                                    </div>
                                                </td>
                                                <td className="text-right">
                                                    <div className="flex items-center justify-end gap-2 text-black dark:text-white">
                                                        
                                                        <button
                                                             className="btn btn-ghost btn-sm text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                                                             onClick={() => navigate(`/task/${task.id}`)}
                                                        >
                                                             <Eye className="h-4 w-4" />
                                                        </button>
                                                       
                                                        <button
                                                             className="btn btn-ghost btn-sm text-yellow-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                                                             onClick={() => navigate(`/update/${task.id}`)} 
                                                        >
                                                             <Edit2 className="h-4 w-4" />
                                                        </button>
                                                        <button
                                                             className="btn btn-ghost btn-sm text-error hover:bg-gray-100 dark:hover:bg-gray-700"
                                                             onClick={() => openDeleteModal(task.id, task.title)}
                                                        >
                                                             <Trash2 className="h-4 w-4" />
                                                        </button>
                                                        <button
                                                             className="btn btn-secondary btn-sm"
                                                             onClick={() => toast.info(`Navigating to view bids for: ${task.title}`)}
                                                        >
                                                             Bids ({task.bidsCount || 0})
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
                     <div className="modal-box dark:text-white dark:bg-gray-900 border border-red-500/50">
                          <h3 className="font-bold text-lg text-error">Confirm Deletion</h3>
                          <p className="py-4 dark:text-gray-300">
                              Are you sure you want to delete <span className='font-bold text-lg'>{taskToDelete?.title}</span>? This action cannot be undone.
                          </p>
                          <div className="modal-action">
                              <button className="btn dark:bg-gray-700 dark:text-white" onClick={() => setDeleteModalOpen(false)}>
                                  Cancel
                              </button>
                              <button className="btn btn-error text-white" onClick={handleDelete} disabled={isFetching}>
                                  {isFetching ? <span className="loading loading-spinner"></span> : 'Delete'}
                              </button>
                          </div>
                     </div>
                     <form method="dialog" className="modal-backdrop">
                          <button onClick={() => setDeleteModalOpen(false)}>close</button>
                     </form>
                   </dialog>
            </div>
        </Layout>
    );
};

export default MyPostedTasks;