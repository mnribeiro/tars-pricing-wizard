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
      contato: {
        Row: {
          ambiente: string | null
          atendimento: string | null
          cnpj: string | null
          cpf: string | null
          created_at: string
          email: string | null
          endereco: string | null
          id: number
          id_clickup: string | null
          id_orcamento: string | null
          nome: string | null
          nome_empresa: string | null
          pagamento: string | null
          perfil: string | null
          resumo_obra: string | null
          telefone: string | null
          timestamp_mensagem: string | null
        }
        Insert: {
          ambiente?: string | null
          atendimento?: string | null
          cnpj?: string | null
          cpf?: string | null
          created_at?: string
          email?: string | null
          endereco?: string | null
          id?: number
          id_clickup?: string | null
          id_orcamento?: string | null
          nome?: string | null
          nome_empresa?: string | null
          pagamento?: string | null
          perfil?: string | null
          resumo_obra?: string | null
          telefone?: string | null
          timestamp_mensagem?: string | null
        }
        Update: {
          ambiente?: string | null
          atendimento?: string | null
          cnpj?: string | null
          cpf?: string | null
          created_at?: string
          email?: string | null
          endereco?: string | null
          id?: number
          id_clickup?: string | null
          id_orcamento?: string | null
          nome?: string | null
          nome_empresa?: string | null
          pagamento?: string | null
          perfil?: string | null
          resumo_obra?: string | null
          telefone?: string | null
          timestamp_mensagem?: string | null
        }
        Relationships: []
      }
      preco: {
        Row: {
          codigo_produto: number
          created_at: string
          id: number
          preco: number
        }
        Insert: {
          codigo_produto: number
          created_at?: string
          id?: number
          preco: number
        }
        Update: {
          codigo_produto?: number
          created_at?: string
          id?: number
          preco?: number
        }
        Relationships: []
      }
      produto: {
        Row: {
          codigo_produto: number
          created_at: string
          departamento: string | null
          descricao: string | null
          estoque: string | null
          id: number
          marca: string | null
          nome: string | null
          preco: number | null
          referencia: string | null
        }
        Insert: {
          codigo_produto: number
          created_at?: string
          departamento?: string | null
          descricao?: string | null
          estoque?: string | null
          id?: number
          marca?: string | null
          nome?: string | null
          preco?: number | null
          referencia?: string | null
        }
        Update: {
          codigo_produto?: number
          created_at?: string
          departamento?: string | null
          descricao?: string | null
          estoque?: string | null
          id?: number
          marca?: string | null
          nome?: string | null
          preco?: number | null
          referencia?: string | null
        }
        Relationships: []
      }
      proposals: {
        Row: {
          ai_features: string[] | null
          ai_level: string | null
          ai_tools: string[] | null
          ai_training: string | null
          client_name: string
          client_phone: string
          company_name: string
          created_at: string | null
          discount: number | null
          id: string
          implementation_price: number | null
          industry_area: string | null
          initial_idea: string | null
          monthly_price: number | null
          niche_units: number | null
          notes: string | null
          objectives: string[] | null
          project_description: string | null
          selected_department: string | null
          selected_modules: Json | null
          selected_segment: string | null
          selected_subniche: string | null
          updated_at: string | null
          whatsapp_numbers: number | null
        }
        Insert: {
          ai_features?: string[] | null
          ai_level?: string | null
          ai_tools?: string[] | null
          ai_training?: string | null
          client_name: string
          client_phone: string
          company_name: string
          created_at?: string | null
          discount?: number | null
          id?: string
          implementation_price?: number | null
          industry_area?: string | null
          initial_idea?: string | null
          monthly_price?: number | null
          niche_units?: number | null
          notes?: string | null
          objectives?: string[] | null
          project_description?: string | null
          selected_department?: string | null
          selected_modules?: Json | null
          selected_segment?: string | null
          selected_subniche?: string | null
          updated_at?: string | null
          whatsapp_numbers?: number | null
        }
        Update: {
          ai_features?: string[] | null
          ai_level?: string | null
          ai_tools?: string[] | null
          ai_training?: string | null
          client_name?: string
          client_phone?: string
          company_name?: string
          created_at?: string | null
          discount?: number | null
          id?: string
          implementation_price?: number | null
          industry_area?: string | null
          initial_idea?: string | null
          monthly_price?: number | null
          niche_units?: number | null
          notes?: string | null
          objectives?: string[] | null
          project_description?: string | null
          selected_department?: string | null
          selected_modules?: Json | null
          selected_segment?: string | null
          selected_subniche?: string | null
          updated_at?: string | null
          whatsapp_numbers?: number | null
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
