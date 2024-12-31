const personalDailyHabits = [
    'Make Bed',
    'Drink cup of water',
    'Clean cat litter',
    'Empty Dishwasher',
    'Accounting',
    'Exercise',
    'Cold Shower',
    'Stretch - 10 min',
    'Read - 15 min',
    'Gratitude Meditation',
    'Read Yoga Sutras',
    'Go upside down'
];

const personalWeeklyHabits = [
    'Meditate - 20 min',
    'Laundry',
    'Clear Email',
];

const personalMonthlyHabits = [
    'Update Character Sheet'
];

const personalYearlyHabits = [
    'Re-evaluate Yearly Vision Planning'
];

const workDailyHabits = {
    'All': [
        {
            name: 'Plan Day',
            instructions: null
        },
    ],
    'Eigen': [
        {
            name: 'Review Executive Dashboard',
            instructions: {
                title: 'Review Executive Dashboard',
                content: `
                    <h4>Principle Questions:</h4>
                    <ul>
                        <li>Where are we now?</li>
                        <li>Where are we going?</li>
                        <li>Are we on track?</li>
                    </ul>
                    <h4>Key Metrics to Review:</h4>
                    <ul>
                        <li>Company Systems Build
                            <ul>
                                <li>Health of the company</li>
                                <li>Phase 1 Progress</li>
                            </ul>
                        </li>
                    </ul>
                `
            }
        },
        {
            name: 'Product - Review Analytics & Share',
            instructions: {
                title: 'Review Analytics',
                content: `
                    <h4>Key Metrics to Review:</h4>
                    <ul>
                        <li>Sales Metrics
                            <ul>
                                <li>Revenue Growth Rate</li>
                                <li>A/B Tests</li>
                                <li></li>
                            </ul>
                        </li>
                        <li>Customer Metrics
                            <ul>
                                <li>Active Users</li>
                                <li>Customer Satisfaction Score</li>
                                <li>Churn Rate</li>
                            </ul>
                        </li>
                        <li>Operational KPIs
                            <ul>
                                <li>System Uptime</li>
                                <li>Response Times</li>
                                <li>Error Rates</li>
                            </ul>
                        </li>
                    </ul>
                    <p><strong>Important:</strong> Pay special attention to any metrics that deviate more than 10% from the previous period.</p>
                    <p><strong>Action Items:</strong> Note any concerning trends for discussion in the next team meeting.</p>
                `
            }
        },
        {
            name: 'Review Product Roadmap',
            instructions: {
                title: 'Review Product Roadmap',
                content: `
                    <h4>Things to consider:</h4>
                    <ul>
                        <li>Do I know what needs to be done?</li>
                        <li>Does the team know what needs to be done?</li>
                        <li>Do we have a plan to get there?</li>
                        <li>Are we aligned on the plan?<li>
                        <li>Are we on track with the plan?<li>
                    </ul>
                    <h4>Possible Actions:</h4>
                    <ul>
                        <li>Schedule a meeting with the team to discuss the roadmap</li>
                    </ul>
                `
            }
        },
        {
            name: 'Clear Linear Comms',
            instructions: null
        },
        {
            name: 'Test any outstanding PRs',
            instructions: null
        },
        {
            name: 'Review Tasks',
            instructions: null
        },
        {
            name: 'Focus on Project',
            instructions: null
        },
        {
            name: 'Clear Email',
            instructions: null
        }
    ],
};

const workWeeklyHabits = {
    'Eigen': [
        {
            name: 'Review Customer Feedback',
            instructions: null
        },
        {
            name: 'Prepare Client Reports',
            instructions: null
        },
        {
            name: 'Add to Weekly Partners notes'
        }
    ],
    'Township': [
        {
            name: 'Review Executive Dashboard',
            instructions: {
                title: 'Review Executive Dashboard',
                content: `
                    <h4>Key Metrics to Review:</h4>
                    <ul>
                        <li>Revenue Overview
                            <ul>
                                <li>Monthly Revenue</li>
                                <li>Revenue Growth Rate</li>
                                <li>Revenue by Product</li>
                            </ul>
                        </li>
                        <li>Customer Metrics
                            <ul>
                                <li>Active Users</li>
                                <li>Customer Satisfaction Score</li>
                                <li>Churn Rate</li>
                            </ul>
                        </li>
                        <li>Operational KPIs
                            <ul>
                                <li>System Uptime</li>
                                <li>Response Times</li>
                                <li>Error Rates</li>
                            </ul>
                        </li>
                    </ul>
                    <p><strong>Important:</strong> Pay special attention to any metrics that deviate more than 10% from the previous period.</p>
                    <p><strong>Action Items:</strong> Note any concerning trends for discussion in the next team meeting.</p>
                `
            }
        },
    ],
    // 'Township': [
    //     {
    //         name: 'Social Post',
    //         instructions: null
    //     },
    //     {
    //         name: 'Update CRM',
    //         instructions: null
    //     },
    //     {
    //         name: 'Create Content',
    //         instructions: null
    //     },
    //     {
    //         name: 'Update Phase 1 Roadmaps',
    //         instructions: null
    //     },
    // ],
};

const workMonthlyHabits = {
    'Eigen': [
        {
            name: 'Set Up Retro Notes',
            instructions: null
        }
        
    ],
};

function createHabitElement(habit, container, type) {
    const div = document.createElement('div');
    div.className = 'habit-item';
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    const habitId = typeof habit === 'string' ? habit : habit.name;
    checkbox.id = habitId.replace(/\s+/g, '-').toLowerCase();
    checkbox.dataset.habitType = type;
    
    const label = document.createElement('label');
    label.htmlFor = checkbox.id;
    label.textContent = typeof habit === 'string' ? habit : habit.name;
    
    checkbox.addEventListener('change', function() {
        label.classList.toggle('completed', this.checked);
        saveState();
    });
    
    div.appendChild(checkbox);
    div.appendChild(label);

    // Add info button if instructions exist for this habit
    if (typeof habit === 'object' && habit.instructions) {
        const infoButton = document.createElement('button');
        infoButton.className = 'info-button';
        infoButton.innerHTML = '&#8505;';
        infoButton.addEventListener('click', () => showTaskInstructions(checkbox.id, habit.instructions));
        div.appendChild(infoButton);
    }
    
    container.appendChild(div);
}

function createCompanySection(title) {
    const section = document.createElement('div');
    section.className = 'company-section';
    
    const heading = document.createElement('h4');
    heading.className = 'company-heading';
    heading.textContent = title;
    
    section.appendChild(heading);
    return section;
}

function initializeHabits() {
    const personalDailyContainer = document.getElementById('personal-daily-habits');
    const personalWeeklyContainer = document.getElementById('personal-weekly-habits');
    const personalMonthlyContainer = document.getElementById('personal-monthly-habits');
    const personalYearlyContainer = document.getElementById('personal-yearly-habits');
    const workDailyContainer = document.getElementById('work-daily-habits');
    const workWeeklyContainer = document.getElementById('work-weekly-habits');
    const workMonthlyContainer = document.getElementById('work-monthly-habits');
    
    // Initialize personal habits
    personalDailyHabits.forEach(habit => createHabitElement(habit, personalDailyContainer, 'daily'));
    personalWeeklyHabits.forEach(habit => createHabitElement(habit, personalWeeklyContainer, 'weekly'));
    personalMonthlyHabits.forEach(habit => createHabitElement(habit, personalMonthlyContainer, 'monthly'));
    personalYearlyHabits.forEach(habit => createHabitElement(habit, personalYearlyContainer, 'yearly'));
    
    // Initialize work habits with company grouping
    for (const [company, habits] of Object.entries(workDailyHabits)) {
        const section = createCompanySection(company);
        habits.forEach(habit => createHabitElement(habit, section, 'daily'));
        workDailyContainer.appendChild(section);
    }
    
    for (const [company, habits] of Object.entries(workWeeklyHabits)) {
        const section = createCompanySection(company);
        habits.forEach(habit => createHabitElement(habit, section, 'weekly'));
        workWeeklyContainer.appendChild(section);
    }
    
    for (const [company, habits] of Object.entries(workMonthlyHabits)) {
        const section = createCompanySection(company);
        habits.forEach(habit => createHabitElement(habit, section, 'monthly'));
        workMonthlyContainer.appendChild(section);
    }
    
    document.getElementById('current-date').textContent = 
        new Date().toLocaleDateString(undefined, { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    
    loadState();
    clearOutdatedHabits();
}

function getStorageKeys() {
    const today = new Date();
    return {
        daily: today.toLocaleDateString(),
        weekly: `week-${getWeekNumber(today)}`,
        monthly: `month-${today.getFullYear()}-${today.getMonth() + 1}`,
        yearly: `year-${today.getFullYear()}`
    };
}

function getWeekNumber(date) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    const yearStart = new Date(d.getFullYear(), 0, 1);
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

function shouldClearWeekly() {
    const today = new Date();
    return today.getDay() === 1; // Monday is 1
}

function shouldClearMonthly() {
    const today = new Date();
    return today.getDate() === 1; // First day of month
}

function shouldClearYearly() {
    const today = new Date();
    return today.getMonth() === 0 && today.getDate() === 1; // January 1st
}

function clearOutdatedHabits() {
    const lastClearDate = localStorage.getItem('lastClearDate');
    const today = new Date().toLocaleDateString();

    if (lastClearDate !== today) {
        // Clear daily habits
        localStorage.removeItem(getStorageKeys().daily);

        // Clear weekly habits on Monday
        if (shouldClearWeekly()) {
            localStorage.removeItem(getStorageKeys().weekly);
        }

        // Clear monthly habits on the first of the month
        if (shouldClearMonthly()) {
            localStorage.removeItem(getStorageKeys().monthly);
        }

        // Clear yearly habits on January 1st
        if (shouldClearYearly()) {
            localStorage.removeItem(getStorageKeys().yearly);
        }

        localStorage.setItem('lastClearDate', today);
    }
}

function saveState() {
    const dailyState = {};
    const weeklyState = {};
    const monthlyState = {};
    const yearlyState = {};

    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        const state = {
            id: checkbox.id,
            checked: checkbox.checked
        };

        switch(checkbox.dataset.habitType) {
            case 'daily':
                dailyState[checkbox.id] = state;
                break;
            case 'weekly':
                weeklyState[checkbox.id] = state;
                break;
            case 'monthly':
                monthlyState[checkbox.id] = state;
                break;
            case 'yearly':
                yearlyState[checkbox.id] = state;
                break;
        }
    });

    const keys = getStorageKeys();
    localStorage.setItem(keys.daily, JSON.stringify(dailyState));
    localStorage.setItem(keys.weekly, JSON.stringify(weeklyState));
    localStorage.setItem(keys.monthly, JSON.stringify(monthlyState));
    localStorage.setItem(keys.yearly, JSON.stringify(yearlyState));
}

function loadState() {
    const keys = getStorageKeys();
    const dailyState = JSON.parse(localStorage.getItem(keys.daily) || '{}');
    const weeklyState = JSON.parse(localStorage.getItem(keys.weekly) || '{}');
    const monthlyState = JSON.parse(localStorage.getItem(keys.monthly) || '{}');
    const yearlyState = JSON.parse(localStorage.getItem(keys.yearly) || '{}');

    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        let state;
        switch(checkbox.dataset.habitType) {
            case 'daily':
                state = dailyState[checkbox.id];
                break;
            case 'weekly':
                state = weeklyState[checkbox.id];
                break;
            case 'monthly':
                state = monthlyState[checkbox.id];
                break;
            case 'yearly':
                state = yearlyState[checkbox.id];
                break;
        }

        if (state) {
            checkbox.checked = state.checked;
            checkbox.nextElementSibling.classList.toggle('completed', state.checked);
        }
    });
}

// Task Management Functions
function initializeTaskManager() {
    const addButton = document.getElementById('add-task');
    const taskInput = document.getElementById('new-task');

    loadTasks();

    addButton.addEventListener('click', () => addTask());
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });
}

function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();
    
    if (taskText) {
        const tasks = getAllTasks();
        const today = new Date().toLocaleDateString();
        
        if (!tasks[today]) {
            tasks[today] = [];
        }
        
        tasks[today].push({
            id: Date.now(),
            text: taskText,
            completed: false,
            createdAt: new Date().toISOString()
        });
        
        saveTasks(tasks);
        renderTasks();
        taskInput.value = '';
    }
}

function deleteTask(date, taskId) {
    const tasks = getAllTasks();
    if (tasks[date]) {
        tasks[date] = tasks[date].filter(task => task.id !== taskId);
        if (tasks[date].length === 0) {
            delete tasks[date];
        }
        saveTasks(tasks);
        renderTasks();
    }
}

function toggleTaskComplete(date, taskId) {
    const tasks = getAllTasks();
    if (tasks[date]) {
        const task = tasks[date].find(t => t.id === taskId);
        if (task) {
            task.completed = !task.completed;
            saveTasks(tasks);
            renderTasks();
        }
    }
}

function toggleDateSection(date) {
    const content = document.querySelector(`[data-content="${date}"]`);
    const arrow = document.querySelector(`[data-arrow="${date}"]`);
    if (content && arrow) {
        content.classList.toggle('collapsed');
        arrow.classList.toggle('collapsed');
        
        // Save collapse state
        const collapsedDates = JSON.parse(localStorage.getItem('collapsedDates') || '{}');
        collapsedDates[date] = content.classList.contains('collapsed');
        localStorage.setItem('collapsedDates', JSON.stringify(collapsedDates));
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
        return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
        return 'Yesterday';
    } else {
        return date.toLocaleDateString(undefined, { 
            weekday: 'long',
            month: 'long',
            day: 'numeric'
        });
    }
}

function renderTasks() {
    const tasksList = document.getElementById('tasks-list');
    const tasks = getAllTasks();
    const collapsedDates = JSON.parse(localStorage.getItem('collapsedDates') || '{}');
    
    tasksList.innerHTML = '';
    
    // Sort dates in reverse chronological order
    const dates = Object.keys(tasks).sort((a, b) => new Date(b) - new Date(a));
    
    dates.forEach(date => {
        const dateSection = document.createElement('div');
        dateSection.className = 'date-section';
        
        const dateHeader = document.createElement('div');
        dateHeader.className = 'date-header';
        dateHeader.onclick = () => toggleDateSection(date);
        
        const arrow = document.createElement('span');
        arrow.className = `collapse-arrow ${collapsedDates[date] ? 'collapsed' : ''}`;
        arrow.dataset.arrow = date;
        arrow.innerHTML = '&#x1f955;'; // Down triangle
        
        const dateTitle = document.createElement('h3');
        dateTitle.textContent = formatDate(date);
        
        dateHeader.appendChild(arrow);
        dateHeader.appendChild(dateTitle);
        
        const tasksContent = document.createElement('div');
        tasksContent.className = `date-content ${collapsedDates[date] ? 'collapsed' : ''}`;
        tasksContent.dataset.content = date;
        
        tasks[date].forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.className = 'task-item';
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;
            checkbox.addEventListener('change', () => toggleTaskComplete(date, task.id));
            
            const taskText = document.createElement('span');
            taskText.className = 'task-text';
            taskText.textContent = task.text;
            if (task.completed) {
                taskText.classList.add('completed');
            }
            
            const deleteButton = document.createElement('button');
            deleteButton.className = 'task-delete-btn';
            deleteButton.innerHTML = '&#10005;'; // X symbol
            deleteButton.addEventListener('click', () => deleteTask(date, task.id));
            
            taskElement.appendChild(checkbox);
            taskElement.appendChild(taskText);
            taskElement.appendChild(deleteButton);
            tasksContent.appendChild(taskElement);
        });
        
        dateSection.appendChild(dateHeader);
        dateSection.appendChild(tasksContent);
        tasksList.appendChild(dateSection);
    });
}

function getAllTasks() {
    const tasksJson = localStorage.getItem('tasks');
    return tasksJson ? JSON.parse(tasksJson) : {};
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    renderTasks();
}

// Scratch Notes Functions
function initializeScratchNotes() {
    const notesArea = document.getElementById('scratch-notes');
    const clearButton = document.getElementById('clear-notes');
    
    // Load saved notes (now using a single key for persistence)
    const savedNotes = localStorage.getItem('scratch-notes');
    if (savedNotes) {
        notesArea.value = savedNotes;
    }
    
    // Save notes on input
    let saveTimeout;
    notesArea.addEventListener('input', () => {
        // Debounce the save operation
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(() => {
            localStorage.setItem('scratch-notes', notesArea.value);
        }, 500);
    });

    // Clear notes with double confirmation
    clearButton.addEventListener('click', () => {
        if (notesArea.value.trim() === '') {
            return; // Don't show confirmation if notes are already empty
        }

        const firstConfirm = confirm('Are you sure you want to clear all notes? This cannot be undone.');
        if (firstConfirm) {
            const secondConfirm = confirm('Please confirm once more that you want to delete all notes.');
            if (secondConfirm) {
                notesArea.value = '';
                localStorage.removeItem('scratch-notes');
            }
        }
    });
}

function showTaskInstructions(taskId, instructions) {
    if (!instructions) return;

    const modal = document.getElementById('taskModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');

    modalTitle.textContent = instructions.title;
    modalContent.innerHTML = instructions.content;
    modal.classList.add('show');
}

function initializeModal() {
    const modal = document.getElementById('taskModal');
    const closeButton = modal.querySelector('.modal-close');

    closeButton.addEventListener('click', () => {
        modal.classList.remove('show');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            modal.classList.remove('show');
        }
    });
}

// Update the initialization
document.addEventListener('DOMContentLoaded', () => {
    initializeHabits();
    initializeTaskManager();
    initializeScratchNotes();
    initializeModal();
}); 