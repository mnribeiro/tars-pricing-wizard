
import { AIFeature, AILevel, AITool, AITraining, AutomationObjective, ComplexityLevel, Department, IndustryArea, ModuleLevel, ModuleName, Segment, SubNiche } from "./enums";
import { segmentsData } from "./constants";

export type { AIFeature, AILevel, AITool, AITraining, AutomationObjective, ComplexityLevel, Department, IndustryArea, ModuleLevel, ModuleName, Segment, SubNiche };

export interface Module {
  name: ModuleName;
  basePrice: number;
  available: boolean;
  level?: ModuleLevel;
  complexity?: ComplexityLevel | null;
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
  selectedModules: Module[];
  selectedNiche: string | null;
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

export interface ModuleScope {
  module: string;
  level: string;
  description: string;
}

export interface ImplementationTask {
  phase: string;
  days: number;
  description: string;
}

export interface ImplementationTimeline {
  tasks: ImplementationTask[];
  totalDays: number;
}

export interface TotalPrice {
  implementation: number;
  monthly: number;
}

// Gets the subniches for a specific segment
export const getSubNichesBySegment = (segment: Segment): { id: string; name: SubNiche }[] => {
  const foundSegment = segmentsData.find(s => s.name === segment);
  return foundSegment?.subNiches || [];
};

// Gets departments available for a segment and subniche
export const getDepartmentsBySubNiche = (segment: Segment, subNiche: SubNiche): Department[] => {
  // This is a simplified implementation
  return ["Vendas", "Financeiro", "RH", "Marketing", "Operações", "TI"];
};

// Calculate total price based on selected options
export const calculateTotalPrice = (state: CalculatorState): TotalPrice => {
  // This is a sample implementation
  let implementationPrice = 0;
  let monthlyPrice = 0;

  // Add base price from modules
  state.selectedModules.forEach(module => {
    if (module.complexity === 'easy') {
      implementationPrice += module.basePrice;
      monthlyPrice += module.basePrice * 0.1;
    } else if (module.complexity === 'normal') {
      implementationPrice += module.basePrice * 1.5;
      monthlyPrice += module.basePrice * 0.15;
    } else if (module.complexity === 'complex') {
      implementationPrice += module.basePrice * 2.5;
      monthlyPrice += module.basePrice * 0.2;
    }
  });

  // Add AI costs if applicable
  if (state.selectedAILevel === 'Basic') {
    implementationPrice += 2000;
    monthlyPrice += 200;
  } else if (state.selectedAILevel === 'Intermediate') {
    implementationPrice += 5000;
    monthlyPrice += 500;
  } else if (state.selectedAILevel === 'Advanced') {
    implementationPrice += 10000;
    monthlyPrice += 1000;
  }

  // Apply discount if any
  if (state.discount > 0) {
    implementationPrice = implementationPrice * (1 - state.discount / 100);
    monthlyPrice = monthlyPrice * (1 - state.discount / 100);
  }

  return {
    implementation: Math.round(implementationPrice),
    monthly: Math.round(monthlyPrice)
  };
};

// Generate module scope description
export const generateModuleScope = (state: CalculatorState): ModuleScope[] => {
  return state.selectedModules.map(module => {
    let description = "";
    
    switch (module.complexity) {
      case 'easy':
        description = "Implementação básica com funcionalidades essenciais";
        break;
      case 'normal':
        description = "Implementação intermediária com funcionalidades personalizadas";
        break;
      case 'complex':
        description = "Implementação avançada com alto nível de personalização";
        break;
      default:
        description = "Nível de complexidade não definido";
    }
    
    return {
      module: module.name,
      level: module.complexity || "Não definido",
      description
    };
  });
};

// Generate deliverables list
export const generateDeliverables = (state: CalculatorState): string[] => {
  const deliverables = [
    "Sistema web responsivo",
    "Dashboard administrativo",
    "Manual do usuário",
    "Treinamento da equipe"
  ];
  
  if (state.selectedAILevel) {
    deliverables.push("Módulos de inteligência artificial");
  }
  
  if (state.selectedModules.some(m => m.name === "CRM")) {
    deliverables.push("Sistema de gerenciamento de relacionamento com clientes");
  }
  
  if (state.selectedModules.some(m => m.name === "ERP")) {
    deliverables.push("Sistema integrado de gestão empresarial");
  }
  
  return deliverables;
};

// Generate business value propositions
export const generateBusinessValue = (state: CalculatorState): string[] => {
  const values = [
    "Aumento de produtividade da equipe",
    "Redução de custos operacionais",
    "Melhor gestão de informações"
  ];
  
  if (state.selectedAILevel === "Advanced") {
    values.push("Insights avançados com inteligência artificial");
    values.push("Automação de processos complexos");
  }
  
  if (state.selectedModules.some(m => m.name === "Analytics")) {
    values.push("Tomada de decisão baseada em dados");
  }
  
  return values;
};

// Generate implementation timeline
export const generateImplementationTimeline = (state: CalculatorState): ImplementationTimeline => {
  const tasks: ImplementationTask[] = [
    {
      phase: "Levantamento de requisitos",
      days: 10,
      description: "Análise detalhada das necessidades e processos"
    },
    {
      phase: "Design e prototipação",
      days: 15,
      description: "Criação de interfaces e fluxos de usuário"
    },
    {
      phase: "Desenvolvimento",
      days: 30,
      description: "Codificação e integração dos módulos"
    }
  ];
  
  // Add more days for complex implementations
  const complexModules = state.selectedModules.filter(m => m.complexity === "complex");
  if (complexModules.length > 0) {
    tasks.push({
      phase: "Desenvolvimento avançado",
      days: 20 * complexModules.length,
      description: `Implementação de ${complexModules.length} módulos complexos`
    });
  }
  
  // Add AI setup time if applicable
  if (state.selectedAILevel) {
    tasks.push({
      phase: "Configuração de IA",
      days: state.selectedAILevel === "Advanced" ? 20 : 10,
      description: `Configuração e treinamento de modelos de IA ${state.selectedAILevel}`
    });
  }
  
  tasks.push({
    phase: "Testes e validação",
    days: 15,
    description: "Testes de qualidade e validação com usuários"
  });
  
  tasks.push({
    phase: "Implantação",
    days: 5,
    description: "Lançamento e configuração em ambiente de produção"
  });
  
  // Calculate total days
  const totalDays = tasks.reduce((sum, task) => sum + task.days, 0);
  
  return {
    tasks,
    totalDays
  };
};
