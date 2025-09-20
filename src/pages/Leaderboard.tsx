import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Medal, 
  Crown, 
  Zap, 
  Coins, 
  Target, 
  Calendar,
  TrendingUp,
  Users,
  Star
} from 'lucide-react';

// Mock leaderboard data
const mockLeaderboard = [
  {
    rank: 1,
    username: 'MemeKing42',
    avatar: '/placeholder.svg',
    totalWins: 156,
    winRate: 87.2,
    totalEarned: 234.56,
    level: 25,
    streak: 12,
    nftsMinted: 45,
  },
  {
    rank: 2,
    username: 'CryptoNinja',
    avatar: '/placeholder.svg',
    totalWins: 143,
    winRate: 82.1,
    totalEarned: 198.32,
    level: 23,
    streak: 8,
    nftsMinted: 38,
  },
  {
    rank: 3,
    username: 'VibeQueen',
    avatar: '/placeholder.svg',
    totalWins: 128,
    winRate: 79.5,
    totalEarned: 187.45,
    level: 22,
    streak: 15,
    nftsMinted: 42,
  },
  {
    rank: 4,
    username: 'DiamondHeister',
    avatar: '/placeholder.svg',
    totalWins: 112,
    winRate: 76.8,
    totalEarned: 156.78,
    level: 20,
    streak: 5,
    nftsMinted: 29,
  },
  {
    rank: 5,
    username: 'MemeLord',
    avatar: '/placeholder.svg',
    totalWins: 98,
    winRate: 74.2,
    totalEarned: 143.22,
    level: 19,
    streak: 3,
    nftsMinted: 33,
  },
];

const mockWeeklyStats = {
  totalGames: 1247,
  totalPlayers: 8934,
  totalWagered: 12456.78,
  biggestWin: 45.67,
  topStreak: 18,
};

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Crown className="w-6 h-6 text-yellow-500" />;
    case 2:
      return <Medal className="w-6 h-6 text-gray-400" />;
    case 3:
      return <Medal className="w-6 h-6 text-orange-600" />;
    default:
      return <span className="w-6 h-6 flex items-center justify-center text-sm font-bold text-muted-foreground">#{rank}</span>;
  }
};

const getRankColor = (rank: number) => {
  switch (rank) {
    case 1:
      return 'from-yellow-500/20 to-yellow-600/5 border-yellow-500/30';
    case 2:
      return 'from-gray-400/20 to-gray-500/5 border-gray-400/30';
    case 3:
      return 'from-orange-500/20 to-orange-600/5 border-orange-500/30';
    default:
      return 'from-primary/10 to-primary/5 border-primary/20';
  }
};

export default function Leaderboard() {
  const [selectedTab, setSelectedTab] = useState('all-time');
  const [selectedCategory, setSelectedCategory] = useState('wins');
  const [generatedAvatars, setGeneratedAvatars] = useState<Record<string, string>>({});
  const [loadingAvatars, setLoadingAvatars] = useState(false);

  // Generate profile images for top players
  useEffect(() => {
    generateProfileImages();
  }, []);

  const generateProfileImages = async () => {
    setLoadingAvatars(true);
    try {
      const { AIService } = await import('@/services/aiService');
      const topPlayers = mockLeaderboard.slice(0, 5); // Generate for top 5
      
      const avatarPromises = topPlayers.map(async (player) => {
        try {
          const profileImage = await AIService.generateProfileImage(player.username, player.rank);
          return { username: player.username, image: profileImage.image };
        } catch (error) {
          console.error(`Failed to generate avatar for ${player.username}:`, error);
          return { username: player.username, image: null };
        }
      });

      const results = await Promise.all(avatarPromises);
      const avatarMap: Record<string, string> = {};
      results.forEach(result => {
        if (result.image) {
          avatarMap[result.username] = result.image;
        }
      });
      
      setGeneratedAvatars(avatarMap);
    } catch (error) {
      console.error('Error generating profile images:', error);
    } finally {
      setLoadingAvatars(false);
    }
  };

  const sortedPlayers = [...mockLeaderboard].sort((a, b) => {
    switch (selectedCategory) {
      case 'wins':
        return b.totalWins - a.totalWins;
      case 'winrate':
        return b.winRate - a.winRate;
      case 'earnings':
        return b.totalEarned - a.totalEarned;
      case 'streak':
        return b.streak - a.streak;
      default:
        return a.rank - b.rank;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface to-background p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Trophy className="h-16 w-16 text-primary" />
              <div className="absolute inset-0 bg-primary-glow blur-lg opacity-50" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-gaming bg-clip-text text-transparent">
            Leaderboard
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See who's dominating the meme heist scene and climbing the ranks
          </p>
        </motion.div>

        {/* Weekly Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card className="p-6 bg-gradient-surface border-card-border shadow-gaming">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-primary" />
              This Week's Stats
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{mockWeeklyStats.totalGames.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total Games</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">{mockWeeklyStats.totalPlayers.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Players</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success">{mockWeeklyStats.totalWagered.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">SOL Wagered</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-warning">{mockWeeklyStats.biggestWin}</div>
                <div className="text-sm text-muted-foreground">Biggest Win</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{mockWeeklyStats.topStreak}</div>
                <div className="text-sm text-muted-foreground">Top Streak</div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Leaderboard Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <TabsList className="grid grid-cols-3 bg-surface">
              <TabsTrigger value="all-time">All Time</TabsTrigger>
              <TabsTrigger value="weekly">This Week</TabsTrigger>
              <TabsTrigger value="monthly">This Month</TabsTrigger>
            </TabsList>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === 'wins' ? 'gaming' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('wins')}
              >
                <Target className="w-4 h-4 mr-2" />
                Wins
              </Button>
              <Button
                variant={selectedCategory === 'winrate' ? 'gaming' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('winrate')}
              >
                <Star className="w-4 h-4 mr-2" />
                Win Rate
              </Button>
              <Button
                variant={selectedCategory === 'earnings' ? 'gaming' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('earnings')}
              >
                <Coins className="w-4 h-4 mr-2" />
                Earnings
              </Button>
              <Button
                variant={selectedCategory === 'streak' ? 'gaming' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('streak')}
              >
                <Zap className="w-4 h-4 mr-2" />
                Streak
              </Button>
            </div>
          </div>

          <TabsContent value={selectedTab} className="space-y-4">
            {/* Top 3 Podium */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid md:grid-cols-3 gap-4 mb-8"
            >
              {sortedPlayers.slice(0, 3).map((player, index) => {
                const actualRank = index + 1;
                return (
                  <motion.div
                    key={player.username}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative ${actualRank === 1 ? 'md:order-2' : actualRank === 2 ? 'md:order-1' : 'md:order-3'}`}
                  >
                    <Card className={`p-6 text-center bg-gradient-to-br ${getRankColor(actualRank)} border shadow-gaming`}>
                      {/* Rank Badge */}
                      <div className="flex justify-center mb-4">
                        {getRankIcon(actualRank)}
                      </div>

                      {/* Avatar */}
                      <Avatar className="w-16 h-16 mx-auto mb-4 border-4 border-primary/20">
                        <AvatarImage src={generatedAvatars[player.username] || player.avatar} />
                        <AvatarFallback className="bg-gradient-primary text-white font-bold">
                          {loadingAvatars ? (
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                          ) : (
                            player.username.slice(0, 2).toUpperCase()
                          )}
                        </AvatarFallback>
                      </Avatar>

                      {/* Player Info */}
                      <h3 className="font-bold text-lg text-foreground mb-1">
                        {player.username}
                      </h3>
                      <Badge className="mb-3 bg-gradient-primary text-white">
                        Level {player.level}
                      </Badge>

                      {/* Stats */}
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Wins:</span>
                          <span className="font-semibold">{player.totalWins}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Win Rate:</span>
                          <span className="font-semibold text-success">{player.winRate.toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Earned:</span>
                          <span className="font-semibold text-secondary">{player.totalEarned.toFixed(2)} SOL</span>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Full Leaderboard */}
            <Card className="bg-gradient-surface border-card-border">
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-primary" />
                  Full Rankings
                </h2>
                
                <div className="space-y-3">
                  {sortedPlayers.map((player, index) => (
                    <motion.div
                      key={player.username}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center justify-between p-4 bg-surface rounded-xl border border-border hover:shadow-medium transition-all"
                    >
                      <div className="flex items-center gap-4">
                        {/* Rank */}
                        <div className="w-8 flex justify-center">
                          {getRankIcon(index + 1)}
                        </div>

                        {/* Avatar & Name */}
                        <Avatar className="w-10 h-10 border-2 border-primary/20">
                          <AvatarImage src={generatedAvatars[player.username] || player.avatar} />
                          <AvatarFallback className="bg-gradient-primary text-white text-sm font-bold">
                            {loadingAvatars ? (
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            ) : (
                              player.username.slice(0, 2).toUpperCase()
                            )}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div>
                          <div className="font-semibold text-foreground">{player.username}</div>
                          <div className="text-sm text-muted-foreground">Level {player.level}</div>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-6 text-sm">
                        <div className="text-center">
                          <div className="font-semibold text-foreground">{player.totalWins}</div>
                          <div className="text-muted-foreground">Wins</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-success">{player.winRate.toFixed(1)}%</div>
                          <div className="text-muted-foreground">Rate</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-secondary">{player.totalEarned.toFixed(2)}</div>
                          <div className="text-muted-foreground">SOL</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-warning">{player.streak}</div>
                          <div className="text-muted-foreground">Streak</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}