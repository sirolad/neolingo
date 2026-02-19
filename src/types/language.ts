export interface LanguageColumns {
  id: number;
  name: string;
  icon: string | null;
}

export interface Language {
  id: number;
  name: string;
  code: string;
  short: string | null;
  type: string;
  icon: string | null;
  description: string | null;
  is_supported: boolean;
  metadata: unknown;
}
