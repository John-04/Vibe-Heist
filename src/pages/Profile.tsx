import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import {
  User,
  Trophy,
  Coins,
  Image as ImageIcon,
  Zap,
  Target,
  Calendar,
  ExternalLink,
  Copy,
  Star,
  Shield,
  Crown,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

// Mock user data - replace with actual API calls
const mockUserStats = {
  username: "VibeHunter",
  walletAddress: "FxYZ...abc123",
  totalHeists: 47,
  heistsWon: 31,
  totalEarned: 12.45,
  nftsMinted: 18,
  rank: "Elite Heister",
  level: 12,
  xp: 2340,
  xpToNext: 500,
  joinDate: "2024-03-15",
  winRate: 65.9,
  favoriteMode: "Medium Difficulty",
  longestStreak: 8,
};

const mockRecentGames = [
  {
    id: 1,
    name: "Epic Vault Raid",
    result: "Won",
    earned: 1.2,
    date: "2024-03-20",
    difficulty: "Hard",
  },
  {
    id: 2,
    name: "Meme Factory Heist",
    result: "Lost",
    earned: -0.5,
    date: "2024-03-19",
    difficulty: "Medium",
  },
  {
    id: 3,
    name: "Crypto Cave",
    result: "Won",
    earned: 0.8,
    date: "2024-03-18",
    difficulty: "Easy",
  },
];

const mockNFTs = [
  {
    id: 1,
    name: "Epic Roast #1337",
    image: "/placeholder.svg",
    rarity: "Legendary",
    mintDate: "2024-03-20",
  },
  {
    id: 2,
    name: "Victory Meme #420",
    image: "/placeholder.svg",
    rarity: "Rare",
    mintDate: "2024-03-19",
  },
  {
    id: 3,
    name: "Heist Master #69",
    image: "/placeholder.svg",
    rarity: "Epic",
    mintDate: "2024-03-15",
  },
];

const achievements = [
  {
    name: "First Heist",
    description: "Complete your first heist",
    unlocked: true,
    icon: Target,
  },
  {
    name: "Meme Master",
    description: "Create 100 memes",
    unlocked: true,
    icon: ImageIcon,
  },
  {
    name: "Win Streak",
    description: "Win 5 heists in a row",
    unlocked: true,
    icon: Star,
  },
  {
    name: "Big Spender",
    description: "Bet over 10 SOL total",
    unlocked: false,
    icon: Coins,
  },
];

export default function Profile() {
  const { connected, publicKey } = useWallet();
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState("overview");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [loadingProfileImage, setLoadingProfileImage] = useState(false);
  const navigate = useNavigate();

  const copyAddress = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey.toString());
      toast({
        title: "Address Copied",
        description: "Wallet address copied to clipboard",
      });
    }
  };

  const generateProfileImage = async () => {
    if (loadingProfileImage) return;
    
    setLoadingProfileImage(true);
    try {
      const prompt = `Gaming profile avatar for ${mockUserStats.username}, ${mockUserStats.rank}, cyberpunk style, neon colors, futuristic tech, digital art, professional gaming portrait, clean background, high quality`;
      
      const response = await fetch('https://gvrabsrytextpwaxxwnf.supabase.co/functions/v1/generate-meme-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt })
      });

      if (!response.ok) {
        throw new Error('Failed to generate profile image');
      }

      const data = await response.json();
      setProfileImage(data.image);
      
      toast({
        title: "Profile Image Generated!",
        description: "Your new AI-generated profile image is ready.",
      });
    } catch (error) {
      console.error('Error generating profile image:', error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate profile image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoadingProfileImage(false);
    }
  };

  // Generate profile image on component mount
  React.useEffect(() => {
    if (connected && !profileImage) {
      generateProfileImage();
    }
  }, [connected, profileImage]);

  if (!connected) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto"
        >
          <User className="h-16 w-16 mx-auto mb-6 text-primary" />
          <h1 className="text-2xl font-bold mb-4 text-foreground">
            Connect Your Wallet
          </h1>
          <p className="text-muted-foreground mb-8">
            Connect your Phantom wallet to view your profile and heist history.
          </p>
          <WalletMultiButton className="!bg-gradient-primary !text-white hover:!bg-gradient-primary hover:!opacity-90 !rounded-2xl !h-12 !px-8 !font-semibold" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface to-background p-4">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="p-8 bg-gradient-surface border-card-border shadow-gaming">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Avatar and Basic Info */}
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="relative">
                  <Avatar className="w-24 h-24 border-4 border-primary/20">
                    {profileImage ? (
                      <AvatarImage src={profileImage} />
                    ) : loadingProfileImage ? (
                      <div className="w-full h-full flex items-center justify-center bg-muted">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                      </div>
                    ) : (
                      <AvatarFallback className="bg-gradient-primary text-white text-2xl font-bold">
                        VH
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={generateProfileImage}
                    disabled={loadingProfileImage}
                    className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                  >
                    {loadingProfileImage ? (
                      <div className="animate-spin rounded-full h-3 w-3 border border-primary border-t-transparent"></div>
                    ) : (
                      <Zap className="w-4 h-4" />
                    )}
                  </Button>
                </div>

                <div className="text-center md:text-left">
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-2xl font-bold text-foreground">
                      {mockUserStats.username}
                    </h1>
                    <Badge className="bg-gradient-primary text-white">
                      <Crown className="w-3 h-3 mr-1" />
                      Level {mockUserStats.level}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <span className="text-sm">
                      {mockUserStats.walletAddress}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={copyAddress}
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>

                  <Badge variant="secondary" className="mb-2">
                    <Shield className="w-3 h-3 mr-1" />
                    {mockUserStats.rank}
                  </Badge>

                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Experience</span>
                      <span>
                        {mockUserStats.xp}/
                        {mockUserStats.xp + mockUserStats.xpToNext} XP
                      </span>
                    </div>
                    <Progress
                      value={
                        (mockUserStats.xp /
                          (mockUserStats.xp + mockUserStats.xpToNext)) *
                        100
                      }
                      className="w-48"
                    />
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 min-w-0">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {mockUserStats.totalHeists}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Total Heists
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-success">
                    {mockUserStats.heistsWon}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Heists Won
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">
                    {mockUserStats.totalEarned}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    SOL Earned
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {mockUserStats.nftsMinted}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    NFTs Minted
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Profile Tabs */}
        <Tabs
          value={selectedTab}
          onValueChange={setSelectedTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-4 bg-surface">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="nfts">NFT Collection</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Detailed Stats */}
              <Card className="p-6 bg-gradient-surface border-card-border">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Trophy className="w-5 h-5 mr-2 text-primary" />
                  Performance Stats
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Win Rate</span>
                    <span className="font-semibold text-success">
                      {mockUserStats.winRate}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">
                      Longest Win Streak
                    </span>
                    <span className="font-semibold">
                      {mockUserStats.longestStreak} games
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">
                      Favorite Difficulty
                    </span>
                    <Badge variant="secondary">
                      {mockUserStats.favoriteMode}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Member Since</span>
                    <span className="font-semibold">
                      {mockUserStats.joinDate}
                    </span>
                  </div>
                </div>
              </Card>

              {/* Quick Actions */}
              <Card className="p-6 bg-gradient-surface border-card-border">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-primary" />
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <Button variant="gaming" className="w-full justify-start">
                    <Target className="w-4 h-4 mr-2" />
                    Join Random Heist
                  </Button>
                  <Button
                    onClick={() => navigate("/nft-gallery")}
                    variant="neon"
                    className="w-full justify-start"
                  >
                    <ImageIcon className="w-4 h-4 mr-2" />
                    View NFT Gallery
                  </Button>
                  <Button
                    onClick={() => navigate("/leaderboard")}
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <Trophy className="w-4 h-4 mr-2" />
                    View Leaderboard
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View on Solscan
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history">
            <Card className="p-6 bg-gradient-surface border-card-border">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-primary" />
                Recent Games
              </h3>
              <div className="space-y-4">
                {mockRecentGames.map((game, index) => (
                  <motion.div
                    key={game.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-surface rounded-xl border border-border"
                  >
                    <div>
                      <div className="font-medium text-foreground">
                        {game.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {game.date} • {game.difficulty} Difficulty
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        className={`mb-1 ${
                          game.result === "Won"
                            ? "bg-success text-success-foreground"
                            : "bg-danger text-danger-foreground"
                        }`}
                      >
                        {game.result}
                      </Badge>
                      <div
                        className={`text-sm font-semibold ${
                          game.earned > 0 ? "text-success" : "text-danger"
                        }`}
                      >
                        {game.earned > 0 ? "+" : ""}
                        {game.earned} SOL
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* NFTs Tab */}
          <TabsContent value="nfts">
            <Card className="p-6 bg-gradient-surface border-card-border">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <ImageIcon className="w-5 h-5 mr-2 text-primary" />
                NFT Collection
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {mockNFTs.map((nft, index) => (
                  <motion.div
                    key={nft.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-surface rounded-xl p-4 border border-border hover:shadow-gaming transition-all"
                  >
                    <div className="aspect-square bg-muted rounded-lg mb-3 flex items-center justify-center">
                      <ImageIcon className="w-12 h-12 text-muted-foreground" />
                    </div>
                    <div className="space-y-2">
                      <div className="font-medium text-foreground">
                        {nft.name}
                      </div>
                      <Badge className="bg-gradient-primary text-white text-xs">
                        {nft.rarity}
                      </Badge>
                      <div className="text-xs text-muted-foreground">
                        Minted: {nft.mintDate}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements">
            <Card className="p-6 bg-gradient-surface border-card-border">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Trophy className="w-5 h-5 mr-2 text-primary" />
                Achievements
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <motion.div
                      key={achievement.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-4 rounded-xl border transition-all ${
                        achievement.unlocked
                          ? "bg-surface border-primary/20 shadow-glow"
                          : "bg-muted/50 border-border opacity-60"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-lg ${
                            achievement.unlocked
                              ? "bg-gradient-primary text-white"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-medium text-foreground">
                            {achievement.name}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {achievement.description}
                          </div>
                        </div>
                        {achievement.unlocked && (
                          <Badge className="ml-auto bg-success text-success-foreground">
                            Unlocked
                          </Badge>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
