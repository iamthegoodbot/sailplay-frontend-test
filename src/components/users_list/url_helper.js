export function serializeFiltersToUrl(filters) {
  return {
    q: filters.textQuery,
    start_date: filters.startDate.toLocaleDateString('en-CA'),
    end_date: filters.endDate.toLocaleDateString('en-CA'),
    pt_earned_start: filters.earnedPoints.start,
    pt_spent_start: filters.spentPoints.start,
    pt_earned_end: filters.earnedPoints.end,
    pt_spent_end: filters.spentPoints.end,
  }
}

export function deserializeFiltersFromUrl(query) {
  if (!query.start_date) { // means empty url query
    return {};
  }
  try {
    return {
      textQuery: query.q,
      startDate: new Date(query.start_date),
      endDate: new Date(query.end_date),
      earnedPoints: {
        start: query.pt_earned_start,
        end: query.pt_earned_end
      },
      spentPoints: {
        start: query.pt_spent_start,
        end: query.pt_spent_end
      }
    };
  }
  catch (e) {
    return {};
  }
}
