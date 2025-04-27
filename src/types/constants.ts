
import { AIFeature, AILevel, AITool, AITraining, Department, IndustryArea, ModuleName, Segment, SubNiche } from "./enums";

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

export const aiFeatures: AIFeature[] = [
  "Chatbot",
  "Recomendações",
  "Processamento de Texto",
  "Visão Computacional",
  "Previsão de Dados",
  "Automação"
];

export const aiTrainingOptions: AITraining[] = [
  "Treinamento Básico",
  "Treinamento Personalizado",
  "Treinamento Avançado"
];

export const aiTools: AITool[] = [
  "OpenAI",
  "TensorFlow",
  "PyTorch",
  "IBM Watson",
  "Google AI",
  "Amazon AI"
];

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
