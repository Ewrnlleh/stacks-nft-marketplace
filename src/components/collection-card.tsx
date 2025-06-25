'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Collection } from '@/types';
import { formatAddress } from '@/lib/stacks';
import { TrendingUp, Users, Package, Eye } from 'lucide-react';

interface CollectionCardProps {
  collection: Collection;
}

export function CollectionCard({ collection }: CollectionCardProps) {
  return (
    <div className="card group hover:shadow-lg transition-all duration-200 p-0 overflow-hidden">
      {/* Collection Image */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={collection.image}
          alt={collection.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-200"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <Link
            href={`/collections/${collection.id}`}
            className="bg-white text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center space-x-2"
          >
            <Eye className="w-4 h-4" />
            <span>View Collection</span>
          </Link>
        </div>

        {/* Stats overlay */}
        <div className="absolute top-4 left-4 right-4 flex justify-between">
          <div className="bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
            {collection.totalSupply} items
          </div>
          {collection.floorPrice && (
            <div className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              Floor: {collection.floorPrice} STX
            </div>
          )}
        </div>
      </div>

      {/* Collection Details */}
      <div className="p-6">
        {/* Title and Creator */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
            {collection.name}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2 mb-3">
            {collection.description}
          </p>
          <div className="flex items-center text-xs text-gray-500">
            <Users className="w-3 h-3 mr-1" />
            <span>By {formatAddress(collection.creator)}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
          <div className="text-center">
            <div className="flex items-center justify-center text-gray-400 mb-1">
              <Package className="w-4 h-4" />
            </div>
            <div className="text-sm font-semibold text-gray-900">
              {collection.totalSupply}
            </div>
            <div className="text-xs text-gray-500">Items</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center text-gray-400 mb-1">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div className="text-sm font-semibold text-gray-900">
              {collection.volume24h} STX
            </div>
            <div className="text-xs text-gray-500">24h Volume</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center text-gray-400 mb-1">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div className="text-sm font-semibold text-gray-900">
              {collection.floorPrice || 'N/A'} STX
            </div>
            <div className="text-xs text-gray-500">Floor Price</div>
          </div>
        </div>
      </div>
    </div>
  );
}
