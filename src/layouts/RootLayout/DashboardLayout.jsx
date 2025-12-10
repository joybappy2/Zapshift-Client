import Logo from "../../components/Logo/Logo";
import { Link, NavLink, Outlet } from "react-router";
import { FaBoxOpen, FaUsers } from "react-icons/fa";
import { IoIosAddCircle, IoMdAdd, IoMdHome } from "react-icons/io";
import { use } from "react";
import { AuthContext } from "../../Authentication/AuthContext/AuthContext";
import { MdOutlinePayments } from "react-icons/md";
import { RiEBike2Fill } from "react-icons/ri";
import useRole from "../../hooks/useRole";

const DashboardLayout = () => {
  const { user } = use(AuthContext);

  const { role, roleLoading } = useRole();

  if (roleLoading) {
    return;
  }

  return (
    <div>
      <div className="drawer lg:drawer-open min-h-screen">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Navbar */}
          <nav className="navbar w-full bg-base-100 flex justify-between">
            <div className="flex items-center">
              <label
                htmlFor="my-drawer-4"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                {/* Sidebar toggle icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                  <path d="M9 4v16"></path>
                  <path d="M14 10l2 2l-2 2"></path>
                </svg>
              </label>

              <Logo></Logo>
            </div>

            <div>{user?.email}</div>
          </nav>
          {/* Page content here */}

          <div className="py-5 px-5">
            <Outlet></Outlet>
          </div>
        </div>

        <div className="drawer-side is-drawer-close:overflow-visible">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
            {/* Sidebar content here */}
            <ul className="menu w-full grow space-y-2">
              {/* Dashboard home */}
              <Link to="/dashboard">
                <li>
                  <button
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Dashboard"
                  >
                    <IoMdHome className="text-lg" />
                    <span className="is-drawer-close:hidden">Dashboard</span>
                  </button>
                </li>
              </Link>

              {/* My Parcel */}
              <NavLink to="/dashboard/my-parcels">
                <li>
                  <button
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="My Parcels"
                  >
                    {/* Home icon */}
                    <FaBoxOpen className="text-lg" />

                    <span className="is-drawer-close:hidden">My Parcels</span>
                  </button>
                </li>
              </NavLink>

              {/* payment history */}
              <NavLink to="/dashboard/payment-history">
                <li>
                  <button
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Payment History"
                  >
                    {/* Pay icon */}
                    <MdOutlinePayments
                      className="text-lg
                    "
                    />

                    <span className="is-drawer-close:hidden">
                      Payment History
                    </span>
                  </button>
                </li>
              </NavLink>

              {role.role === "admin" && (
                <>
                  {/* Riders Application */}
                  <NavLink to="/dashboard/riders-application">
                    <li>
                      <button
                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                        data-tip="Riders Application"
                      >
                        {/* Pay icon */}
                        <RiEBike2Fill className="text-lg" />

                        <span className="is-drawer-close:hidden">
                          Riders Application
                        </span>
                      </button>
                    </li>
                  </NavLink>

                  {/* Manage Users */}
                  <NavLink to="/dashboard/manage-users">
                    <li>
                      <button
                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                        data-tip="Manage Users"
                      >
                        {/* Pay icon */}
                        <FaUsers className="text-lg"></FaUsers>

                        <span className="is-drawer-close:hidden">
                          Manage Users
                        </span>
                      </button>
                    </li>
                  </NavLink>

                  
              {/* assign riders */}
              <NavLink to="/dashboard/assign-riders">
                <li>
                  <button
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Assign Riders"
                  >
                    {/* Pay icon */}
                    <IoMdAdd className="text-lg" />
                    <span className="is-drawer-close:hidden">
                      Assign Riders
                    </span>
                  </button>
                </li>
              </NavLink>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
