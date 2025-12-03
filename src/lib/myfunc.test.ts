import sum from './myfunc';

describe('sum function', () => {
  // Basic functionality tests
  test('should add two positive numbers correctly', () => {
    expect(sum(2, 3)).toBe(5);
    expect(sum(10, 20)).toBe(30);
    expect(sum(100, 200)).toBe(300);
  });

  test('should add two negative numbers correctly', () => {
    expect(sum(-5, -3)).toBe(-8);
    expect(sum(-10, -20)).toBe(-30);
    expect(sum(-100, -50)).toBe(-150);
  });

  test('should handle mixed positive and negative numbers', () => {
    expect(sum(5, -3)).toBe(2);
    expect(sum(-10, 20)).toBe(10);
    expect(sum(100, -50)).toBe(50);
    expect(sum(-100, 50)).toBe(-50);
  });

  test('should handle zero correctly', () => {
    expect(sum(0, 0)).toBe(0);
    expect(sum(0, 5)).toBe(5);
    expect(sum(10, 0)).toBe(10);
    expect(sum(-5, 0)).toBe(-5);
  });

  // Decimal/float tests
  test('should add decimal numbers correctly', () => {
    expect(sum(1.5, 2.5)).toBe(4);
    expect(sum(0.1, 0.2)).toBeCloseTo(0.3, 10);
    expect(sum(3.14, 2.86)).toBeCloseTo(6, 1);
    expect(sum(-1.5, 3.7)).toBeCloseTo(2.2, 1);
  });

  // Large numbers
  test('should handle large numbers', () => {
    expect(sum(1000000, 2000000)).toBe(3000000);
    expect(sum(999999999, 1)).toBe(1000000000);
  });

  // Edge cases
  test('should handle very small decimal numbers', () => {
    expect(sum(0.0001, 0.0002)).toBeCloseTo(0.0003, 4);
  });

  test('should handle negative zero', () => {
    expect(sum(-0, 0)).toBe(0);
    expect(sum(0, -0)).toBe(0);
    
  });

  // Type consistency
  test('should return a number type', () => {
    expect(typeof sum(1, 2)).toBe('number');
    expect(typeof sum(-5, 10)).toBe('number');
    expect(typeof sum(0, 0)).toBe('number');
  });

  // Commutative property
  test('should be commutative (a + b = b + a)', () => {
    expect(sum(3, 7)).toBe(sum(7, 3));
    expect(sum(-5, 10)).toBe(sum(10, -5));
    expect(sum(1.5, 2.5)).toBe(sum(2.5, 1.5));
  });

  // Identity property
  test('should satisfy identity property (a + 0 = a)', () => {
    expect(sum(5, 0)).toBe(5);
    expect(sum(0, 5)).toBe(5);
    expect(sum(-10, 0)).toBe(-10);
  });
});
