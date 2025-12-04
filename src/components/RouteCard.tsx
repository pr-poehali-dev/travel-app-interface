import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Route } from '@/types/travel';

interface RouteCardProps {
  route: Route;
}

export const RouteCard = ({ route }: RouteCardProps) => {
  return (
    <Card className="overflow-hidden bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02]">
      <div className="relative h-48 overflow-hidden">
        <img src={route.image} alt={route.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <Badge className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm border-0 text-white">
          <Icon name="Users" className="mr-1 h-3 w-3" />
          {route.travelers}
        </Badge>
      </div>

      <div className="p-4 space-y-3">
        <div>
          <h3 className="text-xl font-bold">{route.title}</h3>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            <Icon name="MapPin" className="h-4 w-4" />
            {route.destination}
          </p>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Icon name="Calendar" className="h-4 w-4" />
            {route.duration}
          </div>
          <div className="flex items-center gap-1 font-semibold text-primary">
            <Icon name="Wallet" className="h-4 w-4" />
            {route.budget}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {route.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <Button className="w-full bg-gradient-to-r from-primary to-secondary">
          <Icon name="Heart" className="mr-2 h-4 w-4" />
          Присоединиться
        </Button>
      </div>
    </Card>
  );
};
