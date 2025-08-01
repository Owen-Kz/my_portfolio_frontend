import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Eye, ChevronLeft, ChevronRight, X } from "lucide-react";

const Portfolio = () => {
  // State management
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [currentImageIndices, setCurrentImageIndices] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [autoSlide, setAutoSlide] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const modalRef = useRef(null);

  // Constants
  const itemsPerPage = 6;
  const categories = ['All', 'Branding', 'UI/UX', 'Print Design', 'Web Design', 'Illustration'];

  // Fetch portfolio items with pagination and filtering
  useEffect(() => {
    const fetchPortfolioItems = async () => {
      try {
        setIsLoading(true);
        const categoryParam = selectedCategory === 'All' ? '' : `&category=${selectedCategory}`;
        const response = await fetch(
          `https://manga.asfischolar.org/files?page=${currentPage}&limit=${itemsPerPage}${categoryParam}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch portfolio items');
        }
        
        const data = await response.json();
        
        // Update items based on whether it's a new category or pagination
        if (currentPage === 1) {
          setPortfolioItems(data.items);
        } else {
          setPortfolioItems(prevItems => [...prevItems, ...data.items]);
        }
        
        setTotalPages(data.pagination.totalPages);
        
        // Initialize image indices for new items
        const newIndices = {...currentImageIndices};
        data.items.forEach(item => {
          if (!newIndices[item.id]) {
            newIndices[item.id] = 0;
          }
        });
        setCurrentImageIndices(newIndices);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching portfolio items:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortfolioItems();
  }, [currentPage, selectedCategory]);

  // Reset to first page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  // Handle auto slide in modal
  useEffect(() => {
    let interval;
    if (isModalOpen && autoSlide && portfolioItems.length > 0) {
      interval = setInterval(() => {
        const currentItem = portfolioItems[currentItemIndex];
        setCurrentImageIndices(prev => ({
          ...prev,
          [currentItem.id]: (prev[currentItem.id] + 1) % currentItem.images.length
        }));
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isModalOpen, autoSlide, currentItemIndex, portfolioItems]);

  // Navigation functions
  const loadMoreItems = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const openModal = (index) => {
    setCurrentItemIndex(index);
    setIsModalOpen(true);
    setAutoSlide(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setAutoSlide(false);
  };

  const goToPrevItem = () => {
    setCurrentItemIndex(prev => 
      prev === 0 ? portfolioItems.length - 1 : prev - 1
    );
  };

  const goToNextItem = () => {
    setCurrentItemIndex(prev => 
      prev === portfolioItems.length - 1 ? 0 : prev + 1
    );
  };

  const goToPrevImage = (itemId) => {
    setCurrentImageIndices(prev => {
      const currentItem = portfolioItems.find(item => item.id === itemId);
      return {
        ...prev,
        [itemId]: prev[itemId] === 0 ? currentItem.images.length - 1 : prev[itemId] - 1
      };
    });
  };

  const goToNextImage = (itemId) => {
    setCurrentImageIndices(prev => {
      const currentItem = portfolioItems.find(item => item.id === itemId);
      return {
        ...prev,
        [itemId]: (prev[itemId] + 1) % currentItem.images.length
      };
    });
  };

  const toggleAutoSlide = () => {
    setAutoSlide(prev => !prev);
  };

  // Touch event handlers
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (portfolioItems.length === 0) return;
    const currentItem = portfolioItems[currentItemIndex];
    if (touchStart - touchEnd > 100) {
      goToNextImage(currentItem.id);
    } else if (touchStart - touchEnd < -100) {
      goToPrevImage(currentItem.id);
    }
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);

  // Loading and error states
  if (isLoading && currentPage === 1) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-creative-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-center p-4">
          <p>Error loading portfolio: {error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-creative-primary text-white rounded hover:bg-creative-primary/90"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <section id="portfolio" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            My Portfolio
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A collection of my latest design projects showcasing creativity, innovation, and attention to detail.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-creative-primary text-white shadow-creative'
                  : 'bg-secondary text-secondary-foreground hover:bg-creative-primary/10 hover:text-creative-primary'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        {portfolioItems.length === 0 && !isLoading ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No portfolio items found for this category</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolioItems.map((item, index) => (
                <Card 
                  key={`${item.id}-${index}`}
                  className="group overflow-hidden border-0 shadow-soft hover:shadow-card-hover transition-all duration-500 animate-slide-up bg-gradient-card backdrop-blur-sm"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative overflow-hidden" onClick={() => openModal(index)}>
                    <div className="relative h-64 overflow-hidden">
                      {item.images.map((image, imgIndex) => (
                        <img 
                          key={imgIndex}
                          src={image} 
                          alt={`${item.title} ${imgIndex + 1}`}
                          className={`w-full h-full object-cover transition-opacity duration-500 absolute top-0 left-0 ${
                            imgIndex === currentImageIndices[item.id] ? 'opacity-100' : 'opacity-0'
                          }`}
                        />
                      ))}
                      
                      {item.images.length > 1 && (
                        <>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              goToPrevImage(item.id);
                            }}
                            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors z-10"
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              goToNextImage(item.id);
                            }}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors z-10"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </>
                      )}
                    </div>
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 right-4 flex gap-2">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            openModal(index);
                          }}
                          className="p-3 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button className="p-3 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors">
                          <ExternalLink className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-creative-primary transition-colors">
                        {item.title}
                      </h3>
                      <Badge variant="secondary" className="bg-creative-primary/10 text-creative-primary border-creative-primary/20">
                        {item.category}
                      </Badge>
                    </div>
                    
                    <p className="text-muted-foreground mb-4">{item.description}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span 
                          key={tag}
                          className="px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More Button */}
            {currentPage < totalPages && (
              <div className="mt-12 text-center">
                <button
                  onClick={loadMoreItems}
                  disabled={isLoading}
                  className="px-8 py-3 border-[2px] border-accent bg-transparent text-accent rounded-full font-medium hover:bg-accent/90 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Loading...' : 'Load More'}
                </button>
              </div>
            )}
          </>
        )}

        {/* Modal */}
        {isModalOpen && portfolioItems.length > 0 && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 text-white hover:text-creative-primary transition-colors z-50"
            >
              <X className="w-8 h-8" />
            </button>
            
            <div 
              ref={modalRef}
              className="relative max-w-6xl w-full max-h-[90vh]"
            >
              <div 
                className="relative h-[70vh] overflow-hidden rounded-lg"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <img 
                  src={portfolioItems[currentItemIndex].images[currentImageIndices[portfolioItems[currentItemIndex].id]]} 
                  alt={portfolioItems[currentItemIndex].title}
                  className="w-full h-full object-contain select-none"
                  draggable="false"
                />
                
                {portfolioItems[currentItemIndex].images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {portfolioItems[currentItemIndex].images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndices(prev => ({
                          ...prev,
                          [portfolioItems[currentItemIndex].id]: index
                        }))}
                        className={`w-3 h-3 rounded-full transition-all ${
                          index === currentImageIndices[portfolioItems[currentItemIndex].id]
                            ? 'bg-accent w-6' 
                            : 'bg-accent/50'
                        }`}
                      />
                    ))}
                  </div>
                )}
                
                <button 
                  onClick={goToPrevItem}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 rounded-full text-white hover:bg-creative-primary transition-colors z-10"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button 
                  onClick={goToNextItem}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 rounded-full text-white hover:bg-creative-primary transition-colors z-10"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
                
                <button 
                  onClick={toggleAutoSlide}
                  className={`absolute left-4 bottom-4 px-4 py-2 rounded-full z-10 ${
                    autoSlide ? 'bg-accent text-white' : 'bg-black/50 text-white'
                  }`}
                >
                  {autoSlide ? 'Pause' : 'Play'}
                </button>
                
                {portfolioItems[currentItemIndex].images.length > 1 && (
                  <div className="absolute right-4 bottom-4 px-3 py-1 bg-black/50 rounded-full text-white z-10">
                    {currentImageIndices[portfolioItems[currentItemIndex].id] + 1} / {portfolioItems[currentItemIndex].images.length}
                  </div>
                )}
              </div>
              
              <div className="mt-4 text-white">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-2xl font-bold">
                    {portfolioItems[currentItemIndex].title}
                  </h3>
                  <Badge variant="secondary" className="bg-creative-primary/10 text-creative-primary border-creative-primary/20">
                    {portfolioItems[currentItemIndex].category}
                  </Badge>
                </div>
                <p className="text-lg mb-4">{portfolioItems[currentItemIndex].description}</p>
                <div className="flex flex-wrap gap-2">
                  {portfolioItems[currentItemIndex].tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-3 py-1 text-sm bg-white/10 text-white rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;