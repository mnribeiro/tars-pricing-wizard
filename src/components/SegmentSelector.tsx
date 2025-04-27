
import { cn } from "@/lib/utils";
import { Segment, segmentData } from "@/types/calculator";
import {
  Building,
  HeartPulse,
  ShoppingCart,
  Factory,
  Settings,
  HardHat
} from "lucide-react";
import { useState } from "react";

interface SegmentSelectorProps {
  selectedSegment: Segment | null;
  onSelect: (segment: Segment) => void;
  className?: string;
}

const SegmentSelector = ({
  selectedSegment,
  onSelect,
  className
}: SegmentSelectorProps) => {
  // Animation for cards
  const [hoveredSegment, setHoveredSegment] = useState<Segment | null>(null);

  // Helper to render appropriate icon based on segment
  const renderIcon = (segment: Segment) => {
    switch (segment) {
      case "Saúde":
        return <HeartPulse className="w-10 h-10 text-[#D4AF37]" />;
      case "Construção Civil":
        return <HardHat className="w-10 h-10 text-[#D4AF37]" />;
      case "E-commerce":
        return <ShoppingCart className="w-10 h-10 text-[#D4AF37]" />;
      case "Indústria":
        return <Factory className="w-10 h-10 text-[#D4AF37]" />;
      case "Serviços":
        return <Settings className="w-10 h-10 text-[#D4AF37]" />;
      default:
        return <Building className="w-10 h-10 text-[#D4AF37]" />;
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <h2 className="text-xl font-semibold mb-4">Selecione o Segmento</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {segmentData.map((segment) => (
          <div
            key={segment.name}
            className={cn(
              "border rounded-lg p-6 cursor-pointer transition-all duration-300",
              "hover:shadow-lg hover:border-[#D4AF37]",
              "flex flex-col items-center justify-center",
              selectedSegment === segment.name
                ? "border-[#D4AF37] bg-[#D4AF37]/10 shadow-md"
                : "border-border",
              hoveredSegment === segment.name && selectedSegment !== segment.name
                ? "scale-105 border-[#D4AF37]/50"
                : ""
            )}
            onClick={() => onSelect(segment.name)}
            onMouseEnter={() => setHoveredSegment(segment.name)}
            onMouseLeave={() => setHoveredSegment(null)}
          >
            <div className="flex flex-col items-center text-center gap-4">
              {renderIcon(segment.name)}
              <h3 className="text-lg font-medium">{segment.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SegmentSelector;
