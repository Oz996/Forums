import { useAuth } from "@/hooks/useAuth";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";

const UserMenu = () => {
  const { userEmail, userId, handleLogout } = useAuth();

  const handleLogoutClick = () => {
    handleLogout();
    toast.success("Signed out");
  };
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly className="text-white" size="sm" variant="light">
          <FaUser size={16} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownSection showDivider>
          <DropdownItem>
            <div className="text-small font-bold">{userEmail}</div>
          </DropdownItem>
        </DropdownSection>
        <DropdownItem>
          <div className="w-full">
            <Link className="w-full" href={`/user/${userId}`}>
              Edit User
            </Link>
          </div>
        </DropdownItem>
        <DropdownItem>
          <div className="cursor-pointer" onClick={handleLogoutClick}>
            Logout
          </div>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserMenu;
