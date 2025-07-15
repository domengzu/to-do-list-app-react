import { Button } from '@chakra-ui/react'
import { useColorMode, ColorModeIcon } from './ui/color-mode'
import { Moon, Sun } from 'lucide-react' 

export function ThemeToggle() {
  const { toggleColorMode, colorMode } = useColorMode()
  
  return (
    <Button 
      onClick={toggleColorMode}
      leftIcon={<ColorModeIcon />}
      variant="surface"
      size="md"
      colorPalette={colorMode === 'light' ? 'green' : 'yellow'}
    >
      {colorMode === 'light' ? <Moon /> : <Sun />}
    </Button>
  )
}