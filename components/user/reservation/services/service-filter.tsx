import { cn } from '@/lib/utils';
import { useReservationStore } from '@/lib/stores/reservation-store';

import {
  GuidanceMeetingRoomIcon,
  MenuIcon,
  SeatIcon,
} from '@/components/icons/service-icons';
import { FilterType } from '@/types/reservation';

interface FilterOption {
  id: FilterType;
  name: string;
  icon: React.ReactNode;
}

interface ServiceFilterProps {
  className?: string;
}

export const ServiceFilter = ({ className }: ServiceFilterProps) => {
  const { selectedFilter, setSelectedFilter } = useReservationStore();

  const filterOptions: FilterOption[] = [
    {
      id: 'all',
      name: 'すべて',
      icon: <MenuIcon className="size-full" />,
    },
    {
      id: 'office',
      name: 'オフィススペース',
      icon: <SeatIcon className="size-full" />,
    },
    {
      id: 'meeting',
      name: '会議室',
      icon: <GuidanceMeetingRoomIcon className="size-full" />,
    },
    {
      id: 'lounge',
      name: 'ラウンジ',
      icon: <GuidanceMeetingRoomIcon className="size-full" />,
    },
  ];

  return (
    <div
      className={cn(
        'flex items-start justify-start gap-3 overflow-auto px-5',
        className,
      )}
    >
      {filterOptions.map((option) => (
        <FilterButton
          key={option.id}
          option={option}
          isSelected={selectedFilter === option.id}
          onSelect={() => setSelectedFilter(option.id)}
        />
      ))}
    </div>
  );
};

function FilterButton({
  option,
  isSelected,
  onSelect,
}: {
  option: FilterOption;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className="flex flex-col items-center gap-2.5 transition-all"
      aria-label={`Filter by ${option.name}`}
      aria-pressed={isSelected}
    >
      <div
        className={cn(
          'flex h-[92px] min-w-[92px] items-center justify-center rounded-lg border-2 transition-colors',
          isSelected
            ? 'border-primary text-primary bg-primary/10'
            : 'border-border bg-muted text-muted-foreground hover:bg-muted/80',
        )}
      >
        <div className="size-12">{option.icon}</div>
      </div>
      <span
        className={cn(
          'text-xs font-medium whitespace-nowrap transition-colors',
          isSelected ? 'text-primary' : 'text-muted-foreground',
        )}
      >
        {option.name}
      </span>
    </button>
  );
}
