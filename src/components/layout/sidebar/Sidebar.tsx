import SidebarItem from "./SidebarItem";
import dashboardIcon from "../../../assets/images/sidebar/dashboard.svg";
import interviewIcon from "../../../assets/images/sidebar/interview.svg";
import historyIcon from "../../../assets/images/sidebar/history.svg";
import settingsIcon from "../../../assets/images/sidebar/settings.svg";
import logoutIcon from "../../../assets/images/sidebar/logout.svg";

export default function Sidebar() {
  const sidebarItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      image: dashboardIcon,
    },
    {
      name: "Interview",
      href: "/interview",
      image: interviewIcon,
    },
    {
      name: "Interview History",
      href: "/interview-history",
      image: historyIcon,
    },
    {
      name: "Settings",
      href: "/settings",
      image: settingsIcon,
    },
  ];

  const logout = () => {
    localStorage.removeItem("token");
    // Todo: Logout functioanlity
  };

  return (
    <div className="px-2.5 gap-2 h-full flex py-4 flex-col w-60 shadow-md">
      {sidebarItems.map((item) => (
        <SidebarItem key={item.href} item={item} />
      ))}
      <div
        onClick={logout}
        className="w-full mt-auto flex items-center gap-2 px-2.5 py-2 rounded-md transition hover:bg-gray-200"
      >
        <img className="w-6 h-6" src={logoutIcon} alt="Logout" />
        <span>Logout</span>
      </div>
    </div>
  );
}
