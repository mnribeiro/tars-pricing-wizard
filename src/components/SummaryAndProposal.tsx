import { CalculatorState, Module, ModuleData, calculateTotalPrice, generateImplementationTimeline, modulesData, generateModuleScope, generateDeliverables, generateBusinessValue } from "@/types/calculator";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Check, Download, FileText, Calendar, Package, TrendingUp } from "lucide-react";
import { useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { toast } from "@/components/ui/use-toast"
import { saveProposal } from "@/lib/saveProposal";

interface SummaryAndProposalProps {
  state: CalculatorState;
  updateField: (field: keyof CalculatorState, value: any) => void;
  className?: string;
}

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

const SummaryAndProposal = ({ state, updateField, className }: SummaryAndProposalProps) => {
  const [showDiscount, setShowDiscount] = useState(false);
  const [showProposal, setShowProposal] = useState(false);
  
  const totalPrice = calculateTotalPrice(state);
  const timeline = generateImplementationTimeline(state);
  const scopeDetails = generateModuleScope(state);
  const deliverables = generateDeliverables(state);
  const businessValues = generateBusinessValue(state);
  
  // Get module data with pricing information
  const getModuleWithPricing = (module: Module): { name: string; level: string; price: number } => {
    const moduleData = modulesData.find(m => m.name === module.name);
    const levelLabel = module.level === "I" ? "Iniciante" : module.level === "M" ? "Intermediário" : "Avançado";
    
    return {
      name: module.name,
      level: levelLabel,
      price: moduleData ? moduleData.prices[module.level!] : 0
    };
  };
  
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  
  const handleSaveProposal = async () => {
    setIsSaving(true);
    setSaveError(null);
    
    const result = await saveProposal(state);
    
    if (result.success) {
      toast({
        title: "Proposta salva com sucesso!",
        description: "A proposta foi armazenada em nosso banco de dados.",
      });
    } else {
      setSaveError(result.error || 'Erro ao salvar a proposta');
      toast({
        title: "Erro ao salvar a proposta",
        description: result.error,
        variant: "destructive",
      });
    }
    
    setIsSaving(false);
  };

  // Generate PDF proposal
  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Add TARS logo as header
    // doc.addImage(tarsLogo, 'PNG', 10, 10, 40, 20);
    
    // Title
    doc.setFontSize(20);
    doc.text("Proposta Comercial - TARS AI", 105, 20, { align: "center" });
    
    // Client Information
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Informações do Cliente", 14, 40);
    doc.setFont("helvetica", "normal");
    doc.text(`Cliente: ${state.clientName}`, 14, 50);
    doc.text(`Empresa: ${state.companyName}`, 14, 56);
    doc.text(`Telefone: ${state.clientPhone}`, 14, 62);
    
    // Project Information
    doc.setFont("helvetica", "bold");
    doc.text("Informações do Projeto", 14, 72);
    doc.setFont("helvetica", "normal");
    doc.text(`Segmento: ${state.selectedSegment}`, 14, 82);
    doc.text(`Subnicho: ${state.selectedSubNiche}`, 14, 88);
    doc.text(`Departamento: ${state.selectedDepartment}`, 14, 94);
    doc.text("Descrição:", 14, 100);
    
    // Project description with word wrapping
    const splitDescription = doc.splitTextToSize(state.projectDescription, 180);
    doc.text(splitDescription, 14, 106);
    
    // Module scope details
    let yPos = 106 + splitDescription.length * 6;
    doc.setFont("helvetica", "bold");
    doc.text("Detalhamento do Escopo", 14, yPos);
    yPos += 10;
    
    const scopeData = scopeDetails.map(item => [
      item.module,
      item.level,
      item.description
    ]);
    
    doc.autoTable({
      startY: yPos,
      head: [["Módulo", "Nível", "Funcionalidades"]],
      body: scopeData,
      theme: "striped",
      headStyles: { fillColor: [212, 175, 55] }
    });
    
    yPos = (doc as any).lastAutoTable.finalY + 10;
    
    // Implementation Timeline
    doc.setFont("helvetica", "bold");
    doc.text("Cronograma de Implementação (30 dias)", 14, yPos);
    yPos += 10;
    
    const timelineData = timeline.tasks.map(task => [
      task.phase,
      `${task.days} dias`,
      task.description
    ]);
    
    doc.autoTable({
      startY: yPos,
      head: [["Fase", "Duração", "Descrição"]],
      body: timelineData,
      theme: "striped",
      headStyles: { fillColor: [212, 175, 55] }
    });
    
    yPos = (doc as any).lastAutoTable.finalY + 10;
    
    // Project Deliverables
    doc.setFont("helvetica", "bold");
    doc.text("Entregas do Projeto", 14, yPos);
    yPos += 10;
    
    const deliverablesChunks = [];
    for (let i = 0; i < deliverables.length; i += 2) {
      deliverablesChunks.push(deliverables.slice(i, i + 2));
    }
    
    const deliverablesData = deliverablesChunks.map(chunk => {
      return chunk.length === 2 ? chunk : [...chunk, ""];
    });
    
    doc.autoTable({
      startY: yPos,
      body: deliverablesData,
      theme: "plain"
    });
    
    yPos = (doc as any).lastAutoTable.finalY + 10;
    
    // Business Value
    doc.setFont("helvetica", "bold");
    doc.text("Valor de Negócio", 14, yPos);
    yPos += 10;
    
    const businessValueChunks = [];
    for (let i = 0; i < businessValues.length; i += 1) {
      businessValueChunks.push([businessValues[i]]);
    }
    
    doc.autoTable({
      startY: yPos,
      body: businessValueChunks,
      theme: "plain"
    });
    
    yPos = (doc as any).lastAutoTable.finalY + 10;
    
    // Selected Modules
    doc.setFont("helvetica", "bold");
    doc.text("Módulos Selecionados", 14, yPos);
    yPos += 10;
    
    const moduleData = state.selectedModules.map(module => {
      const pricing = getModuleWithPricing(module);
      return [
        pricing.name,
        pricing.level,
        `R$ ${pricing.price.toLocaleString('pt-BR')}`
      ];
    });
    
    doc.autoTable({
      startY: yPos,
      head: [["Módulo", "Nível", "Valor"]],
      body: moduleData,
      theme: "striped",
      headStyles: { fillColor: [212, 175, 55] }
    });
    
    yPos = (doc as any).lastAutoTable.finalY + 10;
    
    // Investment Information
    doc.setFont("helvetica", "bold");
    doc.text("Investimento", 14, yPos);
    yPos += 10;
    
    const investmentData = [];
    
    investmentData.push(["Implementação", `R$ ${totalPrice.implementation.toLocaleString('pt-BR')}`]);
    
    if (state.discount > 0) {
      investmentData.push(
        ["Valor Original", `R$ ${totalPrice.originalImplementation.toLocaleString('pt-BR')}`],
        [`Desconto (${state.discount}%)`, `R$ ${totalPrice.discountAmount.toLocaleString('pt-BR')}`]
      );
    }
    
    investmentData.push(["Mensalidade (Recorrência)", `R$ ${totalPrice.monthly.toLocaleString('pt-BR')}`]);
    
    doc.autoTable({
      startY: yPos,
      head: [["Tipo", "Valor"]],
      body: investmentData,
      theme: "striped",
      headStyles: { fillColor: [212, 175, 55] }
    });
    
    yPos = (doc as any).lastAutoTable.finalY + 10;
    
    // Conditions 
    doc.setFont("helvetica", "bold");
    doc.text("Condições Comerciais", 14, yPos);
    yPos += 10;
    
    doc.setFont("helvetica", "normal");
    doc.text("- Prazo de implementação: 30 dias corridos", 14, yPos);
    yPos += 6;
    doc.text("- Forma de pagamento da implementação: 40% de entrada + 60% na entrega", 14, yPos);
    yPos += 6;
    doc.text("- Mensalidade: Cobrada mensalmente após a conclusão da implementação", 14, yPos);
    yPos += 15;
    
    // Notes
    if (state.notes) {
      doc.setFont("helvetica", "bold");
      doc.text("Observações", 14, yPos);
      yPos += 10;
      
      const splitNotes = doc.splitTextToSize(state.notes, 180);
      doc.setFont("helvetica", "normal");
      doc.text(splitNotes, 14, yPos);
    }
    
    // Footer
    doc.setFont("helvetica", "italic");
    doc.text("TARS AI - Soluções Inteligentes para Automação de Processos", 105, 280, { align: "center" });
    
    // Save PDF
    doc.save(`Proposta-TARS-${state.companyName}.pdf`);
  };

  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Resumo e Proposta</h2>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowDiscount(!showDiscount)}
            className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10"
          >
            {showDiscount ? "Ocultar Desconto" : "Adicionar Desconto"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowProposal(!showProposal)}
            className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10"
          >
            {showProposal ? "Ver Resumo" : "Ver Proposta"}
          </Button>
        </div>
      </div>

      {!showProposal ? (
        <div className="space-y-6 animate-fade-in">
          {/* Client and Project Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Informações do Cliente</h3>
              <div className="space-y-1">
                <p><span className="font-medium">Cliente:</span> {state.clientName}</p>
                <p><span className="font-medium">Empresa:</span> {state.companyName}</p>
                <p><span className="font-medium">Telefone:</span> {state.clientPhone}</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Informações do Projeto</h3>
              <div className="space-y-1">
                <p><span className="font-medium">Segmento:</span> {state.selectedSegment}</p>
                <p><span className="font-medium">Subnicho:</span> {state.selectedSubNiche}</p>
                <p><span className="font-medium">Departamento:</span> {state.selectedDepartment}</p>
              </div>
            </div>
          </div>
          
          {/* Selected Modules */}
          <div>
            <h3 className="text-lg font-medium mb-3">Módulos Selecionados</h3>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-[#D4AF37]/20">
                  <tr>
                    <th className="text-left p-3">Módulo</th>
                    <th className="text-left p-3">Nível</th>
                    <th className="text-right p-3">Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {state.selectedModules.map((module) => {
                    const pricing = getModuleWithPricing(module);
                    return (
                      <tr key={module.name} className="border-t border-border">
                        <td className="p-3">{module.name}</td>
                        <td className="p-3">{pricing.level}</td>
                        <td className="p-3 text-right">R$ {pricing.price.toLocaleString('pt-BR')}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Module Scope */}
          <div>
            <h3 className="text-lg font-medium mb-3">Detalhamento do Escopo</h3>
            <div className="space-y-4">
              {scopeDetails.map((item, index) => (
                <div key={index} className="p-4 border border-gray-700 rounded-lg">
                  <div className="flex justify-between">
                    <h4 className="font-medium">{item.module}</h4>
                    <span className="text-sm bg-[#D4AF37]/20 px-2 py-1 rounded">
                      {item.level}
                    </span>
                  </div>
                  <p className="mt-2 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Timeline */}
          <div>
            <h3 className="text-lg font-medium mb-3 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-[#D4AF37]" />
              Cronograma de Implementação (30 dias)
            </h3>
            <div className="space-y-3">
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
          
          {/* Project Deliverables */}
          <div>
            <h3 className="text-lg font-medium mb-3 flex items-center">
              <Package className="w-5 h-5 mr-2 text-[#D4AF37]" />
              Entregas do Projeto
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {deliverables.map((item, index) => (
                <div key={index} className="flex items-center">
                  <Check className="w-4 h-4 text-[#D4AF37] mr-2" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Business Value */}
          <div>
            <h3 className="text-lg font-medium mb-3 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-[#D4AF37]" />
              Valor de Negócio
            </h3>
            <div className="space-y-2">
              {businessValues.map((value, index) => (
                <div key={index} className="bg-[#D4AF37]/5 p-3 rounded-lg">
                  {value}
                </div>
              ))}
            </div>
          </div>
          
          {/* Discount */}
          {showDiscount && (
            <div className="p-4 border border-[#D4AF37] rounded-lg bg-[#D4AF37]/10 animate-fade-in">
              <Label htmlFor="discount">Desconto (%) - Aplicado apenas na implementação</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  id="discount"
                  type="number"
                  min="0"
                  max="100"
                  value={state.discount}
                  onChange={(e) => updateField("discount", Number(e.target.value))}
                  className="bg-card border-border max-w-[100px]"
                />
                <p className="flex items-center">
                  {state.discount > 0 && `Economia de R$ ${totalPrice.discountAmount.toLocaleString('pt-BR')}`}
                </p>
              </div>
            </div>
          )}
          
          {/* Notes */}
          <div>
            <Label htmlFor="notes">Observações</Label>
            <Textarea
              id="notes"
              value={state.notes}
              onChange={(e) => updateField("notes", e.target.value)}
              placeholder="Adicione observações ou condições especiais..."
              className="bg-card border-border mt-2"
              rows={3}
            />
          </div>
          
          {/* Total Investment */}
          <div className="border-t border-gray-700 pt-4 mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-lg">Implementação:</span>
              <span className="text-xl font-bold text-[#D4AF37]">
                R$ {totalPrice.implementation.toLocaleString('pt-BR')}
              </span>
            </div>
            
            {state.discount > 0 && (
              <div className="flex justify-between items-center text-sm mb-2">
                <span className="font-medium">Valor Original:</span>
                <span className="text-gray-300 line-through">
                  R$ {totalPrice.originalImplementation.toLocaleString('pt-BR')}
                </span>
              </div>
            )}
            
            <div className="flex justify-between items-center">
              <span className="font-medium text-lg">Mensalidade (20%):</span>
              <span className="text-xl font-bold text-[#D4AF37]">
                R$ {totalPrice.monthly.toLocaleString('pt-BR')}
              </span>
            </div>
            
            <div className="text-xs text-gray-400 mt-1">
              * A mensalidade é calculada como 20% do valor original de implementação, sem aplicação de descontos.
            </div>
          </div>
          
          {/* Generate PDF and Save buttons */}
          <div className="flex justify-center gap-4 mt-4">
            <Button 
              onClick={generatePDF}
              className="bg-[#D4AF37] hover:bg-[#B39020] text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Gerar PDF
            </Button>
            
            <Button 
              onClick={handleSaveProposal}
              disabled={isSaving}
              className="bg-[#D4AF37] hover:bg-[#B39020] text-white"
            >
              {isSaving ? (
                <>Salvando...</>
              ) : (
                <>
                  <save className="w-4 h-4 mr-2" />
                  Salvar Proposta
                </>
              )}
            </Button>
          </div>
          
          {saveError && (
            <p className="text-red-500 text-sm mt-2 text-center">{saveError}</p>
          )}
        </div>
      ) : (
        // Proposal View
        <div className="border rounded-lg p-6 bg-card space-y-6 animate-fade-in">
          <div className="flex justify-center mb-4">
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/4f1d932f-59a0-44cd-aceb-0b10faf8f429.png" 
                alt="TARS AI" 
                className="h-12 mr-2"
              />
              <h2 className="text-2xl font-bold">Proposta Comercial</h2>
            </div>
          </div>
          
          <div>
            <p className="mb-4">Prezado(a) {state.clientName},</p>
            <p className="mb-6">Agradecemos a oportunidade de apresentar nossa proposta para o desenvolvimento de uma solução de automação inteligente para a sua empresa, {state.companyName}.</p>
          </div>
          
          <div>
            <h3 className="text-xl font-medium border-b border-[#D4AF37] pb-2 mb-3">Escopo do Projeto</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p><span className="font-medium">Cliente:</span> {state.clientName}</p>
                <p><span className="font-medium">Empresa:</span> {state.companyName}</p>
                <p><span className="font-medium">Telefone:</span> {state.clientPhone}</p>
              </div>
              <div>
                <p><span className="font-medium">Segmento:</span> {state.selectedSegment}</p>
                <p><span className="font-medium">Subnicho:</span> {state.selectedSubNiche}</p>
                <p><span className="font-medium">Departamento:</span> {state.selectedDepartment}</p>
              </div>
            </div>
            <p className="mt-3"><span className="font-medium">Descrição:</span> {state.projectDescription}</p>
          </div>
          
          <div>
            <h3 className="text-xl font-medium border-b border-[#D4AF37] pb-2 mb-3">Detalhamento do Escopo</h3>
            <div className="space-y-4">
              {scopeDetails.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="font-bold w-8 h-8 rounded-full bg-[#D4AF37] text-white flex items-center justify-center">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{item.module} - {item.level}</p>
                    <p className="text-sm text-gray-300">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-medium border-b border-[#D4AF37] pb-2 mb-3">Cronograma de Implementação (30 dias)</h3>
            <div className="space-y-4">
              {timeline.tasks.map((task, index) => (
                <div key={index} className="flex gap-4">
                  <div className="font-bold w-8 h-8 rounded-full bg-[#D4AF37] text-white flex items-center justify-center">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{task.phase}</p>
                    <p className="text-sm text-gray-300">{task.days} dias - {task.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-medium border-b border-[#D4AF37] pb-2 mb-3">Entregas do Projeto</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {deliverables.map((item, index) => (
                <div key={index} className="flex items-center">
                  <Check className="w-4 h-4 text-[#D4AF37] mr-2" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-medium border-b border-[#D4AF37] pb-2 mb-3">Valor de Negócio</h3>
            <div className="space-y-2">
              {businessValues.map((value, index) => (
                <div key={index} className="flex items-start">
                  <TrendingUp className="w-4 h-4 text-[#D4AF37] mr-2 mt-1" />
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-medium border-b border-[#D4AF37] pb-2 mb-3">Módulos Selecionados</h3>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-[#D4AF37]/20">
                  <tr>
                    <th className="text-left p-3">Módulo</th>
                    <th className="text-left p-3">Nível</th>
                    <th className="text-right p-3">Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {state.selectedModules.map((module) => {
                    const pricing = getModuleWithPricing(module);
                    return (
                      <tr key={module.name} className="border-t border-border">
                        <td className="p-3">{module.name}</td>
                        <td className="p-3">{pricing.level}</td>
                        <td className="p-3 text-right">R$ {pricing.price.toLocaleString('pt-BR')}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-medium border-b border-[#D4AF37] pb-2 mb-3">Investimento</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Implementação:</span>
                <span className="font-bold">R$ {totalPrice.implementation.toLocaleString('pt-BR')}</span>
              </div>
              
              {state.discount > 0 && (
                <>
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Valor Original:</span>
                    <span className="line-through">R$ {totalPrice.originalImplementation.toLocaleString('pt-BR')}</span>
                  </div>
                  <div className="flex justify-between text-sm text-[#D4AF37]">
                    <span>Desconto ({state.discount}%):</span>
                    <span>- R$ {totalPrice.discountAmount.toLocaleString('pt-BR')}</span>
                  </div>
                </>
              )}
              
              <div className="flex justify-between">
                <span className="font-medium">Mensalidade (20%):</span>
                <span className="font-bold">R$ {totalPrice.monthly.toLocaleString('pt-BR')}</span>
              </div>
              
              <div className="text-xs text-gray-400 mt-1">
                * A mensalidade é calculada como 20% do valor original de implementação, sem aplicação de descontos.
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-medium border-b border-[#D4AF37] pb-2 mb-3">Condições Comerciais</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Prazo de implementação: 30 dias corridos</li>
              <li>Forma de pagamento da implementação: 40% de entrada + 60% na entrega</li>
              <li>Mensalidade: Cobrada mensalmente após a conclusão da implementação</li>
            </ul>
          </div>
          
          {state.notes && (
            <div>
              <h3 className="text-xl font-medium border-b border-[#D4AF37] pb-2 mb-3">Observações</h3>
              <p>{state.notes}</p>
            </div>
          )}
          
          <div>
            <p className="mb-4">Aguardamos ansiosamente a sua aprovação para darmos início a este projeto inovador.</p>
            <p>Atenciosamente,<br />Equipe TARS AI</p>
          </div>
          
          <div className="flex justify-center mt-4">
            <Button 
              onClick={generatePDF}
              className="bg-[#D4AF37] hover:bg-[#B39020] text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SummaryAndProposal;
