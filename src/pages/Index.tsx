import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const mockVideos = [
  {
    id: 1,
    title: 'Путешествие в горы Алтая',
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=450&fit=crop',
    duration: '12:34',
    views: '2.5M',
    author: 'Путешественник',
    authorAvatar: 'PT',
    uploadDate: '2 дня назад',
    quality: ['360p', '720p', '1080p']
  },
  {
    id: 2,
    title: 'Готовим пасту карбонара',
    thumbnail: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&h=450&fit=crop',
    duration: '8:15',
    views: '1.2M',
    author: 'Шеф Иван',
    authorAvatar: 'ШИ',
    uploadDate: '1 неделю назад',
    quality: ['360p', '720p']
  },
  {
    id: 3,
    title: 'Обзор нового iPhone',
    thumbnail: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&h=450&fit=crop',
    duration: '15:42',
    views: '3.8M',
    author: 'ТехОбзор',
    authorAvatar: 'ТО',
    uploadDate: '3 дня назад',
    quality: ['360p', '720p', '1080p']
  },
  {
    id: 4,
    title: 'Тренировка для начинающих',
    thumbnail: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=450&fit=crop',
    duration: '20:00',
    views: '890K',
    author: 'Фитнес Гуру',
    authorAvatar: 'ФГ',
    uploadDate: '5 дней назад',
    quality: ['720p', '1080p']
  },
  {
    id: 5,
    title: 'Космос: тайны Вселенной',
    thumbnail: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=450&fit=crop',
    duration: '25:18',
    views: '4.2M',
    author: 'Наука ТВ',
    authorAvatar: 'НТ',
    uploadDate: '1 день назад',
    quality: ['360p', '720p', '1080p']
  },
  {
    id: 6,
    title: 'Уроки гитары для новичков',
    thumbnail: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&h=450&fit=crop',
    duration: '18:30',
    views: '650K',
    author: 'Музыкант',
    authorAvatar: 'МЗ',
    uploadDate: '1 неделю назад',
    quality: ['360p', '720p']
  }
];

const categories = ['Все', 'Путешествия', 'Кулинария', 'Технологии', 'Спорт', 'Наука', 'Музыка', 'Игры'];

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [activeView, setActiveView] = useState<'home' | 'catalog' | 'player' | 'profile' | 'favorites'>('home');
  const [selectedVideo, setSelectedVideo] = useState(mockVideos[0]);
  const [videoQuality, setVideoQuality] = useState('1080p');

  const VideoCard = ({ video, onClick }: any) => (
    <Card 
      className="group overflow-hidden bg-card border-border hover:border-primary transition-all duration-300 cursor-pointer hover-scale"
      onClick={onClick}
    >
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={video.thumbnail} 
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-2 right-2 bg-black/90 px-2 py-1 rounded text-xs font-semibold">
          {video.duration}
        </div>
        <div className="absolute top-2 left-2 flex gap-1">
          {video.quality.includes('1080p') && (
            <Badge className="bg-primary text-xs">HD</Badge>
          )}
        </div>
      </div>
      <div className="p-3">
        <div className="flex gap-3">
          <Avatar className="h-9 w-9 flex-shrink-0">
            <AvatarFallback className="gradient-primary text-xs font-bold">
              {video.authorAvatar}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
              {video.title}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">{video.author}</p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
              <span>{video.views} просмотров</span>
              <span>•</span>
              <span>{video.uploadDate}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <h1 className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
                VideoHost
              </h1>
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

      {activeView === 'player' && (
        <div className="container mx-auto px-4 py-6 animate-fade-in">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <Card className="overflow-hidden border-border">
                <div className="relative aspect-video bg-black">
                  <img 
                    src={selectedVideo.thumbnail}
                    alt={selectedVideo.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button size="lg" className="rounded-full w-20 h-20 gradient-primary">
                      <Icon name="Play" size={32} />
                    </Button>
                  </div>
                  <div className="absolute bottom-4 right-4 flex gap-2">
                    {selectedVideo.quality.map((q) => (
                      <Button
                        key={q}
                        size="sm"
                        variant={videoQuality === q ? 'default' : 'secondary'}
                        onClick={() => setVideoQuality(q)}
                        className="text-xs"
                      >
                        {q}
                      </Button>
                    ))}
                  </div>
                </div>
              </Card>

              <div className="space-y-4">
                <div>
                  <h1 className="text-2xl font-bold mb-2">{selectedVideo.title}</h1>
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="gradient-primary font-bold">
                          {selectedVideo.authorAvatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{selectedVideo.author}</p>
                        <p className="text-sm text-muted-foreground">2.5M подписчиков</p>
                      </div>
                      <Button className="gradient-primary">Подписаться</Button>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="secondary" className="gap-2">
                        <Icon name="ThumbsUp" size={18} />
                        15K
                      </Button>
                      <Button variant="secondary" className="gap-2">
                        <Icon name="Share2" size={18} />
                        Поделиться
                      </Button>
                    </div>
                  </div>
                </div>

                <Card className="p-4 bg-muted">
                  <p className="text-sm">
                    <span className="font-semibold">{selectedVideo.views} просмотров</span>
                    <span className="text-muted-foreground ml-2">{selectedVideo.uploadDate}</span>
                  </p>
                  <p className="text-sm mt-2 text-muted-foreground">
                    Описание видео. Здесь может быть подробная информация о содержимом ролика, 
                    ссылки и дополнительные материалы.
                  </p>
                </Card>

                <Card className="p-4">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Icon name="MessageSquare" size={18} />
                    Комментарии (156)
                  </h3>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="gradient-accent text-xs">U{i}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-semibold">Пользователь {i}</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Отличное видео! Очень познавательно и интересно.
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <Icon name="Sparkles" size={18} />
                Рекомендации
              </h3>
              {mockVideos.slice(0, 4).map((video) => (
                <Card 
                  key={video.id}
                  className="overflow-hidden hover:border-primary transition-colors cursor-pointer group"
                  onClick={() => setSelectedVideo(video)}
                >
                  <div className="flex gap-2">
                    <div className="relative w-40 aspect-video overflow-hidden flex-shrink-0">
                      <img 
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute bottom-1 right-1 bg-black/90 px-1 py-0.5 rounded text-xs">
                        {video.duration}
                      </div>
                    </div>
                    <div className="p-2 flex-1 min-w-0">
                      <h4 className="text-sm font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                        {video.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">{video.author}</p>
                      <p className="text-xs text-muted-foreground">{video.views} просмотров</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {(activeView === 'home' || activeView === 'catalog' || activeView === 'favorites') && (
        <div className="container mx-auto px-4 py-6 animate-fade-in">
          <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? 'default' : 'secondary'}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
                className="whitespace-nowrap"
              >
                {cat}
              </Button>
            ))}
          </div>

          {activeView === 'home' && (
            <>
              <section className="mb-8">
                <div className="relative aspect-[21/9] rounded-xl overflow-hidden mb-8">
                  <img 
                    src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1600&h=600&fit=crop"
                    alt="Hero"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex items-center">
                    <div className="container mx-auto px-8 max-w-2xl animate-slide-up">
                      <Badge className="mb-3 gradient-primary">Trending</Badge>
                      <h2 className="text-5xl font-bold mb-4">Топ видео недели</h2>
                      <p className="text-lg text-foreground/90 mb-6">
                        Самые популярные и обсуждаемые видео за последние 7 дней
                      </p>
                      <Button 
                        size="lg" 
                        className="gradient-primary gap-2"
                        onClick={() => {
                          setActiveView('player');
                          setSelectedVideo(mockVideos[0]);
                        }}
                      >
                        <Icon name="Play" size={20} />
                        Смотреть сейчас
                      </Button>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Icon name="TrendingUp" size={24} />
                  Популярное сейчас
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockVideos.slice(0, 6).map((video) => (
                    <VideoCard 
                      key={video.id} 
                      video={video}
                      onClick={() => {
                        setActiveView('player');
                        setSelectedVideo(video);
                      }}
                    />
                  ))}
                </div>
              </section>
            </>
          )}

          {activeView === 'catalog' && (
            <section>
              <h2 className="text-2xl font-bold mb-4">Каталог видео</h2>
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="all">Все</TabsTrigger>
                  <TabsTrigger value="new">Новые</TabsTrigger>
                  <TabsTrigger value="popular">Популярные</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {mockVideos.map((video) => (
                      <VideoCard 
                        key={video.id} 
                        video={video}
                        onClick={() => {
                          setActiveView('player');
                          setSelectedVideo(video);
                        }}
                      />
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="new" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {mockVideos.slice(0, 4).map((video) => (
                      <VideoCard 
                        key={video.id} 
                        video={video}
                        onClick={() => {
                          setActiveView('player');
                          setSelectedVideo(video);
                        }}
                      />
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="popular" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {mockVideos.slice(2).map((video) => (
                      <VideoCard 
                        key={video.id} 
                        video={video}
                        onClick={() => {
                          setActiveView('player');
                          setSelectedVideo(video);
                        }}
                      />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </section>
          )}

          {activeView === 'favorites' && (
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Icon name="Heart" size={24} className="text-primary" />
                Избранное
              </h2>
              {mockVideos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockVideos.slice(0, 3).map((video) => (
                    <VideoCard 
                      key={video.id} 
                      video={video}
                      onClick={() => {
                        setActiveView('player');
                        setSelectedVideo(video);
                      }}
                    />
                  ))}
                </div>
              ) : (
                <Card className="p-12 text-center">
                  <Icon name="Heart" size={48} className="mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Нет избранных видео</p>
                </Card>
              )}
            </section>
          )}

          {activeView === 'profile' && (
            <section className="animate-fade-in">
              <Card className="p-6 mb-6">
                <div className="flex items-start gap-6">
                  <Avatar className="h-24 w-24">
                    <AvatarFallback className="gradient-accent text-3xl font-bold">МП</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2">Мой Профиль</h2>
                    <p className="text-muted-foreground mb-4">Пользователь с 2024 года</p>
                    <div className="flex gap-6 text-sm">
                      <div>
                        <p className="font-semibold">15</p>
                        <p className="text-muted-foreground">Подписки</p>
                      </div>
                      <div>
                        <p className="font-semibold">3</p>
                        <p className="text-muted-foreground">Избранное</p>
                      </div>
                      <div>
                        <p className="font-semibold">127</p>
                        <p className="text-muted-foreground">Просмотров</p>
                      </div>
                    </div>
                  </div>
                  <Button className="gradient-primary">Редактировать</Button>
                </div>
              </Card>

              <h3 className="text-xl font-bold mb-4">История просмотров</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockVideos.slice(0, 6).map((video) => (
                  <VideoCard 
                    key={video.id} 
                    video={video}
                    onClick={() => {
                      setActiveView('player');
                      setSelectedVideo(video);
                    }}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
