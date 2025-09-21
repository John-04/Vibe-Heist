-- Fix function search path security warnings
-- Update existing functions to use secure search_path settings

-- Fix function 1: update_updated_at_column
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$function$;

-- Fix function 2: create_user_stats  
CREATE OR REPLACE FUNCTION public.create_user_stats()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
    INSERT INTO user_stats (wallet_address) VALUES (NEW.wallet_address);
    RETURN NEW;
END;
$function$;