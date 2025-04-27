import { StaticImageData } from "next/image";

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

export type AILevel = "IA Simples" | "IA Intermediária" | "IA Complexa";

export type AIFeature =
  | "Chatbots Inteligentes"
  | "Análise Preditiva"
  | "Processamento de Linguagem Natural"
  | "Reconhecimento de Imagens"
  | "Automação de Processos Robóticos";

export type AITraining = "Treinamento Básico" | "Treinamento Avançado" | "Consultoria Personalizada";

export type AITool =
  | "Google AI Platform"
  | "Amazon SageMaker"
  | "Microsoft Azure AI"
  | "IBM Watson";

export type ModuleLevel = "I" | "M" | "A";
export type ComplexityLevel = "easy" | "normal" | "complex";
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
  | "Lembretes & Automação Follow-up";

export type Segment = 
  | "Saúde"
  | "Construção Civil"
  | "E-commerce"
  | "Indústria"
  | "Serviços"
  | "Varejo";

export type SubNiche = string;
export type Department = string;

export interface Price {
  I: number;
  M: number;
  A: number;
}

export interface Module {
  name: ModuleName;
  basePrice: number;
  level: ModuleLevel | null;
  available: boolean;
}

export interface ModuleData {
  name: ModuleName;
  basePrice: number;
  prices: {
    easy: number;
    normal: number;
    complex: number;
  };
  departmentAvailability: {
    [department: string]: boolean;
  };
}

export interface SegmentData {
  name: Segment;
  basePrice: number;
  subNiches: SubNicheData[];
}

export interface SubNicheData {
  name: SubNiche;
  basePrice: number;
  departments: Department[];
}

export interface Task {
  phase: string;
  days: number;
  description: string;
}

export interface Timeline {
  totalDays: number;
  tasks: Task[];
}

export interface TotalPrice {
  implementation: number;
  monthly: number;
}

export interface AIData {
  name: AIFeature;
  value: number;
}

export interface AITrainingData {
  name: AITraining;
  value: number;
}

export interface AIToolsData {
  name: AITool;
  value: number;
}

export interface AILevelThresholds {
  simple: { max: number };
  intermediate: { max: number };
}

export interface CalculatorState {
  currentStep: number;
  clientName: string;
  companyName: string;
  clientPhone: string;
  projectDescription: string;
  initialIdea: string;
  selectedSegment: Segment | null;
  selectedSubNiche: SubNiche | null;
  selectedDepartment: Department | null;
  selectedModules: {
    name: ModuleName;
    basePrice: number;
    level: ModuleLevel | null;
    available: boolean;
    complexity: ComplexityLevel | null;
  }[];
  selectedNiche: BusinessNiche | null;
  nicheUnits: number;
  selectedIndustryArea: IndustryArea | null;
  whatsappNumbers: number;
  selectedObjectives: AutomationObjective[];
  selectedAILevel: AILevel | null;
  selectedAIFeatures: AIFeature[];
  selectedAITraining: AITraining | null;
  selectedAITools: AITool[];
  notes: string;
  discount: number;
}

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
  { name: "Chatbots Inteligentes", value: 3000 },
  { name: "Análise Preditiva", value: 4000 },
  { name: "Processamento de Linguagem Natural", value: 2500 },
  { name: "Reconhecimento de Imagens", value: 3500 },
  { name: "Automação de Processos Robóticos", value: 4500 }
];

export const aiTraining: AITrainingData[] = [
  { name: "Treinamento Básico", value: 1500 },
  { name: "Treinamento Avançado", value: 3000 },
  { name: "Consultoria Personalizada", value: 5000 }
];

export const aiTools: AIToolsData[] = [
  { name: "Google AI Platform", value: 2000 },
  { name: "Amazon SageMaker", value: 2500 },
  { name: "Microsoft Azure AI", value: 3000 },
  { name: "IBM Watson", value: 3500 }
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

export const calculateTotalPrice = (state: CalculatorState): TotalPrice => {
  let implementationTotal = 0;
  let monthlyTotal = 0;

  // Calcula o preço base do nicho
  if (state.selectedNiche) {
    const niche = businessNiches.find(n => n.name === state.selectedNiche);
    implementationTotal += (niche?.basePrice || 0) * state.nicheUnits;
  }

  // Adiciona o preço dos módulos selecionados
  state.selectedModules.forEach(module => {
    const moduleData = modulesData.find(m => m.name === module.name);

    if (moduleData && module.complexity) {
      implementationTotal += moduleData.prices[module.complexity];
    }
  });

  // Adiciona o preço dos recursos de IA selecionados
  state.selectedAIFeatures.forEach(feature => {
    const aiFeature = aiFeatures.find(ai => ai.name === feature);
    implementationTotal += aiFeature?.value || 0;
  });

  // Adiciona o preço do treinamento de IA selecionado
  if (state.selectedAITraining) {
    const aiTrainingItem = aiTraining.find(t => t.name === state.selectedAITraining);
    implementationTotal += aiTrainingItem?.value || 0;
  }

  // Adiciona o preço das ferramentas de IA selecionadas
  state.selectedAITools.forEach(tool => {
    const aiTool = aiTools.find(t => t.name === tool);
    implementationTotal += aiTool?.value || 0;
  });

  // Calcula a mensalidade como 20% do custo de implementação
  monthlyTotal = implementationTotal * 0.20;

  // Aplica o desconto, se houver
  const discountMultiplier = 1 - (state.discount / 100);
  implementationTotal *= discountMultiplier;
  monthlyTotal *= discountMultiplier;

  return {
    implementation: implementationTotal,
    monthly: monthlyTotal
  };
};

export const generateImplementationTimeline = (state: CalculatorState): Timeline => {
  let totalDays = 0;
  const tasks: Task[] = [];

  // Adiciona tarefas baseadas nos módulos selecionados
  if (state.selectedModules.length > 0) {
    tasks.push({
      phase: "Configuração de Módulos",
      days: 10,
      description: `Configuração e integração dos módulos selecionados: ${state.selectedModules.map(m => m.name).join(", ")}.`
    });
    totalDays += 10;
  }

  // Adiciona tarefas baseadas nos recursos de IA selecionados
  if (state.selectedAIFeatures.length > 0) {
    tasks.push({
      phase: "Implementação de IA",
      days: 15,
      description: `Implementação dos recursos de IA: ${state.selectedAIFeatures.join(", ")}.`
    });
    totalDays += 15;
  }

  // Adiciona tarefa de treinamento de IA, se selecionado
  if (state.selectedAITraining) {
    tasks.push({
      phase: "Treinamento de IA",
      days: 7,
      description: `Treinamento e ajuste do modelo de IA com ${state.selectedAITraining}.`
    });
    totalDays += 7;
  }

  // Adiciona tarefa de testes e ajustes
  tasks.push({
    phase: "Testes e Ajustes",
    days: 5,
    description: "Fase de testes e ajustes finos para garantir a qualidade da solução."
  });
  totalDays += 5;

  return {
    totalDays: totalDays,
    tasks: tasks
  };
};

export const generateCommercialProposal = (state: CalculatorState): string => {
  const totalPrice = calculateTotalPrice(state);
  const timeline = generateImplementationTimeline(state);

  let proposal = `Proposta Comercial\n\n`;
  proposal += `Cliente: ${state.clientName}\n`;
  proposal += `Empresa: ${state.companyName}\n`;
  proposal += `Telefone: ${state.clientPhone}\n\n`;
  proposal += `Descrição do Projeto: ${state.projectDescription}\n\n`;
  proposal += `Escopo:\n`;
  proposal += `- Nicho: ${state.selectedNiche} (${state.nicheUnits} unidades)\n`;
  if (state.selectedIndustryArea) {
    proposal += `- Área da Indústria: ${state.selectedIndustryArea}\n`;
  }
  proposal += `- Objetivos: ${state.selectedObjectives.join(", ")}\n`;
  proposal += `- Recursos de IA: ${state.selectedAIFeatures.join(", ")}\n`;
  if (state.selectedAITraining) {
    proposal += `- Treinamento de IA: ${state.selectedAITraining}\n`;
  }
  proposal += `- Módulos: ${state.selectedModules.map(m => m.name).join(", ")}\n\n`;
  proposal += `Cronograma de Implementação:\n`;
  timeline.tasks.forEach(task => {
    proposal += `- ${task.phase}: ${task.days} dias - ${task.description}\n`;
  });
  proposal += `\nInvestimento:\n`;
  proposal += `- Implementação: R$ ${totalPrice.implementation.toLocaleString('pt-BR')}\n`;
  proposal += `- Mensalidade: R$ ${totalPrice.monthly.toLocaleString('pt-BR')}\n\n`;
  proposal += `Observações: ${state.notes}\n`;

  return proposal;
};

export const getSubNichesBySegment = (segment: Segment): SubNicheData[] => {
  const segmentData = segmentsData.find(s => s.name === segment);
  return segmentData ? segmentData.subNiches : [];
};

export const getDepartmentsBySubNiche = (segment: Segment, subNiche: SubNiche): Department[] => {
  const segmentData = segmentsData.find(s => s.name === segment);
  const subNicheData = segmentData?.subNiches.find(sn => sn.name === subNiche);
  return subNicheData ? subNicheData.departments : [];
};

export const getAvailableModules = (department: Department): ModuleName[] => {
  const availableModules = modulesData
    .filter(module => module.departmentAvailability[department])
    .map(module => module.name);
  return availableModules;
};
