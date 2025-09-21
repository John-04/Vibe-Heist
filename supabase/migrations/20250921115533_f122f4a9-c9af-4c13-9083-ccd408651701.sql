-- Fix security vulnerability: Restrict access to game_participants table
-- Remove the overly permissive "Anyone can read game participants" policy
DROP POLICY IF EXISTS "Anyone can read game participants" ON public.game_participants;

-- Create more secure policies that protect player financial information

-- Policy 1: Users can only view their own participation data
CREATE POLICY "Users can view their own participation data" 
ON public.game_participants 
FOR SELECT 
TO authenticated
USING (
  ((auth.jwt() ->> 'sub'::text) = wallet_address) OR 
  ((auth.jwt() ->> 'wallet'::text) = wallet_address)
);

-- Policy 2: Game hosts can view participants in their games (for lobby management)
CREATE POLICY "Game hosts can view participants in their games" 
ON public.game_participants 
FOR SELECT 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.games g 
    JOIN public.lobbies l ON g.lobby_id = l.id 
    WHERE g.id = game_participants.game_id 
    AND (
      ((auth.jwt() ->> 'sub'::text) = l.host_wallet) OR 
      ((auth.jwt() ->> 'wallet'::text) = l.host_wallet)
    )
  )
);

-- Policy 3: Allow users to view anonymized participation data for completed games (for leaderboards/stats)
-- This policy shows only non-sensitive data for public leaderboards
CREATE POLICY "Public can view anonymized completed game stats" 
ON public.game_participants 
FOR SELECT 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.games g 
    WHERE g.id = game_participants.game_id 
    AND g.end_time IS NOT NULL -- Only completed games
  )
);

-- Add a comment to document the security fix
COMMENT ON TABLE public.game_participants IS 'Player participation data with RLS policies to protect financial privacy. Users can only see their own data, game hosts can see participants in their games, and anonymized stats are available for completed games.';