import { useState } from 'react';
import Header from '@/components/Header';
import VideoPlayer from '@/components/VideoPlayer';
import VideoContent from '@/components/VideoContent';
import UploadVideoForm from '@/components/UploadVideoForm';
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog';
import { useToast } from '@/hooks/use-toast';
import type { ViewType } from '@/components/Header';
import type { Video } from '@/components/VideoCard';

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
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [activeView, setActiveView] = useState<ViewType>('home');
  const [selectedVideo, setSelectedVideo] = useState(mockVideos[0]);
  const [videoQuality, setVideoQuality] = useState('1080p');
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState<Video | null>(null);
  const [videos, setVideos] = useState(mockVideos);

  const handleUploadSuccess = (newVideo: Video) => {
    setVideos([newVideo, ...videos]);
  };

  const handleDeleteVideo = (videoId: number) => {
    const video = videos.find(v => v.id === videoId);
    if (video) {
      setVideoToDelete(video);
      setShowDeleteDialog(true);
    }
  };

  const confirmDelete = () => {
    if (videoToDelete) {
      setVideos(videos.filter(v => v.id !== videoToDelete.id));
      toast({
        title: 'Видео удалено',
        description: 'Видео успешно удалено из каталога'
      });
      if (selectedVideo.id === videoToDelete.id) {
        setActiveView('profile');
      }
      setShowDeleteDialog(false);
      setVideoToDelete(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeView={activeView}
        setActiveView={setActiveView}
        onUploadClick={() => setShowUploadForm(true)}
      />

      {showUploadForm && (
        <UploadVideoForm
          onClose={() => setShowUploadForm(false)}
          onUploadSuccess={handleUploadSuccess}
        />
      )}

      {showDeleteDialog && videoToDelete && (
        <DeleteConfirmDialog
          videoTitle={videoToDelete.title}
          onConfirm={confirmDelete}
          onCancel={() => {
            setShowDeleteDialog(false);
            setVideoToDelete(null);
          }}
        />
      )}

      {activeView === 'player' && (
        <VideoPlayer 
          selectedVideo={selectedVideo}
          videoQuality={videoQuality}
          setVideoQuality={setVideoQuality}
          mockVideos={videos}
          setSelectedVideo={setSelectedVideo}
        />
      )}

      {(activeView === 'home' || activeView === 'catalog' || activeView === 'favorites' || activeView === 'profile') && (
        <VideoContent 
          activeView={activeView}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
          mockVideos={videos}
          setActiveView={setActiveView}
          setSelectedVideo={setSelectedVideo}
          onDeleteVideo={handleDeleteVideo}
        />
      )}
    </div>
  );
}