export interface Post {
    id: number;
    user_id: number;
    category_id: number;
    date: Date;
    title: string;
    image_path: string;
    rating: number;
    content: string;
  }
  