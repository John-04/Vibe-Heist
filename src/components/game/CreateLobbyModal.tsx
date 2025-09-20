import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { motion } from 'framer-motion';
import { Zap, Users, Coins } from 'lucide-react';

interface CreateLobbyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateLobby: (lobbyData: {
    name: string;
    maxPlayers: number;
    betAmount: number;
    difficulty: string;
  }) => void;
}

export function CreateLobbyModal({ open, onOpenChange, onCreateLobby }: CreateLobbyModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    maxPlayers: 4,
    betAmount: 0.1,
    difficulty: 'Medium',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateLobby(formData);
    onOpenChange(false);
    // Reset form
    setFormData({
      name: '',
      maxPlayers: 4,
      betAmount: 0.1,
      difficulty: 'Medium',
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-gradient-surface border-card-border">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <DialogHeader className="text-center pb-6">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <Zap className="h-12 w-12 text-primary" />
                <div className="absolute inset-0 bg-primary-glow blur-lg opacity-50" />
              </div>
            </div>
            <DialogTitle className="text-2xl font-bold bg-gradient-gaming bg-clip-text text-transparent">
              Create New Heist
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Set up your meme heist lobby and gather your crew
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Lobby Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Heist Name
              </Label>
              <Input
                id="name"
                placeholder="Epic Meme Heist"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="bg-surface border-border"
                required
              />
            </div>

            {/* Max Players */}
            <div className="space-y-2">
              <Label htmlFor="maxPlayers" className="text-sm font-medium flex items-center">
                <Users className="h-4 w-4 mr-2" />
                Max Players
              </Label>
              <Select
                value={formData.maxPlayers.toString()}
                onValueChange={(value) => setFormData(prev => ({ ...prev, maxPlayers: parseInt(value) }))}
              >
                <SelectTrigger className="bg-surface border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 Players</SelectItem>
                  <SelectItem value="3">3 Players</SelectItem>
                  <SelectItem value="4">4 Players</SelectItem>
                  <SelectItem value="5">5 Players</SelectItem>
                  <SelectItem value="6">6 Players</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Bet Amount */}
            <div className="space-y-2">
              <Label htmlFor="betAmount" className="text-sm font-medium flex items-center">
                <Coins className="h-4 w-4 mr-2" />
                Entry Bet (SOL)
              </Label>
              <Input
                id="betAmount"
                type="number"
                step="0.01"
                min="0.01"
                value={formData.betAmount}
                onChange={(e) => setFormData(prev => ({ ...prev, betAmount: parseFloat(e.target.value) }))}
                className="bg-surface border-border"
                required
              />
            </div>

            {/* Difficulty */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Difficulty</Label>
              <Select
                value={formData.difficulty}
                onValueChange={(value) => setFormData(prev => ({ ...prev, difficulty: value }))}
              >
                <SelectTrigger className="bg-surface border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Easy">Easy - Sleepy Guards</SelectItem>
                  <SelectItem value="Medium">Medium - Alert Security</SelectItem>
                  <SelectItem value="Hard">Hard - Laser Grids</SelectItem>
                  <SelectItem value="Insane">Insane - AI Overlords</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="gaming"
                className="flex-1"
              >
                <Zap className="h-4 w-4 mr-2" />
                Create Heist
              </Button>
            </div>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}