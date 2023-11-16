
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
          artist_id: string[]
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
          artist_id: string[]
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
          artist_id?: string[]
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
      mst_tracks: {
        Row: {
          acousticness: number
          album_id: string
          analysis_url: string
          artist_id: string[]
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
          artist_id: string[]
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
          artist_id?: string[]
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
