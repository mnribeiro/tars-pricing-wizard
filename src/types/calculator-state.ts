
import { AIFeature, AILevel, AITool, AITraining, AutomationObjective, BusinessNiche, ComplexityLevel, Department, IndustryArea, ModuleLevel, ModuleName, Segment, SubNiche } from './enums';

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
