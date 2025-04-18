
import { useState, useRef } from "react";
import { 
  CalculatorState,
  BusinessNiche,
  AutomationObjective,
  AILevel,
  AIFeature,
  Module,
  ModuleName,
  ComplexityLevel,
  businessNiches,
  automationObjectives,
  aiFeatures,
  aiLevelThresholds,
  availableModules,
  calculateTotalPrice,
  generateImplementationTimeline
} from "@/types/calculator";
import SelectableCard from "./SelectableCard";
import ComplexitySelector from "./ComplexitySelector";
import { 
  Building, Target, Brain, Database, MessageSquare, BarChart3, 
  LayoutDashboard, BellRing, ClipboardList, ShoppingCart, 
  HeartPulse, Store, Handshake, Factory, Settings, 
  TrendingUp, TrendingDown, Smile, Clock, ScanSearch,
  Code, Smartphone, Globe, Users
} from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

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
    selectedAIFeatures: [],
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

  // Toggle para seleção de recursos de IA
  const toggleAIFeature = (feature: AIFeature) => {
    setState(prev => {
      const features = [...prev.selectedAIFeatures];
      const featureIndex = features.indexOf(feature);
      
      if (featureIndex >= 0) {
        features.splice(featureIndex, 1);
      } else {
        features.push(feature);
      }
      
      // Calcular valor total dos recursos selecionados
      const totalValue = features.reduce((total, feat) => {
        const featureObj = aiFeatures.find(item => item.name === feat);
        return total + (featureObj?.value || 0);
      }, 0);
      
      // Determinar o nível de IA com base no valor total
      let aiLevel: AILevel | null = null;
      
      if (totalValue <= aiLevelThresholds.simple.max) {
        aiLevel = "IA Simples";
      } else if (totalValue <= aiLevelThresholds.intermediate.max) {
        aiLevel = "IA Intermediária";
      } else {
        aiLevel = "IA Complexa";
      }
      
      return {
        ...prev,
        selectedAIFeatures: features,
        selectedAILevel: aiLevel
      };
    });
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
      state.selectedAIFeatures.length > 0 &&
      state.selectedModules.length > 0 &&
      state.selectedModules.every(module => module.complexity !== null)
    );
  };

  // Rola para a seção de resumo
  const scrollToSummary = () => {
    summaryRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Calcula o preço total (implementação e mensal)
  const totalPrice = calculateTotalPrice(state);
  
  // Gera cronograma de implementação
  const timeline = generateImplementationTimeline(state);

  // Renderiza os ícones para os cards
  const renderIcon = (type: string, name: string) => {
    switch (type) {
      case "niche":
        switch (name) {
          case "Clínicas":
            return <HeartPulse className="w-6 h-6 text-tars-highlight" />;
          case "Consultórios":
            return <Users className="w-6 h-6 text-tars-highlight" />;
          case "E-commerce":
            return <ShoppingCart className="w-6 h-6 text-tars-highlight" />;
          case "Franquias":
            return <Building className="w-6 h-6 text-tars-highlight" />;
          case "Indústria":
            return <Factory className="w-6 h-6 text-tars-highlight" />;
          case "Serviços":
            return <Settings className="w-6 h-6 text-tars-highlight" />;
          case "Saúde":
            return <HeartPulse className="w-6 h-6 text-tars-highlight" />;
          case "Varejo":
            return <Store className="w-6 h-6 text-tars-highlight" />;
          default:
            return <Building className="w-6 h-6 text-tars-highlight" />;
        }
      case "objective":
        switch (name) {
          case "Aumentar Vendas":
            return <TrendingUp className="w-6 h-6 text-tars-highlight" />;
          case "Reduzir Custos":
            return <TrendingDown className="w-6 h-6 text-tars-highlight" />;
          case "Melhorar Experiência":
            return <Smile className="w-6 h-6 text-tars-highlight" />;
          case "Otimizar Tempo":
            return <Clock className="w-6 h-6 text-tars-highlight" />;
          case "Inteligência Estratégica":
            return <Target className="w-6 h-6 text-tars-highlight" />;
          default:
            return <Target className="w-6 h-6 text-tars-highlight" />;
        }
      case "ai":
        return <Brain className="w-6 h-6 text-tars-highlight" />;
      case "module":
        switch (name) {
          case "Banco de Dados":
            return <Database className="w-6 h-6 text-tars-highlight" />;
          case "WhatsApp":
            return <MessageSquare className="w-6 h-6 text-tars-highlight" />;
          case "ERP":
            return <ClipboardList className="w-6 h-6 text-tars-highlight" />;
          case "CRM":
            return <Users className="w-6 h-6 text-tars-highlight" />;
          case "Lembretes":
            return <BellRing className="w-6 h-6 text-tars-highlight" />;
          case "Análise de Dados":
            return <BarChart3 className="w-6 h-6 text-tars-highlight" />;
          case "Dashboard":
            return <LayoutDashboard className="w-6 h-6 text-tars-highlight" />;
          case "API de Integração":
            return <Code className="w-6 h-6 text-tars-highlight" />;
          case "Portal do Cliente":
            return <Globe className="w-6 h-6 text-tars-highlight" />;
          case "Aplicativo Mobile":
            return <Smartphone className="w-6 h-6 text-tars-highlight" />;
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
      
      {/* Seção de Recursos de IA */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Recursos de IA</h2>
        <p className="mb-4 text-sm">Selecione os recursos de IA que deseja incluir no projeto. O nível de IA será determinado automaticamente com base nos recursos selecionados.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {aiFeatures.map((feature) => (
            <SelectableCard
              key={feature.name}
              title={feature.name}
              selected={state.selectedAIFeatures.includes(feature.name)}
              onClick={() => toggleAIFeature(feature.name)}
              icon={<Brain className="w-6 h-6 text-tars-highlight" />}
              price={feature.value}
            />
          ))}
        </div>
        
        {state.selectedAILevel && (
          <div className="mt-4 p-4 border border-tars-highlight rounded-md bg-opacity-20 bg-tars-highlight/10">
            <p className="font-medium">Nível de IA determinado: <span className="font-bold text-tars-highlight">{state.selectedAILevel}</span></p>
          </div>
        )}
      </div>
      
      {/* Seção de Módulos e Complexidade */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Módulos e Complexidade</h2>
        <p className="mb-4 text-sm">Selecione os módulos que deseja incluir no projeto e defina o nível de complexidade para cada um.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableModules.map((module) => (
            <div key={module.name} className="flex flex-col">
              <SelectableCard
                title={module.name}
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
                  prices={{
                    easy: module.prices.easy,
                    normal: module.prices.normal,
                    complex: module.prices.complex
                  }}
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
            
            <div className="pt-2">
              <span className="font-medium">Recursos de IA Selecionados:</span>
              <ul className="mt-2 space-y-1">
                {state.selectedAIFeatures.map((feature) => {
                  const featureObj = aiFeatures.find(ai => ai.name === feature);
                  return (
                    <li key={feature} className="flex justify-between">
                      <span>{feature}</span>
                      <span>R$ {featureObj?.value.toLocaleString('pt-BR')}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
            
            <div>
              <span className="font-medium">Nível de IA Resultante:</span> {state.selectedAILevel}
            </div>
            
            <div className="pt-2">
              <span className="font-medium">Módulos Selecionados:</span>
              <ul className="mt-2 space-y-2">
                {state.selectedModules.map((module) => {
                  // Obter preço do módulo baseado na complexidade
                  const modulePricing = availableModules.find(m => m.name === module.name);
                  const price = module.complexity && modulePricing
                    ? modulePricing.prices[module.complexity]
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
                      <span>R$ {price.toLocaleString('pt-BR')}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          
          {/* Seção de Cronograma */}
          <div className="mt-8 mb-6 border-t border-border pt-4">
            <h3 className="text-xl font-semibold mb-3">Cronograma de Implementação</h3>
            <p className="mb-2 text-sm">Estimativa de tempo total: <span className="font-bold">{timeline.totalDays} dias</span></p>
            
            <div className="space-y-2 mt-4">
              {timeline.tasks.map((task, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span>{task.phase}</span>
                  <span className="font-medium">{task.days} dias</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="border-t border-border pt-4 mt-6">
            <div className="flex justify-between items-center text-xl font-bold mb-2">
              <span>Investimento para Implementação:</span>
              <span className="text-tars-highlight">
                R$ {totalPrice.implementation.toLocaleString('pt-BR')}
              </span>
            </div>
            <div className="flex justify-between items-center text-lg">
              <span>Mensalidade para Manutenção (20%):</span>
              <span className="text-tars-highlight">
                R$ {totalPrice.monthly.toLocaleString('pt-BR')}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingCalculator;
