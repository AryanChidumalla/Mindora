import { signOut } from "firebase/auth";
import { auth } from "../firebase";

function Settings() {
  const user = auth.currentUser;

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border-2 border-primary p-4 rounded-md flex flex-col gap-4 align-center justify-center md:min-w-[400px]">
        <h1 className="text-xl font-bold">Settings</h1>
        <div className="flex gap-2 items-center">
          <div className="font-bold text-l">Username: </div>
          <div className="w-full text-l bg-gray p-2 rounded">
            {user.displayName}
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <div className="font-bold text-l">Email: </div>
          <div className="w-full text-l bg-gray p-2 rounded">{user.email}</div>
        </div>
        <button
          className="self-end bg-primary text-white px-4 py-2 rounded-md"
          onClick={handleLogout}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default Settings;
