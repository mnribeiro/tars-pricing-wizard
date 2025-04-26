
import { CalculatorState } from "@/types/calculator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface ClientInfoFormProps {
  state: CalculatorState;
  updateField: (field: keyof CalculatorState, value: any) => void;
  className?: string;
}

const ClientInfoForm = ({ state, updateField, className }: ClientInfoFormProps) => {
  return (
    <div className={className}>
      <h2 className="text-xl font-semibold mb-4">Informações do Cliente</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="clientName">Nome do Cliente</Label>
          <Input
            id="clientName"
            value={state.clientName}
            onChange={(e) => updateField("clientName", e.target.value)}
            placeholder="Nome completo"
            className="bg-card border-border mt-2"
          />
        </div>
        
        <div>
          <Label htmlFor="companyName">Nome da Empresa</Label>
          <Input
            id="companyName"
            value={state.companyName}
            onChange={(e) => updateField("companyName", e.target.value)}
            placeholder="Empresa"
            className="bg-card border-border mt-2"
          />
        </div>
        
        <div>
          <Label htmlFor="clientPhone">Telefone</Label>
          <Input
            id="clientPhone"
            value={state.clientPhone}
            onChange={(e) => updateField("clientPhone", e.target.value)}
            placeholder="(00) 00000-0000"
            className="bg-card border-border mt-2"
          />
        </div>
        
        <div>
          <Label htmlFor="projectDescription">Descrição do Projeto</Label>
          <Textarea
            id="projectDescription"
            value={state.projectDescription}
            onChange={(e) => updateField("projectDescription", e.target.value)}
            placeholder="Descreva brevemente o projeto..."
            rows={3}
            className="bg-card border-border mt-2"
          />
        </div>
      </div>
    </div>
  );
};

export default ClientInfoForm;
