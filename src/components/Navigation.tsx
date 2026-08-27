import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="bg-zinc-900 border-b border-zinc-800 py-4 px-6 mb-8">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link 
          to="/tasks" 
          className="group flex items-center gap-2 text-2xl font-extrabold text-white tracking-tight"
        >
          <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent group-hover:opacity-80 transition-opacity">
            Task Manager App
          </span>
        </Link>

        <Link
          to="/tasks-create"
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-4 py-2 rounded-lg transition-all duration-200 shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/50 flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Create Task
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;