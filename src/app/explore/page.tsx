import { NFTGrid } from '@/components/nft-grid'
import { FilterSidebar } from '@/components/filter-sidebar'
import { SortDropdown } from '@/components/sort-dropdown'
import { SearchBar } from '@/components/search-bar'

export default function ExplorePage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Explore NFTs</h1>
        <p className="text-gray-600 text-lg">
          Discover unique digital assets from creators around the world
        </p>
      </div>

      {/* Search and filters */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <SearchBar />
        </div>
        <div className="flex-shrink-0">
          <SortDropdown />
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters sidebar */}
        <div className="lg:col-span-1">
          <FilterSidebar />
        </div>

        {/* NFT grid */}
        <div className="lg:col-span-3">
          <NFTGrid />
        </div>
      </div>
    </div>
  )
}
