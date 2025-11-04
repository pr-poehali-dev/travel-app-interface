import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

interface Notification {
  id: number;
  type: 'match' | 'message' | 'route' | 'system';
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
  avatar?: string;
}

const Notifications = () => {
  const navigate = useNavigate();

  const notifications: Notification[] = [
    {
      id: 1,
      type: 'match',
      title: 'Новое совпадение!',
      description: 'Анна тоже хочет посетить Грузию в мае',
      timestamp: '5 мин назад',
      isRead: false,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anna',
    },
    {
      id: 2,
      type: 'message',
      title: 'Новое сообщение',
      description: 'Максим: "Смотрел отель на Бали..."',
      timestamp: '1 час назад',
      isRead: false,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Max',
    },
    {
      id: 3,
      type: 'route',
      title: 'Новый маршрут',
      description: 'Добавлен маршрут "Горы Кавказа" в твой регион',
      timestamp: '2 часа назад',
      isRead: true,
    },
    {
      id: 4,
      type: 'system',
      title: 'Совет дня',
      description: 'Заполни профиль полностью для лучших совпадений',
      timestamp: 'Вчера',
      isRead: true,
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'match':
        return 'Heart';
      case 'message':
        return 'MessageCircle';
      case 'route':
        return 'Map';
      case 'system':
        return 'Bell';
      default:
        return 'Bell';
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'match':
        return 'text-secondary';
      case 'message':
        return 'text-primary';
      case 'route':
        return 'text-accent';
      case 'system':
        return 'text-muted-foreground';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 pb-24">
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <Icon name="ArrowLeft" className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent flex-1">
              Уведомления
            </h1>
            <Button variant="ghost" size="sm">
              Прочитать все
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-4 animate-fade-in">
        {notifications.map((notification) => (
          <Card
            key={notification.id}
            className={`p-4 cursor-pointer hover:shadow-xl transition-all hover:scale-[1.02] border-0 ${
              notification.isRead ? 'bg-white/60' : 'bg-white/90'
            } backdrop-blur-sm`}
          >
            <div className="flex items-start gap-4">
              {notification.avatar ? (
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={notification.avatar} />
                    <AvatarFallback>{notification.title[0]}</AvatarFallback>
                  </Avatar>
                  <div
                    className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-md ${getColor(
                      notification.type
                    )}`}
                  >
                    <Icon name={getIcon(notification.type) as any} className="h-3 w-3" />
                  </div>
                </div>
              ) : (
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-br from-white to-gray-100 flex items-center justify-center ${getColor(
                    notification.type
                  )}`}
                >
                  <Icon name={getIcon(notification.type) as any} className="h-6 w-6" />
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-semibold">{notification.title}</h3>
                  {!notification.isRead && (
                    <Badge className="bg-primary text-white border-0 ml-2">Новое</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-2">{notification.description}</p>
                <p className="text-xs text-muted-foreground">{notification.timestamp}</p>
              </div>
            </div>
          </Card>
        ))}

        {notifications.length === 0 && (
          <Card className="p-12 bg-white/90 backdrop-blur-sm border-0 shadow-xl text-center">
            <Icon name="Bell" className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Нет уведомлений</h3>
            <p className="text-muted-foreground">Здесь будут появляться важные обновления</p>
          </Card>
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-white/20 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-around py-4">
            <Button
              variant="ghost"
              size="icon"
              className="flex-col h-auto py-2 hover:bg-primary/10"
              onClick={() => navigate('/')}
            >
              <Icon name="Compass" className="h-6 w-6" />
              <span className="text-xs mt-1">Открыть</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="flex-col h-auto py-2 hover:bg-primary/10"
              onClick={() => navigate('/search')}
            >
              <Icon name="Search" className="h-6 w-6" />
              <span className="text-xs mt-1">Поиск</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="flex-col h-auto py-2 hover:bg-primary/10"
              onClick={() => navigate('/map')}
            >
              <Icon name="Map" className="h-6 w-6" />
              <span className="text-xs mt-1">Карта</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="flex-col h-auto py-2 hover:bg-primary/10"
              onClick={() => navigate('/profile')}
            >
              <Icon name="User" className="h-6 w-6" />
              <span className="text-xs mt-1">Профиль</span>
            </Button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Notifications;
