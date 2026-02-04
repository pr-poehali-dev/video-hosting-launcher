import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';

type ViewType = 'home' | 'catalog' | 'player' | 'profile' | 'favorites';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
  onUploadClick: () => void;
}

export default function Header({ searchQuery, setSearchQuery, activeView, setActiveView, onUploadClick }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 cursor-pointer hover-scale" onClick={() => setActiveView('home')}>
              <Icon name="Play" size={28} className="text-primary" />
              <h1 className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
                VideoHost
              </h1>
            </div>
            <nav className="hidden md:flex gap-1">
              <Button 
                variant={activeView === 'home' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveView('home')}
                className="gap-2"
              >
                <Icon name="Home" size={16} />
                Главная
              </Button>
              <Button 
                variant={activeView === 'catalog' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveView('catalog')}
                className="gap-2"
              >
                <Icon name="Grid3x3" size={16} />
                Каталог
              </Button>
              <Button 
                variant={activeView === 'favorites' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveView('favorites')}
                className="gap-2"
              >
                <Icon name="Heart" size={16} />
                Избранное
              </Button>
            </nav>
          </div>
          
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Поиск видео..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-muted border-border"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button 
              variant="default" 
              size="sm" 
              className="gradient-primary gap-2"
              onClick={onUploadClick}
            >
              <Icon name="Upload" size={18} />
              <span className="hidden sm:inline">Загрузить</span>
            </Button>
            <Button size="icon" variant="ghost" onClick={toggleTheme}>
              <Icon name={theme === 'dark' ? 'Sun' : 'Moon'} size={20} />
            </Button>
            <Button size="icon" variant="ghost">
              <Icon name="Bell" size={20} />
            </Button>
            <Avatar 
              className="h-9 w-9 cursor-pointer hover-scale"
              onClick={() => setActiveView('profile')}
            >
              <AvatarFallback className="gradient-accent font-bold">
                МП
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
}

export type { ViewType };