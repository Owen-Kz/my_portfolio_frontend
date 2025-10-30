import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Eye, ChevronLeft, ChevronRight, X, Play, Smartphone, Globe, Terminal } from "lucide-react";
import { motion } from "framer-motion";
import { useApiClient } from "@/utils/apiClient";

const WebPortfolio = () => {
  // State management
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activePreviewTab, setActivePreviewTab] = useState('desktop');
  const modalRef = useRef(null);
  const iframeRef = useRef(null);

  const { get } = useApiClient();

  // Constants
  const itemsPerPage = 6;
  const categories = ['All', 'Websites', 'Web Apps', 'Mobile Apps', 'E-commerce', 'Dashboard'];

  // Skeleton loader component
  const SkeletonCard = () => (
    <Card className="overflow-hidden border border-[#30363d] bg-[#161b22] animate-pulse">
      <div className="relative h-56 bg-[#21262d]">
        <div className="w-full h-full bg-[#30363d]"></div>
      </div>
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div className="h-4 bg-[#30363d] rounded w-3/4"></div>
          <div className="h-4 bg-[#30363d] rounded w-1/4"></div>
        </div>
        <div className="space-y-2 mb-4">
          <div className="h-3 bg-[#30363d] rounded"></div>
          <div className="h-3 bg-[#30363d] rounded w-5/6"></div>
        </div>
        <div className="flex justify-between items-center mb-3">
          <div className="h-3 bg-[#30363d] rounded w-1/4"></div>
          <div className="h-3 bg-[#30363d] rounded w-1/4"></div>
        </div>
        <div className="flex flex-wrap gap-1">
          <div className="h-6 bg-[#30363d] rounded w-1/4"></div>
          <div className="h-6 bg-[#30363d] rounded w-1/4"></div>
          <div className="h-6 bg-[#30363d] rounded w-1/4"></div>
        </div>
      </CardContent>
    </Card>
  );

  // Fetch portfolio items from API
  const fetchPortfolioItems = async (page = 1, category = selectedCategory) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const categoryParam = category === 'All' ? '' : `&category=${category}`;
      const response = await get(
        `/dev-portfolio?page=${page}&limit=${itemsPerPage}${categoryParam}`
      );
      
      const data = response;
      
      if (page === 1) {
        setPortfolioItems(data.items || []);
      } else {
        setPortfolioItems(prevItems => [...prevItems, ...(data.items || [])]);
      }
      
      setTotalPages(data.pagination?.totalPages || 1);
      setCurrentPage(page);
      
    } catch (err) {
      setError(err.message || "Failed to load portfolio items");
      console.error("Error fetching portfolio items:", err);
    } finally {
      setIsLoading(false);
      setIsInitialLoad(false);
    }
  };

  // Initial load and when category changes
  useEffect(() => {
    setIsInitialLoad(true);
    fetchPortfolioItems(1, selectedCategory);
  }, [selectedCategory]);

  // Load more items
  const loadMoreItems = () => {
    if (currentPage < totalPages && !isLoading) {
      fetchPortfolioItems(currentPage + 1, selectedCategory);
    }
  };

  const openModal = (index) => {
    setCurrentItemIndex(index);
    setIsModalOpen(true);
    setActivePreviewTab('desktop');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setAutoPlay(false);
  };

  const goToPrevItem = () => {
    setCurrentItemIndex(prev => prev === 0 ? portfolioItems.length - 1 : prev - 1);
    setActivePreviewTab('desktop');
  };

  const goToNextItem = () => {
    setCurrentItemIndex(prev => prev === portfolioItems.length - 1 ? 0 : prev + 1);
    setActivePreviewTab('desktop');
  };

  const toggleAutoPlay = () => setAutoPlay(prev => !prev);

  const getDeviceIcon = (type) => {
    switch (type) {
      case 'mobile': return <Smartphone className="w-4 h-4" />;
      case 'webapp': return <Globe className="w-4 h-4" />;
      case 'website': return <Globe className="w-4 h-4" />;
      default: return <Globe className="w-4 h-4" />;
    }
  };

  const getPreviewDimensions = () => {
    switch (activePreviewTab) {
      case 'desktop': return { width: '100%', height: '500px' };
      case 'tablet': return { width: '768px', height: '1024px' };
      case 'mobile': return { width: '375px', height: '667px' };
      default: return { width: '100%', height: '500px' };
    }
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (isModalOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isModalOpen]);

  // Show loading state only for initial load
  if (isInitialLoad) {
    return (
      <section id="dev-portfolio" className="py-20 bg-[#0d1117]">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header Skeleton */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Terminal className="w-8 h-8 text-[#4E9C7E]" />
              <div className="h-8 bg-[#30363d] rounded w-48"></div>
            </div>
            <div className="h-4 bg-[#30363d] rounded w-96 max-w-3xl mx-auto"></div>
          </div>

          {/* Category Filter Skeleton */}
          <div className="flex flex-wrap justify-center gap-2 mb-12 bg-[#161b22] p-2 rounded-lg border border-[#30363d]">
            {categories.map((_, index) => (
              <div key={index} className="h-8 bg-[#30363d] rounded w-24"></div>
            ))}
          </div>

          {/* Portfolio Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="dev-portfolio" className="py-20 bg-[#0d1117]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Terminal className="w-8 h-8 text-red-400" />
              <h2 className="text-2xl md:text-3xl font-bold text-white font-mono">
                $ error --loading-projects
              </h2>
            </div>
            <div className="text-red-400 text-center p-4 font-mono mb-8">
              <p>Error loading portfolio: {error}</p>
            </div>
            <button 
              onClick={() => fetchPortfolioItems(1, selectedCategory)}
              className="px-6 py-3 bg-[#4E9C7E] text-black rounded hover:bg-[#5FBB97] transition-colors font-mono"
            >
              $ retry --load-projects
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="dev-portfolio" className="py-20 bg-[#0d1117]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Terminal className="w-8 h-8 text-[#4E9C7E]" />
            <h2 className="text-2xl md:text-3xl font-bold text-white font-mono">
              $ ls -la projects/
            </h2>
          </div>
          <p className="text-lg text-[#7d8590] max-w-3xl mx-auto font-mono leading-relaxed">
            A collection of deployed applications and systems. 
            Click to explore live implementations and source code.
          </p>
        </div>

        {/* Category Filter - GitHub-style tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 bg-[#161b22] p-2 rounded-lg border border-[#30363d]">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                if (selectedCategory !== category) {
                  setSelectedCategory(category);
                }
              }}
              disabled={isLoading}
              className={`px-4 py-2 rounded font-medium text-sm transition-all duration-200 font-mono ${
                selectedCategory === category
                  ? 'bg-[#4E9C7E] text-black shadow-sm'
                  : 'bg-[#21262d] text-[#7d8590] hover:bg-[#30363d] hover:text-white'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        {portfolioItems.length === 0 && !isLoading ? (
          <div className="text-center py-20">
            <Terminal className="w-16 h-16 text-[#7d8590] mx-auto mb-4" />
            <p className="text-xl text-[#7d8590] font-mono mb-2">$ No projects found</p>
            <p className="text-[#7d8590] font-mono mb-6">
              {selectedCategory === 'All' 
                ? "No projects available in your portfolio" 
                : `No projects found in "${selectedCategory}" category`}
            </p>
            {selectedCategory !== 'All' && (
              <button
                onClick={() => setSelectedCategory('All')}
                className="px-6 py-3 border border-[#4E9C7E] bg-transparent text-[#4E9C7E] rounded font-mono hover:bg-[#4E9C7E] hover:text-black transition-colors"
              >
                $ view --all-projects
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioItems.map((item, index) => (
                <Card 
                  key={`${item.id}-${index}`}
                  className="group overflow-hidden border border-[#30363d] bg-[#161b22] hover:border-[#4E9C7E] transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-[#4E9C7E]/10"
                  onClick={() => openModal(index)}
                >
                  <div className="relative overflow-hidden">
                    <div className="relative h-56 overflow-hidden bg-[#21262d]">
                      {item.images && item.images.length > 0 ? (
                        <img 
                          src={item.images[0]?.url || item.images[0]} 
                          alt={item.images[0]?.alt_text || item.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#21262d] to-[#30363d]">
                          <div className="text-center text-[#7d8590]">
                            <Terminal className="w-8 h-8 mx-auto mb-2" />
                            <p className="text-xs font-mono">no preview</p>
                          </div>
                        </div>
                      )}
                      
                      {/* GitHub-style overlay */}
                      <div className="absolute inset-0 bg-[#0d1117]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="text-center text-white">
                          <Terminal className="w-8 h-8 mx-auto mb-2" />
                          <p className="text-sm font-mono">view --live-preview</p>
                        </div>
                      </div>

                      {/* Device Type Badge */}
                      <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 bg-[#161b22] border border-[#30363d] rounded text-white text-xs font-mono">
                        {getDeviceIcon(item.type)}
                        <span className="capitalize">{item.type}</span>
                      </div>

                      {/* Status Badge */}
                      <div className="absolute top-3 right-3">
                        <Badge 
                          className={`text-xs font-mono border-0 ${
                            item.status === 'Live' 
                              ? 'bg-[#4E9C7E] text-black'
                              : item.status === 'Demo'
                              ? 'bg-[#1f6feb] text-white'
                              : 'bg-[#8b949e] text-white'
                          }`}
                        >
                          {item.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-sm font-semibold text-white font-mono group-hover:text-[#4E9C7E] transition-colors">
                        {item.title}
                      </h3>
                      <Badge className="bg-[#30363d] text-[#7d8590] border-0 text-xs font-mono">
                        {item.category}
                      </Badge>
                    </div>
                    
                    <p className="text-[#7d8590] mb-4 text-sm line-clamp-2 font-mono leading-relaxed">
                      {item.description || "No description available"}
                    </p>
                    
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs text-[#8b949e] font-mono">{item.year}</span>
                      <div className="flex items-center gap-1 text-xs text-[#8b949e] font-mono">
                        {getDeviceIcon(item.type)}
                        <span className="capitalize">{item.type}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {item.tags && item.tags.slice(0, 3).map((tag) => (
                        <span 
                          key={tag}
                          className="px-2 py-1 text-xs bg-[#21262d] text-[#7d8590] border border-[#30363d] rounded font-mono hover:border-[#4E9C7E] hover:text-white transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                      {item.tags && item.tags.length > 3 && (
                        <span className="px-2 py-1 text-xs bg-[#21262d] text-[#8b949e] border border-[#30363d] rounded font-mono">
                          +{item.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {/* Show skeleton loaders when loading more items */}
              {isLoading && (
                Array.from({ length: 3 }).map((_, index) => (
                  <SkeletonCard key={`skeleton-${index}`} />
                ))
              )}
            </div>

            {/* Load More */}
            {currentPage < totalPages && (
              <div className="mt-12 text-center">
                <button
                  onClick={loadMoreItems}
                  disabled={isLoading} 
                  className="px-6 py-3 text-md border border-[#4E9C7E] bg-transparent text-[#4E9C7E] rounded font-mono hover:bg-[#4E9C7E] hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? '$ loading...' : '$ load_more --projects'}
                </button>
              </div>
            )}
          </>
        )}

    {/* Modal with Live Preview - GitHub terminal style */}
        {isModalOpen && portfolioItems.length > 0 && (
          <div className="fixed inset-0 bg-[#0d1117]/95 z-50 flex items-center justify-center p-4">
            <div 
              ref={modalRef}
              className="relative max-w-6xl w-full max-h-[90vh] bg-[#161b22] border border-[#30363d] rounded-lg overflow-hidden shadow-2xl"
            >
              {/* Terminal Header */}
              <div className="flex items-center justify-between p-4 bg-[#21262d] border-b border-[#30363d]">
                <div className="flex items-center gap-3">
                  {/* Terminal window controls */}
                  <div className="flex gap-2">
                             <div className="w-3 h-3 bg-[#E95420] rounded-full"></div>
                  <div className="w-3 h-3 bg-[#38B44A] rounded-full"></div>
                  <div className="w-3 h-3 bg-[#EDD64D] rounded-full"></div>
                  </div>
                  
                  <span className="text-[#7d8590] text-sm font-mono">
                    {portfolioItems[currentItemIndex].title} --preview
                  </span>
                </div>

                <button 
                  onClick={closeModal}
                  className="p-1 text-[#7d8590] hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Preview Controls */}
              <div className="flex items-center justify-between p-3 bg-[#21262d] border-b border-[#30363d]">
                <div className="flex items-center gap-4">
                  {/* Device Type Tabs */}
                  <div className="flex gap-1 bg-[#161b22] p-1 rounded border border-[#30363d]">
                    {['desktop', 'tablet', 'mobile'].map((device) => (
                      <button
                        key={device}
                        onClick={() => setActivePreviewTab(device)}
                        className={`px-3 py-1 text-xs font-mono capitalize transition-colors ${
                          activePreviewTab === device
                            ? 'bg-[#4E9C7E] text-black'
                            : 'text-[#7d8590] hover:text-white'
                        }`}
                      >
                        {device}
                      </button>
                    ))}
                  </div>

                  {/* Auto-play toggle */}
                  <button 
                    onClick={toggleAutoPlay}
                    className={`px-3 py-1 text-xs font-mono transition-colors border border-[#30363d] rounded ${
                      autoPlay ? 'bg-[#1f6feb] text-white' : 'bg-[#161b22] text-[#7d8590] hover:text-white'
                    }`}
                  >
                    {autoPlay ? '⏸️ pause' : '▶️ play'}
                  </button>
                </div>

                {/* Navigation arrows */}
                <div className="flex gap-1">
                  <button 
                    onClick={goToPrevItem}
                    className="p-2 bg-[#161b22] border border-[#30363d] text-[#7d8590] hover:text-white transition-colors font-mono text-xs"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={goToNextItem}
                    className="p-2 bg-[#161b22] border border-[#30363d] text-[#7d8590] hover:text-white transition-colors font-mono text-xs"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Live Preview Area */}
              <div className="flex-1 overflow-auto bg-white">
                <div 
                  className="mx-auto transition-all duration-300 bg-white"
                  style={getPreviewDimensions()}
                >
                  {portfolioItems[currentItemIndex].previewUrl ? (
                    <iframe
                      ref={iframeRef}
                      src={portfolioItems[currentItemIndex].previewUrl}
                      className="w-full h-full border-0"
                      title={`Live preview of ${portfolioItems[currentItemIndex].title}`}
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#21262d]">
                      <div className="text-center text-[#7d8590] font-mono">
                        <Terminal className="w-12 h-12 mx-auto mb-2 text-[#4E9C7E]" />
                        <p>Preview not available</p>
                        <p className="text-sm mt-1">$ check --live-url</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Project Details */}
              <div className="p-6 bg-[#161b22] text-[#7d8590] border-t border-[#30363d]">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-white font-mono">
                      {portfolioItems[currentItemIndex].title}
                    </h3>
                    <p className="text-[#7d8590] mb-3 font-mono leading-relaxed">
                      {portfolioItems[currentItemIndex].description}
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Badge className="bg-[#30363d] text-[#7d8590] border-0 font-mono text-xs">
                      {portfolioItems[currentItemIndex].category}
                    </Badge>
                    <Badge className={`border-0 font-mono text-xs ${
                      portfolioItems[currentItemIndex].status === 'Live' 
                        ? 'bg-[#4E9C7E] text-black'
                        : 'bg-[#1f6feb] text-white'
                    }`}>
                      {portfolioItems[currentItemIndex].status}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Technologies */}
                  <div>
                    <h4 className="font-semibold mb-2 text-white font-mono">$ technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {portfolioItems[currentItemIndex].technologies.map((tech) => (
                        <span 
                          key={tech}
                          className="px-3 py-1 text-sm bg-[#21262d] text-[#7d8590] border border-[#30363d] rounded font-mono hover:border-[#4E9C7E] hover:text-white transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <h4 className="font-semibold mb-2 text-white font-mono">$ features</h4>
                    <div className="flex flex-wrap gap-2">
                      {portfolioItems[currentItemIndex].tags.map((tag) => (
                        <span 
                          key={tag}
                          className="px-3 py-1 text-sm bg-[#21262d] text-[#7d8590] border border-[#30363d] rounded font-mono hover:border-[#4E9C7E] hover:text-white transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t border-[#30363d]">
                  <a
                    href={portfolioItems[currentItemIndex].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-[#4E9C7E] text-black rounded hover:bg-[#5FBB97] transition-colors font-mono text-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                    visit --live-site
                  </a>
                  
                  {portfolioItems[currentItemIndex].type === 'mobile' && (
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#21262d] text-[#7d8590] border border-[#30363d] rounded hover:bg-[#30363d] hover:text-white transition-colors font-mono text-sm">
                      <Smartphone className="w-4 h-4" />
                      view --app-store
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default WebPortfolio;