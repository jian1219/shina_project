import { Trash2, Calendar, MapPin } from "lucide-react";
import NavBar from "../components/NavBar";

export default function Bookings({ setPage, bookings, deleteBooking, darkMode }) {
  return (
    <div className={`min-h-screen pb-32 ${darkMode ? "bg-slate-950 text-white" : "bg-gray-50"}`}>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-2">My Bookings</h1>
        <p className="text-gray-500 mb-6">You have {bookings.length} upcoming trips</p>

        <div className="space-y-4">
          {bookings.length === 0 ? (
            <div className="text-center py-20 text-gray-400">No bookings yet.</div>
          ) : (
            bookings.map((b) => (
              <div key={b.bookingId} className={`p-4 rounded-2xl flex gap-4 border ${darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-gray-100 shadow-sm"}`}>
                <img src={b.image} className="w-20 h-20 rounded-xl object-cover" />
                <div className="flex-1">
                  <h4 className="font-bold">{b.name}</h4>
                  <div className="flex items-center gap-1 text-gray-400 text-xs mt-1">
                    <MapPin size={10} /> {b.location}
                  </div>
                </div>
                <button onClick={() => deleteBooking(b.bookingId)} className="text-red-400 p-2">
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
      <NavBar page="bookings" setPage={setPage} darkMode={darkMode} />
    </div>
  );
}