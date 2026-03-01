import { describe, it, expect } from 'vitest';
import { cn, mergeRefs } from './utils';

describe('cn', () => {
  it('returns empty string when given no arguments', () => {
    expect(cn()).toBe('');
  });

  it('returns the class string when given a single class', () => {
    expect(cn('foo')).toBe('foo');
  });

  it('returns merged class string when given multiple inputs', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('ignores undefined and null and returns valid classes', () => {
    expect(cn('foo', undefined, 'bar', null)).toBe('foo bar');
  });

  it('handles conditional classes via object form', () => {
    expect(cn({ foo: true, bar: false, baz: true })).toBe('foo baz');
  });

  it('handles mixed inputs including arrays', () => {
    expect(cn(['foo', 'bar'], 'baz')).toBe('foo bar baz');
  });

  it('merges tailwind classes correctly (twMerge)', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4');
  });
});

describe('mergeRefs', () => {
  it('invokes callback ref with value', () => {
    let received: HTMLDivElement | null = null;
    const cb = (value: HTMLDivElement | null) => {
      received = value;
    };
    const merged = mergeRefs<HTMLDivElement>(cb);
    const el = document.createElement('div');
    merged(el);
    expect(received).toBe(el);
  });

  it('invokes callback ref with null when passed null', () => {
    let received: HTMLDivElement | null = null;
    const cb = (value: HTMLDivElement | null) => {
      received = value;
    };
    const merged = mergeRefs<HTMLDivElement>(cb);
    merged(null);
    expect(received).toBeNull();
  });

  it('assigns value to object ref', () => {
    const ref = { current: null as HTMLDivElement | null };
    const merged = mergeRefs<HTMLDivElement>(ref);
    const el = document.createElement('div');
    merged(el);
    expect(ref.current).toBe(el);
  });

  it('assigns null to object ref when passed null', () => {
    const ref = { current: null as HTMLDivElement | null };
    const merged = mergeRefs<HTMLDivElement>(ref);
    merged(null);
    expect(ref.current).toBeNull();
  });

  it('ignores undefined refs without throwing', () => {
    const ref = { current: null as HTMLDivElement | null };
    const merged = mergeRefs<HTMLDivElement>(undefined, ref, undefined);
    const el = document.createElement('div');
    merged(el);
    expect(ref.current).toBe(el);
  });

  it('updates both callback and object ref when given mixed refs', () => {
    let callbackValue: HTMLDivElement | null = null;
    const objRef = { current: null as HTMLDivElement | null };
    const merged = mergeRefs<HTMLDivElement>(
      (el) => { callbackValue = el },
      objRef
    );
    const el = document.createElement('div');
    merged(el);
    expect(callbackValue).toBe(el);
    expect(objRef.current).toBe(el);
  });
});
