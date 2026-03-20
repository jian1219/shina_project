import { useState, useEffect } from "react";
import { MapPin, Search, Star, ArrowLeft, Heart, Navigation, User, Home, BookOpen } from "lucide-react";

import img1 from './img/inn1.png';
import inn2 from './img/inn2.png';
import inn3 from './img/inn3.png';
import img11 from './img/img11.jpg';
import img12 from './img/img12.jpg';
import img31 from './img/img31.jpg';
import img32 from './img/img32.png';


const destinationsData = [
  {
    id: 1,
    name: "Hidden Nav's Inn",
    location: "Cabadbaran, Agusan del Norte",
    rating: 4.9,
    price: "₱2,500",
    description: "The nice place to sleep",
    images: [
      img1,
      inn2,
      inn3
    ]
  },
  {
    id: 2,
    name: "The Puting Bato",
    location: "Cabadbaran, Agusan del Norte",
    rating: 4.8,
    price: "₱200",
    description: "The area is home to natural water features, including the Tumipi Cold Spring, which is often visited along with the view deck.",
    images: [
      img11,
      img12
    ]
  },
  {
    id: 3,
    name: "Tagnote Falls",
    location: "RTR Agusan del Norte",
    rating: 4.7,
    price: "₱100",
    description: "Famous for its powdery white sand and vibrant sunset sailing. Experience the best nightlife and water sports in the country.",
    images: [
      img32,
      img31
    ]
  },
];

export default function App() {
  const [page, setPage] = useState("login");
  const [search, setSearch] = useState("");
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ name: "", email: "" });
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const savedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const savedUser = JSON.parse(localStorage.getItem("user"));
    const savedComments = JSON.parse(localStorage.getItem("comments")) || [];

    setBookings(savedBookings);
    setComments(savedComments);
    if (savedUser) {
      setUser(savedUser);
      setPage("home");
    }
  }, []);

  const handleLogin = () => {
    if (!form.name || !form.email) return alert("Fill all fields");
    localStorage.setItem("user", JSON.stringify(form));
    setUser(form);
    setPage("home");
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setPage("login");
  };

  const addBooking = (destination) => {
    const updated = [...bookings, destination];
    setBookings(updated);
    localStorage.setItem("bookings", JSON.stringify(updated));
    alert("Trip Scheduled! ✈️");
  };

  const filtered = destinationsData.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  // --- REUSABLE NAVBAR COMPONENT ---
  const NavBar = () => (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-white/80 backdrop-blur-lg border border-white/20 shadow-2xl rounded-2xl p-4 flex justify-around items-center z-50">
      <button onClick={() => setPage("home")} className={page === "home" ? "text-blue-600" : "text-gray-400"}>
        <Home size={24} />
      </button>
      <button onClick={() => setPage("destinations")} className={page === "destinations" || page === "details" ? "text-blue-600" : "text-gray-400"}>
        <Navigation size={24} />
      </button>
      <button onClick={() => setPage("bookings")} className={page === "bookings" ? "text-blue-600" : "text-gray-400"}>
        <BookOpen size={24} />
      </button>
      <button onClick={() => setPage("profile")} className={page === "profile" ? "text-blue-600" : "text-gray-400"}>
        <User size={24} />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-slate-900">

      {/* LOGIN PAGE */}
      {page === "login" && (
        <div className="h-screen flex flex-col justify-center p-8 bg-gradient-to-br from-blue-50 to-white">
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Welcome.</h1>
            <p className="text-gray-500 mb-8">Sign in to start your adventure.</p>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-gray-50 border-none p-4 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-gray-50 border-none p-4 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <button
                onClick={handleLogin}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-95"
              >
                Let's Go
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HOME PAGE */}
      {page === "home" && (
        <div className="relative h-screen w-full overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1501785888041-af3ef285b470"
            className="absolute w-full h-full object-cover scale-110 animate-pulse-slow"
            style={{ animationDuration: '20s' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 text-white">
            <h1 className="text-4xl font-bold leading-tight">Hello, <br/>{user?.name}!</h1>
            <p className="text-gray-200 mt-4 text-lg">Where do you want to go today?</p>
            <button 
              onClick={() => setPage("destinations")} 
              className="mt-8 bg-blue-500 hover:bg-blue-600 text-white py-4 px-8 rounded-2xl font-bold text-center transition-all"
            >
              Explore Destinations
            </button>
            <div className="h-20" /> {/* Spacer for NavBar */}
          </div>
          <NavBar />
        </div>
      )}

      {/* DESTINATIONS LIST PAGE */}
      {page === "destinations" && (
        <div className="p-6">
          <header className="flex justify-between items-center mb-6">
            <div>
              <p className="text-gray-500 text-sm">Discover</p>
              <h1 className="text-2xl font-bold">New Places</h1>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
              {user?.name[0]}
            </div>
          </header>

          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search paradise..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border-none shadow-sm p-4 pl-12 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
            {["All", "Beach", "Mountain", "City"].map((cat) => (
              <button key={cat} className={`px-6 py-2 rounded-full whitespace-nowrap ${cat === 'All' ? 'bg-blue-600 text-white' : 'bg-white text-gray-500'}`}>
                {cat}
              </button>
            ))}
          </div>

          <div className="space-y-6">
            {filtered.map((d) => (
              <div 
                key={d.id} 
                onClick={() => { setSelectedDestination(d); setPage("details"); }}
                className="relative group rounded-[2rem] overflow-hidden shadow-xl cursor-pointer active:scale-95 transition-all"
              >
                <img src={d.images[0]} className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <button className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white">
                  <Heart size={20} />
                </button>
                <div className="absolute bottom-6 left-6 text-white">
                  <div className="flex items-center gap-1 text-xs mb-1 opacity-80">
                    <MapPin size={12} /> {d.location}
                  </div>
                  <h2 className="text-xl font-bold">{d.name}</h2>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="bg-blue-500 px-2 py-1 rounded-lg text-xs font-bold italic">Top Choice</span>
                    <span className="flex items-center gap-1 text-sm"><Star size={14} className="fill-yellow-400 text-yellow-400" /> {d.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <NavBar />
        </div>
      )}

      {/* DETAILS PAGE */}
      {page === "details" && selectedDestination && (
        <div className="animate-in slide-in-from-right duration-300">
          <div className="relative h-[45vh]">
            <img src={selectedDestination.images[0]} className="w-full h-full object-cover" />
            <div className="absolute top-6 left-6 right-6 flex justify-between">
              <button onClick={() => setPage("destinations")} className="p-3 bg-white/20 backdrop-blur-md rounded-xl text-white">
                <ArrowLeft size={24} />
              </button>
              <button className="p-3 bg-white/20 backdrop-blur-md rounded-xl text-white">
                <Heart size={24} />
              </button>
            </div>
          </div>
          
          <div className="-mt-12 relative bg-white rounded-t-[3rem] p-8 min-h-[60vh] shadow-2xl">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-bold">{selectedDestination.name}</h1>
                <div className="flex items-center text-gray-500 gap-1 mt-1">
                  <MapPin size={16} className="text-blue-500" />
                  {selectedDestination.location}
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-600">{selectedDestination.price}</p>
                <p className="text-xs text-gray-400">per person</p>
              </div>
            </div>

            <div className="flex gap-4 mb-8">
               {selectedDestination.images.slice(1).map((img, i) => (
                 <img key={i} src={img} className="w-20 h-20 rounded-2xl object-cover border-2 border-white shadow-md" />
               ))}
               <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 font-bold text-xs">
                 +5 Photos
               </div>
            </div>

            <h3 className="font-bold text-lg mb-2">Overview</h3>
            <p className="text-gray-500 leading-relaxed mb-8">
              {selectedDestination.description}
            </p>

            <button 
              onClick={() => addBooking(selectedDestination)}
              className="w-full bg-blue-600 text-white py-5 rounded-3xl font-bold text-lg shadow-xl shadow-blue-200 active:scale-95 transition-all"
            >
              Book Trip Now
            </button>
          </div>
        </div>
      )}

      {/* OTHER PAGES (Bookings/Profile) can follow similar card-based styling */}
      {page === "bookings" && (
        <div className="p-8">
           <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
           {bookings.length === 0 ? (
             <div className="text-center py-20 text-gray-400">No trips planned yet.</div>
           ) : (
             bookings.map((b, i) => (
               <div key={i} className="flex gap-4 bg-white p-4 rounded-3xl shadow-sm mb-4">
                 <img src={b.images[0]} className="w-24 h-24 rounded-2xl object-cover" />
                 <div>
                    <h3 className="font-bold">{b.name}</h3>
                    <p className="text-sm text-gray-500">{b.location}</p>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-md mt-2 inline-block">Confirmed</span>
                 </div>
               </div>
             ))
           )}
           <NavBar />
        </div>
      )}
      {/* PROFILE PAGE */}
      {page === "profile" && (
        <div className="min-h-screen bg-gray-50 pb-28">
          {/* Header Backdrop */}
          <div className="h-40 bg-blue-600 rounded-b-[3rem] shadow-lg relative">
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
              <div className="w-24 h-24 rounded-3xl bg-white p-1 shadow-xl">
                <div className="w-full h-full rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold">
                  {user?.name[0]}
                </div>
              </div>
            </div>
          </div>

          {/* User Info */}
          <div className="mt-16 text-center px-6">
            <h1 className="text-2xl font-bold text-slate-900">{user?.name}</h1>
            <p className="text-gray-500 text-sm">{user?.email}</p>
            
            {/* Travel Stats Cards */}
            <div className="flex justify-between gap-4 mt-8">
              <div className="flex-1 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                <p className="text-xl font-bold text-blue-600">{bookings.length}</p>
                <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Trips</p>
              </div>
              <div className="flex-1 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                <p className="text-xl font-bold text-blue-600">12</p>
                <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Reviews</p>
              </div>
              <div className="flex-1 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                <p className="text-xl font-bold text-blue-600">3</p>
                <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Badges</p>
              </div>
            </div>
          </div>

          {/* Settings & Preferences */}
          <div className="px-6 mt-8 space-y-6">
            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Account</h3>
              <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
                <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><User size={18} /></div>
                    <span className="font-medium text-slate-700">Personal Information</span>
                  </div>
                  <span className="text-gray-300">→</span>
                </button>
                <button onClick={() => setPage("bookings")} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><BookOpen size={18} /></div>
                    <span className="font-medium text-slate-700">My Bookings</span>
                  </div>
                  <span className="text-gray-300">→</span>
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Preferences</h3>
              <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-700 font-medium">Dark Mode</span>
                  <div className="w-10 h-5 bg-gray-200 rounded-full relative">
                    <div className="absolute left-1 top-1 bg-white w-3 h-3 rounded-full shadow-sm" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-700 font-medium">Notifications</span>
                  <div className="w-10 h-5 bg-blue-500 rounded-full relative">
                    <div className="absolute right-1 top-1 bg-white w-3 h-3 rounded-full shadow-sm" />
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={logout}
              className="w-full bg-red-50 text-red-500 font-bold py-4 rounded-2xl hover:bg-red-100 transition-colors"
            >
              Log Out
            </button>
          </div>
          <NavBar />
        </div>
      )}

    </div>
  );
}