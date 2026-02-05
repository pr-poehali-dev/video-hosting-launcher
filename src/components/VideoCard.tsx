import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { storage } from '@/lib/storage';
import Icon from '@/components/ui/icon';

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
  onDelete?: () => void;
  showDelete?: boolean;
  onAddToQueue?: (videoId: number) => void;
}

export default function VideoCard({ video, onClick, onDelete, showDelete, onAddToQueue }: VideoCardProps) {
  const { toast } = useToast();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete();
    }
  };

  const handleAddToQueue = (e: React.MouseEvent) => {
    e.stopPropagation();
    storage.addToQueue(video.id);
    toast({
      title: 'Добавлено в очередь',
      description: `Видео "${video.title}" добавлено в очередь просмотра`
    });
    if (onAddToQueue) {
      onAddToQueue(video.id);
    }
    setDropdownOpen(false);
  };

  return (
    <Card 
      className="group overflow-hidden bg-card border-border hover:border-primary transition-all duration-500 cursor-pointer hover-scale hover:shadow-xl hover:shadow-primary/20"
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
        {showDelete && (
          <Button
            size="icon"
            variant="destructive"
            className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleDelete}
          >
            <Icon name="Trash2" size={16} />
          </Button>
        )}
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
            <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground mt-1">
              <div className="flex items-center gap-2">
                <span>{video.views} просмотров</span>
                <span>•</span>
                <span>{video.uploadDate}</span>
              </div>
              <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Icon name="MoreVertical" size={14} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleAddToQueue}>
                    <Icon name="ListPlus" size={16} className="mr-2" />
                    Добавить в очередь
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export type { Video };