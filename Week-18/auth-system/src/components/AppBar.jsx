import { useAuth } from "../context/AuthContext";

// export default function AppBar() {
//   const {user, logout} = useAuth();

//   return(
//     <nav className="bg-teal-600 text-white px-6 py-3 flex items-center justify-between">
//       <span className="text-xl font-bold mx-2">Auth System Demo</span>

//       {user &&(
//         <div className="flex items-center gap-4">
//           <span>Welcome, {user.username}</span>
//           <button onClick={logout}
//             className="bg-white text-teal-700 px-4 py-1.5 rounded">
//             Logout
//           </button>
//         </div>
//       )}
//     </nav>
//   );
// }

export default function AppBar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-teal-600 px-6 py-3 flex items-center justify-between">
      <span className="text-white font-semibold text-lg tracking-tight">
        Auth System Demo
      </span>
      {user && (
        <div className="flex items-center gap-4">
          <span className="text-teal-100 text-sm">Welcome, {user.username}!</span>
          <button
            onClick={logout}
            className="bg-white text-teal-700 text-sm font-medium px-4 py-1.5 rounded-lg hover:bg-teal-50 transition-colors"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}