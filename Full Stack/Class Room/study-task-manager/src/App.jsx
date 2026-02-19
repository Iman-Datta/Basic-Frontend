// import { useState, useEffect } from "react";
// import axios from "axios";

// function App() {
//   const [taskName, setTaskName] = useState("");
//   const [subject, setSubject] = useState("");
//   const [deadline, setDeadline] = useState("");
//   const [status, setStatus] = useState("Pending");
//   const [tasks, setTasks] = useState([]);

//   const API_URL = "http://localhost:5000/api/tasks";

//   // ================= FETCH TASKS =================
//   const fetchTasks = async () => {
//     try {
//       const response = await axios.get(API_URL);
//       setTasks(response.data);
//     } catch (error) {
//       console.error("Error fetching tasks:", error);
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, []);


//   const handleAddTask = async () => {
//     if (!taskName || !subject || !deadline) {
//       alert("Fill all fields");
//       return;
//     }

//     try {
//       await axios.post(API_URL, {
//         taskName,
//         subject,
//         deadline,
//         status,
//       });

//       fetchTasks(); 

//       setTaskName("");
//       setSubject("");
//       setDeadline("");
//       setStatus("Pending");
//     } catch (error) {
//       console.error("Error adding task:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md">
//         <h1 className="text-2xl font-bold mb-6 text-center">
//           Study Task Manager
//         </h1>

//         <div className="grid gap-4 mb-6">
//           <input
//             type="text"
//             placeholder="Task Name"
//             value={taskName}
//             onChange={(e) => setTaskName(e.target.value)}
//             className="border p-2 rounded"
//           />

//           <input
//             type="text"
//             placeholder="Subject"
//             value={subject}
//             onChange={(e) => setSubject(e.target.value)}
//             className="border p-2 rounded"
//           />

//           <input
//             type="date"
//             value={deadline}
//             onChange={(e) => setDeadline(e.target.value)}
//             className="border p-2 rounded"
//           />

//           <select
//             value={status}
//             onChange={(e) => setStatus(e.target.value)}
//             className="border p-2 rounded"
//           >
//             <option value="Pending">Pending</option>
//             <option value="Completed">Completed</option>
//           </select>

//           <button
//             onClick={handleAddTask}
//             className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
//           >
//             Add Task
//           </button>
//         </div>

//         {/* TASK LIST */}
//         {tasks.length === 0 ? (
//           <p className="text-center text-gray-500">No tasks yet</p>
//         ) : (
//           <div className="space-y-4">
//             {tasks.map((task) => (
//               <div key={task._id} className="p-4 border rounded-lg">
//                 <h2 className="font-semibold">{task.taskName}</h2>
//                 <p className="text-sm text-gray-600">{task.subject}</p>
//                 <p className="text-sm">
//                   Deadline: {new Date(task.deadline).toLocaleDateString()}
//                 </p>
//                 <p
//                   className={`text-sm font-semibold ${
//                     task.status === "Completed"
//                       ? "text-green-600"
//                       : "text-red-500"
//                   }`}
//                 >
//                   {task.status}
//                 </p>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;
