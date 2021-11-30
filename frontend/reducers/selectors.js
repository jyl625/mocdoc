export const selectProvider = ({providers}, providerId) => {
  return providers[providerId];
}

export const selectPlans = (insurances, carrier) => {
  const selected = [];

  Object.keys(insurances).forEach(plan_id => {
    if (insurances[plan_id].carrier === carrier) {
      selected.push(insurances[plan_id])
    }
  })
  return selected.sort((a,b) => ((a.plan > b.plan) ? 1 : -1));
}