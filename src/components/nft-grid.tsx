'use client';

import { useEffect, useState } from 'react';
import { NFTCard } from '@/components/nft-card';
import { NFT } from '@/types';
import { Loader2, Package } from 'lucide-react';

export function NFTGrid() {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch NFTs
    // In a real app, this would fetch from your backend or blockchain
    const fetchNFTs = async () => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock NFT data
      const mockNFTs: NFT[] = [
        {
          id: '1',
          tokenId: 1,
          name: 'Cosmic Wanderer #001',
          description: 'A beautiful digital artwork depicting a cosmic traveler exploring the universe.',
          image: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=400&fit=crop',
          owner: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
          creator: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
          price: 2.5,
          isListed: true,
          listingId: 'listing-1',
          royaltyPercentage: 5,
          metadata: {
            attributes: [
              { trait_type: 'Background', value: 'Space' },
              { trait_type: 'Character', value: 'Astronaut' },
              { trait_type: 'Rarity', value: 'Legendary' }
            ]
          },
          createdAt: '2024-01-15T10:30:00Z'
        },
        {
          id: '2',
          tokenId: 2,
          name: 'Digital Genesis #002',
          description: 'The beginning of a new digital era captured in this unique NFT.',
          image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&h=400&fit=crop',
          owner: 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG',
          creator: 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG',
          price: 1.8,
          isListed: true,
          listingId: 'listing-2',
          royaltyPercentage: 7.5,
          metadata: {
            attributes: [
              { trait_type: 'Style', value: 'Abstract' },
              { trait_type: 'Color Scheme', value: 'Neon' },
              { trait_type: 'Rarity', value: 'Rare' }
            ]
          },
          createdAt: '2024-01-14T14:20:00Z'
        },
        {
          id: '3',
          tokenId: 3,
          name: 'Neon Dreams #003',
          description: 'A vibrant collection of neon colors and geometric shapes.',
          image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=400&fit=crop',
          owner: 'ST3NBRSFKX28FQ2ZJ1MAKX58HKHSDGNV5N7R21XCP',
          creator: 'ST3NBRSFKX28FQ2ZJ1MAKX58HKHSDGNV5N7R21XCP',
          price: 3.2,
          isListed: true,
          listingId: 'listing-3',
          royaltyPercentage: 10,
          metadata: {
            attributes: [
              { trait_type: 'Pattern', value: 'Geometric' },
              { trait_type: 'Brightness', value: 'High' },
              { trait_type: 'Rarity', value: 'Epic' }
            ]
          },
          createdAt: '2024-01-13T09:15:00Z'
        },
        {
          id: '4',
          tokenId: 4,
          name: 'Pixel Paradise #004',
          description: 'A nostalgic pixel art piece reminiscent of classic video games.',
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
          owner: 'ST1HTBVD3JG9C05J7HBJTHGR0GGW7KXW28M5JS8QE',
          creator: 'ST1HTBVD3JG9C05J7HBJTHGR0GGW7KXW28M5JS8QE',
          isListed: false,
          royaltyPercentage: 5,
          metadata: {
            attributes: [
              { trait_type: 'Style', value: 'Pixel Art' },
              { trait_type: 'Theme', value: 'Retro Gaming' },
              { trait_type: 'Rarity', value: 'Common' }
            ]
          },
          createdAt: '2024-01-12T16:45:00Z'
        },
        {
          id: '5',
          tokenId: 5,
          name: 'Ethereal Landscape #005',
          description: 'A dreamlike landscape that blurs the line between reality and imagination.',
          image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
          owner: 'ST2NEB84ASENDXKYGJPQW86YXQCEFEX2ZQPG87ND',
          creator: 'ST2NEB84ASENDXKYGJPQW86YXQCEFEX2ZQPG87ND',
          price: 4.5,
          isListed: true,
          listingId: 'listing-5',
          royaltyPercentage: 8,
          metadata: {
            attributes: [
              { trait_type: 'Mood', value: 'Ethereal' },
              { trait_type: 'Environment', value: 'Landscape' },
              { trait_type: 'Rarity', value: 'Legendary' }
            ]
          },
          createdAt: '2024-01-11T11:30:00Z'
        },
        {
          id: '6',
          tokenId: 6,
          name: 'Abstract Flow #006',
          description: 'Flowing abstract patterns that create a sense of movement and energy.',
          image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop',
          owner: 'ST39MJ145BR6S8C315AG2BD61SJ16E208P1FDK3AK',
          creator: 'ST39MJ145BR6S8C315AG2BD61SJ16E208P1FDK3AK',
          price: 1.2,
          isListed: true,
          listingId: 'listing-6',
          royaltyPercentage: 6,
          metadata: {
            attributes: [
              { trait_type: 'Pattern', value: 'Flow' },
              { trait_type: 'Movement', value: 'Dynamic' },
              { trait_type: 'Rarity', value: 'Uncommon' }
            ]
          },
          createdAt: '2024-01-10T13:20:00Z'
        }
      ];
      
      setNfts(mockNFTs);
      setIsLoading(false);
    };

    fetchNFTs();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading NFTs...</p>
        </div>
      </div>
    );
  }

  if (nfts.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Package className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No NFTs Found</h3>
        <p className="text-gray-600">Be the first to mint an NFT on our marketplace!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {nfts.map((nft) => (
        <NFTCard key={nft.id} nft={nft} />
      ))}
    </div>
  );
}
