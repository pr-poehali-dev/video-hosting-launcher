import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface DeleteConfirmDialogProps {
  onConfirm: () => void;
  onCancel: () => void;
  videoTitle: string;
}

export default function DeleteConfirmDialog({ onConfirm, onCancel, videoTitle }: DeleteConfirmDialogProps) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <Card className="max-w-md w-full p-6 animate-scale-in">
        <div className="flex items-start gap-4 mb-4">
          <div className="h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
            <Icon name="AlertTriangle" size={20} className="text-destructive" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-2">Удалить видео?</h3>
            <p className="text-sm text-muted-foreground mb-1">
              Вы действительно хотите удалить видео:
            </p>
            <p className="text-sm font-semibold">"{videoTitle}"</p>
            <p className="text-sm text-muted-foreground mt-2">
              Это действие нельзя отменить.
            </p>
          </div>
        </div>
        
        <div className="flex gap-3 mt-6">
          <Button 
            variant="outline" 
            onClick={onCancel}
            className="flex-1"
          >
            Отмена
          </Button>
          <Button 
            variant="destructive" 
            onClick={onConfirm}
            className="flex-1 gap-2"
          >
            <Icon name="Trash2" size={16} />
            Удалить
          </Button>
        </div>
      </Card>
    </div>
  );
}
