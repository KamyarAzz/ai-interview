import {useAuthStore} from "@/stores/authStore";
import {useEffect, useState} from "react";
import ProfileBox from "./ProfileBox";
import ProfileImage from "./ProfileImage";

export default function Profile() {
  const [isOpened, setIsOpened] = useState(false);
  const user = useAuthStore((s) => s.user);
  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="w-10 h-10">
      <ProfileImage setIsOpened={setIsOpened} />
      {isOpened && <ProfileBox user={user} setIsOpened={setIsOpened} />}
    </div>
  );
}
