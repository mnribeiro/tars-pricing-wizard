import { useState, useRef } from "react";
import { 
  CalculatorState,
  BusinessNiche,
  IndustryArea,
  AutomationObjective,
  AILevel,
  AIFeature,
  AITraining,
  AITool,
  Module,
  ModuleName,
  ComplexityLevel,
  businessNiches,
  industryAreas,
  automationObjectives,
  aiFeatures,
  aiTraining,
  aiTools,
  aiLevelThresholds,
  modulesData,
  calculateTotalPrice,
  generateImplementationTimeline,
  generateCommercialProposal,
  Segment
} from "@/types/calculator";
import SelectableCard from "./SelectableCard";
import ComplexitySelector from "./ComplexitySelector";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { 
  Building, Target, Brain, Database, MessageSquare, BarChart3, 
  LayoutDashboard, BellRing, ClipboardList, ShoppingCart, 
  HeartPulse, Store, Handshake, Factory, Settings, Smartphone,
  TrendingUp, TrendingDown, Smile, Clock, Target as TargetIcon,
  Code, Globe, Users, Phone, MessageSquareText, Plus, Minus
} from "lucide-react";

const PricingCalculator = () => {
  // Referência para a seção de resumo para rolagem suave
  const summaryRef = useRef<HTMLDivElement>(null);
  
  // Estado da calculadora
  const [state, setState] = useState<CalculatorState>({
    currentStep: 1,
    clientName: "",
    companyName: "",
    clientPhone: "",
    projectDescription: "",
    initialIdea: "",
    selectedSegment: null,
    selectedSubNiche: null,
    selectedDepartment: null,
    selectedModules: [],
    selectedNiche: null,
    nicheUnits: 1,
    selectedIndustryArea: null,
    whatsappNumbers: 1,
    selectedObjectives: [],
    selectedAILevel: null,
    selectedAIFeatures: [],
    selectedAITraining: null,
    selectedAITools: [],
    notes: "",
    discount: 0
  });

  // Estado para controlar quais módulos estão com seletor de complexidade aberto
  const [expandedModules, setExpandedModules] = useState<ModuleName[]>([]);
  
  // Estado para controlar a exibição da proposta comercial
  const [showProposal, setShowProposal] = useState<boolean>(false);
  const proposalText = generateCommercialProposal(state);

  // Funções para atualização de estado
  const updateClientInfo = (field: keyof Pick<CalculatorState, "clientName" | "companyName" | "clientPhone" | "initialIdea">, value: string) => {
    setState(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const selectNiche = (niche: BusinessNiche) => {
    setState(prev => ({
      ...prev,
      selectedNiche: niche,
      // Resetar área de indústria se não for indústria
      selectedIndustryArea: niche === "Indústria" ? prev.selectedIndustryArea : null
    }));
  };

  const updateNicheUnits = (increment: boolean) => {
    setState(prev => ({
      ...prev,
      nicheUnits: increment 
        ? Math.min(prev.nicheUnits + 1, 20) // Limitar a 20 unidades
        : Math.max(prev.nicheUnits - 1, 1)  // Mínimo de 1 unidade
    }));
  };
  
  const selectIndustryArea = (area: IndustryArea) => {
    setState(prev => ({
      ...prev,
      selectedIndustryArea: area
    }));
  };
  
  const updateWhatsappNumbers = (increment: boolean) => {
    setState(prev => ({
      ...prev,
      whatsappNumbers: increment 
        ? Math.min(prev.whatsappNumbers + 1, 10) // Limitar a 10 números
        : Math.max(prev.whatsappNumbers - 1, 1)  // Mínimo de 1 número
    }));
  };

  const toggleObjective = (objective: AutomationObjective) => {
    setState(prev => {
      const objectives = [...prev.selectedObjectives];
      const index = objectives.indexOf(objective);
      
      if (index >= 0) {
        objectives.splice(index, 1);
      } else {
        objectives.push(objective);
      }
      
      return {
        ...prev,
        selectedObjectives: objectives
      };
    });
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
      
      // Calcular valor total dos recursos selecionados + treinamento + ferramentas
      const aiTotalValue = features.reduce((total, feat) => {
        const featureObj = aiFeatures.find(item => item.name === feat);
        return total + (featureObj?.value || 0);
      }, 0);
      
      const aiTrainingValue = prev.selectedAITraining ? 
        aiTraining.find(item => item.name === prev.selectedAITraining)?.value || 0 : 0;
      
      const aiToolsValue = prev.selectedAITools.reduce((total, tool) => {
        const toolObj = aiTools.find(item => item.name === tool);
        return total + (toolObj?.value || 0);
      }, 0);
      
      const totalAIValue = aiTotalValue + aiTrainingValue + aiToolsValue;
      
      // Determinar o nível de IA com base no valor total
      let aiLevel: AILevel = "IA Simples";
      
      if (totalAIValue <= aiLevelThresholds.simple.max) {
        aiLevel = "IA Simples";
      } else if (totalAIValue <= aiLevelThresholds.intermediate.max) {
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
  
  // Selecionar treinamento de IA
  const selectAITraining = (training: AITraining) => {
    setState(prev => {
      const newTraining = prev.selectedAITraining === training ? null : training;
      
      // Recalcular nível de IA
      const aiTotalValue = prev.selectedAIFeatures.reduce((total, feat) => {
        const featureObj = aiFeatures.find(item => item.name === feat);
        return total + (featureObj?.value || 0);
      }, 0);
      
      const aiTrainingValue = newTraining ? 
        aiTraining.find(item => item.name === newTraining)?.value || 0 : 0;
      
      const aiToolsValue = prev.selectedAITools.reduce((total, tool) => {
        const toolObj = aiTools.find(item => item.name === tool);
        return total + (toolObj?.value || 0);
      }, 0);
      
      const totalAIValue = aiTotalValue + aiTrainingValue + aiToolsValue;
      
      // Determinar o nível de IA com base no valor total
      let aiLevel: AILevel = "IA Simples";
      
      if (totalAIValue <= aiLevelThresholds.simple.max) {
        aiLevel = "IA Simples";
      } else if (totalAIValue <= aiLevelThresholds.intermediate.max) {
        aiLevel = "IA Intermediária";
      } else {
        aiLevel = "IA Complexa";
      }
      
      return {
        ...prev,
        selectedAITraining: newTraining,
        selectedAILevel: aiLevel
      };
    });
  };
  
  // Toggle para seleção de ferramentas de IA
  const toggleAITool = (tool: AITool) => {
    setState(prev => {
      const tools = [...prev.selectedAITools];
      const toolIndex = tools.indexOf(tool);
      
      if (toolIndex >= 0) {
        tools.splice(toolIndex, 1);
      } else {
        tools.push(tool);
      }
      
      // Recalcular nível de IA
      const aiTotalValue = prev.selectedAIFeatures.reduce((total, feat) => {
        const featureObj = aiFeatures.find(item => item.name === feat);
        return total + (featureObj?.value || 0);
      }, 0);
      
      const aiTrainingValue = prev.selectedAITraining ? 
        aiTraining.find(item => item.name === prev.selectedAITraining)?.value || 0 : 0;
      
      const aiToolsValue = tools.reduce((total, t) => {
        const toolObj = aiTools.find(item => item.name === t);
        return total + (toolObj?.value || 0);
      }, 0);
      
      const totalAIValue = aiTotalValue + aiTrainingValue + aiToolsValue;
      
      // Determinar o nível de IA com base no valor total
      let aiLevel: AILevel = "IA Simples";
      
      if (totalAIValue <= aiLevelThresholds.simple.max) {
        aiLevel = "IA Simples";
      } else if (totalAIValue <= aiLevelThresholds.intermediate.max) {
        aiLevel = "IA Intermediária";
      } else {
        aiLevel = "IA Complexa";
      }
      
      return {
        ...prev,
        selectedAITools: tools,
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
            { 
              name: moduleName, 
              basePrice, 
              level: null,
              available: true,
              complexity: null
            }
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

  // Verifica se um objetivo está selecionado
  const isObjectiveSelected = (objective: AutomationObjective): boolean => {
    return state.selectedObjectives.includes(objective);
  };

  // Verifica se o formulário está completo para gerar escopo
  const isFormComplete = (): boolean => {
    return (
      state.clientName.trim() !== "" &&
      state.companyName.trim() !== "" &&
      state.clientPhone.trim() !== "" &&
      state.initialIdea.trim() !== "" &&
      state.selectedNiche !== null &&
      state.selectedObjectives.length > 0 &&
      state.selectedAIFeatures.length > 0 &&
      state.selectedModules.length > 0 &&
      state.selectedModules.every(module => module.complexity !== null) &&
      (state.selectedNiche !== "Indústria" || state.selectedIndustryArea !== null)
    );
  };

  // Rola para a seção de resumo
  const scrollToSummary = () => {
    summaryRef.current?.scrollIntoView({ behavior: "smooth" });
    setShowProposal(false);
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
          case "Saúde":
            return <HeartPulse className="w-6 h-6 text-[#D4AF37]" />;
          case "Varejo":
            return <Store className="w-6 h-6 text-[#D4AF37]" />;
          case "E-commerce":
            return <ShoppingCart className="w-6 h-6 text-[#D4AF37]" />;
          case "Franquias":
            return <Handshake className="w-6 h-6 text-[#D4AF37]" />;
          case "Indústria":
            return <Factory className="w-6 h-6 text-[#D4AF37]" />;
          case "Serviços":
            return <Settings className="w-6 h-6 text-[#D4AF37]" />;
          default:
            return <Building className="w-6 h-6 text-[#D4AF37]" />;
        }
      case "industry":
        switch (name) {
          case "Logística":
            return <ShoppingCart className="w-6 h-6 text-[#D4AF37]" />;
          case "Produção":
            return <Factory className="w-6 h-6 text-[#D4AF37]" />;
          case "Inteligência de Negócios":
            return <BarChart3 className="w-6 h-6 text-[#D4AF37]" />;
          case "Envio de Relatórios":
            return <ClipboardList className="w-6 h-6 text-[#D4AF37]" />;
          default:
            return <Factory className="w-6 h-6 text-[#D4AF37]" />;
        }
      case "objective":
        switch (name) {
          case "Aumentar Vendas":
            return <TrendingUp className="w-6 h-6 text-[#D4AF37]" />;
          case "Reduzir Custos":
            return <TrendingDown className="w-6 h-6 text-[#D4AF37]" />;
          case "Melhorar Experiência":
            return <Smile className="w-6 h-6 text-[#D4AF37]" />;
          case "Otimizar Tempo":
            return <Clock className="w-6 h-6 text-[#D4AF37]" />;
          case "Inteligência Estratégica":
            return <TargetIcon className="w-6 h-6 text-[#D4AF37]" />;
          default:
            return <Target className="w-6 h-6 text-[#D4AF37]" />;
        }
      case "ai":
        return <Brain className="w-6 h-6 text-[#D4AF37]" />;
      case "module":
        switch (name) {
          case "Banco de Dados":
            return <Database className="w-6 h-6 text-[#D4AF37]" />;
          case "WhatsApp":
            return <MessageSquare className="w-6 h-6 text-[#D4AF37]" />;
          case "ERP":
            return <ClipboardList className="w-6 h-6 text-[#D4AF37]" />;
          case "CRM":
            return <Users className="w-6 h-6 text-[#D4AF37]" />;
          case "Lembretes":
            return <BellRing className="w-6 h-6 text-[#D4AF37]" />;
          case "Análise de Dados":
            return <BarChart3 className="w-6 h-6 text-[#D4AF37]" />;
          case "Dashboard":
            return <LayoutDashboard className="w-6 h-6 text-[#D4AF37]" />;
          case "API de Integração":
            return <Code className="w-6 h-6 text-[#D4AF37]" />;
          case "Portal do Cliente":
            return <Globe className="w-6 h-6 text-[#D4AF37]" />;
          case "Aplicativo Mobile":
            return <Smartphone className="w-6 h-6 text-[#D4AF37]" />;
          default:
            return null;
        }
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto max-w-4xl py-8 px-4 tars-background">
      <div className="tars-logo-container">
        <img 
          src="/lovable-uploads/4f1d932f-59a0-44cd-aceb-0b10faf8f429.png" 
          alt="TARS AI" 
          className="tars-logo"
        />
      </div>
      
      <h1 className="text-3xl font-bold text-center mb-8">Calculadora de Precificação Inteligente</h1>
      
      {/* Seção de Dados do Cliente */}
      <div className="mb-10 bg-black bg-opacity-20 p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Dados do Cliente</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="clientName" className="block mb-2 text-sm font-medium">
              Nome do Cliente
            </label>
            <Input
              type="text"
              id="clientName"
              value={state.clientName}
              onChange={(e) => updateClientInfo("clientName", e.target.value)}
              className="w-full bg-card border border-border"
              placeholder="Digite o nome do cliente"
            />
          </div>
          <div>
            <label htmlFor="companyName" className="block mb-2 text-sm font-medium">
              Nome da Empresa
            </label>
            <Input
              type="text"
              id="companyName"
              value={state.companyName}
              onChange={(e) => updateClientInfo("companyName", e.target.value)}
              className="w-full bg-card border border-border"
              placeholder="Digite o nome da empresa"
            />
          </div>
          <div>
            <label htmlFor="clientPhone" className="block mb-2 text-sm font-medium flex items-center">
              <Phone className="w-4 h-4 mr-1 text-[#D4AF37]" />
              Telefone do Cliente
            </label>
            <Input
              type="tel"
              id="clientPhone"
              value={state.clientPhone}
              onChange={(e) => updateClientInfo("clientPhone", e.target.value)}
              className="w-full bg-card border border-border"
              placeholder="(00) 00000-0000"
            />
          </div>
          <div>
            <label htmlFor="initialIdea" className="block mb-2 text-sm font-medium flex items-center">
              <MessageSquareText className="w-4 h-4 mr-1 text-[#D4AF37]" />
              Ideia Inicial
            </label>
            <Textarea
              id="initialIdea"
              value={state.initialIdea}
              onChange={(e) => updateClientInfo("initialIdea", e.target.value)}
              className="w-full bg-card border border-border"
              placeholder="Descreva brevemente a ideia do projeto..."
              rows={3}
            />
          </div>
        </div>
      </div>
      
      {/* Seção de Nicho do Projeto */}
      <div className="mb-10 bg-black bg-opacity-20 p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Nicho do Projeto</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {businessNiches.map((niche) => (
            <SelectableCard
              key={niche.name}
              title={niche.name}
              selected={state.selectedNiche === niche.name}
              onClick={() => selectNiche(niche.name)}
              icon={renderIcon("niche", niche.name)}
              price={niche.basePrice}
              showPrice={true}
            />
          ))}
        </div>
        
        {/* Controle de quantidade de unidades */}
        {state.selectedNiche && (
          <div className="mt-4 p-4 border border-[#D4AF37] rounded-md bg-opacity-20 bg-[#D4AF37]/10">
            <label className="block mb-2 text-sm font-medium">
              Quantidade de unidades:
            </label>
            <div className="flex items-center">
              <button 
                onClick={() => updateNicheUnits(false)}
                disabled={state.nicheUnits <= 1}
                className="p-1 rounded border border-gray-600 text-gray-300 disabled:opacity-50"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="mx-3 font-medium">{state.nicheUnits}</span>
              <button 
                onClick={() => updateNicheUnits(true)}
                className="p-1 rounded border border-gray-600 text-gray-300"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
        
        {/* Área de indústria (se o nicho for indústria) */}
        {state.selectedNiche === "Indústria" && (
          <div className="mt-4">
            <h3 className="text-md font-medium mb-2">Área da Indústria:</h3>
            <div className="grid grid-cols-2 gap-3">
              {industryAreas.map((area) => (
                <SelectableCard
                  key={area.name}
                  title={area.name}
                  selected={state.selectedIndustryArea === area.name}
                  onClick={() => selectIndustryArea(area.name)}
                  icon={renderIcon("industry", area.name)}
                  className="text-sm"
                />
              ))}
            </div>
          </div>
        )}
        
        {/* Controle de números de WhatsApp */}
        {isModuleSelected("WhatsApp") && (
          <div className="mt-4 p-4 border border-[#D4AF37] rounded-md bg-opacity-20 bg-[#D4AF37]/10">
            <label className="block mb-2 text-sm font-medium">
              Números de WhatsApp a serem conectados:
            </label>
            <div className="flex items-center">
              <button 
                onClick={() => updateWhatsappNumbers(false)}
                disabled={state.whatsappNumbers <= 1}
                className="p-1 rounded border border-gray-600 text-gray-300 disabled:opacity-50"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="mx-3 font-medium">{state.whatsappNumbers}</span>
              <button 
                onClick={() => updateWhatsappNumbers(true)}
                className="p-1 rounded border border-gray-600 text-gray-300"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Seção de Objetivo da Automação (agora com múltipla seleção) */}
      <div className="mb-10 bg-black bg-opacity-20 p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Objetivos da Automação</h2>
        <p className="mb-4 text-sm">Selecione um ou mais objetivos para o seu projeto.</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {automationObjectives.map((objective) => (
            <SelectableCard
              key={objective}
              title={objective}
              selected={isObjectiveSelected(objective)}
              onClick={() => toggleObjective(objective)}
              icon={renderIcon("objective", objective)}
            />
          ))}
        </div>
      </div>
      
      {/* Seção de Recursos de IA */}
      <div className="mb-10 bg-black bg-opacity-20 p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Recursos de Inteligência Artificial</h2>
        <p className="mb-4 text-sm">Selecione os recursos de IA que deseja incluir no projeto. O nível de IA será determinado automaticamente com base nos recursos, treinamento e ferramentas selecionados.</p>
        
        <h3 className="text-lg font-medium mb-3">Recursos de IA</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {aiFeatures.map((feature) => (
            <SelectableCard
              key={feature.name}
              title={feature.name}
              selected={state.selectedAIFeatures.includes(feature.name)}
              onClick={() => toggleAIFeature(feature.name)}
              icon={<Brain className="w-6 h-6 text-[#D4AF37]" />}
              price={feature.value}
              showPrice={true}
            />
          ))}
        </div>
        
        <h3 className="text-lg font-medium mb-3">Nível de Treinamento</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {aiTraining.map((training) => (
            <SelectableCard
              key={training.name}
              title={training.name}
              selected={state.selectedAITraining === training.name}
              onClick={() => selectAITraining(training.name)}
              icon={<Clock className="w-6 h-6 text-[#D4AF37]" />}
              price={training.value}
              showPrice={true}
            />
          ))}
        </div>
        
        <h3 className="text-lg font-medium mb-3">Ferramentas de IA</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {aiTools.map((tool) => (
            <div key={tool.name} className="flex items-start space-x-2">
              <Checkbox 
                id={`ai-tool-${tool.name}`} 
                checked={state.selectedAITools.includes(tool.name)}
                onCheckedChange={() => toggleAITool(tool.name)}
              />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor={`ai-tool-${tool.name}`} className="text-sm font-medium">
                  {tool.name}
                </Label>
                <p className="text-xs text-muted-foreground">
                  R$ {tool.value.toLocaleString('pt-BR')}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {state.selectedAILevel && (
          <div className="mt-4 p-4 border border-[#D4AF37] rounded-md bg-opacity-20 bg-[#D4AF37]/10">
            <p className="font-medium">Nível de IA determinado: <span className="font-bold text-[#D4AF37]">{state.selectedAILevel}</span></p>
            <p className="text-sm mt-1 text-gray-300">
              {state.selectedAILevel === "IA Simples" && "Recomendado para automações básicas e processamento de dados simples."}
              {state.selectedAILevel === "IA Intermediária" && "Ideal para análise de dados, reconhecimento de padrões e automação moderada."}
              {state.selectedAILevel === "IA Complexa" && "Recomendado para soluções avançadas de machine learning, análise preditiva e processamento complexo."}
            </p>
          </div>
        )}
      </div>
      
      {/* Seção de Módulos e Complexidade */}
      <div className="mb-10 bg-black bg-opacity-20 p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Módulos e Complexidade</h2>
        <p className="mb-4 text-sm">Selecione os módulos que deseja incluir no projeto e defina o nível de complexidade para cada um. Os preços variam de acordo com a complexidade.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {modulesData.map((module) => (
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
              ? "bg-[#D4AF37] text-white hover:bg-opacity-90"
              : "bg-gray-600 text-gray-300 cursor-not-allowed"
          }`}
        >
          Gerar Escopo e Preço
        </button>
      </div>
      
      {/* Seção de Resumo e Investimento */}
      {isFormComplete() && (
        <div ref={summaryRef} className="border border-[#D4AF37] rounded-xl p-6 bg-card animate-fade-in">
          <h2 className="text-2xl font-semibold mb-6 text-center">Resumo do Escopo</h2>
          
          <div className="space-y-4 mb-6">
            <div>
              <span className="font-medium">Cliente:</span> {state.clientName}
            </div>
            <div>
              <span className="font-medium">Empresa:</span> {state.companyName}
            </div>
            <div>
              <span className="font-medium">Telefone:</span> {state.clientPhone}
            </div>
            <div>
              <span className="font-medium">Ideia Inicial:</span> {state.initialIdea}
            </div>
            <div>
              <span className="font-medium">Nicho:</span> {state.selectedNiche} 
              {state.nicheUnits > 1 && ` (${state.nicheUnits} unidades)`}
            </div>
            {state.selectedIndustryArea && (
              <div>
                <span className="font-medium">Área da Indústria:</span> {state.selectedIndustryArea}
              </div>
            )}
            
            <div>
              <span className="font-medium">Objetivos:</span>
              <ul className="mt-1 space-y-1 pl-5 list-disc">
                {state.selectedObjectives.map((objective) => (
                  <li key={objective}>{objective}</li>
                ))}
              </ul>
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
            
            {state.selectedAITraining && (
              <div>
                <span className="font-medium">Treinamento de IA:</span> {state.selectedAITraining} (R$ {aiTraining.find(t => t.name === state.selectedAITraining)?.value.toLocaleString('pt-BR')})
              </div>
            )}
            
            {state.selectedAITools.length > 0 && (
              <div>
                <span className="font-medium">Ferramentas de IA:</span>
                <ul className="mt-1 space-y-1">
                  {state.selectedAITools.map(tool => {
                    const toolObj = aiTools.find(t => t.name === tool);
                    return (
                      <li key={tool} className="flex justify-between">
                        <span>{tool}</span>
                        <span>R$ {toolObj?.value.toLocaleString('pt-BR')}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            
            <div>
              <span className="font-medium">Nível de IA Resultante:</span> {state.selectedAILevel}
            </div>
            
            <div className="pt-2">
              <span className="font-medium">Módulos Selecionados:</span>
              <ul className="mt-2 space-y-2">
                {state.selectedModules.map((module) => {
                  // Obter preço do módulo baseado na complexidade
                  const modulePricing = modulesData.find(m => m.name === module.name);
                  const price = module.complexity && modulePricing
                    ? modulePricing.prices[module.complexity]
                    : 0;
                  
                  // Texto do nível de complexidade
                  const complexityText = module.complexity === "easy" 
                    ? "Fácil" 
                    : module.complexity === "normal" 
                      ? "Intermediário" 
                      : "Avançado";
                  
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
            
            <div className="space-y-4 mt-4">
              {timeline.tasks.map((task, index) => (
                <div key={index} className="border-l-2 border-[#D4AF37] pl-4 py-1">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{task.phase}</span>
                    <span className="text-sm font-medium bg-[#D4AF37] text-white px-2 py-1 rounded-full">{task.days} dias</span>
                  </div>
                  <p className="text-sm text-gray-300 mt-1">{task.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="border-t border-border pt-4 mt-6">
            <div className="flex justify-between items-center text-xl font-bold mb-2">
              <span>Investimento para Implementação:</span>
              <span className="text-[#D4AF37]">
                R$ {totalPrice.implementation.toLocaleString('pt-BR')}
              </span>
            </div>
            <div className="flex justify-between items-center text-lg">
              <span>Mensalidade para Manutenção (20%):</span>
              <span className="text-[#D4AF37]">
                R$ {totalPrice.monthly.toLocaleString('pt-BR')}
              </span>
            </div>
          </div>
          
          {/* Botões para alternar entre resumo e proposta */}
          <div className="flex justify-center mt-8 space-x-4">
            <button 
              className={`px-4 py-2 rounded-md font-medium ${showProposal ? "bg-gray-700 hover:bg-gray-600" : "bg-[#D4AF37] text-white"}`}
              onClick={() => setShowProposal(false)}
            >
              Resumo
            </button>
            <button 
              className={`px-4 py-2 rounded-md font-medium ${!showProposal ? "bg-gray-700 hover:bg-gray-600" : "bg-[#D4AF37] text-white"}`}
              onClick={() => setShowProposal(true)}
            >
              Proposta Comercial
            </button>
          </div>
          
          {/* Proposta Comercial */}
          {showProposal && (
            <div className="mt-6 p-4 bg-black bg-opacity-30 rounded-md whitespace-pre-line">
              {proposalText}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PricingCalculator;
