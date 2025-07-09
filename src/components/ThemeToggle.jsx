import { Button } from '@chakra-ui/react'
import { useColorMode, ColorModeIcon } from './ui/color-mode'

export function ThemeToggle() {
  const { toggleColorMode, colorMode } = useColorMode()
  
  return (
    <Button 
      onClick={toggleColorMode}
      leftIcon={<ColorModeIcon />}
      variant="outline"
    >
      {colorMode === 'light' ? '🌚' : '🌞'}
    </Button>
  )
}