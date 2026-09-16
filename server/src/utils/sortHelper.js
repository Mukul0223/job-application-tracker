const SORT_FIELD_WHITELIST = {
  date: 'applicationDate',
  company: 'companyName',
};

const DEFAULT_SORT_FIELD = 'applicationDate';

function buildSortQuery(sortBy, sortOrder) {
  const field = SORT_FIELD_WHITELIST[sortBy] || DEFAULT_SORT_FIELD;
  const direction = String(sortOrder).toLowerCase() === 'asc' ? 1 : -1;

  return { [field]: direction };
}

module.exports = { SORT_FIELD_WHITELIST, DEFAULT_SORT_FIELD, buildSortQuery };
