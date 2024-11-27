import { buildFilters } from '../js/axios/index';

describe('buildFilters Function', () => {
  it('returns correct filters for default values', () => {
    const filters = buildFilters({});
    expect(filters).toEqual(['min=undefined', 'max=undefined']);
  });

  it('returns correct filters for text search', () => {
    const filters = buildFilters({ text: 'test' });
    expect(filters).toEqual(['text=test', 'min=undefined', 'max=undefined']);
  });

  it('returns correct filters for priority', () => {
    const filters = buildFilters({ getByPriority: 'Low' });
    expect(filters).toEqual(['getBy=Low', 'min=undefined', 'max=undefined']);
  });

  it('returns correct filters for multiple parameters', () => {
    const filters = buildFilters({ text: 'test', getByPriority: 'Medium', getByStatus: 1, sortByPriority: 'asc', sortByDate: 'desc' });
    expect(filters).toEqual(['text=test', 'getBy=Medium', 'sortByDone=true', 'sortByPriority=asc', 'sortByDate=desc', 'min=undefined', 'max=undefined']);
  });


});