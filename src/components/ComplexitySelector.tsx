
import { cn } from "@/lib/utils";

interface ComplexitySelectorProps {
  selected: "easy" | "normal" | "complex" | null;
  onChange: (complexity: "easy" | "normal" | "complex") => void;
  className?: string;
  prices?: {
    easy: number;
    normal: number;
    complex: number;
  };
}

const ComplexitySelector = ({
  selected,
  onChange,
  className,
  prices
}: ComplexitySelectorProps) => {
  return (
    <div className={cn("flex flex-wrap justify-center gap-2 mt-2 animate-fade-in", className)}>
      <button
        className={cn(
          "complexity-btn flex flex-col items-center p-2 border rounded-md transition-all",
          selected === "easy" 
            ? "border-tars-highlight bg-tars-highlight bg-opacity-10 text-tars-highlight" 
            : "border-border hover:border-tars-highlight/50"
        )}
        onClick={() => onChange("easy")}
      >
        <span className="font-medium">Fácil</span>
        {prices && (
          <span className="text-xs mt-1 font-semibold">
            R$ {prices.easy.toLocaleString('pt-BR')}
          </span>
        )}
      </button>
      
      <button
        className={cn(
          "complexity-btn flex flex-col items-center p-2 border rounded-md transition-all",
          selected === "normal" 
            ? "border-tars-highlight bg-tars-highlight bg-opacity-10 text-tars-highlight" 
            : "border-border hover:border-tars-highlight/50"
        )}
        onClick={() => onChange("normal")}
      >
        <span className="font-medium">Intermediário</span>
        {prices && (
          <span className="text-xs mt-1 font-semibold">
            R$ {prices.normal.toLocaleString('pt-BR')}
          </span>
        )}
        {prices && (
          <span className="text-xs text-gray-400">
            (2x o valor Fácil)
          </span>
        )}
      </button>
      
      <button
        className={cn(
          "complexity-btn flex flex-col items-center p-2 border rounded-md transition-all",
          selected === "complex" 
            ? "border-tars-highlight bg-tars-highlight bg-opacity-10 text-tars-highlight" 
            : "border-border hover:border-tars-highlight/50"
        )}
        onClick={() => onChange("complex")}
      >
        <span className="font-medium">Avançado</span>
        {prices && (
          <span className="text-xs mt-1 font-semibold">
            R$ {prices.complex.toLocaleString('pt-BR')}
          </span>
        )}
        {prices && (
          <span className="text-xs text-gray-400">
            (2x o valor Intermediário)
          </span>
        )}
      </button>
    </div>
  );
};

export default ComplexitySelector;
