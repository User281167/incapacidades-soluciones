import { IconEye, IconLock } from "@tabler/icons-react";

export default function ShowPassword({
  showPassword,
  setShowPassword,
}: {
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      {showPassword ? (
        <IconLock
          className="text-2xl text-default-400 cursor-pointer"
          onClick={() => setShowPassword(false)}
        />
      ) : (
        <IconEye
          className="text-2xl text-default-400 cursor-pointer"
          onClick={() => setShowPassword(true)}
        />
      )}
    </>
  );
}
