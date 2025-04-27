
export type BusinessNiche =
  | "Saúde"
  | "Varejo"
  | "E-commerce"
  | "Franquias"
  | "Indústria"
  | "Serviços";

export type IndustryArea =
  | "Logística"
  | "Produção"
  | "Inteligência de Negócios"
  | "Envio de Relatórios";

export type AutomationObjective =
  | "Aumentar Vendas"
  | "Reduzir Custos"
  | "Melhorar Experiência"
  | "Otimizar Tempo"
  | "Inteligência Estratégica";

export type AILevel = "IA Simples" | "IA Intermediária" | "IA Complexa";

export type AIFeature =
  | "Chatbots Inteligentes"
  | "Análise Preditiva"
  | "Processamento de Linguagem Natural"
  | "Reconhecimento de Imagens"
  | "Automação de Processos Robóticos";

export type AITraining = "Treinamento Básico" | "Treinamento Avançado" | "Consultoria Personalizada";

export type AITool =
  | "Google AI Platform"
  | "Amazon SageMaker"
  | "Microsoft Azure AI"
  | "IBM Watson";

export type ModuleLevel = "I" | "M" | "A";
export type ComplexityLevel = "easy" | "normal" | "complex";

export type ModuleName =
  | "WhatsApp"
  | "Disparador de Mensagens / Captação"
  | "Banco de Dados"
  | "IA Avançada & Prompt Studio"
  | "Integração ERP"
  | "Integração CRM"
  | "RAG / Base de Conhecimento"
  | "Google Drive Connector"
  | "Análise de Dados + Dashboard"
  | "Lembretes & Automação Follow-up";

export type Segment = 
  | "Saúde"
  | "Construção Civil"
  | "E-commerce"
  | "Indústria"
  | "Serviços"
  | "Varejo";

export type SubNiche = string;
export type Department = string;

// Estes são os elementos que faltam do arquivo original e estavam causando erros
export const businessNiches = [
  { name: "Saúde" as BusinessNiche, basePrice: 2500 },
  { name: "Varejo" as BusinessNiche, basePrice: 3000 },
  { name: "E-commerce" as BusinessNiche, basePrice: 3500 },
  { name: "Franquias" as BusinessNiche, basePrice: 4000 },
  { name: "Indústria" as BusinessNiche, basePrice: 5000 },
  { name: "Serviços" as BusinessNiche, basePrice: 2800 }
];

export const segmentData = [
  { id: "saude", name: "Saúde" as Segment, icon: "HeartPulse" },
  { id: "construcao", name: "Construção Civil" as Segment, icon: "Building" },
  { id: "ecommerce", name: "E-commerce" as Segment, icon: "ShoppingCart" },
  { id: "industria", name: "Indústria" as Segment, icon: "Factory" },
  { id: "servicos", name: "Serviços" as Segment, icon: "Settings" },
  { id: "varejo", name: "Varejo" as Segment, icon: "Store" },
];
