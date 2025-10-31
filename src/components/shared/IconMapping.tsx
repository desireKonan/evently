import { 
  CheckCircle, 
  Users, 
  Shield, 
  Ticket, 
  Megaphone, 
  Settings,
  CheckCircle2
} from 'lucide-react';

export const iconMap = {
  'done_all': CheckCircle,
  'groups': Users,
  'security': Shield,
  'local_activity': Ticket,
  'confirmation_number': Ticket,
  'campaign': Megaphone,
  'admin_panel_settings': Settings,
  'check_circle': CheckCircle2
};

interface LandingIconProps {
  name: keyof typeof iconMap;
  className?: string;
  size?: number;
}

export const LandingIcon = ({ name, className = '', size = 24 }: LandingIconProps) => {
  const IconComponent = iconMap[name];
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in iconMap`);
    return null;
  }

  return <IconComponent className={className} size={size} />;
};