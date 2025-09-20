import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { 
  Zap, 
  Users, 
  Trophy, 
  Image as ImageIcon,
  Shield,
  Coins,
  Sparkles,
  ArrowRight,
  Play
} from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Multiplayer Heists',
    description: 'Team up with 2-6 players to plan the ultimate meme heist',
    gradient: 'from-blue-500 to-purple-600',
  },
  {
    icon: Sparkles,
    title: 'AI-Generated Memes',
    description: 'Create hilarious distractions using cutting-edge AI',
    gradient: 'from-purple-500 to-pink-600',
  },
  {
    icon: Coins,
    title: 'SOL Betting',
    description: 'Place real cryptocurrency bets with Phantom wallet',
    gradient: 'from-yellow-500 to-orange-600',
  },
  {
    icon: Trophy,
    title: 'NFT Rewards',
    description: 'Mint unique "roast" NFTs for epic moments and wins',
    gradient: 'from-green-500 to-teal-600',
  },
];

const stats = [
  { label: 'Active Heists', value: '247', icon: Play },
  { label: 'Total Players', value: '12.8K', icon: Users },
  { label: 'SOL Wagered', value: '1,337', icon: Coins },
  { label: 'NFTs Minted', value: '5.2K', icon: ImageIcon },
];

export default function Index() {
  const { connected } = useWallet();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface to-background">
      {/* Hero Section */}
      <section className="relative px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Hero Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block mb-6"
          >
            <Badge className="bg-gradient-primary text-white px-4 py-2 text-sm font-semibold">
              <Shield className="w-4 h-4 mr-2" />
              Powered by Solana Blockchain
            </Badge>
          </motion.div>

          {/* Hero Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-gaming bg-clip-text text-transparent leading-tight"
          >
            The Ultimate
            <br />
            <span className="relative">
              Meme Heist
              <motion.div
                className="absolute -inset-1 bg-gradient-primary blur-lg opacity-30"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </span>
          </motion.h1>

          {/* Hero Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            Raid AI-guarded vaults with meme distractions, place SOL bets, 
            and mint legendary NFTs in this multiplayer web3 game.
          </motion.p>

          {/* Hero CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            {connected ? (
              <Link to="/lobbies">
                <Button variant="gaming" size="xl" className="group">
                  <Play className="w-5 h-5 mr-2" />
                  Start Heisting
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            ) : (
              <WalletMultiButton className="!bg-gradient-gaming !text-white hover:!opacity-90 !rounded-3xl !h-16 !px-12 !text-lg !font-bold !transition-all !shadow-gaming" />
            )}
            
            <Link to="/leaderboard">
              <Button variant="neon" size="xl">
                <Trophy className="w-5 h-5 mr-2" />
                View Leaderboard
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 w-4 h-4 bg-primary-glow rounded-full blur-sm"
            animate={{ y: [-20, 20, -20] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-40 right-20 w-6 h-6 bg-secondary-glow rounded-full blur-sm"
            animate={{ y: [20, -20, 20] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-40 left-1/4 w-3 h-3 bg-primary rounded-full blur-sm"
            animate={{ y: [-15, 15, -15] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card className="p-6 text-center bg-gradient-surface border-card-border hover:shadow-gaming transition-all">
                    <Icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                    <div className="text-2xl font-bold text-foreground mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Why VibeHeist?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the perfect blend of gaming, AI, and blockchain technology
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card className="p-8 h-full bg-gradient-surface border-card-border hover:shadow-gaming transition-all group">
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.gradient} mb-6`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-gaming bg-clip-text text-transparent">
            Ready to Join the Heist?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Connect your Phantom wallet and start creating epic meme heists with players worldwide
          </p>
          
          {!connected ? (
            <WalletMultiButton className="!bg-gradient-gaming !text-white hover:!opacity-90 !rounded-3xl !h-16 !px-12 !text-lg !font-bold !transition-all !shadow-gaming" />
          ) : (
            <Link to="/lobbies">
              <Button variant="gaming" size="xl" className="group">
                <Zap className="w-5 h-5 mr-2" />
                Enter Game Lobbies
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          )}
        </motion.div>
      </section>
    </div>
  );
}