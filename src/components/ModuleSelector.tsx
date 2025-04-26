
import { cn } from "@/lib/utils";
import { Department, Module, ModuleData, ModuleLevel, ModuleName, modulesData, getAvailableModules } from "@/types/calculator";
import { useState } from "react";
import { Check, Database, MessageSquare, LayoutDashboard, Brain, FileText, BellRing, Code, Cloud } from "lucide-react";

interface ModuleSelectorProps {
  selectedDepartment: Department;
  selectedModules: Module[];
  onToggleModule: (module: Module) => void;
  onUpdateModuleLevel: (moduleName: ModuleName, level: ModuleLevel) => void;
  className?: string;
}

const ModuleSelector = ({
  selectedDepartment,
  selectedModules,
  onToggleModule,
  onUpdateModuleLevel,
  className
}: ModuleSelectorProps) => {
  const availableModuleNames = getAvailableModules(selectedDepartment);
  
  // Get module data for available modules
  const availableModules = modulesData.filter(
    module => availableModuleNames.includes(module.name)
  );
  
  // Check if a module is selected
  const isModuleSelected = (moduleName: ModuleName) => {
    return selectedModules.some(m => m.name === moduleName);
  };
  
  // Get the current level of a selected module
  const getModuleLevel = (moduleName: ModuleName): ModuleLevel | null => {
    const module = selectedModules.find(m => m.name === moduleName);
    return module ? module.level : null;
  };
  
  // Helper to render appropriate icon based on module
  const renderIcon = (module: ModuleName) => {
    switch (module) {
      case "WhatsApp":
        return <MessageSquare className="w-6 h-6 text-[#D4AF37]" />;
      case "Disparador de Mensagens / Captação":
        return <MessageSquare className="w-6 h-6 text-[#D4AF37]" />;
      case "Banco de Dados":
        return <Database className="w-6 h-6 text-[#D4AF37]" />;
      case "IA Avançada & Prompt Studio":
        return <Brain className="w-6 h-6 text-[#D4AF37]" />;
      case "Integração ERP":
        return <Code className="w-6 h-6 text-[#D4AF37]" />;
      case "Integração CRM":
        return <FileText className="w-6 h-6 text-[#D4AF37]" />;
      case "RAG / Base de Conhecimento":
        return <FileText className="w-6 h-6 text-[#D4AF37]" />;
      case "Google Drive Connector":
        return <Cloud className="w-6 h-6 text-[#D4AF37]" />;
      case "Análise de Dados + Dashboard":
        return <LayoutDashboard className="w-6 h-6 text-[#D4AF37]" />;
      case "Lembretes & Automação Follow-up":
        return <BellRing className="w-6 h-6 text-[#D4AF37]" />;
      default:
        return <Code className="w-6 h-6 text-[#D4AF37]" />;
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <h2 className="text-xl font-semibold mb-2">Selecione os Módulos</h2>
      <p className="text-sm text-gray-300 mb-4">
        Módulos disponíveis para o departamento de {selectedDepartment}
      </p>
      
      <div className="space-y-4">
        {availableModules.map((module) => {
          const isSelected = isModuleSelected(module.name);
          const selectedLevel = getModuleLevel(module.name);
          
          return (
            <div 
              key={module.name}
              className={cn(
                "border rounded-lg p-4 transition-all duration-300",
                isSelected
                  ? "border-[#D4AF37] bg-[#D4AF37]/10"
                  : "border-border"
              )}
            >
              <div 
                className="flex items-center justify-between cursor-pointer mb-3"
                onClick={() => onToggleModule({
                  name: module.name,
                  basePrice: 0, // This will be calculated based on level
                  level: isSelected ? selectedLevel : "I", // Default to Iniciante when selecting
                  available: true
                })}
              >
                <div className="flex items-center gap-3">
                  {renderIcon(module.name)}
                  <h3 className="text-lg font-medium">{module.name}</h3>
                </div>
                <div className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center",
                  isSelected ? "bg-[#D4AF37]" : "bg-gray-700"
                )}>
                  {isSelected && <Check className="w-4 h-4 text-white" />}
                </div>
              </div>
              
              {isSelected && (
                <div className="mt-4 border-t border-gray-700 pt-3 animate-fade-in">
                  <p className="mb-2 text-sm">Selecione o nível:</p>
                  <div className="flex flex-wrap gap-3">
                    {(['I', 'M', 'A'] as ModuleLevel[]).map((level) => (
                      <div
                        key={level}
                        onClick={() => onUpdateModuleLevel(module.name, level)}
                        className={cn(
                          "px-4 py-2 rounded-md text-sm cursor-pointer transition-all",
                          "flex flex-col items-center",
                          selectedLevel === level
                            ? "bg-[#D4AF37] text-white"
                            : "bg-gray-700 hover:bg-gray-600"
                        )}
                      >
                        <span>{level === 'I' ? 'Iniciante' : level === 'M' ? 'Intermediário' : 'Avançado'}</span>
                        <span className="text-xs mt-1">R$ {module.prices[level].toLocaleString('pt-BR')}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
        
        {availableModules.length === 0 && (
          <div className="text-center p-6 border border-dashed border-gray-600 rounded-lg">
            <p>Nenhum módulo disponível para este departamento.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModuleSelector;
