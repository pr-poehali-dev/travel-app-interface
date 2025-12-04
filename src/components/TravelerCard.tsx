import { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Traveler } from '@/types/travel';

interface TravelerCardProps {
  traveler: Traveler;
  onSwipe: (direction: 'like' | 'pass') => void;
}

export const TravelerCard = ({ traveler, onSwipe }: TravelerCardProps) => {
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const startPosRef = useRef({ x: 0, y: 0 });

  const handleSwipe = (direction: 'like' | 'pass') => {
    setSwipeDirection(direction === 'like' ? 'right' : 'left');
    
    setTimeout(() => {
      onSwipe(direction);
      setSwipeDirection(null);
      setDragOffset({ x: 0, y: 0 });
    }, 300);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startPosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    startPosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const offsetX = e.clientX - startPosRef.current.x;
    const offsetY = e.clientY - startPosRef.current.y;
    setDragOffset({ x: offsetX, y: offsetY });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const offsetX = e.touches[0].clientX - startPosRef.current.x;
    const offsetY = e.touches[0].clientY - startPosRef.current.y;
    setDragOffset({ x: offsetX, y: offsetY });
  };

  const handleRelease = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (Math.abs(dragOffset.x) > 150) {
      handleSwipe(dragOffset.x > 0 ? 'like' : 'pass');
    } else {
      setDragOffset({ x: 0, y: 0 });
    }
  };

  return (
    <Card
      ref={cardRef}
      className={`max-w-md mx-auto bg-white/90 backdrop-blur-sm border-0 shadow-2xl overflow-hidden transition-all duration-300 ${
        swipeDirection === 'right' ? 'animate-swipe-right' : ''
      } ${swipeDirection === 'left' ? 'animate-swipe-left' : ''}`}
      style={{
        transform: `translateX(${dragOffset.x}px) translateY(${dragOffset.y}px) rotate(${dragOffset.x * 0.05}deg)`,
        transition: isDragging ? 'none' : 'transform 0.3s ease-out',
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleRelease}
      onMouseLeave={handleRelease}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleRelease}
    >
      <div className="relative h-96 overflow-hidden">
        <img
          src={traveler.avatar}
          alt={traveler.name}
          className="w-full h-full object-cover pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {dragOffset.x > 50 && (
          <div className="absolute top-8 left-8 text-6xl font-bold text-green-500 border-4 border-green-500 px-6 py-2 rounded-lg rotate-12">
            ❤️
          </div>
        )}
        
        {dragOffset.x < -50 && (
          <div className="absolute top-8 right-8 text-6xl font-bold text-red-500 border-4 border-red-500 px-6 py-2 rounded-lg -rotate-12">
            ✖
          </div>
        )}
        
        <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
          <Badge className="bg-primary/90 backdrop-blur-sm border-0 text-white text-lg px-4 py-2 shadow-lg">
            <Icon name="Sparkles" className="mr-1 h-4 w-4" />
            {traveler.compatibility}%
          </Badge>
          {traveler.verified && (
            <Badge className="bg-accent/90 backdrop-blur-sm border-0 text-white px-3 py-1 shadow-lg">
              <Icon name="ShieldCheck" className="mr-1 h-3 w-3" />
              Verified
            </Badge>
          )}
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">
              {traveler.name}, {traveler.age}
            </h2>
            <p className="text-muted-foreground flex items-center gap-1">
              <Icon name="MapPin" className="h-4 w-4" />
              {traveler.location}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl">
          <div className="flex items-center gap-1">
            <Icon name="Star" className="h-4 w-4 text-secondary fill-secondary" />
            <span className="font-semibold">{traveler.rating}</span>
          </div>
          <div className="w-px h-4 bg-border" />
          <span className="text-sm text-muted-foreground">
            {traveler.tripsCompleted} поездок
          </span>
          <div className="w-px h-4 bg-border" />
          <span className="text-sm text-muted-foreground">
            {traveler.reviews} отзывов
          </span>
        </div>

        <p className="text-sm text-muted-foreground">{traveler.bio}</p>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Icon name="Plane" className="h-5 w-5 text-primary" />
            <span className="font-semibold">Едет в:</span>
            <span className="text-primary">{traveler.nextDestination}</span>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-semibold flex items-center gap-2">
              <Icon name="Heart" className="h-4 w-4 text-secondary" />
              Интересы:
            </p>
            <div className="flex flex-wrap gap-2">
              {traveler.interests.map((interest) => (
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
              {traveler.travelStyle.map((style) => (
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
            className="flex-1 border-2 border-red-200 hover:bg-red-50 hover:border-red-300 text-red-500 h-16 rounded-2xl"
            onClick={() => handleSwipe('pass')}
          >
            <Icon name="X" className="h-8 w-8" />
          </Button>
          <Button
            size="lg"
            className="flex-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90 h-16 rounded-2xl"
            onClick={() => handleSwipe('like')}
          >
            <Icon name="Heart" className="h-8 w-8" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
