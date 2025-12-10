import React, { useState } from "react";
import { FaFan, FaUser, FaUsers } from "react-icons/fa";
import useAxios from "../../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { MdAdminPanelSettings } from "react-icons/md";
import { RiMotorbikeFill } from "react-icons/ri";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const [searchText, setSearchText] = useState("");
  const axiosSecure = useAxios();

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/manage-users?searchText=${searchText}`
      );
      return res.data;
    },
  });

  const handleMakeAdmin = async (user) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#b7d55f",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, Make ${user.displayName} Admin`,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/users/${user?._id}`, {
            role: "admin",
          })
          .then((res) => {
            console.log(res.data);
            if (res.data.modifiedCount) {
              refetch();

              Swal.fire({
                text: `${user.displayName} is now Admin`,
                icon: "success",
                confirmButtonColor: "#b7d55f",
              });
            }
          });
      }
    });
  };

  const handleRemoveFromAdmin = async (user) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#b7d55f",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Remove From Admin",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/users/${user?._id}`, {
            role: "user",
          })
          .then((res) => {
            console.log(res.data);
            if (res.data.modifiedCount) {
              refetch();
              Swal.fire({
                title: "Removed!",
                text: `${user.displayName} removed from Admin`,
                icon: "success",
                confirmButtonColor: "#b7d55f",
              });
            }
          });
      }
    });
  };

  return (
    <div className="bg-base-100 md:p-10 p-4 rounded-2xl">
      <h2 className="text-3xl md:text-4xl font-bold mb-5">Manage Users</h2>

      {/* total card */}
      <div className="w-48 bg-gray-100 rounded-2xl p-4 shadow-sm flex items-center gap-4 mb-5">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow">
          <FaUsers className="text-gray-600 text-xl" />
        </div>
        <div>
          <p className="text-gray-500 text-sm">Total</p>
          <p className="text-2xl font-semibold text-gray-900">{users.length}</p>
        </div>
      </div>

      {/* Search  */}
      <label className="input mb-5">
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input
          onChange={(e) => setSearchText(e.target.value)}
          type="search"
          className="grow"
          placeholder="Search"
        />
      </label>

      {/* table */}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="bg-base-300 text-lg">
              <th>#</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Role</th>
              <th>Admin Actions</th>
              <th>Other Actions</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
              
                  <td className="flex justify-center items-center min-h-[500px] text-center w-screen">
                    <FaFan
                      size={100}
                      className="animate-spin text-primary"
                    ></FaFan>
                  </td>
              
              </tr>
            ) : (
              users.map((user, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-base-200 font-semibol text-lg font-semibold"
                >
                  <th>{idx + 1}</th>
                  <td>
                    <img
                      className="w-16 h-16 object-cover transition-transform duration-300 hover:scale-110 rounded-lg"
                      src={user.photoURL}
                      alt=""
                    />
                  </td>
                  <td>{user.displayName.toUpperCase()}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">
                        {user.role.toUpperCase()}
                      </span>

                      {user.role === "admin" && <MdAdminPanelSettings />}
                      {user.role === "rider" && <RiMotorbikeFill />}
                      {user.role === "user" && (
                        <FaUser className="text-gray-600" />
                      )}
                    </div>
                  </td>

                  <td>
                    {user.role != "admin" ? (
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="btn btn-success btn-sm text-white"
                      >
                        Make Admin
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRemoveFromAdmin(user)}
                        className="btn btn-sm btn-warning text-white"
                      >
                        Remove From Admin
                      </button>
                    )}
                  </td>
                  <td>Delete</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
