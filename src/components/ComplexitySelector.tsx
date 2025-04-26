
import { ComplexityLevel, complexityLevels } from "@/types/calculator";
import { cn } from "@/lib/utils";

interface ComplexitySelectorProps {
  selected: ComplexityLevel | null;
  onChange: (complexity: ComplexityLevel) => void;
  className?: string;
  prices: {
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
    <div className={cn("flex flex-col gap-2 animate-fade-in", className)}>
      {Object.entries(complexityLevels).map(([level, label]) => (
        <button
          key={level}
          onClick={() => onChange(level as ComplexityLevel)}
          className={cn(
            "complexity-btn px-3 py-2 rounded-md text-sm font-medium border-2 transition-all duration-200",
            selected === level
              ? "border-[#D4AF37] bg-[#D4AF37]/10"
              : "border-border hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/10"
          )}
        >
          <div className="flex flex-col items-center gap-1">
            <span>{label}</span>
            {prices && (
              <span className="text-xs font-normal">
                R$ {prices[level as ComplexityLevel].toLocaleString('pt-BR')}
              </span>
            )}
          </div>
        </button>
      ))}
    </div>
  );
};

export default ComplexitySelector;
