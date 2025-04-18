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
  | "Análise Preditiva"
  | "Processamento de Linguagem Natural (NLP)"
  | "Reconhecimento de Imagens"
  | "Chatbots Inteligentes"
  | "Recomendação Personalizada"
  | "Automação de Tarefas Repetitivas";

export type AITraining =
  | "Nenhum"
  | "Básico"
  | "Avançado";

// Update AITool type
export type AITool = 
  | "Calendário"
  | "Email"
  | "Google Drive"
  | "Recuperação de Documentos (RAG)"
  | "Busca Semântica"
  | "Análise de Dados"
  | "Integração com APIs Externas"
  | "Processamento de Imagens";

export type ComplexityLevel = "easy" | "normal" | "complex";

export type ModuleName =
  | "Banco de Dados"
  | "WhatsApp"
  | "ERP"
  | "CRM"
  | "Lembretes"
  | "Análise de Dados"
  | "Dashboard"
  | "API de Integração";

export interface Module {
  name: ModuleName;
  basePrice: number;
  complexity: ComplexityLevel | null;
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

export const aiLevelThresholds = {
  simple: { max: 2000 },
  intermediate: { max: 4000 }
};

// Update aiTools array
export const aiTools: { name: AITool; value: number }[] = [
  { name: "Calendário", value: 500 },
  { name: "Email", value: 400 },
  { name: "Google Drive", value: 600 },
  { name: "Recuperação de Documentos (RAG)", value: 800 },
  { name: "Busca Semântica", value: 700 },
  { name: "Análise de Dados", value: 900 },
  { name: "Integração com APIs Externas", value: 1000 },
  { name: "Processamento de Imagens", value: 800 }
];

export const availableModules: {
  name: ModuleName;
  basePrice: number;
  prices: { [key in ComplexityLevel]: number };
}[] = [
  {
    name: "Banco de Dados",
    basePrice: 1500,
    prices: { easy: 2000, normal: 3000, complex: 4500 }
  },
  {
    name: "WhatsApp",
    basePrice: 1200,
    prices: { easy: 1800, normal: 2700, complex: 4000 }
  },
  {
    name: "ERP",
    basePrice: 2500,
    prices: { easy: 3000, normal: 4500, complex: 6000 }
  },
  {
    name: "CRM",
    basePrice: 2000,
    prices: { easy: 2500, normal: 3800, complex: 5200 }
  },
  {
    name: "Lembretes",
    basePrice: 800,
    prices: { easy: 1200, normal: 1800, complex: 2500 }
  },
  {
    name: "Análise de Dados",
    basePrice: 1800,
    prices: { easy: 2400, normal: 3600, complex: 5000 }
  },
  {
    name: "Dashboard",
    basePrice: 1500,
    prices: { easy: 2000, normal: 3000, complex: 4200 }
  },
  {
    name: "API de Integração",
    basePrice: 2200,
    prices: { easy: 2800, normal: 4200, complex: 5800 }
  }
];

export const calculateTotalPrice = (state: CalculatorState) => {
  let implementationTotal = 0;
  let monthlyTotal = 0;

  // Calcula o preço do nicho
  if (state.selectedNiche) {
    const niche = businessNiches.find((n) => n.name === state.selectedNiche);
    implementationTotal += (niche?.basePrice || 0) * state.nicheUnits;
  }

  // Calcula o preço da área da indústria
  if (state.selectedIndustryArea) {
    const industryArea = industryAreas.find((area) => area.name === state.selectedIndustryArea);
    implementationTotal += industryArea?.basePrice || 0;
  }

  // Calcula o preço dos recursos de IA
  state.selectedAIFeatures.forEach((feature) => {
    const aiFeature = aiFeatures.find((ai) => ai.name === feature);
    implementationTotal += aiFeature?.value || 0;
  });

  // Calcula o preço do treinamento de IA
  if (state.selectedAITraining) {
    const aiTraining = aiTraining.find((training) => training.name === state.selectedAITraining);
    implementationTotal += aiTraining?.value || 0;
  }

  // Calcula o preço das ferramentas de IA
  state.selectedAITools.forEach((tool) => {
    const aiTool = aiTools.find((t) => t.name === tool);
    implementationTotal += aiTool?.value || 0;
  });

  // Calcula o preço dos módulos
  state.selectedModules.forEach((module) => {
    const selectedModule = availableModules.find((m) => m.name === module.name);
    if (selectedModule && module.complexity) {
      implementationTotal += selectedModule.prices[module.complexity];
    }
  });

  monthlyTotal = implementationTotal * 0.2;

  return {
    implementation: implementationTotal,
    monthly: monthlyTotal
  };
};

export const generateImplementationTimeline = (state: CalculatorState) => {
  const tasks = [
    { phase: "Planejamento", days: 5, description: "Definição detalhada do escopo e planejamento do projeto." },
    { phase: "Design", days: 7, description: "Criação do design da interface e experiência do usuário." },
    { phase: "Desenvolvimento", days: 15, description: "Implementação das funcionalidades e integração dos módulos." },
    { phase: "Testes", days: 3, description: "Testes de qualidade e correção de bugs." },
    { phase: "Implantação", days: 2, description: "Implantação do sistema e treinamento dos usuários." }
  ];

  let totalDays = 0;
  tasks.forEach(task => totalDays += task.days);

  return {
    totalDays: totalDays,
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
- Ideia Inicial: ${state.initialIdea}
- Nicho: ${state.selectedNiche} ${state.nicheUnits > 1 ? `(${state.nicheUnits} unidades)` : ""}
${state.selectedIndustryArea ? `- Área da Indústria: ${state.selectedIndustryArea}` : ""}
- Objetivos:
${state.selectedObjectives.map(objective => `  - ${objective}\n`).join('')}
- Recursos de IA:
${state.selectedAIFeatures.map(feature => `  - ${feature}\n`).join('')}
${state.selectedAITraining ? `- Treinamento de IA: ${state.selectedAITraining}\n` : ""}
- Módulos Selecionados:
${state.selectedModules.map(module => `  - ${module.name} (${module.complexity})\n`).join('')}

Investimento:
- Implementação: R$ ${totalPrice.implementation.toLocaleString('pt-BR')}
- Mensalidade (Manutenção): R$ ${totalPrice.monthly.toLocaleString('pt-BR')}

Cronograma de Implementação:
${generateImplementationTimeline(state).tasks.map(task => `  - ${task.phase}: ${task.days} dias\n`).join('')}

Condições Gerais:
- Prazo de Entrega: [A definir]
- Forma de Pagamento: [A combinar]

Aguardamos ansiosamente a sua aprovação para darmos início a este projeto inovador.

Atenciosamente,
TARS AI
`;
};

// Update businessNiches to remove explicit pricing display
export const businessNiches: { name: BusinessNiche; basePrice: number }[] = [
  { name: "Saúde", basePrice: 2500 },
  { name: "Varejo", basePrice: 2000 },
  { name: "E-commerce", basePrice: 2200 },
  { name: "Franquias", basePrice: 3000 },
  { name: "Indústria", basePrice: 4000 },
  { name: "Serviços", basePrice: 1800 }
];
