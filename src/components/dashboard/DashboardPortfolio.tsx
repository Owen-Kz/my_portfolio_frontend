import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Eye, ChevronLeft, ChevronRight, Edit3, Trash2, X, AlertTriangle, Save } from "lucide-react";
import { useApiClient } from "@/utils/apiClient";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";

const DashboardPortfolio = () => {
  const { get, post, put, del } = useApiClient();
  const [portfolioItems, setPortfolioItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentImageIndices, setCurrentImageIndices] = useState<Record<string, number>>({});

  // Modal States
  const [itemToEdit, setItemToEdit] = useState<any>(null);
  const [itemToDelete, setItemToDelete] = useState<any>(null);

  const itemsPerPage = 8;
  const categories = ['All', 'Branding', 'UI/UX', 'Print Design', 'Web Design', 'Illustration'];

  useEffect(() => {
    fetchPortfolioItems();
  }, [currentPage, selectedCategory]);

  const fetchPortfolioItems = async () => {
    try {
      setIsLoading(true);
      const categoryParam = selectedCategory === 'All' ? '' : `&category=${selectedCategory}`;
      const response = await get(`/getMyPortfolioItems?page=${currentPage}&limit=${itemsPerPage}${categoryParam}`);
      
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

  // --- ACTIONS ---
  const handleDelete = async () => {
    try {
      // await del(`/portfolio/${itemToDelete.id}`); 
      setPortfolioItems(prev => prev.filter(i => i.id !== itemToDelete.id));
      setItemToDelete(null);
    } catch (err) {
      console.error("Delete failed");
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to save itemToEdit via PUT
    setItemToEdit(null);
  };

  if (isLoading && currentPage === 1) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-12 h-12 border-2 border-white/10 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* 1. EDITORIAL FILTERS */}
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => { setSelectedCategory(category); setCurrentPage(1); }}
            className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 border ${
              selectedCategory === category
                ? 'bg-white text-black border-white'
                : 'bg-white/5 text-white/40 border-white/10 hover:border-white/20'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* 2. ADMIN PORTFOLIO GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {portfolioItems.map((item) => (
          <motion.div 
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            key={item.id} 
            className="group relative bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden hover:border-white/20 transition-all"
          >
            {/* Image Preview */}
            <div className="relative aspect-square overflow-hidden bg-black">
              <img 
                src={item.images[currentImageIndices[item.id] || 0]} 
                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700"
                alt=""
              />
              {item.images.length > 1 && (
                <button 
                  onClick={(e) => goToNextImage(item.id, item.images.length, e)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
            
            {/* Content */}
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-start gap-2">
                <h3 className="text-xs font-black uppercase tracking-tight line-clamp-1">{item.title}</h3>
                <Badge className="bg-white/5 text-[8px] uppercase tracking-widest border-white/10">
                  {item.category}
                </Badge>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {item.tags.slice(0, 2).map((tag: string) => (
                  <span key={tag} className="text-[9px] font-bold text-white/30 uppercase tracking-tighter">#{tag}</span>
                ))}
              </div>
              
              {/* ADMIN ACTIONS */}
              <div className="pt-4 flex gap-2 border-t border-white/5">
                <button 
                  onClick={() => setItemToEdit(item)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                >
                  <Edit3 className="w-3 h-3" /> Edit
                </button>
                <button 
                  onClick={() => setItemToDelete(item)}
                  className="px-4 py-3 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 3. EDIT MODAL (LIQUID GLASS OVERLAY) */}
      <AnimatePresence>
        {itemToEdit && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl" 
              onClick={() => setItemToEdit(null)}
            />
            <motion.div 
              initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}
              className="relative w-full max-w-2xl bg-[#0A0A0A] border border-white/10 rounded-[3rem] overflow-hidden"
            >
              <div className="p-10 border-b border-white/5 flex justify-between items-center">
                <h2 className="text-2xl font-black uppercase tracking-tighter italic">Modify <span className="text-white/20">Archive</span></h2>
                <button onClick={() => setItemToEdit(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X /></button>
              </div>
              <form onSubmit={handleUpdate} className="p-10 space-y-8">
                <div className="space-y-2 group">
                  <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Entry Title</Label>
                  <Input 
                    defaultValue={itemToEdit.title}
                    className="bg-transparent border-0 border-b border-white/10 rounded-none px-0 py-4 text-xl focus-visible:ring-0 focus-visible:border-white transition-all"
                  />
                </div>
                <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Taxonomy</Label>
                        <select className="w-full bg-transparent border-b border-white/10 py-4 text-sm font-bold uppercase outline-none focus:border-white">
                            {categories.filter(c => c !== 'All').map(c => <option key={c} value={c} className="bg-black">{c}</option>)}
                        </select>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Tags (CSV)</Label>
                        <Input defaultValue={itemToEdit.tags.join(', ')} className="bg-transparent border-0 border-b border-white/10 rounded-none px-0 py-4 text-sm font-bold focus-visible:ring-0" />
                    </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Brief Description</Label>
                  <Textarea defaultValue={itemToEdit.description} className="bg-transparent border-white/10 rounded-2xl p-4 text-sm min-h-[120px] focus-visible:ring-0 focus-visible:border-white" />
                </div>
                <Button className="w-full py-8 rounded-full bg-white text-black font-black uppercase tracking-widest hover:bg-white/90">
                   <Save className="mr-2 w-4 h-4" /> Commit Changes
                </Button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. DELETE CONFIRMATION (INTIMIDATING MODAL) */}
      <AnimatePresence>
        {itemToDelete && (
          <div className="fixed inset-0 z-[160] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-red-950/20 backdrop-blur-md" onClick={() => setItemToDelete(null)} />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-sm bg-[#0A0A0A] border border-red-500/20 rounded-[2.5rem] p-10 text-center"
            >
              <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
                <AlertTriangle className="w-10 h-10 text-red-500" />
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tighter mb-2">Erase Archive?</h2>
              <p className="text-sm text-white/40 mb-10 font-light">
                You are about to permanently delete <span className="text-white font-bold italic">"{itemToDelete.title}"</span>. This action cannot be reversed.
              </p>
              <div className="space-y-3">
                <button onClick={handleDelete} className="w-full py-4 rounded-full bg-red-500 text-white font-black uppercase tracking-widest hover:bg-red-600 transition-colors">
                  Confirm Deletion
                </button>
                <button onClick={() => setItemToDelete(null)} className="w-full py-4 rounded-full bg-white/5 text-white/40 font-black uppercase tracking-widest hover:bg-white/10 transition-colors text-[10px]">
                  Abort Mission
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardPortfolio;