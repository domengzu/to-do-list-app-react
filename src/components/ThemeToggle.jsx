import { Button } from '@chakra-ui/react'
import { useColorMode, ColorModeIcon } from './ui/color-mode'

export function ThemeToggle() {
  const { toggleColorMode, colorMode } = useColorMode()
  
  return (
    <Button 
      onClick={toggleColorMode}
      leftIcon={<ColorModeIcon />}
      variant="surface"
      size="md"
      position={['fixed', 'absolute']}
      right={['1em', '39em']}
      top={['1em', '11.6em']}
      colorPalette={colorMode === 'light' ? 'blue' : 'yellow'}
      fontSize={['md', 'lg']}
    >
      {colorMode === 'light' ? '🌚' : '🌞'}
    </Button>
  )
}