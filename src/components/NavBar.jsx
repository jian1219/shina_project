import { motion } from "framer-motion";
import { Home, Navigation, Zap, BookOpen, User } from "lucide-react";

export default function NavBar({ page, setPage, darkMode }) {
  return (
    <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-md backdrop-blur-xl border shadow-2xl rounded-[2rem] p-2 flex justify-around items-center z-50 transition-colors ${darkMode ? "bg-slate-900/90 border-slate-700" : "bg-white/80 border-white/20"}`}>
      <button onClick={() => setPage("home")} className={`p-3 rounded-xl ${page === "home" ? "text-blue-500" : "text-gray-400"}`}>
        <Home size={22} fill={page === "home" ? "currentColor" : "none"} />
      </button>
      <button onClick={() => setPage("destinations")} className={`p-3 rounded-xl ${page === "destinations" ? "text-blue-500" : "text-gray-400"}`}>
        <Navigation size={22} fill={page === "destinations" ? "currentColor" : "none"} />
      </button>
      <motion.button whileTap={{ scale: 0.9 }} onClick={() => setPage("trending")} className="relative -mt-12">
        <div className={`p-4 rounded-full shadow-xl ${page === "trending" ? "bg-blue-600 text-white" : "bg-gradient-to-tr from-blue-500 to-indigo-600 text-white"}`}>
          <Zap size={28} fill="white" />
        </div>
      </motion.button>
      <button onClick={() => setPage("bookings")} className={`p-3 rounded-xl ${page === "bookings" ? "text-blue-500" : "text-gray-400"}`}>
        <BookOpen size={22} fill={page === "bookings" ? "currentColor" : "none"} />
      </button>
      <button onClick={() => setPage("profile")} className={`p-3 rounded-xl ${page === "profile" ? "text-blue-600" : "text-gray-400"}`}>
        <User size={22} fill={page === "profile" ? "currentColor" : "none"} />
      </button>
    </div>
  );
}