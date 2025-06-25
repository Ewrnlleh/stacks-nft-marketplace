'use client';

import { useWallet } from './wallet-provider';
import { formatAddress } from '@/lib/stacks';
import { Wallet, LogOut, Plus, Search } from 'lucide-react';
import Link from 'next/link';

export function Navbar() {
  const { isConnected, address, connect, disconnect, isClient } = useWallet();

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Stacks NFT</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/explore" 
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Explore
            </Link>
            <Link 
              href="/collections" 
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Collections
            </Link>
            <Link 
              href="/create" 
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Create
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search NFTs, collections, or users..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>

          {/* Wallet Connection */}
          <div className="flex items-center space-x-4">
            {!isClient ? (
              // Show a loading state during hydration to prevent mismatch
              <div className="btn-primary flex items-center space-x-2 opacity-50">
                <Wallet className="w-4 h-4" />
                <span>Loading...</span>
              </div>
            ) : isConnected ? (
              <div className="flex items-center space-x-4">
                <Link 
                  href="/create" 
                  className="btn-primary flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create</span>
                </Link>
                
                <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2">
                  <Wallet className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-900">
                    {formatAddress(address || '')}
                  </span>
                </div>
                
                <button
                  onClick={disconnect}
                  className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                  title="Disconnect Wallet"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={connect}
                className="btn-primary flex items-center space-x-2"
              >
                <Wallet className="w-4 h-4" />
                <span>Connect Wallet</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
