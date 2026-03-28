import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Star, Clock, Info, Heart, Share2 } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function Details({ setPage, selectedDestination, addBooking, darkMode }) {
  if (!selectedDestination) return null;

  return (
    <motion.div 
      initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
      className={`fixed inset-0 z-50 overflow-y-auto ${darkMode ? "bg-slate-950 text-white" : "bg-white text-slate-900"}`}
    >
      {/* Hero Image */}
      <div className="relative h-[45vh]">
        <img src={selectedDestination.image} className="w-full h-full object-cover" alt={selectedDestination.name} />
        <div className="absolute top-6 left-6 right-6 flex justify-between">
          <button onClick={() => setPage("destinations")} className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white">
            <ArrowLeft size={20} />
          </button>
          <div className="flex gap-2">
            <button className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white"><Heart size={20} /></button>
            <button className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white"><Share2 size={20} /></button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 -mt-10 relative bg-inherit rounded-t-[3rem] min-h-screen">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-black mb-2">{selectedDestination.name}</h1>
            <div className="flex items-center gap-2 text-blue-500 font-medium">
              <MapPin size={16} /> {selectedDestination.location}
            </div>
          </div>
          <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded-2xl font-bold flex items-center gap-1">
            <Star size={18} fill="currentColor" /> {selectedDestination.rating}
          </div>
        </div>

        {/* Map Section */}
        <div className="my-8 rounded-3xl overflow-hidden h-48 border border-gray-100 shadow-inner">
          <MapContainer center={selectedDestination.coords} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={selectedDestination.coords}>
              <Popup>{selectedDestination.name}</Popup>
            </Marker>
          </MapContainer>
        </div>

        <p className={`leading-relaxed mb-8 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          {selectedDestination.description}
        </p>

        {/* Action Button */}
        <button 
          onClick={() => addBooking(selectedDestination)}
          className="w-full bg-blue-600 text-white font-bold py-5 rounded-[2rem] shadow-xl shadow-blue-500/40 hover:bg-blue-700 transition-colors"
        >
          Book This Experience
        </button>
      </div>
    </motion.div>
  );
}