
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
        "border rounded-md p-4 cursor-pointer transition-all duration-200 animate-scale-in",
        selected 
          ? "border-tars-highlight bg-tars-highlight bg-opacity-10" 
          : "border-border hover:border-tars-highlight/50",
        className
      )}
      onClick={onClick}
    >
      <div className="flex flex-col items-center justify-center gap-3 p-2">
        {icon && <div className="text-2xl">{icon}</div>}
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
