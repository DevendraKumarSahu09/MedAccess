const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const Appointment = require('../models/Appointment');
const Test = require('../models/Test');
const BloodInventory = require('../models/BloodInventory');
const ActivityLog = require('../models/ActivityLog');
const Announcement = require('../models/Announcement');
const auth = require('../middleware/auth');
const excel = require('exceljs');

// @route   GET api/dashboard/statistics
// @desc    Get dashboard statistics
// @access  Private
router.get('/statistics', auth, async (req, res) => {
  try {
    const doctorsCount = await Doctor.countDocuments();
    const patientsCount = await Patient.countDocuments();
    const appointmentsCount = await Appointment.countDocuments({
      date: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) }
    });
    const testsCount = await Test.countDocuments();

    res.json({
      doctors: doctorsCount,
      patients: patientsCount,
      appointments: appointmentsCount,
      tests: testsCount
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/dashboard/blood-inventory
// @desc    Get blood inventory
// @access  Private
router.get('/blood-inventory', auth, async (req, res) => {
  try {
    const bloodInventory = await BloodInventory.find().sort({ type: 1 });
    
    if (!bloodInventory || bloodInventory.length === 0) {
      // Return default inventory if none exists
      return res.json([
        { type: 'A+', units: 12 },
        { type: 'A-', units: 5 },
        { type: 'B+', units: 8 },
        { type: 'B-', units: 3 },
        { type: 'AB+', units: 2 },
        { type: 'AB-', units: 1 },
        { type: 'O+', units: 15 },
        { type: 'O-', units: 6 }
      ]);
    }
    
    res.json(bloodInventory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/dashboard/recent-activities
// @desc    Get recent activities
// @access  Private
router.get('/recent-activities', auth, async (req, res) => {
  try {
    const activities = await ActivityLog.find()
      .sort({ timestamp: -1 })
      .limit(5);
    
    if (!activities || activities.length === 0) {
      // Return default activities if none exist
      return res.json([
        { time: '09:45 AM', description: 'Dr. Sarah Johnson checked in patient #1042' },
        { time: '10:15 AM', description: 'Blood sample collected for patient #890' },
        { time: '11:30 AM', description: 'New appointment scheduled for 05/15/2023' },
        { time: '12:45 PM', description: 'Medication dispensed from pharmacy' },
        { time: '02:00 PM', description: 'Emergency room patient admitted to Ward 3' }
      ]);
    }
    
    // Format the activities for the frontend
    const formattedActivities = activities.map(activity => ({
      time: new Date(activity.timestamp).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      }),
      description: activity.description
    }));
    
    res.json(formattedActivities);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/dashboard/announcements
// @desc    Get announcements
// @access  Private
router.get('/announcements', auth, async (req, res) => {
  try {
    const announcements = await Announcement.find()
      .sort({ createdAt: -1 })
      .limit(3);
    
    if (!announcements || announcements.length === 0) {
      // Return default announcements if none exist
      return res.json([
        { 
          title: 'System Maintenance', 
          message: 'The system will be down for maintenance on Sunday, May 28th from 2-4 AM.',
          urgent: false
        },
        {
          title: 'COVID-19 Protocol Update',
          message: 'New protocols for COVID-19 screening will be effective starting next week. All staff must review the updated guidelines.',
          urgent: true
        },
        {
          title: 'Staff Meeting',
          message: 'Monthly staff meeting scheduled for Friday, May 26th at 9:00 AM in Conference Room A.',
          urgent: false
        }
      ]);
    }
    
    res.json(announcements);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/dashboard/generate-report
// @desc    Generate dashboard report
// @access  Private
router.post('/generate-report', auth, async (req, res) => {
  try {
    const { reportType } = req.body;
    
    // This would typically generate a PDF or other report format
    // For now, we'll just return a success message
    res.json({ 
      success: true, 
      message: `${reportType} report generated successfully`,
      timestamp: new Date()
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/dashboard/download-data
// @desc    Download dashboard data
// @access  Private
router.get('/download-data', auth, async (req, res) => {
  try {
    const { dataType, format } = req.query;
    
    if (format !== 'excel') {
      return res.status(400).json({ msg: 'Unsupported format' });
    }
    
    // Create a new Excel workbook
    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet('Dashboard Data');
    
    // Add column headers
    worksheet.columns = [
      { header: 'Category', key: 'category', width: 20 },
      { header: 'Value', key: 'value', width: 15 },
      { header: 'Date', key: 'date', width: 20 }
    ];
    
    // Get dashboard stats
    const doctorsCount = await Doctor.countDocuments();
    const patientsCount = await Patient.countDocuments();
    const appointmentsCount = await Appointment.countDocuments({
      date: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) }
    });
    const testsCount = await Test.countDocuments();
    
    // Add rows
    const today = new Date().toISOString().split('T')[0];
    worksheet.addRow({ category: 'Total Doctors', value: doctorsCount, date: today });
    worksheet.addRow({ category: 'Total Patients', value: patientsCount, date: today });
    worksheet.addRow({ category: 'Today\'s Appointments', value: appointmentsCount, date: today });
    worksheet.addRow({ category: 'Lab Tests', value: testsCount, date: today });
    
    // Get blood inventory data
    const bloodInventory = await BloodInventory.find().sort({ type: 1 });
    if (bloodInventory && bloodInventory.length > 0) {
      bloodInventory.forEach(item => {
        worksheet.addRow({ 
          category: `Blood Type ${item.type}`, 
          value: item.units, 
          date: today 
        });
      });
    }
    
    // Set response headers
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=dashboard-data-${today}.xlsx`
    );
    
    // Write to response
    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router; 