// src/components/dashboard/DevDashboardItems.tsx
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, ChevronLeft, ChevronRight, Globe, Smartphone, Code, Server } from "lucide-react";
import { useApiClient } from "@/utils/apiClient";

const DevDashboardItems = () => {
    const { get } = useApiClient();
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentImageIndices, setCurrentImageIndices] = useState({});

  const itemsPerPage = 8;
  const categories = ['All', 'Websites', 'Web Apps', 'Mobile Apps', 'E-commerce', 'Dashboard', 'API', 'Full-Stack'];

  const getProjectTypeIcon = (type) => {
    switch (type) {
      case 'website': return <Globe className="w-4 h-4" />;
      case 'webapp': return <Code className="w-4 h-4" />;
      case 'mobile': return <Smartphone className="w-4 h-4" />;
      case 'api': return <Server className="w-4 h-4" />;
      default: return <Code className="w-4 h-4" />;
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'Live': { color: 'bg-green-100 text-green-800 border-green-200' },
      'Demo': { color: 'bg-blue-100 text-blue-800 border-blue-200' },
      'Development': { color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
      'Maintenance': { color: 'bg-purple-100 text-purple-800 border-purple-200' }
    };
    
    return statusConfig[status] || { color: 'bg-gray-100 text-gray-800 border-gray-200' };
  };

  useEffect(() => {
    const fetchPortfolioItems = async () => {
      try {
        setIsLoading(true);
        const categoryParam = selectedCategory === 'All' ? '' : `&category=${selectedCategory}`;
        const response = await get(
          `/getDevPortfolioItems?page=${currentPage}&limit=${itemsPerPage}${categoryParam}`
        );
        console.log(response)
        
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
      {/* Category Filter - Updated for development */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              setCurrentPage(1);
            }}
            className={`px-4 py-2 text-sm rounded-full transition-colors ${
              selectedCategory === category
                ? 'bg-creative-primary text-white shadow-sm'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {portfolioItems.map((item) => {
          const statusBadge = getStatusBadge(item.status);
          
          return (
            <Card key={item.id} className="relative group hover:shadow-lg transition-shadow duration-300">
              <div className="relative aspect-video overflow-hidden rounded-t-lg bg-gray-50">
                {item.images && item.images.length > 0 ? (
                  <>
                    {item.images.map((image, imgIndex) => (
                      <img 
                        key={imgIndex}
                        src={image.url} 
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
                          className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 bg-black/50 rounded-full text-white hover:bg-black/70 z-10 transition-colors"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            goToNextImage(item.id);
                          }}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-black/50 rounded-full text-white hover:bg-black/70 z-10 transition-colors"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                    <div className="text-center text-gray-400">
                      {getProjectTypeIcon(item.type)}
                      <p className="text-xs mt-1">No preview</p>
                    </div>
                  </div>
                )}
                
                {/* Project Type Badge */}
                <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-1 bg-black/70 rounded text-white text-xs">
                  {getProjectTypeIcon(item.type)}
                  <span className="capitalize">{item.type}</span>
                </div>
                
                {/* Status Badge */}
                <div className="absolute top-2 right-2">
                  <Badge className={`text-xs border ${statusBadge.color}`}>
                    {item.status}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-sm line-clamp-1 flex-1 mr-2">{item.title}</h3>
                  <Badge variant="outline" className="text-xs bg-gray-50">
                    {item.category}
                  </Badge>
                </div>
                
                <p className="text-xs text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                
                {/* Technologies */}
                <div className="mb-3 flex flex-wrap gap-1">
                  {item.technologies && item.technologies.slice(0, 3).map((tech) => (
                    <span 
                      key={tech}
                      className="px-2 py-0.5 text-xs bg-blue-50 text-blue-700 rounded-full border border-blue-100"
                    >
                      {tech}
                    </span>
                  ))}
                  {item.technologies && item.technologies.length > 3 && (
                    <span className="px-2 py-0.5 text-xs text-gray-400">+{item.technologies.length - 3}</span>
                  )}
                </div>
                
                {/* Project Info */}
                <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                  <span>{item.year}</span>
                  {item.url && (
                    <a 
                      href={item.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-creative-primary hover:underline"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
                
                {/* Action Buttons */}
                <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                  <button className="text-xs text-creative-primary hover:underline font-medium">
                    Edit
                  </button>
                  <button className="text-xs text-red-500 hover:underline font-medium">
                    Delete
                  </button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Load More */}
      {currentPage < totalPages && (
        <div className="flex justify-center">
          <button
            onClick={() => setCurrentPage(prev => prev + 1)}
            disabled={isLoading}
            className="px-6 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50 disabled:opacity-50 transition-colors"
          >
            {isLoading ? 'Loading...' : 'Load More Projects'}
          </button>
        </div>
      )}
    </div>
  );
};

export default DevDashboardItems;