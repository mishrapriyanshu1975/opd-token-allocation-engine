// Handles token allocation based on slot capacity and patient priority
// Priority mapping: higher number = higher priority

const PRIORITY_MAP = {
  Emergency: 5,
  Paid: 4,
  'Follow-up': 3,
  Online: 2,
  'Walk-in': 1
};

function allocateToken(slot, token) {
  const currentCount = slot.tokens.length;
  const isEmergency = token.patientType === 'Emergency';

  const emergencyLimit = slot.maxCapacity + 1;
  const hasCapacity = currentCount < slot.maxCapacity;
  const canExceedCapacity = isEmergency && currentCount < emergencyLimit;

  // Case 1: Slot has space OR emergency allowed to exceed by one
  if (hasCapacity || canExceedCapacity) {
    slot.tokens.push(token);
    return { status: 'allocated', token };
  }

  // Case 2: Slot full → find lowest priority token
  let lowestPriorityIndex = -1;
  let lowestPriorityValue = Infinity;

  for (let i = 0; i < slot.tokens.length; i++) {
    const existingToken = slot.tokens[i];
    const priority = PRIORITY_MAP[existingToken.patientType] || 0;

    if (priority < lowestPriorityValue) {
      lowestPriorityValue = priority;
      lowestPriorityIndex = i;
    }
  }

  const newTokenPriority = PRIORITY_MAP[token.patientType] || 0;

  // Case 3: Replace lower priority token
  if (newTokenPriority > lowestPriorityValue) {
    const replacedToken = slot.tokens[lowestPriorityIndex];
    slot.tokens[lowestPriorityIndex] = token;
    slot.waitlist.push(replacedToken);

    return {
      status: 'allocated',
      token,
      replaced: replacedToken
    };
  }

  // Case 4: Cannot allocate → waitlist
  slot.waitlist.push(token);
  return { status: 'waitlisted', token };
}

module.exports = {
  allocateToken
};
