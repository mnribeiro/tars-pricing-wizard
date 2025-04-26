
import { CalculatorState, Module, ModuleData, calculateTotalPrice, generateImplementationTimeline, modulesData } from "@/types/calculator";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Check, Download, FileText } from "lucide-react";
import { useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

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
    
    // Implementation Timeline
    let yPos = 106 + splitDescription.length * 6;
    doc.setFont("helvetica", "bold");
    doc.text("Cronograma de Implementação", 14, yPos);
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
    
    doc.autoTable({
      startY: yPos,
      head: [["Tipo", "Valor"]],
      body: [
        ["Implementação", `R$ ${totalPrice.implementation.toLocaleString('pt-BR')}`],
        ["Mensalidade (Recorrência)", `R$ ${totalPrice.monthly.toLocaleString('pt-BR')}`]
      ],
      theme: "striped",
      headStyles: { fillColor: [212, 175, 55] }
    });
    
    yPos = (doc as any).lastAutoTable.finalY + 10;
    
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
          
          {/* Discount */}
          {showDiscount && (
            <div className="p-4 border border-[#D4AF37] rounded-lg bg-[#D4AF37]/10 animate-fade-in">
              <Label htmlFor="discount">Desconto (%)</Label>
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
                  {state.discount > 0 && `Economia de R$ ${(calculateTotalPrice({...state, discount: 0}).implementation * state.discount / 100).toLocaleString('pt-BR')}`}
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
            <div className="flex justify-between items-center">
              <span className="font-medium text-lg">Mensalidade (20%):</span>
              <span className="text-xl font-bold text-[#D4AF37]">
                R$ {totalPrice.monthly.toLocaleString('pt-BR')}
              </span>
            </div>
          </div>
          
          {/* Generate PDF */}
          <div className="flex justify-center mt-4">
            <Button 
              onClick={generatePDF}
              className="bg-[#D4AF37] hover:bg-[#B39020] text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Gerar PDF
            </Button>
          </div>
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
            <h3 className="text-xl font-medium border-b border-[#D4AF37] pb-2 mb-3">Cronograma de Implementação</h3>
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
              <div className="flex justify-between">
                <span className="font-medium">Mensalidade (20%):</span>
                <span className="font-bold">R$ {totalPrice.monthly.toLocaleString('pt-BR')}</span>
              </div>
            </div>
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
