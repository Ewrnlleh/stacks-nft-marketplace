'use client';

import { useState } from 'react';
import { useWallet } from '@/components/wallet-provider';
import { useToast } from '@/components/toast-provider';
import { mintNFT } from '@/lib/stacks';
import { Upload, Image as ImageIcon, Sparkles, Info } from 'lucide-react';

export default function CreatePage() {
  const { isConnected, address } = useWallet();
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    royaltyPercentage: 5,
  });
  const [isUploading, setIsUploading] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'royaltyPercentage' ? parseFloat(value) : value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      
      // In a real app, you'd upload to IPFS or a cloud storage service
      // For demo purposes, we'll create a local preview
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setPreview(result);
        setFormData(prev => ({
          ...prev,
          image: result // In real app, this would be the IPFS hash or URL
        }));
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected || !address) {
      alert('Please connect your wallet first');
      return;
    }

    if (!formData.name || !formData.description || !formData.image) {
      alert('Please fill in all required fields');
      return;
    }

    setIsMinting(true);
      try {      await mintNFT(
        formData.name,
        formData.description,
        formData.image,
        formData.royaltyPercentage,
        address
      );
      
      toast.success(
        'NFT Minted Successfully!', 
        'Your NFT has been created on the Stacks blockchain and will appear shortly.'
      );
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        image: '',
        royaltyPercentage: 5,
      });
      setPreview(null);    } catch (error: any) {
      console.error('Minting failed:', error);
        // Handle specific error types with user-friendly messages
      if (error.message && (error.message.includes('User rejected') || error.message.includes('user rejected'))) {
        // User cancelled - this is normal behavior, no error UI needed
        console.log('User cancelled the transaction');
      } else if (error.message && error.message.includes('JsonRpcError')) {
        toast.warning('Transaction Cancelled', 'Please try again if you want to mint this NFT.');
      } else if (error.message && error.message.includes('Insufficient funds')) {
        toast.error('Insufficient Funds', 'Please ensure you have enough STX tokens in your wallet.');
      } else if (error.message && error.message.includes('network')) {
        toast.error('Network Error', 'Please check your internet connection and try again.');
      } else {
        toast.error('Minting Failed', 'Please check your wallet connection and try again.');
      }
    } finally {
      setIsMinting(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Sparkles className="w-8 h-8 text-primary-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Connect Your Wallet</h1>
        <p className="text-gray-600 mb-8">
          You need to connect your Stacks wallet to create and mint NFTs.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Create New NFT</h1>
        <p className="text-gray-600 text-lg">
          Upload your digital artwork and mint it as an NFT on the Stacks blockchain
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Upload */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Artwork *
            </label>
            
            {preview ? (
              <div className="relative">
                <img
                  src={preview}
                  alt="NFT Preview"
                  className="w-full aspect-square object-cover rounded-lg border-2 border-gray-200"
                />
                <button
                  type="button"
                  onClick={() => {
                    setPreview(null);
                    setFormData(prev => ({ ...prev, image: '' }));
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  ×
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-400 transition-colors">
                <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <div className="space-y-2">
                  <p className="text-gray-600">
                    Drag and drop your image here, or{' '}
                    <label className="text-primary-600 hover:text-primary-700 cursor-pointer font-medium">
                      browse files
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </p>
                  <p className="text-sm text-gray-500">
                    PNG, JPG, GIF, WEBP. Max 100MB.
                  </p>
                </div>
              </div>
            )}
            
            {isUploading && (
              <div className="flex items-center justify-center py-4">
                <Upload className="w-5 h-5 animate-spin text-primary-600 mr-2" />
                <span className="text-primary-600">Uploading...</span>
              </div>
            )}
          </div>
        </div>

        {/* NFT Details */}
        <div className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g. Cosmic Wanderer #001"
              className="input-field"
              required
              maxLength={64}
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe your NFT..."
              rows={4}
              className="input-field resize-none"
              required
              maxLength={256}
            />
          </div>

          <div>
            <label htmlFor="royaltyPercentage" className="block text-sm font-medium text-gray-700 mb-2">
              Royalty Percentage
            </label>
            <div className="relative">
              <input
                type="number"
                id="royaltyPercentage"
                name="royaltyPercentage"
                value={formData.royaltyPercentage}
                onChange={handleInputChange}
                min="0"
                max="10"
                step="0.5"
                className="input-field pr-8"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
            </div>
            <div className="flex items-start space-x-2 mt-2">
              <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-600">
                Royalties are automatically paid to you on secondary sales. Maximum 10%.
              </p>
            </div>
          </div>

          {/* Mint Button */}
          <button
            type="submit"
            disabled={isMinting || isUploading || !formData.name || !formData.description || !formData.image}
            className="w-full btn-primary py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isMinting ? (
              <>
                <Upload className="w-5 h-5 animate-spin" />
                <span>Minting NFT...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Mint NFT</span>
              </>
            )}
          </button>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-blue-900 mb-1">Minting Information</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Your NFT will be minted on the Stacks testnet</li>
                  <li>• You'll retain full ownership and copyright</li>
                  <li>• Marketplace fee: 2.5% on sales</li>
                  <li>• You can list your NFT for sale after minting</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
