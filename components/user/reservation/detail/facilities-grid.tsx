import {
  BatteryCharging,
  LockKeyhole,
  Presentation,
  Printer,
  Wifi,
} from 'lucide-react';

const iconMap = {
  wifi: Wifi,
  monitor: Presentation,
  printer: Printer,
  toilet: LockKeyhole,
  power: BatteryCharging,
} as const;

interface FacilitiesGridProps {
  facilities: Array<{ icon: string; label: string }>;
}

export const FacilitiesGrid = ({ facilities }: FacilitiesGridProps) => {
  return (
    <div className="grid grid-cols-2 gap-x-3.5 gap-y-3 rounded-[14px] border border-[#F0F1F3] p-4 shadow-[0px_4px_9px_0px_rgba(44,36,78,0.05)]">
      {facilities.map((facility, index) => {
        const IconComponent = iconMap[facility.icon as keyof typeof iconMap];

        return (
          <div className="flex items-center gap-[5px]" key={index}>
            {IconComponent && <IconComponent className="size-6" />}
            <span className="text-sm leading-[100%] text-[#070815]">
              {facility.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};
