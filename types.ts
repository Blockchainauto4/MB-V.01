
export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  image?: string; // Base64 string of the captured image
  analysis?: VisagismAnalysis; // Structured analysis data
  generatedImage?: string; // URL or Base64 of the generated style preview
  originalPrompt?: string; // The prompt used to create the generatedImage (for history/refining)
  isFinalImage?: boolean; // To distinguish high-quality DALL-E 2 images
  formula?: TechnicalFormula; // New: Technical prescription data
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

export interface TechnicalFormula {
  startingLevel: string;
  targetLevel: string;
  process: {
    step: number;
    title: string;
    description: string;
    products: string[]; // e.g., ["Majirel 7.1", "Ox 20vol"]
    time: string; // e.g., "35 min"
  }[];
  maintenance: string;
  estimatedCost: string; // Symbolic, e.g., "$$$"
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
  WEDDING = 'Bridal',
  LOGS = 'SystemLogs'
}

export type Language = 'en' | 'pt' | 'es' | 'de' | 'fr' | 'it';
