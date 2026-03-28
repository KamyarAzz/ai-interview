import {NavLink} from "react-router";

type Props = {item: {name: string; href: string; image: string}};

export default function SidebarItem({item}: Props) {
  return (
    <NavLink
      to={item.href}
      className={({isActive}) =>
        `w-full flex items-center gap-2 px-2.5 py-2 rounded-md transition
         ${isActive ? "bg-blue-100  font-medium cursor-auto" : "hover:bg-gray-200"}`
      }
    >
      <img className="w-6 h-6" src={item.image} alt={item.name} />
      <span>{item.name}</span>
    </NavLink>
  );
}
