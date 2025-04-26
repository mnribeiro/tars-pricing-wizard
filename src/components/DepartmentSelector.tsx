
import { cn } from "@/lib/utils";
import { Department, Segment, SubNiche, getDepartmentsBySubNiche } from "@/types/calculator";
import { useState } from "react";

interface DepartmentSelectorProps {
  selectedSegment: Segment;
  selectedSubNiche: SubNiche;
  selectedDepartment: Department | null;
  onSelect: (department: Department) => void;
  className?: string;
}

const DepartmentSelector = ({
  selectedSegment,
  selectedSubNiche,
  selectedDepartment,
  onSelect,
  className
}: DepartmentSelectorProps) => {
  const [hoveredDepartment, setHoveredDepartment] = useState<Department | null>(null);
  
  // Get available departments for the selected segment and sub-niche
  const departments: Department[] = getDepartmentsBySubNiche(selectedSegment, selectedSubNiche);
  
  return (
    <div className={cn("w-full", className)}>
      <h2 className="text-xl font-semibold mb-2">Selecione o Departamento</h2>
      <p className="text-sm text-gray-300 mb-4">
        Departamentos disponíveis para {selectedSubNiche} em {selectedSegment}
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {departments.map((department) => (
          <div
            key={department}
            className={cn(
              "border rounded-lg p-4 cursor-pointer transition-all duration-300",
              "hover:shadow-lg hover:border-[#D4AF37]",
              selectedDepartment === department
                ? "border-[#D4AF37] bg-[#D4AF37]/10 shadow-md"
                : "border-border",
              hoveredDepartment === department && selectedDepartment !== department
                ? "scale-105 border-[#D4AF37]/50"
                : ""
            )}
            onClick={() => onSelect(department)}
            onMouseEnter={() => setHoveredDepartment(department)}
            onMouseLeave={() => setHoveredDepartment(null)}
          >
            <h3 className="text-base font-medium text-center">{department}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentSelector;
