export const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const formateTime = (dateStr: string) => {
  return new Date(dateStr).toLocaleString();
};
