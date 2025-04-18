
import { useState, useRef } from "react";
import { 
  CalculatorState,
  BusinessNiche,
  AutomationObjective,
  AILevel,
  Module,
  ModuleName,
  ComplexityLevel,
  businessNiches,
  automationObjectives,
  aiLevels,
  availableModules,
  calculateTotalPrice
} from "@/types/calculator";
import SelectableCard from "./SelectableCard";
import ComplexitySelector from "./ComplexitySelector";
import { Building, Target, Brain, Database, MessageSquare, BarChart3, LayoutDashboard, BellRing, ClipboardList } from "lucide-react";

const PricingCalculator = () => {
  // Referência para a seção de resumo para rolagem suave
  const summaryRef = useRef<HTMLDivElement>(null);
  
  // Estado da calculadora
  const [state, setState] = useState<CalculatorState>({
    clientName: "",
    companyName: "",
    selectedNiche: null,
    selectedObjective: null,
    selectedAILevel: null,
    selectedModules: []
  });

  // Estado para controlar quais módulos estão com seletor de complexidade aberto
  const [expandedModules, setExpandedModules] = useState<ModuleName[]>([]);

  // Funções para atualização de estado
  const updateClientInfo = (field: "clientName" | "companyName", value: string) => {
    setState(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const selectNiche = (niche: BusinessNiche) => {
    setState(prev => ({
      ...prev,
      selectedNiche: niche
    }));
  };

  const selectObjective = (objective: AutomationObjective) => {
    setState(prev => ({
      ...prev,
      selectedObjective: objective
    }));
  };

  const selectAILevel = (aiLevel: AILevel) => {
    setState(prev => ({
      ...prev,
      selectedAILevel: aiLevel
    }));
  };

  // Toggle para seleção de módulos
  const toggleModule = (moduleName: ModuleName, basePrice: number) => {
    setState(prev => {
      // Verifica se o módulo já está selecionado
      const moduleIndex = prev.selectedModules.findIndex(m => m.name === moduleName);
      
      if (moduleIndex >= 0) {
        // Remove o módulo se já estiver selecionado
        return {
          ...prev,
          selectedModules: prev.selectedModules.filter(m => m.name !== moduleName)
        };
      } else {
        // Adiciona o módulo se não estiver selecionado
        return {
          ...prev,
          selectedModules: [
            ...prev.selectedModules,
            { name: moduleName, basePrice, complexity: null }
          ]
        };
      }
    });

    // Toggle da exibição do seletor de complexidade
    setExpandedModules(prev => {
      const isExpanded = prev.includes(moduleName);
      if (isExpanded) {
        return prev.filter(m => m !== moduleName);
      } else {
        return [...prev, moduleName];
      }
    });
  };

  // Atualiza a complexidade de um módulo
  const updateModuleComplexity = (moduleName: ModuleName, complexity: ComplexityLevel) => {
    setState(prev => {
      const newModules = [...prev.selectedModules];
      const moduleIndex = newModules.findIndex(m => m.name === moduleName);
      
      if (moduleIndex >= 0) {
        newModules[moduleIndex] = {
          ...newModules[moduleIndex],
          complexity
        };
      }
      
      return {
        ...prev,
        selectedModules: newModules
      };
    });
  };

  // Verifica se um módulo está selecionado
  const isModuleSelected = (moduleName: ModuleName): boolean => {
    return state.selectedModules.some(m => m.name === moduleName);
  };

  // Obtém a complexidade de um módulo
  const getModuleComplexity = (moduleName: ModuleName): ComplexityLevel | null => {
    const module = state.selectedModules.find(m => m.name === moduleName);
    return module ? module.complexity : null;
  };

  // Verifica se o formulário está completo para gerar escopo
  const isFormComplete = (): boolean => {
    return (
      state.clientName.trim() !== "" &&
      state.companyName.trim() !== "" &&
      state.selectedNiche !== null &&
      state.selectedObjective !== null &&
      state.selectedAILevel !== null &&
      state.selectedModules.length > 0 &&
      state.selectedModules.every(module => module.complexity !== null)
    );
  };

  // Rola para a seção de resumo
  const scrollToSummary = () => {
    summaryRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Calcula o preço total
  const totalPrice = calculateTotalPrice(state);

  // Renderiza os ícones para os cards
  const renderIcon = (type: string, name: string) => {
    switch (type) {
      case "niche":
        return (
          <Building className="w-6 h-6 text-tars-highlight" />
        );
      case "objective":
        return (
          <Target className="w-6 h-6 text-tars-highlight" />
        );
      case "ai":
        return (
          <Brain className="w-6 h-6 text-tars-highlight" />
        );
      case "module":
        switch (name) {
          case "Banco de Dados":
            return <Database className="w-6 h-6 text-tars-highlight" />;
          case "WhatsApp":
            return <MessageSquare className="w-6 h-6 text-tars-highlight" />;
          case "ERP":
            return <ClipboardList className="w-6 h-6 text-tars-highlight" />;
          case "CRM":
            return <ClipboardList className="w-6 h-6 text-tars-highlight" />;
          case "Lembretes":
            return <BellRing className="w-6 h-6 text-tars-highlight" />;
          case "Análise de Dados":
            return <BarChart3 className="w-6 h-6 text-tars-highlight" />;
          case "Dashboard":
            return <LayoutDashboard className="w-6 h-6 text-tars-highlight" />;
          default:
            return null;
        }
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto max-w-4xl py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Calculadora de Precificação Inteligente</h1>
      
      {/* Seção de Dados do Cliente */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Dados do Cliente</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="clientName" className="block mb-2 text-sm font-medium">
              Nome do Cliente
            </label>
            <input
              type="text"
              id="clientName"
              value={state.clientName}
              onChange={(e) => updateClientInfo("clientName", e.target.value)}
              className="w-full p-3 bg-card border border-border rounded-md focus:ring-2 focus:ring-tars-focus"
              placeholder="Digite o nome do cliente"
            />
          </div>
          <div>
            <label htmlFor="companyName" className="block mb-2 text-sm font-medium">
              Nome da Empresa
            </label>
            <input
              type="text"
              id="companyName"
              value={state.companyName}
              onChange={(e) => updateClientInfo("companyName", e.target.value)}
              className="w-full p-3 bg-card border border-border rounded-md focus:ring-2 focus:ring-tars-focus"
              placeholder="Digite o nome da empresa"
            />
          </div>
        </div>
      </div>
      
      {/* Seção de Nicho do Projeto */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Nicho do Projeto</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {businessNiches.map((niche) => (
            <SelectableCard
              key={niche}
              title={niche}
              selected={state.selectedNiche === niche}
              onClick={() => selectNiche(niche)}
              icon={renderIcon("niche", niche)}
            />
          ))}
        </div>
      </div>
      
      {/* Seção de Objetivo da Automação */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Objetivo da Automação</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {automationObjectives.map((objective) => (
            <SelectableCard
              key={objective}
              title={objective}
              selected={state.selectedObjective === objective}
              onClick={() => selectObjective(objective)}
              icon={renderIcon("objective", objective)}
            />
          ))}
        </div>
      </div>
      
      {/* Seção de Nível de IA */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Nível de IA</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {aiLevels.map((ai) => (
            <SelectableCard
              key={ai.name}
              title={ai.name}
              price={ai.price}
              selected={state.selectedAILevel === ai.name}
              onClick={() => selectAILevel(ai.name)}
              icon={renderIcon("ai", ai.name)}
            />
          ))}
        </div>
      </div>
      
      {/* Seção de Módulos e Complexidade */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Módulos e Complexidade</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableModules.map((module) => (
            <div key={module.name} className="flex flex-col">
              <SelectableCard
                title={module.name}
                price={module.basePrice}
                selected={isModuleSelected(module.name)}
                onClick={() => toggleModule(module.name, module.basePrice)}
                icon={renderIcon("module", module.name)}
              />
              
              {/* Mostra seletor de complexidade apenas se o módulo estiver selecionado e expandido */}
              {isModuleSelected(module.name) && expandedModules.includes(module.name) && (
                <ComplexitySelector
                  selected={getModuleComplexity(module.name)}
                  onChange={(complexity) => updateModuleComplexity(module.name, complexity)}
                  className="mt-2"
                />
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Botão para gerar escopo */}
      <div className="flex justify-center mb-12">
        <button
          onClick={scrollToSummary}
          disabled={!isFormComplete()}
          className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
            isFormComplete()
              ? "bg-tars-highlight text-white hover:bg-opacity-90"
              : "bg-gray-600 text-gray-300 cursor-not-allowed"
          }`}
        >
          Gerar Escopo e Preço
        </button>
      </div>
      
      {/* Seção de Resumo e Investimento */}
      {isFormComplete() && (
        <div ref={summaryRef} className="border border-border rounded-xl p-6 bg-card animate-fade-in">
          <h2 className="text-2xl font-semibold mb-6 text-center">Resumo do Escopo</h2>
          
          <div className="space-y-4 mb-6">
            <div>
              <span className="font-medium">Cliente:</span> {state.clientName}
            </div>
            <div>
              <span className="font-medium">Empresa:</span> {state.companyName}
            </div>
            <div>
              <span className="font-medium">Nicho:</span> {state.selectedNiche}
            </div>
            <div>
              <span className="font-medium">Objetivo:</span> {state.selectedObjective}
            </div>
            <div>
              <span className="font-medium">Nível de IA:</span> {state.selectedAILevel} → R$ {aiLevels.find(ai => ai.name === state.selectedAILevel)?.price.toLocaleString('pt-BR')}
            </div>
            
            <div className="pt-2">
              <span className="font-medium">Módulos Selecionados:</span>
              <ul className="mt-2 space-y-2">
                {state.selectedModules.map((module) => {
                  // Preço do módulo com multiplicador de complexidade
                  const modulePrice = module.complexity 
                    ? module.basePrice * (module.complexity === "easy" ? 1.0 : module.complexity === "normal" ? 1.3 : 1.6)
                    : 0;
                  
                  // Texto do nível de complexidade
                  const complexityText = module.complexity === "easy" 
                    ? "Fácil" 
                    : module.complexity === "normal" 
                      ? "Normal" 
                      : "Complexo";
                  
                  return (
                    <li key={module.name} className="flex justify-between">
                      <span>{module.name} ({complexityText})</span>
                      <span>R$ {modulePrice.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border pt-4 mt-6">
            <div className="flex justify-between items-center text-xl font-bold">
              <span>Investimento Total:</span>
              <span className="text-tars-highlight">
                R$ {totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingCalculator;
