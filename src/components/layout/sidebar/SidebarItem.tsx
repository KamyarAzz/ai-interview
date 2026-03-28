import {Link} from "react-router";

type Props = {item: {name: string; href: string; image: string}};

export default function SidebarItem({item}: Props) {
  return (
    <Link
      to={item.href}
      className="rounded-md hover:bg-gray-200 duration-200 cursor-pointer w-full flex items-center gap-2 px-2.5 py-2"
    >
      <img className="w-6 h-6" src={item.image} alt={item.name} />
      <span>{item.name}</span>
    </Link>
  );
}
