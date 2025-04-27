import { 
  AITraining, 
  AIFeature, 
  AITool, 
  AILevel, 
  IndustryArea, 
  ModuleName, 
  Segment, 
  SubNiche,
  AutomationObjective 
} from "./enums";

export const segmentsData = [
  {
    id: "1",
    name: "Saúde" as Segment,
    icon: "heart-pulse",
    subNiches: [
      { id: "1-1", name: "Clínicas" as SubNiche },
      { id: "1-2", name: "Hospitais" as SubNiche },
      { id: "1-3", name: "Consultórios" as SubNiche }
    ]
  },
  {
    id: "2",
    name: "E-commerce" as Segment,
    icon: "shopping-cart",
    subNiches: [
      { id: "2-1", name: "Lojas Online" as SubNiche },
      { id: "2-2", name: "Marketplace" as SubNiche },
      { id: "2-3", name: "Dropshipping" as SubNiche }
    ]
  },
  {
    id: "3",
    name: "Indústria" as Segment,
    icon: "factory",
    subNiches: [
      { id: "3-1", name: "Manufatura" as SubNiche },
      { id: "3-2", name: "Produção em Massa" as SubNiche },
      { id: "3-3", name: "Montagem" as SubNiche }
    ]
  },
  {
    id: "4",
    name: "Serviços" as Segment,
    icon: "settings",
    subNiches: [
      { id: "4-1", name: "Consultorias" as SubNiche },
      { id: "4-2", name: "Agências" as SubNiche },
      { id: "4-3", name: "Escritórios" as SubNiche }
    ]
  },
  {
    id: "5",
    name: "Construção Civil" as Segment,
    icon: "hard-hat",
    subNiches: [
      { id: "5-1", name: "Construtoras" as SubNiche },
      { id: "5-2", name: "Engenharia" as SubNiche },
      { id: "5-3", name: "Arquitetura" as SubNiche }
    ]
  }
];

export const industryAreas: { id: string; name: IndustryArea }[] = [
  { id: "1", name: "Alimentos e Bebidas" },
  { id: "2", name: "Automotiva" },
  { id: "3", name: "Eletrônicos" },
  { id: "4", name: "Farmacêutica" },
  { id: "5", name: "Moda e Vestuário" },
  { id: "6", name: "Móveis" },
  { id: "7", name: "Química" },
  { id: "8", name: "Construção" },
  { id: "9", name: "Energia" }
];

export const aiLevels: AILevel[] = [
  "Basic",
  "Intermediate", 
  "Advanced"
];

export const aiFeatures: { name: AIFeature; value: number }[] = [
  { name: "Chatbot", value: 500 },
  { name: "Recomendações", value: 750 },
  { name: "Processamento de Texto", value: 1000 },
  { name: "Visão Computacional", value: 1250 },
  { name: "Previsão de Dados", value: 1500 },
  { name: "Automação", value: 1750 }
];

export const aiTraining: { name: AITraining; value: number }[] = [
  { name: "Treinamento Básico", value: 1000 },
  { name: "Treinamento Personalizado", value: 2500 },
  { name: "Treinamento Avançado", value: 5000 }
];

export const aiTools: { name: AITool; value: number }[] = [
  { name: "OpenAI", value: 1500 },
  { name: "TensorFlow", value: 1750 },
  { name: "PyTorch", value: 2000 },
  { name: "IBM Watson", value: 2250 },
  { name: "Google AI", value: 2500 },
  { name: "Amazon AI", value: 2750 }
];

export const aiLevelThresholds = {
  simple: { max: 2000 },
  intermediate: { max: 5000 }
};

export const automationObjectives: AutomationObjective[] = [
  "ReducaoCustos",
  "AumentoEficiencia",
  "MelhoriaNaQualidade",
  "ExpandirOperacoes",
  "OtimizarProcessos"
];

export const defaultModules: { name: ModuleName; basePrice: number }[] = [
  { name: "CRM", basePrice: 5000 },
  { name: "ERP", basePrice: 10000 },
  { name: "E-commerce", basePrice: 7000 },
  { name: "Analytics", basePrice: 4000 },
  { name: "RH", basePrice: 3500 },
  { name: "Financeiro", basePrice: 6000 },
  { name: "Estoque", basePrice: 4500 },
  { name: "Produção", basePrice: 8000 },
  { name: "Marketing", basePrice: 5500 }
];

export const modulesData: { 
  name: ModuleName; 
  basePrice: number; 
  prices: { easy: number; normal: number; complex: number };
  departmentAvailability: { [department: string]: boolean }
}[] = [
  {
    name: "CRM", 
    basePrice: 5000,
    prices: { easy: 5000, normal: 7500, complex: 12500 },
    departmentAvailability: { "Marketing": true, "Vendas": true }
  },
  {
    name: "ERP", 
    basePrice: 10000,
    prices: { easy: 10000, normal: 15000, complex: 25000 },
    departmentAvailability: { "Financeiro": true, "Operações": true }
  },
  {
    name: "WhatsApp", 
    basePrice: 3000,
    prices: { easy: 3000, normal: 4500, complex: 7500 },
    departmentAvailability: { "Marketing": true, "Vendas": true, "Atendimento": true }
  },
  {
    name: "Análise de Dados + Dashboard", 
    basePrice: 4000,
    prices: { easy: 4000, normal: 6000, complex: 10000 },
    departmentAvailability: { "Marketing": true, "Vendas": true, "Financeiro": true, "RH": true, "Operações": true }
  }
];
