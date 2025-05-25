export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      athletes: {
        Row: {
          age: number | null
          bio: string | null
          career_highlights: string | null
          gender: string | null
          highest_level: string | null
          id: string
          name: string | null
          nationality: string | null
          photo: string | null
          quick_bio: Json | null
          socials: Json | null
          sponsorship_current: number | null
          sponsorship_goal: number | null
          username: string | null
        }
        Insert: {
          age?: number | null
          bio?: string | null
          career_highlights?: string | null
          gender?: string | null
          highest_level?: string | null
          id: string
          name?: string | null
          nationality?: string | null
          photo?: string | null
          quick_bio?: Json | null
          socials?: Json | null
          sponsorship_current?: number | null
          sponsorship_goal?: number | null
          username?: string | null
        }
        Update: {
          age?: number | null
          bio?: string | null
          career_highlights?: string | null
          gender?: string | null
          highest_level?: string | null
          id?: string
          name?: string | null
          nationality?: string | null
          photo?: string | null
          quick_bio?: Json | null
          socials?: Json | null
          sponsorship_current?: number | null
          sponsorship_goal?: number | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "athletes_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          championship_name: string | null
          event_date: string
          event_id: string
          event_name: string | null
          results: Json | null
          sport: string | null
          uuid: string
        }
        Insert: {
          championship_name?: string | null
          event_date: string
          event_id: string
          event_name?: string | null
          results?: Json | null
          sport?: string | null
          uuid: string
        }
        Update: {
          championship_name?: string | null
          event_date?: string
          event_id?: string
          event_name?: string | null
          results?: Json | null
          sport?: string | null
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_uuid_fkey"
            columns: ["uuid"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      sponsors: {
        Row: {
          bio: string | null
          founding_year: string | null
          locale: string | null
          sponsor_base: string | null
          sponsorship_budget: number | null
          uuid: string
        }
        Insert: {
          bio?: string | null
          founding_year?: string | null
          locale?: string | null
          sponsor_base?: string | null
          sponsorship_budget?: number | null
          uuid: string
        }
        Update: {
          bio?: string | null
          founding_year?: string | null
          locale?: string | null
          sponsor_base?: string | null
          sponsorship_budget?: number | null
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "sponsors_uuid_fkey"
            columns: ["uuid"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          email_id: string
          full_name: string | null
          id: string
          is_active: boolean | null
          user_role: string | null
        }
        Insert: {
          email_id: string
          full_name?: string | null
          id: string
          is_active?: boolean | null
          user_role?: string | null
        }
        Update: {
          email_id?: string
          full_name?: string | null
          id?: string
          is_active?: boolean | null
          user_role?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
