'use client';

import Image from 'next/image';
import Link from 'next/link';
import { NFT } from '@/types';
import { formatAddress } from '@/lib/stacks';
import { useWallet } from './wallet-provider';
import { useToast } from './toast-provider';
import { purchaseNFT } from '@/lib/stacks';
import { Heart, Eye, DollarSign, User } from 'lucide-react';
import { useState } from 'react';

interface NFTCardProps {
  nft: NFT;
}

export function NFTCard({ nft }: NFTCardProps) {
  const { isConnected, address } = useWallet();
  const toast = useToast();
  const [isLiked, setIsLiked] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);

  const isOwner = address === nft.owner;
  const canPurchase = isConnected && !isOwner && nft.isListed;
  const handlePurchase = async () => {
    if (!canPurchase || !nft.price) return;    setIsPurchasing(true);
    try {
      await purchaseNFT(nft.tokenId, nft.price, nft.owner, address!);
      toast.success('Purchase Initiated!', 'Please confirm the transaction in your wallet.');
    } catch (error: any) {
      console.error('Purchase failed:', error);
      
      // Handle specific error types with user-friendly messages
      if (error.message && (error.message.includes('User rejected') || error.message.includes('user rejected'))) {
        // User cancelled - this is normal behavior, no error UI needed
        console.log('User cancelled the purchase transaction');
      } else if (error.message && error.message.includes('Insufficient funds')) {
        toast.error('Insufficient Funds', 'Please ensure you have enough STX tokens.');
      } else if (error.message && error.message.includes('network')) {
        toast.error('Network Error', 'Please check your connection and try again.');
      } else {
        toast.error('Purchase Failed', 'Please try again.');
      }
    } finally {
      setIsPurchasing(false);
    }
  };

  return (
    <div className="card group hover:shadow-lg transition-all duration-200 p-0 overflow-hidden">
      {/* NFT Image */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={nft.image}
          alt={nft.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-200"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        
        {/* Overlay actions */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex space-x-2">
            <Link
              href={`/nft/${nft.id}`}
              className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center space-x-1"
            >
              <Eye className="w-4 h-4" />
              <span>View</span>
            </Link>
            
            {canPurchase && (
              <button
                onClick={handlePurchase}
                disabled={isPurchasing}
                className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 flex items-center space-x-1"
              >
                <DollarSign className="w-4 h-4" />
                <span>{isPurchasing ? 'Buying...' : 'Buy'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Like button */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-3 right-3 w-8 h-8 bg-white bg-opacity-80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all"
        >
          <Heart 
            className={`w-4 h-4 ${isLiked ? 'text-red-500 fill-current' : 'text-gray-600'}`} 
          />
        </button>

        {/* Status badge */}
        {nft.isListed && (
          <div className="absolute top-3 left-3 bg-green-500 text-white text-xs font-medium px-2 py-1 rounded-full">
            For Sale
          </div>
        )}
      </div>

      {/* NFT Details */}
      <div className="p-4">
        {/* Title and Price */}
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 text-lg truncate flex-1">
            {nft.name}
          </h3>
          {nft.price && nft.isListed && (
            <div className="text-right ml-2">
              <div className="text-lg font-bold text-gray-900">
                {nft.price} STX
              </div>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {nft.description}
        </p>

        {/* Creator/Owner info */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <User className="w-3 h-3" />
            <span>Owner: {formatAddress(nft.owner)}</span>
          </div>
          
          {nft.royaltyPercentage > 0 && (
            <div className="text-purple-600">
              {nft.royaltyPercentage}% royalty
            </div>
          )}
        </div>

        {/* Action button */}
        <div className="mt-4">
          {canPurchase ? (
            <button
              onClick={handlePurchase}
              disabled={isPurchasing}
              className="w-full btn-primary text-sm disabled:opacity-50"
            >
              {isPurchasing ? 'Processing...' : `Buy for ${nft.price} STX`}
            </button>
          ) : nft.isListed ? (
            <div className="w-full bg-gray-100 text-gray-500 text-center py-2 rounded-lg text-sm">
              {isOwner ? 'You own this NFT' : 'Connect wallet to purchase'}
            </div>
          ) : (
            <div className="w-full bg-gray-100 text-gray-500 text-center py-2 rounded-lg text-sm">
              Not for sale
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
