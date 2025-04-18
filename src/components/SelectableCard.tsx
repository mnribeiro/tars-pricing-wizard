
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SelectableCardProps {
  title: string;
  selected: boolean;
  onClick: () => void;
  icon?: ReactNode;
  className?: string;
  price?: number;
}

const SelectableCard = ({
  title,
  selected,
  onClick,
  icon,
  className,
  price
}: SelectableCardProps) => {
  return (
    <div
      className={cn(
        "tars-card p-4 cursor-pointer animate-scale-in",
        selected && "selected",
        className
      )}
      onClick={onClick}
    >
      <div className="flex flex-col items-center justify-center gap-3 p-2">
        {icon && <div className="text-2xl">{icon}</div>}
        <h3 className="font-medium text-center">{title}</h3>
        {price !== undefined && (
          <p className="text-sm font-bold text-tars-highlight">
            R$ {price.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}
          </p>
        )}
      </div>
    </div>
  );
};

export default SelectableCard;
