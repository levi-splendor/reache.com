  //Student data storage
            let students=JSON.parse(localStorage.getItem('students')) || [];
let currentFilter = 'all';


            // Dom Elements
                    const studentForm = document.getElementById('studentForm');
                    const studentsContainer = document.getElementById('studentsContainer');
                    const studentGallery = document.getElementById('studentGallery');
                    const searchInput = document.getElementById('searchInput');
                    const searchBtn = document.getElementById('searchBtn');
                    const filterBtns = document.querySelectorAll('.filter-btn');
                    const studentModal = document.getElementById('studentModal');
                    const closeModal = document.getElementById('closeModal');
                    const modalBody = document.getElementById('modalBody');
            
            //Stats elements
                const totalStudentsEl = document.getElementById('total-students');
                const maleStudentsEl = document.getElementById('male-students');
                const femaleStudentsEl = document.getElementById('female-students');

        // Initialize the app
            document.addEventListener('DOMContentLoaded', function() {
            renderStudents();
            renderStudentGallery();
            updateStats();


         // Form submission
            studentForm.addEventListener('submit',(e) =>{
                e.preventDefault();
                addStudent();
                window.location.href = 'home.html'
            });

        // Search functionality
            searchBtn.addEventListener('click', function() {
                renderStudents();
            });

        // Filter functionality
            filterBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    filterBtns.forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    currentFilter = this.getAttribute('data-filter');
                    renderStudents();
                });
            });

            

        // Modal functionality
            closeModal.addEventListener('click', function() {
                studentModal.style.display = 'none';
                document.querySelector('body').style.overflow='scroll'
            });

            window.addEventListener('click', function(e) {
                if (e.target === studentModal) {
                    studentModal.style.display = 'none';
                }
            });
        });

        // Add a new student
        function addStudent() {
            const fullName = document.getElementById('fullName').value;
            const matricule = document.getElementById('matricule').value;
            const email = document.getElementById('email').value;
            const dateOfBirth = document.getElementById('dateOfBirth').value;
            const gender = document.getElementById('gender').value;
            const school = document.getElementById('school').value;
            const phoneNumber = document.getElementById('phoneNumber').value;
            const department = document.getElementById('department').value;
            const logoutBtn = document.getElementById('logoutBtn')
            const loginBtn = document.getElementById('login-btn')
            const photoInput = document.getElementById('photo');

        // Generate a unique ID
            const id = Date.now().toString();

        // Handle photo upload
            let photoUrl = 'https://via.placeholder.com/80';
            if (photoInput.files && photoInput.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    photoUrl = e.target.result;
                    saveStudent(id, fullName, matricule, email, dateOfBirth, gender, phoneNumber, school, department, photoUrl);
                };
                reader.readAsDataURL(photoInput.files[0]);
            } else {
                saveStudent(id, fullName, matricule, email, dateOfBirth, gender, phoneNumber, school, department, photoUrl);
            }
        }

      
      export function saveStudent(id, fullName, matricule, email, dateOfBirth, gender, phoneNumber, school, department, photoUrl) {
            const newStudent = {
                id,
                fullName,
                matricule,
                email,
                dateOfBirth,
                phoneNumber,
                gender,
                school,
                department,
                photoUrl,
                registrationDate: new Date().toISOString()
            };

             students.push(newStudent);
          localStorage.setItem('students', JSON.stringify(students));
const studData =
            // Reset form
            studentForm.reset();

            // Update UI
            renderStudents();
            renderStudentGallery();
            updateStats();
            

            // Show success message
            alert(`Student registered successfully!`);
        }

        // Render students list
        function renderStudents() {
            let filteredStudents = [...students];
            const searchTerm = searchInput.value.toLowerCase();

            // Apply search filter
            if (searchTerm) {
                filteredStudents = filteredStudents.filter(student => 
                    student.fullName.toLowerCase().includes(searchTerm) ||
                    student.school.toLowerCase().includes(searchTerm) ||
                    student.department.toLowerCase().includes(searchTerm)
                );
            }

            // Apply category filter
                if (currentFilter !== 'all') {
                    filteredStudents = filteredStudents.filter(student => 
                        student.school === currentFilter
                    );
                }

            // Clear container
            studentsContainer.innerHTML = '';

            // Show empty state if no students
            if (filteredStudents.length === 0) {
                studentsContainer.innerHTML = `
                    <div class="empty-state">
                        
                        <h3>No students found</h3>
                        
                    </div>
                `;
                return;
            }

            // Render student cards
            filteredStudents.forEach(student => {
                const studentCard = document.createElement('div');
                studentCard.className = 'student-card';
                studentCard.innerHTML = `
                    <img src="${student.photoUrl}" alt="${student.fullName}" class="student-avatar">
                    <div class="student-info">
                        <div class="student-name">${student.fullName}</div>
                        <div class="student-details">${student.matricule}</div>
                        <div class="student-details">${student.email}</div>
                        <div class="student-details">${student.school} • ${student.department}• ${student.gender} • ${student.dateOfBirth}</div>
                    </div>
                    <div class="student-actions">
                        <button class="btn btn-success view-btn" data-id="${student.id}">View</button>
                        
                        <button class="btn btn-danger delete-btn" data-id="${student.id}">Delete</button>
                    </div>
                `;
                
                studentsContainer.appendChild(studentCard);
            });

            // Add event listeners to buttons
            document.querySelectorAll('.view-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const studentId = this.getAttribute('data-id');
                    showStudentDetails(studentId);
                    document.querySelector('body').style.overflow='hidden'
                });
            });

            document.querySelectorAll('.delete-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const studentId = this.getAttribute('data-id');
                    deleteStudent(studentId);
                });
            });

            document.querySelectorAll('logoutBtn').forEach(btn => {
                btn.addEventListener('click', function(login) {
                    
                });
            });
        }

        // Render student gallery
        function renderStudentGallery() {
            if (!studentGallery) return;
            
            studentGallery.innerHTML = '';
            
            if (students.length === 0) {
                studentGallery.innerHTML = `
                    <div class="empty-state" style="grid-column: 1 / -1;">
                       
                        <h3>No student photos </h3>
                        <p>Register students to see their photos here</p>
                    </div>
                `;
                return;
            }

            students.forEach(student => {
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item';
                galleryItem.innerHTML = `
                    <img src="${student.photoUrl}" alt="${student.fullName}" class="gallery-photo">
                    <div class="gallery-name">${student.fullName}</div>
                `;
                
                galleryItem.addEventListener('click', function() {
                    showStudentDetails(student.id);
                    document.querySelector('body').style.overflow='hidden'
                });
                
                studentGallery.appendChild(galleryItem);
            });
        }

        // Show student details in modal
        function showStudentDetails(studentId) {
            const student = students.find(s => s.id === studentId);
            if (!student) return;
            
            const registrationDate = new Date(student.registrationDate).toLocaleDateString();
            
            modalBody.innerHTML = `
                <div style="text-align: center; margin-bottom: 20px;">
                    <img src="${student.photoUrl}" alt="${student.fullName}" style="width: 120px; height: 120px; border-radius: 50%; object-fit: cover; border: 4px solid var(--primary);">
                </div>
                <div style="margin-bottom: 15px;">
                    <strong>Full Name:</strong> ${student.fullName}
                </div>
                <div style="margin-bottom: 15px;">
                    <strong>Matricule:</strong> ${student.matricule}
                </div>
                <div style="margin-bottom: 15px;">
                    <strong>Email:</strong> ${student.email}
                </div>
                <div style="margin-bottom: 15px;">
                    <strong>Date of Birth:</strong> ${student.dateOfBirth}
                </div>
                <div style="margin-bottom: 15px;">
                    <strong>Phone Number:</strong> ${student.phoneNumber}
                </div>
                <div style="margin-bottom: 15px;">
                    <strong>Gender:</strong> ${student.gender}
                </div>
                <div style="margin-bottom: 15px;">
                    <strong>School:</strong> ${student.school}
                </div>
                <div style="margin-bottom: 15px;">
                    <strong>Department:</strong> ${student.department}
                </div>
                <div style="margin-bottom: 15px;">
                    <strong>Registration Date:</strong> ${registrationDate}
                </div>
            `;
            
            studentModal.style.display = 'flex';
        }

        // Delete a student
        function deleteStudent(studentId) {
            if (confirm('Are you sure you want to delete this student?')) {
                students = students.filter(student => student.id !== studentId);
                localStorage.setItem('students', JSON.stringify(students));
                renderStudents();
                renderStudentGallery();
                updateStats();
            }
        }

        // Logout function
        function logout() {
            if (confirm('Are you sure you want to log out?')) {
                // Redirect to login page
                window.location.href = 'adminLogin.html';
            }
        }

        // Add event listener to logout button
        document.getElementById('logoutBtn').addEventListener('click', logout);
        



        // Update statistics
        function updateStats() {
            totalStudentsEl.textContent = students.length;
            
            const maleCount = students.filter(s => s.gender === 'Male').length;
            const femaleCount = students.filter(s => s.gender === 'Female').length;
            
            maleStudentsEl.textContent = maleCount;
            femaleStudentsEl.textContent = femaleCount;
            
}
        

const adminName = document.createElement('p')

const admin = document.querySelector(".adminName")
const name = localStorage.getItem('adminName')
adminName.innerHTML = `
<div style ="position:relative; bottom:30px;"><h1 style="color:black;font-size:24px;">Amdministrator: <br/><span style="color:#3f37c9;">${name}</span></h1></div>`

admin.append(adminName)
