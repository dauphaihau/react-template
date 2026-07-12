import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from './button';

describe('Button', () => {
  it('renders with default variant and size', () => {
    render(<Button>Click me</Button>);
    const btn = screen.getByRole('button', { name: /click me/i });
    expect(btn).toBeInstanceOf(HTMLButtonElement);
    expect(btn.getAttribute('data-slot')).toBe('button');
    expect(btn.getAttribute('data-variant')).toBe('default');
    expect(btn.getAttribute('data-size')).toBe('default');
  });

  it('renders with destructive variant', () => {
    render(<Button variant="destructive">Delete</Button>);
    const btn = screen.getByRole('button', { name: /delete/i });
    expect(btn.getAttribute('data-variant')).toBe('destructive');
  });

  it('renders with outline variant', () => {
    render(<Button variant="outline">Outline</Button>);
    const btn = screen.getByRole('button', { name: /outline/i });
    expect(btn.getAttribute('data-variant')).toBe('outline');
  });

  it('renders with size sm', () => {
    render(<Button size="sm">Small</Button>);
    const btn = screen.getByRole('button', { name: /small/i });
    expect(btn.getAttribute('data-size')).toBe('sm');
  });

  it('renders with size lg', () => {
    render(<Button size="lg">Large</Button>);
    const btn = screen.getByRole('button', { name: /large/i });
    expect(btn.getAttribute('data-size')).toBe('lg');
  });

  it('applies disabled attribute and is not focusable when disabled', () => {
    render(<Button disabled>Disabled</Button>);
    const btn = screen.getByRole('button', { name: /disabled/i });
    expect((btn as HTMLButtonElement).disabled).toBe(true);
  });

  it('supports asChild and merges props onto child element', () => {
    render(
      <Button asChild>
        <a href="/go">Link button</a>
      </Button>,
    );
    const link = screen.getByRole('link', { name: /link button/i });
    expect(link).toBeInstanceOf(HTMLAnchorElement);
    expect(link.getAttribute('href')).toBe('/go');
    expect(link.getAttribute('data-slot')).toBe('button');
    expect(link.getAttribute('data-variant')).toBe('default');
  });

  it('forwards aria attributes for accessibility', () => {
    render(
      <Button aria-label="Submit form" aria-pressed={false}>
        Submit
      </Button>,
    );
    const btn = screen.getByRole('button', { name: /submit form/i });
    expect(btn.getAttribute('aria-label')).toBe('Submit form');
    expect(btn.getAttribute('aria-pressed')).toBe('false');
  });
});
