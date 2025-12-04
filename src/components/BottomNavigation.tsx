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
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-white/20 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-around py-4">
          {navItems.map((item) => (
            <Button
              key={item.path}
              variant="ghost"
              size="icon"
              className={`flex-col h-auto py-2 hover:bg-primary/10 ${
                currentPath === item.path ? 'text-primary' : ''
              }`}
              onClick={() => onNavigate(item.path)}
            >
              <Icon name={item.icon as any} className="h-6 w-6" />
              <span className="text-xs mt-1">{item.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
};