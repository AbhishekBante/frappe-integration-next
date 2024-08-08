import { z } from "zod";


export const createErrorObject = (error: any) => {
  if (typeof error === "string") {
    return {
      success: false,
      error: {
        message: error,
      },
    };
  }
  return {
    success: false,
    error,
  };
};

export const createErrorObjectUsingError = (err: unknown) => {
  console.log(err);
  let error;
  if (err instanceof z.ZodError) {
    error = {
      message: err.issues[0].message,
      issues: err.issues,
    };
  } else {
    const errorAsAny = err as any;
    error = { message: errorAsAny?.message };
  }
  const errorResponse = createErrorObject(error);

  return errorResponse;
};
