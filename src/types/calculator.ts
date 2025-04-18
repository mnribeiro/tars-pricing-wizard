
// Tipos para a calculadora de precificação

export type BusinessNiche = 
  | "Clínicas"
  | "Consultórios"
  | "E-commerce"
  | "Franquias"
  | "Indústria"
  | "Serviços";

export type AutomationObjective = 
  | "Aumentar Vendas"
  | "Reduzir Custos"
  | "Melhorar Experiência"
  | "Otimizar Tempo"
  | "Inteligência Estratégica";

export type AILevel = 
  | "IA Simples"
  | "IA Intermediária"
  | "IA Complexa";

export type ModuleName = 
  | "Banco de Dados"
  | "WhatsApp"
  | "ERP"
  | "CRM"
  | "Lembretes"
  | "Análise de Dados"
  | "Dashboard";

export type ComplexityLevel = "easy" | "normal" | "complex";

export interface Module {
  name: ModuleName;
  basePrice: number;
  complexity: ComplexityLevel | null;
}

export interface CalculatorState {
  clientName: string;
  companyName: string;
  selectedNiche: BusinessNiche | null;
  selectedObjective: AutomationObjective | null;
  selectedAILevel: AILevel | null;
  selectedModules: Module[];
}

// Dados para as opções da calculadora
export const businessNiches: BusinessNiche[] = [
  "Clínicas",
  "Consultórios",
  "E-commerce",
  "Franquias",
  "Indústria",
  "Serviços"
];

export const automationObjectives: AutomationObjective[] = [
  "Aumentar Vendas",
  "Reduzir Custos",
  "Melhorar Experiência",
  "Otimizar Tempo",
  "Inteligência Estratégica"
];

export const aiLevels: { name: AILevel; price: number }[] = [
  { name: "IA Simples", price: 500 },
  { name: "IA Intermediária", price: 1000 },
  { name: "IA Complexa", price: 2000 }
];

export const availableModules: { name: ModuleName; basePrice: number }[] = [
  { name: "Banco de Dados", basePrice: 1000 },
  { name: "WhatsApp", basePrice: 800 },
  { name: "ERP", basePrice: 1200 },
  { name: "CRM", basePrice: 900 },
  { name: "Lembretes", basePrice: 500 },
  { name: "Análise de Dados", basePrice: 1500 },
  { name: "Dashboard", basePrice: 1300 }
];

// Multiplicadores para níveis de complexidade
export const complexityMultipliers: Record<ComplexityLevel, number> = {
  easy: 1.0,
  normal: 1.3,
  complex: 1.6
};

// Função para calcular o preço total
export const calculateTotalPrice = (state: CalculatorState): number => {
  // Preço base do nível de IA (ou 0 se nenhum for selecionado)
  const aiLevelPrice = state.selectedAILevel 
    ? aiLevels.find(ai => ai.name === state.selectedAILevel)?.price || 0
    : 0;
    
  // Soma dos preços dos módulos selecionados * multiplicador de complexidade
  const modulesPrice = state.selectedModules.reduce((total, module) => {
    if (module.complexity === null) return total;
    return total + (module.basePrice * complexityMultipliers[module.complexity]);
  }, 0);
  
  return aiLevelPrice + modulesPrice;
};
