export const responseTypes = {
  200: 'success',
  400: 'bad',
  500: 'error',
};

export const message = (base: string, code: number) => {
  return `${base}_${responseTypes[code]}`;
};
