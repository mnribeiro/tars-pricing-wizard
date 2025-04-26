// Basic Types
export type ComplexityLevel = "easy" | "normal" | "complex";

export const complexityLevels = {
  easy: "Fácil",
  normal: "Intermediário",
  complex: "Avançado"
};

// Types used in PricingCalculator.tsx
export type BusinessNiche = "Saúde" | "Varejo" | "E-commerce" | "Franquias" | "Indústria" | "Serviços";
export type IndustryArea = "Logística" | "Produção" | "Inteligência de Negócios" | "Envio de Relatórios";
export type AutomationObjective = "Aumentar Vendas" | "Reduzir Custos" | "Melhorar Experiência" | "Otimizar Tempo" | "Inteligência Estratégica";
export type AILevel = "IA Simples" | "IA Intermediária" | "IA Complexa";
export type AIFeature = "Análise de Texto" | "Reconhecimento de Imagens" | "Análise Preditiva" | "Recomendação Personalizada" | "Classificação Automática" | "Detecção de Anomalias";
export type AITraining = "Treinamento Básico" | "Treinamento Personalizado" | "Treinamento Avançado";
export type AITool = "Prompt Studio" | "Monitoramento de IA" | "Ferramentas de Auditoria" | "Geração de Conteúdo" | "Painel de Controle IA";

// New Structure Types
export type Segment = 
  | "Saúde"
  | "Construção Civil"
  | "E-commerce"
  | "Indústria"
  | "Serviços";

export type SubNiche = string;

export type Department = string;

export type ModuleLevel = "I" | "M" | "A";

export type ModuleName =
  | "WhatsApp"
  | "Disparador de Mensagens / Captação"
  | "Banco de Dados"
  | "IA Avançada & Prompt Studio"
  | "Integração ERP"
  | "Integração CRM"
  | "RAG / Base de Conhecimento"
  | "Google Drive Connector"
  | "Análise de Dados + Dashboard"
  | "Lembretes & Automação Follow-up"
  | "Outro";

export interface Module {
  name: ModuleName;
  basePrice: number;
  level: ModuleLevel | null;
  available: boolean;
  // Add complexity to match PricingCalculator usage
  complexity?: ComplexityLevel | null;
}

export interface SubNicheData {
  name: SubNiche;
  basePrice: number;
  departments: Department[];
}

export interface SegmentData {
  name: Segment;
  basePrice: number;
  subNiches: SubNicheData[];
}

export interface ModuleData {
  name: ModuleName;
  prices: {
    I: number;
    M: number;
    A: number;
  };
  departmentAvailability: Record<Department, boolean>;
}

// State for the pricing calculator
export interface CalculatorState {
  currentStep: number;
  clientName: string;
  companyName: string;
  clientPhone: string;
  projectDescription: string;
  selectedSegment: Segment | null;
  selectedSubNiche: SubNiche | null;
  selectedDepartment: Department | null;
  selectedModules: Module[];
  notes: string;
  discount: number;
  // Additional properties needed for PricingCalculator
  initialIdea?: string;
  selectedNiche?: BusinessNiche | null;
  nicheUnits?: number;
  selectedIndustryArea?: IndustryArea | null;
  whatsappNumbers?: number;
  selectedObjectives?: AutomationObjective[];
  selectedAILevel?: AILevel | null;
  selectedAIFeatures?: AIFeature[];
  selectedAITraining?: AITraining | null;
  selectedAITools?: AITool[];
}

// Data needed by PricingCalculator
export const businessNiches = [
  { name: "Saúde", basePrice: 2500 },
  { name: "Varejo", basePrice: 2200 },
  { name: "E-commerce", basePrice: 2200 },
  { name: "Franquias", basePrice: 3000 },
  { name: "Indústria", basePrice: 4000 },
  { name: "Serviços", basePrice: 1800 }
] as const;

export const industryAreas = [
  { name: "Logística", basePrice: 1000 },
  { name: "Produção", basePrice: 1500 },
  { name: "Inteligência de Negócios", basePrice: 2000 },
  { name: "Envio de Relatórios", basePrice: 800 }
] as const;

export const automationObjectives = [
  "Aumentar Vendas",
  "Reduzir Custos",
  "Melhorar Experiência",
  "Otimizar Tempo",
  "Inteligência Estratégica"
] as const;

export const aiFeatures = [
  { name: "Análise de Texto", value: 1000 },
  { name: "Reconhecimento de Imagens", value: 1500 },
  { name: "Análise Preditiva", value: 2000 },
  { name: "Recomendação Personalizada", value: 1800 },
  { name: "Classificação Automática", value: 1200 },
  { name: "Detecção de Anomalias", value: 2200 }
] as const;

export const aiTraining = [
  { name: "Treinamento Básico", value: 1000 },
  { name: "Treinamento Personalizado", value: 2500 },
  { name: "Treinamento Avançado", value: 5000 }
] as const;

export const aiTools = [
  { name: "Prompt Studio", value: 800 },
  { name: "Monitoramento de IA", value: 1200 },
  { name: "Ferramentas de Auditoria", value: 1500 },
  { name: "Geração de Conteúdo", value: 1800 },
  { name: "Painel de Controle IA", value: 2200 }
] as const;

export const aiLevelThresholds = {
  simple: { min: 0, max: 5000 },
  intermediate: { min: 5001, max: 10000 },
  complex: { min: 10001, max: Infinity }
} as const;

export const availableModules = [
  { 
    name: "WhatsApp",
    basePrice: 1500,
    prices: { easy: 1500, normal: 2500, complex: 4000 }
  },
  { 
    name: "Disparador de Mensagens / Captação",
    basePrice: 1200,
    prices: { easy: 1200, normal: 2000, complex: 3500 }
  },
  { 
    name: "Banco de Dados",
    basePrice: 2000,
    prices: { easy: 2000, normal: 3000, complex: 4500 }
  },
  { 
    name: "IA Avançada & Prompt Studio",
    basePrice: 2500,
    prices: { easy: 2500, normal: 4000, complex: 6000 }
  },
  { 
    name: "Integração ERP",
    basePrice: 2200,
    prices: { easy: 2200, normal: 3500, complex: 5800 }
  },
  { 
    name: "Integração CRM",
    basePrice: 2000,
    prices: { easy: 2000, normal: 3000, complex: 5200 }
  },
  { 
    name: "RAG / Base de Conhecimento",
    basePrice: 1800,
    prices: { easy: 1800, normal: 2800, complex: 4500 }
  },
  { 
    name: "Google Drive Connector",
    basePrice: 1200,
    prices: { easy: 1200, normal: 1800, complex: 2500 }
  },
  { 
    name: "Análise de Dados + Dashboard",
    basePrice: 2400,
    prices: { easy: 2400, normal: 3600, complex: 5800 }
  },
  { 
    name: "Lembretes & Automação Follow-up",
    basePrice: 1000,
    prices: { easy: 1000, normal: 1800, complex: 2500 }
  },
  { 
    name: "Outro",
    basePrice: 1500,
    prices: { easy: 1500, normal: 3000, complex: 5000 }
  }
] as const;

// Segments Data
export const segmentsData: SegmentData[] = [
  {
    name: "Saúde",
    basePrice: 2500,
    subNiches: [
      {
        name: "Clínica",
        basePrice: 3000,
        departments: ["Recepção", "Agenda", "Faturamento", "Marketing"]
      },
      {
        name: "Hospital",
        basePrice: 5000,
        departments: ["Internação", "Emergência", "Administrativo", "Farmácia"]
      },
      {
        name: "Laboratório de Análises",
        basePrice: 3500,
        departments: ["Coleta", "Análises", "Resultados", "Administração"]
      },
      {
        name: "Fisioterapia",
        basePrice: 2200,
        departments: ["Agenda", "Avaliação", "Tratamento", "Financeiro"]
      }
    ]
  },
  {
    name: "Construção Civil",
    basePrice: 3000,
    subNiches: [
      {
        name: "Construtora",
        basePrice: 3500,
        departments: ["Comercial", "Orçamentos", "RH", "Financeiro", "Operações"]
      },
      {
        name: "Incorporadora",
        basePrice: 4000,
        departments: ["Projetos", "Vendas", "Legal", "Financeiro"]
      },
      {
        name: "Imobiliária",
        basePrice: 2500,
        departments: ["Vendas", "Locação", "Administração", "Marketing"]
      }
    ]
  },
  {
    name: "E-commerce",
    basePrice: 2200,
    subNiches: [
      {
        name: "Moda",
        basePrice: 2500,
        departments: ["Catálogo", "Vendas", "Logística", "SAC"]
      },
      {
        name: "Cosméticos",
        basePrice: 2300,
        departments: ["Produtos", "Marketing", "Logística", "Financeiro"]
      },
      {
        name: "Alimentos",
        basePrice: 2800,
        departments: ["Estoque", "Delivery", "Marketing", "Financeiro"]
      },
      {
        name: "Eletrônicos",
        basePrice: 3000,
        departments: ["Produtos", "Vendas", "Suporte", "Logística"]
      }
    ]
  },
  {
    name: "Indústria",
    basePrice: 4000,
    subNiches: [
      {
        name: "Metalurgia",
        basePrice: 4500,
        departments: ["Produção", "Qualidade", "Vendas", "Compras"]
      },
      {
        name: "Alimentos",
        basePrice: 4200,
        departments: ["Produção", "Qualidade", "Estoque", "Distribuição"]
      },
      {
        name: "Química",
        basePrice: 5000,
        departments: ["P&D", "Produção", "Controle", "Logística"]
      },
      {
        name: "Plásticos",
        basePrice: 3800,
        departments: ["Moldagem", "Acabamento", "Expedição", "Vendas"]
      }
    ]
  },
  {
    name: "Serviços",
    basePrice: 1800,
    subNiches: [
      {
        name: "Contabilidade",
        basePrice: 2000,
        departments: ["Fiscal", "Contábil", "Pessoal", "Consultoria"]
      },
      {
        name: "Marketing",
        basePrice: 1900,
        departments: ["Criação", "Mídia", "Planejamento", "Atendimento"]
      },
      {
        name: "Educação",
        basePrice: 2200,
        departments: ["Pedagógico", "Administrativo", "Financeiro", "Comercial"]
      },
      {
        name: "Logística",
        basePrice: 2500,
        departments: ["Rotas", "Entregas", "Armazenagem", "Faturamento"]
      }
    ]
  }
];

// Modules Data
export const modulesData: ModuleData[] = [
  {
    name: "WhatsApp",
    prices: { I: 1500, M: 2500, A: 4000 },
    departmentAvailability: {
      // Saúde
      "Recepção": true,
      "Agenda": true,
      "Faturamento": true,
      "Marketing": true,
      "Internação": true,
      "Emergência": true,
      "Administrativo": true,
      "Farmácia": false,
      "Coleta": true,
      "Análises": false,
      "Resultados": true,
      "Administração": true,
      "Avaliação": false,
      "Tratamento": false,
      
      // Construção Civil
      "Comercial": true,
      "Orçamentos": true,
      "RH": true,
      "Financeiro": true,
      "Operações": true,
      "Projetos": true,
      "Vendas": true,
      "Legal": true,
      "Locação": true,
      
      // E-commerce
      "Catálogo": false,
      "Logística": true,
      "SAC": true,
      "Produtos": false,
      "Estoque": false,
      "Delivery": true,
      "Suporte": true,
      
      // Indústria
      "Produção": false,
      "Qualidade": false,
      "Compras": true,
      "P&D": false,
      "Controle": false,
      "Moldagem": false,
      "Acabamento": false,
      "Expedição": true,
      
      // Serviços
      "Fiscal": true,
      "Contábil": true,
      "Pessoal": true,
      "Consultoria": true,
      "Criação": true,
      "Mídia": true,
      "Planejamento": true,
      "Atendimento": true,
      "Pedagógico": true,
      "Rotas": true,
      "Entregas": true,
      "Armazenagem": false,
      "Distribuição": true
    }
  },
  {
    name: "Disparador de Mensagens / Captação",
    prices: { I: 1200, M: 2000, A: 3500 },
    departmentAvailability: {
      // Default availability by department - true for marketing departments
      "Marketing": true,
      "Comercial": true,
      "Vendas": true,
      "SAC": true,
      "Atendimento": true,

      // Set other departments to false
      "Recepção": false,
      "Agenda": false,
      "Faturamento": false,
      "Internação": false,
      "Emergência": false,
      "Administrativo": false,
      "Farmácia": false,
      "Coleta": false,
      "Análises": false,
      "Resultados": false,
      "Administração": false,
      "Avaliação": false,
      "Tratamento": false,
      "Orçamentos": false,
      "RH": false,
      "Financeiro": false,
      "Operações": false,
      "Projetos": false,
      "Legal": false,
      "Locação": false,
      "Catálogo": false,
      "Logística": false,
      "Produtos": false,
      "Estoque": false,
      "Delivery": false,
      "Suporte": false,
      "Produção": false,
      "Qualidade": false,
      "Compras": false,
      "P&D": false,
      "Controle": false,
      "Moldagem": false,
      "Acabamento": false,
      "Expedição": false,
      "Fiscal": false,
      "Contábil": false,
      "Pessoal": false,
      "Consultoria": false,
      "Criação": false,
      "Mídia": false,
      "Planejamento": false,
      "Pedagógico": false,
      "Rotas": false,
      "Entregas": false,
      "Armazenagem": false,
      "Distribuição": false
    }
  },
  {
    name: "Banco de Dados",
    prices: { I: 2000, M: 3000, A: 4500 },
    departmentAvailability: {
      // Available for all departments
      "Recepção": true,
      "Agenda": true,
      "Faturamento": true,
      "Marketing": true,
      "Internação": true,
      "Emergência": true,
      "Administrativo": true,
      "Farmácia": true,
      "Coleta": true,
      "Análises": true,
      "Resultados": true,
      "Administração": true,
      "Avaliação": true,
      "Tratamento": true,
      "Comercial": true,
      "Orçamentos": true,
      "RH": true,
      "Financeiro": true,
      "Operações": true,
      "Projetos": true,
      "Vendas": true,
      "Legal": true,
      "Locação": true,
      "Catálogo": true,
      "Logística": true,
      "SAC": true,
      "Produtos": true,
      "Estoque": true,
      "Delivery": true,
      "Suporte": true,
      "Produção": true,
      "Qualidade": true,
      "Compras": true,
      "P&D": true,
      "Controle": true,
      "Moldagem": true,
      "Acabamento": true,
      "Expedição": true,
      "Fiscal": true,
      "Contábil": true,
      "Pessoal": true,
      "Consultoria": true,
      "Criação": true,
      "Mídia": true,
      "Planejamento": true,
      "Atendimento": true,
      "Pedagógico": true,
      "Rotas": true,
      "Entregas": true,
      "Armazenagem": true,
      "Distribuição": true
    }
  },
  {
    name: "IA Avançada & Prompt Studio",
    prices: { I: 2500, M: 4000, A: 6000 },
    departmentAvailability: {
      // Default values for a few key departments
      "Marketing": true,
      "Comercial": true,
      "Atendimento": true,
      "SAC": true,
      "Consultoria": true,
      "P&D": true,
      "Planejamento": true,
      
      // Set other departments to false
      "Recepção": false,
      "Agenda": false,
      "Faturamento": false,
      "Internação": false,
      "Emergência": false,
      "Administrativo": false,
      "Farmácia": false,
      "Coleta": false,
      "Análises": true,
      "Resultados": true,
      "Administração": false,
      "Avaliação": false,
      "Tratamento": false,
      "Orçamentos": true,
      "RH": false,
      "Financeiro": false,
      "Operações": false,
      "Projetos": true,
      "Vendas": false,
      "Legal": false,
      "Locação": false,
      "Catálogo": false,
      "Logística": false,
      "Produtos": false,
      "Estoque": false,
      "Delivery": false,
      "Suporte": false,
      "Produção": false,
      "Qualidade": false,
      "Compras": false,
      "Controle": false,
      "Moldagem": false,
      "Acabamento": false,
      "Expedição": false,
      "Fiscal": false,
      "Contábil": false,
      "Pessoal": false,
      "Criação": true,
      "Mídia": true,
      "Pedagógico": true,
      "Rotas": false,
      "Entregas": false,
      "Armazenagem": false,
      "Distribuição": false
    }
  },
  {
    name: "Integração ERP",
    prices: { I: 2200, M: 3500, A: 5800 },
    departmentAvailability: {
      // Financial, Administrative, and Operations departments
      "Financeiro": true,
      "Administrativo": true,
      "Faturamento": true,
      "Administração": true,
      "Operações": true,
      "Estoque": true,
      "Compras": true,
      "Fiscal": true,
      "Contábil": true,
      
      // Set other departments to false
      "Recepção": false,
      "Agenda": false,
      "Marketing": false,
      "Internação": false,
      "Emergência": false,
      "Farmácia": false,
      "Coleta": false,
      "Análises": false,
      "Resultados": false,
      "Avaliação": false,
      "Tratamento": false,
      "Comercial": false,
      "Orçamentos": true,
      "RH": false,
      "Projetos": false,
      "Vendas": false,
      "Legal": false,
      "Locação": false,
      "Catálogo": false,
      "Logística": true,
      "SAC": false,
      "Produtos": true,
      "Delivery": true,
      "Suporte": false,
      "Produção": true,
      "Qualidade": false,
      "P&D": false,
      "Controle": true,
      "Moldagem": false,
      "Acabamento": false,
      "Expedição": true,
      "Pessoal": true,
      "Consultoria": false,
      "Criação": false,
      "Mídia": false,
      "Planejamento": false,
      "Atendimento": false,
      "Pedagógico": false,
      "Rotas": true,
      "Entregas": true,
      "Armazenagem": true,
      "Distribuição": true
    }
  },
  {
    name: "Integração CRM",
    prices: { I: 2000, M: 3000, A: 5200 },
    departmentAvailability: {
      // Sales, Marketing, and Customer Service departments
      "Comercial": true,
      "Vendas": true,
      "Marketing": true,
      "SAC": true,
      "Atendimento": true,
      
      // Set other departments to false
      "Recepção": true,
      "Agenda": false,
      "Faturamento": false,
      "Internação": false,
      "Emergência": false,
      "Administrativo": false,
      "Farmácia": false,
      "Coleta": false,
      "Análises": false,
      "Resultados": false,
      "Administração": false,
      "Avaliação": false,
      "Tratamento": false,
      "Orçamentos": false,
      "RH": false,
      "Financeiro": false,
      "Operações": false,
      "Projetos": false,
      "Legal": false,
      "Locação": false,
      "Catálogo": false,
      "Logística": false,
      "Produtos": false,
      "Estoque": false,
      "Delivery": false,
      "Suporte": true,
      "Produção": false,
      "Qualidade": false,
      "Compras": false,
      "P&D": false,
      "Controle": false,
      "Moldagem": false,
      "Acabamento": false,
      "Expedição": false,
      "Fiscal": false,
      "Contábil": false,
      "Pessoal": false,
      "Consultoria": true,
      "Criação": false,
      "Mídia": false,
      "Planejamento": false,
      "Atendimento": false,
      "Pedagógico": false,
      "Rotas": false,
      "Entregas": false,
      "Armazenagem": false,
      "Distribuição": false
    }
  },
  {
    name: "RAG / Base de Conhecimento",
    prices: { I: 1800, M: 2800, A: 4500 },
    departmentAvailability: {
      // Knowledge-heavy departments
      "Consultoria": true,
      "SAC": true,
      "Suporte": true,
      "P&D": true,
      "Legal": true,
      "Pedagógico": true,
      
      // Set other departments to false
      "Recepção": false,
      "Agenda": false,
      "Faturamento": false,
      "Marketing": false,
      "Internação": false,
      "Emergência": false,
      "Administrativo": false,
      "Farmácia": true,
      "Coleta": false,
      "Análises": true,
      "Resultados": false,
      "Administração": false,
      "Avaliação": true,
      "Tratamento": true,
      "Comercial": false,
      "Orçamentos": false,
      "RH": true,
      "Financeiro": false,
      "Operações": false,
      "Projetos": true,
      "Vendas": false,
      "Locação": false,
      "Catálogo": false,
      "Logística": false,
      "Produtos": false,
      "Estoque": false,
      "Delivery": false,
      "Produção": false,
      "Qualidade": true,
      "Compras": false,
      "Controle": false,
      "Moldagem": false,
      "Acabamento": false,
      "Expedição": false,
      "Fiscal": true,
      "Contábil": true,
      "Pessoal": false,
      "Criação": false,
      "Mídia": false,
      "Planejamento": true,
      "Atendimento": true,
      "Rotas": false,
      "Entregas": false,
      "Armazenagem": false,
      "Distribuição": false
    }
  },
  {
    name: "Google Drive Connector",
    prices: { I: 1200, M: 1800, A: 2500 },
    departmentAvailability: {
      // Document-heavy departments
      "Administrativo": true,
      "Administração": true,
      "Legal": true,
      "Projetos": true,
      "RH": true,
      "Fiscal": true,
      "Contábil": true,
      "Planejamento": true,
      "Pedagógico": true,
      
      // Set other departments to false
      "Recepção": false,
      "Agenda": false,
      "Faturamento": false,
      "Marketing": true,
      "Internação": false,
      "Emergência": false,
      "Farmácia": false,
      "Coleta": false,
      "Análises": false,
      "Resultados": true,
      "Avaliação": false,
      "Tratamento": false,
      "Comercial": true,
      "Orçamentos": true,
      "Financeiro": true,
      "Operações": false,
      "Vendas": false,
      "Locação": false,
      "Catálogo": false,
      "Logística": false,
      "SAC": false,
      "Produtos": false,
      "Estoque": false,
      "Delivery": false,
      "Suporte": true,
      "Produção": false,
      "Qualidade": true,
      "Compras": true,
      "P&D": true,
      "Controle": false,
      "Moldagem": false,
      "Acabamento": false,
      "Expedição": false,
      "Pessoal": true,
      "Consultoria": true,
      "Criação": true,
      "Mídia": true,
      "Atendimento": false,
      "Rotas": false,
      "Entregas": false,
      "Armazenagem": false,
      "Distribuição": false
    }
  },
  {
    name: "Análise de Dados + Dashboard",
    prices: { I: 2400, M: 3600, A: 5800 },
    departmentAvailability: {
      // Data-intensive departments
      "Financeiro": true,
      "Marketing": true,
      "P&D": true,
      "Qualidade": true,
      "Operações": true,
      "Vendas": true,
      "Planejamento": true,
      
      // Set other departments to false
      "Recepção": false,
      "Agenda": false,
      "Faturamento": true,
      "Internação": false,
      "Emergência": false,
      "Administrativo": true,
      "Farmácia": false,
      "Coleta": false,
      "Análises": true,
      "Resultados": true,
      "Administração": true,
      "Avaliação": false,
      "Tratamento": false,
      "Comercial": true,
      "Orçamentos": true,
      "RH": true,
      "Projetos": true,
      "Legal": false,
      "Locação": false,
      "Catálogo": false,
      "Logística": true,
      "SAC": false,
      "Produtos": true,
      "Estoque": true,
      "Delivery": false,
      "Suporte": false,
      "Produção": true,
      "Compras": true,
      "Controle": true,
      "Moldagem": false,
      "Acabamento": false,
      "Expedição": true,
      "Fiscal": true,
      "Contábil": true,
      "Pessoal": false,
      "Consultoria": true,
      "Criação": false,
      "Mídia": true,
      "Atendimento": false,
      "Pedagógico": true,
      "Rotas": true,
      "Entregas": true,
      "Armazenagem": true,
      "Distribuição": true
    }
  },
  {
    name: "Lembretes & Automação Follow-up",
    prices: { I: 1000, M: 1800, A: 2500 },
    departmentAvailability: {
      // Follow-up intensive departments
      "Comercial": true,
      "Vendas": true,
      "Marketing": true,
      "SAC": true,
      "Atendimento": true,
      "Recepção": true,
      "Agenda": true,
      
      // Set other departments to false
      "Faturamento": false,
      "Internação": false,
      "Emergência": false,
      "Administrativo": false,
      "Farmácia": false,
      "Coleta": true,
      "Análises": false,
      "Resultados": true,
      "Administração": false,
      "Avaliação": true,
      "Tratamento": true,
      "Orçamentos": true,
      "RH": true,
      "Financeiro": false,
      "Operações": false,
      "Projetos": true,
      "Legal": true,
      "Locação": true,
      "Catálogo": false,
      "Logística": false,
      "Produtos": false,
      "Estoque": false,
      "Delivery": true,
      "Suporte": true,
      "Produção": false,
      "Qualidade": false,
      "Compras": false,
      "P&D": false,
      "Controle": false,
      "Moldagem": false,
      "Acabamento": false,
      "Expedição": false,
      "Fiscal": false,
      "Contábil": false,
      "Pessoal": true,
      "Consultoria": true,
      "Criação": false,
      "Mídia": false,
      "Planejamento": false,
      "Pedagógico": true,
      "Rotas": false,
      "Entreg
