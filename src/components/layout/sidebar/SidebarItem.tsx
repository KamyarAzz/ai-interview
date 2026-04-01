import {NavLink, useLocation} from "react-router";

type Props = {
  item: {
    name: string;
    href: string;
    image: string;
    match?: string[];
    exclude?: string[];
  };
};

export default function SidebarItem({item}: Props) {
  const location = useLocation();
  const currentPath = location.pathname;

  const isCurrentlyActive =
    (currentPath === item.href || item.match?.includes(currentPath)) &&
    !item.exclude?.includes(currentPath);

  return (
    <NavLink
      onClick={(e) => {
        if (isCurrentlyActive) {
          e.preventDefault();
        }
      }}
      to={item.href}
      className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-md transition
         ${isCurrentlyActive ? "bg-blue-100  font-medium cursor-auto" : "hover:bg-gray-200"}`}
    >
      <img className="w-6 h-6" src={item.image} alt={item.name} />
      <span>{item.name}</span>
    </NavLink>
  );
}
