import { AIData, AILevelThresholds, AIToolsData, AITrainingData, ModuleData, SegmentData } from "./interfaces";
import { AIFeature, AITool, AITraining } from "./enums";

export const complexityLevels = {
  easy: "Básico",
  normal: "Intermediário",
  complex: "Avançado"
} as const;

export const aiLevelThresholds: AILevelThresholds = {
  simple: { max: 5000 },
  intermediate: { max: 10000 }
};

export const businessNiches = [
  { name: "Saúde", basePrice: 2000 },
  { name: "Varejo", basePrice: 2200 },
  { name: "E-commerce", basePrice: 2500 },
  { name: "Franquias", basePrice: 3000 },
  { name: "Indústria", basePrice: 3500 },
  { name: "Serviços", basePrice: 1800 }
];

export const industryAreas = [
  { name: "Logística" },
  { name: "Produção" },
  { name: "Inteligência de Negócios" },
  { name: "Envio de Relatórios" }
];

export const automationObjectives = [
  "Aumentar Vendas",
  "Reduzir Custos",
  "Melhorar Experiência",
  "Otimizar Tempo",
  "Inteligência Estratégica"
];

export const aiFeatures: AIData[] = [
  { name: "Chatbots Inteligentes" as AIFeature, value: 3000 },
  { name: "Análise Preditiva" as AIFeature, value: 4000 },
  { name: "Processamento de Linguagem Natural" as AIFeature, value: 2500 },
  { name: "Reconhecimento de Imagens" as AIFeature, value: 3500 },
  { name: "Automação de Processos Robóticos" as AIFeature, value: 4500 }
];

export const aiTraining: AITrainingData[] = [
  { name: "Treinamento Básico" as AITraining, value: 1500 },
  { name: "Treinamento Avançado" as AITraining, value: 3000 },
  { name: "Consultoria Personalizada" as AITraining, value: 5000 }
];

export const aiTools: AIToolsData[] = [
  { name: "Google AI Platform" as AITool, value: 2000 },
  { name: "Amazon SageMaker" as AITool, value: 2500 },
  { name: "Microsoft Azure AI" as AITool, value: 3000 },
  { name: "IBM Watson" as AITool, value: 3500 }
];

export const segmentsData: SegmentData[] = [
  {
    name: "Saúde",
    basePrice: 2000,
    subNiches: [
      {
        name: "Clínicas Médicas",
        basePrice: 2500,
        departments: ["Comercial", "Financeiro", "Marketing", "Atendimento"]
      },
      {
        name: "Consultórios Odontológicos",
        basePrice: 2300,
        departments: ["Comercial", "Financeiro", "Marketing", "Atendimento"]
      },
      {
        name: "Laboratórios",
        basePrice: 3000,
        departments: ["Financeiro", "Técnico", "Qualidade", "Logística"]
      }
    ]
  },
  {
    name: "Construção Civil",
    basePrice: 3000,
    subNiches: [
      {
        name: "Construtoras",
        basePrice: 3500,
        departments: ["Comercial", "Financeiro", "Engenharia", "Suprimentos"]
      },
      {
        name: "Incorporadoras",
        basePrice: 3300,
        departments: ["Comercial", "Financeiro", "Marketing", "Projetos"]
      }
    ]
  },
  {
    name: "E-commerce",
    basePrice: 2500,
    subNiches: [
      {
        name: "Moda",
        basePrice: 2800,
        departments: ["Comercial", "Marketing", "Logística", "Financeiro"]
      },
      {
        name: "Eletrônicos",
        basePrice: 3200,
        departments: ["Comercial", "Marketing", "Logística", "Financeiro"]
      }
    ]
  },
  {
    name: "Indústria",
    basePrice: 3500,
    subNiches: [
      {
        name: "Alimentos",
        basePrice: 3800,
        departments: ["Produção", "Qualidade", "Logística", "Financeiro"]
      },
      {
        name: "Automotiva",
        basePrice: 4200,
        departments: ["Produção", "Engenharia", "Qualidade", "Logística"]
      }
    ]
  },
  {
    name: "Serviços",
    basePrice: 1800,
    subNiches: [
      {
        name: "Consultoria",
        basePrice: 2200,
        departments: ["Comercial", "Financeiro", "Marketing", "Operacional"]
      },
      {
        name: "Treinamento",
        basePrice: 2000,
        departments: ["Comercial", "Marketing", "Operacional", "Financeiro"]
      }
    ]
  },
  {
    name: "Varejo",
    basePrice: 2200,
    subNiches: [
      {
        name: "Moda e Acessórios",
        basePrice: 2500,
        departments: [
          "Comercial",
          "Financeiro",
          "Compras",
          "Operacional",
          "Marketing",
          "Administrativo / RH"
        ]
      },
      {
        name: "Eletrônicos e Eletrodomésticos",
        basePrice: 2800,
        departments: [
          "Comercial",
          "Financeiro",
          "Suporte Técnico",
          "Operacional",
          "Compras",
          "Marketing",
          "Administrativo / RH"
        ]
      },
      {
        name: "Casa, Construção e Decoração",
        basePrice: 3000,
        departments: [
          "Comercial",
          "Financeiro",
          "Logística",
          "Compras",
          "Projetos",
          "Marketing",
          "Administrativo / RH"
        ]
      },
      {
        name: "Beleza, Saúde e Bem-Estar",
        basePrice: 2300,
        departments: [
          "Comercial",
          "Financeiro",
          "Compras",
          "Operacional",
          "Marketing",
          "Pós-venda",
          "Administrativo / RH"
        ]
      }
    ]
  }
];

export const modulesData: ModuleData[] = [
  {
    name: "WhatsApp",
    basePrice: 1000,
    prices: {
      easy: 1000,
      normal: 2000,
      complex: 3000
    },
    departmentAvailability: {
      Comercial: true,
      Financeiro: true,
      Marketing: true,
      Atendimento: true,
      Engenharia: true,
      Suprimentos: true,
      Projetos: true,
      Produção: true,
      Qualidade: true,
      Logística: true,
      "Administrativo / RH": true,
      "Suporte Técnico": true,
      Compras: true,
      Operacional: true,
      "Pós-venda": true
    }
  },
  {
    name: "Disparador de Mensagens / Captação",
    basePrice: 800,
    prices: {
      easy: 800,
      normal: 1600,
      complex: 2400
    },
    departmentAvailability: {
      Comercial: true,
      Marketing: true
    }
  },
  {
    name: "Banco de Dados",
    basePrice: 1500,
    prices: {
      easy: 1500,
      normal: 3000,
      complex: 4500
    },
    departmentAvailability: {
      Comercial: true,
      Financeiro: true,
      Marketing: true,
      Atendimento: true,
      Engenharia: true,
      Suprimentos: true,
      Projetos: true,
      Produção: true,
      Qualidade: true,
      Logística: true,
      "Administrativo / RH": true,
      "Suporte Técnico": true,
      Compras: true,
      Operacional: true,
      "Pós-venda": true
    }
  },
  {
    name: "IA Avançada & Prompt Studio",
    basePrice: 2000,
    prices: {
      easy: 2000,
      normal: 4000,
      complex: 6000
    },
    departmentAvailability: {
      Comercial: true,
      Marketing: true,
      "Suporte Técnico": true
    }
  },
  {
    name: "Integração ERP",
    basePrice: 2500,
    prices: {
      easy: 2500,
      normal: 5000,
      complex: 7500
    },
    departmentAvailability: {
      Financeiro: true,
      Logística: true,
      Produção: true
    }
  },
  {
    name: "Integração CRM",
    basePrice: 2200,
    prices: {
      easy: 2200,
      normal: 4400,
      complex: 6600
    },
    departmentAvailability: {
      Comercial: true,
      Marketing: true,
      Atendimento: true
    }
  },
  {
    name: "RAG / Base de Conhecimento",
    basePrice: 1800,
    prices: {
      easy: 1800,
      normal: 3600,
      complex: 5400
    },
    departmentAvailability: {
      "Suporte Técnico": true,
      Atendimento: true
    }
  },
  {
    name: "Google Drive Connector",
    basePrice: 1200,
    prices: {
      easy: 1200,
      normal: 2400,
      complex: 3600
    },
    departmentAvailability: {
      "Administrativo / RH": true,
      Financeiro: true
    }
  },
  {
    name: "Análise de Dados + Dashboard",
    basePrice: 3000,
    prices: {
      easy: 3000,
      normal: 6000,
      complex: 9000
    },
    departmentAvailability: {
      Comercial: true,
      Marketing: true,
      Financeiro: true
    }
  },
  {
    name: "Lembretes & Automação Follow-up",
    basePrice: 1500,
    prices: {
      easy: 1500,
      normal: 3000,
      complex: 4500
    },
    departmentAvailability: {
      Comercial: true,
      Marketing: true,
      Atendimento: true
    }
  }
];

export const availableModules = modulesData.map(module => module.name);
