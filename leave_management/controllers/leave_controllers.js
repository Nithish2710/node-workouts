const User = require('../model/User.js');

let users = [
    { id: 1, name: 'Nithish', username: 'nithish', password: 'nithish123' },
    { id: 2, name: 'Nithesh', username: 'nithesh', password: 'nithesh123' },
    { id: 3, name: 'John', username: 'john', password: 'john123' },
];

function userIndex(req, res) {
    res.json({users:users});
}


function userCreate(req, res) {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'Name is required' });
    }

    const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;

    const newUser = {
        id: newId,
        name
    };

    users.push(newUser);

    res.status(201).json({
        message: 'User created successfully',
        user: newUser
    });
}

function leaveApply(req, res) {
    const { userId, leaveTypeId, startDate, endDate, reason } = req.body;

    // Validate input
    if (!userId || !leaveTypeId || !startDate || !endDate || !reason) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user exists
    const userExists = users.some(user => user.id === userId);
    if (!userExists) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Find leave type
    const leaveType = leaveTypes.find(l => l.id === leaveTypeId);
    if (!leaveType) {
        return res.status(404).json({ message: 'Invalid leave type' });
    }

    // Create leave application
    const newLeave = {
        id: leaveApplications.length + 1,
        userId,
        leaveType: leaveType.type,
        startDate,
        endDate,
        reason,
        status: 'Pending',
        appliedAt: new Date()
    };

    leaveApplications.push(newLeave);

    res.status(201).json({
        message: 'Leave application submitted successfully',
        leave: newLeave
    });
}

module.exports = {
    userCreate,
    leaveApply
};

function userUpdate(req, res) {
    const userId = parseInt(req.params.id);
    const index = users.findIndex(u => u.id === userId);
    if (index !== -1) {
        users[index].name = req.body.name;
        res.json({
            message: 'User updated successfully',
            user: users[index]
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
}

function userDelete(req, res) {
    console.log('req.params.id', req.query.id);
    const userId = parseInt(req.query.id);
    console.log('userId', userId);
    const index = users.findIndex(u => u.id === userId);

    if (index !== -1) {
        const deleted = users.splice(index, 1);
        res.json({
            message: 'User deleted successfully',
            user: deleted[0]
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
}

//leave types
let leaveTypes = [
    { id: 1, type: 'Sick Leave' },
    { id: 2, type: 'Casual Leave' },
    { id: 3, type: 'Annual Leave' }
];

//get
function leaveType(req, res) {
    const id = parseInt(req.params.id);
    const leaveType = leaveTypes.find(l => l.id === id);
    res.json({ leaveTypes: leaveTypes });

    if (leaveType) {
        res.json({ leaveType });
    } else {
        res.status(404).json({ message: 'Leave type not found' });
    }
}

//post
function leaveTypeCreate(req, res) {
    const { type } = req.body;

    if (!type) {
        return res.status(400).json({ message: 'Leave type is required' });
    }

    const newId = leaveTypes.length > 0 ? leaveTypes[leaveTypes.length - 1].id + 1 : 1;

    const newLeaveType = {
        id: newId,
        type: type
    };

    leaveTypes.push(newLeaveType);

    res.status(201).json({
        message: 'Leave type created successfully',
        leaveType: newLeaveType
    });
}

//put
function leaveTypeUpdate(req, res) {
    const leaveTypeId = parseInt(req.params.id);
    const index = leaveTypes.findIndex(l => l.id === leaveTypeId);

    if (index !== -1) {
        leaveTypes[index].type = req.body.type;
        res.json({
            message: 'Leave type updated successfully',
            leaveType: leaveTypes[index]
        });
    } else {
        res.status(404).json({ message: 'Leave type not found' });
    }
}

//delete
function leaveTypeDelete(req, res) {
    const leaveTypeId = parseInt(req.query.id);
    const index = leaveTypes.findIndex(l => l.id === leaveTypeId);

    if (index !== -1) {
        const deleted = leaveTypes.splice(index, 1);
        res.json({
            message: 'Leave type deleted successfully',
            leaveType: deleted[0]
        });
    } else {
        res.status(404).json({ message: 'Leave type not found' });
    }
}

//leave applications
//post-create leave application

const leaveApplications = [];

function leaveApply(req, res) {
    const { userId, leaveTypeId, startDate, endDate, reason } = req.body;

    //Validate input
    if (!userId || !leaveTypeId || !startDate || !endDate || !reason) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // toFind matching leave type
    const leaveType = leaveTypes.find(l => l.id === leaveTypeId);
    if (!leaveType) {
        return res.status(404).json({ message: 'Invalid leave type' });
    }

    //Create new leave application
    const newLeave = {
        id: leaveApplications.length + 1,
        userId,
        leaveType: leaveType.type,
        startDate,
        endDate,
        reason,
        status: 'Pending',
        appliedAt: new Date()
    };

    leaveApplications.push(newLeave); // Store it

    res.status(201).json({
        message: 'Leave application submitted successfully',
        leave: newLeave
    });
}

//view all leave applications
function viewAllleaveApplications(req, res) {
    if (leaveApplications.length === 0) {
        return res.status(404).json({ message: 'No leave applications found' });
    }

    res.json({
        message: 'Leave applications retrieved successfully',
        leaveApplications: leaveApplications
    });
}

//view leave for specific user
function viewLeaveForUser(req, res) {
    const userId = parseInt(req.params.userId); 
    console.log("userId")
    console.log(userId)
    const userLeaves = leaveApplications.filter(leave => leave.userId === userId);
    if (userLeaves.length === 0) {
        return res.status(404).json({ message: 'No leave applications found for this user' });
        }
        res.json({
            message: 'Leave applications for user retrieved successfully',
            leaveApplications: userLeaves
        });
}

//login
let activeSessions = []; // stores active userIds (for simulation)

function login(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Simulate login by tracking active sessions
  if (!activeSessions.includes(user.id)) {
    activeSessions.push(user.id);
  }

  res.status(200).json({
    message: 'Login successful',
    user: {
      id: user.id,
      name: user.name,
      username: user.username
    }
  });
}

//logout
function logout(req, res) {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required to logout' });
  }

  // Remove user from activeSessions
  activeSessions = activeSessions.filter(id => id !== userId);

  res.status(200).json({
    message: 'Logout successful'
  });
}


//leave approve
function approveLeave(req, res) {
  const leaveId = parseInt(req.params.id);
  const leave = leaveApplications.find(l => l.id === leaveId);

  if (!leave) {
    return res.status(404).json({ message: 'Leave application not found' });
  }

  if (leave.status !== 'Pending') {
    return res.status(400).json({ message: `Leave is already ${leave.status}` });
  }

  leave.status = 'Approved';
  leave.reviewedAt = new Date();

  res.status(200).json({
    message: 'Leave application approved',
    leave
  });
}

//leave reject
function rejectLeave(req, res) {
  const leaveId = parseInt(req.params.id);
  const leave = leaveApplications.find(l => l.id === leaveId);

  if (!leave) {
    return res.status(404).json({ message: 'Leave application not found' });
  }

  if (leave.status !== 'Pending') {
    return res.status(400).json({ message: `Leave is already ${leave.status}` });
  }

  leave.status = 'Rejected';
  leave.reviewedAt = new Date();

  res.status(200).json({
    message: 'Leave application rejected',
    leave
  });
}

module.exports = {
    userIndex,
    userCreate,
    userUpdate,
    userDelete,
    leaveType,
    leaveTypeCreate,
    leaveTypeUpdate,
    leaveTypeDelete,
    leaveApply,
    viewAllleaveApplications,
    viewLeaveForUser,
    login,
    logout,
    approveLeave,
    rejectLeave
};