-- Fix security vulnerability: Completely recreate game_participants RLS policies
-- First, drop all existing policies to ensure clean state
DROP POLICY IF EXISTS "Anyone can read game participants" ON public.game_participants;
DROP POLICY IF EXISTS "Users can view their own participation data" ON public.game_participants;
DROP POLICY IF EXISTS "Game hosts can view participants in their games" ON public.game_participants;
DROP POLICY IF EXISTS "Public can view anonymized completed game stats" ON public.game_participants;

-- Create secure policies that protect player financial information

-- Policy 1: Users can only view their own participation data
CREATE POLICY "Users view own participation data" 
ON public.game_participants 
FOR SELECT 
TO authenticated
USING (
  ((auth.jwt() ->> 'sub'::text) = wallet_address) OR 
  ((auth.jwt() ->> 'wallet'::text) = wallet_address)
);

-- Policy 2: Game hosts can view participants in their hosted games (for lobby management)
CREATE POLICY "Hosts view their game participants" 
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

-- Update existing INSERT policy to maintain current functionality
-- (The existing "Users can join games" policy should remain as is)

-- Add documentation
COMMENT ON TABLE public.game_participants IS 'Player participation data with strict RLS policies. Financial information (stakes/payouts) is only visible to the participant themselves and game hosts. No public access to sensitive financial data.';