// Sample in-memory data for doctors and slots

const doctors = [
  { doctorId: 'D001', name: 'Dr. Smith' },
  { doctorId: 'D002', name: 'Dr. Johnson' },
  { doctorId: 'D003', name: 'Dr. Williams' }
];

const slots = [
  {
    slotId: 'S001',
    doctorId: 'D001',
    startTime: '09:00',
    endTime: '10:00',
    maxCapacity: 5,
    tokens: [],
    waitlist: []
  },
  {
    slotId: 'S002',
    doctorId: 'D001',
    startTime: '10:00',
    endTime: '11:00',
    maxCapacity: 5,
    tokens: [],
    waitlist: []
  },
  {
    slotId: 'S003',
    doctorId: 'D002',
    startTime: '09:00',
    endTime: '10:00',
    maxCapacity: 4,
    tokens: [],
    waitlist: []
  },
  {
    slotId: 'S004',
    doctorId: 'D002',
    startTime: '10:00',
    endTime: '11:00',
    maxCapacity: 4,
    tokens: [],
    waitlist: []
  },
  {
    slotId: 'S005',
    doctorId: 'D003',
    startTime: '09:00',
    endTime: '10:00',
    maxCapacity: 6,
    tokens: [],
    waitlist: []
  }
];

module.exports = {
  doctors,
  slots
};
