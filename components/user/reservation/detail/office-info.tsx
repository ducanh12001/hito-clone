interface OfficeInfoProps {
  name: string;
  price: number;
  unit: string;
  description: string;
}

export const OfficeInfo = ({
  name,
  price,
  unit,
  description,
}: OfficeInfoProps) => {
  return (
    <div className="flex flex-col gap-4 px-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl leading-[100%] font-bold">{name}</h1>
        <div className="flex items-center gap-1 text-sm text-[#252525]">
          <span className="leading-4 font-bold">¥{price.toLocaleString()}</span>
          <span className="leading-4">/ {unit}分</span>
        </div>
        <p className="text-sm leading-5 text-[#717171]">{description}</p>
      </div>
      <div className="h-px bg-[#DEDEDE]" />
    </div>
  );
};
