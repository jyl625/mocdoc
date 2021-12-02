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

export const selectUpcomingAppts = (currentUser, appointments) => {
  const selected = [];
  const currentDateTime = new Date();

  currentUser.appointments.forEach(appointmentId => {
    if (appointments[appointmentId]){
      let apptDateTime = new Date(appointments[appointmentId].appointment_time)
      if (appointments[appointmentId].user_id === currentUser.id && currentDateTime < apptDateTime) {
        selected.push(appointments[appointmentId])
      }
    }
  })
  // return selected;
  return selected.sort((a,b) => ((a.appointment_time > b.appointment_time) ? 1: -1));
}

export const selectProvidersAppointmentTimes = (appointments, provider) => {
  const appointmentTimes = [];
  // console.log(appointments)
  // console.log(provider)
  provider.appointments.forEach(appointment_id => {
    if(appointments[appointment_id]) {
      // ex. '2021-12-02T10:00:00.000-08:00' => 2021-12-02T10:00
      let comparableFormat = appointments[appointment_id].appointment_time.slice(0,16)
      appointmentTimes.push(comparableFormat)
    }
  })
  return appointmentTimes
  
}