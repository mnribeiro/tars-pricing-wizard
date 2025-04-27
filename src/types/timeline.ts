
import { CalculatorState } from './calculator-state';

export interface Task {
  phase: string;
  days: number;
  description: string;
}

export interface Timeline {
  totalDays: number;
  tasks: Task[];
}

export const generateImplementationTimeline = (state: CalculatorState): Timeline => {
  const tasks: Task[] = [
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
    let days = 10;
    if (state.selectedAILevel === "Advanced" || state.selectedAILevel === "IA Complexa") {
      days = 20;
    }
    
    tasks.push({
      phase: "Configuração de IA",
      days: days,
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
  
  const totalDays = tasks.reduce((sum, task) => sum + task.days, 0);
  
  return {
    tasks,
    totalDays
  };
};
