import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import VideoCard from './VideoCard';
import ProfileEditModal from './ProfileEditModal';
import { storage } from '@/lib/storage';
import type { Video } from './VideoCard';
import type { ViewType } from './Header';

interface VideoContentProps {
  activeView: ViewType;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categories: string[];
  mockVideos: Video[];
  setActiveView: (view: ViewType) => void;
  setSelectedVideo: (video: Video) => void;
  onDeleteVideo?: (videoId: number) => void;
}

export default function VideoContent({
  activeView,
  selectedCategory,
  setSelectedCategory,
  categories,
  mockVideos,
  setActiveView,
  setSelectedVideo,
  onDeleteVideo
}: VideoContentProps) {
  const [favoriteVideos, setFavoriteVideos] = useState<Video[]>([]);
  const [queueVideos, setQueueVideos] = useState<Video[]>([]);
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [profile, setProfile] = useState(() => storage.getProfile());

  useEffect(() => {
    const favoriteIds = storage.getFavoriteVideos();
    const favorites = mockVideos.filter(video => favoriteIds.includes(video.id));
    setFavoriteVideos(favorites);
    
    const queueIds = storage.getQueue();
    const queue = mockVideos.filter(video => queueIds.includes(video.id));
    setQueueVideos(queue);
  }, [mockVideos, activeView]);

  useEffect(() => {
    storage.saveProfile(profile);
  }, [profile]);

  return (
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
          {showBanner && (
            <section className="mb-8 animate-fade-in">
              <div className="relative aspect-[21/6] rounded-xl overflow-hidden mb-8">
                <img 
                  src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1600&h=600&fit=crop"
                  alt="Hero"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex items-center">
                  <div className="container mx-auto px-6 max-w-xl animate-slide-up">
                    <Badge className="mb-2 gradient-primary text-xs">Trending</Badge>
                    <h2 className="text-3xl font-bold mb-2">Топ видео недели</h2>
                    <p className="text-sm text-foreground/90 mb-4">
                      Самые популярные и обсуждаемые видео за последние 7 дней
                    </p>
                    <Button 
                      size="sm" 
                      className="gradient-primary gap-2"
                      onClick={() => {
                        setActiveView('player');
                        setSelectedVideo(mockVideos[0]);
                      }}
                    >
                      <Icon name="Play" size={16} />
                      Смотреть сейчас
                    </Button>
                  </div>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute top-2 right-2 h-8 w-8 bg-black/50 hover:bg-black/70 text-white"
                  onClick={() => setShowBanner(false)}
                >
                  <Icon name="X" size={16} />
                </Button>
              </div>
            </section>
          )}

          {!showBanner && (
            <div className="mb-6 flex justify-center">
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => setShowBanner(true)}
              >
                <Icon name="Eye" size={16} />
                Показать баннер Trending
              </Button>
            </div>
          )}

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
          {favoriteVideos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {favoriteVideos.map((video) => (
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
              <p className="text-sm text-muted-foreground mt-2">Добавляйте видео в избранное, нажимая на кнопку сердечка</p>
            </Card>
          )}
        </section>
      )}

      {activeView === 'queue' && (
        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Icon name="ListVideo" size={24} className="text-primary" />
            Очередь просмотра
          </h2>
          {queueVideos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {queueVideos.map((video) => (
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
              <Icon name="ListVideo" size={48} className="mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">Очередь пуста</p>
              <p className="text-sm text-muted-foreground mt-2">Добавляйте видео в очередь, нажимая на кнопку списка</p>
            </Card>
          )}
        </section>
      )}

      {activeView === 'profile' && (
        <section className="animate-fade-in">
          {showProfileEdit && (
            <ProfileEditModal
              onClose={() => setShowProfileEdit(false)}
              currentProfile={profile}
              onSave={setProfile}
            />
          )}
          <Card className="p-6 mb-6">
            <div className="flex items-start gap-6">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="gradient-accent text-3xl font-bold">{profile.avatar}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">{profile.name}</h2>
                <p className="text-muted-foreground mb-4">{profile.bio}</p>
                <div className="flex gap-6 text-sm">
                  <div>
                    <p className="font-semibold">15</p>
                    <p className="text-muted-foreground">Подписки</p>
                  </div>
                  <div>
                    <p className="font-semibold">{favoriteVideos.length}</p>
                    <p className="text-muted-foreground">Избранное</p>
                  </div>
                  <div>
                    <p className="font-semibold">127</p>
                    <p className="text-muted-foreground">Просмотров</p>
                  </div>
                </div>
              </div>
              <Button className="gradient-primary" onClick={() => setShowProfileEdit(true)}>
                <Icon name="Pencil" size={16} className="mr-2" />
                Редактировать
              </Button>
            </div>
          </Card>

          <h3 className="text-xl font-bold mb-4">Мои видео</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockVideos.filter(v => v.author === profile.name).map((video) => (
              <VideoCard 
                key={video.id} 
                video={video}
                onClick={() => {
                  setActiveView('player');
                  setSelectedVideo(video);
                }}
                showDelete={true}
                onDelete={() => onDeleteVideo && onDeleteVideo(video.id)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}