// src/pages/dashboard/DashboardHome.tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import DashboardPortfolio from '@/components/dashboard/DashboardPortfolio';
import { useApiClient } from "@/utils/apiClient";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
        setTotalItems(response.total);
      } catch (err) {
        console.error('Failed to fetch total items:', err);
        setError('Failed to load portfolio count');
      } finally {
        setLoading(false);
      }
    };

    fetchTotalItems();
  }, [get]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Portfolio Items</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="animate-pulse">
                <div className="h-8 w-16 bg-gray-200 rounded"></div>
              </div>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <>
                <p className="text-xl font-bold">{totalItems}</p>
                <Button variant="link" className="p-0 mt-2">
                  View All
                </Button>
              </>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold">5</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Upload New</CardTitle>
          </CardHeader>
          <CardContent>
            <Button  onClick={() => navigate('/dashboard/upload')}>
             Upload Item
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Items Section */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Portfolio Items</h2>
        <DashboardPortfolio />
      </div>
    </div>
  );
};

export default DashboardHome;