import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface BottomNavigationProps {
  onNavigate: (path: string) => void;
  currentPath?: string;
}

export const BottomNavigation = ({ onNavigate, currentPath = '/' }: BottomNavigationProps) => {
  const navItems = [
    { path: '/', icon: 'Compass', label: 'Открыть' },
    { path: '/search', icon: 'Search', label: 'Поиск' },
    { path: '/chats', icon: 'MessageCircle', label: 'Чаты' },
    { path: '/profile', icon: 'User', label: 'Профиль' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t z-50">
      <div className="container mx-auto px-2">
        <div className="flex justify-around py-2">
          {navItems.map((item) => (
            <Button
              key={item.path}
              variant="ghost"
              size="icon"
              className={`flex-col h-auto py-2 rounded-lg transition-colors ${
                currentPath === item.path ? 'text-primary' : 'text-muted-foreground'
              }`}
              onClick={() => onNavigate(item.path)}
            >
              <Icon name={item.icon as any} className="h-6 w-6" />
              <span className="text-[10px] mt-1">{item.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
};