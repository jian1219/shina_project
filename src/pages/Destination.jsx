import { useState } from "react";
import { Search, MapPin, Star } from "lucide-react";
import { destinationsData } from "../data/projectData";
import NavBar from "../components/NavBar";



export default function Destinations({ setPage, setSelectedDestination, darkMode }) {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  const filtered = destinationsData.filter(d => 
    (activeTab === "All" || d.category === activeTab) &&
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`min-h-screen pb-32 ${darkMode ? "bg-slate-950 text-white" : "bg-gray-50"}`}>
      <div className="p-6 sticky top-0 z-40 backdrop-blur-md">
        <h1 className="text-2xl font-bold mb-4">Destinations</h1>
        <div className={`flex items-center gap-3 p-3 rounded-xl border ${darkMode ? "bg-slate-900 border-slate-700" : "bg-white border-gray-200"}`}>
          <Search size={18} className="text-gray-400" />
          <input 
            value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search places..." className="bg-transparent outline-none w-full" 
          />
        </div>
      </div>

      <div className="px-6 grid grid-cols-1 gap-6">
        {filtered.map(item => (
          <div 
            key={item.id} 
            onClick={() => { setSelectedDestination(item); setPage("details"); }}
            className={`p-4 rounded-3xl border transition-all ${darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-gray-100 shadow-sm"}`}
          >
            <img src={item.image} className="w-full h-48 object-cover rounded-2xl mb-4" alt={item.name} />
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg">{item.name}</h3>
                <div className="flex items-center gap-1 text-gray-400 text-sm">
                  <MapPin size={12} /> {item.location}
                </div>
              </div>
              <div className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                <Star size={12} fill="currentColor" /> {item.rating}
              </div>
            </div>
          </div>
        ))}
      </div>

      <NavBar page="destinations" setPage={setPage} darkMode={darkMode} />
    </div>
  );
}