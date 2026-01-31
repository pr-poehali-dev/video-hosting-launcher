import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface UploadVideoFormProps {
  onClose: () => void;
  onUploadSuccess: (video: any) => void;
}

export default function UploadVideoForm({ onClose, onUploadSuccess }: UploadVideoFormProps) {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Все');
  const [uploadProgress, setUploadProgress] = useState(0);

  const categories = ['Путешествия', 'Кулинария', 'Технологии', 'Спорт', 'Наука', 'Музыка', 'Игры', 'Образование'];

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 500 * 1024 * 1024) {
        toast({
          title: 'Ошибка',
          description: 'Размер видео не должен превышать 500 МБ',
          variant: 'destructive'
        });
        return;
      }
      setVideoFile(file);
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: 'Ошибка',
          description: 'Размер превью не должен превышать 5 МБ',
          variant: 'destructive'
        });
        return;
      }
      setThumbnailFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!videoFile || !title) {
      toast({
        title: 'Ошибка',
        description: 'Заполните обязательные поля',
        variant: 'destructive'
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 95) {
          clearInterval(progressInterval);
          return 95;
        }
        return prev + 5;
      });
    }, 200);

    setTimeout(() => {
      clearInterval(progressInterval);
      setUploadProgress(100);

      const thumbnailUrl = thumbnailFile 
        ? URL.createObjectURL(thumbnailFile)
        : 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=800&h=450&fit=crop';

      const newVideo = {
        id: Date.now(),
        title,
        thumbnail: thumbnailUrl,
        duration: '0:00',
        views: '0',
        author: 'Мой Профиль',
        authorAvatar: 'МП',
        uploadDate: 'только что',
        quality: ['360p', '720p', '1080p'],
        videoUrl: URL.createObjectURL(videoFile),
        description
      };

      onUploadSuccess(newVideo);

      toast({
        title: 'Успешно!',
        description: 'Видео загружено и опубликовано'
      });

      setIsUploading(false);
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 animate-scale-in">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Загрузить видео</h2>
          <Button size="icon" variant="ghost" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="video" className="text-base">
              Видеофайл <span className="text-destructive">*</span>
            </Label>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
              <input
                type="file"
                id="video"
                accept="video/*"
                onChange={handleVideoChange}
                className="hidden"
              />
              <label htmlFor="video" className="cursor-pointer">
                {videoFile ? (
                  <div className="space-y-2">
                    <Icon name="CheckCircle2" size={48} className="mx-auto text-primary" />
                    <p className="font-semibold">{videoFile.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(videoFile.size / (1024 * 1024)).toFixed(2)} МБ
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Icon name="Upload" size={48} className="mx-auto text-muted-foreground" />
                    <p className="font-semibold">Нажмите для выбора видео</p>
                    <p className="text-sm text-muted-foreground">Максимум 500 МБ</p>
                  </div>
                )}
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="thumbnail" className="text-base">Превью видео</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
              <input
                type="file"
                id="thumbnail"
                accept="image/*"
                onChange={handleThumbnailChange}
                className="hidden"
              />
              <label htmlFor="thumbnail" className="cursor-pointer">
                {thumbnailFile ? (
                  <div className="space-y-2">
                    <img 
                      src={URL.createObjectURL(thumbnailFile)} 
                      alt="Превью"
                      className="max-h-40 mx-auto rounded"
                    />
                    <p className="text-sm text-muted-foreground">{thumbnailFile.name}</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Icon name="Image" size={32} className="mx-auto text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Нажмите для выбора изображения (макс. 5 МБ)</p>
                  </div>
                )}
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title" className="text-base">
              Название <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              placeholder="Введите название видео"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={100}
              required
            />
            <p className="text-xs text-muted-foreground">{title.length}/100</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-base">Описание</Label>
            <Textarea
              id="description"
              placeholder="Расскажите о вашем видео..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              maxLength={500}
            />
            <p className="text-xs text-muted-foreground">{description.length}/500</p>
          </div>

          <div className="space-y-2">
            <Label className="text-base">Категория</Label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Badge
                  key={cat}
                  variant={category === cat ? 'default' : 'secondary'}
                  className="cursor-pointer hover-scale"
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </Badge>
              ))}
            </div>
          </div>

          {isUploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Загрузка...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full gradient-primary transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="flex-1 gradient-primary"
              disabled={isUploading || !videoFile || !title}
            >
              {isUploading ? (
                <>
                  <Icon name="Loader2" size={20} className="animate-spin mr-2" />
                  Загрузка...
                </>
              ) : (
                <>
                  <Icon name="Upload" size={20} className="mr-2" />
                  Загрузить видео
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isUploading}
            >
              Отмена
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
