
import { CalculatorState } from './calculator-state';

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
  
  const crmModules = state.selectedModules.filter(m => 
    m.name === "CRM" || m.name === "Integração CRM");
  if (crmModules.length > 0) {
    deliverables.push("Sistema de gerenciamento de relacionamento com clientes");
  }
  
  const erpModules = state.selectedModules.filter(m => 
    m.name === "ERP" || m.name === "Integração ERP");
  if (erpModules.length > 0) {
    deliverables.push("Sistema integrado de gestão empresarial");
  }
  
  return deliverables;
};

export const generateBusinessValue = (state: CalculatorState): string[] => {
  const values = [
    "Aumento de produtividade da equipe",
    "Redução de custos operacionais",
    "Melhor gestão de informações"
  ];
  
  if (state.selectedAILevel === "Advanced" || state.selectedAILevel === "IA Complexa") {
    values.push("Insights avançados com inteligência artificial");
    values.push("Automação de processos complexos");
  }
  
  const analyticsModules = state.selectedModules.filter(m => 
    m.name === "Analytics" || m.name === "Análise de Dados + Dashboard");
  if (analyticsModules.length > 0) {
    values.push("Tomada de decisão baseada em dados");
  }
  
  return values;
};
