// src/pages/dashboard/DashboardHome.tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import DashboardPortfolio from '@/components/dashboard/DashboardPortfolio';
import { useApiClient } from "@/utils/apiClient";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layers, Plus, BarChart3, ArrowUpRight, Activity } from 'lucide-react';

const DashboardHome = () => {
  const { get } = useApiClient();
  const [totalItems, setTotalItems] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTotalItems = async () => {
      try {
        const response = await get("/countMyPortfolioItems");
        setTotalItems(response.pagination.totalItems);
      } catch (err) {
        console.error('Failed to fetch total items:', err);
        setError('Failed to load portfolio count');
      } finally {
        setLoading(false);
      }
    };
    fetchTotalItems();
  }, [get]);

  const stats = [
    {
      label: "Total Archives",
      value: totalItems,
      icon: Layers,
      color: "text-white",
      desc: "Live portfolio entries"
    },
    {
      label: "System Taxonomies",
      value: "05",
      icon: BarChart3,
      color: "text-white/40",
      desc: "Active categories"
    }
  ];

  return (
    <div className="space-y-12 pb-12">
      
      {/* 1. EDITORIAL HEADER */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-[10px] font-black tracking-[0.5em] text-white/30 uppercase block mb-2">
            System Overview
          </span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">
            Control <span className="text-white/10 italic">Center.</span>
          </h1>
        </div>
        <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-green-500 bg-green-500/5 px-4 py-2 rounded-full border border-green-500/10">
            <Activity className="w-3 h-3 animate-pulse" /> System Operational
        </div>
      </header>

      {/* 2. METRIC GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group relative p-8 rounded-[2.5rem] bg-white/5 border border-white/10 overflow-hidden"
          >
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-8">
                <div className="p-3 rounded-2xl bg-white/5 text-white/40 group-hover:text-white transition-colors">
                  <stat.icon className="w-5 h-5" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-white/10 group-hover:text-white transition-all" />
              </div>
              
              {loading ? (
                <div className="h-12 w-24 bg-white/5 animate-pulse rounded-lg" />
              ) : error ? (
                <p className="text-red-500 text-xs font-bold uppercase tracking-widest">{error}</p>
              ) : (
                <div className="space-y-1">
                  <p className={`text-6xl font-black tracking-tighter ${stat.color}`}>
                    {stat.value}
                  </p>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
                    {stat.label}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        ))}

        {/* PRIMARY ACTION CARD (UPLOAD) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onClick={() => navigate('/dashboard/upload')}
          className="cursor-pointer group p-8 rounded-[2.5rem] bg-white text-black hover:bg-white/90 transition-all flex flex-col justify-between"
        >
          <div className="flex justify-between items-start">
            <div className="p-3 rounded-2xl bg-black/5">
              <Plus className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Ready</span>
          </div>
          
          <div className="mt-8">
            <h3 className="text-3xl font-black uppercase tracking-tighter leading-none mb-2">
              Deploy <br /> New Item
            </h3>
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">
              Upload design or dev work
            </p>
          </div>
        </motion.div>
      </div>

      {/* 3. RECENT ITEMS (Liquid Glass Container) */}
      <section className="relative rounded-[3rem] bg-white/5 border border-white/10 overflow-hidden">
        <div className="p-10 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <div className="w-2 h-2 rounded-full bg-blue-500" />
             <h2 className="text-xs font-black uppercase tracking-[0.3em] text-white/50">Recent Intelligence</h2>
          </div>
          <Button 
            variant="ghost" 
            onClick={() => navigate('/dashboard/portfolio')}
            className="text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-white"
          >
            View Full Registry
          </Button>
        </div>
        
        <div className="p-6 md:p-10">
          <DashboardPortfolio />
        </div>
        
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] pointer-events-none" />
      </section>

    </div>
  );
};

export default DashboardHome;