import { createStandaloneToast } from "@chakra-ui/toast";
import theme from "@/theme";

const { ToastContainer, toast } = createStandaloneToast({ theme });

const notifySuccess = (msg: string) =>
  toast({
    title: "Success",
    description: msg,
    status: "success",
    duration: 9000,
    position: "top-right",
    isClosable: true,
  });
const notifyError = (msg: string) =>
  toast({
    title: "Error",
    description: msg,
    status: "error",
    duration: 9000,
    isClosable: true,
    position: "top-right",
  });

export { ToastContainer, notifySuccess, notifyError };
