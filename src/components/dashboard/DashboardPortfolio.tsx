// src/components/dashboard/DashboardPortfolio.tsx
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { useApiClient } from "@/utils/apiClient";
const DashboardPortfolio = () => {
    const { get } = useApiClient();
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentImageIndices, setCurrentImageIndices] = useState({});

  const itemsPerPage = 8;
  const categories = ['All', 'Branding', 'UI/UX', 'Print Design', 'Web Design', 'Illustration'];

  useEffect(() => {
    const fetchPortfolioItems = async () => {
      try {
        setIsLoading(true);
        const categoryParam = selectedCategory === 'All' ? '' : `&category=${selectedCategory}`;
        const response = await get(
          `/getMyPortfolioItems?page=${currentPage}&limit=${itemsPerPage}${categoryParam}`
        );
        // if (response.error) throw new Error('Failed to fetch portfolio items');
        
        const data = response;
      
        if (currentPage === 1) {
          setPortfolioItems(data.items);
        } else {
          setPortfolioItems(prevItems => [...prevItems, ...data.items]);
        }
        
        setTotalPages(data.total);
        
        // Initialize image indices
        const newIndices = {...currentImageIndices};
        data.items.forEach(item => {
          if (!newIndices[item.id]) {
            newIndices[item.id] = 0;
          }
        });
        setCurrentImageIndices(newIndices);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortfolioItems();
  }, [currentPage, selectedCategory]);

  const goToPrevImage = (itemId) => {
    setCurrentImageIndices(prev => ({
      ...prev,
      [itemId]: (prev[itemId] - 1 + portfolioItems.find(item => item.id === itemId).images.length) % 
                portfolioItems.find(item => item.id === itemId).images.length
    }));
  };

  const goToNextImage = (itemId) => {
    setCurrentImageIndices(prev => ({
      ...prev,
      [itemId]: (prev[itemId] + 1) % portfolioItems.find(item => item.id === itemId).images.length
    }));
  };

  if (isLoading && currentPage === 1) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-creative-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        <p>Error loading portfolio: {error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-creative-primary text-white rounded hover:bg-creative-primary/90"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Category Filter - Simplified for dashboard */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              setCurrentPage(1);
            }}
            className={`px-4 py-2 text-sm rounded-full ${
              selectedCategory === category
                ? 'bg-creative-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {portfolioItems.map((item) => (
          <Card key={item.id} className="relative group">
            <div className="relative aspect-square overflow-hidden rounded-t-lg">
              {item.images.map((image, imgIndex) => (
                <img 
                  key={imgIndex}
                  src={image} 
                  alt={`${item.title} ${imgIndex + 1}`}
                  className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-300 ${
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
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 bg-black/50 rounded-full text-white hover:bg-black/70 z-10"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      goToNextImage(item.id);
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-black/50 rounded-full text-white hover:bg-black/70 z-10"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
            
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <h3 className="font-medium text-sm line-clamp-1">{item.title}</h3>
                <Badge variant="outline" className="text-xs">
                  {item.category}
                </Badge>
              </div>
              
              <div className="mt-2 flex flex-wrap gap-1">
                {item.tags.slice(0, 3).map((tag) => (
                  <span 
                    key={tag}
                    className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
                {item.tags.length > 3 && (
                  <span className="px-2 py-0.5 text-xs text-gray-400">+{item.tags.length - 3}</span>
                )}
              </div>
              
              <div className="mt-3 flex justify-between items-center">
                <button className="text-xs text-creative-primary hover:underline">
                  Edit
                </button>
                <button className="text-xs text-red-500 hover:underline">
                  Delete
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      {currentPage < totalPages && (
        <div className="flex justify-center">
          <button
            onClick={() => setCurrentPage(prev => prev + 1)}
            disabled={isLoading}
            className="px-6 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50 disabled:opacity-50"
          >
            {isLoading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
};

export default DashboardPortfolio;