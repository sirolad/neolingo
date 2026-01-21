import type { BaseEntity } from './common';

// NeoCommunity interface
export interface NeoCommunity extends BaseEntity {
  name: string;
  short: string;
  flagIcon: string; // URL or icon name
}

// Language interface
export interface Language extends BaseEntity {
  name: string;
  is_supported: boolean;
  icon: string; // URL or icon name
}
