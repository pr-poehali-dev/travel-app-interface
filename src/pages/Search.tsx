import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Icon from '@/components/ui/icon';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

const Search = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [budget, setBudget] = useState([50000]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const travelTypes = [
    { id: 'mountains', label: 'Горы', icon: 'Mountain' },
    { id: 'nature', label: 'Природа', icon: 'Trees' },
    { id: 'culture', label: 'Культура', icon: 'Landmark' },
    { id: 'trekking', label: 'Треккинг', icon: 'Footprints' },
    { id: 'lakes', label: 'Озёра', icon: 'Waves' },
    { id: 'adventure', label: 'Приключения', icon: 'Compass' },
    { id: 'extreme', label: 'Экстрим', icon: 'Zap' },
    { id: 'history', label: 'История', icon: 'BookOpen' },
  ];

  const toggleType = (typeId: string) => {
    setSelectedTypes((prev) =>
      prev.includes(typeId) ? prev.filter((id) => id !== typeId) : [...prev, typeId]
    );
  };

  const handleSearch = () => {
    console.log({ searchQuery, dateFrom, dateTo, budget, selectedTypes });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-full">
              <Icon name="ArrowLeft" className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold text-foreground">
              Поиск
            </h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-6 animate-fade-in">
        <Card className="p-6 bg-white shadow-sm">
          <div className="space-y-6">
            <div>
              <Label className="text-lg font-semibold flex items-center gap-2 mb-3">
                <Icon name="Search" className="h-5 w-5 text-primary" />
                Куда хотите отправиться?
              </Label>
              <Input
                placeholder="Введите название места..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 text-lg"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="text-lg font-semibold flex items-center gap-2 mb-3">
                  <Icon name="CalendarDays" className="h-5 w-5 text-secondary" />
                  Дата начала
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full h-12 justify-start text-left font-normal"
                    >
                      <Icon name="Calendar" className="mr-2 h-4 w-4" />
                      {dateFrom ? format(dateFrom, 'dd MMMM yyyy', { locale: ru }) : 'Выберите дату'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateFrom}
                      onSelect={setDateFrom}
                      initialFocus
                      locale={ru}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label className="text-lg font-semibold flex items-center gap-2 mb-3">
                  <Icon name="CalendarCheck" className="h-5 w-5 text-secondary" />
                  Дата окончания
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full h-12 justify-start text-left font-normal"
                    >
                      <Icon name="Calendar" className="mr-2 h-4 w-4" />
                      {dateTo ? format(dateTo, 'dd MMMM yyyy', { locale: ru }) : 'Выберите дату'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateTo}
                      onSelect={setDateTo}
                      initialFocus
                      locale={ru}
                      disabled={(date) => dateFrom ? date < dateFrom : false}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div>
              <Label className="text-lg font-semibold flex items-center gap-2 mb-4">
                <Icon name="Wallet" className="h-5 w-5 text-accent" />
                Бюджет: до {budget[0].toLocaleString('ru-RU')} ₽
              </Label>
              <Slider
                value={budget}
                onValueChange={setBudget}
                max={200000}
                min={10000}
                step={10000}
                className="mt-2"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>10,000 ₽</span>
                <span>200,000 ₽</span>
              </div>
            </div>

            <div>
              <Label className="text-lg font-semibold flex items-center gap-2 mb-4">
                <Icon name="MapPin" className="h-5 w-5 text-primary" />
                Тип путешествия
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {travelTypes.map((type) => (
                  <Card
                    key={type.id}
                    className={`p-4 cursor-pointer transition-all hover:scale-105 border-2 ${
                      selectedTypes.includes(type.id)
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200'
                    }`}
                    onClick={() => toggleType(type.id)}
                  >
                    <div className="flex flex-col items-center gap-2 text-center">
                      <Icon
                        name={type.icon as any}
                        className={`h-8 w-8 ${
                          selectedTypes.includes(type.id) ? 'text-primary' : 'text-muted-foreground'
                        }`}
                      />
                      <span
                        className={`text-sm font-medium ${
                          selectedTypes.includes(type.id) ? 'text-primary' : ''
                        }`}
                      >
                        {type.label}
                      </span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <Button
          size="lg"
          className="w-full bg-gradient-to-r from-primary via-secondary to-accent text-lg h-14"
          onClick={handleSearch}
        >
          <Icon name="Search" className="mr-2 h-5 w-5" />
          Найти попутчиков
        </Button>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Icon name="TrendingUp" className="h-5 w-5 text-primary" />
            Популярные направления
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {['Байкал', 'Алтай', 'Камчатка', 'Карелия', 'Сочи', 'Кавказ', 'Золотое кольцо', 'Владивосток'].map((destination) => (
              <Badge
                key={destination}
                variant="outline"
                className="p-3 text-sm justify-center cursor-pointer hover:bg-primary/10 transition-all"
              >
                {destination}
              </Badge>
            ))}
          </div>
        </div>
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
              <Icon name="Search" className="h-6 w-6 text-primary" />
              <span className="text-xs mt-1">Поиск</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="flex-col h-auto py-2 hover:bg-primary/10"
              onClick={() => navigate('/chats')}
            >
              <Icon name="MessageCircle" className="h-6 w-6" />
              <span className="text-xs mt-1">Чаты</span>
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

export default Search;