export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  image?: string; // Base64 string of the captured image
  analysis?: VisagismAnalysis; // Structured analysis data
  generatedImage?: string; // URL or Base64 of the generated style preview
}

export interface VisagismAnalysis {
  faceShape: string;
  skinTone: string;
  eyeColor: string;
  bestColors: string[];
  hairSuggestion: string;
  reasoning: string;
  imageGenerationPrompt: string; // Technical prompt for the image generator
}

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
}

export interface Swatch {
  id: string;
  code: string;
  name: string;
  color: string;
  family: string;
}

export enum Tab {
  CONSULTATION = 'Consultation',
  EXPLORE = 'Explore',
  CATALOGUE = 'Catalogue',
  WEDDING = 'Bridal'
}