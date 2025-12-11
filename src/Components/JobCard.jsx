import React from 'react';
import { Link } from "react-router-dom";
import { Calendar, DollarSign, Users } from "lucide-react";

export const initialTasks = [
  {
    id: "task_1",
    title: "Build a Responsive Landing Page",
    category: "Web Development",
    description: "Looking for a skilled developer to create a modern, responsive landing page for my startup. Must include animations and be mobile-friendly.",
    deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    budget: 650,
    userEmail: "Hossainaftakhil2000@gmail.com",
    userName: "Aftakhil Hossain",
    userId: "user_demo_1",
    createdAt: new Date().toISOString(),
    bidsCount: 12,
  },
  {
    id: "task_2",
    title: "Logo Design for Tech Startup",
    category: "Design",
    description: "Need a creative logo design for a new AI-focused tech startup. Looking for something modern and memorable.",
    deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    budget: 60,
    userEmail: "mahmimmainul@gmail.com",
    userName: "Mainul Mahim",
    userId: "user_demo_2",
    createdAt: new Date().toISOString(),
    bidsCount: 8,
  },
    {
    id: "task_3",
    title: "Write SEO Blog Articles",
    category: "Writing",
    description: "Need 10 SEO-optimized blog articles about digital marketing. Each article should be 1500+ words.",
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    budget: 250,
    userEmail: "Riyadjillu@gmail.com",
    userName: "jillur Rahman",
    userId: "user_demo_3",
    createdAt: new Date().toISOString(),
    bidsCount: 15,
  },
  {
    id: "task_4",
    title: "Social Media Marketing Campaign",
    category: "Marketing",
    description: "Looking for a marketing expert to run a 30-day social media campaign across Instagram and TikTok.",
    deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    budget: 200,
    userEmail: "salauddinmahi@gmail.com",
    userName: "Salauddin Mahi",
    userId: "user_demo_4",
    createdAt: new Date().toISOString(),
    bidsCount: 6,
  },
  {
    id: "task_5",
    title: "Mobile App UI/UX Design",
    category: "Design",
    description: "Need complete UI/UX design for a fitness tracking mobile app. Including wireframes and final designs.",
    deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    budget: 500,
    userEmail: "tasbir1206@gmail.com",
    userName: "Tasbir Ahmed",
    userId: "user_demo_5",
    createdAt: new Date().toISOString(),
    bidsCount: 20,
  },
  {
    id: "task_6",
    title: "Data Entry - Product Catalog",
    category: "Data Entry",
    description: "Need help entering 500 products into our e-commerce platform. Each product has images, descriptions, and prices.",
    deadline: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    budget: 150,
    userEmail: "kabirnabil@gmail.com",
    userName: "Kabir Nabil",
    userId: "user_demo_6",
    createdAt: new Date().toISOString(),
    bidsCount: 25,
  }
];


/**
 * @param {string} dateString
 * @returns {string} 
 */
export const simpleDateFormat = (dateString) => { 
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "N/A";
  const options = { month: 'short', day: '2-digit', year: 'numeric' };
  return date.toLocaleDateString('en-US', options).replace(/,/g, '');
};


export const categoryColors = { 
  "Web Development": "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  "Mobile Development": "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
  "Design": "bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300",
  "Writing": "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  "Marketing": "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
  "Data Entry": "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
  "Video Editing": "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
  "Other": "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
};

export const TASK_CATEGORIES = Array.from(new Set(initialTasks.map(task => task.category))); // <-- EXPORTED

const JobCard = ({ task }) => {
  
  const defaultTask = initialTasks[0] || { 
        id: "default_1",
        title: "Default Task: Setup Node.js API",
        description: "Placeholder task data from local const.",
        category: "Web Development",
        budget: 750,
        deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        bidsCount: 9,
        userName: "Alex brown",
    };
  
  const currentTask = task || defaultTask;

  
  const daysUntilDeadline = Math.ceil(
    (new Date(currentTask.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );


  const categoryClass = categoryColors[currentTask.category] || categoryColors["Other"];
  
 
  const detailButtonClass = "inline-flex items-center justify-center text-sm font-medium h-8 px-3 rounded-md bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl flex flex-col h-full">
      
    
      <div className="flex items-start justify-between mb-3">
       
        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${categoryClass}`}>
          {currentTask.category}
        </span>
        
      
        {daysUntilDeadline <= 3 && daysUntilDeadline > 0 && (
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-red-500 text-white dark:bg-red-700">
            Urgent
          </span>
        )}
      </div>

      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
        {currentTask.title}
      </h3>

    
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 grow">
        {currentTask.description}
      </p>

     
      <div className="space-y-2 mb-4">
        
        {/* Budget */}
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <DollarSign className="h-4 w-4 text-green-500" />
          <span className="font-medium text-gray-800 dark:text-gray-200">${currentTask.budget}</span>
          <span>Budget</span>
        </div>
        
        {/* Deadline */}
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <Calendar className="h-4 w-4 text-blue-500" />
          <span>{simpleDateFormat(currentTask.deadline)}</span>
        </div>
        
        {/* Bids Count */}
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <Users className="h-4 w-4 text-purple-500" />
          <span>{currentTask.bidsCount} bids</span>
          
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700 mt-auto">
        <div className="flex items-center gap-2">
          {/* User Avatar Initial */}
          <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
            <span className="text-xs font-medium text-blue-700 dark:text-blue-300">
              {currentTask.userName.charAt(0).toUpperCase()}
            </span>
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400">{currentTask.userName}</span>
        </div>
        
        {/* See Details Button */}
        <Link to={`/task/${currentTask.id}`} className={detailButtonClass}>
          See Details
        </Link>
      </div>
    </div>
  );
};

export default JobCard;