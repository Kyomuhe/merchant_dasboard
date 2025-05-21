import React, { useState } from 'react';
import { 
  BarChart3, 
  ArrowUp, 
  ArrowDown, 
  DollarSign, 
  Package, 
  ShoppingCart, 
  Bell, 
  Clock, 
  TrendingUp, 
  Users,
  Search
} from 'lucide-react';

// Define types for our dashboard data
interface StatCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
  isPositive?: boolean;
}

interface ProductPerformanceProps {
  id: number;
  name: string;
  category: string;
  sold: number;
  revenue: number;
  inStock: number;
  trend: number;
}

interface NotificationProps {
  id: number;
  type: 'info' | 'warning' | 'success';
  message: string;
  time: string;
}

const Dashboard: React.FC = () => {
  // Mock data for demonstration
  const [period, setPeriod] = useState<'day' | 'week' | 'month' | 'year'>('week');
  
  // Summary statistics data
  const summaryStats = [
    {
      title: 'Total Revenue',
      value: '$12,458',
      change: 12.5,
      icon: <DollarSign className="w-6 h-6 text-green-500" />,
      isPositive: true
    },
    {
      title: 'Total Orders',
      value: '256',
      change: 8.2,
      icon: <ShoppingCart className="w-6 h-6 text-blue-500" />,
      isPositive: true
    },
    {
      title: 'Products Sold',
      value: '1,247',
      change: 3.1,
      icon: <Package className="w-6 h-6 text-purple-500" />,
      isPositive: true
    },
    {
      title: 'New Customers',
      value: '24',
      change: -2.4,
      icon: <Users className="w-6 h-6 text-orange-500" />,
      isPositive: false
    }
  ];

  // Product performance data
  const productPerformance: ProductPerformanceProps[] = [
    { 
      id: 1, 
      name: 'Paracetamol 500mg', 
      category: 'OTC Pain Relief',
      sold: 245, 
      revenue: 1225, 
      inStock: 780,
      trend: 8.2
    },
    { 
      id: 2, 
      name: 'Blood Pressure Monitor', 
      category: 'Medical Devices',
      sold: 32, 
      revenue: 3840, 
      inStock: 15,
      trend: 12.5
    },
    { 
      id: 3, 
      name: 'Vitamin C 1000mg', 
      category: 'Supplements',
      sold: 187, 
      revenue: 1870, 
      inStock: 340,
      trend: -2.8
    },
    { 
      id: 4, 
      name: 'Insulin Pen', 
      category: 'Prescription',
      sold: 56, 
      revenue: 2240, 
      inStock: 42,
      trend: 4.7
    },
    { 
      id: 5, 
      name: 'N95 Face Mask (10 pack)', 
      category: 'PPE',
      sold: 124, 
      revenue: 1240, 
      inStock: 250,
      trend: -6.3
    }
  ];

  // Component for individual stat cards
  const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon, isPositive = true }) => (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
        <div className="p-2 rounded-full bg-gray-50">{icon}</div>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
          <div className="flex items-center mt-2">
            {isPositive ? (
              <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
            ) : (
              <ArrowDown className="w-4 h-4 text-red-500 mr-1" />
            )}
            <span className={`text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {Math.abs(change)}% {period}
            </span>
          </div>
        </div>
        <div className="h-10 w-16">
          <BarChart3 className="text-gray-300 w-full h-full" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Merchant Dashboard</h1>
          <p className="text-gray-500">Welcome back! Here's what's happening with your store.</p>
        </div>
        <div className="flex space-x-4">
          <div className="flex bg-white rounded-lg shadow-sm p-1">
            <button 
              className={`px-3 py-1 rounded-md ${period === 'day' ? 'bg-blue-100 text-blue-600' : 'text-gray-500'}`}
              onClick={() => setPeriod('day')}
            >
              Day
            </button>
            <button 
              className={`px-3 py-1 rounded-md ${period === 'week' ? 'bg-blue-100 text-blue-600' : 'text-gray-500'}`}
              onClick={() => setPeriod('week')}
            >
              Week
            </button>
            <button 
              className={`px-3 py-1 rounded-md ${period === 'month' ? 'bg-blue-100 text-blue-600' : 'text-gray-500'}`}
              onClick={() => setPeriod('month')}
            >
              Month
            </button>
            <button 
              className={`px-3 py-1 rounded-md ${period === 'year' ? 'bg-blue-100 text-blue-600' : 'text-gray-500'}`}
              onClick={() => setPeriod('year')}
            >
              Year
            </button>
          </div>
        </div>
      </div>

      {/* Summary Statistics */}
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Summary Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {summaryStats.map((stat, index) => (
          <StatCard 
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
            isPositive={stat.isPositive}
          />
        ))}
      </div>

      {/* Product Performance */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Product Performance</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="pl-8 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Units Sold
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  In Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trend
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {productPerformance.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{product.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.sold}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${product.revenue.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.inStock}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {product.trend >= 0 ? (
                        <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
                      ) : (
                        <ArrowDown className="w-4 h-4 text-red-500 mr-1" />
                      )}
                      <span className={`text-sm ${product.trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {Math.abs(product.trend)}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;