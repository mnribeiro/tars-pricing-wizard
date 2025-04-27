import { CalculatorState, ModuleScope, Task, Timeline, TotalPrice } from "./interfaces";
import { aiFeatures, aiTools, aiTraining, aiLevelThresholds, modulesData } from "./constants";
import { AIFeature, AITool, AITraining, Segment, SubNiche, Department } from "./enums";

export * from "./interfaces";
export * from "./enums";
export * from "./constants";

export const calculateTotalPrice = (state: CalculatorState): TotalPrice => {
  let implementationTotal = 0;
  let monthlyTotal = 0;
  let originalImplementation = 0;

  if (state.selectedNiche) {
    const niche = businessNiches.find(n => n.name === state.selectedNiche);
    implementationTotal += (niche?.basePrice || 0) * state.nicheUnits;
  }

  state.selectedModules.forEach(module => {
    const moduleData = modulesData.find(m => m.name === module.name);

    if (moduleData && module.complexity) {
      implementationTotal += moduleData.prices[module.complexity];
    }
  });

  state.selectedAIFeatures.forEach(feature => {
    const aiFeature = aiFeatures.find(ai => ai.name === feature);
    implementationTotal += aiFeature?.value || 0;
  });

  if (state.selectedAITraining) {
    const aiTrainingItem = aiTraining.find(t => t.name === state.selectedAITraining);
    implementationTotal += aiTrainingItem?.value || 0;
  }

  state.selectedAITools.forEach(tool => {
    const aiTool = aiTools.find(t => t.name === tool);
    implementationTotal += aiTool?.value || 0;
  });

  originalImplementation = implementationTotal;
  
  monthlyTotal = originalImplementation * 0.20;

  const discountMultiplier = 1 - (state.discount / 100);
  implementationTotal *= discountMultiplier;

  const discountAmount = originalImplementation - implementationTotal;

  return {
    implementation: implementationTotal,
    monthly: monthlyTotal,
    originalImplementation: originalImplementation,
    discountAmount: discountAmount
  };
};

export const generateModuleScope = (state: CalculatorState): ModuleScope[] => {
  const scope: ModuleScope[] = [];
  
  state.selectedModules.forEach(module => {
    const complexity = module.complexity || 'normal';
    const levelLabel = complexity === 'easy' ? 'Básico' : complexity === 'normal' ? 'Intermediário' : 'Avançado';
    
    let description = '';
    
    switch (module.name) {
      case "WhatsApp":
        description = complexity === 'easy' 
          ? "Chatbot simples para atendimento automático com respostas pré-definidas."
          : complexity === 'normal'
          ? "Chatbot intermediário com fluxos de conversação e integração com base de conhecimento."
          : "Chatbot avançado com IA para atendimento personalizado e resolução de problemas complexos.";
        break;
      case "Disparador de Mensagens / Captação":
        description = complexity === 'easy'
          ? "Sistema básico de envio de mensagens para listas segmentadas."
          : complexity === 'normal'
          ? "Sistema intermediário com automação de campanhas e monitoramento de resultados."
          : "Sistema avançado com multicanais, segmentação comportamental e análise preditiva.";
        break;
      case "Banco de Dados":
        description = complexity === 'easy'
          ? "Estrutura básica para armazenamento e consulta de dados dos clientes."
          : complexity === 'normal'
          ? "Sistema intermediário com relacionamentos entre dados e dashboards analíticos."
          : "Sistema avançado com big data, análise comportamental e predição de tendências.";
        break;
      case "IA Avançada & Prompt Studio":
        description = complexity === 'easy'
          ? "Interface básica para criação e teste de prompts de IA."
          : complexity === 'normal'
          ? "Editor avançado de prompts com templates e bibliotecas de comandos pré-definidos."
          : "Plataforma completa de desenvolvimento de IA com fine-tuning e adaptação de modelos.";
        break;
      case "Integração ERP":
        description = complexity === 'easy'
          ? "Conexão básica para sincronização de dados com seu ERP."
          : complexity === 'normal'
          ? "Integração intermediária com sincronização bidirecional e automações."
          : "Integração avançada com processamento em tempo real e workflows complexos.";
        break;
      case "Integração CRM":
        description = complexity === 'easy'
          ? "Conexão básica para sincronização de dados de clientes com seu CRM."
          : complexity === 'normal'
          ? "Integração intermediária com tracking de interações e histórico de atendimento."
          : "Integração avançada com customer journey, scoring de leads e automação de vendas.";
        break;
      case "RAG / Base de Conhecimento":
        description = complexity === 'easy'
          ? "Base de conhecimento simples para consulta de informações frequentes."
          : complexity === 'normal'
          ? "Sistema intermediário com categorização, busca semântica e atualizações."
          : "Sistema avançado com aprendizado contínuo e personalização por contexto.";
        break;
      case "Google Drive Connector":
        description = complexity === 'easy'
          ? "Conexão básica para acesso e compartilhamento de arquivos do Google Drive."
          : complexity === 'normal'
          ? "Integração intermediária com workflows de aprovação e controle de versões."
          : "Integração avançada com automação de documentos e processamento inteligente.";
        break;
      case "Análise de Dados + Dashboard":
        description = complexity === 'easy'
          ? "Dashboard básico com métricas principais e gráficos simples."
          : complexity === 'normal'
          ? "Dashboard intermediário com KPIs personalizados e visualizações interativas."
          : "Plataforma avançada de Business Intelligence com análises preditivas e insights.";
        break;
      case "Lembretes & Automação Follow-up":
        description = complexity === 'easy'
          ? "Sistema básico de lembretes e follow-ups manuais."
          : complexity === 'normal'
          ? "Sistema intermediário com automação de sequências de follow-up e agendamento."
          : "Sistema avançado com gatilhos comportamentais e personalização contextual.";
        break;
      default:
        description = "Funcionalidades personalizadas de acordo com a complexidade selecionada.";
    }
    
    scope.push({
      module: module.name,
      level: levelLabel,
      description: description
    });
  });
  
  return scope;
};

export const generateDeliverables = (state: CalculatorState): string[] => {
  const deliverables: string[] = [
    "Plataforma de Automação TARS AI personalizada",
    "Configuração e implementação dos módulos selecionados",
    "Integração entre os módulos e sistemas existentes",
    "Documentação técnica e manual do usuário"
  ];
  
  if (state.selectedModules.some(m => m.name === "WhatsApp")) {
    deliverables.push("Chatbot WhatsApp configurado e treinado");
  }
  
  if (state.selectedModules.some(m => m.name === "Banco de Dados")) {
    deliverables.push("Estrutura de banco de dados otimizada para seu negócio");
  }
  
  if (state.selectedModules.some(m => m.name === "Análise de Dados + Dashboard")) {
    deliverables.push("Dashboard personalizado com as principais métricas");
  }
  
  if (state.selectedAIFeatures.length > 0) {
    deliverables.push("Modelos de IA treinados para seus objetivos específicos");
  }
  
  if (state.selectedAITraining) {
    deliverables.push(`${state.selectedAITraining} para sua equipe`);
  }
  
  if (state.selectedSegment) {
    deliverables.push(`Solução personalizada para o segmento de ${state.selectedSegment}`);
  }
  
  deliverables.push("30 dias de suporte pós-implementação");
  deliverables.push("Garantia de satisfação e resultados");
  
  return deliverables;
};

export const generateBusinessValue = (state: CalculatorState): string[] => {
  const businessValues: string[] = [];
  
  if (state.selectedObjectives.includes("Aumentar Vendas")) {
    businessValues.push("Aumento potencial de 25-40% na conversão de leads em vendas através da automação inteligente do processo comercial.");
  }
  
  if (state.selectedObjectives.includes("Reduzir Custos")) {
    businessValues.push("Redução de até 35% em custos operacionais através da eliminação de tarefas manuais e repetitivas.");
  }
  
  if (state.selectedObjectives.includes("Melhorar Experiência")) {
    businessValues.push("Aumento médio de 30% na satisfação dos clientes com atendimento consistente e personalizado 24/7.");
  }
  
  if (state.selectedObjectives.includes("Otimizar Tempo")) {
    businessValues.push("Redução média de 60% no tempo gasto em tarefas administrativas, liberando sua equipe para atividades estratégicas.");
  }
  
  if (state.selectedObjectives.includes("Inteligência Estratégica")) {
    businessValues.push("Acesso a insights acionáveis baseados em dados para tomada de decisão mais precisa e estratégica.");
  }
  
  if (state.selectedSegment === "Varejo") {
    businessValues.push("Aumento na retenção de clientes e valor médio de ticket através de comunicação personalizada e recorrente.");
  } else if (state.selectedSegment === "Saúde") {
    businessValues.push("Otimização do agendamento e redução de no-shows em até 40% através de lembretes automatizados.");
  } else if (state.selectedSegment === "E-commerce") {
    businessValues.push("Redução de até 30% na taxa de abandono de carrinho através de recuperação automatizada.");
  }
  
  businessValues.push("ROI projetado em 3-6 meses após implementação completa da solução.");
  
  return businessValues;
};

export const generateImplementationTimeline = (state: CalculatorState): Timeline => {
  let totalDays = 0;
  const tasks: Task[] = [];

  if (state.selectedModules.length > 0) {
    tasks.push({
      phase: "Configuração de Módulos",
      days: 10,
      description: `Configuração e integração dos módulos selecionados: ${state.selectedModules.map(m => m.name).join(", ")}.`
    });
    totalDays += 10;
  }

  if (state.selectedAIFeatures.length > 0) {
    tasks.push({
      phase: "Implementação de IA",
      days: 15,
      description: `Implementação dos recursos de IA: ${state.selectedAIFeatures.join(", ")}.`
    });
    totalDays += 15;
  }

  if (state.selectedAITraining) {
    tasks.push({
      phase: "Treinamento de IA",
      days: 7,
      description: `Treinamento e ajuste do modelo de IA com ${state.selectedAITraining}.`
    });
    totalDays += 7;
  }

  tasks.push({
    phase: "Testes e Ajustes",
    days: 5,
    description: "Fase de testes e ajustes finos para garantir a qualidade da solução."
  });
  totalDays += 5;

  return {
    totalDays: totalDays,
    tasks: tasks
  };
};

export const generateCommercialProposal = (state: CalculatorState): string => {
  const totalPrice = calculateTotalPrice(state);
  const timeline = generateImplementationTimeline(state);

  let proposal = `Proposta Comercial\n\n`;
  proposal += `Cliente: ${state.clientName}\n`;
  proposal += `Empresa: ${state.companyName}\n`;
  proposal += `Telefone: ${state.clientPhone}\n\n`;
  proposal += `Descrição do Projeto: ${state.projectDescription}\n\n`;
  proposal += `Escopo:\n`;
  proposal += `- Nicho: ${state.selectedNiche} (${state.nicheUnits} unidades)\n`;
  if (state.selectedIndustryArea) {
    proposal += `- Área da Indústria: ${state.selectedIndustryArea}\n`;
  }
  proposal += `- Objetivos: ${state.selectedObjectives.join(", ")}\n`;
  proposal += `- Recursos de IA: ${state.selectedAIFeatures.join(", ")}\n`;
  if (state.selectedAITraining) {
    proposal += `- Treinamento de IA: ${state.selectedAITraining}\n`;
  }
  proposal += `- Módulos: ${state.selectedModules.map(m => m.name).join(", ")}\n\n`;
  proposal += `Cronograma de Implementação:\n`;
  timeline.tasks.forEach(task => {
    proposal += `- ${task.phase}: ${task.days} dias - ${task.description}\n`;
  });
  proposal += `\nInvestimento:\n`;
  proposal += `- Implementação: R$ ${totalPrice.implementation.toLocaleString('pt-BR')}\n`;
  proposal += `- Mensalidade: R$ ${totalPrice.monthly.toLocaleString('pt-BR')}\n\n`;
  proposal += `Observações: ${state.notes}\n`;

  return proposal;
};

export const getSubNichesBySegment = (segment: Segment): { name: SubNiche; basePrice: number; departments: Department[] }[] => {
  const segmentData = segmentsData.find(s => s.name === segment);
  return segmentData ? segmentData.subNiches : [];
};

export const getDepartmentsBySubNiche = (segment: Segment, subNiche: SubNiche): Department[] => {
  const segmentData = segmentsData.find(s => s.name === segment);
  const subNicheData = segmentData?.subNiches.find(sn => sn.name === subNiche);
  return subNicheData ? subNicheData.departments : [];
};

export const getAvailableModules = (department: Department): string[] => {
  const availableModules = modulesData
    .filter(module => module.departmentAvailability[department])
    .map(module => module.name);
  return availableModules;
};
