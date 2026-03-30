import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { NavItem } from '@/types';
import { NavLink } from './nav-link';
import {
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';

export function SidebarItem({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <SidebarMenuItem>
      {hasChildren ? (
        <>
          <SidebarMenuButton onClick={() => setOpen(!open)}>
            {item.icon && <item.icon />}
            <span>{item.title}</span>
            <ChevronDown
              className={`ml-auto transition-transform ${
                open ? 'rotate-180' : ''
              }`}
            />
          </SidebarMenuButton>

          {open && (
            <ul className="ml-6 mt-1 space-y-1">
                {item.children?.map((child) => (
                <SidebarItem key={child.title} item={child} />
                ))}
            </ul>
        )}
        </>
      ) : (
        <NavLink item={item} />
      )}
    </SidebarMenuItem>
  );
}