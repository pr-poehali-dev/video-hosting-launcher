import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import type { Video } from './VideoCard';

interface VideoPlayerProps {
  selectedVideo: Video;
  videoQuality: string;
  setVideoQuality: (quality: string) => void;
  mockVideos: Video[];
  setSelectedVideo: (video: Video) => void;
}

export default function VideoPlayer({ 
  selectedVideo, 
  videoQuality, 
  setVideoQuality, 
  mockVideos,
  setSelectedVideo 
}: VideoPlayerProps) {
  return (
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
  );
}
