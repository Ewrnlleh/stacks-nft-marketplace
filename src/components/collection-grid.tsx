'use client';

import { useEffect, useState } from 'react';
import { Collection } from '@/types';
import { CollectionCard } from './collection-card';
import { Loader2, Package } from 'lucide-react';

export function CollectionGrid() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch collections
    const fetchCollections = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockCollections: Collection[] = [
        {
          id: '1',
          name: 'Cosmic Wanderers',
          description: 'A journey through space and time captured in digital art',
          image: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=400&fit=crop',
          creator: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
          totalSupply: 1000,
          floorPrice: 2.5,
          volume24h: 125.5,
          contractAddress: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.cosmic-wanderers'
        },
        {
          id: '2',
          name: 'Digital Genesis',
          description: 'The beginning of a new digital era in blockchain art',
          image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&h=400&fit=crop',
          creator: 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG',
          totalSupply: 500,
          floorPrice: 1.8,
          volume24h: 89.2,
          contractAddress: 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG.digital-genesis'
        },
        {
          id: '3',
          name: 'Neon Dreams',
          description: 'Vibrant neon artworks that bring dreams to life',
          image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=400&fit=crop',
          creator: 'ST3NBRSFKX28FQ2ZJ1MAKX58HKHSDGNV5N7R21XCP',
          totalSupply: 750,
          floorPrice: 3.2,
          volume24h: 156.8,
          contractAddress: 'ST3NBRSFKX28FQ2ZJ1MAKX58HKHSDGNV5N7R21XCP.neon-dreams'
        },
        {
          id: '4',
          name: 'Pixel Paradise',
          description: 'Nostalgic pixel art collection with retro gaming vibes',
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
          creator: 'ST1HTBVD3JG9C05J7HBJTHGR0GGW7KXW28M5JS8QE',
          totalSupply: 300,
          floorPrice: 0.9,
          volume24h: 42.1,
          contractAddress: 'ST1HTBVD3JG9C05J7HBJTHGR0GGW7KXW28M5JS8QE.pixel-paradise'
        }
      ];
      
      setCollections(mockCollections);
      setIsLoading(false);
    };

    fetchCollections();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading collections...</p>
        </div>
      </div>
    );
  }

  if (collections.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Package className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Collections Found</h3>
        <p className="text-gray-600">Be the first to create a collection!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {collections.map((collection) => (
        <CollectionCard key={collection.id} collection={collection} />
      ))}
    </div>
  );
}
