import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface MapPoint {
  id: number;
  name: string;
  lat: number;
  lng: number;
  type: 'route' | 'poi';
  travelers?: number;
  description: string;
  image: string;
}

const MapView = () => {
  const navigate = useNavigate();
  const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(null);

  const mapPoints: MapPoint[] = [
    {
      id: 1,
      name: 'Байкал',
      lat: 53.55,
      lng: 108.16,
      type: 'route',
      travelers: 15,
      description: 'Глубочайшее озеро планеты. Остров Ольхон, ледяные гроты, нерпы',
      image: 'https://images.unsplash.com/photo-1590004953392-5aba2e72269a?w=800&h=600&fit=crop',
    },
    {
      id: 2,
      name: 'Эльбрус',
      lat: 43.35,
      lng: 42.44,
      type: 'route',
      travelers: 8,
      description: 'Восхождение на самую высокую вершину России и Европы (5642 м)',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    },
    {
      id: 3,
      name: 'Алтай',
      lat: 51.95,
      lng: 85.96,
      type: 'route',
      travelers: 12,
      description: 'Горные трекки, Чемал, Телецкое озеро, рафтинг по Катуни',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    },
    {
      id: 4,
      name: 'Камчатка',
      lat: 53.01,
      lng: 158.65,
      type: 'poi',
      travelers: 6,
      description: 'Земля вулканов и гейзеров. Долина гейзеров, Курильское озеро',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop',
    },
    {
      id: 5,
      name: 'Карелия',
      lat: 61.78,
      lng: 34.35,
      type: 'poi',
      travelers: 14,
      description: 'Кижи, Валаам, Рускеала. Край озёр и карельских лесов',
      image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=600&fit=crop',
    },
    {
      id: 6,
      name: 'Золотое кольцо',
      lat: 56.85,
      lng: 40.39,
      type: 'route',
      travelers: 18,
      description: 'Владимир, Суздаль, Ярославль. Исторические города Руси',
      image: 'https://images.unsplash.com/photo-1547448415-e9f5b28e570d?w=800&h=600&fit=crop',
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/95 border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <Icon name="ArrowLeft" className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold text-foreground">
              Карта маршрутов
            </h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-6 animate-fade-in">
        <Card className="relative h-[500px] bg-white/90 backdrop-blur-sm border-0 shadow-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100">
            <div className="relative w-full h-full">
              {mapPoints.map((point) => (
                <button
                  key={point.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                  style={{
                    left: `${20 + point.id * 25}%`,
                    top: `${30 + point.id * 15}%`,
                  }}
                  onClick={() => setSelectedPoint(point)}
                >
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white shadow-lg group-hover:scale-125 transition-all animate-pulse-glow">
                      <Icon name={point.type === 'route' ? 'MapPin' : 'Star'} className="h-6 w-6" />
                    </div>
                    {point.travelers && (
                      <Badge className="absolute -top-2 -right-2 bg-accent text-white border-0 text-xs">
                        {point.travelers}
                      </Badge>
                    )}
                  </div>
                  <div className="mt-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all text-xs font-semibold whitespace-nowrap">
                    {point.name}
                  </div>
                </button>
              ))}

              <div className="absolute top-4 left-4 flex gap-2">
                <Badge className="bg-primary text-white border-0 flex items-center gap-1">
                  <Icon name="MapPin" className="h-3 w-3" />
                  Маршруты
                </Badge>
                <Badge className="bg-accent text-white border-0 flex items-center gap-1">
                  <Icon name="Star" className="h-3 w-3" />
                  Места
                </Badge>
              </div>

              <div className="absolute bottom-4 right-4 flex gap-2">
                <Button size="sm" variant="secondary" className="shadow-lg">
                  <Icon name="ZoomIn" className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="secondary" className="shadow-lg">
                  <Icon name="ZoomOut" className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {selectedPoint && (
          <Card className="p-6 bg-white/90 backdrop-blur-sm border-0 shadow-xl animate-scale-in">
            <div className="flex gap-4">
              <img
                src={selectedPoint.image}
                alt={selectedPoint.name}
                className="w-32 h-32 object-cover rounded-lg"
              />
              <div className="flex-1 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-bold">{selectedPoint.name}</h3>
                    <p className="text-muted-foreground">{selectedPoint.description}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedPoint(null)}
                  >
                    <Icon name="X" className="h-5 w-5" />
                  </Button>
                </div>

                <div className="flex gap-4">
                  {selectedPoint.travelers && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Icon name="Users" className="h-4 w-4" />
                      {selectedPoint.travelers} попутчиков
                    </Badge>
                  )}
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Icon name={selectedPoint.type === 'route' ? 'Route' : 'MapPin'} className="h-4 w-4" />
                    {selectedPoint.type === 'route' ? 'Маршрут' : 'Место'}
                  </Badge>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button className="bg-gradient-to-r from-primary to-secondary flex-1">
                    <Icon name="Heart" className="mr-2 h-4 w-4" />
                    Интересно
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Icon name="Share2" className="mr-2 h-4 w-4" />
                    Поделиться
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}

        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Icon name="TrendingUp" className="h-5 w-5 text-primary" />
            Популярные маршруты
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {mapPoints.map((point) => (
              <Card
                key={point.id}
                className="p-4 cursor-pointer hover:shadow-xl transition-all hover:scale-105 bg-white/90 backdrop-blur-sm border-0"
                onClick={() => setSelectedPoint(point)}
              >
                <div className="space-y-3">
                  <img
                    src={point.image}
                    alt={point.name}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <div>
                    <h4 className="font-semibold">{point.name}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">{point.description}</p>
                  </div>
                  {point.travelers && (
                    <Badge variant="secondary" className="flex items-center gap-1 w-fit">
                      <Icon name="Users" className="h-3 w-3" />
                      {point.travelers}
                    </Badge>
                  )}
                </div>
              </Card>
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
              <Icon name="Search" className="h-6 w-6" />
              <span className="text-xs mt-1">Поиск</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="flex-col h-auto py-2 hover:bg-primary/10"
              onClick={() => navigate('/map')}
            >
              <Icon name="Map" className="h-6 w-6 text-primary" />
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

export default MapView;