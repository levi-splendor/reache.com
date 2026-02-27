  //Student data storage
            let administrators=JSON.parse(localStorage.getItem('administrators')) || [];

            // Dom Elements
const adminForm = document.getElementById('adminForm');
                    
         // Form submission
            adminForm.addEventListener('submit',(e) =>{
                e.preventDefault();
              addAdmin();
              const adminName = document.querySelector('#fullName').value
              localStorage.setItem('adminName', adminName)
              console.log(localStorage.getItem('adminName'))
                window.location.href = 'adminDashboard.html'
                 alert(`Administrator registered successfully!`);

            });
      
const use = Object.create(administrators)
console.log(use)
        // Add a new student
        function addAdmin() {
            const fullName = document.getElementById('fullName').value;
            console.log(fullName)
            const matricule = document.getElementById('matricule').value;
            console.log(matricule)
            const email = document.getElementById('email').value;
            console.log(email)
            const dateOfBirth = document.getElementById('dateOfBirth').value;
            console.log(dateOfBirth)
            const gender = document.getElementById('gender').value;
            console.log(gender)
            const phoneNumber = document.getElementById('phoneNumber').value;
            console.log(phoneNumber);
         
            saveAdmin(fullName, matricule, email, dateOfBirth, gender,phoneNumber)

        }

      
      export function saveAdmin( fullName, matricule, email, dateOfBirth, gender, phoneNumber,) {
            const newStudent = {           
                fullName,
                matricule,
                email,
                dateOfBirth,
                phoneNumber,
                gender,

            };

          administrators.push(newStudent)-1;
          
          localStorage.setItem('administrators', JSON.stringify(administrators));
            // Reset form
            // adminForm.reset();           

            // Show success message
           
}
        
//logout from admin Dashboard



        
// const adminName = document.createElement('p')

// const admin = document.querySelector(".adminName")
// admin.append(adminName)
// adminName.innerHTML = `<div style ="padding-bottom:20px;">
// <div><h1>Amdministrators Name: ${localStorage.getItem('adminName')}</h1></div></div>`