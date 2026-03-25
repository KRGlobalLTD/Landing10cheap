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
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      briefs: {
        Row: {
          assets: Json
          business: Json
          contact: Json
          content: Json
          created_at: string
          customer: Json
          delivery: Json
          design: Json
          id: string
          internal_notes: string | null
          offer: Json
          payment: Json
          source: string
          status: string
          updated_at: string
        }
        Insert: {
          assets?: Json
          business?: Json
          contact?: Json
          content?: Json
          created_at?: string
          customer?: Json
          delivery?: Json
          design?: Json
          id?: string
          internal_notes?: string | null
          offer?: Json
          payment?: Json
          source?: string
          status?: string
          updated_at?: string
        }
        Update: {
          assets?: Json
          business?: Json
          contact?: Json
          content?: Json
          created_at?: string
          customer?: Json
          delivery?: Json
          design?: Json
          id?: string
          internal_notes?: string | null
          offer?: Json
          payment?: Json
          source?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      customers: {
        Row: {
          business_name: string
          city: string
          created_at: string | null
          email: string
          full_name: string
          id: string
          phone: string
          whatsapp: string
        }
        Insert: {
          business_name: string
          city: string
          created_at?: string | null
          email: string
          full_name: string
          id?: string
          phone: string
          whatsapp: string
        }
        Update: {
          business_name?: string
          city?: string
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          phone?: string
          whatsapp?: string
        }
        Relationships: []
      }
      order_records: {
        Row: {
          amount_total: number
          business_name: string | null
          created_at: string
          currency: string
          customer_email: string | null
          id: string
          metadata: Json
          notifications: Json
          delivery_status: string
          order_number: string | null
          paid_at: string | null
          payment_intent_id: string | null
          product: string
          source: string
          status: string
          stripe_session_id: string
        }
        Insert: {
          amount_total?: number
          business_name?: string | null
          created_at?: string
          currency?: string
          customer_email?: string | null
          delivery_status?: string
          id?: string
          metadata?: Json
          notifications?: Json
          order_number?: string | null
          paid_at?: string | null
          payment_intent_id?: string | null
          product?: string
          source?: string
          status: string
          stripe_session_id: string
        }
        Update: {
          amount_total?: number
          business_name?: string | null
          created_at?: string
          currency?: string
          customer_email?: string | null
          delivery_status?: string
          id?: string
          metadata?: Json
          notifications?: Json
          order_number?: string | null
          paid_at?: string | null
          payment_intent_id?: string | null
          product?: string
          source?: string
          status?: string
          stripe_session_id?: string
        }
        Relationships: []
      }
      orders: {
        Row: {
          amount_paid: number
          answers_json: Json
          created_at: string | null
          customer_id: string
          generated_brief: string | null
          generated_prompt: string | null
          id: string
          pdf_url: string | null
          site_url: string | null
          status: string
          stripe_payment_intent: string | null
          stripe_session_id: string | null
          updated_at: string | null
        }
        Insert: {
          amount_paid?: number
          answers_json?: Json
          created_at?: string | null
          customer_id: string
          generated_brief?: string | null
          generated_prompt?: string | null
          id?: string
          pdf_url?: string | null
          site_url?: string | null
          status?: string
          stripe_payment_intent?: string | null
          stripe_session_id?: string | null
          updated_at?: string | null
        }
        Update: {
          amount_paid?: number
          answers_json?: Json
          created_at?: string | null
          customer_id?: string
          generated_brief?: string | null
          generated_prompt?: string | null
          id?: string
          pdf_url?: string | null
          site_url?: string | null
          status?: string
          stripe_payment_intent?: string | null
          stripe_session_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          created_at: string | null
          deploy_status: string | null
          deploy_url: string | null
          github_repo: string | null
          id: string
          internal_notes: string | null
          order_id: string
          vercel_project: string | null
        }
        Insert: {
          created_at?: string | null
          deploy_status?: string | null
          deploy_url?: string | null
          github_repo?: string | null
          id?: string
          internal_notes?: string | null
          order_id: string
          vercel_project?: string | null
        }
        Update: {
          created_at?: string | null
          deploy_status?: string | null
          deploy_url?: string | null
          github_repo?: string | null
          id?: string
          internal_notes?: string | null
          order_id?: string
          vercel_project?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
