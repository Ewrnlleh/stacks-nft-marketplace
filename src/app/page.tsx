import { NFTGrid } from '@/components/nft-grid'
import { HeroSection } from '@/components/hero-section'
import { StatsSection } from '@/components/stats-section'

export default function HomePage() {
  return (
    <div className="space-y-12">
      <HeroSection />
      <StatsSection />
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured NFTs</h2>
        <NFTGrid />
      </div>
    </div>
  )
}
