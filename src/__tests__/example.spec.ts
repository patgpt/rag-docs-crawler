import { describe, it, expect } from 'bun:test';

describe('Example Test Suite', () => {
  it('should pass', () => {
    expect(1 + 1).toBe(2);
  });

  it('should fail', () => {
    expect(1 + 1).not.toBe(3);
  });
});