
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      mst_albums: {
        Row: {
          album_id: string
          album_image_url: string
          album_type: string
          artist_ids: string[]
          artist_names: string[]
          created_at: string
          name: string
          release_date: string
          spotify_api_endpoint: string
          spotify_external_url: string
          total_tracks: number
        }
        Insert: {
          album_id: string
          album_image_url: string
          album_type: string
          artist_ids: string[]
          artist_names: string[]
          created_at?: string
          name: string
          release_date: string
          spotify_api_endpoint: string
          spotify_external_url: string
          total_tracks: number
        }
        Update: {
          album_id?: string
          album_image_url?: string
          album_type?: string
          artist_ids?: string[]
          artist_names?: string[]
          created_at?: string
          name?: string
          release_date?: string
          spotify_api_endpoint?: string
          spotify_external_url?: string
          total_tracks?: number
        }
        Relationships: []
      }
      mst_artists: {
        Row: {
          artist_id: string
          artist_name: string
          created_at: string
          popularity: number
          spotify_api_endpoint: string
          spotify_external_url: string
          total_followers: number
        }
        Insert: {
          artist_id: string
          artist_name: string
          created_at?: string
          popularity: number
          spotify_api_endpoint: string
          spotify_external_url: string
          total_followers: number
        }
        Update: {
          artist_id?: string
          artist_name?: string
          created_at?: string
          popularity?: number
          spotify_api_endpoint?: string
          spotify_external_url?: string
          total_followers?: number
        }
        Relationships: []
      }
      mst_characters: {
        Row: {
          age: string
          artist_id: string
          birth_day: string
          blood: string
          character_name: string
          character_voice: string
          color: string
          description: string
          four_panel_comic_images: string[]
          from: string
          height: string
          hero_icon: string
          hero_images: string[]
          hobby: string
          image_6th: string | null
          image_deformed: string | null
          image_favorite: string | null
          image_uniform: string | null
          like: string
          sign: string
          special: string
          three_size: string
          type: string
          unique_flg: boolean
          weight: string
        }
        Insert: {
          age: string
          artist_id: string
          birth_day: string
          blood: string
          character_name: string
          character_voice: string
          color: string
          description: string
          four_panel_comic_images: string[]
          from: string
          height: string
          hero_icon: string
          hero_images: string[]
          hobby: string
          image_6th?: string | null
          image_deformed?: string | null
          image_favorite?: string | null
          image_uniform?: string | null
          like: string
          sign: string
          special: string
          three_size: string
          type: string
          unique_flg: boolean
          weight: string
        }
        Update: {
          age?: string
          artist_id?: string
          birth_day?: string
          blood?: string
          character_name?: string
          character_voice?: string
          color?: string
          description?: string
          four_panel_comic_images?: string[]
          from?: string
          height?: string
          hero_icon?: string
          hero_images?: string[]
          hobby?: string
          image_6th?: string | null
          image_deformed?: string | null
          image_favorite?: string | null
          image_uniform?: string | null
          like?: string
          sign?: string
          special?: string
          three_size?: string
          type?: string
          unique_flg?: boolean
          weight?: string
        }
        Relationships: [
          {
            foreignKeyName: "mst_characters_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: true
            referencedRelation: "mst_artists"
            referencedColumns: ["artist_id"]
          }
        ]
      }
      mst_tracks: {
        Row: {
          acousticness: number
          album_id: string
          analysis_url: string
          artist_ids: string[]
          artist_names: string[]
          created_at: string
          danceability: number
          disc_number: number
          duration_ms: number
          energy: number
          instrumentalness: number
          key: number
          liveness: number
          loudness: number
          mode: number
          popularity: number
          preview_url: string | null
          speechiness: number
          tempo: number
          time_signature: number
          track_href: string
          track_id: string
          track_name: string
          track_number: number
          valence: number
        }
        Insert: {
          acousticness: number
          album_id: string
          analysis_url: string
          artist_ids: string[]
          artist_names: string[]
          created_at?: string
          danceability: number
          disc_number: number
          duration_ms: number
          energy: number
          instrumentalness: number
          key: number
          liveness: number
          loudness: number
          mode: number
          popularity: number
          preview_url?: string | null
          speechiness: number
          tempo: number
          time_signature: number
          track_href: string
          track_id: string
          track_name: string
          track_number: number
          valence: number
        }
        Update: {
          acousticness?: number
          album_id?: string
          analysis_url?: string
          artist_ids?: string[]
          artist_names?: string[]
          created_at?: string
          danceability?: number
          disc_number?: number
          duration_ms?: number
          energy?: number
          instrumentalness?: number
          key?: number
          liveness?: number
          loudness?: number
          mode?: number
          popularity?: number
          preview_url?: string | null
          speechiness?: number
          tempo?: number
          time_signature?: number
          track_href?: string
          track_id?: string
          track_name?: string
          track_number?: number
          valence?: number
        }
        Relationships: [
          {
            foreignKeyName: "mst_tracks_album_id_fkey"
            columns: ["album_id"]
            isOneToOne: false
            referencedRelation: "mst_albums"
            referencedColumns: ["album_id"]
          }
        ]
      }
      mst_units: {
        Row: {
          character_id: string
          character_name: string
          id: string
          unit_id: string
          unit_name: string
        }
        Insert: {
          character_id: string
          character_name: string
          id?: string
          unit_id: string
          unit_name: string
        }
        Update: {
          character_id?: string
          character_name?: string
          id?: string
          unit_id?: string
          unit_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "mst_units_character_id_fkey"
            columns: ["character_id"]
            isOneToOne: false
            referencedRelation: "mst_characters"
            referencedColumns: ["artist_id"]
          },
          {
            foreignKeyName: "mst_units_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "mst_artists"
            referencedColumns: ["artist_id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_artists_info: {
        Args: {
          artist_ids: string[]
        }
        Returns: {
          artist_id: string
          character_name: string
          image_6th: string
          image_favorite: string
          image_uniform: string
          color: string
        }[]
      }
      get_track_artists: {
        Args: {
          artist_ids: string[]
        }
        Returns: {
          artist_id: string
          character_name: string
          image_6th: string
          image_favorite: string
          image_uniform: string
          color: string
        }[]
      }
      gettrackartists: {
        Args: {
          artist_ids: string[]
        }
        Returns: {
          artist_id: string
          character_name: string
          image_6th: string
          image_favorite: string
          image_uniform: string
          color: string
          unit_id: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: unknown
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
