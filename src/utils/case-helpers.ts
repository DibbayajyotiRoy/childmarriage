import { Case } from '../data/cases'; // We'll define this type in the next step

/**
 * Calculates the real-time, effective status of a case based on its properties
 * and the current date. This is the core logic for the new feature.
 * @param {Case} caseItem - The case object from our data source.
 * @returns {string} The calculated, effective status.
 */
export const getEffectiveCaseStatus = (caseItem: Case): string => {
  // A resolved case is always resolved.
  if (caseItem.status === 'Resolved') {
    return 'Resolved';
  }
  
  // An active investigation remains active.
  if (caseItem.status === 'Under Investigation') {
    return 'Under Investigation';
  }

  // This is where the new dynamic logic applies.
  if (caseItem.status === 'Reported') {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to the start of the day for accurate comparison

    const marriageDate = new Date(caseItem.marriageDate);

    // If the marriage date is in the future, it's "Pending Investigation".
    if (marriageDate > today) {
      return 'Pending Investigation';
    } else {
      // If the marriage date is today or in the past, it automatically becomes active.
      return 'Under Investigation';
    }
  }

  // Fallback to the original status if none of the above conditions are met.
  return caseItem.status;
};