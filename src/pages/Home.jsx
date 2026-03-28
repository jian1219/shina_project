import { motion } from "framer-motion";
import { Search, MapPin, Star, User } from "lucide-react";
import NavBar from "../components/NavBar";

export default function Home({ setPage, user, darkMode }) {
  return (
    <div className={`min-h-screen pb-32 transition-colors ${darkMode ? "bg-slate-950 text-white" : "bg-gray-50 text-slate-900"}`}>
      {/* Header */}
      <div className="p-6 flex justify-between items-center">
        <div>
          <p className="text-gray-500 text-sm">Welcome back,</p>
          <h2 className="text-2xl font-bold">{user?.name || "Traveler"}</h2>
        </div>
        <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
          <User size={24} />
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-6 mb-8">
        <div className={`flex items-center gap-3 p-4 rounded-2xl border ${darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-gray-100 shadow-sm"}`}>
          <Search size={20} className="text-gray-400" />
          <input type="text" placeholder="Where to next?" className="bg-transparent outline-none w-full" />
        </div>
      </div>

      {/* Quick Category / Featured Section */}
      <div className="px-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg">Recommended</h3>
          <button onClick={() => setPage("destinations")} className="text-blue-600 text-sm font-medium">See All</button>
        </div>
        
        {/* Featured Card Example */}
        <motion.div 
          whileTap={{ scale: 0.98 }}
          onClick={() => setPage("destinations")}
          className="relative h-64 rounded-[2.5rem] overflow-hidden shadow-xl"
        >
          <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb" alt="Featured" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-6 flex flex-col justify-end">
            <h4 className="text-white text-xl font-bold">Explore the Wild</h4>
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <MapPin size={14} /> <span>Agusan del Norte</span>
            </div>
          </div>
        </motion.div>
      </div>

      <NavBar page="home" setPage={setPage} darkMode={darkMode} />
    </div>
  );
}