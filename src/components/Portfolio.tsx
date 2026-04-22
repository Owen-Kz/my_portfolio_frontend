import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Eye, ChevronLeft, ChevronRight, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [currentImageIndices, setCurrentImageIndices] = useState<Record<string, number>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [portfolioItems, setPortfolioItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const modalRef = useRef<HTMLDivElement>(null);

  const itemsPerPage = 6;
  const categories = ['All', 'Branding', 'UI/UX', 'Print Design', 'Web Design', 'Illustration'];

  // Data Fetching (Logic remains the same, styling changes)
  useEffect(() => {
    const fetchPortfolioItems = async () => {
      try {
        setIsLoading(true);
        const categoryParam = selectedCategory === 'All' ? '' : `&category=${selectedCategory}`;
        const response = await fetch(
          `https://manga.asfischolar.org/files?page=${currentPage}&limit=${itemsPerPage}${categoryParam}`
        );
        const data = await response.json();
        
        if (currentPage === 1) setPortfolioItems(data.items);
        else setPortfolioItems(prev => [...prev, ...data.items]);
        
        setTotalPages(data.pagination.totalPages);
        const newIndices = {...currentImageIndices};
        data.items.forEach((item: any) => {
          if (!newIndices[item.id]) newIndices[item.id] = 0;
        });
        setCurrentImageIndices(newIndices);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPortfolioItems();
  }, [currentPage, selectedCategory]);

  const openModal = (index: number) => {
    setCurrentItemIndex(index);
    setIsModalOpen(true);
  };

  const goToNextImage = (itemId: string, max: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndices(prev => ({
      ...prev,
      [itemId]: (prev[itemId] + 1) % max
    }));
  };

  return (
    <section id="portfolio" className="py-32 bg-[#050505] text-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* 1. INTIMIDATING HEADER */}
        <div className="mb-24 space-y-4">
          <span className="text-xs font-black tracking-[0.5em] text-white/30 uppercase">Selected Works</span>
          <h2 className="text-6xl md:text-9xl font-black tracking-tighter leading-none italic uppercase">
            Featured <br /> <span className="text-white/10">Projects</span>
          </h2>
        </div>

        {/* 2. LIQUID GLASS FILTER */}
        <div className="flex flex-wrap gap-3 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => { setSelectedCategory(category); setCurrentPage(1); }}
              className={`px-8 py-3 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-500 border ${
                selectedCategory === category
                  ? 'bg-white text-black border-white'
                  : 'bg-white/5 text-white/40 border-white/10 hover:border-white/40'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* 3. MODERN CURVED GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12" id="portfolio-grid">
          {portfolioItems.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index % 2 * 0.2 }}
              key={item.id}
              className="group cursor-pointer"
              onClick={() => openModal(index)}
            >
              {/* CURVED PRODUCT CARD */}
              <div className="relative aspect-[4/5] md:aspect-square overflow-hidden rounded-[3rem] bg-white/5 border border-white/10">
                <img 
                  src={item.images[currentImageIndices[item.id] || 0]} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                />
                
                {/* GLASS OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                
                {/* FLOATING CARD UI */}
                <div className="absolute top-8 left-8">
                   <Badge className="bg-white/10 backdrop-blur-md text-white border-white/20 px-4 py-1 rounded-full uppercase text-[10px] tracking-widest">
                    {item.category}
                  </Badge>
                </div>

                <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
                  <div className="space-y-2">
                    <h3 className="text-3xl font-black uppercase tracking-tighter">{item.title}</h3>
                    <div className="flex gap-2">
                       {item.tags.slice(0, 2).map((tag: string) => (
                         <span key={tag} className="text-[10px] text-white/50 uppercase tracking-widest">{tag}</span>
                       ))}
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center transform translate-y-20 group-hover:translate-y-0 transition-transform duration-500">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>

                {/* IMAGE COUNTER / NAV */}
                {item.images.length > 1 && (
                  <button 
                    onClick={(e) => goToNextImage(item.id, item.images.length, e)}
                    className="absolute top-1/2 right-6 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* LOAD MORE BUTTON */}
        {currentPage < totalPages && (
          <div className="mt-24 text-center">
            <button
              onClick={() => setCurrentPage(p => p + 1)}
              className="group relative px-12 py-5 rounded-full overflow-hidden"
            >
               <span className="relative z-10 text-xs font-black uppercase tracking-[0.3em] text-white group-hover:text-black transition-colors duration-500">
                Load More Projects
               </span>
               <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
               <div className="absolute inset-0 border border-white/20 rounded-full" />
            </button>
          </div>
        )}
      </div>

      {/* 4. CINEMATIC MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black backdrop-blur-3xl overflow-y-auto"
          >
            <div className="min-h-screen px-6 py-20 flex flex-col items-center">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="fixed top-10 right-10 p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black transition-all z-[210]"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="max-w-6xl w-full">
                <div className="mb-20 space-y-6">
                  <span className="text-white/40 font-bold uppercase tracking-widest">{portfolioItems[currentItemIndex].category}</span>
                  <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase">{portfolioItems[currentItemIndex].title}</h2>
                  <p className="text-xl md:text-2xl text-white/60 font-light max-w-3xl leading-relaxed">
                    {portfolioItems[currentItemIndex].description}
                  </p>
                </div>

                <div className="space-y-12">
                  {portfolioItems[currentItemIndex].images.map((img: string, i: number) => (
                    <div key={i} className="rounded-[4rem] overflow-hidden border border-white/10">
                      <img src={img} alt="" className="w-full h-auto" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;