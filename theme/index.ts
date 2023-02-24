// 1. Import the extendTheme function
import { extendTheme, theme as chakraTheme } from "@chakra-ui/react";
import styles from "./global";
import components from "./components";
import colors from "./colors";

const theme = extendTheme({ colors: colors(chakraTheme), styles, components });

export default theme;
