// src/pages/dashboard/PortfolioItems.tsx
import DashboardPortfolio from '@/components/dashboard/DashboardPortfolio';
import { Button } from '@/components/ui/button';

const PortfolioItems = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Portfolio Items</h1>
        <Button asChild>
          <a href="/dashboard/upload">Add New</a>
        </Button>
      </div>
      <DashboardPortfolio />
    </div>
  );
};

export default PortfolioItems;