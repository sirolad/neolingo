import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import NeoLanguageSetupPage from '../page';
import {
  getTargetLanguages,
  getUserLanguageAndCommunity,
} from '@/actions/language';
import { getCurrentUser } from '@/lib/supabase/server';

// Mock the client component
vi.mock('@/components/NeoLanguage', () => {
  return {
    default: function MockNeoLanguage({
      languages,
      initialSelectedId,
    }: {
      languages: any[];
      initialSelectedId: number | null;
    }) {
      return (
        <div data-testid="neo-language-component">
          <span data-testid="languages-count">{languages?.length || 0}</span>
          <span data-testid="initial-id">
            {initialSelectedId === null ? 'null' : initialSelectedId}
          </span>
        </div>
      );
    },
  };
});

// Mock server actions
vi.mock('@/actions/language', () => ({
  getTargetLanguages: vi.fn(),
  getUserLanguageAndCommunity: vi.fn(),
}));

vi.mock('@/lib/supabase/server', () => ({
  getCurrentUser: vi.fn(),
}));

describe('NeoLanguageSetupPage', () => {
  const mockLanguages = [
    { id: 1, name: 'Yoruba' },
    { id: 2, name: 'Igbo' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders NeoLanguage with fetched data when user is logged in', async () => {
    // Setup mocks
    (getTargetLanguages as ReturnType<typeof vi.fn>).mockResolvedValue({
      data: mockLanguages,
    });
    (getCurrentUser as ReturnType<typeof vi.fn>).mockResolvedValue({
      id: 'user-123',
    });
    (getUserLanguageAndCommunity as ReturnType<typeof vi.fn>).mockResolvedValue(
      {
        extra: { targetLanguageId: 2 },
      }
    );

    // Call the component directly as it's an async server component
    const component = await NeoLanguageSetupPage();

    // Render the returned JSX
    render(component);

    expect(getTargetLanguages).toHaveBeenCalled();
    expect(getCurrentUser).toHaveBeenCalled();
    expect(getUserLanguageAndCommunity).toHaveBeenCalledWith('user-123');

    expect(screen.getByTestId('neo-language-component')).toBeInTheDocument();
    expect(screen.getByTestId('languages-count')).toHaveTextContent('2');
    expect(screen.getByTestId('initial-id')).toHaveTextContent('2');
  });

  it('renders NeoLanguage with null initialId when user is not logged in', async () => {
    // Setup mocks
    (getTargetLanguages as ReturnType<typeof vi.fn>).mockResolvedValue({
      data: mockLanguages,
    });
    (getCurrentUser as ReturnType<typeof vi.fn>).mockResolvedValue(null);

    // Call the component directly
    const component = await NeoLanguageSetupPage();

    // Render the returned JSX
    render(component);

    expect(getTargetLanguages).toHaveBeenCalled();
    expect(getCurrentUser).toHaveBeenCalled();
    expect(getUserLanguageAndCommunity).not.toHaveBeenCalled();

    expect(screen.getByTestId('neo-language-component')).toBeInTheDocument();
    expect(screen.getByTestId('languages-count')).toHaveTextContent('2');
    expect(screen.getByTestId('initial-id')).toHaveTextContent('null');
  });

  it('handles empty languages list', async () => {
    // Setup mocks
    (getTargetLanguages as ReturnType<typeof vi.fn>).mockResolvedValue({
      data: null,
    });
    (getCurrentUser as ReturnType<typeof vi.fn>).mockResolvedValue(null);

    // Call the component directly
    const component = await NeoLanguageSetupPage();

    // Render the returned JSX
    render(component);

    expect(screen.getByTestId('languages-count')).toHaveTextContent('0');
  });
});
