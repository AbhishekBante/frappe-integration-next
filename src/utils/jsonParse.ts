

export const jsonParse = (payload: any) => {
  return typeof payload === "string" ? JSON.parse(payload) : payload;
};

export const jsonParseSafe = (payload: any) => {
  try {
    const json = jsonParse(payload);
    return json;
  } catch (err) {
    console.error(err);
    return payload;
  }
};
