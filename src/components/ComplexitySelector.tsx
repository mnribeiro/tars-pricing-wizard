
import { cn } from "@/lib/utils";

interface ComplexitySelectorProps {
  selected: "easy" | "normal" | "complex" | null;
  onChange: (complexity: "easy" | "normal" | "complex") => void;
  className?: string;
}

const ComplexitySelector = ({
  selected,
  onChange,
  className
}: ComplexitySelectorProps) => {
  return (
    <div className={cn("flex justify-center gap-2 mt-2 animate-fade-in", className)}>
      <button
        className={cn(
          "complexity-btn",
          selected === "easy" && "selected"
        )}
        onClick={() => onChange("easy")}
      >
        Fácil
      </button>
      <button
        className={cn(
          "complexity-btn",
          selected === "normal" && "selected"
        )}
        onClick={() => onChange("normal")}
      >
        Normal
      </button>
      <button
        className={cn(
          "complexity-btn",
          selected === "complex" && "selected"
        )}
        onClick={() => onChange("complex")}
      >
        Complexo
      </button>
    </div>
  );
};

export default ComplexitySelector;
