// components/layout/AdminSidebar.tsx
import {
  SidebarContent,
  SidebarGroup,
  Sidebar,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader
} from '@/components/ui/sidebar';
import React, { type JSX } from 'react';
import {
  LayoutDashboard,
  Calendar,
  Users,
  Tag,
  Settings,
  LogOut,
  Users2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EventlyLogo } from '@/components/icons/EventlyLogo';
import { Link } from 'react-router-dom';
import { useSidebarSelection } from '@/contexts/SidebarContext';
import { useAuthStore } from '@/stores/authStore';

interface NavItem {
  id: string;
  title: string;
  icon: JSX.Element;
  active: boolean;
  url: string;
}


const AdminSidebar: React.FC = () => {
  const navItems: NavItem[] = [
    { id: 'dashboard', title: "Tableau de bord", icon: <LayoutDashboard className="h-5 w-5" />, active: true, url: "/explore" },
    { id: 'events', title: "Événements", icon: <Calendar className="h-5 w-5" />, active: false, url: "/admin/events" },
    { id: 'user', title: "Utilisateurs", icon: <Users className="h-5 w-5" />, active: false, url: "/admin/users" },
    { id: 'participant', title: "Participants", icon: <Users2 className="h-5 w-5" />, active: false, url: "/admin/participants" },
    { id: 'category', title: "Catégories", icon: <Tag className="h-5 w-5" />, active: false, url: "#" },
    { id: 'settings', title: "Paramètres", icon: <Settings className="h-5 w-5" />, active: false, url: "#" }
  ];

  const { selectedItem, setSelectedItem } = useSidebarSelection();

  const { user, logout } = useAuthStore();

  return (
    <Sidebar variant="sidebar" className="bg-white">
      <SidebarHeader>
        <div className="flex items-center space-x-2 m-4 ">
          <EventlyLogo />
          <span className="font-semibold"> Evently </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col gap-2">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title} className={selectedItem === item.id ? "flex items-center gap-3 rounded-full bg-event-primary px-3 py-2 text-white active:bg-event-primary" :  "flex items-center gap-3 rounded-full px-3 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800"}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url} onClick={ () => setSelectedItem(item.id) }>
                      {item.icon}
                      <span className="text-sm font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center gap-3 rounded-full bg-gray-100 p-2">
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
            style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCfimSwHikVoC7UwmMoZ674nuzfUwX6XiA6dHXUC2EH7Pbk9_vGxLjryQ-sIxEmZ4QE_ys62vijpgoO9xYg5pOy8g7mTaWhtL_FofZ3lYOtf0zUe1Ub_aBt9vIAR43-NhrAUByLP1h5Bt-6NLnJU3KJGcGqKj6d1MNIO4k3-PGEhZP0aQEaTHINIOv5IeZFVLnRTlzFG6DQRWu3_6XceYfpX029ldCuTCl0bsGp-geSH28uB4H9agtXFZTDzwckSK2P4F4wq9c3Ckw")` }}
          />
          <div className="flex flex-col">
            <p className="text-sm font-medium text-gray-800"> { user?.role } </p>
            <p className="text-xs text-gray-500"> { user?.email } </p>
          </div>
          <Button onClick={logout} variant="ghost" className="ml-auto text-gray-500 hover:text-gray-800 transition-colors p-1">
              <LogOut className="w-5" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;