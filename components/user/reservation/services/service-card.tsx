import Image from 'next/image';

import { cn } from '@/lib/utils';
import { Service } from '@/types/reservation';

import { Card } from '@/components/ui/card';

interface ServiceCardProps {
  service: Service;
  onSelect: (service: Service) => void;
  variant?: 'default' | 'compact';
  className?: string;
}

export const ServiceCard = ({
  service,
  onSelect,
  variant = 'default',
  className,
}: ServiceCardProps) => {
  return (
    <Card
      className={cn(
        'flex cursor-pointer gap-3 overflow-hidden p-0 transition-all hover:shadow-md',
        variant === 'compact' && 'gap-2',
        className,
      )}
      onClick={() => onSelect(service)}
    >
      <div
        className={cn(
          'relative flex-shrink-0 overflow-hidden',
          variant === 'default'
            ? 'min-h-[110px] w-[164px]'
            : 'min-h-[80px] w-[120px]',
        )}
      >
        <Image
          src={service.image}
          alt={service.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 164px, 164px"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between p-3">
        <div className="space-y-2">
          <h3
            className={cn(
              'line-clamp-1 font-bold text-[#070815]',
              variant === 'default'
                ? 'text-base leading-7'
                : 'text-sm leading-6',
            )}
          >
            {service.name}
          </h3>

          <div className="flex items-center gap-1 text-sm text-[#252525]">
            <span className="font-bold">¥{service.price.toLocaleString()}</span>
            <span>/ {service.duration}分</span>
          </div>
        </div>

        <p className="mt-2 line-clamp-2 text-sm leading-5 text-[#717171]">
          {service.capacity}での作業に最適な個室ブースです。
        </p>

        {service.features && (
          <div className="mt-2 flex flex-wrap gap-1">
            {service.features.slice(0, 3).map((feature) => (
              <span
                key={feature}
                className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-600"
              >
                {feature}
              </span>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};
