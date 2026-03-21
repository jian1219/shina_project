import { useState, useEffect } from "react";
import { MapPin, Search, Star, ArrowLeft, Heart, Navigation, User, Home, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

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
    coordinates: [9.130966158730411, 125.53983102062428],
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
  const [newRating, setNewRating] = useState(5); // Default to 5 stars
  const [fullScreenImage, setFullScreenImage] = useState(null);


// Update your useEffect to filter comments based on the selected destination
useEffect(() => {
  const savedComments = JSON.parse(localStorage.getItem("all_comments")) || [];
  setComments(savedComments);
}, [selectedDestination]);

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
  
  const handleAddReview = () => {
    if (!newComment.trim()) return alert("Please write a comment");

    const reviewObj = {
      id: Date.now(),
      destinationId: selectedDestination.id,
      userName: user?.name || "Anonymous",
      rating: newRating,
      text: newComment,
      date: new Date().toLocaleDateString(),
    };

    const updatedComments = [...comments, reviewObj];
    setComments(updatedComments);
    localStorage.setItem("all_comments", JSON.stringify(updatedComments));
    
    setNewComment(""); // Clear input
    setNewRating(5);   // Reset rating
  };
  

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

  // 1. Define animation variants for the list container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // This makes items appear one after another
      },
    },
  };

  // 2. Define animation variants for individual items
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  const [darkMode, setDarkMode] = useState(false);

  // Load preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") setDarkMode(true);
  }, []);

  // Update localStorage and document class when darkMode changes
  useEffect(() => {
    if (darkMode) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-slate-900">

      

      {/* FULL SCREEN GALLERY MODAL */}
      <AnimatePresence>
        {fullScreenImage && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-4"
          >
            <button onClick={() => setFullScreenImage(null)} className="absolute top-8 left-8 p-4 bg-white/10 rounded-2xl text-white"><ArrowLeft size={24} /></button>
            <motion.img layoutId="activeImage" src={fullScreenImage} className="max-w-full max-h-[80vh] rounded-xl object-contain" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* LOGIN PAGE */}
      {page === "login" && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="relative h-screen flex flex-col justify-center p-8 overflow-hidden"
        >
          {/* Animated Background Image */}
          <motion.div 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1, x: [-10, 10, -10] }} // Subtle panning and zooming
            transition={{ 
              scale: { duration: 10, ease: "easeOut" }, 
              x: { duration: 20, repeat: Infinity, ease: "linear" } 
            }}
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Dark overlay to make the login card pop */}
            <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
          </motion.div>

          {/* Login Card */}
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
            className="relative z-10 bg-white/95 backdrop-blur-md p-8 rounded-[2.5rem] shadow-2xl border border-white/20"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Welcome.</h1>
              <p className="text-gray-500 mb-8">Sign in to start your adventure.</p>
            </motion.div>

            <div className="space-y-4">
              <motion.input
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                type="text"
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-gray-100/50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all outline-none"
              />
              
              <motion.input
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-gray-100/50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all outline-none"
              />

              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLogin}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 rounded-2xl shadow-xl shadow-blue-500/30 transition-all mt-4"
              >
                Let's Go
              </motion.button>
            </div>
          </motion.div>

          {/* Subtle bottom footer text */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 1 }}
            className="relative z-10 text-center mt-8 text-white text-sm font-medium"
          >
            Explore the world with us
          </motion.p>
        </motion.div>
      )}

      {/* HOME PAGE */}
      <AnimatePresence mode="wait">
        {page === "home" && (
          <motion.div 
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
           
            className="relative h-screen w-full overflow-hidden"
          >
            {/* Background Image with subtle zoom scale animation */}
            <motion.img
              initial={{ scale: 1.2 }}
              animate={{ scale: 1.05 }}
              transition={{ duration: 10, ease: "easeOut" }}
              src="https://images.unsplash.com/photo-1501785888041-af3ef285b470"
              className="absolute w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 text-white">
              {/* Title sliding up */}
              <motion.h1 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-4xl font-bold leading-tight"
              >
                Hello, <br/>{user?.name}!
              </motion.h1>

              {/* Subtitle sliding up slightly later */}
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-gray-200 mt-4 text-lg"
              >
                Where do you want to go today?
              </motion.p>

              {/* Interactive Button */}
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                onClick={() => setPage("destinations")} 
                className="mt-8 bg-blue-500 hover:bg-blue-600 text-white py-4 px-8 rounded-2xl font-bold text-center transition-all shadow-lg"
              >
                Explore Destinations
              </motion.button>
              
              <div className="h-20" /> 
            </div>
            <NavBar />
          </motion.div>
        )}
      </AnimatePresence>

      {/* DESTINATIONS LIST PAGE */}
      {page === "destinations" && (
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="p-6 pb-24"
        >
          {/* Header */}
          <motion.header variants={itemVariants} className="flex justify-between items-center mb-6">
            <div>
              <p className="text-gray-500 text-sm">Discover</p>
              <h1 className="text-2xl font-bold">New Places</h1>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
              {user?.name[0]}
            </div>
          </motion.header>

          {/* Search Bar */}
          <motion.div variants={itemVariants} className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search paradise..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border-none shadow-sm p-4 pl-12 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </motion.div>

          {/* Categories */}
          <motion.div variants={itemVariants} className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
            {["All", "Beach", "Mountain", "City"].map((cat) => (
              <motion.button 
                whileTap={{ scale: 0.9 }}
                key={cat} 
                className={`px-6 py-2 rounded-full whitespace-nowrap ${cat === 'All' ? 'bg-blue-600 text-white' : 'bg-white text-gray-500'}`}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>

          {/* Destinations List */}
          <div className="space-y-6">
            {filtered.map((d) => (
              <motion.div 
                key={d.id} 
                variants={itemVariants} // Each card will now slide up in sequence
                whileHover={{ y: -5 }} // Subtle lift on hover
                whileTap={{ scale: 0.98 }}
                onClick={() => { setSelectedDestination(d); setPage("details"); }}
                className="relative group rounded-[2rem] overflow-hidden shadow-xl cursor-pointer"
              >
                <img src={d.images[0]} className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                
                <motion.button 
                  whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.4)" }}
                  className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white"
                >
                  <Heart size={20} />
                </motion.button>

                <div className="absolute bottom-6 left-6 text-white">
                  <div className="flex items-center gap-1 text-xs mb-1 opacity-80">
                    <MapPin size={12} /> {d.location}
                  </div>
                  <h2 className="text-xl font-bold">{d.name}</h2>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="bg-blue-500 px-2 py-1 rounded-lg text-xs font-bold italic">Top Choice</span>
                    <span className="flex items-center gap-1 text-sm">
                      <Star size={14} className="fill-yellow-400 text-yellow-400" /> {d.rating}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <NavBar />
        </motion.div>
      )}

      {/* DETAILS PAGE */}
      {page === "details" && selectedDestination && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="bg-white min-h-screen"
        >
          {/* Animated Header Image */}
          <div className="relative h-[40vh] overflow-hidden cursor-pointer" onClick={() => setFullScreenImage(selectedDestination.images[0])}>
            <motion.img 
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8 }}
              src={selectedDestination.images[0]} 
              className="w-full h-full object-cover" 
              alt="Main" 
            />
            <motion.button 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              onClick={(e) => { e.stopPropagation(); setPage("destinations"); }} 
              className="absolute top-6 left-6 p-3 bg-black/20 backdrop-blur-md rounded-xl text-white"
            >
              <ArrowLeft size={24} />
            </motion.button>
          </div>

          {/* Content Card - Slides up from the bottom */}
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", damping: 25 }}
            className="-mt-10 relative bg-white rounded-t-[2.5rem] p-8 shadow-2xl"
          >
            <div className="flex justify-between items-start mb-6">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <h1 className="text-3xl font-bold">{selectedDestination.name}</h1>
                <p className="text-gray-500 flex items-center gap-1 mt-1">
                  <MapPin size={16} className="text-blue-500" /> {selectedDestination.location}
                </p>
              </motion.div>
              <motion.div 
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-right"
              >
                <p className="text-2xl font-bold text-blue-600">{selectedDestination.price}</p>
                <p className="text-xs text-gray-400">per person</p>
              </motion.div>
            </div>

            {/* GALLERY GRID with Staggered Animation */}
            <h3 className="font-bold text-sm uppercase text-gray-400 tracking-widest mb-4">Gallery</h3>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-4 gap-3 mb-8"
            >
              {selectedDestination.images.map((img, i) => (
                <motion.div 
                  key={i} 
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFullScreenImage(img)} 
                  className="aspect-square rounded-2xl overflow-hidden shadow-sm cursor-pointer border-2 border-white"
                >
                  <img src={img} className="w-full h-full object-cover" alt="gallery" />
                </motion.div>
              ))}
            </motion.div>

            <motion.h3 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="font-bold text-lg mb-4">Location</motion.h3>
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="h-64 w-full rounded-3xl overflow-hidden shadow-inner border-4 border-gray-50 z-0 relative"
            >
              <MapContainer 
                center={selectedDestination.coordinates} 
                zoom={13} 
                scrollWheelZoom={false} 
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={selectedDestination.coordinates}>
                  <Popup><span className="font-bold">{selectedDestination.name}</span></Popup>
                </Marker>
              </MapContainer>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
              <h3 className="font-bold text-lg mt-8 mb-2">Overview</h3>
              <p className="text-gray-500 leading-relaxed mb-8">{selectedDestination.description}</p>
            </motion.div>

            {/* REVIEW SECTION */}
            <div className="border-t pt-8">
              <h3 className="font-bold text-xl mb-4">Reviews</h3>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-6 rounded-3xl mb-8"
              >
                <div className="flex gap-2 mb-4">
                  {[1,2,3,4,5].map(s => <Star key={s} size={24} onClick={() => setNewRating(s)} className={`cursor-pointer transition-colors ${s <= newRating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />)}
                </div>
                <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Write a review..." className="w-full p-4 rounded-xl border-none ring-1 ring-gray-200 outline-none h-20 text-sm mb-4" />
                <button onClick={handleAddReview} className="bg-slate-900 text-white px-6 py-2 rounded-xl text-sm font-bold active:scale-95 transition-transform">Post Review</button>
              </motion.div>

              <div className="space-y-6">
                {comments.filter(c => c.destinationId === selectedDestination.id).reverse().map((review, idx) => (
                  <motion.div 
                    key={review.id} 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="border-b border-gray-100 pb-4"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-sm">{review.userName}</span>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => <Star key={i} size={10} className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"} />)}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">{review.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => addBooking(selectedDestination)} 
              className="w-full bg-blue-600 text-white py-5 rounded-3xl font-bold mt-8 shadow-xl shadow-blue-100 transition-all"
            >
              Book Trip Now
            </motion.button>
          </motion.div>
        </motion.div>
      )}
 
      {/* OTHER PAGES (Bookings/Profile) can follow similar card-based styling */}
      {page === "bookings" && (
        <motion.div 
          key="bookings"
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, x: -20 }}
          variants={containerVariants}
          className="p-8 pb-32" // Added extra bottom padding so the last card isn't hidden by NavBar
        >
        <motion.h1 
          variants={itemVariants} 
          className="text-2xl font-bold mb-6"
        >
         My Bookings
        </motion.h1>

        {bookings.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center py-20 text-gray-400"
          >
            <div className="text-4xl mb-4">✈️</div>
            No trips planned yet.
          </motion.div>
        ) : (
          <div className="space-y-4">
            {bookings.map((b, i) => (
              <motion.div 
                key={`${b.id}-${i}`} // Using ID + index for a unique key
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex gap-4 bg-white p-4 rounded-3xl shadow-sm border border-gray-100"
              >
                <motion.img 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                  src={b.images[0]} 
                  className="w-24 h-24 rounded-2xl object-cover" 
                />
                <div className="flex flex-col justify-center">
                  <h3 className="font-bold text-slate-800">{b.name}</h3>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <MapPin size={12} /> {b.location}
                  </p>
                  <motion.span 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 + 0.4 }}
                    className="text-[10px] uppercase tracking-wider bg-green-100 text-green-700 px-2 py-1 rounded-lg mt-2 font-bold inline-block w-fit"
                  >
                    Confirmed
                  </motion.span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
          <NavBar />
        </motion.div>
      )}

      {/* PROFILE PAGE */}
      {page === "profile" && (
        <motion.div 
          key="profile"
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, y: 20 }}
          variants={containerVariants}
          className="min-h-screen bg-gray-50 pb-28"
        >
          {/* Header Backdrop - Slides down from top */}
          <motion.div 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", damping: 20 }}
            className="h-40 bg-blue-600 rounded-b-[3rem] shadow-lg relative"
          >
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
              {/* Profile Pic - Pops out with a bounce */}
              <motion.div 
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="w-24 h-24 rounded-3xl bg-white p-1 shadow-xl"
              >
                <div className="w-full h-full rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold">
                  {user?.name[0]}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* User Info - Fades and slides up */}
          <motion.div 
            variants={itemVariants}
            className="mt-16 text-center px-6"
          >
            <h1 className="text-2xl font-bold text-slate-900">{user?.name}</h1>
            <p className="text-gray-500 text-sm">{user?.email}</p>
            
            {/* Travel Stats Cards - Staggered entrance */}
            <div className="flex justify-between gap-4 mt-8">
              {[
                { label: "Trips", value: bookings.length },
                { label: "Reviews", value: 12 },
                { label: "Badges", value: 3 }
              ].map((stat, i) => (
                <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + (i * 0.1) }}
                  whileHover={{ y: -5 }}
                  className="flex-1 bg-white p-4 rounded-2xl shadow-sm border border-gray-100"
                >
                  <p className="text-xl font-bold text-blue-600">{stat.value}</p>
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Settings & Preferences */}
          <div className="px-6 mt-8 space-y-6">
            <motion.div variants={itemVariants}>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Account</h3>
              <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
                <motion.button whileTap={{ backgroundColor: "#f9fafb" }} className="w-full flex items-center justify-between p-4 border-b border-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><User size={18} /></div>
                    <span className="font-medium text-slate-700">Personal Information</span>
                  </div>
                  <span className="text-gray-300">→</span>
                </motion.button>
                
                <motion.button 
                  whileTap={{ backgroundColor: "#f9fafb" }}
                  onClick={() => setPage("bookings")} 
                  className="w-full flex items-center justify-between p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><BookOpen size={18} /></div>
                    <span className="font-medium text-slate-700">My Bookings</span>
                  </div>
                  <span className="text-gray-300">→</span>
                </motion.button>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Preferences</h3>
              <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-700 font-medium">Dark Mode</span>
                  {/* Simple toggle animation */}
                  <div className="w-10 h-5 bg-gray-200 rounded-full relative cursor-pointer">
                    <motion.div 
                      layout 
                      className="absolute left-1 top-1 bg-white w-3 h-3 rounded-full shadow-sm" 
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-700 font-medium">Notifications</span>
                  <div className="w-10 h-5 bg-blue-500 rounded-full relative">
                    <motion.div 
                      layout 
                      className="absolute right-1 top-1 bg-white w-3 h-3 rounded-full shadow-sm" 
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.button 
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={logout}
              className="w-full bg-red-50 text-red-500 font-bold py-4 rounded-2xl transition-colors"
            >
              Log Out
            </motion.button>
          </div>
          
          <NavBar />
        </motion.div>
      )}

    </div>
  );
}