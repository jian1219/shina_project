import { motion } from "framer-motion";
import { ThumbsUp, MessageCircle, MoreHorizontal, User } from "lucide-react";
import NavBar from "../components/NavBar";
import { trendSpotData } from "../data/projectData";

// If your file is named destinations.js
import { trendSpotData } from "../data/destinations"; 

// OR if you named it projectData.js
import { trendSpotData } from "../data/projectData";

export default function Trending({ setPage, darkMode }) {
  return (
    <div className={`min-h-screen pb-32 ${darkMode ? "bg-slate-950 text-white" : "bg-gray-50"}`}>
      <div className="p-6">
        <h1 className="text-2xl font-black mb-6">Trending Now</h1>
        
        <div className="space-y-8">
          {trendSpotData.map((post) => (
            <div key={post.id} className="space-y-4">
              {/* Post Header */}
              <div className="flex justify-between items-center px-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-400 to-indigo-500" />
                  <div>
                    <p className="font-bold text-sm">@shina_travels</p>
                    <p className="text-gray-400 text-xs">{post.location}</p>
                  </div>
                </div>
                <MoreHorizontal size={20} className="text-gray-400" />
              </div>

              {/* Post Image */}
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-lg">
                <img src={post.image} className="w-full aspect-square object-cover" />
              </div>

              {/* Interaction Buttons */}
              <div className="flex gap-6 px-4">
                <button className="flex items-center gap-2 font-medium">
                  <ThumbsUp size={22} /> {post.likes}
                </button>
                <button className="flex items-center gap-2 font-medium">
                  <MessageCircle size={22} /> 12
                </button>
              </div>

              <div className="px-4">
                <p className="text-sm leading-relaxed">
                  <span className="font-bold mr-2">shina_travels</span>
                  {post.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <NavBar page="trending" setPage={setPage} darkMode={darkMode} />
    </div>
  );
}