// components/layout/AdminSidebar.tsx
import { 
  SidebarContent, 
  SidebarGroup, 
  Sidebar, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem 
} from '@/components/ui/sidebar';
import React, { type JSX } from 'react';
import {
  LayoutDashboard,
  Calendar,
  Users,
  Building,
  Tag,
  Settings
} from 'lucide-react';

interface NavItem {
  id: number;
  title: string;
  icon: JSX.Element;
  active: boolean;
  url: string;
}


const AdminSidebar: React.FC = () => {
  const navItems: NavItem[] = [
    { id: 1, title: "Tableau de bord", icon: <LayoutDashboard className="h-5 w-5" />, active: true, url: "#" },
    { id: 2, title: "Événements", icon: <Calendar className="h-5 w-5" />, active: false, url: "#" },
    { id: 3, title: "Utilisateurs", icon: <Users className="h-5 w-5" />, active: false, url: "#" },
    { id: 4, title: "Organisateurs", icon: <Building className="h-5 w-5" />, active: false, url: "#" },
    { id: 5, title: "Catégories", icon: <Tag className="h-5 w-5" />, active: false, url: "#" },
    { id: 6, title: "Paramètres", icon: <Settings className="h-5 w-5" />, active: false, url: "#" }
  ];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      { item.icon } 
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AdminSidebar;