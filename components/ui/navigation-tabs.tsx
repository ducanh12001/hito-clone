import { cn } from '@/lib/utils';

interface ServiceTab {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface ServiceTabsProps {
  tabs: ServiceTab[];
  value: string;
  onTabChange?: (tabId: string) => void;
  className?: string;
}

export const NavigationTabs = ({
  tabs,
  value,
  onTabChange,
  className,
}: ServiceTabsProps) => {
  return (
    <div className="pb-2">
      <div
        className={cn(
          'flex justify-center gap-10 border-b border-[#CBD5E1] px-5',
          className,
        )}
      >
        {tabs.map((tab) => {
          const isActive = value === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange?.(tab.id)}
              className={cn(
                'relative flex cursor-pointer flex-col items-center pb-2.5 transition-colors',
                isActive ? 'text-violet-500' : 'text-slate-400',
              )}
            >
              <div className="size-8">{tab.icon}</div>
              <span className="text-sm leading-7 font-bold">{tab.label}</span>
              {isActive && (
                <div className="absolute right-0 bottom-0 left-0 h-0.5 bg-violet-500" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
