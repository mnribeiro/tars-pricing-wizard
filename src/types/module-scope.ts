
import { CalculatorState } from './calculator-state';

export interface ModuleScope {
  module: string;
  level: string;
  description: string;
}

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
