import { Button } from "@chakra-ui/react"
import { toaster, Toaster } from "./components/ui/toaster"

function ButtonComponent(){

   const handleClick = () => {
      toaster.create({
         title: "Button Clicked",
         description: "You clicked the button!",
         status: "success",
         duration: 3000,
         isClosable: true,
      });
   }
  return (
   <div className="flex flex-col items-center justify-center h-screen">
      <Button colorPalette='blue' variant='surface' onClick={handleClick}>
         Create
      </Button>
      <Toaster />
   </div>
  )
}

export default ButtonComponent