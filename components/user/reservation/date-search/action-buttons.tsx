import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface ActionButtonsProps {
  onSearch: () => void;
  showClear?: boolean;
  onClear?: () => void;
  disabled?: boolean;
}

export const ActionButtons = ({
  onSearch,
  showClear = false,
  onClear,
  disabled,
}: ActionButtonsProps) => {
  if (showClear) {
    return (
      <div className="flex w-full items-center justify-between gap-1">
        <Button
          variant="outline"
          className="h-13 rounded-full font-bold"
          onClick={onClear}
        >
          クリア
        </Button>
        <Button className="h-13 rounded-full font-bold" onClick={onSearch}>
          <Search className="!size-5" />
          検索
        </Button>
      </div>
    );
  }

  return (
    <Button
      className="h-13 w-full rounded-full text-base font-bold"
      onClick={onSearch}
      disabled={disabled}
    >
      <Search className="!size-5" />
      空き状況を検索
    </Button>
  );
};
