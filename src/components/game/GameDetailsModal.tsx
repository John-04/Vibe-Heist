import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { 
  Users, 
  Coins, 
  Trophy, 
  Clock, 
  Target, 
  Zap,
  Calendar,
  User
} from 'lucide-react';
import { LobbyData } from './LobbyCard';

interface GameDetailsModalProps {
  lobby: LobbyData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onJoin: (lobbyId: string) => void;
}

export function GameDetailsModal({ lobby, open, onOpenChange, onJoin }: GameDetailsModalProps) {
  if (!lobby) return null;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'from-green-400 to-green-600';
      case 'Medium': return 'from-yellow-400 to-yellow-600';
      case 'Hard': return 'from-orange-400 to-orange-600';
      case 'Insane': return 'from-red-400 to-red-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'waiting': return 'bg-blue-500';
      case 'starting': return 'bg-yellow-500';
      case 'in-progress': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-card border-card-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-gaming bg-clip-text text-transparent">
            {lobby.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status and Host Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Badge className={`${getStatusColor(lobby.status)} text-white`}>
                {lobby.status === 'waiting' && 'Waiting for Players'}
                {lobby.status === 'starting' && 'Starting Soon'}
                {lobby.status === 'in-progress' && 'In Progress'}
              </Badge>
              <div className="flex items-center gap-1 text-muted-foreground">
                <User className="w-4 h-4" />
                <span>Hosted by {lobby.host}</span>
              </div>
            </div>
            {lobby.timeLeft && (
              <div className="flex items-center gap-1 text-primary font-semibold">
                <Clock className="w-4 h-4" />
                <span>{lobby.timeLeft}s</span>
              </div>
            )}
          </div>

          {/* Game Details Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <Card className="p-4 bg-gradient-surface border-card-border">
                <h3 className="font-semibold mb-3 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-primary" />
                  Game Settings
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Difficulty</span>
                    <Badge className={`bg-gradient-to-r ${getDifficultyColor(lobby.difficulty)} text-white`}>
                      {lobby.difficulty}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Entry Fee</span>
                    <div className="flex items-center gap-1 font-semibold text-secondary">
                      <Coins className="w-4 h-4" />
                      {lobby.betAmount} SOL
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Prize Pool</span>
                    <div className="flex items-center gap-1 font-semibold text-primary">
                      <Trophy className="w-4 h-4" />
                      {(lobby.betAmount * lobby.players * 0.9).toFixed(2)} SOL
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-gradient-surface border-card-border">
                <h3 className="font-semibold mb-3 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-primary" />
                  Players
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Current Players</span>
                    <span className="font-semibold">{lobby.players}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Max Players</span>
                    <span className="font-semibold">{lobby.maxPlayers}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-gradient-primary rounded-full h-2 transition-all duration-300"
                      style={{ width: `${(lobby.players / lobby.maxPlayers) * 100}%` }}
                    />
                  </div>
                </div>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <Card className="p-4 bg-gradient-surface border-card-border">
                <h3 className="font-semibold mb-3 flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-primary" />
                  Game Description
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Join this epic heist and compete against other players to create the best memes and roasts! 
                  Work together to outsmart the AI boss and claim your share of the prize pool.
                </p>
              </Card>

              <Card className="p-4 bg-gradient-surface border-card-border">
                <h3 className="font-semibold mb-3 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-primary" />
                  Expected Rewards
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground text-sm">Winner Share</span>
                    <span className="font-semibold text-success">
                      {(lobby.betAmount * lobby.players * 0.6).toFixed(2)} SOL
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground text-sm">Runner-up</span>
                    <span className="font-semibold text-secondary">
                      {(lobby.betAmount * lobby.players * 0.3).toFixed(2)} SOL
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground text-sm">NFT Rewards</span>
                    <span className="font-semibold text-primary">Guaranteed</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-border">
            {lobby.status === 'waiting' || lobby.status === 'starting' ? (
              <Button 
                variant="gaming" 
                className="flex-1"
                onClick={() => onJoin(lobby.id)}
                disabled={lobby.players >= lobby.maxPlayers}
              >
                <Users className="w-4 h-4 mr-2" />
                {lobby.players >= lobby.maxPlayers ? 'Lobby Full' : 'Join Heist'}
              </Button>
            ) : (
              <Button variant="outline" className="flex-1" disabled>
                <Zap className="w-4 h-4 mr-2" />
                Game in Progress
              </Button>
            )}
            <Button variant="ghost" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}