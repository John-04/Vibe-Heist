import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Users, Coins, Zap, Clock } from 'lucide-react';

export interface LobbyData {
  id: string;
  name: string;
  host: string;
  players: number;
  maxPlayers: number;
  betAmount: number;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Insane';
  status: 'waiting' | 'starting' | 'in-progress' | 'finished';
  timeLeft?: number;
}

interface LobbyCardProps {
  lobby: LobbyData;
  onJoin: (lobbyId: string) => void;
  onView: (lobbyId: string) => void;
}

const difficultyColors = {
  Easy: 'bg-success text-success-foreground',
  Medium: 'bg-warning text-warning-foreground',
  Hard: 'bg-secondary text-secondary-foreground',
  Insane: 'bg-danger text-danger-foreground',
};

const statusColors = {
  waiting: 'bg-muted text-muted-foreground',
  starting: 'bg-warning text-warning-foreground animate-pulse',
  'in-progress': 'bg-primary text-primary-foreground animate-pulse',
  finished: 'bg-success text-success-foreground',
};

export function LobbyCard({ lobby, onJoin, onView }: LobbyCardProps) {
  const isJoinable = lobby.status === 'waiting' && lobby.players < lobby.maxPlayers;
  const isStartingSoon = lobby.status === 'starting';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="relative p-6 bg-gradient-surface border-card-border hover:shadow-gaming transition-all">
        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <Badge className={`${statusColors[lobby.status]} text-xs font-semibold`}>
            {lobby.status.replace('-', ' ').toUpperCase()}
          </Badge>
        </div>

        {/* Lobby Info */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-bold text-foreground mb-1">{lobby.name}</h3>
            <p className="text-sm text-muted-foreground">Host: {lobby.host}</p>
          </div>

          {/* Stats Row */}
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4 text-primary" />
              <span>{lobby.players}/{lobby.maxPlayers}</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <Coins className="h-4 w-4 text-secondary" />
              <span>{lobby.betAmount} SOL</span>
            </div>
            
            <Badge className={`${difficultyColors[lobby.difficulty]} text-xs`}>
              {lobby.difficulty}
            </Badge>
          </div>

          {/* Starting Soon Timer */}
          {isStartingSoon && lobby.timeLeft && (
            <motion.div 
              className="flex items-center space-x-2 text-warning font-medium"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Clock className="h-4 w-4" />
              <span>Starting in {lobby.timeLeft}s</span>
            </motion.div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-2 pt-2">
            {isJoinable ? (
              <Button 
                variant="heist" 
                size="lg" 
                className="flex-1"
                onClick={() => onJoin(lobby.id)}
              >
                <Zap className="h-4 w-4 mr-2" />
                Join Heist
              </Button>
            ) : (
              <Button 
                variant="outline" 
                size="lg" 
                className="flex-1"
                onClick={() => onView(lobby.id)}
              >
                View Game
              </Button>
            )}
          </div>
        </div>

        {/* Glow Effect for Active Lobbies */}
        {(isJoinable || isStartingSoon) && (
          <div className="absolute inset-0 bg-gradient-primary opacity-5 rounded-2xl pointer-events-none" />
        )}
      </Card>
    </motion.div>
  );
}