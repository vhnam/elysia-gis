import { IconInfoCircle, IconMap } from '@tabler/icons-react';
import { Link, useLocation } from '@tanstack/react-router';
import { type ComponentProps } from 'react';

import { cn } from '@/utils/ui';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { AppLogo } from './app-logo';

const items = [
  {
    title: 'Rescue map',
    url: '/',
    icon: IconMap,
  },
  {
    title: 'About',
    url: '/about',
    icon: IconInfoCircle,
  },
];

export const AppSidebar = ({ ...props }: ComponentProps<typeof Sidebar>) => {
  const location = useLocation();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <AppLogo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="px-1.5 md:px-0">
            <SidebarMenu className="gap-2">
              {items.map((item) => (
                <Tooltip key={item.title}>
                  <TooltipTrigger
                    render={
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          isActive={item.url === location.pathname}
                          className={cn(
                            'md:border md:border-sidebar-border',
                            'data-[status=active]:border-sidebar-primary data-[status=active]:text-primary data-[status=active]:bg-white',
                          )}
                          render={
                            <Link to={item.url}>
                              <item.icon />
                              <span>{item.title}</span>
                            </Link>
                          }
                        />
                      </SidebarMenuItem>
                    }
                  />
                  <TooltipContent side="right">
                    <p>{item.title}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};
