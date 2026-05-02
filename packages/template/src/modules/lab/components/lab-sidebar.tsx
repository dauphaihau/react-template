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
  SidebarMenuItem
} from '#/shared/ui/primitives';
import { labNavGroups } from '../constants';

export function LabSidebar() {
  const location = useLocation();

  return (
    <Sidebar collapsible="none">
      <SidebarHeader className='border-none'>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="h-auto gap-3 py-1.5">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground">
                <span className="text-base font-bold">L</span>
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">Template Lab</span>
                <span className="truncate text-xs text-sidebar-foreground/70">Sandbox</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {labNavGroups.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
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
                          <SidebarMenuButton asChild isActive={isActive}>
                            <Link to={item.to}>
                              <Icon className="size-4 shrink-0" />
                              <span className="flex-1 truncate">{item.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        )
                        : (
                          <SidebarMenuButton asChild>
                            <a href={item.href}>
                              <Icon className="size-4 shrink-0" />
                              <span className="flex-1 truncate">{item.title}</span>
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
