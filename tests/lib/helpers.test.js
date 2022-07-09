import { booleanToString, dotget, dotset, getPathSegments, hashString, isEmpty, isObject, yn } from '@/lib/helpers';

it('determines if a string is truthy or falsy', () => {
    expect(yn('y')).toBe(true);
    expect(yn('yes')).toBe(true);
    expect(yn('true')).toBe(true);
    expect(yn('1')).toBe(true);
    expect(yn('on')).toBe(true);
    expect(yn('n')).toBe(false);
    expect(yn('no')).toBe(false);
    expect(yn('false')).toBe(false);
    expect(yn('0')).toBe(false);
    expect(yn('off')).toBe(false);
    expect(yn('foo')).toBe(undefined);
    expect(yn('foo', { default: true })).toBe(true);
    expect(yn('foo', { default: false })).toBe(false);
    expect(() => yn('foo', { default: 'foo' })).toThrow(TypeError);
    expect(yn(undefined)).toBe(undefined);
    expect(yn(undefined, { default: true })).toBe(true);
    expect(yn(undefined, { default: false })).toBe(false);
    expect(() => yn(undefined, { default: 'foo' })).toThrow(TypeError);
    expect(yn(null)).toBe(undefined);
    expect(yn(null, { default: true })).toBe(true);
    expect(yn(null, { default: false })).toBe(false);
});

it('should hash a string', () => {
    const str = 'hello world';
    const hashedStr = hashString(str);
    expect(hashedStr).toBe('b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9');
});

it('sets an objects value using dot notation', () => {
    const object = {};
    const path = 'a.b.c';
    const value = 'test';

    const result = dotset(object, path, value);

    expect(result).toEqual({ a: { b: { c: 'test' } } });
});

it('gets the value of an objects property using dot notation', () => {
    const object = { a: { b: { c: 'CC' } } };

    expect(dotget(object, 'a.b.c')).toBe('CC');
    expect(dotget(object, 'a.b.c.d')).toBe(undefined);
});

it('determines if a value is empty', () => {
    expect(isEmpty('')).toBe(true);
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty(undefined)).toBe(true);
    expect(isEmpty('hello')).toBe(false);
    expect(isEmpty(0)).toBe(false);
    expect(isEmpty(false)).toBe(false);
});

it('converts a boolean to a string', () => {
    expect(booleanToString(true)).toBe('true');
    expect(booleanToString(false)).toBe('false');
});

it('checks if a value is an object', () => {
    expect(isObject({})).toBe(true);
    expect(isObject(null)).toBe(false);
    expect(isObject(undefined)).toBe(false);
    expect(isObject(() => {})).toBe(true);
    expect(isObject(1)).toBe(false);
    expect(isObject('string')).toBe(false);
});

it('returns an array of segments from a dot-notation string', () => {
    const path = 'a.b.c';
    const expected = ['a', 'b', 'c'];
    const actual = getPathSegments(path);
    expect(actual).toEqual(expected);
});
