'use client';

import { useState } from 'react';
import { ChevronDown, Filter } from 'lucide-react';

interface FilterState {
  priceRange: [number, number];
  status: string[];
  collections: string[];
  traits: { [key: string]: string[] };
}

export function FilterSidebar() {
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 100],
    status: [],
    collections: [],
    traits: {}
  });

  const [expandedSections, setExpandedSections] = useState({
    status: true,
    price: true,
    collections: false,
    traits: false
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleStatusChange = (status: string) => {
    setFilters(prev => ({
      ...prev,
      status: prev.status.includes(status)
        ? prev.status.filter(s => s !== status)
        : [...prev.status, status]
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      priceRange: [0, 100],
      status: [],
      collections: [],
      traits: {}
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
          <Filter className="w-5 h-5" />
          <span>Filters</span>
        </h3>
        <button
          onClick={clearAllFilters}
          className="text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          Clear All
        </button>
      </div>

      {/* Status Filter */}
      <div className="border-b border-gray-200 pb-4">
        <button
          onClick={() => toggleSection('status')}
          className="flex items-center justify-between w-full text-left"
        >
          <span className="font-medium text-gray-900">Status</span>
          <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${expandedSections.status ? 'rotate-180' : ''}`} />
        </button>
        
        {expandedSections.status && (
          <div className="mt-3 space-y-2">
            {[
              { label: 'Buy Now', value: 'listed' },
              { label: 'On Auction', value: 'auction' },
              { label: 'New', value: 'new' },
              { label: 'Has Offers', value: 'offers' }
            ].map((status) => (
              <label key={status.value} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.status.includes(status.value)}
                  onChange={() => handleStatusChange(status.value)}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">{status.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className="border-b border-gray-200 pb-4">
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full text-left"
        >
          <span className="font-medium text-gray-900">Price Range (STX)</span>
          <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${expandedSections.price ? 'rotate-180' : ''}`} />
        </button>
        
        {expandedSections.price && (
          <div className="mt-3 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Min</label>
                <input
                  type="number"
                  value={filters.priceRange[0]}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    priceRange: [parseFloat(e.target.value) || 0, prev.priceRange[1]]
                  }))}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Max</label>
                <input
                  type="number"
                  value={filters.priceRange[1]}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    priceRange: [prev.priceRange[0], parseFloat(e.target.value) || 100]
                  }))}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
                  placeholder="100"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <button 
                onClick={() => setFilters(prev => ({ ...prev, priceRange: [0, 1] }))}
                className="w-full text-left text-sm text-gray-600 hover:text-gray-900 py-1"
              >
                Under 1 STX
              </button>
              <button 
                onClick={() => setFilters(prev => ({ ...prev, priceRange: [1, 5] }))}
                className="w-full text-left text-sm text-gray-600 hover:text-gray-900 py-1"
              >
                1-5 STX
              </button>
              <button 
                onClick={() => setFilters(prev => ({ ...prev, priceRange: [5, 10] }))}
                className="w-full text-left text-sm text-gray-600 hover:text-gray-900 py-1"
              >
                5-10 STX
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Collections Filter */}
      <div className="border-b border-gray-200 pb-4">
        <button
          onClick={() => toggleSection('collections')}
          className="flex items-center justify-between w-full text-left"
        >
          <span className="font-medium text-gray-900">Collections</span>
          <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${expandedSections.collections ? 'rotate-180' : ''}`} />
        </button>
        
        {expandedSections.collections && (
          <div className="mt-3 space-y-2">
            {[
              'Cosmic Wanderers',
              'Digital Genesis',
              'Neon Dreams',
              'Pixel Paradise',
              'Ethereal Landscapes'
            ].map((collection) => (
              <label key={collection} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">{collection}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Traits Filter */}
      <div>
        <button
          onClick={() => toggleSection('traits')}
          className="flex items-center justify-between w-full text-left"
        >
          <span className="font-medium text-gray-900">Traits</span>
          <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${expandedSections.traits ? 'rotate-180' : ''}`} />
        </button>
        
        {expandedSections.traits && (
          <div className="mt-3 space-y-3">
            {/* Background */}
            <div>
              <span className="text-sm font-medium text-gray-700">Background</span>
              <div className="mt-1 space-y-1">
                {['Space', 'Abstract', 'Geometric', 'Landscape'].map((trait) => (
                  <label key={trait} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-600">{trait}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Rarity */}
            <div>
              <span className="text-sm font-medium text-gray-700">Rarity</span>
              <div className="mt-1 space-y-1">
                {['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'].map((trait) => (
                  <label key={trait} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-600">{trait}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
