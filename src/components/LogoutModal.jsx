import React from "react";

import { useDispatch } from "react-redux";
// import authService from "../../appwrite/auth";
import authService from "../appwrite/auth";
// import { logout } from "../../store/authSlice";
import { logout } from "../store/authSlice";

function LogoutModal({ isOpen, setShowModal }) {
  if (!isOpen) return null;
  console.log("yess");

  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
    setShowModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-[90%] max-w-md rounded-2xl bg-gray-800 p-6 shadow-2xl text-white">
        <h2 className="text-xl font-semibold mb-3">Confirm Logout</h2>

        <p className="text-gray-300 mb-6">Are you sure you want to logout?</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={() => {
              setShowModal(false);
              console.log("fuck");
            }}
            className=" px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-all "
          >
            Cancel
          </button>

          <button
            onClick={logoutHandler}
            className=" px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition-all "
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogoutModal;
