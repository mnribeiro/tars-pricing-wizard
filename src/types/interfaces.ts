import { 
  BusinessNiche, IndustryArea, AutomationObjective, AILevel, 
  AIFeature, AITraining, AITool, ModuleName, ModuleLevel, 
  ComplexityLevel, Segment, SubNiche, Department 
} from './enums';

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
  complexity?: ComplexityLevel | null;
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
  originalImplementation: number;
  discountAmount: number;
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

export interface ModuleScope {
  module: string;
  level: string;
  description: string;
}

export interface Proposal {
  id?: string;
  client_name: string;
  company_name: string;
  client_phone: string;
  project_description: string;
  initial_idea: string;
  selected_segment: string;
  selected_subniche: string;
  selected_department: string;
  niche_units: number;
  industry_area: string;
  whatsapp_numbers: number;
  objectives: string[];
  ai_level: string;
  ai_features: string[];
  ai_training: string;
  ai_tools: string[];
  selected_modules: any;
  notes: string;
  discount: number;
  implementation_price: number;
  monthly_price: number;
}
