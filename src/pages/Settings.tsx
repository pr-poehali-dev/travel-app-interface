import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { useState } from 'react';

const Settings = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [showOnline, setShowOnline] = useState(true);
  const [privateProfile, setPrivateProfile] = useState(false);

  const settingsSections = [
    {
      title: 'Уведомления',
      items: [
        {
          id: 'push',
          label: 'Push-уведомления',
          description: 'Получать уведомления о новых совпадениях',
          checked: notifications,
          onChange: setNotifications,
        },
        {
          id: 'email',
          label: 'Email-уведомления',
          description: 'Получать сообщения на почту',
          checked: emailNotifications,
          onChange: setEmailNotifications,
        },
      ],
    },
    {
      title: 'Приватность',
      items: [
        {
          id: 'online',
          label: 'Показывать статус онлайн',
          description: 'Другие пользователи увидят, когда вы в сети',
          checked: showOnline,
          onChange: setShowOnline,
        },
        {
          id: 'private',
          label: 'Приватный профиль',
          description: 'Только совпадения могут видеть ваш профиль',
          checked: privateProfile,
          onChange: setPrivateProfile,
        },
      ],
    },
  ];

  const actionItems = [
    { icon: 'Shield', label: 'Безопасность', path: '/security' },
    { icon: 'CreditCard', label: 'Подписка', path: '/subscription' },
    { icon: 'HelpCircle', label: 'Помощь', path: '/help' },
    { icon: 'FileText', label: 'Условия использования', path: '/terms' },
    { icon: 'Lock', label: 'Политика конфиденциальности', path: '/privacy' },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="rounded-full"
            >
              <Icon name="ArrowLeft" className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold text-foreground">Настройки</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-4">
        {settingsSections.map((section) => (
          <Card key={section.title} className="p-4 bg-white shadow-sm">
            <h2 className="text-base font-semibold mb-4">{section.title}</h2>
            <div className="space-y-4">
              {section.items.map((item, index) => (
                <div key={item.id}>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <Label htmlFor={item.id} className="text-sm font-medium">
                        {item.label}
                      </Label>
                      <p className="text-xs text-muted-foreground mt-1">
                        {item.description}
                      </p>
                    </div>
                    <Switch
                      id={item.id}
                      checked={item.checked}
                      onCheckedChange={item.onChange}
                    />
                  </div>
                  {index < section.items.length - 1 && (
                    <Separator className="mt-4" />
                  )}
                </div>
              ))}
            </div>
          </Card>
        ))}

        <Card className="p-4 bg-white shadow-sm">
          <h2 className="text-base font-semibold mb-4">Прочее</h2>
          <div className="space-y-1">
            {actionItems.map((item, index) => (
              <div key={item.label}>
                <Button
                  variant="ghost"
                  className="w-full justify-start h-12 rounded-lg"
                  onClick={() => navigate(item.path)}
                >
                  <Icon name={item.icon as any} className="h-5 w-5 mr-3" />
                  <span className="text-sm">{item.label}</span>
                  <Icon name="ChevronRight" className="h-4 w-4 ml-auto" />
                </Button>
                {index < actionItems.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4 bg-white shadow-sm">
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full rounded-full border-2"
              onClick={() => {}}
            >
              <Icon name="LogOut" className="h-5 w-5 mr-2" />
              Выйти из аккаунта
            </Button>
            <Button
              variant="ghost"
              className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={() => {}}
            >
              Удалить аккаунт
            </Button>
          </div>
        </Card>

        <div className="text-center text-xs text-muted-foreground py-4">
          <p>TRIPFinder версия 1.0.0</p>
          <p className="mt-1">© 2024 Все права защищены</p>
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t z-50">
        <div className="container mx-auto px-2">
          <div className="flex justify-around py-2">
            <Button
              variant="ghost"
              size="icon"
              className="flex-col h-auto py-2 rounded-lg text-muted-foreground"
              onClick={() => navigate('/')}
            >
              <Icon name="Compass" className="h-6 w-6" />
              <span className="text-[10px] mt-1">Открыть</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="flex-col h-auto py-2 rounded-lg text-muted-foreground"
              onClick={() => navigate('/search')}
            >
              <Icon name="Search" className="h-6 w-6" />
              <span className="text-[10px] mt-1">Поиск</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="flex-col h-auto py-2 rounded-lg text-muted-foreground"
              onClick={() => navigate('/chats')}
            >
              <Icon name="MessageCircle" className="h-6 w-6" />
              <span className="text-[10px] mt-1">Чаты</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="flex-col h-auto py-2 rounded-lg text-primary"
              onClick={() => navigate('/profile')}
            >
              <Icon name="User" className="h-6 w-6" />
              <span className="text-[10px] mt-1">Профиль</span>
            </Button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Settings;
