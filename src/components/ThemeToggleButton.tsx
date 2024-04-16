import { Button, useColorMode } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

const ThemeToggleButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button size="sm" onClick={toggleColorMode} padding={3}>
      {colorMode === "light" ? (
        <MoonIcon stroke="currentColor" fill="currentColor" />
      ) : (
        <SunIcon stroke="currentColor" fill="currentColor" />
      )}
    </Button>
  );
};

export default ThemeToggleButton;
