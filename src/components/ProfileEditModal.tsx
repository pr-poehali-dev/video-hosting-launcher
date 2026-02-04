import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface ProfileEditModalProps {
  onClose: () => void;
  currentProfile: {
    name: string;
    bio: string;
    avatar: string;
  };
  onSave: (profile: { name: string; bio: string; avatar: string }) => void;
}

export default function ProfileEditModal({ onClose, currentProfile, onSave }: ProfileEditModalProps) {
  const { toast } = useToast();
  const [name, setName] = useState(currentProfile.name);
  const [bio, setBio] = useState(currentProfile.bio);
  const [avatar, setAvatar] = useState(currentProfile.avatar);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast({
        title: 'Ошибка',
        description: 'Имя не может быть пустым',
        variant: 'destructive'
      });
      return;
    }

    onSave({ name, bio, avatar });
    toast({
      title: 'Успешно!',
      description: 'Профиль обновлен'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <Card className="max-w-lg w-full p-6 animate-scale-in">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Редактировать профиль</h2>
          <Button size="icon" variant="ghost" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-base">
              Имя <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              placeholder="Ваше имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={50}
              required
            />
            <p className="text-xs text-muted-foreground">{name.length}/50</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="avatar" className="text-base">Аватар (инициалы)</Label>
            <Input
              id="avatar"
              placeholder="МП"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value.toUpperCase())}
              maxLength={2}
            />
            <p className="text-xs text-muted-foreground">До 2 символов</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio" className="text-base">О себе</Label>
            <Textarea
              id="bio"
              placeholder="Расскажите о себе..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              maxLength={200}
            />
            <p className="text-xs text-muted-foreground">{bio.length}/200</p>
          </div>

          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Отмена
            </Button>
            <Button type="submit" className="flex-1 gradient-primary">
              Сохранить
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
