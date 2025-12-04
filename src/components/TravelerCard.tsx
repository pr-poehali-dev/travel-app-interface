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
      className={`max-w-md mx-auto bg-white border-0 shadow-lg overflow-hidden transition-all duration-300 ${
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
          <Badge className="bg-primary border-0 text-white text-lg px-4 py-2 rounded-full shadow-md">
            {traveler.compatibility}%
          </Badge>
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

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>{traveler.tripsCompleted} поездок</span>
          <span>•</span>
          <span>{traveler.reviews} отзывов</span>
        </div>

        <p className="text-base leading-relaxed">{traveler.bio}</p>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-primary font-medium">
            <Icon name="MapPin" className="h-5 w-5" />
            <span>{traveler.nextDestination}</span>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Интересы</p>
            <div className="flex flex-wrap gap-2">
              {traveler.interests.map((interest) => (
                <Badge key={interest} variant="secondary" className="bg-muted hover:bg-muted/80 text-foreground rounded-full">
                  {interest}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            size="lg"
            variant="outline"
            className="flex-1 h-14 rounded-full border-2 hover:bg-muted"
            onClick={() => handleSwipe('pass')}
          >
            <Icon name="X" className="h-6 w-6" />
          </Button>
          <Button
            size="lg"
            className="flex-[2] bg-primary hover:bg-primary/90 h-14 rounded-full text-base font-semibold"
            onClick={() => handleSwipe('like')}
          >
            <Icon name="Heart" className="h-5 w-5 mr-2" />
            Лайк
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="flex-1 h-14 rounded-full border-2 hover:bg-muted"
            onClick={() => {}}
          >
            <Icon name="MessageCircle" className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </Card>
  );
};