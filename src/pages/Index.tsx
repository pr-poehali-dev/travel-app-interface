import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Traveler {
  id: number;
  name: string;
  age: number;
  avatar: string;
  location: string;
  compatibility: number;
  interests: string[];
  travelStyle: string[];
  bio: string;
  nextDestination: string;
}

interface Route {
  id: number;
  title: string;
  image: string;
  destination: string;
  duration: string;
  budget: string;
  travelers: number;
  tags: string[];
}

const Index = () => {
  const [activeTab, setActiveTab] = useState('travelers');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const travelers: Traveler[] = [
    {
      id: 1,
      name: 'Анна',
      age: 27,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anna',
      location: 'Москва',
      compatibility: 92,
      interests: ['Фотография', 'Хайкинг', 'Кафе'],
      travelStyle: ['Приключения', 'Культура', 'Природа'],
      bio: 'Люблю спонтанные поездки и открывать новые места!',
      nextDestination: 'Грузия',
    },
    {
      id: 2,
      name: 'Максим',
      age: 31,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Max',
      location: 'Санкт-Петербург',
      compatibility: 85,
      interests: ['Дайвинг', 'Серфинг', 'Ночная жизнь'],
      travelStyle: ['Приключения', 'Активный отдых', 'Вечеринки'],
      bio: 'Ищу компанию для путешествий по Азии',
      nextDestination: 'Бали',
    },
    {
      id: 3,
      name: 'Елена',
      age: 24,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena',
      location: 'Казань',
      compatibility: 88,
      interests: ['Йога', 'Медитация', 'Местная кухня'],
      travelStyle: ['Духовные практики', 'Эко-туризм', 'Релакс'],
      bio: 'В поисках баланса и гармонии в путешествиях',
      nextDestination: 'Индия',
    },
  ];

  const routes: Route[] = [
    {
      id: 1,
      title: 'Пляжный рай Тайланда',
      image: 'https://cdn.poehali.dev/projects/d48f06ae-d0c1-4065-9ebb-109caf17295d/files/482adfa2-c38d-43c7-a52b-6e69f4e08ccb.jpg',
      destination: 'Пхукет, Краби, Ко Самуи',
      duration: '14 дней',
      budget: '₽80,000',
      travelers: 12,
      tags: ['Пляж', 'Снорклинг', 'Острова'],
    },
    {
      id: 2,
      title: 'Горы Кавказа',
      image: 'https://cdn.poehali.dev/projects/d48f06ae-d0c1-4065-9ebb-109caf17295d/files/d7ab771b-8d42-4aef-ba96-a7716af1adbd.jpg',
      destination: 'Домбай, Архыз, Эльбрус',
      duration: '7 дней',
      budget: '₽35,000',
      travelers: 8,
      tags: ['Хайкинг', 'Горы', 'Природа'],
    },
    {
      id: 3,
      title: 'Европейский вояж',
      image: 'https://cdn.poehali.dev/projects/d48f06ae-d0c1-4065-9ebb-109caf17295d/files/3492ac52-150d-45a8-a82f-3e008778ad1b.jpg',
      destination: 'Прага, Вена, Будапешт',
      duration: '10 дней',
      budget: '₽120,000',
      travelers: 15,
      tags: ['Культура', 'Архитектура', 'Гастрономия'],
    },
  ];

  const currentTraveler = travelers[currentCardIndex];

  const handleSwipe = (direction: 'like' | 'pass') => {
    if (direction === 'like') {
      console.log('Liked:', currentTraveler.name);
    }
    if (currentCardIndex < travelers.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      setCurrentCardIndex(0);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              TravelMatch
            </h1>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="hover:bg-white/50">
                <Icon name="Bell" className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-white/50">
                <Icon name="MessageCircle" className="h-5 w-5" />
              </Button>
              <Avatar className="h-10 w-10 ring-2 ring-primary/20">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=You" />
                <AvatarFallback>Я</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-white/50 backdrop-blur-sm p-1">
            <TabsTrigger
              value="travelers"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white"
            >
              <Icon name="Users" className="mr-2 h-4 w-4" />
              Попутчики
            </TabsTrigger>
            <TabsTrigger
              value="routes"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-secondary data-[state=active]:to-accent data-[state=active]:text-white"
            >
              <Icon name="Map" className="mr-2 h-4 w-4" />
              Маршруты
            </TabsTrigger>
          </TabsList>

          <TabsContent value="travelers" className="space-y-6 animate-fade-in">
            <div className="max-w-lg mx-auto">
              <Card className="relative overflow-hidden border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
                <div className="relative h-96 overflow-hidden">
                  <img
                    src={currentTraveler.avatar}
                    alt={currentTraveler.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <Badge className="absolute top-4 right-4 animate-pulse-glow bg-gradient-to-r from-primary to-secondary border-0 text-white text-lg px-4 py-2">
                    <Icon name="Sparkles" className="mr-1 h-4 w-4" />
                    {currentTraveler.compatibility}% совпадение
                  </Badge>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-3xl font-bold">
                        {currentTraveler.name}, {currentTraveler.age}
                      </h2>
                      <p className="text-muted-foreground flex items-center gap-1">
                        <Icon name="MapPin" className="h-4 w-4" />
                        {currentTraveler.location}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground">{currentTraveler.bio}</p>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Icon name="Plane" className="h-5 w-5 text-primary" />
                      <span className="font-semibold">Едет в:</span>
                      <span className="text-primary">{currentTraveler.nextDestination}</span>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-semibold flex items-center gap-2">
                        <Icon name="Heart" className="h-4 w-4 text-secondary" />
                        Интересы:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {currentTraveler.interests.map((interest) => (
                          <Badge key={interest} variant="secondary" className="bg-secondary/10 text-secondary">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-semibold flex items-center gap-2">
                        <Icon name="Compass" className="h-4 w-4 text-accent" />
                        Стиль путешествий:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {currentTraveler.travelStyle.map((style) => (
                          <Badge key={style} variant="outline" className="border-accent text-accent">
                            {style}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button
                      size="lg"
                      variant="outline"
                      className="flex-1 border-2 hover:bg-destructive/10 hover:border-destructive hover:text-destructive transition-all"
                      onClick={() => handleSwipe('pass')}
                    >
                      <Icon name="X" className="mr-2 h-5 w-5" />
                      Пропустить
                    </Button>
                    <Button
                      size="lg"
                      className="flex-1 bg-gradient-to-r from-primary via-secondary to-accent hover:shadow-2xl hover:scale-105 transition-all"
                      onClick={() => handleSwipe('like')}
                    >
                      <Icon name="Heart" className="mr-2 h-5 w-5" />
                      Интересно!
                    </Button>
                  </div>
                </div>
              </Card>

              <div className="flex justify-center gap-2 mt-4">
                {travelers.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 rounded-full transition-all ${
                      index === currentCardIndex
                        ? 'w-8 bg-gradient-to-r from-primary to-secondary'
                        : 'w-2 bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="routes" className="space-y-6 animate-fade-in">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {routes.map((route, index) => (
                <Card
                  key={route.id}
                  className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all hover:scale-105 bg-white/90 backdrop-blur-sm animate-scale-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img src={route.image} alt={route.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <Badge className="absolute bottom-4 left-4 bg-white/90 text-foreground border-0">
                      <Icon name="Users" className="mr-1 h-3 w-3" />
                      {route.travelers} попутчиков
                    </Badge>
                  </div>

                  <div className="p-5 space-y-3">
                    <h3 className="text-xl font-bold">{route.title}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Icon name="MapPin" className="h-4 w-4" />
                      {route.destination}
                    </p>

                    <div className="flex gap-4 text-sm">
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Icon name="Calendar" className="h-4 w-4" />
                        {route.duration}
                      </span>
                      <span className="flex items-center gap-1 text-primary font-semibold">
                        <Icon name="Wallet" className="h-4 w-4" />
                        {route.budget}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {route.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-lg transition-all">
                      Присоединиться
                      <Icon name="ArrowRight" className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-white/20 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-around py-4">
            <Button variant="ghost" size="icon" className="flex-col h-auto py-2 hover:bg-primary/10">
              <Icon name="Compass" className="h-6 w-6 text-primary" />
              <span className="text-xs mt-1">Открыть</span>
            </Button>
            <Button variant="ghost" size="icon" className="flex-col h-auto py-2 hover:bg-primary/10">
              <Icon name="Search" className="h-6 w-6" />
              <span className="text-xs mt-1">Поиск</span>
            </Button>
            <Button variant="ghost" size="icon" className="flex-col h-auto py-2 hover:bg-primary/10">
              <Icon name="Heart" className="h-6 w-6" />
              <span className="text-xs mt-1">Избранное</span>
            </Button>
            <Button variant="ghost" size="icon" className="flex-col h-auto py-2 hover:bg-primary/10">
              <Icon name="User" className="h-6 w-6" />
              <span className="text-xs mt-1">Профиль</span>
            </Button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Index;
