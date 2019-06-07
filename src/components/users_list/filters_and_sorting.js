export function filterByTextQuery(item, filters) {
  if (!filters.textQuery) {
    return true;
  }
  return item.name.toLowerCase().indexOf(filters.textQuery) !== -1;
}

export function filterByDates(item, filters) {
  const startTime = filters.startDate.getTime();
  const endTime = filters.endDate.getTime();
  const dateTime = (new Date(item.registration_date)).getTime();
  return dateTime >= startTime && dateTime <= endTime;
}

export function filterByEarnedPoints(item, filters) {
  const {start, end} = filters.earnedPoints;
  return item.points_earned >= start && item.points_earned <= end;
}

export function filterBySpentPoints(item, filters) {
  const {start, end} = filters.spentPoints;
  return item.points_spent >= start && item.points_spent <= end;
}

export function filter(usersList, filters) {
  const filtersList = [
    filterByTextQuery,
    filterByDates,
    filterByEarnedPoints,
    filterBySpentPoints
  ];
  return usersList.filter((item) => {
    return filtersList.every((fn) => {
      return fn(item, filters);
    });
  });
}
