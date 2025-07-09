import { Button } from "@chakra-ui/react";
import { toaster, Toaster } from "./ui/toaster";
import Form from "./Form";

function ButtonComponent() {

  const handleClick = () => {
    toaster.create({
      title: "Button Clicked",
      description: "You clicked the button!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Form/>
      <Button colorPalette="blue" variant="surface" onClick={handleClick} className="mt-4">
        Create
      </Button>
      <Toaster />
    </div>
  );
}

export default ButtonComponent;
