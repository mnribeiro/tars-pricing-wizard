
// Basic Types
export type ComplexityLevel = "easy" | "normal" | "complex";

export const complexityLevels = {
  easy: "Fácil",
  normal: "Intermediário",
  complex: "Avançado"
};

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
}

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
  },
  {
    name: "Outro",
    prices: { I: 1500, M: 3000, A: 5000 },
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
  }
];

// Helper functions
export const getSubNichesBySegment = (segment: Segment): SubNicheData[] => {
  const segmentData = segmentsData.find(s => s.name === segment);
  return segmentData ? segmentData.subNiches : [];
};

export const getDepartmentsBySubNiche = (segment: Segment, subNiche: SubNiche): Department[] => {
  const segmentData = segmentsData.find(s => s.name === segment);
  if (!segmentData) return [];
  
  const subNicheData = segmentData.subNiches.find(sn => sn.name === subNiche);
  return subNicheData ? subNicheData.departments : [];
};

export const getAvailableModules = (department: Department): ModuleName[] => {
  return modulesData
    .filter(module => module.departmentAvailability[department])
    .map(module => module.name);
};

export const calculateTotalPrice = (state: CalculatorState) => {
  let implementationTotal = 0;
  let monthlyTotal = 0;

  // Base price for segment
  if (state.selectedSegment) {
    const segment = segmentsData.find(s => s.name === state.selectedSegment);
    implementationTotal += segment?.basePrice || 0;
  }

  // Base price for sub-niche
  if (state.selectedSegment && state.selectedSubNiche) {
    const segment = segmentsData.find(s => s.name === state.selectedSegment);
    if (segment) {
      const subNiche = segment.subNiches.find(sn => sn.name === state.selectedSubNiche);
      implementationTotal += subNiche?.basePrice || 0;
    }
  }

  // Calculate price for each selected module
  state.selectedModules.forEach(module => {
    if (module.level) {
      const moduleData = modulesData.find(m => m.name === module.name);
      if (moduleData) {
        implementationTotal += moduleData.prices[module.level];
      }
    }
  });

  // Apply discount if any
  if (state.discount > 0) {
    implementationTotal = implementationTotal * (1 - state.discount / 100);
  }

  // Calculate monthly cost (20% of implementation)
  monthlyTotal = implementationTotal * 0.2;

  return {
    implementation: implementationTotal,
    monthly: monthlyTotal
  };
};

export const generateImplementationTimeline = (state: CalculatorState) => {
  const tasks = [
    { phase: "Levantamento / Kickoff", days: 7, description: "Definição detalhada do escopo e planejamento do projeto." },
    { phase: "Configurações Base + Integrações", days: 7, description: "Implementação das configurações básicas e integrações necessárias." },
    { phase: "Testes / Treinamento", days: 7, description: "Realização de testes de qualidade e treinamento dos usuários." },
    { phase: "Go-Live / Handover", days: 7, description: "Implementação final, ajustes e entrega do projeto." }
  ];

  return {
    totalDays: 28,
    tasks: tasks
  };
};

export const generateCommercialProposal = (state: CalculatorState): string => {
  const totalPrice = calculateTotalPrice(state);

  return `
Proposta Comercial

Prezado(a) ${state.clientName},

Agradecemos a oportunidade de apresentar nossa proposta para o desenvolvimento de uma solução de automação inteligente para a sua empresa, ${state.companyName}.

Escopo do Projeto:
- Cliente: ${state.clientName}
- Empresa: ${state.companyName}
- Telefone: ${state.clientPhone}
- Descrição do Projeto: ${state.projectDescription}
- Segmento: ${state.selectedSegment}
- Subnicho: ${state.selectedSubNiche}
- Departamento: ${state.selectedDepartment}

Módulos Selecionados:
${state.selectedModules.map(module => `  - ${module.name} (${module.level === 'I' ? 'Iniciante' : module.level === 'M' ? 'Intermediário' : 'Avançado'})\n`).join('')}

Investimento:
- Implementação: R$ ${totalPrice.implementation.toLocaleString('pt-BR')}
- Mensalidade (Manutenção): R$ ${totalPrice.monthly.toLocaleString('pt-BR')}

Cronograma de Implementação:
${generateImplementationTimeline(state).tasks.map(task => `  - ${task.phase}: ${task.days} dias\n`).join('')}

Condições Gerais:
- Prazo de Entrega: 28 dias
- Forma de Pagamento: [A combinar]

Observações:
${state.notes || "Nenhuma observação adicional."}

Aguardamos ansiosamente a sua aprovação para darmos início a este projeto inovador.

Atenciosamente,
TARS AI
`;
};
