
import { AITraining, AIFeature, AITool, AILevel, IndustryArea, ModuleName } from "./enums";

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

export const industryAreas: IndustryArea[] = [
  "Alimentos e Bebidas",
  "Automotiva",
  "Eletrônicos",
  "Farmacêutica",
  "Moda e Vestuário",
  "Móveis",
  "Química",
  "Construção",
  "Energia"
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

export const automationObjectives: { value: string; label: string }[] = [
  { value: "ReducaoCustos", label: "Redução de Custos" },
  { value: "AumentoEficiencia", label: "Aumento de Eficiência" },
  { value: "MelhoriaNaQualidade", label: "Melhoria na Qualidade" },
  { value: "ExpandirOperacoes", label: "Expandir Operações" },
  { value: "OtimizarProcessos", label: "Otimizar Processos" }
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
  // Add more module data as needed
];
