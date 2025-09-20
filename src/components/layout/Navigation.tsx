import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { motion } from 'framer-motion';
import { 
  Home, 
  Users, 
  Trophy, 
  Image as ImageIcon, 
  User,
  Zap
} from 'lucide-react';

const navItems = [
  { label: 'Home', path: '/', icon: Home },
  { label: 'Lobbies', path: '/lobbies', icon: Users },
  { label: 'Leaderboard', path: '/leaderboard', icon: Trophy },
  { label: 'NFT Gallery', path: '/nft-gallery', icon: ImageIcon },
  { label: 'Profile', path: '/profile', icon: User },
];

export function Navigation() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative">
              <Zap className="h-8 w-8 text-primary" />
              <div className="absolute inset-0 bg-primary-glow blur-sm opacity-50" />
            </div>
            <span className="text-xl font-bold bg-gradient-gaming bg-clip-text text-transparent">
              VibeHeist
            </span>
          </motion.div>
        </Link>

        {/* Navigation Items */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive ? "ghost-gaming" : "ghost"}
                  size="sm"
                  className={`relative ${isActive ? 'text-primary-glow' : ''}`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {item.label}
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-primary rounded-full"
                      layoutId="activeTab"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Button>
              </Link>
            );
          })}
        </nav>

        {/* Wallet Connection */}
        <div className="flex items-center space-x-4">
          <WalletMultiButton 
            className="!bg-gradient-primary !text-white hover:!bg-gradient-primary hover:!opacity-90 !rounded-2xl !h-11 !px-6 !font-semibold !transition-all !shadow-glow"
          />
        </div>
      </div>
    </header>
  );
}