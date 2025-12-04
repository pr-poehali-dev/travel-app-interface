import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

const Profile = () => {
  const navigate = useNavigate();

  const stats = [
    { label: 'Поездки', value: '12', icon: 'Plane' },
    { label: 'Совпадения', value: '47', icon: 'Heart' },
    { label: 'Отзывы', value: '23', icon: 'Star' },
  ];

  const interests = ['Фотография', 'Треккинг', 'Местная кухня', 'Рыбалка', 'Кемпинг'];
  const travelStyle = ['Природа', 'Культура', 'Активный отдых', 'Горы'];

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/95 border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <Icon name="ArrowLeft" className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold text-foreground">
              Профиль
            </h1>
            <Button variant="ghost" size="icon">
              <Icon name="Settings" className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-6 animate-fade-in">
        <Card className="p-6 bg-white/90 backdrop-blur-sm border-0 shadow-xl">
          <div className="flex flex-col items-center text-center space-y-4">
            <Avatar className="h-32 w-32 ring-4 ring-primary/20">
              <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop" />
              <AvatarFallback>ИП</AvatarFallback>
            </Avatar>

            <div>
              <h2 className="text-3xl font-bold">Иван Петров</h2>
              <p className="text-muted-foreground flex items-center justify-center gap-1 mt-1">
                <Icon name="MapPin" className="h-4 w-4" />
                Москва, Россия
              </p>
            </div>

            <div className="flex gap-2">
              <Badge className="bg-gradient-to-r from-primary to-secondary text-white border-0">
                <Icon name="Shield" className="mr-1 h-3 w-3" />
                Верифицирован
              </Badge>
              <Badge variant="outline" className="border-accent text-accent">
                Путешественник
              </Badge>
            </div>

            <p className="text-sm text-muted-foreground max-w-md">
              Путешествую по России уже 5 лет. Люблю горы, треккинг и кемпинги. Мечтаю побывать на всех вершинах Кавказа.
            </p>

            <Button
              size="lg"
              variant="outline"
              className="w-full mt-4"
              onClick={() => navigate('/onboarding')}
            >
              <Icon name="Edit" className="mr-2 h-5 w-5" />
              Редактировать профиль
            </Button>
          </div>
        </Card>

        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat) => (
            <Card
              key={stat.label}
              className="p-4 bg-white/90 backdrop-blur-sm border-0 shadow-xl text-center"
            >
              <Icon
                name={stat.icon as any}
                className="h-6 w-6 mx-auto text-primary mb-2"
              />
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </Card>
          ))}
        </div>

        <Card className="p-6 bg-white/90 backdrop-blur-sm border-0 shadow-xl space-y-4">
          <div>
            <h3 className="font-semibold flex items-center gap-2 mb-3">
              <Icon name="Heart" className="h-5 w-5 text-secondary" />
              Интересы
            </h3>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest) => (
                <Badge key={interest} variant="secondary" className="bg-secondary/10 text-secondary">
                  {interest}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold flex items-center gap-2 mb-3">
              <Icon name="Compass" className="h-5 w-5 text-accent" />
              Стиль путешествий
            </h3>
            <div className="flex flex-wrap gap-2">
              {travelStyle.map((style) => (
                <Badge key={style} variant="outline" className="border-accent text-accent">
                  {style}
                </Badge>
              ))}
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white/90 backdrop-blur-sm border-0 shadow-xl space-y-4">
          <h3 className="font-semibold flex items-center gap-2">
            <Icon name="Target" className="h-5 w-5 text-primary" />
            Заполненность профиля
          </h3>
          <div className="space-y-2">
            <Progress value={75} className="h-2" />
            <p className="text-sm text-muted-foreground">75% завершено</p>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Icon name="Check" className="h-4 w-4 text-green-500" />
                Основная информация
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Icon name="Check" className="h-4 w-4 text-green-500" />
                Интересы и стиль
              </span>
            </div>
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="flex items-center gap-2">
                <Icon name="Circle" className="h-4 w-4" />
                Добавить фотографии
              </span>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white/90 backdrop-blur-sm border-0 shadow-xl space-y-3">
          <h3 className="font-semibold flex items-center gap-2 mb-3">
            <Icon name="Map" className="h-5 w-5 text-primary" />
            Последние поездки
          </h3>
          {['Алтай', 'Камчатка', 'Карелия'].map((destination, i) => (
            <div key={destination} className="flex items-center justify-between py-2 border-b last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <Icon name="MapPin" className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{destination}</p>
                  <p className="text-xs text-muted-foreground">2024</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <Icon name="ChevronRight" className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </Card>
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
              <Icon name="User" className="h-6 w-6 text-primary" />
              <span className="text-xs mt-1">Профиль</span>
            </Button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Profile;