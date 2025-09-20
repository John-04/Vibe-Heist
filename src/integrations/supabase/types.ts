export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      game_participants: {
        Row: {
          game_id: string
          id: string
          joined_at: string | null
          payout_lamports: number | null
          stake_lamports: number
          wallet_address: string
        }
        Insert: {
          game_id: string
          id?: string
          joined_at?: string | null
          payout_lamports?: number | null
          stake_lamports: number
          wallet_address: string
        }
        Update: {
          game_id?: string
          id?: string
          joined_at?: string | null
          payout_lamports?: number | null
          stake_lamports?: number
          wallet_address?: string
        }
        Relationships: [
          {
            foreignKeyName: "game_participants_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "game_participants_wallet_address_fkey"
            columns: ["wallet_address"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["wallet_address"]
          },
        ]
      }
      games: {
        Row: {
          created_at: string | null
          end_time: string | null
          entropy: string | null
          id: string
          lobby_id: string
          result: Json | null
          settled_tx: string | null
          start_time: string | null
        }
        Insert: {
          created_at?: string | null
          end_time?: string | null
          entropy?: string | null
          id?: string
          lobby_id: string
          result?: Json | null
          settled_tx?: string | null
          start_time?: string | null
        }
        Update: {
          created_at?: string | null
          end_time?: string | null
          entropy?: string | null
          id?: string
          lobby_id?: string
          result?: Json | null
          settled_tx?: string | null
          start_time?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "games_lobby_id_fkey"
            columns: ["lobby_id"]
            isOneToOne: false
            referencedRelation: "lobbies"
            referencedColumns: ["id"]
          },
        ]
      }
      lobbies: {
        Row: {
          bet_lamports: number
          created_at: string | null
          difficulty: Database["public"]["Enums"]["difficulty_level"]
          host_wallet: string
          id: string
          max_players: number
          name: string
          status: Database["public"]["Enums"]["lobby_status"]
          updated_at: string | null
        }
        Insert: {
          bet_lamports: number
          created_at?: string | null
          difficulty?: Database["public"]["Enums"]["difficulty_level"]
          host_wallet: string
          id?: string
          max_players: number
          name: string
          status?: Database["public"]["Enums"]["lobby_status"]
          updated_at?: string | null
        }
        Update: {
          bet_lamports?: number
          created_at?: string | null
          difficulty?: Database["public"]["Enums"]["difficulty_level"]
          host_wallet?: string
          id?: string
          max_players?: number
          name?: string
          status?: Database["public"]["Enums"]["lobby_status"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lobbies_host_wallet_fkey"
            columns: ["host_wallet"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["wallet_address"]
          },
        ]
      }
      nfts: {
        Row: {
          attributes: Json | null
          description: string
          game_id: string | null
          id: string
          image_url: string
          metadata_cid: string
          mint_address: string
          minted_at: string | null
          name: string
          owner_wallet: string
          rarity: Database["public"]["Enums"]["nft_rarity"]
          tx_signature: string
        }
        Insert: {
          attributes?: Json | null
          description: string
          game_id?: string | null
          id?: string
          image_url: string
          metadata_cid: string
          mint_address: string
          minted_at?: string | null
          name: string
          owner_wallet: string
          rarity?: Database["public"]["Enums"]["nft_rarity"]
          tx_signature: string
        }
        Update: {
          attributes?: Json | null
          description?: string
          game_id?: string | null
          id?: string
          image_url?: string
          metadata_cid?: string
          mint_address?: string
          minted_at?: string | null
          name?: string
          owner_wallet?: string
          rarity?: Database["public"]["Enums"]["nft_rarity"]
          tx_signature?: string
        }
        Relationships: [
          {
            foreignKeyName: "nfts_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nfts_owner_wallet_fkey"
            columns: ["owner_wallet"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["wallet_address"]
          },
        ]
      }
      user_stats: {
        Row: {
          games_played: number | null
          games_won: number | null
          nfts_owned: number | null
          rank: number | null
          total_winnings_lamports: number | null
          updated_at: string | null
          wallet_address: string
        }
        Insert: {
          games_played?: number | null
          games_won?: number | null
          nfts_owned?: number | null
          rank?: number | null
          total_winnings_lamports?: number | null
          updated_at?: string | null
          wallet_address: string
        }
        Update: {
          games_played?: number | null
          games_won?: number | null
          nfts_owned?: number | null
          rank?: number | null
          total_winnings_lamports?: number | null
          updated_at?: string | null
          wallet_address?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_stats_wallet_address_fkey"
            columns: ["wallet_address"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["wallet_address"]
          },
        ]
      }
      users: {
        Row: {
          avatar_cid: string | null
          created_at: string | null
          display_name: string | null
          id: string
          updated_at: string | null
          wallet_address: string
        }
        Insert: {
          avatar_cid?: string | null
          created_at?: string | null
          display_name?: string | null
          id?: string
          updated_at?: string | null
          wallet_address: string
        }
        Update: {
          avatar_cid?: string | null
          created_at?: string | null
          display_name?: string | null
          id?: string
          updated_at?: string | null
          wallet_address?: string
        }
        Relationships: []
      }
      vibes: {
        Row: {
          attributes: Json | null
          author_wallet: string
          content_cid: string
          content_type: Database["public"]["Enums"]["content_type"]
          created_at: string | null
          game_id: string
          id: string
          votes: number | null
        }
        Insert: {
          attributes?: Json | null
          author_wallet: string
          content_cid: string
          content_type: Database["public"]["Enums"]["content_type"]
          created_at?: string | null
          game_id: string
          id?: string
          votes?: number | null
        }
        Update: {
          attributes?: Json | null
          author_wallet?: string
          content_cid?: string
          content_type?: Database["public"]["Enums"]["content_type"]
          created_at?: string | null
          game_id?: string
          id?: string
          votes?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "vibes_author_wallet_fkey"
            columns: ["author_wallet"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["wallet_address"]
          },
          {
            foreignKeyName: "vibes_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      content_type: "text" | "image"
      difficulty_level: "Easy" | "Medium" | "Hard"
      lobby_status: "waiting" | "starting" | "in-progress" | "completed"
      nft_rarity: "Common" | "Rare" | "Epic" | "Legendary"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      content_type: ["text", "image"],
      difficulty_level: ["Easy", "Medium", "Hard"],
      lobby_status: ["waiting", "starting", "in-progress", "completed"],
      nft_rarity: ["Common", "Rare", "Epic", "Legendary"],
    },
  },
} as const
