import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { LobbyCard, type LobbyData } from '@/components/game/LobbyCard';
import { CreateLobbyModal } from '@/components/game/CreateLobbyModal';
import { FilterBar, type FilterOptions } from '@/components/game/FilterBar';
import { motion, AnimatePresence } from 'framer-motion';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Plus, Zap, Users, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data - replace with actual API calls
const mockLobbies: LobbyData[] = [
  {
    id: '1',
    name: 'Epic Meme Vault Raid',
    host: 'CyberNinja42',
    players: 3,
    maxPlayers: 6,
    betAmount: 0.5,
    difficulty: 'Hard',
    status: 'waiting',
  },
  {
    id: '2',
    name: 'Beginner Friendly Heist',
    host: 'MemeQueen',
    players: 2,
    maxPlayers: 4,
    betAmount: 0.1,
    difficulty: 'Easy',
    status: 'starting',
    timeLeft: 15,
  },
  {
    id: '3',
    name: 'High Stakes Vault Break',
    host: 'DiamondHands',
    players: 5,
    maxPlayers: 6,
    betAmount: 2.0,
    difficulty: 'Insane',
    status: 'in-progress',
  },
  {
    id: '4',
    name: 'Weekend Warriors',
    host: 'VibeCheck',
    players: 1,
    maxPlayers: 4,
    betAmount: 0.25,
    difficulty: 'Medium',
    status: 'waiting',
  },
];

const initialFilters: FilterOptions = {
  search: '',
  difficulty: 'all',
  status: 'all',
  minBet: 0,
  maxBet: 0,
  maxPlayers: 'all',
};

export default function Lobbies() {
  const { connected } = useWallet();
  const { toast } = useToast();
  const [lobbies, setLobbies] = useState<LobbyData[]>(mockLobbies);
  const [filteredLobbies, setFilteredLobbies] = useState<LobbyData[]>(mockLobbies);
  const [filters, setFilters] = useState<FilterOptions>(initialFilters);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Calculate active filters count
  const activeFiltersCount = Object.entries(filters).reduce((count, [key, value]) => {
    if (key === 'search' && value) return count + 1;
    if (key === 'difficulty' && value !== 'all') return count + 1;
    if (key === 'status' && value !== 'all') return count + 1;
    if (key === 'maxPlayers' && value !== 'all') return count + 1;
    if ((key === 'minBet' || key === 'maxBet') && value > 0) return count + 1;
    return count;
  }, 0);

  // Apply filters
  useEffect(() => {
    let filtered = [...lobbies];

    if (filters.search) {
      filtered = filtered.filter(lobby => 
        lobby.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        lobby.host.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.difficulty !== 'all') {
      filtered = filtered.filter(lobby => lobby.difficulty === filters.difficulty);
    }

    if (filters.status !== 'all') {
      filtered = filtered.filter(lobby => lobby.status === filters.status);
    }

    if (filters.maxPlayers !== 'all') {
      filtered = filtered.filter(lobby => lobby.maxPlayers === parseInt(filters.maxPlayers));
    }

    if (filters.minBet > 0) {
      filtered = filtered.filter(lobby => lobby.betAmount >= filters.minBet);
    }

    if (filters.maxBet > 0) {
      filtered = filtered.filter(lobby => lobby.betAmount <= filters.maxBet);
    }

    setFilteredLobbies(filtered);
  }, [lobbies, filters]);

  const handleJoinLobby = (lobbyId: string) => {
    if (!connected) {
      toast({
        title: 'Wallet Not Connected',
        description: 'Please connect your Phantom wallet to join a heist.',
        variant: 'destructive',
      });
      return;
    }

    // TODO: Implement actual join logic with backend
    toast({
      title: 'Joining Heist...',
      description: 'Preparing to enter the lobby. Place your bet!',
    });
  };

  const handleViewLobby = (lobbyId: string) => {
    // TODO: Navigate to lobby view/spectate page
    toast({
      title: 'Viewing Lobby',
      description: 'Opening lobby details...',
    });
  };

  const handleCreateLobby = (lobbyData: {
    name: string;
    maxPlayers: number;
    betAmount: number;
    difficulty: string;
  }) => {
    if (!connected) {
      toast({
        title: 'Wallet Not Connected',
        description: 'Please connect your Phantom wallet to create a heist.',
        variant: 'destructive',
      });
      return;
    }

    // TODO: Implement actual create logic with backend
    const newLobby: LobbyData = {
      id: Date.now().toString(),
      name: lobbyData.name,
      host: 'You', // Replace with actual username
      players: 1,
      maxPlayers: lobbyData.maxPlayers,
      betAmount: lobbyData.betAmount,
      difficulty: lobbyData.difficulty as 'Easy' | 'Medium' | 'Hard' | 'Insane',
      status: 'waiting',
    };

    setLobbies(prev => [newLobby, ...prev]);
    toast({
      title: 'Heist Created!',
      description: `"${lobbyData.name}" is ready for players to join.`,
    });
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // TODO: Fetch fresh data from backend
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: 'Lobbies Refreshed',
        description: 'Latest heist data loaded.',
      });
    }, 1000);
  };

  const clearFilters = () => {
    setFilters(initialFilters);
  };

  if (!connected) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto"
        >
          <Zap className="h-16 w-16 mx-auto mb-6 text-primary" />
          <h1 className="text-2xl font-bold mb-4 text-foreground">
            Connect Your Wallet
          </h1>
          <p className="text-muted-foreground mb-8">
            Connect your Phantom wallet to access game lobbies and start heisting!
          </p>
          <WalletMultiButton className="!bg-gradient-primary !text-white hover:!bg-gradient-primary hover:!opacity-90 !rounded-2xl !h-12 !px-8 !font-semibold" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface to-background p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold mb-2 bg-gradient-gaming bg-clip-text text-transparent">
              Active Heists
            </h1>
            <p className="text-muted-foreground flex items-center">
              <Users className="h-4 w-4 mr-2" />
              {filteredLobbies.length} lobbies available
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="group"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-300'}`} />
              Refresh
            </Button>
            <Button
              variant="gaming"
              onClick={() => setShowCreateModal(true)}
              className="group"
            >
              <Plus className="h-4 w-4 mr-2 group-hover:rotate-90 transition-transform" />
              Create Heist
            </Button>
          </div>
        </motion.div>

        {/* Filter Bar */}
        <FilterBar
          filters={filters}
          onFiltersChange={setFilters}
          activeFiltersCount={activeFiltersCount}
          onClearFilters={clearFilters}
        />

        {/* Lobbies Grid */}
        <div className="mt-8">
          <AnimatePresence mode="wait">
            {filteredLobbies.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12"
              >
                <Zap className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2 text-foreground">No Heists Found</h3>
                <p className="text-muted-foreground mb-6">
                  {activeFiltersCount > 0 
                    ? 'Try adjusting your filters to find more lobbies.'
                    : 'Be the first to create a heist!'
                  }
                </p>
                {activeFiltersCount > 0 ? (
                  <Button variant="outline" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                ) : (
                  <Button variant="gaming" onClick={() => setShowCreateModal(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create First Heist
                  </Button>
                )}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredLobbies.map((lobby) => (
                  <LobbyCard
                    key={lobby.id}
                    lobby={lobby}
                    onJoin={handleJoinLobby}
                    onView={handleViewLobby}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Create Lobby Modal */}
      <CreateLobbyModal
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
        onCreateLobby={handleCreateLobby}
      />
    </div>
  );
}