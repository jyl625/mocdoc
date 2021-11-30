export const selectProvider = ({providers}, providerId) => {
  return providers[providerId];
}

export const selectPlans = (insurances, hios_id) => {
  const selected = [];

  Object.keys(insurances).forEach(plan_id => {
    if (insurances[plan_id].hios_id === hios_id) {
      selected.push(insurances[plan_id])
    }
  })
  return selected.sort((a,b) => ((a.plan > b.plan) ? 1 : -1));
}