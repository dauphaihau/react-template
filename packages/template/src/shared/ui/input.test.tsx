import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Input } from './input';

describe('Input', () => {
  it('renders an input with data-slot', () => {
    render(<Input placeholder="Enter text" />);
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeInstanceOf(HTMLInputElement);
    expect(input.getAttribute('data-slot')).toBe('input');
  });

  it('applies custom className', () => {
    render(<Input className="custom-class" data-testid="input" />);
    const input = screen.getByTestId('input');
    expect(input.className).toContain('custom-class');
  });

  it('forwards type attribute', () => {
    render(<Input type="email" placeholder="Email" />);
    const input = screen.getByPlaceholderText('Email');
    expect(input.getAttribute('type')).toBe('email');
  });

  it('forwards other props to the native input', () => {
    render(
      <Input
        name="username"
        id="user-id"
        disabled
        placeholder="Username"
      />
    );
    const input = screen.getByPlaceholderText('Username');
    expect(input.getAttribute('name')).toBe('username');
    expect(input.getAttribute('id')).toBe('user-id');
    expect((input as HTMLInputElement).disabled).toBe(true);
  });

  it('defaults to text type when type is not provided', () => {
    render(<Input placeholder="Text" />);
    const input = screen.getByPlaceholderText('Text');
    // HTML input defaults to "text" when type is omitted
    expect(input.getAttribute('type') === 'text' || input.getAttribute('type') === null).toBe(true);
  });
});
