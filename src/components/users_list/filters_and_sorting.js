export function sort(usersList, sortType, isAsc) {
  const getValue = {
    pointsEarned(item) {
      return item.points_earned;
    },
    name(item) {
      return item.name.toLowerCase();
    },
    registrationDate(item) {
      return (new Date(item.registration_date)).getTime();
    }
  };
  return usersList.sort((a, b) => {
    const valueA = getValue[sortType](a);
    const valueB = getValue[sortType](b);
    if (valueA < valueB) {
      return isAsc ? -1 : 1;
    } else if (valueA > valueB) {
      return isAsc ? 1 : -1
    }
    return 0;
  })
}

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
