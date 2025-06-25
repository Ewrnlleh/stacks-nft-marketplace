'use client';

import { useEffect, useState } from 'react';
import { TrendingUp, Users, Package, DollarSign } from 'lucide-react';

interface MarketplaceStats {
  totalVolume: number;
  totalUsers: number;
  totalNFTs: number;
  floorPrice: number;
}

export function StatsSection() {
  const [stats, setStats] = useState<MarketplaceStats>({
    totalVolume: 0,
    totalUsers: 0,
    totalNFTs: 0,
    floorPrice: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch marketplace stats
    // In a real app, this would fetch from your backend or blockchain
    const fetchStats = async () => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStats({
        totalVolume: 15420,
        totalUsers: 3240,
        totalNFTs: 8650,
        floorPrice: 0.5
      });
      setIsLoading(false);
    };

    fetchStats();
  }, []);

  const statItems = [
    {
      label: 'Total Volume',
      value: isLoading ? '...' : `${stats.totalVolume.toLocaleString()} STX`,
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      label: 'Total Users',
      value: isLoading ? '...' : stats.totalUsers.toLocaleString(),
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      label: 'NFTs Listed',
      value: isLoading ? '...' : stats.totalNFTs.toLocaleString(),
      icon: Package,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      label: 'Floor Price',
      value: isLoading ? '...' : `${stats.floorPrice} STX`,
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {statItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <div
            key={index}
            className="card text-center transform hover:scale-105 transition-transform duration-200"
          >
            <div className={`inline-flex items-center justify-center w-12 h-12 ${item.bgColor} rounded-lg mb-3`}>
              <Icon className={`w-6 h-6 ${item.color}`} />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {item.value}
            </div>
            <div className="text-sm text-gray-600">
              {item.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}
