import { useState, useEffect } from "react";
import { MapPin, Search, Star, ArrowLeft, Heart, Navigation, User, Home, BookOpen, Share2, Wallet, Clock, CloudSun, Calendar, Zap, Info, Trash2, MessageCircle, MoreHorizontal, ThumbsUp, X, Send } from "lucide-react";
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
    // FIX: Match this ID with the destinationId in your trendSpotData
    id: "mabaho-001", 
    name: "Hidden Nav's Inn",
    location: "Cabadbaran, Agusan del Norte",
    rating: 4.9,
    price: "₱2,500",
    coordinates: [9.130966158730411, 125.53983102062428],
    description: "The perfect place to rest after exploring Agusan. Offers cozy rooms and a quiet atmosphere.",
    images: [img1, inn2, inn3],
    
    // NEW FIELDS
    tagline: "Your Home in Cabadbaran",
    duration: "1-2 Days",
    bestTime: "Anytime",
    weather: "28°C Sunny",
    
    activities: [
      { name: "Swimming", icon: "Zap" },
      { name: "Netflix & Chill", icon: "Tv" }, // Updated icon to Tv
      { name: "City Tour", icon: "Map" }
    ],
    
    budgetDetails: {
      accommodation: "₱1,500 - ₱5,000",
      food: "₱800/day",
      activities: "₱500"
    },
    
    nearbyHotels: [
      { name: "Filipinas Heritage", price: "Luxury", rating: 5 },
      { name: "Cabadbaran Pension", price: "Budget", rating: 4.2 }
    ],
    transportation: [
      {
        from: "Cabadbaran City Terminal",
        type: "Tricycle / E-Bike",
        cost: "₱20 - ₱50",
        duration: "10-15 mins",
        instructions: "Tell the driver you are going to Hidden Nav's Inn near the city center."
      },
      {
        from: "Butuan City (Bancasi Airport)",
        type: "Bus / Van",
        cost: "₱100 - ₱150",
        duration: "45-60 mins",
        instructions: "Take a Northbound bus and drop off at Cabadbaran Terminal."
      }
    ],
    category: "City",
  },
  {
    id: "puting-bato", // Changed to string for consistency
    name: "The Puting Bato",
    location: "Cabadbaran, Agusan del Norte",
    rating: 4.8,
    price: "₱200",
    description: "The area is home to natural water features, including the Tumipi Cold Spring and a breathtaking view deck.",
    images: [img11, img12],
    tagline: "Reach the White Peak",
    duration: "1 Day",
    activities: [
      { name: "Hiking", icon: "Zap" },
      { name: "Sightseeing", icon: "Navigation" }
    ]
  },
  {
    id: "tagnote-falls", // Changed to string for consistency
    name: "Tagnote Falls",
    location: "RTR, Agusan del Norte",
    rating: 4.7,
    price: "₱100",
    description: "A hidden gem in RTR. Perfect for a cool dip and family picnics under the canopy of trees.",
    images: [img32, img31],
    tagline: "Nature's Cold Shower",
    duration: "1 Day",
    activities: [
      { name: "Swimming", icon: "Zap" },
      { name: "Picnic", icon: "Map" }
    ]
  }
];

const trendSpotData = [
  {
    id: 1,
    destinationId: "mabaho-001", // This must match an ID in your destinationsData
    author: "Hidden Nav's Inn",
    location: "Cabadbaran City",
    caption: "The nice place to sleep proven and tested HAHAHA",
    image: img1,
    likes: "2.1k",
    comments: 112,
    time: "45m"
  },
  {
    id: 2,
    destinationId: "heritage-002",
    author: "Heritage Agusan",
    location: "Filipinas Heritage, Cabadbaran",
    caption: "Stepping back in time. 🏛️ Cabadbaran's heritage houses are a beautiful reminder of our rich history. #CabadbaranHeritage",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233",
    likes: "945",
    comments: 54,
    time: "3h"
  }
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
  const [selectedCategory, setSelectedCategory] = useState("All");


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
    if (!user) return alert("Please login to book");

    const newBooking = {
      ...destination,
      bookedBy: user.email, // This links the booking to the current user's email
      bookingId: Date.now() // Unique ID for deleting specific entries
    };

    // Get current global bookings, add the new one, and save back to localStorage
    const allBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const updated = [...allBookings, newBooking];
    
    setBookings(updated);
    localStorage.setItem("bookings", JSON.stringify(updated));
    alert(`Trip to ${destination.name} is now in your schedule! ✈️`);
  };

  const deleteBooking = (idToDelete) => {
    // 1. Filter the global list to remove ONLY the selected booking ID
    const updatedBookings = bookings.filter((b) => b.bookingId !== idToDelete);
    
    // 2. Update state and LocalStorage
    setBookings(updatedBookings);
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
  };

  const filtered = destinationsData.filter((d) => {
    const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase()) || 
                          d.location.toLowerCase().includes(search.toLowerCase());
    
    const matchesCategory = selectedCategory === "All" || d.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });
  
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


  const [showReviewModal, setShowReviewModal] = useState(null); // Stores the post ID or object
  

  // --- REUSABLE NAVBAR COMPONENT ---
  const NavBar = () => (
  <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-md backdrop-blur-xl border shadow-2xl rounded-[2rem] p-2 flex justify-around items-center z-50 transition-colors duration-300 ${darkMode ? "bg-slate-900/90 border-slate-700" : "bg-white/80 border-white/20"}`}>
    
    {/* 1. Home */}
    <button 
      onClick={() => setPage("home")} 
      className={`p-3 rounded-xl transition-all ${page === "home" ? "text-blue-500 bg-blue-50/10" : "text-gray-400"}`}
    >
      <Home size={22} fill={page === "home" ? "currentColor" : "none"} />
    </button>

    {/* 2. Destinations */}
    <button 
      onClick={() => setPage("destinations")} 
      className={`p-3 rounded-xl transition-all ${page === "destinations" || page === "details" ? "text-blue-500 bg-blue-50/10" : "text-gray-400"}`}
    >
      <Navigation size={22} fill={(page === "destinations" || page === "details") ? "currentColor" : "none"} />
    </button>

    {/* 3. CENTER: Trend SPOT */}
    <motion.button 
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setPage("trending")} 
      className="relative -mt-12 group"
    >
      <div className={`p-4 rounded-full shadow-xl shadow-blue-500/40 transition-all duration-300 ${page === "trending" ? "bg-blue-600 text-white rotate-12" : "bg-gradient-to-tr from-blue-500 to-indigo-600 text-white"}`}>
        <Zap size={28} fill="white" />
      </div>
      {/* Small label that only shows when active or on hover */}
      <span className={`absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-black tracking-tighter whitespace-nowrap transition-opacity ${page === "trending" ? "opacity-100 text-blue-500" : "opacity-0"}`}>
        TREND SPOT
      </span>
    </motion.button>

    {/* 4. Bookings */}
    <button 
      onClick={() => setPage("bookings")} 
      className={`p-3 rounded-xl transition-all ${page === "bookings" ? "text-blue-500 bg-blue-50/10" : "text-gray-400"}`}
    >
      <BookOpen size={22} fill={page === "bookings" ? "currentColor" : "none"} />
    </button>

    {/* 5. Profile */}
    <button 
      onClick={() => setPage("profile")} 
      className={`p-3 rounded-xl transition-all ${page === "profile" ? "text-blue-600 bg-blue-50/10" : "text-gray-400"}`}
    >
      <User size={22} fill={page === "profile" ? "currentColor" : "none"} />
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
              Welcome to CABADBARAN CITY
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
        exit="hidden"
        variants={containerVariants}
        className={`min-h-screen pb-24 p-6 transition-colors duration-300 ${darkMode ? "bg-slate-900" : "bg-gray-50"}`}
      >
        {/* Header */}
        <motion.header variants={itemVariants} className="flex justify-between items-center mb-6">
          <div>
            <p className="text-gray-500 text-sm">Discover</p>
            <h1 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-slate-900"}`}>New Places</h1>
          </div>
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
            {user?.name?.[0]}
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
            className={`w-full border-none shadow-sm p-4 pl-12 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-colors ${
              darkMode ? "bg-slate-800 text-white placeholder-gray-500" : "bg-white text-slate-900"
            }`}
          />
        </motion.div>

        {/* Categories */}
        <motion.div variants={itemVariants} className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          {["All", "Beach", "Mountain", "City"].map((cat) => (
            <motion.button 
              whileTap={{ scale: 0.9 }}
              key={cat} 
              onClick={() => setSelectedCategory(cat)} // Add this click handler
              className={`px-6 py-2 rounded-full whitespace-nowrap transition-colors font-bold text-sm ${
                selectedCategory === cat 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                  : darkMode 
                    ? 'bg-slate-800 text-gray-400 border border-slate-700' 
                    : 'bg-white text-gray-500 border border-gray-100 shadow-sm'
              }`}
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
              variants={itemVariants}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => { setSelectedDestination(d); setPage("details"); }}
              className="relative group rounded-[2rem] overflow-hidden shadow-xl cursor-pointer"
            >
              <img src={d.images[0]} className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700" alt={d.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
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

    {/* TREND SPOT */}
  {page === "trending" && (
  <motion.div
    key="trending"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className={`min-h-screen pb-32 ${darkMode ? "bg-slate-950 text-white" : "bg-gray-100 text-slate-900"}`}
  >
    {/* Facebook Style Sticky Header */}
    <div className={`sticky top-0 z-40 p-5 border-b backdrop-blur-md ${darkMode ? "bg-slate-900/95 border-slate-800" : "bg-white/95 border-gray-200"}`}>
      <div className="flex flex-col">
        <h1 className="text-2xl font-black tracking-tighter text-blue-600 leading-none">
          Trend<span className={darkMode ? "text-white" : "text-slate-900"}>SPOT</span>
        </h1>
        <p className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.2em] mt-1 italic">Explore Cabadbaran City</p>
      </div>
    </div>

    {/* The Social Feed */}
    <div className="max-w-md mx-auto space-y-3 pt-3 px-2">
      {trendSpotData.map((post) => (
        <motion.div
          key={post.id}
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`rounded-2xl border shadow-sm overflow-hidden ${darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-gray-100"}`}
        >
          {/* Post Header */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-bold text-white shadow-inner">
                {post.author[0]}
              </div>
              <div>
                <h4 className="text-sm font-bold">{post.author}</h4>
                <p className="text-[11px] text-gray-500 flex items-center gap-1">
                  {post.time} • <MapPin size={10} className="text-blue-500" /> {post.location}
                </p>
              </div>
            </div>
            <MoreHorizontal size={20} className="text-gray-400 cursor-pointer" />
          </div>

          {/* Post Image */}
          <div className="aspect-square bg-slate-200 overflow-hidden">
            <img src={post.image} className="w-full h-full object-cover" alt={post.location} />
          </div>

          {/* CAPTION SECTION (Fixed) */}
          <div className="px-4 py-3">
            <p className={`text-sm leading-relaxed ${darkMode ? "text-gray-300" : "text-slate-700"}`}>
              <span className="font-bold mr-2">{post.author}</span>
              {post.caption}
            </p>
          </div>

          {/* ACTION BUTTONS (Destination & Review Modal) */}
          <div className="flex p-2 gap-2 border-t border-gray-100/10">
            {/* 1. Review Button - Opens the Pop-up */}
            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowReviewModal(post)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs ${darkMode ? "bg-slate-800 text-blue-400" : "bg-blue-50 text-blue-600"}`}
            >
              <MessageCircle size={18} /> Review
            </motion.button>

            {/* 2. Destination Button - Navigates to Details */}
            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const target = destinationsData.find(d => d.id === post.destinationId);
                if(target) {
                  setSelectedDestination(target);
                  setPage("details");
                }
              }}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs bg-blue-600 text-white shadow-lg shadow-blue-500/20"
            >
              <Navigation size={18} /> Destination
            </motion.button>
          </div>
        </motion.div>
      ))}
    </div>

    {/* --- REVIEW POP-UP MODAL --- */}
    <AnimatePresence>
      {showReviewModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Overlay background */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowReviewModal(null)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className={`relative w-full max-w-sm rounded-[2rem] shadow-2xl overflow-hidden ${darkMode ? "bg-slate-900 text-white" : "bg-white text-slate-900"}`}
          >
            {/* Modal Header */}
            <div className="p-5 border-b border-gray-100/10 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg">Reviews</h3>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">{showReviewModal.location}</p>
              </div>
              <button 
                onClick={() => setShowReviewModal(null)}
                className={`p-2 rounded-full ${darkMode ? "bg-slate-800" : "bg-gray-100"}`}
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Reviews List */}
            <div className="p-4 max-h-[50vh] overflow-y-auto space-y-4">
              {comments.filter(c => c.destinationId === showReviewModal.destinationId).length > 0 ? (
                comments
                  .filter(c => c.destinationId === showReviewModal.destinationId)
                  .map((comment, i) => (
                    <div key={i} className={`p-4 rounded-2xl ${darkMode ? "bg-slate-800" : "bg-gray-50 border border-gray-100"}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-[10px] text-white font-bold">
                          {comment.userName[0]}
                        </div>
                        <span className="font-bold text-xs text-blue-600">{comment.userName}</span>
                      </div>
                      <p className="text-sm leading-relaxed">{comment.text}</p>
                    </div>
                  ))
              ) : (
                <div className="text-center py-12">
                   <MessageCircle size={48} className="mx-auto text-gray-300 mb-3 opacity-20" />
                   <p className="text-gray-400 text-sm">No reviews for this spot yet.</p>
                </div>
              )}
            </div>

            {/* Input Field Footer */}
            <div className="p-5 border-t border-gray-100/10">
              <div className={`flex items-center gap-2 p-2 rounded-2xl ${darkMode ? "bg-slate-800 border border-slate-700" : "bg-gray-100"}`}>
                <input 
                  type="text" 
                  placeholder="Share your experience..." 
                  className="bg-transparent flex-1 text-sm outline-none px-2 py-1"
                />
                <button className="p-2.5 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-500/30">
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>

    <NavBar />
  </motion.div>
)}

    {/* DETAILS PAGE */}
    {page === "details" && selectedDestination && (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`${darkMode ? "bg-slate-950" : "bg-white"} min-h-screen pb-32 transition-colors duration-300`}
      >
        {/* 1. HERO SECTION (WOW FACTOR) */}
        <div className="relative h-[45vh] overflow-hidden">
          <motion.img 
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2 }}
            src={selectedDestination.images[0]} 
            className="w-full h-full object-cover" 
            alt={selectedDestination.name}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
          
          {/* Top Navigation Buttons */}
          <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10">
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={() => setPage("destinations")} 
              className="p-3 bg-white/10 backdrop-blur-md rounded-2xl text-white border border-white/10"
            >
              <ArrowLeft size={24} />
            </motion.button>
            <div className="flex gap-2">
              <button className="p-3 bg-white/10 backdrop-blur-md rounded-2xl text-white border border-white/10">
                <Share2 size={20} />
              </button>
              <button className="p-3 bg-white/10 backdrop-blur-md rounded-2xl text-white border border-white/10">
                <Heart size={20} />
              </button>
            </div>
          </div>

          {/* Hero Text Content */}
          <div className="absolute bottom-12 left-8 right-8 text-white">
            <motion.span 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }} 
              className="bg-blue-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-[0.2em]"
            >
              {selectedDestination.category}
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.2 }}
              className="text-4xl font-black mt-2 leading-tight"
            >
              {selectedDestination.name}
            </motion.h1>
            <div className="flex items-center gap-4 mt-3 opacity-80 text-sm">
              <span className="flex items-center gap-1"><MapPin size={14} className="text-blue-400" /> {selectedDestination.location}</span>
              <span className="flex items-center gap-1">
                <Star size={14} className="fill-yellow-400 text-yellow-400" /> 
                {selectedDestination.rating} <span className="opacity-60 font-normal">(1.2k Reviews)</span>
              </span>
            </div>
          </div>
        </div>

        {/* 2. MAIN CONTENT CARD */}
        <motion.div 
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`-mt-10 relative rounded-t-[3.5rem] p-8 shadow-2xl transition-colors duration-300 ${
            darkMode ? "bg-slate-900 text-white" : "bg-white text-slate-900"
          }`}
        >
          {/* 3. QUICK INFO GRID */}
          <div className="grid grid-cols-2 gap-3 mb-10">
            {[
              { icon: <Wallet size={20} className="text-green-500" />, label: "Budget", val: selectedDestination.price },
              { icon: <Clock size={20} className="text-orange-500" />, label: "Stay", val: selectedDestination.duration || "3-4 Days" },
              { icon: <CloudSun size={20} className="text-blue-400" />, label: "Weather", val: selectedDestination.weather || "27°C" },
              { icon: <Calendar size={20} className="text-purple-500" />, label: "Best Time", val: selectedDestination.bestTime || "Year round" }
            ].map((item, i) => (
              <div key={i} className={`p-4 rounded-[2.2rem] border transition-all ${
                darkMode ? "bg-slate-800/50 border-slate-700" : "bg-gray-50 border-gray-100"
              } flex items-center gap-3`}>
                <div className={`p-3 rounded-2xl ${darkMode ? "bg-slate-700" : "bg-white shadow-sm"}`}>{item.icon}</div>
                <div>
                  <p className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">{item.label}</p>
                  <p className="text-xs font-bold">{item.val}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 4. MUST-TRY EXPERIENCES (HORIZONTAL SCROLL) */}
          <div className="mb-10">
            <h3 className="text-xl font-black mb-5">Must-Try Experiences</h3>
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
              {(selectedDestination.activities || ["Island Hopping", "Dining", "Photography"]).map((act, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ y: -5 }}
                  className={`min-w-[150px] p-5 rounded-[2.5rem] text-center border transition-all ${
                    darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-100 shadow-sm"
                  }`}
                >
                  <div className="w-14 h-14 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Zap size={24} fill="currentColor" className="opacity-80" />
                  </div>
                  <p className="text-xs font-bold leading-tight">{act.name || act}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* 5. GALLERY SECTION */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xl font-black">Gallery</h3>
              <button className="text-blue-500 text-sm font-bold">View all</button>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {selectedDestination.images.map((img, i) => (
                <motion.div 
                  key={i} 
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFullScreenImage(img)}
                  className="aspect-square rounded-3xl overflow-hidden cursor-pointer border-2 border-transparent hover:border-blue-500 transition-all"
                >
                  <img src={img} className="w-full h-full object-cover" alt={`gallery-${i}`} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* 6. BUDGET BREAKDOWN CARD (Now Dynamic) */}
          <div className={`p-7 rounded-[2.5rem] mb-10 transition-all ${
            darkMode ? "bg-blue-600/10 border border-blue-500/20" : "bg-blue-50/50 border border-blue-100"
          }`}>
            <h3 className="text-lg font-black mb-4 flex items-center gap-2 text-blue-500">
              <Info size={20} /> Budget Estimator
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className={darkMode ? "text-gray-400" : "text-gray-500"}>Accommodation</span>
                {/* Pulls from the data or shows a fallback */}
                <span className="font-bold">
                  {selectedDestination.budgetDetails?.accommodation || "₱1,000 - ₱2,000"}
                </span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className={darkMode ? "text-gray-400" : "text-gray-500"}>Daily Food</span>
                <span className="font-bold">
                  {selectedDestination.budgetDetails?.food || "₱500/day"}
                </span>
              </div>

              <div className={`flex justify-between text-base border-t pt-3 mt-3 ${darkMode ? "border-slate-700" : "border-blue-100"}`}>
                <span className="font-black">Total Est.</span>
                <span className="font-black text-blue-600">
                  {selectedDestination.price}
                </span>
              </div>
            </div>
          </div>

          {/* 📍 7. MAP SECTION */}
          <motion.h3 className="font-black text-xl mb-4">Location</motion.h3>
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className={`h-64 w-full rounded-[2.5rem] overflow-hidden shadow-inner border-4 z-0 relative mb-10 ${
              darkMode ? "border-slate-800" : "border-gray-50"
            }`}
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

          {/* 🚌 TRANSPORTATION SECTION */}
          <div className="mb-10">
            <h3 className="text-xl font-black mb-5">How to Get There</h3>
            <div className="space-y-4">
              {selectedDestination.transportation?.map((route, i) => (
                <motion.div 
                  key={i}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`p-5 rounded-[2rem] border transition-all ${
                    darkMode ? "bg-slate-800/40 border-slate-700" : "bg-white border-gray-100 shadow-sm"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-500/10 text-blue-500 rounded-2xl">
                      <Navigation size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] uppercase text-blue-500 font-bold tracking-widest mb-1">
                        From {route.from}
                      </p>
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-bold text-sm">{route.type}</h4>
                        <span className="text-xs font-black text-green-500">{route.cost}</span>
                      </div>
                      <p className={`text-xs leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                        {route.instructions}
                      </p>
                      <div className="flex items-center gap-1 mt-3 text-[10px] font-bold text-gray-400">
                        <Clock size={12} /> Est. {route.duration}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )) || (
                <p className="text-gray-500 text-sm italic">Transportation details coming soon...</p>
              )}
            </div>
          </div>

          {/* 8. OVERVIEW */}
          <div className="mb-10">
            <h3 className="text-xl font-black mb-3">Overview</h3>
            <p className={`text-sm leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              {selectedDestination.description}
            </p>
          </div>

          {/* 9. REVIEWS & COMMENTS */}
          <div className={`border-t pt-10 mb-20 ${darkMode ? "border-slate-800" : "border-gray-100"}`}>
            <h3 className="text-xl font-black mb-6">Tourist Reviews</h3>
            
            {/* Input Area to Add a New Review */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`${darkMode ? "bg-slate-800/50" : "bg-gray-50"} p-6 rounded-[2.5rem] mb-10`}
            >
              <div className="flex gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star 
                    key={s} 
                    size={20} 
                    onClick={() => setNewRating(s)} 
                    className={`cursor-pointer transition-all ${s <= newRating ? "fill-yellow-400 text-yellow-400" : (darkMode ? "text-slate-600" : "text-gray-300")}`} 
                  />
                ))}
              </div>
              <textarea 
                value={newComment} 
                onChange={(e) => setNewComment(e.target.value)} 
                placeholder="Share your experience..." 
                className={`w-full p-4 rounded-2xl border-none outline-none h-24 text-sm mb-4 ring-1 transition-all ${
                  darkMode ? "bg-slate-700 ring-slate-600 text-white placeholder-gray-500" : "bg-white ring-gray-200"
                }`} 
              />
              <button 
                onClick={handleAddReview} 
                className="bg-blue-600 text-white px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest active:scale-95 transition-all"
              >
                Post Review
              </button>
            </motion.div>

            {/* Display List of Existing Reviews */}
            <div className="space-y-8">
              {comments.filter(c => c.destinationId === selectedDestination.id).reverse().map((review, idx) => (
                <motion.div 
                  key={review.id} 
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex-shrink-0 flex items-center justify-center font-black text-blue-600 text-lg">
                    {review.userName[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="text-sm font-black">{review.userName}</h4>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={10} className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} />
                        ))}
                      </div>
                    </div>
                    <p className={`text-sm leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{review.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 10. STICKY BOOKING BAR */}
        <div className={`fixed bottom-0 left-0 right-0 p-6 border-t backdrop-blur-xl transition-all z-50 ${
          darkMode ? "bg-slate-900/90 border-slate-800" : "bg-white/90 border-gray-100"
        }`}>
          <div className="max-w-md mx-auto flex items-center justify-between gap-6">
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Starting from</p>
              <p className="text-2xl font-black text-blue-600">{selectedDestination.price}</p>
            </div>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => addBooking(selectedDestination)}
              className="bg-blue-600 text-white px-10 py-4 rounded-[2.5rem] font-black text-sm shadow-xl shadow-blue-500/30"
            >
              Book Now
            </motion.button>
          </div>
        </div>
      </motion.div>
    )}

    {/* BOOKINGS PAGE (Filtered to User) */}
    {page === "bookings" && (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        className={`min-h-screen p-8 pb-32 transition-colors duration-300 ${
          darkMode ? "bg-slate-900" : "bg-gray-50"
        }`}
      >
        {/* Heading: Toggles between slate-900 and white */}
        <h1 className={`text-2xl font-bold mb-6 ${darkMode ? "text-white" : "text-slate-900"}`}>
          My Private Trips
        </h1>

        {/* Filter logic */}
        {bookings.filter(b => b.bookedBy === user?.email).length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p>You haven't booked any adventures yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings
              .filter(b => b.bookedBy === user?.email)
              .map((trip) => (
                <div 
                  key={trip.bookingId} 
                  className={`flex items-center gap-4 p-4 rounded-3xl border shadow-sm transition-all ${
                    darkMode 
                      ? "bg-slate-800 border-slate-700 shadow-none" 
                      : "bg-white border-gray-100"
                  }`}
                >
                  <img src={trip.images[0]} className="w-20 h-20 rounded-2xl object-cover" alt={trip.name} />
                  
                  <div className="flex-1">
                    {/* Trip Name: Becomes white in Dark Mode */}
                    <h3 className={`font-bold ${darkMode ? "text-white" : "text-slate-900"}`}>
                      {trip.name}
                    </h3>
                    
                    {/* Location: Becomes a lighter gray in Dark Mode for readability */}
                    <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                      {trip.location}
                    </p>
                    
                    {/* Price: Stays blue (brand color) but slightly brighter if needed */}
                    <p className="text-xs font-bold text-blue-500 mt-1">
                      {trip.price}
                    </p>
                  </div>
                  
                  <button 
                    onClick={() => deleteBooking(trip.bookingId)}
                    className={`p-3 rounded-2xl transition-colors ${
                      darkMode 
                        ? "bg-slate-700 text-red-400 hover:bg-red-500/20" 
                        : "bg-red-50 text-red-500 hover:bg-red-100"
                    }`}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
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
    className={`min-h-screen pb-28 ${darkMode ? "bg-slate-900" : "bg-gray-50"}`}
  >
    {/* Header Backdrop */}
    <motion.div 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", damping: 20 }}
      className="h-40 bg-blue-600 rounded-b-[3rem] shadow-lg relative"
    >
      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
        <motion.div 
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="w-24 h-24 rounded-3xl bg-white p-1 shadow-xl"
        >
          <div className="w-full h-full rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold">
            {user?.name?.[0] || "U"}
          </div>
        </motion.div>
      </div>
    </motion.div>

    {/* User Info & Stats */}
    <motion.div variants={itemVariants} className="mt-16 text-center px-6">
      <h1 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-slate-900"}`}>{user?.name}</h1>
      <p className="text-gray-500 text-sm mb-8">{user?.email}</p>
      
      <div className="flex justify-between gap-4">
        {[
          { 
            label: "Trips", 
            value: bookings.filter(b => b.bookedBy === user?.email).length 
          },
          { 
            label: "Reviews", 
            value: comments.filter(c => c.userName === user?.name).length 
          },
          { 
            label: "Badges", 
            value: 1 // Static for now, or logic based on trips
          }
        ].map((stat, i) => (
          <motion.div 
            key={stat.label}
            whileHover={{ y: -5 }}
            className={`${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-100"} flex-1 p-4 rounded-2xl shadow-sm border`}
          >
            <p className="text-xl font-bold text-blue-600">{stat.value}</p>
            <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>

    {/* Dynamic List Sections */}
    <div className="px-6 mt-8 space-y-6">
      
      {/* Activity Section */}
      <motion.div variants={itemVariants}>
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Recent Activity</h3>
        <div className={`${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-100"} rounded-3xl overflow-hidden shadow-sm border`}>
          
          {/* My Bookings Link */}
          <motion.button 
            whileTap={{ backgroundColor: darkMode ? "#1e293b" : "#f9fafb" }}
            onClick={() => setPage("bookings")}
            className="w-full flex items-center justify-between p-4 border-b border-gray-50/10"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><BookOpen size={18} /></div>
              <span className={`font-medium ${darkMode ? "text-gray-200" : "text-slate-700"}`}>View My {bookings.filter(b => b.bookedBy === user?.email).length} Trips</span>
            </div>
            <span className="text-gray-300">→</span>
          </motion.button>

          {/* Settings / Dark Mode Toggle */}
          <div className="w-full flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><CloudSun size={18} /></div>
              <span className={`font-medium ${darkMode ? "text-gray-200" : "text-slate-700"}`}>Dark Mode</span>
            </div>
            <div 
              onClick={() => setDarkMode(!darkMode)}
              className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${darkMode ? 'bg-blue-600' : 'bg-gray-300'}`}
            >
              <motion.div 
                layout 
                className="bg-white w-4 h-4 rounded-full shadow-md" 
                animate={{ x: darkMode ? 24 : 0 }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Logout Button */}
      <motion.button 
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={logout}
        className="w-full bg-red-50 text-red-600 py-4 rounded-2xl font-bold border border-red-100 flex items-center justify-center gap-2"
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