
// Tipos para a calculadora de precificação

export type BusinessNiche = 
  | "Saúde"
  | "Varejo"
  | "E-commerce"
  | "Franquias"
  | "Indústria"
  | "Serviços";

export type IndustryArea = 
  | "Logística" 
  | "Produção" 
  | "Inteligência de Negócios" 
  | "Envio de Relatórios";

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

export type AITraining = 
  | "Treinamento Básico"
  | "Treinamento Intermediário"
  | "Treinamento Avançado";

export type AITool = 
  | "Reconhecimento de Padrões"
  | "Aprendizado Supervisionado"
  | "Aprendizado Não-Supervisionado"
  | "Processamento de Linguagem Natural"
  | "Visão Computacional";

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
  quantity?: number;
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
  clientPhone: string;
  initialIdea: string;
  selectedNiche: BusinessNiche | null;
  nicheUnits: number;
  selectedIndustryArea: IndustryArea | null;
  whatsappNumbers: number;
  selectedObjectives: AutomationObjective[];
  selectedAILevel: AILevel | null;
  selectedAIFeatures: AIFeature[];
  selectedAITraining: AITraining | null;
  selectedAITools: AITool[];
  selectedModules: Module[];
}

// Dados para as opções da calculadora
export const businessNiches: { name: BusinessNiche; basePrice: number }[] = [
  { name: "Saúde", basePrice: 3000 },
  { name: "Varejo", basePrice: 4000 },
  { name: "E-commerce", basePrice: 3500 },
  { name: "Franquias", basePrice: 5000 },
  { name: "Indústria", basePrice: 6000 },
  { name: "Serviços", basePrice: 3800 }
];

export const industryAreas: { name: IndustryArea; priceMultiplier: number }[] = [
  { name: "Logística", priceMultiplier: 1.2 },
  { name: "Produção", priceMultiplier: 1.5 },
  { name: "Inteligência de Negócios", priceMultiplier: 1.8 },
  { name: "Envio de Relatórios", priceMultiplier: 1.3 }
];

export const automationObjectives: AutomationObjective[] = [
  "Aumentar Vendas",
  "Reduzir Custos",
  "Melhorar Experiência",
  "Otimizar Tempo",
  "Inteligência Estratégica"
];

// AI Features, Training and Tools
export const aiFeatures: { name: AIFeature; value: number }[] = [
  { name: "Processamento de Linguagem Natural", value: 800 },
  { name: "Chatbot Integrado", value: 600 },
  { name: "Análise Preditiva", value: 1200 },
  { name: "Reconhecimento de Imagem", value: 1000 },
  { name: "Machine Learning Avançado", value: 1500 },
  { name: "Automação de Processos", value: 700 }
];

export const aiTraining: { name: AITraining; value: number }[] = [
  { name: "Treinamento Básico", value: 500 },
  { name: "Treinamento Intermediário", value: 1000 },
  { name: "Treinamento Avançado", value: 2000 }
];

export const aiTools: { name: AITool; value: number }[] = [
  { name: "Reconhecimento de Padrões", value: 300 },
  { name: "Aprendizado Supervisionado", value: 500 },
  { name: "Aprendizado Não-Supervisionado", value: 700 },
  { name: "Processamento de Linguagem Natural", value: 600 },
  { name: "Visão Computacional", value: 800 }
];

export const aiLevelThresholds = {
  simple: { min: 0, max: 1500, price: 800 },
  intermediate: { min: 1501, max: 3000, price: 1600 },
  complex: { min: 3001, max: Infinity, price: 3200 }
};

export const availableModules: ModulePricing[] = [
  { 
    name: "Banco de Dados", 
    basePrice: 1000,
    prices: { easy: 1000, normal: 2000, complex: 4000 }
  },
  { 
    name: "WhatsApp", 
    basePrice: 800,
    prices: { easy: 800, normal: 1600, complex: 3200 }
  },
  { 
    name: "ERP", 
    basePrice: 1200,
    prices: { easy: 1200, normal: 2400, complex: 4800 }
  },
  { 
    name: "CRM", 
    basePrice: 900,
    prices: { easy: 900, normal: 1800, complex: 3600 }
  },
  { 
    name: "Lembretes", 
    basePrice: 500,
    prices: { easy: 500, normal: 1000, complex: 2000 }
  },
  { 
    name: "Análise de Dados", 
    basePrice: 1500,
    prices: { easy: 1500, normal: 3000, complex: 6000 }
  },
  { 
    name: "Dashboard", 
    basePrice: 1300,
    prices: { easy: 1300, normal: 2600, complex: 5200 }
  },
  { 
    name: "API de Integração", 
    basePrice: 1100,
    prices: { easy: 1100, normal: 2200, complex: 4400 }
  },
  { 
    name: "Portal do Cliente", 
    basePrice: 1400,
    prices: { easy: 1400, normal: 2800, complex: 5600 }
  },
  { 
    name: "Aplicativo Mobile", 
    basePrice: 1800,
    prices: { easy: 1800, normal: 3600, complex: 7200 }
  }
];

// Multiplicadores para níveis de complexidade
export const complexityMultipliers: Record<ComplexityLevel, number> = {
  easy: 1.0,
  normal: 2.0,
  complex: 4.0
};

// Função para calcular o preço total
export const calculateTotalPrice = (state: CalculatorState): { implementation: number, monthly: number } => {
  let implementationTotal = 0;
  
  // Preço base do nicho selecionado multiplicado pelo número de unidades
  if (state.selectedNiche) {
    const nicheObj = businessNiches.find(n => n.name === state.selectedNiche);
    if (nicheObj) {
      implementationTotal += nicheObj.basePrice * Math.max(1, state.nicheUnits);
    }
  }
  
  // Adicional para área específica de indústria
  if (state.selectedNiche === "Indústria" && state.selectedIndustryArea) {
    const areaObj = industryAreas.find(a => a.name === state.selectedIndustryArea);
    if (areaObj) {
      implementationTotal = implementationTotal * areaObj.priceMultiplier;
    }
  }
  
  // Adicional para cada número de WhatsApp
  if (state.whatsappNumbers > 0 && state.selectedModules.some(m => m.name === "WhatsApp")) {
    const whatsappModule = availableModules.find(m => m.name === "WhatsApp");
    if (whatsappModule) {
      const moduleObj = state.selectedModules.find(m => m.name === "WhatsApp");
      const complexity = moduleObj?.complexity || "easy";
      implementationTotal += whatsappModule.prices[complexity] * (state.whatsappNumbers - 1);
    }
  }
  
  // Calcular valor total de recursos de IA, treinamento e ferramentas selecionadas
  const aiTotalValue = state.selectedAIFeatures.reduce((total, feature) => {
    const featureObj = aiFeatures.find(item => item.name === feature);
    return total + (featureObj?.value || 0);
  }, 0);
  
  const aiTrainingValue = state.selectedAITraining ? 
    aiTraining.find(item => item.name === state.selectedAITraining)?.value || 0 : 0;
  
  const aiToolsValue = state.selectedAITools.reduce((total, tool) => {
    const toolObj = aiTools.find(item => item.name === tool);
    return total + (toolObj?.value || 0);
  }, 0);
  
  const totalAIValue = aiTotalValue + aiTrainingValue + aiToolsValue;
  
  // Determinar nível de IA e preço baseado no valor total
  const aiLevelPrice = totalAIValue <= aiLevelThresholds.simple.max 
    ? aiLevelThresholds.simple.price
    : totalAIValue <= aiLevelThresholds.intermediate.max
      ? aiLevelThresholds.intermediate.price
      : aiLevelThresholds.complex.price;
  
  implementationTotal += aiLevelPrice;
  
  // Soma dos preços dos módulos selecionados com preço baseado na complexidade
  implementationTotal += state.selectedModules.reduce((total, module) => {
    if (module.complexity === null) return total;
    
    const modulePricing = availableModules.find(m => m.name === module.name);
    if (!modulePricing) return total;
    
    const price = modulePricing.prices[module.complexity];
    const quantity = module.quantity || 1;
    
    return total + (price * quantity);
  }, 0);
  
  // Adicional para cada objetivo selecionado (exceto o primeiro)
  if (state.selectedObjectives.length > 1) {
    implementationTotal += (state.selectedObjectives.length - 1) * 500;
  }
  
  const monthlyTotal = implementationTotal * 0.2; // 20% do valor da implementação
  
  return {
    implementation: implementationTotal,
    monthly: monthlyTotal
  };
};

// Função para gerar estimativa de tempo de implementação
export const generateImplementationTimeline = (state: CalculatorState): { totalDays: number, tasks: { phase: string, days: number, description: string }[] } => {
  // Total máximo de dias é 45 conforme solicitado
  const totalMaxDays = 45;
  
  // Calcular proporções baseadas na complexidade do projeto
  let complexityFactor = 1;
  
  // Considerar número de módulos e sua complexidade
  const modulesComplexitySum = state.selectedModules.reduce((sum, module) => {
    if (module.complexity === "easy") return sum + 1;
    if (module.complexity === "normal") return sum + 2;
    if (module.complexity === "complex") return sum + 3;
    return sum;
  }, 0);
  
  complexityFactor += (modulesComplexitySum / 10);
  
  // Considerar nível de IA
  if (state.selectedAILevel === "IA Intermediária") complexityFactor += 0.3;
  if (state.selectedAILevel === "IA Complexa") complexityFactor += 0.6;
  
  // Ajustar para número de objetivos
  complexityFactor += (state.selectedObjectives.length - 1) * 0.1;
  
  // Definir fases do projeto com proporções do tempo total
  const phases = [
    { 
      phase: "Análise e Requisitos", 
      proportion: 0.15, 
      description: "Levantamento detalhado de requisitos, análise de processos atuais e definição de escopo."
    },
    { 
      phase: "Design e Arquitetura", 
      proportion: 0.15, 
      description: "Criação da arquitetura do sistema, modelagem de dados e prototipação de interfaces."
    },
    { 
      phase: "Desenvolvimento", 
      proportion: 0.4, 
      description: "Codificação dos módulos, integração de IA e desenvolvimento de funcionalidades."
    },
    { 
      phase: "Testes e Qualidade", 
      proportion: 0.15, 
      description: "Testes de funcionalidade, performance, segurança e correção de bugs."
    },
    { 
      phase: "Treinamento e Implantação", 
      proportion: 0.15, 
      description: "Capacitação dos usuários, migração de dados e ativação do sistema."
    }
  ];
  
  // Calcular dias para cada fase, garantindo que o total não ultrapasse 45 dias
  const tasks = phases.map(phase => ({
    phase: phase.phase,
    days: Math.round(totalMaxDays * phase.proportion),
    description: phase.description
  }));
  
  // Ajustar para garantir que o total seja exatamente 45 dias
  const calculatedTotalDays = tasks.reduce((sum, task) => sum + task.days, 0);
  if (calculatedTotalDays < totalMaxDays) {
    // Adicionar dias restantes à fase de desenvolvimento
    const devPhaseIndex = tasks.findIndex(t => t.phase === "Desenvolvimento");
    if (devPhaseIndex >= 0) {
      tasks[devPhaseIndex].days += (totalMaxDays - calculatedTotalDays);
    }
  } else if (calculatedTotalDays > totalMaxDays) {
    // Reduzir dias proporcionalmente
    const excess = calculatedTotalDays - totalMaxDays;
    for (let i = 0; i < excess; i++) {
      const highestDaysIndex = tasks.reduce((maxIndex, task, index, array) => 
        task.days > array[maxIndex].days ? index : maxIndex, 0);
      tasks[highestDaysIndex].days--;
    }
  }
  
  return {
    totalDays: totalMaxDays,
    tasks
  };
};

// Função para gerar proposta comercial
export const generateCommercialProposal = (state: CalculatorState): string => {
  if (!state.selectedNiche || !state.selectedAILevel || state.selectedModules.length === 0) {
    return "Dados insuficientes para gerar proposta.";
  }
  
  const totalPrice = calculateTotalPrice(state);
  const timeline = generateImplementationTimeline(state);
  
  const proposal = `
# PROPOSTA COMERCIAL: SOLUÇÃO DE AUTOMAÇÃO INTELIGENTE

## CLIENTE: ${state.clientName}
## EMPRESA: ${state.companyName}

### VISÃO GERAL DO PROJETO

Baseado na sua ideia inicial: "${state.initialIdea}", desenvolvemos uma solução personalizada 
para o nicho de ${state.selectedNiche}${state.nicheUnits > 1 ? ` com ${state.nicheUnits} unidades` : ""}.

Esta solução foi elaborada com foco nos seguintes objetivos:
${state.selectedObjectives.map(obj => `- ${obj}`).join('\n')}

### ESCOPO TÉCNICO

A solução proposta inclui:

1. **Nível de Inteligência Artificial: ${state.selectedAILevel}**
   - Recursos de IA incluídos: ${state.selectedAIFeatures.join(', ')}
   ${state.selectedAITraining ? `- Nível de treinamento: ${state.selectedAITraining}` : ''}
   ${state.selectedAITools.length > 0 ? `- Ferramentas de IA: ${state.selectedAITools.join(', ')}` : ''}

2. **Módulos Incluídos:**
${state.selectedModules.map(module => {
  const complexityText = module.complexity === "easy" 
    ? "Fácil" 
    : module.complexity === "normal" 
      ? "Intermediário" 
      : "Avançado";
  return `   - ${module.name} (Complexidade: ${complexityText})`;
}).join('\n')}

### CRONOGRAMA DE IMPLEMENTAÇÃO (${timeline.totalDays} dias)

${timeline.tasks.map(task => `${task.phase} (${task.days} dias): ${task.description}`).join('\n\n')}

### INVESTIMENTO

- **Valor total para implementação:** R$ ${totalPrice.implementation.toLocaleString('pt-BR')}
- **Mensalidade para manutenção e suporte:** R$ ${totalPrice.monthly.toLocaleString('pt-BR')}

### BENEFÍCIOS ESPERADOS

- Automação de processos operacionais
- Redução de tempo em tarefas repetitivas
- Insights baseados em dados para tomada de decisão
- Melhoria na experiência do cliente
- Escalabilidade do negócio

### PRÓXIMOS PASSOS

1. Aprovação da proposta
2. Reunião inicial com equipe técnica
3. Início da fase de análise e requisitos
4. Desenvolvimento conforme cronograma
5. Testes, treinamento e implantação

---

Proposta válida por 30 dias.
`;
  
  return proposal;
};
