import { describe, it, expect, vi } from 'vitest';
import { render, screen, userEvent } from '@/test/utils';
import { Button } from '../Button';

describe('Button', () => {
  it('should render button with text', () => {
    render(<Button>Click me</Button>);

    expect(
      screen.getByRole('button', { name: /click me/i })
    ).toBeInTheDocument();
  });

  it('should handle click events', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>Click me</Button>);
    await user.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);

    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should be disabled when loading is true', () => {
    render(<Button loading>Click me</Button>);

    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should show loading spinner when loading', () => {
    render(<Button loading>Click me</Button>);

    // Loader2 component should be rendered
    const button = screen.getByRole('button');
    expect(button.querySelector('.animate-spin')).toBeInTheDocument();
  });

  it('should not call onClick when disabled', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(
      <Button disabled onClick={handleClick}>
        Click me
      </Button>
    );
    await user.click(screen.getByRole('button'));

    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should render with leftIcon', () => {
    render(
      <Button leftIcon={<span data-testid="left-icon">←</span>}>
        Click me
      </Button>
    );

    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
  });

  it('should render with rightIcon', () => {
    render(
      <Button rightIcon={<span data-testid="right-icon">→</span>}>
        Click me
      </Button>
    );

    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  it('should not show icons when loading', () => {
    render(
      <Button
        loading
        leftIcon={<span data-testid="left-icon">←</span>}
        rightIcon={<span data-testid="right-icon">→</span>}
      >
        Click me
      </Button>
    );

    expect(screen.queryByTestId('left-icon')).not.toBeInTheDocument();
    expect(screen.queryByTestId('right-icon')).not.toBeInTheDocument();
  });

  it('should apply fullWidth class when fullWidth is true', () => {
    render(<Button fullWidth>Click me</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('w-full');
  });

  describe('variants', () => {
    it('should apply primary variant styles', () => {
      render(<Button variant="primary">Click me</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-primary');
    });

    it('should apply outline variant styles', () => {
      render(<Button variant="outline">Click me</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('border', 'border-primary');
    });

    it('should apply ghost variant styles', () => {
      render(<Button variant="ghost">Click me</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('hover:bg-accent');
    });

    it('should apply social variant styles', () => {
      render(<Button variant="social">Click me</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-card');
    });
  });

  describe('sizes', () => {
    it('should apply small size styles', () => {
      render(<Button size="sm">Click me</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('h-9');
    });

    it('should apply large size styles', () => {
      render(<Button size="lg">Click me</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('h-12');
    });

    it('should apply icon size styles', () => {
      render(<Button size="icon">🔍</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('h-9', 'w-9');
    });
  });

  it('should merge custom className with default styles', () => {
    render(<Button className="custom-class">Click me</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });
});
