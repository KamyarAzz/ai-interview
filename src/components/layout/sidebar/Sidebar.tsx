import SidebarItem from "./SidebarItem";
import dashboardIcon from "../../../assets/images/sidebar/dashboard.svg";
import interviewIcon from "../../../assets/images/sidebar/interview.svg";
import historyIcon from "../../../assets/images/sidebar/history.svg";
import subscriptionsIcon from "../../../assets/images/sidebar/calendar.svg";
import settingsIcon from "../../../assets/images/sidebar/settings.svg";
import logoutIcon from "../../../assets/images/sidebar/logout.svg";

import darkDashboardIcon from "../../../assets/images/sidebar/dark/dashboard-dark.svg";
import darkInterviewIcon from "../../../assets/images/sidebar/dark/interview-dark.svg";
import darkHistoryIcon from "../../../assets/images/sidebar/dark/history-dark.svg";
import darkSubscriptionsIcon from "../../../assets/images/sidebar/dark/calendar-dark.svg";
import darkSettingsIcon from "../../../assets/images/sidebar/dark/settings-dark.svg";
import darkLogoutIcon from "../../../assets/images/sidebar/dark/logout-dark.svg";
import {useThemeStore} from "@/stores/themeStore";

export default function Sidebar() {
  const sidebarItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      image: dashboardIcon,
      darkImage: darkDashboardIcon,
    },
    {
      name: "Interview",
      href: "/interview/configuration",
      match: ["/interview/chat"],
      exclude: ["/interview/history"],
      image: interviewIcon,
      darkImage: darkInterviewIcon,
    },
    {
      name: "Interview History",
      href: "/interview/history",
      image: historyIcon,
      darkImage: darkHistoryIcon,
    },
    {
      name: "Subscriptions",
      href: "/subscriptions",
      image: subscriptionsIcon,
      darkImage: darkSubscriptionsIcon,
    },
    {
      name: "Settings",
      href: "/settings",
      image: settingsIcon,
      darkImage: darkSettingsIcon,
    },
  ];

  const theme = useThemeStore((state) => state.theme);

  const logout = () => {
    localStorage.removeItem("token");
    // Todo: Logout functioanlity
  };

  return (
    <div className="px-2.5 gap-2 h-full flex py-4 flex-col w-60 bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
      {sidebarItems.map((item) => (
        <SidebarItem key={item.href} item={item} />
      ))}
      <div
        onClick={logout}
        className="w-full mt-auto flex cursor-pointer hover:dark:bg-gray-700 items-center gap-2 px-2.5 py-2 rounded-md transition hover:bg-gray-200"
      >
        {theme == "light" ? (
          <img className="w-6 h-6" src={logoutIcon} alt="Logout" />
        ) : (
          <img className="w-6 h-6" src={darkLogoutIcon} alt="Logout" />
        )}
        <span>Logout</span>
      </div>
    </div>
  );
}
