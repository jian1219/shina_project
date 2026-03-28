import { useState } from "react";
import { motion } from "framer-motion";

export default function Login({ setPage, setUser }) {
  const [form, setForm] = useState({ name: "", email: "" });

  const handleLogin = () => {
    if (!form.name || !form.email) return alert("Fill all fields");
    localStorage.setItem("user", JSON.stringify(form));
    setUser(form);
    setPage("home");
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative h-screen flex flex-col justify-center p-8 overflow-hidden bg-blue-50">
      <div className="relative z-10 bg-white/95 backdrop-blur-md p-8 rounded-[2.5rem] shadow-2xl border border-white/20">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Welcome.</h1>
        <p className="text-gray-500 mb-8">Sign in to start your adventure.</p>
        <div className="space-y-4">
          <input 
            type="text" placeholder="Full Name" value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full bg-gray-100/50 p-4 rounded-2xl outline-none" 
          />
          <input 
            type="email" placeholder="Email Address" value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full bg-gray-100/50 p-4 rounded-2xl outline-none" 
          />
          <button onClick={handleLogin} className="w-full bg-blue-600 text-white font-bold py-5 rounded-2xl shadow-xl shadow-blue-500/30">
            Let's Go
          </button>
        </div>
      </div>
    </motion.div>
  );
}