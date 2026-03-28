import img1 from '../img/inn1.png';
import inn2 from '../img/inn2.png';
import inn3 from '../img/inn3.png';
import img11 from '../img/img11.jpg';
import img12 from '../img/img12.jpg';


import gr1 from '../img/spot/gr1.png';
import gr2 from '../img/spot/gr2.png';
import gr22 from '../img/spot/gr22.png';
import gr3 from '../img/spot/gr3.png';
import gr33 from '../img/spot/gr33.png';
import gr4 from '../img/spot/gr4.png';
import gr44 from '../img/spot/gr44.png';
import gr5 from '../img/spot/gr5.png';
import gr55 from '../img/spot/gr55.png';
import gr555 from '../img/spot/gr555.png';
import gr5555 from '../img/spot/gr5555.png';
import gr6 from '../img/spot/gr6.png';
import gr66 from '../img/spot/gr66.png';
import gr666 from '../img/spot/gr666.png';
import gr6666 from '../img/spot/gr6666.png';
import gr7 from '../img/spot/gr7.png';
import gr77 from '../img/spot/gr77.png';
import gr777 from '../img/spot/gr777.png';
import gr7777 from '../img/spot/gr7777.png';
import gr8 from '../img/spot/gr8.png';
import gr88 from '../img/spot/gr88.png';
import gr888 from '../img/spot/gr888.png';
import gr8888 from '../img/spot/gr8888.png';
import gr9 from '../img/spot/gr9.png';
import gr99 from '../img/spot/gr99.png';
import gr999 from '../img/spot/gr999.png';
import gr9999 from '../img/spot/gr9999.png';
import gr0 from '../img/spot/gr0.png';
import gr00 from '../img/spot/gr00.png';
import gr000 from '../img/spot/gr000.png';



export const destinationsData = [
   // PONKAY ***************************************************
  {
    id: "pongkay", 
    name: "MT. PONGKAY",
    location: "Brgy. Kauswagan, Cabadbaran City, Agusan del Norte",
    rating: 4.9,
    price: "Free / Donation",
    coordinates: [9.130966158730411, 125.53983102062428],
    description: "A popular pilgrimage and trekking destination featuring a scenic climb with over 700 steps. At the peak, visitors are rewarded with a breathtaking 360-degree view of Cabadbaran City and the coastline.",
    images: [gr1, inn2, inn3], // Ensure these imports match your mountain assets
    
    tagline: "The Stairway to Heaven of Cabadbaran",
    duration: "1 - 2 Hours (Hike)",
    bestTime: "5:00 AM (Sunrise) or 4:00 PM (Sunset)",
    weather: "28°C Sunny",
    
    activities: [
      { name: "Hiking", icon: "Mountain" },
      { name: "Photography", icon: "Camera" },
      { name: "Sightseeing", icon: "Map" }
    ],
    
    budgetDetails: {
      accommodation: "N/A (Day hike)",
      food: "₱100 - ₱200 (Local snacks)",
      activities: "₱20 (Environmental Fee/Donation)"
    },
    
    nearbyHotels: [
      { name: "Filipinas Heritage", price: "Luxury", rating: 5 },
      { name: "Cabadbaran Pension", price: "Budget", rating: 4.2 }
    ],
    
    transportation: [
      {
        from: "Cabadbaran City Terminal",
        type: "Tricycle",
        cost: "₱30 - ₱50",
        duration: "15 mins",
        instructions: "Ask the driver to take you to the foot of Mt. Pongkay in Brgy. Kauswagan."
      },
      {
        from: "Butuan City",
        type: "Bus / Van",
        cost: "₱100 - ₱150",
        duration: "45-60 mins",
        instructions: "Take a Northbound bus, alight at Cabadbaran Terminal, then take a local tricycle."
      }
    ],
    category: "Mountain",
    ctaText: "Trip Now",
  },
   // Hidden Nav INN ***************************************************
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
    category: "Hotel",
  },
   // Puting Bato ***************************************************
  {
    id: "puting-bato",
    name: "THE PUTING BATO",
    location: "Brgy. Puting Bato, Cabadbaran City, Agusan del Norte",
    rating: 4.8,
    price: "₱200", // This usually covers the guide fee/environmental fee
    coordinates: [9.1175, 125.5947], // Approximate coordinates for the peak area
    description: "Known for its 'White Rock' limestone formations, this destination offers a refreshing escape with the Tumipi Cold Spring at its base and a breathtaking view deck at the summit. It is perfect for those who want a mix of trekking and a cool dip.",
    images: [img11, img12],
    
    // NEW FIELDS & CTA
    tagline: "Reach the White Peak",
    duration: "1 Day (4-5 Hours Trek)",
    bestTime: "6:00 AM",
    weather: "26°C Cloudy",
    ctaText: "Trip Now", // Dynamic button text
    
    activities: [
      { name: "Mountain Hiking", icon: "Mountain" },
      { name: "Cold Spring Dip", icon: "Waves" },
      { name: "Photography", icon: "Camera" }
    ],
    
    budgetDetails: {
      accommodation: "N/A",
      food: "₱150 - ₱300",
      activities: "₱200 (Guide & Fees)"
    },
    
    nearbyHotels: [
      { name: "Cabadbaran Pension", price: "Budget", rating: 4.2 },
      { name: "Grand Palace Hotel (Butuan)", price: "Luxury", rating: 4.5 }
    ],
    
    transportation: [
      {
        from: "Cabadbaran City Center",
        type: "Habal-Habal (Motorcycle)",
        cost: "₱100 - ₱150",
        duration: "30-45 mins",
        instructions: "Hire a local habal-habal driver at the city terminal specifically experienced in the Puting Bato route."
      }
    ],
    category: "Mountain",
  },
  // Caasinan Beach ***************************************************
  {
    id: "caasinan-beach",
    name: "CAASINAN BEACH",
    location: "Brgy. Caasinan, Cabadbaran City, Agusan del Norte",
    rating: 4.5,
    price: "₱20 - ₱50", // Entrance/Cottage fees
    coordinates: [9.1215, 125.5032], // Approximate coastal coordinates
    description: "A favorite local getaway known for its long stretch of dark volcanic sand and calm waters. It's the perfect spot for weekend family picnics, beach volleyball, and watching the stunning golden sunsets over the Mindanao Sea.",
    images: [gr2, gr22], // Replace with your actual image imports
    
    tagline: "Sunsets and Serenity by the Sea",
    duration: "Half Day / Full Day",
    bestTime: "4:00 PM (Sunset)",
    weather: "30°C Sunny",
    ctaText: "Trip Now",
    
    activities: [
      { name: "Swimming", icon: "Waves" },
      { name: "Beach Picnic", icon: "Utensils" },
      { name: "Sunset Viewing", icon: "Sun" }
    ],
    
    budgetDetails: {
      accommodation: "₱500 - ₱1,500 (Cottages/Small Inns)",
      food: "₱100 - ₱500",
      activities: "₱20 (Entrance Fee)"
    },
    
    nearbyHotels: [
      { name: "Cabadbaran Pension", price: "Budget", rating: 4.2 },
      { name: "Filipinas Heritage", price: "Luxury", rating: 5 }
    ],
    
    transportation: [
      {
        from: "Cabadbaran City Terminal",
        type: "Tricycle / E-Bike",
        cost: "₱15 - ₱30",
        duration: "10 mins",
        instructions: "Inform the driver you are heading to the Caasinan Beach area."
      },
      {
        from: "Butuan City",
        type: "Bus / Van",
        cost: "₱100 - ₱150",
        duration: "45 mins",
        instructions: "Alight at Cabadbaran Terminal and take a short tricycle ride to the beach."
      }
    ],
    category: "Beach",
  },
  // eg- HOTEL ***********************************************
  {
    id: "eg-hotel",
    name: "E & G HOTEL AND CONVENTION CENTER",
    location: "Ibay Street, Poblacion, Cabadbaran City, Agusan del Norte",
    rating: 4.3,
    price: "₱1,200 - ₱3,500", // Standard to Suite rates
    coordinates: [9.123512, 125.534815], 
    description: "A premier business and leisure hotel in the heart of Cabadbaran. It features air-conditioned rooms, an in-house restaurant, and a spacious convention center making it the go-to choice for conferences, weddings, and travelers seeking central access to the city.",
    images: [gr3, gr33], // Replace with your hotel asset imports
    
    tagline: "Your Gateway to Comfort in the Golden Heart City",
    duration: "Per Night",
    bestTime: "Check-in: 2:00 PM",
    weather: "31°C Sunny",
    ctaText: "Book Now",
    
    activities: [
      { name: "Fine Dining", icon: "Utensils" },
      { name: "Conferences", icon: "Users" },
      { name: "City Tour", icon: "Map" }
    ],
    
    budgetDetails: {
      accommodation: "₱1,200+ (Standard Room)",
      food: "₱200 - ₱600 (Per meal)",
      activities: "N/A"
    },
    
    nearbyHotels: [
      { name: "Kingsland Travellers Inn", price: "Budget", rating: 4.4 },
      { name: "Filipinas Heritage", price: "Luxury", rating: 5 }
    ],
    
    transportation: [
      {
        from: "Cabadbaran City Hall",
        type: "Walk / Tricycle",
        cost: "₱15",
        duration: "3-5 mins",
        instructions: "The hotel is centrally located near the city plaza; most local tricycles know it by name."
      },
      {
        from: "Bancasi Airport (Butuan)",
        type: "Van / Taxi",
        cost: "₱150 - ₱1,200",
        duration: "45-60 mins",
        instructions: "Take a van to Cabadbaran and drop off at the Ibay Street intersection."
      }
    ],
    category: "Hotel",
  },
  // M & JM GRAND HOTEL ***************************************************
  {
    id: "m-jm-grand",
    name: "M & JM GRAND HOTEL",
    location: "Poblacion, Cabadbaran City, Agusan del Norte",
    rating: 4.4,
    price: "₱1,000 - ₱2,800", // Estimated nightly rates
    coordinates: [9.1228, 125.5365], // Approximate city center coordinates
    description: "A contemporary hotel offering comfortable and well-maintained rooms for both short-term travelers and business guests. Located within the city's main hub, it provides easy access to local government offices, dining spots, and public transport terminals.",
    images: [gr4, gr44], // Replace with your hotel asset imports
    
    tagline: "Experience Grand Hospitality in Cabadbaran",
    duration: "Per Night",
    bestTime: "Check-in: 2:00 PM",
    weather: "31°C Sunny",
    ctaText: "Book Now",
    
    activities: [
      { name: "City Exploration", icon: "Map" },
      { name: "Business Stays", icon: "Briefcase" },
      { name: "Local Dining", icon: "Utensils" }
    ],
    
    budgetDetails: {
      accommodation: "₱1,000+ (Standard Room)",
      food: "₱150 - ₱400 (Nearby Eateries)",
      activities: "N/A"
    },
    
    nearbyHotels: [
      { name: "E & G Hotel", price: "Mid-Range", rating: 4.3 },
      { name: "Cabadbaran Pension", price: "Budget", rating: 4.2 }
    ],
    
    transportation: [
      {
        from: "Cabadbaran Terminal",
        type: "Tricycle",
        cost: "₱15 - ₱20",
        duration: "5 mins",
        instructions: "The hotel is a short tricycle ride from the main bus and van terminal."
      },
      {
        from: "Butuan City",
        type: "Bus / Van",
        cost: "₱100 - ₱150",
        duration: "45 mins",
        instructions: "Take a northbound bus and tell the conductor to drop you off at Cabadbaran City proper."
      }
    ],
    category: "Hotel",
  },
  // HAYAYAY REStaURANT ***************************************************
  {
    id: "hayahay-restaurant",
    name: "HAYAHAY RESTAURANT",
    location: "Brgy. Tolosa, Cabadbaran City, Agusan del Norte",
    rating: 4.6,
    price: "₱200 - ₱600", // Average price per meal/platter
    coordinates: [9.1256, 125.5015], // Coastal location
    description: "A popular open-air seafood restaurant known for its 'Hayahay' (breezy) atmosphere. It offers fresh local catch, Filipino favorites, and a relaxing view of the sea, making it the top choice for family reunions and dinner dates in Cabadbaran.",
    images: [gr5, gr55, gr555, gr5555], // Replace with your restaurant asset imports
    
    tagline: "Fresh Seafood and Ocean Breezes",
    duration: "1 - 2 Hours",
    bestTime: "5:30 PM (Dinner & Sunset)",
    weather: "29°C Coastal Breeze",
    ctaText: "Reserve Now", // Dynamic button text
    
    activities: [
      { name: "Seafood Dining", icon: "Utensils" },
      { name: "Sunset Viewing", icon: "Sun" },
      { name: "Family Gatherings", icon: "Users" }
    ],
    
    budgetDetails: {
      accommodation: "N/A",
      food: "₱250+ (Per Person)",
      activities: "Free Entry (Dining Only)"
    },
    
    nearbyHotels: [
      { name: "M & JM Grand Hotel", price: "Mid-Range", rating: 4.4 },
      { name: "Caasinan Beach Cottages", price: "Budget", rating: 4.0 }
    ],
    
    transportation: [
      {
        from: "Cabadbaran City Plaza",
        type: "Tricycle / E-Bike",
        cost: "₱20 - ₱40",
        duration: "10-15 mins",
        instructions: "Tell the driver you are going to Hayahay in Brgy. Tolosa near the coast."
      },
      {
        from: "Butuan City",
        type: "Bus / Van",
        cost: "₱100 - ₱150",
        duration: "50 mins",
        instructions: "Drop off at Cabadbaran City proper and take a tricycle to the coastal road."
      }
    ],
    category: "Restaurant",
  },
  // Zackies Restaurant ***************************************************
  {
    id: "zackies-restaurant",
    name: "ZACKIE’S RESTAURANT",
    location: "Poblacion, Cabadbaran City, Agusan del Norte",
    rating: 4.5,
    price: "₱150 - ₱500", // Average price per meal
    coordinates: [9.1218, 125.5352], // Located near the city proper
    description: "A well-loved local restaurant offering a diverse menu of Filipino favorites, grilled specialties, and refreshing beverages. Known for its welcoming ambiance and consistent food quality, it is a go-to spot for both casual lunches and celebratory dinners in the heart of the city.",
    images: [gr6, gr66, gr666, gr6666], // Replace with your restaurant asset imports
    
    tagline: "Your Home for Filipino Comfort Food",
    duration: "1 - 1.5 Hours",
    bestTime: "11:30 AM (Lunch) or 6:00 PM (Dinner)",
    weather: "31°C Sunny",
    ctaText: "Reserve Now", 
    
    activities: [
      { name: "Family Dining", icon: "Utensils" },
      { name: "Group Gatherings", icon: "Users" },
      { name: "Refreshments", icon: "Coffee" }
    ],
    
    budgetDetails: {
      accommodation: "N/A",
      food: "₱200+ (Per Person)",
      activities: "N/A"
    },
    
    nearbyHotels: [
      { name: "E & G Hotel", price: "Mid-Range", rating: 4.3 },
      { name: "M & JM Grand Hotel", price: "Mid-Range", rating: 4.4 }
    ],
    
    transportation: [
      {
        from: "Cabadbaran City Terminal",
        type: "Tricycle",
        cost: "₱15 - ₱20",
        duration: "5-8 mins",
        instructions: "Ask the driver to take you to Zackie's Restaurant; most local drivers in the Poblacion area are familiar with it."
      },
      {
        from: "City Plaza",
        type: "Walk",
        cost: "Free",
        duration: "5 mins",
        instructions: "It is conveniently located within walking distance from the main city landmarks."
      }
    ],
    category: "Restaurant",
  },
  // la dolce cafe ***************************************************
  {
    id: "la-dolce-cafe",
    name: "LA DOLCE CAFE",
    location: "Poblacion, Cabadbaran City, Agusan del Norte",
    rating: 4.7,
    price: "₱120 - ₱350", // Average coffee/pastry price
    coordinates: [9.1225, 125.5358], // Central Poblacion area
    description: "A chic and modern cafe offering a wide selection of specialty coffees, frappes, and artisanal pastries. With its minimalist aesthetic and relaxing ambiance, it is the perfect destination for digital nomads, students, and friends looking for a premium caffeine fix in the city.",
    images: [gr7, gr77, gr777, gr7777], // Replace with your cafe asset imports
    
    tagline: "The Sweet Life in Every Sip",
    duration: "1 - 2 Hours",
    bestTime: "3:00 PM (Afternoon Coffee)",
    weather: "31°C (Indoor AC)",
    ctaText: "Visit Now", 
    
    activities: [
      { name: "Coffee & Sweets", icon: "Coffee" },
      { name: "Co-working", icon: "Laptop" },
      { name: "Photography", icon: "Camera" }
    ],
    
    budgetDetails: {
      accommodation: "N/A",
      food: "₱150+ (Drink & Snack)",
      activities: "N/A"
    },
    
    nearbyHotels: [
      { name: "M & JM Grand Hotel", price: "Mid-Range", rating: 4.4 },
      { name: "E & G Hotel", price: "Mid-Range", rating: 4.3 }
    ],
    
    transportation: [
      {
        from: "Cabadbaran City Plaza",
        type: "Walk",
        cost: "Free",
        duration: "3-5 mins",
        instructions: "Located conveniently near the city's main commercial buildings and banks."
      },
      {
        from: "Cabadbaran Terminal",
        type: "Tricycle",
        cost: "₱15 - ₱20",
        duration: "5 mins",
        instructions: "Simply tell the tricycle driver 'La Dolce Cafe' near the city center."
      }
    ],
    category: "Cafe",
  },
  // D'VIBE RESTAURANT ***************************************************
  {
    id: "d-vibe",
    name: "D’VIBE",
    location: "Poblacion, Cabadbaran City, Agusan del Norte",
    rating: 4.6,
    price: "₱150 - ₱600", // Average price for meals and drinks
    coordinates: [9.1230, 125.5360], // Central Poblacion area
    description: "True to its name, D’Vibe offers a trendy and energetic atmosphere perfect for late-afternoon coffee or evening chill-outs. It features a modern interior, a variety of fusion dishes, and signature beverages that make it a top choice for the city's younger crowd and professionals alike.",
    images: [ gr8888, gr8, gr88, gr888], // Replace with your actual asset imports
    
    tagline: "Good Food, Great Music, Best Vibes",
    duration: "1 - 3 Hours",
    bestTime: "5:00 PM onwards (Evening Vibe)",
    weather: "31°C (Indoor/Al Fresco)",
    ctaText: "Visit Now", 
    
    activities: [
      { name: "Casual Dining", icon: "Utensils" },
      { name: "Socializing", icon: "Users" },
      { name: "Live Music/Chill", icon: "Music" }
    ],
    
    budgetDetails: {
      accommodation: "N/A",
      food: "₱250+ (Per Person)",
      activities: "N/A"
    },
    
    nearbyHotels: [
      { name: "M & JM Grand Hotel", price: "Mid-Range", rating: 4.4 },
      { name: "E & G Hotel", price: "Mid-Range", rating: 4.3 }
    ],
    
    transportation: [
      {
        from: "City Plaza",
        type: "Walk",
        cost: "Free",
        duration: "5 mins",
        instructions: "Centrally located in the Poblacion area, easily reachable from major landmarks."
      },
      {
        from: "Cabadbaran Terminal",
        type: "Tricycle",
        cost: "₱15 - ₱20",
        duration: "5 mins",
        instructions: "Ask the driver to take you to D’Vibe; it's a well-known spot for dining and social gatherings."
      }
    ],
    category: "Restaurant",
  },
  //Zackies coffee shop ***************************************************
  {
    id: "zackies-coffee-house",
    name: "ZACKIE’S COFFEE HOUSE",
    location: "Poblacion, Cabadbaran City, Agusan del Norte",
    rating: 4.6,
    price: "₱110 - ₱300", // Average coffee/snack price
    coordinates: [9.1216, 125.5350], // Central Poblacion, near the main restaurant
    description: "The perfect corner for coffee enthusiasts. Zackie's Coffee House offers a dedicated space for premium brews, signature iced coffees, and light snacks. Its warm wooden interiors and quiet atmosphere make it a favorite for afternoon breaks and casual meetups.",
    images: [gr99, gr9, gr999, gr9999], // Replace with your cafe asset imports
    
    tagline: "Your Daily Grind, Refined",
    duration: "1 - 2 Hours",
    bestTime: "2:00 PM - 5:00 PM (Afternoon Break)",
    weather: "31°C (Indoor AC)",
    ctaText: "Visit Now", 
    
    activities: [
      { name: "Coffee Tasting", icon: "Coffee" },
      { name: "Relaxing", icon: "Smile" },
      { name: "Socializing", icon: "Users" }
    ],
    
    budgetDetails: {
      accommodation: "N/A",
      food: "₱150+ (Per Person)",
      activities: "N/A"
    },
    
    nearbyHotels: [
      { name: "E & G Hotel", price: "Mid-Range", rating: 4.3 },
      { name: "M & JM Grand Hotel", price: "Mid-Range", rating: 4.4 }
    ],
    
    transportation: [
      {
        from: "Cabadbaran City Plaza",
        type: "Walk",
        cost: "Free",
        duration: "4 mins",
        instructions: "Located just a short walk from the city plaza and the main Zackie's Restaurant."
      },
      {
        from: "Cabadbaran Terminal",
        type: "Tricycle",
        cost: "₱15 - ₱20",
        duration: "5 mins",
        instructions: "Tell the driver 'Zackie's Coffee' in the Poblacion area."
      }
    ],
    category: "Cafe",
  },
  {
    id: "ajs-restobar",
    name: "AJS RESTOBAR AND GRILL",
    location: "Cabadbaran City, Agusan del Norte",
    rating: 4.4,
    price: "₱200 - ₱800", // Average price for meals, buckets, and platters
    coordinates: [9.1245, 125.5368], // Central Cabadbaran area
    description: "AJS is one of the city's premier spots for 'night caps' and group hangouts. Offering a wide array of grilled Filipino favorites, cold beverages, and frequent live acoustic sessions, it provides a vibrant setting for those looking to unwind after a long day.",
    images: [gr0, gr00, gr000], // Replace with your actual asset imports
    
    tagline: "Grill, Chill, and Good Music",
    duration: "2 - 4 Hours",
    bestTime: "7:00 PM onwards (Live Music)",
    weather: "28°C (Evening Breeze)",
    ctaText: "Visit Now", 
    
    activities: [
      { name: "Live Acoustic", icon: "Music" },
      { name: "Grilled Cuisine", icon: "Flame" },
      { name: "Nightlife", icon: "Moon" }
    ],
    
    budgetDetails: {
      accommodation: "N/A",
      food: "₱300+ (Per Person / Group Sharing)",
      activities: "N/A"
    },
    
    nearbyHotels: [
      { name: "M & JM Grand Hotel", price: "Mid-Range", rating: 4.4 },
      { name: "E & G Hotel", price: "Mid-Range", rating: 4.3 }
    ],
    
    transportation: [
      {
        from: "Cabadbaran City Plaza",
        type: "Tricycle",
        cost: "₱20 - ₱30",
        duration: "5-10 mins",
        instructions: "Most tricycle drivers are familiar with AJS as a major landmark for nightlife in the city."
      },
      {
        from: "City Center",
        type: "Walk",
        cost: "Free",
        duration: "10 mins",
        instructions: "Accessible on foot if you are staying in the main Poblacion hotels."
      }
    ],
    category: "Restaurant",
  },
];