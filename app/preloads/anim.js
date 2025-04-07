export const slideUp = {
  initial: { y: "100%", opacity: 0 }, // Start off-screen
  enter: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }, // Slide up
  exit: { y: "-100%", opacity: 0, transition: { duration: 0.6, ease: "easeIn" } }, // Slide out
};

export const opacity = {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 1 } },
};
