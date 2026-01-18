// Bangladesh EPI Vaccine Schedule
// Note: Bangladesh EPI uses day 45 for first dose (6 weeks), with 28-day intervals for subsequent doses
export const BD_EPI_SCHEDULE = [
  {
    key: "bcg",
    day: 0,
    label: "BCG + OPV 0",
    shortLabel: "BCG",
    ageLabel: "At Birth",
    ageDays: "Day 0"
  },
  {
    key: "penta1",
    day: 45,
    label: "Pentavalent 1 + OPV 1 + PCV 1",
    shortLabel: "Penta 1",
    ageLabel: "6 weeks",
    ageDays: "45 days"
  },
  {
    key: "penta2",
    day: 73,
    label: "Pentavalent 2 + OPV 2 + PCV 2",
    shortLabel: "Penta 2",
    ageLabel: "10 weeks",
    ageDays: "73 days"
  },
  {
    key: "penta3",
    day: 101,
    label: "Pentavalent 3 + OPV 3 + PCV 3",
    shortLabel: "Penta 3",
    ageLabel: "14 weeks",
    ageDays: "101 days"
  },
  {
    key: "mr1",
    day: 270,
    label: "MR (Measles-Rubella)",
    shortLabel: "MR 1",
    ageLabel: "9 months",
    ageDays: "270 days"
  },
  {
    key: "mr2",
    day: 450,
    label: "MR 2",
    shortLabel: "MR 2",
    ageLabel: "15 months",
    ageDays: "450 days"
  }
];

// Vaccine status types
export const VACCINE_STATUS = {
  COMPLETED: 'completed',
  DUE: 'due',
  UPCOMING: 'upcoming',
  OVERDUE: 'overdue'
};

// Status colors
export const STATUS_COLORS = {
  [VACCINE_STATUS.COMPLETED]: 'text-green-600 bg-green-50',
  [VACCINE_STATUS.DUE]: 'text-orange-600 bg-orange-50',
  [VACCINE_STATUS.UPCOMING]: 'text-blue-600 bg-blue-50',
  [VACCINE_STATUS.OVERDUE]: 'text-red-600 bg-red-50'
};

// Status icons
export const STATUS_ICONS = {
  [VACCINE_STATUS.COMPLETED]: '✅',
  [VACCINE_STATUS.DUE]: '⏳',
  [VACCINE_STATUS.UPCOMING]: '🔵',
  [VACCINE_STATUS.OVERDUE]: '⚠️'
};
