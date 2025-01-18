export interface LandingContent {
  id: string;
  section: string;
  title: string;
  description: string | null;
  image_url: string | null;
  button_text: string | null;
  button_link: string | null;
  order_index: number;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string | null;
  role: string | null;
  avatar_url: string | null;
  content: string;
  rating: number;
}