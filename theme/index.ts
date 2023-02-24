// 1. Import the extendTheme function
import { extendTheme } from "@chakra-ui/react";
import styles from "./global";
import components from "./components";

const theme = extendTheme({ styles, components });

export default theme;
