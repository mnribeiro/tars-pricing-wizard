
import { cn } from "@/lib/utils";
import { Segment, SubNiche, SubNicheData, getSubNichesBySegment } from "@/types/calculator";
import { useState } from "react";

interface SubNicheSelectorProps {
  selectedSegment: Segment;
  selectedSubNiche: SubNiche | null;
  onSelect: (subNiche: SubNiche) => void;
  className?: string;
}

const SubNicheSelector = ({
  selectedSegment,
  selectedSubNiche,
  onSelect,
  className
}: SubNicheSelectorProps) => {
  const [hoveredSubNiche, setHoveredSubNiche] = useState<SubNiche | null>(null);
  
  // Get available sub-niches for the selected segment
  const subNiches: SubNicheData[] = getSubNichesBySegment(selectedSegment);
  
  return (
    <div className={cn("w-full", className)}>
      <h2 className="text-xl font-semibold mb-2">Selecione o Subnicho</h2>
      <p className="text-sm text-gray-300 mb-4">
        Subnichos relacionados ao segmento {selectedSegment}
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {subNiches.map((subNiche) => (
          <div
            key={subNiche.name}
            className={cn(
              "border rounded-lg p-5 cursor-pointer transition-all duration-300",
              "hover:shadow-lg hover:border-[#D4AF37]",
              selectedSubNiche === subNiche.name
                ? "border-[#D4AF37] bg-[#D4AF37]/10 shadow-md"
                : "border-border",
              hoveredSubNiche === subNiche.name && selectedSubNiche !== subNiche.name
                ? "scale-105 border-[#D4AF37]/50"
                : ""
            )}
            onClick={() => onSelect(subNiche.name)}
            onMouseEnter={() => setHoveredSubNiche(subNiche.name)}
            onMouseLeave={() => setHoveredSubNiche(null)}
          >
            <h3 className="text-lg font-medium mb-2">{subNiche.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubNicheSelector;
