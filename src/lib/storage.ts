export interface UserData {
  likes: Set<number>;
  subscriptions: Set<string>;
  favorites: Set<number>;
  queue: number[];
}

export interface ProfileData {
  name: string;
  bio: string;
  avatar: string;
}

const STORAGE_KEY = 'videohost_user_data';
const PROFILE_KEY = 'videohost_profile';

export const storage = {
  getUserData(): UserData {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      return {
        likes: new Set(),
        subscriptions: new Set(),
        favorites: new Set(),
        queue: []
      };
    }
    
    const parsed = JSON.parse(data);
    return {
      likes: new Set(parsed.likes || []),
      subscriptions: new Set(parsed.subscriptions || []),
      favorites: new Set(parsed.favorites || []),
      queue: parsed.queue || []
    };
  },

  saveUserData(data: UserData) {
    const serialized = {
      likes: Array.from(data.likes),
      subscriptions: Array.from(data.subscriptions),
      favorites: Array.from(data.favorites),
      queue: data.queue
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(serialized));
  },

  toggleLike(videoId: number): boolean {
    const data = this.getUserData();
    if (data.likes.has(videoId)) {
      data.likes.delete(videoId);
      this.saveUserData(data);
      return false;
    } else {
      data.likes.add(videoId);
      this.saveUserData(data);
      return true;
    }
  },

  isLiked(videoId: number): boolean {
    const data = this.getUserData();
    return data.likes.has(videoId);
  },

  getLikesCount(videoId: number): number {
    return this.isLiked(videoId) ? 15001 : 15000;
  },

  toggleSubscription(author: string): boolean {
    const data = this.getUserData();
    if (data.subscriptions.has(author)) {
      data.subscriptions.delete(author);
      this.saveUserData(data);
      return false;
    } else {
      data.subscriptions.add(author);
      this.saveUserData(data);
      return true;
    }
  },

  isSubscribed(author: string): boolean {
    const data = this.getUserData();
    return data.subscriptions.has(author);
  },

  toggleFavorite(videoId: number): boolean {
    const data = this.getUserData();
    if (data.favorites.has(videoId)) {
      data.favorites.delete(videoId);
      this.saveUserData(data);
      return false;
    } else {
      data.favorites.add(videoId);
      this.saveUserData(data);
      return true;
    }
  },

  isFavorite(videoId: number): boolean {
    const data = this.getUserData();
    return data.favorites.has(videoId);
  },

  getFavoriteVideos(): number[] {
    const data = this.getUserData();
    return Array.from(data.favorites);
  },

  addToQueue(videoId: number) {
    const data = this.getUserData();
    if (!data.queue.includes(videoId)) {
      data.queue.push(videoId);
      this.saveUserData(data);
    }
  },

  getQueue(): number[] {
    const data = this.getUserData();
    return data.queue;
  },

  getProfile(): ProfileData {
    const data = localStorage.getItem(PROFILE_KEY);
    if (!data) {
      return {
        name: 'Мой Профиль',
        bio: 'Пользователь с 2024 года',
        avatar: 'МП'
      };
    }
    return JSON.parse(data);
  },

  saveProfile(profile: ProfileData) {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  }
};