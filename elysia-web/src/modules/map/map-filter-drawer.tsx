import {
  IconAdjustmentsHorizontal,
  IconChartBar,
  IconTargetArrow,
  IconUrgent,
} from '@tabler/icons-react';
import type { ReactNode } from 'react';

import { AppLogo } from '@/components/app';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

type FilterOption = {
  value: string;
  label: string;
  total: number;
  color?: string;
};

type FilterGroupConfig = {
  id: string;
  label: string;
  icon: ReactNode;
  options: FilterOption[];
  variant?: 'default' | 'outline';
};

const urgencyOptions: FilterOption[] = [
  {
    value: 'critical',
    label: 'Critical',
    color: 'bg-red-100 text-red-800 hover:bg-red-200',
    total: 10,
  },
  {
    value: 'high',
    label: 'High',
    color: 'bg-orange-100 text-orange-800 hover:bg-orange-200',
    total: 20,
  },
  {
    value: 'medium',
    label: 'Medium',
    color: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
    total: 30,
  },
  {
    value: 'low',
    label: 'Low',
    color: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
    total: 40,
  },
];

const typeOptions: FilterOption[] = [
  { value: 'people', label: 'People Rescue', total: 10 },
  { value: 'medical', label: 'Medical', total: 20 },
  { value: 'food', label: 'Food & Water', total: 30 },
  { value: 'supplies', label: 'Supplies', total: 40 },
  { value: 'shelter', label: 'Shelter', total: 50 },
  { value: 'transportation', label: 'Transportation', total: 60 },
];

const statusOptions: FilterOption[] = [
  { value: 'new', label: 'New', total: 10 },
  { value: 'in-progress', label: 'In Progress', total: 20 },
  { value: 'resolved', label: 'Resolved', total: 40 },
];

const filterGroups: FilterGroupConfig[] = [
  {
    id: 'urgency-toggle-group',
    label: 'Urgency level',
    icon: <IconUrgent />,
    options: urgencyOptions,
    variant: 'default',
  },
  {
    id: 'type-toggle-group',
    label: 'Type',
    icon: <IconTargetArrow />,
    options: typeOptions,
    variant: 'outline',
  },
  {
    id: 'status-toggle-group',
    label: 'Status',
    icon: <IconChartBar />,
    options: statusOptions,
    variant: 'outline',
  },
];

type FilterSectionProps = {
  config: FilterGroupConfig;
};

const FilterSection = ({ config }: FilterSectionProps) => {
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
      >
        {config.options.map((option) => (
          <ToggleGroupItem
            key={option.value}
            className={option.color}
            value={option.value}
          >
            {option.label} ({option.total})
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
};

const MapFilterDrawer = () => {
  const hasActiveFilters = true;

  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon-sm" aria-label="Filter">
          <IconAdjustmentsHorizontal />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="z-60 !rounded-none">
        <DrawerHeader>
          <DrawerTitle className="flex items-center gap-2">
            <AppLogo withText={false} />
            <span>Filter Rescue Requests</span>
          </DrawerTitle>
          <DrawerDescription>
            Refine your search to find specific types of rescue requests
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 pb-0 space-y-6 md:space-y-8">
          {filterGroups.map((group) => (
            <FilterSection key={group.id} config={group} />
          ))}
        </div>
        <DrawerFooter>
          <Button variant="default" className="w-full">
            Apply Filters
            {hasActiveFilters && (
              <Badge className="bg-white text-primary ml-2">10</Badge>
            )}
          </Button>
          {hasActiveFilters && (
            <Button variant="outline" className="w-full">
              Reset All Filters
            </Button>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default MapFilterDrawer;
