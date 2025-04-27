
import { AIFeature, AILevel, AITool, AITraining, AutomationObjective, BusinessNiche, ComplexityLevel, Department, IndustryArea, ModuleLevel, ModuleName, Module, Segment, SubNiche } from './enums';
import { segmentsData, modulesData } from './constants';
import { CalculatorState } from './calculator-state';

// Função para obter subnichos por segmento
export const getSubNichesBySegment = (segment: Segment): { id: string; name: SubNiche }[] => {
  const foundSegment = segmentsData.find(s => s.name === segment);
  return foundSegment ? foundSegment.subNiches : [];
};

// Função para obter departamentos por subnicho
export const getDepartmentsBySubNiche = (segment: Segment, subNiche: SubNiche): Department[] => {
  // Essa é uma implementação simples - em um caso real, você teria dados mais complexos
  // Retornando departamentos padrão por enquanto
  return ["Marketing", "Vendas", "Financeiro", "RH", "Operações"];
};

// Função para obter módulos disponíveis por departamento
export const getAvailableModules = (department: Department): ModuleName[] => {
  // Filtra os módulos que estão disponíveis para o departamento especificado
  const availableModules = modulesData
    .filter(module => module.departmentAvailability[department])
    .map(module => module.name);
  
  return availableModules;
};

// Função para gerar uma proposta comercial com base no estado da calculadora
export const generateCommercialProposal = (state: CalculatorState): string => {
  const { clientName, companyName, selectedSegment, selectedSubNiche, selectedModules } = state;
  
  // Modelo básico de proposta comercial
  return `
    PROPOSTA COMERCIAL
    
    Cliente: ${clientName || ""}
    Empresa: ${companyName || ""}
    
    Prezado(a) ${clientName || "Cliente"},
    
    É com grande satisfação que apresentamos nossa proposta de serviços para atendimento às necessidades da ${companyName || "sua empresa"}.
    
    ESCOPO DO PROJETO:
    Segmento: ${selectedSegment || ""}
    Subnicho: ${selectedSubNiche || ""}
    
    MÓDULOS INCLUÍDOS:
    ${selectedModules.map(module => `- ${module.name}`).join('\n    ')}
    
    Agradecemos a oportunidade e estamos à disposição para esclarecimentos adicionais.
    
    Atenciosamente,
    Equipe TARS AI
  `;
};
