import { useState } from "react";
import { CalculatorState, Department, Module, ModuleLevel, ModuleName, Segment, SubNiche } from "@/types/calculator";
import SegmentSelector from "./SegmentSelector";
import SubNicheSelector from "./SubNicheSelector";
import DepartmentSelector from "./DepartmentSelector";
import ModuleSelector from "./ModuleSelector";
import ClientInfoForm from "./ClientInfoForm";
import SummaryAndProposal from "./SummaryAndProposal";
import { Button } from "./ui/button";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
const PricingWizard = () => {
  // Initialize calculator state
  const [state, setState] = useState<CalculatorState>({
    currentStep: 1,
    clientName: "",
    companyName: "",
    clientPhone: "",
    projectDescription: "",
    selectedSegment: null,
    selectedSubNiche: null,
    selectedDepartment: null,
    selectedModules: [],
    notes: "",
    discount: 0
  });

  // Update a specific field in the state
  const updateField = (field: keyof CalculatorState, value: any) => {
    setState(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Navigation functions
  const goToNextStep = () => {
    if (canProceed()) {
      setState(prev => ({
        ...prev,
        currentStep: prev.currentStep + 1
      }));
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  };
  const goToPreviousStep = () => {
    if (state.currentStep > 1) {
      setState(prev => ({
        ...prev,
        currentStep: prev.currentStep - 1
      }));
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  };

  // Check if user can proceed to next step
  const canProceed = (): boolean => {
    switch (state.currentStep) {
      case 1:
        return state.clientName.trim() !== "" && state.companyName.trim() !== "" && state.clientPhone.trim() !== "";
      case 2:
        return state.selectedSegment !== null;
      case 3:
        return state.selectedSubNiche !== null;
      case 4:
        return state.selectedDepartment !== null;
      case 5:
        return state.selectedModules.length > 0 && state.selectedModules.every(module => module.level !== null);
      default:
        return true;
    }
  };

  // Handler for segment selection
  const handleSegmentSelect = (segment: Segment) => {
    setState(prev => ({
      ...prev,
      selectedSegment: segment,
      selectedSubNiche: null,
      selectedDepartment: null,
      selectedModules: []
    }));
  };

  // Handler for sub-niche selection
  const handleSubNicheSelect = (subNiche: SubNiche) => {
    setState(prev => ({
      ...prev,
      selectedSubNiche: subNiche,
      selectedDepartment: null,
      selectedModules: []
    }));
  };

  // Handler for department selection
  const handleDepartmentSelect = (department: Department) => {
    setState(prev => ({
      ...prev,
      selectedDepartment: department,
      selectedModules: []
    }));
  };

  // Handler for toggling module selection
  const handleToggleModule = (module: Module) => {
    setState(prev => {
      // Check if the module is already selected
      const existingIndex = prev.selectedModules.findIndex(m => m.name === module.name);
      if (existingIndex >= 0) {
        // Remove module if already selected
        return {
          ...prev,
          selectedModules: prev.selectedModules.filter(m => m.name !== module.name)
        };
      } else {
        // Add module if not selected
        return {
          ...prev,
          selectedModules: [...prev.selectedModules, module]
        };
      }
    });
  };

  // Handler for updating module level
  const handleUpdateModuleLevel = (moduleName: ModuleName, level: ModuleLevel) => {
    setState(prev => {
      const updatedModules = prev.selectedModules.map(module => {
        if (module.name === moduleName) {
          return {
            ...module,
            level
          };
        }
        return module;
      });
      return {
        ...prev,
        selectedModules: updatedModules
      };
    });
  };

  // Render step content based on current step
  const renderStepContent = () => {
    switch (state.currentStep) {
      case 1:
        return <ClientInfoForm state={state} updateField={updateField} className="animate-fade-in" />;
      case 2:
        return <SegmentSelector selectedSegment={state.selectedSegment} onSelect={handleSegmentSelect} className="animate-fade-in" />;
      case 3:
        return state.selectedSegment ? <SubNicheSelector selectedSegment={state.selectedSegment} selectedSubNiche={state.selectedSubNiche} onSelect={handleSubNicheSelect} className="animate-fade-in" /> : <div>Por favor, selecione um segmento primeiro.</div>;
      case 4:
        return state.selectedSegment && state.selectedSubNiche ? <DepartmentSelector selectedSegment={state.selectedSegment} selectedSubNiche={state.selectedSubNiche} selectedDepartment={state.selectedDepartment} onSelect={handleDepartmentSelect} className="animate-fade-in" /> : <div>Por favor, selecione um segmento e subnicho primeiro.</div>;
      case 5:
        return state.selectedDepartment ? <ModuleSelector selectedDepartment={state.selectedDepartment} selectedModules={state.selectedModules} onToggleModule={handleToggleModule} onUpdateModuleLevel={handleUpdateModuleLevel} className="animate-fade-in" /> : <div>Por favor, selecione um departamento primeiro.</div>;
      case 6:
        return <SummaryAndProposal state={state} updateField={updateField} className="animate-fade-in" />;
      default:
        return <div>Passo não encontrado</div>;
    }
  };

  // Function to determine step status
  const getStepStatus = (step: number) => {
    if (step < state.currentStep) return "completed";
    if (step === state.currentStep) return "current";
    return "upcoming";
  };

  // Step titles
  const steps = [{
    number: 1,
    title: "Dados do Cliente"
  }, {
    number: 2,
    title: "Segmento"
  }, {
    number: 3,
    title: "Subnicho"
  }, {
    number: 4,
    title: "Departamento"
  }, {
    number: 5,
    title: "Módulos"
  }, {
    number: 6,
    title: "Proposta"
  }];
  return <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <div className="flex justify-center mb-6">
          <img alt="TARS AI" src="/lovable-uploads/75fedcf6-2c1f-4b1e-aebb-f8386253fd76.jpg" className="w-full h-34 object-contain\n" />
        </div>
        <h1 className="text-3xl font-bold text-center mb-2">Calculadora de Precificação</h1>
        <p className="text-center text-gray-300">Configure sua solução personalizada</p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="hidden md:flex justify-between">
          {steps.map(step => {
          const status = getStepStatus(step.number);
          return <div key={step.number} className={`flex flex-col items-center w-1/6 ${status === "upcoming" ? "opacity-50" : ""}`}>
                <div className={`w-8 h-8 flex items-center justify-center rounded-full mb-1 ${status === "completed" ? "bg-[#D4AF37] text-white" : status === "current" ? "border-2 border-[#D4AF37] text-[#D4AF37]" : "border border-gray-500 text-gray-500"}`}>
                  {status === "completed" ? <Check size={16} /> : <span>{step.number}</span>}
                </div>
                <span className="text-xs text-center">{step.title}</span>
              </div>;
        })}
        </div>
        
        {/* Mobile Progress */}
        <div className="flex md:hidden items-center justify-between">
          <span className="text-sm font-medium">
            Etapa {state.currentStep} de {steps.length}
          </span>
          <span className="text-sm font-medium text-[#D4AF37]">
            {steps.find(s => s.number === state.currentStep)?.title}
          </span>
        </div>
        <div className="h-2 bg-gray-700 rounded-full mt-2 mb-6 md:hidden">
          <div className="h-2 bg-[#D4AF37] rounded-full transition-all duration-300" style={{
          width: `${state.currentStep / steps.length * 100}%`
        }} />
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-black bg-opacity-20 rounded-xl p-6 mb-8">
        {renderStepContent()}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={goToPreviousStep} disabled={state.currentStep === 1} className={`${state.currentStep === 1 ? "opacity-0 cursor-default" : "border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10"}`}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
        </Button>
        
        {state.currentStep < steps.length ? <Button onClick={goToNextStep} disabled={!canProceed()} className={`${canProceed() ? "bg-[#D4AF37] hover:bg-[#B39020] text-white" : "bg-gray-700 text-gray-300 cursor-not-allowed"}`}>
            Próximo <ArrowRight className="ml-2 h-4 w-4" />
          </Button> : null}
      </div>
    </div>;
};
export default PricingWizard;