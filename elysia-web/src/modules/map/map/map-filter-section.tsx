import { type VariantProps } from 'class-variance-authority';
import { type ReactNode } from 'react';

import { Label } from '@/components/ui/label';
import { toggleVariants } from '@/components/ui/toggle';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

export interface FilterOption {
  value: string;
  label: string;
  total: number;
  color?: string;
}

export interface FilterGroupConfig {
  id: string;
  label: string;
  icon: ReactNode;
  options: FilterOption[];
  variant?: VariantProps<typeof toggleVariants>['variant'];
}

export interface FilterSectionProps {
  config: FilterGroupConfig;
  filterValues: string[];
  onToggleFilterValue: (name: string, value: string) => void;
}

export const FilterSection = ({
  config,
  filterValues,
  onToggleFilterValue,
}: FilterSectionProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={config.id}>
        {config.icon}
        <span>{config.label}</span>
      </Label>
      <ToggleGroup
        variant={config.variant}
        spacing={2}
        size="sm"
        id={config.id}
        className="flex-wrap"
        multiple
        value={filterValues}
      >
        {config.options.map((option) => (
          <ToggleGroupItem
            key={option.value}
            className={option.color}
            value={option.value}
            onClick={() => onToggleFilterValue(config.id, option.value)}
          >
            {option.label} ({option.total})
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
};
