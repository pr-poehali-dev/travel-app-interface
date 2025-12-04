import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { TravelerCard } from '@/components/TravelerCard';
import { RouteCard } from '@/components/RouteCard';
import { BottomNavigation } from '@/components/BottomNavigation';
import { TRAVELERS_DATA, ROUTES_DATA } from '@/types/travel';

const Index = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('travelers');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const currentTraveler = TRAVELERS_DATA[currentCardIndex];

  const handleSwipe = (direction: 'like' | 'pass') => {
    if (direction === 'like') {
      console.log('Liked:', currentTraveler.name);
    }
    if (currentCardIndex < TRAVELERS_DATA.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      setCurrentCardIndex(0);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/95 border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Icon name="Heart" className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-foreground">TRIPFinder</h1>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/map')}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <Icon name="Map" className="h-5 w-5 text-foreground" />
              </button>
              <button
                onClick={() => navigate('/notifications')}
                className="p-2 hover:bg-muted rounded-lg transition-colors relative"
              >
                <Icon name="Bell" className="h-5 w-5 text-foreground" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 pb-24">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-white/90 backdrop-blur-sm border-0 shadow-lg p-2 h-14">
            <TabsTrigger
              value="travelers"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white text-lg font-semibold"
            >
              <Icon name="Users" className="mr-2 h-5 w-5" />
              Путешественники
            </TabsTrigger>
            <TabsTrigger
              value="routes"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white text-lg font-semibold"
            >
              <Icon name="Map" className="mr-2 h-5 w-5" />
              Маршруты
            </TabsTrigger>
          </TabsList>

          <TabsContent value="travelers" className="animate-fade-in">
            <TravelerCard traveler={currentTraveler} onSwipe={handleSwipe} />
          </TabsContent>

          <TabsContent value="routes" className="animate-fade-in">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ROUTES_DATA.map((route) => (
                <RouteCard key={route.id} route={route} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <BottomNavigation onNavigate={navigate} currentPath="/" />
    </div>
  );
};

export default Index;