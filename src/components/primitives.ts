import { tv } from "tailwind-variants";

export const title = tv({
  base: "tracking-tight inline font-bold",
  variants: {
    color: {
      foreground: "dark:from-[#FFFFFF] dark:to-[#4B4B4B]",
    },
    size: {
      sm: "text-3xl lg:text-4xl",
      md: "text-[2.3rem] lg:text-5xl leading-9",
      lg: "text-4xl lg:text-6xl",
    },
    fullWidth: {
      true: "w-full block",
    },
  },
  defaultVariants: {
    size: "lg",
  },
  compoundVariants: [
    {
      color: ["foreground"],
      class: "bg-clip-text text-transparent bg-gradient-to-b",
    },
  ],
});

export const subtitle = tv({
  base: "w-full md:w-1/2 my-2 text-lg lg:text-xl text-default-600 block max-w-full",
  variants: {
    fullWidth: {
      true: "!w-full",
    },
  },
  defaultVariants: {
    fullWidth: true,
  },
});

export const sectionTitle = tv({
  base: "text-3xl font-semibold",
  variants: {
    fullWidth: {
      true: "!w-full",
    },
  },
  defaultVariants: {
    fullWidth: true,
  },
});

export const backgroundGradient = tv({
  base: "bg-gradient-to-br from-main-light-blue to-main-blue flex items-center justify-around p-4 md:p-8 min-h-[50vh] dark:from-main-dark-blue dark:to-main-dark-blue",
});

export const container = tv({
  base: "container mx-auto max-w-7xl px-6 flex flex-col py-8 lg:py-12 xl:py-16 gap-8",
  variants: {
    fullWidth: {
      true: "!w-full !max-w-full",
    },
  },
  defaultVariants: {
    fullWidth: false,
  },
});
