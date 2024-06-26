import { useAuth } from "@/hooks/useAuth";
import { getBaseUrl } from "@/lib/utils/getBaseUrl";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";
import { FaPlus, FaUser } from "react-icons/fa";
import { toast } from "react-toastify";

const UserMenu = () => {
  const { userEmail, userId, handleLogout, premium } = useAuth();

  const handleLogoutClick = async () => {
    try {
      await axios.post(getBaseUrl() + "/api/logout");
      handleLogout();
      toast.success("Signed out");
    } catch (error) {
      console.error(error);
    }
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
        {!premium && (
          <DropdownItem>
            <div className="w-full">
              <Link
                className="w-full flex gap-1 items-center"
                href={"/upgrade"}
              >
                <FaPlus />
                <p>Upgrade</p>
              </Link>
            </div>
          </DropdownItem>
        )}
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
