// src/pages/dashboard/DevDashboard.tsx
import DevDashboardItems from '@/components/dashboard/web/DevDashboardPortfolio';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const DevDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dev Portfolio Items</h1>
        <Button  onClick={() => navigate('/dashboard/upload')}>
          Add New
        </Button>
      </div>
      <DevDashboardItems />
    </div>
  );
};

export default DevDashboard;