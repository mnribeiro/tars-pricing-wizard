
import { AIFeature, AILevel, AITool, AITraining, Module, ModuleName } from './enums';

export interface Price {
  I: number;
  M: number;
  A: number;
}

export interface AILevelThresholds {
  simple: { max: number };
  intermediate: { max: number };
}

export interface TotalPrice {
  implementation: number;
  monthly: number;
  originalImplementation: number;
  discountAmount: number;
}

export const calculateTotalPrice = (state: CalculatorState): TotalPrice => {
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
  if (state.selectedAILevel === 'Basic' || state.selectedAILevel === 'IA Simples') {
    implementationPrice += 2000;
    monthlyPrice += 200;
  } else if (state.selectedAILevel === 'Intermediate' || state.selectedAILevel === 'IA Intermediária') {
    implementationPrice += 5000;
    monthlyPrice += 500;
  } else if (state.selectedAILevel === 'Advanced' || state.selectedAILevel === 'IA Complexa') {
    implementationPrice += 10000;
    monthlyPrice += 1000;
  }

  const originalImplementation = implementationPrice;
  
  // Apply discount if any
  if (state.discount > 0) {
    implementationPrice = implementationPrice * (1 - state.discount / 100);
    monthlyPrice = monthlyPrice * (1 - state.discount / 100);
  }

  const discountAmount = originalImplementation - implementationPrice;

  return {
    implementation: Math.round(implementationPrice),
    monthly: Math.round(monthlyPrice),
    originalImplementation: Math.round(originalImplementation),
    discountAmount: Math.round(discountAmount)
  };
};
