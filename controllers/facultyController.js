const asyncHandler = require('express-async-handler');
const Faculty = require('../models/facultyModel');

// Get faculty profile
const getFacultyProfile = asyncHandler(async (req, res) => {
    const faculty = await Faculty.findById(req.user.id);
    if (faculty) {
        res.json({
            _id: faculty._id,
            name: faculty.name,
            email: faculty.email,
            department: faculty.department
        });
    } else {
        res.status(404);
        throw new Error('Faculty not found');
    }
});

// Update faculty profile
const updateFacultyProfile = asyncHandler(async (req, res) => {
    const faculty = await Faculty.findById(req.user.id);
    if (faculty) {
        faculty.name = req.body.name || faculty.name;
        faculty.email = req.body.email || faculty.email;
        faculty.department = req.body.department || faculty.department;
        
        if (req.body.password) {
            faculty.password = req.body.password;
        }

        const updatedFaculty = await faculty.save();
        res.json({
            _id: updatedFaculty._id,
            name: updatedFaculty.name,
            email: updatedFaculty.email,
            department: updatedFaculty.department
        });
    } else {
        res.status(404);
        throw new Error('Faculty not found');
    }
});

module.exports = {
    getFacultyProfile,
    updateFacultyProfile
};
