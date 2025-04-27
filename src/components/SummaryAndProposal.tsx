
import React, { useState, useRef } from 'react';
import { calculateTotalPrice, generateModuleScope, generateDeliverables, generateBusinessValue, generateImplementationTimeline } from "@/types/calculator";
import { Button } from "@/components/ui/button";
import { Loader2, Save, FileText } from "lucide-react";
import { useReactToPrint } from 'react-to-print';
import { toast } from "@/components/ui/use-toast";
import { saveProposal } from "@/lib/saveProposal";

const SummaryAndProposal = ({ state, updateField, className }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isPdfGenerating, setIsPdfGenerating] = useState(false);
  
  const totalPrice = calculateTotalPrice(state);
  const moduleScope = generateModuleScope(state);
  const deliverables = generateDeliverables(state);
  const businessValue = generateBusinessValue(state);
  const timeline = generateImplementationTimeline(state);
  
  const componentRef = useRef(null);

  const handleGeneratePdf = useReactToPrint({
    documentTitle: 'Proposta Comercial',
    onBeforeGetContent: () => {
      setIsPdfGenerating(true);
      return Promise.resolve();
    },
    onAfterPrint: () => {
      setIsPdfGenerating(false);
    },
    content: () => componentRef.current,
  });

  const handleSaveProposal = async () => {
    setIsSaving(true);
    try {
      const result = await saveProposal(state);
      if (result.success) {
        toast({
          title: "Proposta salva com sucesso!",
          description: "Os dados foram armazenados no banco de dados."
        });
      } else {
        toast({
          title: "Erro ao salvar proposta",
          description: result.error || "Ocorreu um erro ao salvar a proposta.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Erro ao salvar proposta",
        description: "Ocorreu um erro inesperado ao salvar a proposta.",
        variant: "destructive"
      });
      console.error("Erro ao salvar proposta:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const renderModuleScope = () => (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2">Escopo dos Módulos:</h3>
      <ul>
        {moduleScope.map((item, index) => (
          <li key={index} className="mb-2">
            <span className="font-semibold">{item.module}:</span> {item.level} - {item.description}
          </li>
        ))}
      </ul>
    </div>
  );

  const renderDeliverables = () => (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2">Entregáveis:</h3>
      <ul>
        {deliverables.map((item, index) => (
          <li key={index} className="mb-1">{item}</li>
        ))}
      </ul>
    </div>
  );

  const renderBusinessValue = () => (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2">Valor para o Negócio:</h3>
      <ul>
        {businessValue.map((item, index) => (
          <li key={index} className="mb-1">{item}</li>
        ))}
      </ul>
    </div>
  );

  const renderImplementationTimeline = () => (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2">Cronograma de Implementação:</h3>
      <ul>
        {timeline.tasks.map((task, index) => (
          <li key={index} className="mb-2">
            <span className="font-semibold">{task.phase}:</span> {task.days} dias - {task.description}
          </li>
        ))}
        <li className="mt-2">
          <span className="font-semibold">Total:</span> {timeline.totalDays} dias
        </li>
      </ul>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Resumo da Proposta</h2>
        <p className="text-muted-foreground">Confira os detalhes da proposta antes de salvar ou gerar o PDF.</p>
      </div>

      {/* Proposal Content */}
      <div className="border rounded-md p-4" ref={componentRef}>
        <h2 className="text-xl font-semibold mb-4">Informações do Cliente</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="font-semibold">Nome do Cliente:</span> {state.clientName}
          </div>
          <div>
            <span className="font-semibold">Nome da Empresa:</span> {state.companyName}
          </div>
          <div>
            <span className="font-semibold">Telefone:</span> {state.clientPhone}
          </div>
        </div>

        <h2 className="text-xl font-semibold mt-4 mb-4">Detalhes do Projeto</h2>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <span className="font-semibold">Descrição do Projeto:</span> {state.projectDescription}
          </div>
          <div>
            <span className="font-semibold">Ideia Inicial:</span> {state.initialIdea}
          </div>
        </div>

        <h2 className="text-xl font-semibold mt-4 mb-4">Configuração</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <span className="font-semibold">Segmento:</span> {state.selectedSegment}
          </div>
          <div>
            <span className="font-semibold">Subnicho:</span> {state.selectedSubNiche}
          </div>
          <div>
            <span className="font-semibold">Departamento:</span> {state.selectedDepartment}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <span className="font-semibold">Unidades do Nicho:</span> {state.nicheUnits}
          </div>
          <div>
            <span className="font-semibold">Área da Indústria:</span> {state.selectedIndustryArea}
          </div>
          <div>
            <span className="font-semibold">Números WhatsApp:</span> {state.whatsappNumbers}
          </div>
        </div>

        <h2 className="text-xl font-semibold mt-4 mb-4">Inteligência Artificial</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <span className="font-semibold">Nível de IA:</span> {state.selectedAILevel}
          </div>
          <div>
            <span className="font-semibold">Recursos de IA:</span> {state.selectedAIFeatures.join(", ")}
          </div>
          <div>
            <span className="font-semibold">Treinamento de IA:</span> {state.selectedAITraining}
          </div>
        </div>

        <h2 className="text-xl font-semibold mt-4 mb-4">Módulos Selecionados</h2>
        <ul>
          {state.selectedModules.map((module) => (
            <li key={module.name}>
              {module.name} ({module.complexity})
            </li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold mt-4 mb-4">Valores</h2>
        <div>
          <span className="font-semibold">Implementação:</span> R$ {totalPrice.implementation.toLocaleString('pt-BR')}
        </div>
        <div>
          <span className="font-semibold">Mensalidade:</span> R$ {totalPrice.monthly.toLocaleString('pt-BR')}
        </div>
        <div>
          <span className="font-semibold">Desconto:</span> {state.discount}%
        </div>
        <div>
          <span className="font-semibold">Observações:</span> {state.notes}
        </div>

        {renderModuleScope()}
        {renderDeliverables()}
        {renderBusinessValue()}
        {renderImplementationTimeline()}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-4">
        <Button
          onClick={handleSaveProposal}
          disabled={isSaving}
          className="bg-[#D4AF37] hover:bg-[#C4A027] text-white"
        >
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Salvando...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Salvar Proposta
            </>
          )}
        </Button>

        <Button
          onClick={() => handleGeneratePdf()}
          disabled={isPdfGenerating}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          {isPdfGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Gerando PDF...
            </>
          ) : (
            <>
              <FileText className="mr-2 h-4 w-4" />
              Gerar Proposta em PDF
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default SummaryAndProposal;
