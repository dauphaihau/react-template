import * as React from 'react';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { cn } from '#/shared/lib/utils';
import { Button } from './button';

const SIDEBAR_WIDTH = '18rem';
const SIDEBAR_WIDTH_ICON = '4.5rem';

interface SidebarContextValue {
  open: boolean
  state: 'expanded' | 'collapsed'
  setOpen: (open: boolean) => void
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContextValue | null>(null);

export interface SidebarProviderProps extends React.ComponentProps<'div'> {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function SidebarProvider({
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  className,
  children,
  ...props
}: SidebarProviderProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const open = controlledOpen ?? uncontrolledOpen;

  const setOpen = React.useCallback((nextOpen: boolean) => {
    if (controlledOpen === undefined) {
      setUncontrolledOpen(nextOpen);
    }

    onOpenChange?.(nextOpen);
  }, [controlledOpen, onOpenChange]);

  const toggleSidebar = React.useCallback(() => {
    setOpen(!open);
  }, [open, setOpen]);

  const value = React.useMemo<SidebarContextValue>(() => ({
    open,
    state: open ? 'expanded' : 'collapsed',
    setOpen,
    toggleSidebar,
  }), [open, setOpen, toggleSidebar]);

  return (
    <SidebarContext.Provider value={value}>
      <div
        data-slot="sidebar-provider"
        style={{
          '--sidebar-width': SIDEBAR_WIDTH,
          '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
          ...props.style,
        } as React.CSSProperties}
        className={cn('flex h-svh w-full bg-muted/20', className)}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = React.useContext(SidebarContext);

  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }

  return context;
}

export interface SidebarProps extends React.ComponentProps<'aside'> {
  collapsible?: 'offcanvas' | 'icon' | 'none'
}

export function Sidebar({
  collapsible = 'offcanvas',
  className,
  children,
  ...props
}: SidebarProps) {
  const { open, setOpen } = useSidebar();
  const isCollapsed = !open && collapsible === 'icon';

  return (
    <>
      {collapsible === 'offcanvas' && (
        <div
          className={cn(
            'fixed inset-0 z-30 bg-foreground/30 backdrop-blur-[1px] transition-opacity lg:hidden',
            open ? 'opacity-100' : 'pointer-events-none opacity-0',
          )}
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}
      <aside
        data-slot="sidebar"
        data-state={open ? 'expanded' : 'collapsed'}
        data-collapsible={isCollapsed ? 'icon' : collapsible}
        className={cn(
          'flex flex-col overflow-hidden border-r border-sidebar-border bg-sidebar text-sidebar-foreground',
          collapsible === 'none'
            ? 'h-full w-[var(--sidebar-width)] shrink-0'
            : collapsible === 'icon'
              ? cn(
                'h-full shrink-0 transition-[width] duration-200 ease-linear',
                open ? 'w-[var(--sidebar-width)]' : 'w-[var(--sidebar-width-icon)]',
              )
              : cn(
                'fixed inset-y-0 left-0 z-40 w-[var(--sidebar-width)] transition-transform duration-200 ease-linear',
                open ? 'translate-x-0' : '-translate-x-full',
                'lg:static lg:z-auto lg:h-full lg:w-auto lg:translate-x-0 lg:shrink-0 lg:transition-[width] lg:duration-200',
                open ? 'lg:w-[var(--sidebar-width)]' : 'lg:w-0',
              ),
          className,
        )}
        {...props}
      >
        {children}
      </aside>
    </>
  );
}

export function SidebarInset({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-inset"
      className={cn('flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto', className)}
      {...props}
    />
  );
}

export function SidebarTrigger({
  className,
  ...props
}: Omit<React.ComponentProps<typeof Button>, 'children'>) {
  const { open, toggleSidebar } = useSidebar();

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      className={cn(className)}
      onClick={toggleSidebar}
      aria-label={open ? 'Close sidebar' : 'Open sidebar'}
      {...props}
    >
      {open ? <PanelLeftClose /> : <PanelLeftOpen />}
    </Button>
  );
}

export function SidebarHeader({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-header"
      className={cn('border-b border-sidebar-border px-4 py-4', className)}
      {...props}
    />
  );
}

export function SidebarContent({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-content"
      className={cn('flex-1 overflow-y-auto px-3 py-4', className)}
      {...props}
    />
  );
}

export function SidebarFooter({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-footer"
      className={cn('border-t border-sidebar-border px-4 py-4', className)}
      {...props}
    />
  );
}

export function SidebarGroup({
  className,
  ...props
}: React.ComponentProps<'section'>) {
  return (
    <section
      data-slot="sidebar-group"
      className={cn('mb-5', className)}
      {...props}
    />
  );
}

export function SidebarGroupLabel({
  className,
  ...props
}: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="sidebar-group-label"
      className={cn(
        'px-3 pb-2 text-sm text-sidebar-foreground/60',
        className,
      )}
      {...props}
    />
  );
}

export function SidebarGroupContent({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-group-content"
      className={cn('space-y-1', className)}
      {...props}
    />
  );
}

export function SidebarMenu({
  className,
  ...props
}: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="sidebar-menu"
      className={cn('m-0 list-none space-y-1 p-0', className)}
      {...props}
    />
  );
}

export function SidebarMenuItem({
  className,
  ...props
}: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot="sidebar-menu-item"
      className={cn('m-0', className)}
      {...props}
    />
  );
}

export interface SidebarMenuButtonProps extends React.ComponentProps<'button'> {
  asChild?: boolean
  isActive?: boolean
}

export function SidebarMenuButton({
  className,
  asChild = false,
  isActive = false,
  children,
  ...props
}: SidebarMenuButtonProps) {
  const classes = cn(
    'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium no-underline transition-colors outline-none',
    isActive
      ? 'bg-sidebar-accent text-sidebar-accent-foreground font-semibold'
      : 'text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
    className,
  );

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{ className?: string }>;

    return React.cloneElement(child, {
      ...props,
      className: cn(classes, child.props.className),
    });
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
