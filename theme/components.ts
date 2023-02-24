export const components = {
  Link: {
    baseStyle: {
      _hover: {
        textDecor: "none",
      },
    },
  },
  Button: {
    variants: {
      normal: {
        bg: "primary.900",
        color: "white",
        _hover: { bg: "primary.700" },
      },
    },
  },
};

export default components;
