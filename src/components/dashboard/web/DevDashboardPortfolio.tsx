// src/components/dashboard/DevDashboardItems.tsx
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { 
  Eye, ChevronLeft, ChevronRight, Globe, Smartphone, 
  Code, Server, Trash2, Edit3, Terminal, Cpu, Activity 
} from "lucide-react";
import { useApiClient } from "@/utils/apiClient";
import { motion, AnimatePresence } from "framer-motion";

const DevDashboardItems = () => {
  const { get } = useApiClient();
  const [portfolioItems, setPortfolioItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentImageIndices, setCurrentImageIndices] = useState<Record<string, number>>({});

  const itemsPerPage = 8;
  const categories = ['All', 'Websites', 'Web Apps', 'Mobile Apps', 'E-commerce', 'Dashboard', 'API', 'Full-Stack'];

  const getProjectTypeIcon = (type: string) => {
    switch (type) {
      case 'website': return <Globe className="w-3 h-3" />;
      case 'webapp': return <Code className="w-3 h-3" />;
      case 'mobile': return <Smartphone className="w-3 h-3" />;
      case 'api': return <Server className="w-3 h-3" />;
      default: return <Terminal className="w-3 h-3" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Live': return 'bg-green-500';
      case 'Demo': return 'bg-blue-500';
      case 'Development': return 'bg-yellow-500';
      default: return 'bg-white/20';
    }
  };

  useEffect(() => {
    fetchItems();
  }, [currentPage, selectedCategory]);

  const fetchItems = async () => {
    try {
      setIsLoading(true);
      const categoryParam = selectedCategory === 'All' ? '' : `&category=${selectedCategory}`;
      const response = await get(`/getDevPortfolioItems?page=${currentPage}&limit=${itemsPerPage}${categoryParam}`);
      
      if (currentPage === 1) setPortfolioItems(response.items);
      else setPortfolioItems(prev => [...prev, ...response.items]);
      
      setTotalPages(response.total);
      
      const newIndices = {...currentImageIndices};
      response.items.forEach((item: any) => {
        if (!newIndices[item.id]) newIndices[item.id] = 0;
      });
      setCurrentImageIndices(newIndices);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const goToNextImage = (itemId: string, max: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndices(prev => ({ ...prev, [itemId]: (prev[itemId] + 1) % max }));
  };

  if (isLoading && currentPage === 1) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-10 h-10 border-2 border-white/10 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* 1. TECHNICAL FILTERS */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => { setSelectedCategory(category); setCurrentPage(1); }}
            className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 border ${
              selectedCategory === category
                ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                : 'bg-white/5 text-white/40 border-white/10 hover:border-white/20'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* 2. REPOSITORY GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {portfolioItems.map((item) => (
          <motion.div 
            layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            key={item.id}
            className="group relative bg-[#0A0A0A] border border-white/5 rounded-[2rem] overflow-hidden hover:border-white/20 transition-all duration-500"
          >
            {/* Visual Header */}
            <div className="relative aspect-video bg-black overflow-hidden">
              {item.images && item.images.length > 0 ? (
                <img 
                  src={item.images[currentImageIndices[item.id] || 0].url} 
                  className="w-full h-full object-cover opacity-50 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  alt=""
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-white/5">
                    <Cpu className="w-16 h-16" />
                </div>
              )}
              
              {/* Floating Badges */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                <Badge className="bg-black/60 backdrop-blur-md border-white/10 text-[8px] font-black uppercase tracking-widest gap-2">
                   {getProjectTypeIcon(item.type)} {item.type}
                </Badge>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                    <div className={`w-1.5 h-1.5 rounded-full ${getStatusColor(item.status)} shadow-[0_0_8px_currentColor]`} />
                    <span className="text-[8px] font-black uppercase tracking-widest">{item.status}</span>
                </div>
              </div>

              {item.images?.length > 1 && (
                <button 
                  onClick={(e) => goToNextImage(item.id, item.images.length, e)}
                  className="absolute right-4 bottom-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:text-black"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Core Details */}
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-sm font-black uppercase tracking-tighter mb-2 group-hover:text-blue-400 transition-colors line-clamp-1">{item.title}</h3>
                <p className="text-[11px] text-white/40 leading-relaxed line-clamp-2 font-medium">{item.description}</p>
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5">
                {item.technologies?.slice(0, 3).map((tech: string) => (
                  <span key={tech} className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/5 text-[9px] font-bold text-white/50 uppercase tracking-tight">
                    {tech}
                  </span>
                ))}
                {item.technologies?.length > 3 && (
                  <span className="text-[9px] text-white/20 font-black flex items-center">+{item.technologies.length - 3}</span>
                )}
              </div>

              {/* Metadata & Actions */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] font-black text-white/20">{item.year} // REPO</span>
                <div className="flex gap-4">
                    <button className="text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors flex items-center gap-1">
                        <Edit3 className="w-3 h-3" /> Edit
                    </button>
                    <button className="text-[10px] font-black uppercase tracking-widest text-red-500/50 hover:text-red-500 transition-colors flex items-center gap-1">
                        <Trash2 className="w-3 h-3" /> Delete
                    </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 3. PAGINATION / LOAD MORE */}
      {currentPage < totalPages && (
        <div className="flex justify-center pt-12">
          <button
            onClick={() => setCurrentPage(prev => prev + 1)}
            disabled={isLoading}
            className="group relative px-12 py-4 rounded-full overflow-hidden transition-all active:scale-95"
          >
             <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.3em] text-white group-hover:text-black transition-colors duration-500">
                Load More Repositories
             </span>
             <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
             <div className="absolute inset-0 border border-white/20 rounded-full" />
          </button>
        </div>
      )}
    </div>
  );
};

export default DevDashboardItems;