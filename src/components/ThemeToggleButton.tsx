import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Button, useColorMode } from "@chakra-ui/react";

const ThemeToggleButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleColorMode}
      padding={3}
      className="mx-4"
    >
      {colorMode === "light" ? (
        <MoonIcon stroke="currentColor" fill="currentColor" />
      ) : (
        <SunIcon stroke="currentColor" fill="currentColor" />
      )}
    </Button>
  );
};

export default ThemeToggleButton;
