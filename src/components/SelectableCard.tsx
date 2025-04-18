
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SelectableCardProps {
  title: string;
  selected: boolean;
  onClick: () => void;
  icon?: ReactNode;
  className?: string;
  price?: number;
  showPrice?: boolean;
}

const SelectableCard = ({
  title,
  selected,
  onClick,
  icon,
  className,
  price,
  showPrice = false
}: SelectableCardProps) => {
  return (
    <div
      className={cn(
        "border rounded-md p-4 cursor-pointer transition-all duration-200 animate-scale-in hover:scale-105",
        selected 
          ? "border-tars-highlight bg-tars-highlight/10 shadow-lg shadow-tars-highlight/20" 
          : "border-border hover:border-tars-highlight/50",
        className
      )}
      onClick={onClick}
    >
      <div className="flex flex-col items-center justify-center gap-3 p-2">
        {icon && <div className="text-2xl text-tars-highlight">{icon}</div>}
        <h3 className="font-medium text-center">{title}</h3>
        {showPrice && price !== undefined && (
          <p className="text-sm font-bold text-tars-highlight">
            R$ {price.toLocaleString('pt-BR')}
          </p>
        )}
      </div>
    </div>
  );
};

export default SelectableCard;
