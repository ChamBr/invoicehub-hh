import { Input } from "@/components/ui/input";

interface CustomItemInputsProps {
  description: string;
  price: number;
  onDescriptionChange: (value: string) => void;
  onPriceChange: (value: number) => void;
}

export const CustomItemInputs = ({
  description,
  price,
  onDescriptionChange,
  onPriceChange,
}: CustomItemInputsProps) => {
  return (
    <>
      <div className="flex-1">
        <Input
          placeholder="Descrição do item"
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
        />
      </div>
      <div className="w-32">
        <Input
          type="number"
          placeholder="Preço"
          value={price}
          onChange={(e) => onPriceChange(Number(e.target.value))}
        />
      </div>
    </>
  );
};