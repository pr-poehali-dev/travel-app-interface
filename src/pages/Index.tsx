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
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-foreground">TRIPFinder
</h1>
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/notifications')}
                className="p-2 hover:bg-muted rounded-full transition-colors relative"
              >
                <Icon name="Bell" className="h-5 w-5 text-foreground" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full"></span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 pb-24">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-muted h-10 p-1">
            <TabsTrigger
              value="travelers"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md font-medium"
            >
              Путешественники
            </TabsTrigger>
            <TabsTrigger
              value="routes"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md font-medium"
            >
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