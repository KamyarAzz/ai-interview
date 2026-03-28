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
      name: "Interviews",
      href: "/interviews",
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

  const logoutItem = {
    name: "Logout",
    href: "/logout",
    image: logoutIcon,
  };

  return (
    <div className="px-2.5 gap-2 h-full flex py-4 flex-col w-60 shadow-md">
      {sidebarItems.map((item) => (
        <SidebarItem key={item.href} item={item} />
      ))}
      <div className="mt-auto">
        <SidebarItem item={logoutItem} />
      </div>
    </div>
  );
}
