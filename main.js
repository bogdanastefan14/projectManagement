var index = 0;

function generateUniqueId() {
    return index++;
}

// var issueTypes = ['feature', 'bug', 'task'];
var issueStatuses = {
    new: {
        id: 1,
        text: 'New'
    },
    inProgress: {
        id: 1,
        text: 'In Progress'
    },
    feedback: {
        id: 1,
        text: 'Feedback'
    },
    rework: {
        id: 1,
        text: 'Rework'
    },
    resolved: {
        id: 1,
        text: 'Resolved'
    },
    readyForTesting: {
        id: 1,
        text: 'Ready for testing'
    }
}

class User {
    constructor(name) {
        this.name = name;
        this.id = generateUniqueId();
    }
}

class Sprint {
    constructor(name) {
        this.name = name;
        this.id = generateUniqueId();
    }
}

class Comment {
    constructor(name) {
        this.name = name;
        this.id = generateUniqueId();
    }
}

class Project {
    constructor() {
        this.sprints = [];
        this.id = generateUniqueId();
    }

    addSprint(sprintId) {
        this.sprints.push(sprintId);
    }
}

class Issue {
    constructor(name, type, sprintId, userId, description) {
        this.name = name;
        this.id = generateUniqueId();
        this.createdAt = new Date();
        this.updatedAt = this.createdAt;
        this.type = type;
        this.sprint = sprintId;
        this.createdBy = userId;
        this.assignee = userId;
        this.description = description;
        this.status = issueStatuses.new.id;
        this.tasks = [];
        this.comments = [];
    }

    addSubtask(issueId) {
        this.tasks.push(issueId);
    }

    update(field, value) {
        this[field] = value;
    }
}

var users = [];

users[0] = new User('John');
users[1] = new User('Gheorghe');

var projects = [];

projects[0] = new Project();

var sprints = [];

sprints[0] = new Sprint('Sprint1');
sprints[1] = new Sprint('Sprint2');
sprints[2] = new Sprint('Sprint3');

projects[0].addSprint(sprints[0].id);
projects[0].addSprint(sprints[1].id);

var issues = [];

function createIssue(name, type, sprintId, userId, description, parentIssueId) {
 
    var issue = new Issue(name, type, sprintId, userId, description);
    issues.push(issue);

    if (parentIssueId) {
        for (let i = 0; i < issues.length; i++) {
            if (issues[i].id == parentIssueId) {
                issues[i].addSubtask(issue.id);
            }
            
        }
    }
}

createIssue('login', 'feature', 3, 1, 'create login page');
createIssue('logout', 'feature', 3, 1, 'create logout page');
createIssue('cannot login', 'bug', 3, 1, 'cannot login with my credentials');
createIssue('login form', 'subtask', 3, 1, 'cannot login form', 6);
createIssue('login button', 'subtask', 3, 1, 'cannot login button', 6);

issues[0].update('name', 'login2');

function moveIssue(issueId, newSprintId) {
    for (let i = 0; i < issues.length; i++) {
        if (issueId == issues[i].id) {
            issues[i].update('sprint', newSprintId);

            if (issues[i].tasks.length > 0) {
                for (let j = 0; j < issues[i].tasks.length; j++) {
                    for (let k = 0; k < issues.length; k++) {
                        if (issues[i].tasks[j] == issues[k].id) {
                            issues[k].update('sprint', newSprintId);
                        }
                        
                    }
                }
            }
        }        
    }
}

moveIssue(6, 4);


var currentProject = projects[0];

function displayCurrentProject() {

    // project
    console.log(currentProject);

    // sprints
    for (let i = 0; i < currentProject.sprints.length; i++) {
        for (let j = 0; j < sprints.length; j++) {
            if (currentProject.sprints[i] == sprints[j].id) {
                console.log(sprints[j]);
            }
        }
    }

    // issues
    for (let i = 0; i < currentProject.sprints.length; i++) {
        for (let j = 0; j < issues.length; j++) {
            if (currentProject.sprints[i] == issues[j].sprint) {
                console.log(issues[j]);
            }
            
        }
    }
}


displayCurrentProject();







