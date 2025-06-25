import { CollectionGrid } from '@/components/collection-grid'

export default function CollectionsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Collections</h1>
        <p className="text-gray-600 text-lg">
          Discover curated collections from top creators and artists
        </p>
      </div>

      {/* Collections Grid */}
      <CollectionGrid />
    </div>
  )
}
