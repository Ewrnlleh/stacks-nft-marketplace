'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles, TrendingUp, Shield } from 'lucide-react';

export function HeroSection() {
  return (
    <div className="relative bg-gradient-to-br from-primary-50 to-purple-50 rounded-2xl p-8 md:p-12 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-primary-100 rounded-full opacity-50"></div>
      <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-24 h-24 bg-purple-100 rounded-full opacity-50"></div>
      
      <div className="relative z-10 max-w-4xl">
        <div className="flex items-center space-x-2 mb-6">
          <Sparkles className="w-6 h-6 text-primary-600" />
          <span className="text-primary-600 font-semibold">Discover, Create, Trade</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          The Premier{' '}
          <span className="text-primary-600">NFT Marketplace</span>{' '}
          on Stacks
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 max-w-2xl">
          Mint, buy, and sell unique digital assets with Bitcoin-level security. 
          Join the future of decentralized digital ownership on the Stacks blockchain.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <Link 
            href="/explore"
            className="btn-primary text-lg px-8 py-3 flex items-center justify-center space-x-2"
          >
            <span>Explore NFTs</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          
          <Link 
            href="/create"
            className="btn-secondary text-lg px-8 py-3 flex items-center justify-center space-x-2"
          >
            <span>Create NFT</span>
            <Sparkles className="w-5 h-5" />
          </Link>
        </div>
        
        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Bitcoin Security</h3>
              <p className="text-sm text-gray-600">
                Secured by Bitcoin&apos;s proof-of-work consensus mechanism
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Low Fees</h3>
              <p className="text-sm text-gray-600">
                Minimal transaction costs with efficient smart contracts
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Creator Royalties</h3>
              <p className="text-sm text-gray-600">
                Automatic royalty distribution to original creators
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
