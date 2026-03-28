type Props = {setIsOpened: React.Dispatch<React.SetStateAction<boolean>>};

export default function ProfileImage({setIsOpened}: Props) {
  return (
    <div
      className="w-full h-full bg-gray-300 rounded-full cursor-pointer"
      onClick={() => setIsOpened((o) => !o)}
    />
  );
}
