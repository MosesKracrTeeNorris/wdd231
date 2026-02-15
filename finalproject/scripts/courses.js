// Course data array with ITM111 added
const courses = [
    {
        subject: 'Certificate',
        number: 100,
        title: 'Introduction to Computer System',
        credits: 3,
        certificate: 'General Computer Skills',
        description: 'This course will introduce students to Microsoft Windows Operating System, macOS and other Platform. Basic Computer term and browsers. It will introduce the building blocks of navigating through various Operating System, performing basic operation methods and techniques. Finally, students will understand Computer Operation and other important applications.',
        technology: ['Basic Computer Operation and Management'],
        image: "images/bcs.jpg",
        completed: true
    },
    {
        subject: 'Certificate',
        number: 165,
        title: 'Basic and Advanced MS Office Training',
        credits: 3,
        certificate: 'Office Productivity and Management',
        description: 'This course introduces students to the management of office operation and tasks. Development a strong career in Office Assistant and Management. The course is hands on with students actual participation in simple document designs and formatting techniques. Students who complete this course will understand the fields of Office Administration and management and will have a good idea if they want to pursue this degree as a major.',
        technology: ['MS Office Suite', 'Windows OS and macOS'],
        completed: true
    },
    {
        subject: 'Certificate',
        number: 205,
        title: 'Computer Networking',
        credits: 3,
        certificate: 'Computer Network Plus',
        description: 'Computer Networking students become more organized, efficient, and powerful computer networking specialist by learning to research and network users and devices; assign IP addresses, trouble and diagnose network issues, and test connections; and to handle errors within the network.',
        technology: ['Packet Tracer', 'OSI Model', 'N+ Training'],
        completed: true
    },
    {
        subject: 'Diploma',
        number: 210,
        title: 'Computer Engineering',
        credits: 4,
        certificate: 'IT Support Specialist',
        description: 'This course will introduce students to programming, Networking, and Cyber Security. It will present detail demonstration on computer repairs, troubleshooting and diagnosis of Computer System, software installations and maintenance.',
        technology: ['CompTiA A+', 'Computer Hardware'],
        completed: true
    },
    {
        subject: 'Diploma',
        number: 235,
        title: 'Diploma in Computer Science',
        credits: 4,
        certificate: 'Diploma in Computer Science',
        description: 'A technical program focusing on software engineering, database management, and web development.',
        technology: ['HTML', 'CSS', 'JavaScript', 'Hardware', 'Networking'],
        completed: true
    },
    {
        subject: 'Higher Diploma',
        number: 350,
        title: 'Post Graduate Diploma in Computer Applications',
        credits: 4,
        certificate: 'Diploma in Computer Applications',
        description: 'Designed for graduates seeking specialized knowledge in computer languages and professional applications.',
        technology: ['HTML', 'CSS', 'JavaScript', 'C#', 'PHP', 'Python'],
        completed: false
    },
    {
        subject: 'Higher Diploma',
        number: 361,
        title: 'Higher Diploma in Cyber Security',
        credits: 4,
        certificate: 'Diploma in Cyber Security',
        description: 'In-depth training on ethical hacking, network defense, and digital forensics.',
        technology: ['C++', 'CSS', 'C#', 'PHP', 'Python', 'Networking'],
        completed: false
    },
    {
        subject: 'Certificate',
        number: 301,
        title: 'Google IT Support Professional Certificate',
        credits: 3,
        certificate: 'IT Support Professional Certificate',
        description: 'Comprehensive entry-level training covering networking, OS, and system administration.',
        technology: ['C++', 'C#', 'PHP', 'Python', 'Networking'],
        completed: false
    },
];

// Get references to DOM elements
const courseListContainer = document.querySelector('.course-list-container');
const totalCreditsElement = document.getElementById('total-credits');
const body = document.body; // Reference to body for modal

// Get all filter buttons
const filterAll = document.getElementById('filter-all');
const filterCSE = document.getElementById('filter-cse');
const filterWDD = document.getElementById('filter-wdd');
const filterPGDCS = document.getElementById('filter-pgdcs');


// --- MODAL CREATION AND LOGIC ---

// Create the course detail modal structure (must be done only once)
function createCourseModal() {
    // Check if modal already exists
    if (document.getElementById('course-modal-overlay')) {
        return;
    }

    const modalHTML = `
        <div id="course-modal-overlay" class="modal-overlay">
            <div class="modal-content">
                <button id="modal-close-btn" class="modal-close-btn">&times;</button>
                <h3 id="modal-course-title" class="modal-title">Course Title</h3>
                <p class="modal-course-code"><span id="modal-subject"></span> <span id="modal-number"></span></p>
                <p class="modal-detail"><strong>Credits:</strong> <span id="modal-credits"></span></p>
                <p class="modal-detail"><strong>Certificate:</strong> <span id="modal-certificate"></span></p>
                <p class="modal-detail"><strong>Technology:</strong> <span id="modal-technology"></span></p>
                <div class="modal-description-box">
                    <h4>Description</h4>
                    <p id="modal-description"></p>
                </div>
            </div>
        </div>
    `;
    body.insertAdjacentHTML('beforeend', modalHTML);

    // Get modal references after creation
    const modalOverlay = document.getElementById('course-modal-overlay');
    const closeBtn = document.getElementById('modal-close-btn');

    // Close modal listeners
    closeBtn.addEventListener('click', () => modalOverlay.classList.remove('open'));
    modalOverlay.addEventListener('click', (e) => {
        // Close when clicking outside the modal-content area
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('open');
        }
    });
}

// Function to show the modal with course data
function showCourseDetails(course) {
    document.getElementById('modal-course-title').textContent = course.title;
    document.getElementById('modal-subject').textContent = course.subject;
    document.getElementById('modal-number').textContent = course.number;
    document.getElementById('modal-credits').textContent = course.credits;
    document.getElementById('modal-certificate').textContent = course.certificate;
    document.getElementById('modal-description').textContent = course.description;
    document.getElementById('modal-technology').textContent = course.technology.join(', ');

    // Display the modal
    document.getElementById('course-modal-overlay').classList.add('open');
}


// COURSE CARD GENERATION AND LOGIC 

// Function to display courses
function displayCourses(coursesToDisplay) {
    // Clear existing content
    courseListContainer.innerHTML = '';
    
    // Create and append course cards
    coursesToDisplay.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.classList.add('course-card');

        // Add 'completed' class if the course is completed
        if (course.completed) {
            courseCard.classList.add('completed');
        }

        // Add data attributes for targeting and future features
        courseCard.setAttribute('data-subject', course.subject);
        courseCard.setAttribute('data-number', String(course.number));
        courseCard.setAttribute('data-credits', String(course.credits));
        courseCard.setAttribute('data-image', String(course.image));
        courseCard.setAttribute('role', 'button');
        courseCard.setAttribute('tabindex', '0');

        // Build inner structure: title and (optional) small meta
        const title = document.createElement('h3');
        title.textContent = `${course.subject} ${course.number}: ${course.title}`;
        courseCard.appendChild(title);

        // Add both click and keyboard activation
        courseCard.addEventListener('click', () => showCourseDetails(course));
        courseCard.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                showCourseDetails(course);
            }
        });

        courseListContainer.appendChild(courseCard);
    });
    
    // Calculate and display total credits using reduce
    calculateTotalCredits(coursesToDisplay);
}

// Function to calculate total credits using reduce
function calculateTotalCredits(coursesToDisplay) {
    const totalCredits = coursesToDisplay.reduce((total, course) => {
        return total + course.credits;
    }, 0);
    
    totalCreditsElement.textContent = totalCredits;
}

// Function to set active button
function setActiveButton(activeButton) {
    // Get all filter buttons in one go
    const filterButtons = [filterAll, filterCSE, filterWDD, filterPGDCS];
    
    // Remove active class from all buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to the clicked button
    activeButton.classList.add('active');
}

// Event Listeners for filter buttons
filterAll.addEventListener('click', () => {
    displayCourses(courses);
    setActiveButton(filterAll);
});

filterCSE.addEventListener('click', () => {
    const cseCoursesFiltered = courses.filter(course => course.subject === 'Certificate');
    displayCourses(cseCoursesFiltered);
    setActiveButton(filterCSE);
});
filterWDD.addEventListener('click', () => {
    const wddCoursesFiltered = courses.filter(course => course.subject === 'Diploma');
    displayCourses(wddCoursesFiltered);
    setActiveButton(filterWDD);
});

filterPGDCS.addEventListener('click', () => {
    const pgdcsCoursesFiltered = courses.filter(course => course.subject === 'Higher Diploma');
    displayCourses(pgdcsCoursesFiltered);
    setActiveButton(filterPGDCS);
});


// --- INITIALIZATION ---

// Initial display - show all courses when page loads
createCourseModal(); // Create the modal element first
displayCourses(courses);

