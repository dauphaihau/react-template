import { Link, useLocation } from '@tanstack/react-router';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '#/shared/ui/primitives';
import { cn } from '#/shared/lib/utils';
import { labNavGroups } from './constants';

export function LabNavigation() {
  const location = useLocation();
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className={cn('border-none', isCollapsed && 'px-3')}>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className={cn('h-auto gap-3 py-1.5', isCollapsed && 'justify-center px-0')}>
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground">
                <span className="text-base font-bold">L</span>
              </div>
              <div className={cn('grid flex-1 text-left text-sm leading-tight', isCollapsed && 'hidden')}>
                <span className="truncate font-semibold">Template Lab</span>
                <span className="truncate text-xs text-sidebar-foreground/70">Sandbox</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className={cn(isCollapsed && 'px-2')}>
        {labNavGroups.map((group) => (
          <SidebarGroup key={group.title}>
            {!isCollapsed && <SidebarGroupLabel>{group.title}</SidebarGroupLabel>}
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = item.to
                    ? location.pathname === item.to || location.pathname.startsWith(`${item.to}/`)
                    : false;

                  return (
                    <SidebarMenuItem key={item.title}>
                      {item.to
                        ? (
                          <SidebarMenuButton
                            asChild
                            isActive={isActive}
                            className={cn(isCollapsed && 'justify-center px-0')}
                          >
                            <Link to={item.to}>
                              <Icon className="size-4 shrink-0" />
                              <span className={cn('flex-1 truncate', isCollapsed && 'hidden')}>{item.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        )
                        : (
                          <SidebarMenuButton asChild className={cn(isCollapsed && 'justify-center px-0')}>
                            <a href={item.href}>
                              <Icon className="size-4 shrink-0" />
                              <span className={cn('flex-1 truncate', isCollapsed && 'hidden')}>{item.title}</span>
                            </a>
                          </SidebarMenuButton>
                        )}
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
