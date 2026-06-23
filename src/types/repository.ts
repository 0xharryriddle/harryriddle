export interface Repository {
  name: string;
  description: string;
  url: string;
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
  updatedAt: string;
  stars: number;
  forks: number;
  isPinned: boolean;
}
