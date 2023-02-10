// External Lib Import
const schedule = require('node-schedule');

// Internal Lib Import
const { Staff, Attendance } = require('../models');

// run this job every day at 12:00 PM, Everyday at Bangladesh Time
schedule.scheduleJob('0 0 * * *', async () => {
  try {
    const staffs = await Staff.find({});
    const genAttendances = [];

    for await (const staff of staffs) {
      if (staffs) {
        const newAttendance = {
          userID: staff.userID,
          attend: true,
        };
        genAttendances.push(newAttendance);
      }
    }

    await Attendance.create(genAttendances);
  } catch (error) {
    console.log(error);
  }
});
