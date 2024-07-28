// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./studentdetails.css";

// const StudentDetails = () => {
//   const [students, setStudents] = useState([]);
//   const [newStudent, setNewStudent] = useState({ name: "", age: "", date_of_birth: "" });
//   const [isFormOpen, setIsFormOpen] = useState(false);

//   useEffect(() => {
//     // Fetch student details from API
//     fetchStudents();
//   }, []);

//   const fetchStudents = () => {
//     axios
//       .get("http://localhost/backend/students.php")
//       .then((response) => {
//         setStudents(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching student details:", error);
//       });
//   };

//   const addStudent = () => {
//     axios
//       .post("http://localhost/backend/addstu.php", newStudent)
//       .then(() => {
//         // Clear the form and reload students
//         setNewStudent({ name: "", age: "", date_of_birth: "" });
//         fetchStudents();
//         // Close the form
//         setIsFormOpen(false);
//       })
//       .catch((error) => {
//         console.error("Error adding student:", error);
//       });
//   };

//   const deleteStudent = (id) => {
//     axios
//       .delete(`http://localhost/backend/deletestu.php?id=${id}`)
//       .then(() => {
//         // Reload students
//         fetchStudents();
//       })
//       .catch((error) => {
//         console.error("Error deleting student:", error);
//       });
//   };

//   return (
//     <div className="student-details-container">
//       <h2>Student Details</h2>
//       <button onClick={() => setIsFormOpen(!isFormOpen)}>Create Student</button>

//       {/* Render the form if isFormOpen is true */}
//       {isFormOpen && (
//         <div className="form-container">
//           <h2>Add Student</h2>
//           <div>
//             <input
//               type="text"
//               placeholder="Name"
//               value={newStudent.name}
//               onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
//             />
//             <input
//               type="number"
//               placeholder="Age"
//               value={newStudent.age}
//               onChange={(e) => setNewStudent({ ...newStudent, age: e.target.value })}
//             />
//             <input
//               type="date"
//               placeholder="Date of Birth"
//               value={newStudent.date_of_birth}
//               onChange={(e) => setNewStudent({ ...newStudent, date_of_birth: e.target.value })}
//             />
//             <button onClick={addStudent}>Add Student</button>
//           </div>
//         </div>
//       )}

//       <table className="student-details-table">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Age</th>
//             <th>Date of Birth</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {Array.isArray(students) ? (
//             students.map((student) => (
//               <tr key={student.id}>
//                 <td>{student.id}</td>
//                 <td>{student.name}</td>
//                 <td>{student.age}</td>
//                 <td>{student.dob}</td>
//                 <td>
//                   <button onClick={() => deleteStudent(student.id)}>Delete</button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="5">No student data available</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default StudentDetails;


import React, { useState, useEffect } from "react";
import axios from "axios";
import "./studentdetails.css";

const StudentDetails = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ name: "", age: "", date_of_birth: "" });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingStudentId, setEditingStudentId] = useState(null);

  useEffect(() => {
    // Fetch student details from API
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    axios
      .get("http://localhost/backend/students.php")
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching student details:", error);
      });
  };

  const addStudent = () => {
    axios
      .post("http://localhost/backend/addstu.php", newStudent)
      .then(() => {
        // Clear the form and reload students
        setNewStudent({ name: "", age: "", date_of_birth: "" });
        fetchStudents();
        // Close the form
        setIsFormOpen(false);
      })
      .catch((error) => {
        console.error("Error adding student:", error);
      });
  };

  const editStudent = () => {
    axios
      .put(`http://localhost/backend/editstu.php?id=${editingStudentId}`, newStudent)
      .then(() => {
        // Clear the form and reload students
        setNewStudent({ name: "", age: "", date_of_birth: "" });
        fetchStudents();
        // Close the form and exit edit mode
        setIsFormOpen(false);
        setIsEditing(false);
        setEditingStudentId(null);
      })
      .catch((error) => {
        console.error("Error editing student:", error);
      });
  };

  const deleteStudent = (id) => {
    axios
      .delete(`http://localhost/backend/deletestu.php?id=${id}`)
      .then(() => {
        // Reload students
        fetchStudents();
      })
      .catch((error) => {
        console.error("Error deleting student:", error);
      });
  };

  const startEdit = (id, student) => {
    // Populate the form with the student's details
    setNewStudent({ ...student });
    setIsFormOpen(true);
    setIsEditing(true);
    setEditingStudentId(id);
  };

  return (
    <div className="student-details-container">
      <h2>Student Details</h2>
      <button onClick={() => setIsFormOpen(!isFormOpen)}>
        {isEditing ? "Cancel Edit" : "Create Student"}
      </button>

      {/* Render the form if isFormOpen is true */}
      {isFormOpen && (
        <div className="form-container">
          <h2>{isEditing ? "Edit Student" : "Add Student"}</h2>
          <div>
            <input
              type="text"
              placeholder="Name"
              value={newStudent.name}
              onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
            />
            <input
              type="number"
              placeholder="Age"
              value={newStudent.age}
              onChange={(e) => setNewStudent({ ...newStudent, age: e.target.value })}
            />
            <input
              type="date"
              placeholder="Date of Birth"
              value={newStudent.date_of_birth}
              onChange={(e) =>
                setNewStudent({ ...newStudent, date_of_birth: e.target.value })
              }
            />
            {isEditing ? (
              <button onClick={editStudent}>Save</button>
            ) : (
              <button onClick={addStudent}>Add Student</button>
            )}
          </div>
        </div>
      )}

      <table className="student-details-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Date of Birth</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(students) ? (
            students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.age}</td>
                <td>{student.dob}</td>
                <td>
                  <button onClick={() => deleteStudent(student.id)}>Delete</button>
                  <button onClick={() => startEdit(student.id, student)}>Edit</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No student data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentDetails;
