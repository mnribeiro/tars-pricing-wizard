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
      "Entregas": true,
      "Armazenagem": false,
      "Distribuição": false
    }
  }
];

// Helper function to get sub-niches for a selected segment
export const getSubNichesBySegment = (segment: Segment): SubNicheData[] => {
  const segmentData = segmentsData.find(s => s.name === segment);
  return segmentData ? segmentData.subNiches : [];
};

// Helper function to get departments for a selected segment and sub-niche
export const getDepartmentsBySubNiche = (segment: Segment, subNiche: SubNiche): Department[] => {
  const segmentData = segmentsData.find(s => s.name === segment);
  if (!segmentData) return [];
  
  const subNicheData = segmentData.subNiches.find(sn => sn.name === subNiche);
  return subNicheData ? subNicheData.departments : [];
};

// Helper function to get available modules for a department
export const getAvailableModules = (department: Department): ModuleName[] => {
  return modulesData
    .filter(module => module.departmentAvailability[department])
    .map(module => module.name);
};

// Calculate the total price based on selected options
export const calculateTotalPrice = (state: CalculatorState) => {
  let implementationTotal = 0;
  
  // Add base price for segment if selected
  if (state.selectedSegment) {
    const segment = segmentsData.find(s => s.name === state.selectedSegment);
    implementationTotal += segment ? segment.basePrice : 0;
    
    // Add sub-niche price if selected
    if (state.selectedSubNiche) {
      const subNiche = segment?.subNiches.find(sn => sn.name === state.selectedSubNiche);
      implementationTotal += subNiche ? subNiche.basePrice : 0;
    }
  }
  
  // Add prices for each selected module
  state.selectedModules.forEach(module => {
    if (module.level) {
      const moduleData = modulesData.find(m => m.name === module.name);
      if (moduleData) {
        implementationTotal += moduleData.prices[module.level];
      }
    }
  });
  
  // Calculate original implementation price before discount
  const originalImplementationPrice = implementationTotal;
  
  // Apply discount if any - ONLY to implementation, not to monthly fee
  if (state.discount && state.discount > 0) {
    implementationTotal = implementationTotal * (1 - state.discount / 100);
  }
  
  // Calculate monthly fee (20% of original implementation price - NO DISCOUNT)
  const monthlyFee = Math.round(originalImplementationPrice * 0.2);
  
  return {
    implementation: Math.round(implementationTotal),
    monthly: monthlyFee,
    originalImplementation: Math.round(originalImplementationPrice),
    discountAmount: Math.round(originalImplementationPrice - implementationTotal)
  };
};

// Generate implementation timeline - adjusted to fit within 30 days
export const generateImplementationTimeline = (state: CalculatorState) => {
  // Base tasks that are always needed
  const tasks = [
    {
      phase: "Planejamento e Análise",
      days: 3,
      description: "Levantamento detalhado de requisitos e definição do escopo do projeto."
    },
    {
      phase: "Configuração de Ambiente",
      days: 2,
      description: "Preparação dos servidores, bancos de dados e ambiente de desenvolvimento."
    }
  ];
  
  // Group modules by type for better timeline organization
  const communicationModules = state.selectedModules.filter(m => 
    ["WhatsApp", "Disparador de Mensagens / Captação"].includes(m.name)
  );
  
  const dataModules = state.selectedModules.filter(m => 
    ["Banco de Dados", "Análise de Dados + Dashboard"].includes(m.name)
  );
  
  const integrationModules = state.selectedModules.filter(m => 
    ["Integração ERP", "Integração CRM", "Google Drive Connector"].includes(m.name)
  );
  
  const aiModules = state.selectedModules.filter(m => 
    ["IA Avançada & Prompt Studio", "RAG / Base de Conhecimento"].includes(m.name)
  );
  
  const automationModules = state.selectedModules.filter(m => 
    ["Lembretes & Automação Follow-up", "Outro"].includes(m.name)
  );
  
  // Calculate total complexity to adjust timelines
  let totalComplexity = 0;
  state.selectedModules.forEach(module => {
    if (module.level === "I") totalComplexity += 1;
    else if (module.level === "M") totalComplexity += 2;
    else if (module.level === "A") totalComplexity += 3;
  });
  
  // Dynamic timeline based on module groups
  if (communicationModules.length > 0) {
    let maxLevel = 0;
    communicationModules.forEach(m => {
      if (m.level === "M") maxLevel = Math.max(maxLevel, 1);
      if (m.level === "A") maxLevel = Math.max(maxLevel, 2);
    });
    
    tasks.push({
      phase: "Implementação Canais de Comunicação",
      days: 3 + maxLevel * 2,
      description: `Configuração e desenvolvimento dos módulos ${communicationModules.map(m => m.name).join(", ")}.`
    });
  }
  
  if (dataModules.length > 0) {
    let maxLevel = 0;
    dataModules.forEach(m => {
      if (m.level === "M") maxLevel = Math.max(maxLevel, 1);
      if (m.level === "A") maxLevel = Math.max(maxLevel, 2);
    });
    
    tasks.push({
      phase: "Implementação Estrutura de Dados",
      days: 4 + maxLevel * 2,
      description: `Modelagem, criação de tabelas e configuração dos módulos ${dataModules.map(m => m.name).join(", ")}.`
    });
  }
  
  if (integrationModules.length > 0) {
    let maxLevel = 0;
    integrationModules.forEach(m => {
      if (m.level === "M") maxLevel = Math.max(maxLevel, 1);
      if (m.level === "A") maxLevel = Math.max(maxLevel, 2);
    });
    
    tasks.push({
      phase: "Implementação Integrações",
      days: 5 + maxLevel * 2,
      description: `Desenvolvimento de conectores e configuração dos módulos ${integrationModules.map(m => m.name).join(", ")}.`
    });
  }
  
  if (aiModules.length > 0) {
    let maxLevel = 0;
    aiModules.forEach(m => {
      if (m.level === "M") maxLevel = Math.max(maxLevel, 1);
      if (m.level === "A") maxLevel = Math.max(maxLevel, 2);
    });
    
    tasks.push({
      phase: "Implementação Inteligência Artificial",
      days: 6 + maxLevel * 2,
      description: `Configuração, treinamento e integração dos módulos ${aiModules.map(m => m.name).join(", ")}.`
    });
  }
  
  if (automationModules.length > 0) {
    let maxLevel = 0;
    automationModules.forEach(m => {
      if (m.level === "M") maxLevel = Math.max(maxLevel, 1);
      if (m.level === "A") maxLevel = Math.max(maxLevel, 2);
    });
    
    tasks.push({
      phase: "Implementação Automações",
      days: 3 + maxLevel * 2,
      description: `Desenvolvimento dos fluxos automatizados para ${automationModules.map(m => m.name).join(", ")}.`
    });
  }
  
  // Add final tasks
  tasks.push(
    {
      phase: "Testes Integrados",
      days: 4,
      description: "Testes de integração entre módulos, validação de fluxos e correção de bugs."
    },
    {
      phase: "Treinamento e Documentação",
      days: 3,
      description: "Capacitação da equipe e documentação completa do sistema."
    },
    {
      phase: "Deploy e Go-Live",
      days: 2,
      description: "Implantação em produção e acompanhamento inicial."
    }
  );
  
  // Calculate total days
  let totalDays = tasks.reduce((sum, task) => sum + task.days, 0);
  
  // Adjust to fit in 30 days if needed
  if (totalDays > 30) {
    const compressionFactor = 30 / totalDays;
    tasks.forEach(task => {
      task.days = Math.max(1, Math.floor(task.days * compressionFactor));
    });
    totalDays = tasks.reduce((sum, task) => sum + task.days, 0);
    
    // If still over 30, adjust the largest tasks
    if (totalDays > 30) {
      const daysToReduce = totalDays - 30;
      tasks.sort((a, b) => b.days - a.days);
      
      for (let i = 0; i < daysToReduce; i++) {
        if (tasks[i % tasks.length].days > 1) {
          tasks[i % tasks.length].days -= 1;
        }
      }
      
      // Resort tasks by their original order
      tasks.sort((a, b) => {
        const phaseOrder = [
          "Planejamento e Análise",
          "Configuração de Ambiente",
          "Implementação Canais de Comunicação",
          "Implementação Estrutura de Dados",
          "Implementação Integrações",
          "Implementação Inteligência Artificial",
          "Implementação Automações",
          "Testes Integrados",
          "Treinamento e Documentação",
          "Deploy e Go-Live"
        ];
        return phaseOrder.indexOf(a.phase) - phaseOrder.indexOf(b.phase);
      });
    }
  }
  
  // Calculate total days after adjustments
  totalDays = tasks.reduce((sum, task) => sum + task.days, 0);
  
  return { tasks, totalDays };
};

// Generate module scope details based on selected modules and their levels
export const generateModuleScope = (state: CalculatorState) => {
  const moduleDetails: Record<ModuleName, Record<ModuleLevel, string>> = {
    "WhatsApp": {
      "I": "Automação de respostas para mensagens básicas, atendimento inicial automatizado.",
      "M": "Fluxos conversacionais avançados, qualificação de leads, transferência para atendente.",
      "A": "Integração completa com CRM, personalização avançada, análise de sentimento, chatbot multilingual."
    },
    "Disparador de Mensagens / Captação": {
      "I": "Envio de mensagens em massa para listas predefinidas, templates básicos.",
      "M": "Segmentação de listas, personalização de mensagens, agendamento de campanhas.",
      "A": "Automação completa de funis, triggers comportamentais, A/B testing, métricas avançadas."
    },
    "Banco de Dados": {
      "I": "Estrutura básica para armazenamento de dados, consultas simples.",
      "M": "Modelagem relacional completa, otimização de consultas, backup automático.",
      "A": "Bancos NoSQL, redundância, alta disponibilidade, sistemas distribuídos."
    },
    "IA Avançada & Prompt Studio": {
      "I": "Assistente virtual com respostas baseadas em conhecimento predefinido.",
      "M": "Análise de padrões, reconhecimento de entidades, processamento de linguagem natural.",
      "A": "Modelos customizados, aprendizado contínuo, análise multimodal (texto, imagem, áudio)."
    },
    "Integração ERP": {
      "I": "Sincronização básica de dados entre sistemas, importação/exportação agendada.",
      "M": "Integração bidirecional em tempo real, mapeamento avançado de dados.",
      "A": "Orquestração complexa, tratamento de exceções, validações customizadas."
    },
    "Integração CRM": {
      "I": "Sincronização de contatos e leads, atualização de status.",
      "M": "Automação de jornadas de cliente, scoring de leads, histórico de interações.",
      "A": "Customer journey completa, previsão de comportamento, integração omnichannel."
    },
    "RAG / Base de Conhecimento": {
      "I": "Repositório de documentos com busca textual, categorização básica.",
      "M": "Indexação semântica, perguntas e respostas, busca contextual.",
      "A": "Aprendizado contínuo, análise de documentos multilingue, extração de insights."
    },
    "Google Drive Connector": {
      "I": "Acesso a documentos armazenados no Drive, upload/download básico.",
      "M": "Sincronização automática, conversão de formatos, organização dinâmica.",
      "A": "Controle granular de permissões, versionamento, integração com workflows."
    },
    "Análise de Dados + Dashboard": {
      "I": "Dashboard com métricas básicas, relatórios estáticos.",
      "M": "Visualizações interativas, filtros dinâmicos, exportação de relatórios.",
      "A": "Business Intelligence completo, previsões, alertas inteligentes, KPIs customizáveis."
    },
    "Lembretes & Automação Follow-up": {
      "I": "Lembretes programados, notificações básicas.",
      "M": "Sequências de follow-up, gatilhos baseados em comportamento.",
      "A": "Jornadas complexas, personalização avançada, otimização baseada em respostas."
    },
    "Outro": {
      "I": "Desenvolvimento básico customizado conforme necessidade.",
      "M": "Desenvolvimento intermediário com maior personalização.",
      "A": "Desenvolvimento complexo totalmente customizado para necessidades específicas."
    }
  };
  
  const scopeDetails: {module: string; level: string; description: string}[] = [];
  
  state.selectedModules.forEach(module => {
    if (module.level) {
      const levelLabel = module.level === "I" ? "Iniciante" : module.level === "M" ? "Intermediário" : "Avançado";
      const description = moduleDetails[module.name][module.level];
      
      scopeDetails.push({
        module: module.name,
        level: levelLabel,
        description
      });
    }
  });
  
  return scopeDetails;
};

// Generate project deliverables based on selected modules
export const generateDeliverables = (state: CalculatorState) => {
  const baseDeliverables = [
    "Manual de usuário",
    "Documentação técnica",
    "Treinamento inicial da equipe"
  ];
  
  const moduleDeliverables: Record<ModuleName, string[]> = {
    "WhatsApp": ["Fluxos de conversação configurados", "Integração ativa com WhatsApp Business API"],
    "Disparador de Mensagens / Captação": ["Templates de mensagens", "Segmentação de listas"],
    "Banco de Dados": ["Modelo de dados", "Esquema de backup", "Políticas de segurança"],
    "IA Avançada & Prompt Studio": ["Conjuntos de prompts", "Guia de uso para IA"],
    "Integração ERP": ["Mapeamento de campos", "Documentação de interfaces"],
    "Integração CRM": ["Workflow de leads", "Mapeamento de jornada do cliente"],
    "RAG / Base de Conhecimento": ["Base de conhecimento indexada", "Motor de busca semântica"],
    "Google Drive Connector": ["Estrutura de pastas", "Configuração de sincronização"],
    "Análise de Dados + Dashboard": ["Dashboards configurados", "Relatórios automatizados"],
    "Lembretes & Automação Follow-up": ["Fluxos de automação", "Templates de notificação"],
    "Outro": ["Especificação detalhada", "Documentação personalizada"]
  };
  
  const deliverables = [...baseDeliverables];
  
  state.selectedModules.forEach(module => {
    if (moduleDeliverables[module.name]) {
      deliverables.push(...moduleDeliverables[module.name]);
    }
  });
  
  // Remove duplicates and sort
  return Array.from(new Set(deliverables)).sort();
};

// Generate business value by module
export const generateBusinessValue = (state: CalculatorState) => {
  const moduleBusinessValue: Record<ModuleName, string[]> = {
    "WhatsApp": [
      "Redução de 60% no tempo de resposta ao cliente",
      "Aumento de 35% na taxa de resolução no primeiro contato"
    ],
    "Disparador de Mensagens / Captação": [
      "Aumento de 40% na taxa de conversão de leads",
      "Redução de 30% no custo de aquisição de clientes"
    ],
    "Banco de Dados": [
      "Centralização completa da informação do negócio",
      "Redução de 50% no tempo de acesso aos dados"
    ],
    "IA Avançada & Prompt Studio": [
      "Automação de 70% das interações repetitivas",
      "Melhoria de 45% na satisfação do cliente"
    ],
    "Integração ERP": [
      "Redução de 80% em erros de entrada de dados",
      "Aceleração de 60% nos processos administrativos"
    ],
    "Integração CRM": [
      "Visão 360° do cliente em uma única plataforma",
      "Aumento de 25% nas vendas por upsell/cross-sell"
    ],
    "RAG / Base de Conhecimento": [
      "Redução de 40% no tempo de treinamento",
      "Melhoria de 50% na consistência de respostas"
    ],
    "Google Drive Connector": [
      "Redução de 35% no tempo de gestão documental",
      "Eliminação de 90% dos arquivos duplicados"
    ],
    "Análise de Dados + Dashboard": [
      "Tomada de decisão baseada em dados em tempo real",
      "Identificação proativa de oportunidades de negócio"
    ],
    "Lembretes & Automação Follow-up": [
      "Eliminação de 95% dos follow-ups esquecidos",
      "Aumento de 30% na taxa de recompra de clientes"
    ],
    "Outro": [
      "Solução personalizada alinhada às necessidades específicas",
      "Vantagem competitiva através de tecnologia customizada"
    ]
  };
  
  const businessValues: string[] = [];
  
  state.selectedModules.forEach(module => {
    if (moduleBusinessValue[module.name]) {
      businessValues.push(...moduleBusinessValue[module.name]);
    }
  });
  
  // Remove duplicates
  return Array.from(new Set(businessValues));
};

// Generate commercial proposal
export const generateCommercialProposal = (state: CalculatorState) => {
  const clientName = state.clientName || "Cliente";
  const companyName = state.companyName || "Empresa";
  const totalPrice = calculateTotalPrice(state);
  const timeline = generateImplementationTimeline(state);
  const scopeDetails = generateModuleScope(state);
  const deliverables = generateDeliverables(state);
  const businessValues = generateBusinessValue(state);
  
  // Format date for the proposal
  const now = new Date();
  const formattedDate = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth()+1).toString().padStart(2, '0')}/${now.getFullYear()}`;
  
  return `
PROPOSTA COMERCIAL - TARS AI

Data: ${formattedDate}

Prezado(a) ${clientName},

Agradecemos a oportunidade de apresentar nossa proposta para o desenvolvimento de uma solução de automação inteligente para a ${companyName}.

1. ESCOPO DO PROJETO

${state.projectDescription || "Desenvolvimento e implementação de uma solução personalizada de automação utilizando inteligência artificial."}

2. DETALHAMENTO DOS MÓDULOS

${scopeDetails.map(detail => `- ${detail.module} (${detail.level}): ${detail.description}`).join("\n")}

3. CRONOGRAMA DE IMPLEMENTAÇÃO - 30 DIAS

Prazo total: ${timeline.totalDays} dias

${timeline.tasks.map((task, index) => `${index + 1}. ${task.phase} - ${task.days} dias - ${task.description}`).join("\n")}

4. ENTREGAS DO PROJETO

${deliverables.map(item => `- ${item}`).join("\n")}

5. VALOR DE NEGÓCIO

${businessValues.map(value => `- ${value}`).join("\n")}

6. INVESTIMENTO

- Implementação: R$ ${totalPrice.implementation.toLocaleString('pt-BR')}
${totalPrice.discountAmount > 0 ? `  * Valor original: R$ ${totalPrice.originalImplementation.toLocaleString('pt-BR')}` : ""}
${totalPrice.discountAmount > 0 ? `  * Desconto aplicado: R$ ${totalPrice.discountAmount.toLocaleString('pt-BR')} (${state.discount}%)` : ""}

- Mensalidade (manutenção e suporte): R$ ${totalPrice.monthly.toLocaleString('pt-BR')}

7. CONDIÇÕES COMERCIAIS

- Prazo de implementação: 30 dias corridos
- Forma de pagamento da implementação: 40% de entrada + 60% na entrega
- Mensalidade: Cobrada mensalmente após a conclusão da implementação

${state.notes ? `8. OBSERVAÇÕES:\n${state.notes}` : ""}

Estamos à disposição para esclarecer quaisquer dúvidas.

Atenciosamente,

Equipe TARS AI
`;
};
