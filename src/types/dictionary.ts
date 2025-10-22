import type { BaseEntity } from './common';

// Dictionary word interface
export interface DictionaryWord extends BaseEntity {
  word: string;
  translation: string;
  definition: string;
  pronunciation?: string;
  examples?: string[];
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  category?: string;
  tags?: string[];
}

// Word suggestion interface for voting
export interface WordSuggestion extends BaseEntity {
  word: string;
  translation: string;
  definition: string;
  submittedBy: string;
  votes: number;
  status: 'pending' | 'approved' | 'rejected';
  category?: string;
  examples?: string[];
}

// Word card interface for display
export interface WordCard {
  id: string;
  word: string;
  translation: string;
  definition: string;
  category?: string;
  difficulty?: string;
}

// Suggestion form interface
export interface SuggestionForm {
  word: string;
  translation: string;
  definition: string;
  category?: string;
  examples?: string[];
}

// Dictionary search filters
export interface DictionaryFilters {
  category?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  search?: string;
  tags?: string[];
}

// Language option interface
export interface LanguageOption {
  code: string;
  name: string;
  flag: string;
  nativeName: string;
}

// Neo language option interface
export interface NeoLanguageOption {
  id: string;
  name: string;
  description: string;
  color: string;
}
