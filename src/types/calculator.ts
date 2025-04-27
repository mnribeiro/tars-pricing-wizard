
// Re-export everything from individual files
export * from './enums';
export * from './calculator-state';
export * from './pricing';
export * from './timeline';
export * from './deliverables';
export * from './module-scope';

// Export constants from constants file
export {
  aiFeatures,
  aiTraining,
  aiTools,
  aiLevelThresholds,
  modulesData,
  automationObjectives,
  defaultModules,
  industryAreas
} from './constants';
