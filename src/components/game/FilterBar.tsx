import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface FilterOptions {
  search: string;
  difficulty: string;
  status: string;
  minBet: number;
  maxBet: number;
  maxPlayers: string;
}

interface FilterBarProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  activeFiltersCount: number;
  onClearFilters: () => void;
}

export function FilterBar({ 
  filters, 
  onFiltersChange, 
  activeFiltersCount, 
  onClearFilters 
}: FilterBarProps) {
  const updateFilter = (key: keyof FilterOptions, value: string | number) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-surface rounded-2xl p-4 border border-card-border shadow-soft"
    >
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search heist names..."
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
            className="pl-10 bg-surface"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 items-center">
          {/* Difficulty Filter */}
          <Select
            value={filters.difficulty}
            onValueChange={(value) => updateFilter('difficulty', value)}
          >
            <SelectTrigger className="w-32 bg-surface">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="Easy">Easy</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Hard">Hard</SelectItem>
              <SelectItem value="Insane">Insane</SelectItem>
            </SelectContent>
          </Select>

          {/* Status Filter */}
          <Select
            value={filters.status}
            onValueChange={(value) => updateFilter('status', value)}
          >
            <SelectTrigger className="w-32 bg-surface">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="waiting">Waiting</SelectItem>
              <SelectItem value="starting">Starting</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
            </SelectContent>
          </Select>

          {/* Max Players Filter */}
          <Select
            value={filters.maxPlayers}
            onValueChange={(value) => updateFilter('maxPlayers', value)}
          >
            <SelectTrigger className="w-32 bg-surface">
              <SelectValue placeholder="Players" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any Size</SelectItem>
              <SelectItem value="2">2 Players</SelectItem>
              <SelectItem value="3">3 Players</SelectItem>
              <SelectItem value="4">4 Players</SelectItem>
              <SelectItem value="5">5 Players</SelectItem>
              <SelectItem value="6">6 Players</SelectItem>
            </SelectContent>
          </Select>

          {/* Bet Range */}
          <div className="flex items-center space-x-2">
            <Input
              type="number"
              placeholder="Min"
              step="0.01"
              value={filters.minBet || ''}
              onChange={(e) => updateFilter('minBet', parseFloat(e.target.value) || 0)}
              className="w-20 bg-surface"
            />
            <span className="text-muted-foreground text-sm">-</span>
            <Input
              type="number"
              placeholder="Max"
              step="0.01"
              value={filters.maxBet || ''}
              onChange={(e) => updateFilter('maxBet', parseFloat(e.target.value) || 0)}
              className="w-20 bg-surface"
            />
            <span className="text-xs text-muted-foreground">SOL</span>
          </div>

          {/* Clear Filters */}
          <AnimatePresence>
            {activeFiltersCount > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center space-x-2"
              >
                <Badge variant="secondary" className="px-2 py-1">
                  {activeFiltersCount} filter{activeFiltersCount !== 1 ? 's' : ''}
                </Badge>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={onClearFilters}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}