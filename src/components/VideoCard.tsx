import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface Video {
  id: number;
  title: string;
  thumbnail: string;
  duration: string;
  views: string;
  author: string;
  authorAvatar: string;
  uploadDate: string;
  quality: string[];
  videoUrl?: string;
}

interface VideoCardProps {
  video: Video;
  onClick?: () => void;
}

export default function VideoCard({ video, onClick }: VideoCardProps) {
  return (
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
}

export type { Video };