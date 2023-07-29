export const consoleLog = (description: string) => {
  const env = process.env.NODE_ENV;
  if (env === "development") {
    console.log(`Error : ${description}`);
  }
};
