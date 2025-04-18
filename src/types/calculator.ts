
// Tipos para a calculadora de precificação

export type BusinessNiche = 
  | "Clínicas"
  | "Consultórios"
  | "E-commerce"
  | "Franquias"
  | "Indústria"
  | "Serviços"
  | "Saúde"
  | "Varejo";

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

export type AIFeature = 
  | "Processamento de Linguagem Natural" 
  | "Chatbot Integrado" 
  | "Análise Preditiva" 
  | "Reconhecimento de Imagem" 
  | "Machine Learning Avançado"
  | "Automação de Processos";

export type ModuleName = 
  | "Banco de Dados"
  | "WhatsApp"
  | "ERP"
  | "CRM"
  | "Lembretes"
  | "Análise de Dados"
  | "Dashboard"
  | "API de Integração"
  | "Portal do Cliente"
  | "Aplicativo Mobile";

export type ComplexityLevel = "easy" | "normal" | "complex";

export interface Module {
  name: ModuleName;
  basePrice: number;
  complexity: ComplexityLevel | null;
}

export interface ModulePricing {
  name: ModuleName;
  basePrice: number;
  prices: {
    easy: number;
    normal: number;
    complex: number;
  };
}

export interface CalculatorState {
  clientName: string;
  companyName: string;
  selectedNiche: BusinessNiche | null;
  selectedObjective: AutomationObjective | null;
  selectedAILevel: AILevel | null;
  selectedAIFeatures: AIFeature[];
  selectedModules: Module[];
}

// Dados para as opções da calculadora
export const businessNiches: BusinessNiche[] = [
  "Clínicas",
  "Consultórios",
  "E-commerce",
  "Franquias",
  "Indústria",
  "Serviços",
  "Saúde",
  "Varejo"
];

export const automationObjectives: AutomationObjective[] = [
  "Aumentar Vendas",
  "Reduzir Custos",
  "Melhorar Experiência",
  "Otimizar Tempo",
  "Inteligência Estratégica"
];

export const aiFeatures: { name: AIFeature; value: number }[] = [
  { name: "Processamento de Linguagem Natural", value: 500 },
  { name: "Chatbot Integrado", value: 400 },
  { name: "Análise Preditiva", value: 700 },
  { name: "Reconhecimento de Imagem", value: 600 },
  { name: "Machine Learning Avançado", value: 800 },
  { name: "Automação de Processos", value: 500 }
];

export const aiLevelThresholds = {
  simple: { min: 0, max: 1200, price: 500 },
  intermediate: { min: 1201, max: 2500, price: 1000 },
  complex: { min: 2501, max: Infinity, price: 2000 }
};

export const availableModules: ModulePricing[] = [
  { 
    name: "Banco de Dados", 
    basePrice: 1000,
    prices: { easy: 1000, normal: 1300, complex: 1600 }
  },
  { 
    name: "WhatsApp", 
    basePrice: 800,
    prices: { easy: 800, normal: 1040, complex: 1280 }
  },
  { 
    name: "ERP", 
    basePrice: 1200,
    prices: { easy: 1200, normal: 1560, complex: 1920 }
  },
  { 
    name: "CRM", 
    basePrice: 900,
    prices: { easy: 900, normal: 1170, complex: 1440 }
  },
  { 
    name: "Lembretes", 
    basePrice: 500,
    prices: { easy: 500, normal: 650, complex: 800 }
  },
  { 
    name: "Análise de Dados", 
    basePrice: 1500,
    prices: { easy: 1500, normal: 1950, complex: 2400 }
  },
  { 
    name: "Dashboard", 
    basePrice: 1300,
    prices: { easy: 1300, normal: 1690, complex: 2080 }
  },
  { 
    name: "API de Integração", 
    basePrice: 1100,
    prices: { easy: 1100, normal: 1430, complex: 1760 }
  },
  { 
    name: "Portal do Cliente", 
    basePrice: 1400,
    prices: { easy: 1400, normal: 1820, complex: 2240 }
  },
  { 
    name: "Aplicativo Mobile", 
    basePrice: 1800,
    prices: { easy: 1800, normal: 2340, complex: 2880 }
  }
];

// Multiplicadores para níveis de complexidade
export const complexityMultipliers: Record<ComplexityLevel, number> = {
  easy: 1.0,
  normal: 1.3,
  complex: 1.6
};

// Função para calcular o preço total
export const calculateTotalPrice = (state: CalculatorState): { implementation: number, monthly: number } => {
  // Calcular valor total de recursos de IA selecionados
  const aiTotalValue = state.selectedAIFeatures.reduce((total, feature) => {
    const featureObj = aiFeatures.find(item => item.name === feature);
    return total + (featureObj?.value || 0);
  }, 0);
  
  // Determinar nível de IA e preço baseado no valor total
  const aiLevelPrice = aiTotalValue <= aiLevelThresholds.simple.max 
    ? aiLevelThresholds.simple.price
    : aiTotalValue <= aiLevelThresholds.intermediate.max
      ? aiLevelThresholds.intermediate.price
      : aiLevelThresholds.complex.price;
    
  // Soma dos preços dos módulos selecionados com preço baseado na complexidade
  const modulesPrice = state.selectedModules.reduce((total, module) => {
    if (module.complexity === null) return total;
    
    const modulePricing = availableModules.find(m => m.name === module.name);
    const price = modulePricing?.prices[module.complexity] || 0;
    
    return total + price;
  }, 0);
  
  const implementationTotal = aiLevelPrice + modulesPrice;
  const monthlyTotal = implementationTotal * 0.2; // 20% do valor da implementação
  
  return {
    implementation: implementationTotal,
    monthly: monthlyTotal
  };
};

// Função para gerar estimativa de tempo de implementação
export const generateImplementationTimeline = (state: CalculatorState): { totalDays: number, tasks: { phase: string, days: number }[] } => {
  // Tempo base para configuração inicial
  let baseDays = 5;
  
  // Tempo adicional baseado no nível de IA
  const aiDays = state.selectedAIFeatures.length * 2;
  
  // Tempo para cada módulo baseado na complexidade
  const moduleDays = state.selectedModules.reduce((total, module) => {
    if (module.complexity === null) return total;
    
    // Dias por complexidade
    const complexityDays = {
      easy: 3,
      normal: 5,
      complex: 8
    };
    
    return total + complexityDays[module.complexity];
  }, 0);
  
  const totalDays = baseDays + aiDays + moduleDays;
  
  // Dividir em fases de implementação
  const phases = [
    { phase: "Análise e Planejamento", days: Math.max(3, Math.floor(totalDays * 0.2)) },
    { phase: "Desenvolvimento de Infraestrutura", days: Math.max(5, Math.floor(totalDays * 0.3)) },
    { phase: "Integração de Módulos", days: Math.max(5, Math.floor(totalDays * 0.3)) },
    { phase: "Testes e Ajustes", days: Math.max(2, Math.floor(totalDays * 0.1)) },
    { phase: "Treinamento e Implantação", days: Math.max(2, Math.floor(totalDays * 0.1)) }
  ];
  
  return {
    totalDays,
    tasks: phases
  };
};
