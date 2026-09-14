import { describe, expect, it } from 'vitest';
import { buildQueryHref } from './build-query-href';

describe('buildQueryHref', () => {
  it('добавляет параметр к текущим', () => {
    const href = buildQueryHref(new URLSearchParams('category=rifle'), { sort: 'name' });

    expect(href).toBe('/?category=rifle&sort=name');
  });

  it('убирает параметр с пустым значением', () => {
    const href = buildQueryHref(new URLSearchParams('category=rifle&sort=name'), { category: '' });

    expect(href).toBe('/?sort=name');
  });

  it('всегда сбрасывает номер страницы', () => {
    const href = buildQueryHref(new URLSearchParams('page=3&category=rifle'), { sort: 'name' });

    expect(href).toBe('/?category=rifle&sort=name');
  });

  it('возвращает адрес без строки запроса, когда параметров не осталось', () => {
    expect(buildQueryHref(new URLSearchParams('search=beretta'), { search: '' })).toBe('/');
  });

  it('обрезает пробелы в значениях', () => {
    expect(buildQueryHref(new URLSearchParams(), { search: '  beretta  ' })).toBe(
      '/?search=beretta'
    );
    expect(buildQueryHref(new URLSearchParams('search=x'), { search: '   ' })).toBe('/');
  });
});
