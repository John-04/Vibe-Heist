import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Image as ImageIcon, 
  Search, 
  Filter, 
  ExternalLink,
  Heart,
  Star,
  Trophy,
  Sparkles,
  Eye
} from 'lucide-react';

// Mock NFT data
const mockNFTs = [
  {
    id: 1,
    name: 'Epic Roast #1337',
    image: '/placeholder.svg',
    rarity: 'Legendary',
    rarityColor: 'from-yellow-400 to-yellow-600',
    owner: 'MemeKing42',
    price: 5.67,
    likes: 234,
    views: 1250,
    mintDate: '2024-03-20',
    description: 'A legendary roast NFT from the infamous Crypto Vault heist',
    attributes: [
      { trait: 'Boss Defeated', value: 'AI Overlord' },
      { trait: 'Heist Type', value: 'Legendary Vault' },
      { trait: 'Meme Quality', value: 'God Tier' },
      { trait: 'Player Count', value: '6' },
    ],
  },
  {
    id: 2,
    name: 'Victory Meme #420',
    image: '/placeholder.svg',
    rarity: 'Epic',
    rarityColor: 'from-purple-400 to-purple-600',
    owner: 'VibeQueen',
    price: 2.34,
    likes: 156,
    views: 890,
    mintDate: '2024-03-19',
    description: 'An epic victory meme celebrating a flawless heist execution',
    attributes: [
      { trait: 'Boss Defeated', value: 'Meme Guardian' },
      { trait: 'Heist Type', value: 'Speed Run' },
      { trait: 'Meme Quality', value: 'Epic' },
      { trait: 'Player Count', value: '4' },
    ],
  },
  {
    id: 3,
    name: 'Heist Master #69',
    image: '/placeholder.svg',
    rarity: 'Rare',
    rarityColor: 'from-blue-400 to-blue-600',
    owner: 'CryptoNinja',
    price: 1.23,
    likes: 89,
    views: 567,
    mintDate: '2024-03-18',
    description: 'A rare commemorative NFT for completing your first heist',
    attributes: [
      { trait: 'Boss Defeated', value: 'Security Bot' },
      { trait: 'Heist Type', value: 'Training Vault' },
      { trait: 'Meme Quality', value: 'Rare' },
      { trait: 'Player Count', value: '2' },
    ],
  },
  {
    id: 4,
    name: 'Dank Distraction #1001',
    image: '/placeholder.svg',
    rarity: 'Common',
    rarityColor: 'from-green-400 to-green-600',
    owner: 'MemeLord',
    price: 0.45,
    likes: 67,
    views: 234,
    mintDate: '2024-03-17',
    description: 'A solid common NFT showing great teamwork and strategy',
    attributes: [
      { trait: 'Boss Defeated', value: 'Basic AI' },
      { trait: 'Heist Type', value: 'Practice Run' },
      { trait: 'Meme Quality', value: 'Solid' },
      { trait: 'Player Count', value: '3' },
    ],
  },
];

const rarityOrder = ['Legendary', 'Epic', 'Rare', 'Common'];

export default function NFTGallery() {
  const [nfts, setNfts] = useState(mockNFTs);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRarity, setSelectedRarity] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [selectedNFT, setSelectedNFT] = useState<typeof mockNFTs[0] | null>(null);
  const [loadingMemes, setLoadingMemes] = useState(false);
  const [generatedMemes, setGeneratedMemes] = useState<Record<number, string>>({});

  // Generate memes for NFTs on component mount
  useEffect(() => {
    generateMemesForNFTs();
  }, []);

  const generateMemesForNFTs = async () => {
    setLoadingMemes(true);
    try {
      const { AIService } = await import('@/services/aiService');
      const memePromises = mockNFTs.map(async (nft) => {
        try {
          const meme = await AIService.generateNFTMeme({
            name: nft.name,
            rarity: nft.rarity,
            attributes: nft.attributes
          });
          return { id: nft.id, image: meme.image };
        } catch (error) {
          console.error(`Failed to generate meme for NFT ${nft.id}:`, error);
          return { id: nft.id, image: null };
        }
      });

      const results = await Promise.all(memePromises);
      const memeMap: Record<number, string> = {};
      results.forEach(result => {
        if (result.image) {
          memeMap[result.id] = result.image;
        }
      });
      
      setGeneratedMemes(memeMap);
    } catch (error) {
      console.error('Error generating NFT memes:', error);
    } finally {
      setLoadingMemes(false);
    }
  };

  // Filter and sort NFTs
  const filteredNFTs = nfts
    .filter(nft => {
      const matchesSearch = nft.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           nft.owner.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRarity = selectedRarity === 'all' || nft.rarity === selectedRarity;
      return matchesSearch && matchesRarity;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-high':
          return b.price - a.price;
        case 'price-low':
          return a.price - b.price;
        case 'likes':
          return b.likes - a.likes;
        case 'rarity':
          return rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity);
        default: // recent
          return new Date(b.mintDate).getTime() - new Date(a.mintDate).getTime();
      }
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface to-background p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex justify-center mb-4">
            <div className="relative">
              <ImageIcon className="h-16 w-16 text-primary" />
              <div className="absolute inset-0 bg-primary-glow blur-lg opacity-50" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-gaming bg-clip-text text-transparent">
            NFT Gallery
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover and collect unique "roast" NFTs from epic heist moments
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card className="p-6 bg-gradient-surface border-card-border">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search NFTs or owners..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-surface"
                />
              </div>

              {/* Filters */}
              <div className="flex gap-3">
                <Select value={selectedRarity} onValueChange={setSelectedRarity}>
                  <SelectTrigger className="w-32 bg-surface">
                    <SelectValue placeholder="Rarity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Rarities</SelectItem>
                    <SelectItem value="Legendary">Legendary</SelectItem>
                    <SelectItem value="Epic">Epic</SelectItem>
                    <SelectItem value="Rare">Rare</SelectItem>
                    <SelectItem value="Common">Common</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-32 bg-surface">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Most Recent</SelectItem>
                    <SelectItem value="price-high">Price High</SelectItem>
                    <SelectItem value="price-low">Price Low</SelectItem>
                    <SelectItem value="likes">Most Liked</SelectItem>
                    <SelectItem value="rarity">Rarity</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
              <div className="text-sm text-muted-foreground">
                Showing {filteredNFTs.length} of {nfts.length} NFTs
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"></div>
                  <span className="text-muted-foreground">Legendary</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full"></div>
                  <span className="text-muted-foreground">Epic</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></div>
                  <span className="text-muted-foreground">Rare</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-green-600 rounded-full"></div>
                  <span className="text-muted-foreground">Common</span>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* NFT Grid */}
        <AnimatePresence mode="wait">
          {filteredNFTs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <ImageIcon className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2 text-foreground">No NFTs Found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters to find more NFTs.
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredNFTs.map((nft, index) => (
                <motion.div
                  key={nft.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  onClick={() => setSelectedNFT(nft)}
                  className="cursor-pointer group"
                >
                  <Card className="p-4 bg-gradient-surface border-card-border hover:shadow-gaming transition-all overflow-hidden">
                    {/* NFT Image */}
                    <div className="relative aspect-square bg-muted rounded-xl mb-4 overflow-hidden">
                      {generatedMemes[nft.id] ? (
                        <img 
                          src={generatedMemes[nft.id]} 
                          alt={nft.name}
                          className="w-full h-full object-cover"
                        />
                      ) : loadingMemes ? (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        </div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageIcon className="w-16 h-16 text-muted-foreground" />
                        </div>
                      )}
                      
                      {/* Rarity Glow */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${nft.rarityColor} opacity-20 group-hover:opacity-30 transition-opacity`} />
                      
                      {/* Rarity Badge */}
                      <Badge className={`absolute top-2 left-2 bg-gradient-to-r ${nft.rarityColor} text-white`}>
                        {nft.rarity}
                      </Badge>

                      {/* Stats Overlay */}
                      <div className="absolute bottom-2 right-2 flex gap-2">
                        <div className="bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1 text-xs text-white flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          {nft.likes}
                        </div>
                        <div className="bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1 text-xs text-white flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {nft.views}
                        </div>
                      </div>
                    </div>

                    {/* NFT Info */}
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                          {nft.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">by {nft.owner}</p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-muted-foreground">Price</div>
                          <div className="font-semibold text-secondary flex items-center gap-1">
                            {nft.price} SOL
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* NFT Detail Modal */}
      <AnimatePresence>
        {selectedNFT && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedNFT(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border border-card-border rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-1">{selectedNFT.name}</h2>
                    <p className="text-muted-foreground">by {selectedNFT.owner}</p>
                  </div>
                  <Button variant="ghost" onClick={() => setSelectedNFT(null)}>
                    ✕
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Image */}
                  <div className="relative aspect-square bg-muted rounded-xl overflow-hidden">
                    {generatedMemes[selectedNFT.id] ? (
                      <img 
                        src={generatedMemes[selectedNFT.id]} 
                        alt={selectedNFT.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="w-24 h-24 text-muted-foreground" />
                      </div>
                    )}
                    <div className={`absolute inset-0 bg-gradient-to-br ${selectedNFT.rarityColor} opacity-20`} />
                  </div>

                  {/* Details */}
                  <div className="space-y-6">
                    {/* Price & Rarity */}
                    <div>
                      <Badge className={`bg-gradient-to-r ${selectedNFT.rarityColor} text-white mb-3`}>
                        {selectedNFT.rarity}
                      </Badge>
                      <div className="text-3xl font-bold text-secondary mb-2">{selectedNFT.price} SOL</div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          {selectedNFT.likes} likes
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {selectedNFT.views} views
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <h3 className="font-semibold mb-2">Description</h3>
                      <p className="text-muted-foreground text-sm">{selectedNFT.description}</p>
                    </div>

                    {/* Attributes */}
                    <div>
                      <h3 className="font-semibold mb-3">Attributes</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {selectedNFT.attributes.map((attr, index) => (
                          <div key={index} className="bg-surface rounded-lg p-3 border border-border">
                            <div className="text-xs text-muted-foreground mb-1">{attr.trait}</div>
                            <div className="font-medium text-foreground text-sm">{attr.value}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <Button variant="gaming" className="flex-1">
                        <Sparkles className="w-4 h-4 mr-2" />
                        Make Offer
                      </Button>
                      <Button variant="outline">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View on Solscan
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}