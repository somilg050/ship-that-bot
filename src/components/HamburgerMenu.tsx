import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuItem,
  MenuDivider,
  useDisclosure,
  Box,
} from "@chakra-ui/react";
import Image from "next/image";
import { CgProfile } from "react-icons/cg";

type ModalProps = {
  username: string | null;
  userEmail: string | null;
  photoURL: string | null;
  onSignOutClick: () => void;
};

const HamburgerMenu: React.FC<ModalProps> = ({
  username,
  userEmail,
  photoURL,
  onSignOutClick,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Menu isOpen={isOpen} onClose={onClose} placement="bottom-end">
      <MenuButton
        as={Box}
        onClick={isOpen ? onClose : onOpen}
        className={
          "dropdown-button block h-10 w-10 rounded-full overflow-hidden border border-gray-600 focus:outline-none focus:border-white"
        }
      >
        {photoURL ? (
          <Image
            src={photoURL}
            alt="Your avatar"
            width={100} // Set the desired width
            height={100} // Set the desired height
            className="object-cover" // Optional: Use Tailwind CSS classes for styling
          />
        ) : (
          <CgProfile size={40} /> // If there's no user photo, show a placeholder icon or image
        )}
      </MenuButton>
      <MenuList>
        <MenuGroup title={username ?? "User"}></MenuGroup>
        <MenuGroup title={userEmail ?? "Welcome to ShipThatBot"}></MenuGroup>
        <MenuDivider />
        <MenuGroup>
          <MenuItem
            as="a"
            href="mailto:hello@nomadicbug.com"
            onClick={(e) => {
              window.open("mailto:hello@nomadicbug.com", "_blank");
              e.preventDefault(); // Prevent the default anchor tag behaviour
            }}
          >
            Contact Us
          </MenuItem>
          <MenuItem
            as="a"
            href="mailto:hello@nomadicbug.com"
            onClick={(e) => {
              window.open("mailto:hello@nomadicbug.com", "_blank");
              e.preventDefault(); // Prevent the default anchor tag behaviour
            }}
          >
            Report a Bug 🐞
          </MenuItem>
        </MenuGroup>
        <MenuDivider />
        <MenuItem onClick={onSignOutClick}>Sign out</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default HamburgerMenu;
