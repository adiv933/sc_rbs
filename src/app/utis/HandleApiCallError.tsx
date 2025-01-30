export const extractApiError = (error: any) => {
  if (!error || typeof error !== "object") {
    return { type: "unknown", error_message: "Unexpected error format" };
  }

  if (error.status === "validation_error") {
    const errorObject = error.data ?? {};
    const errors = Object.keys(errorObject).map((field: string) => ({
      type: "validation",
      fieldName: field,
      messages: errorObject[field]?.[0] || "Invalid input",
    }));
    return {
      type: "validation",
      errors,
    };
  }

  if (error.status === "error") {
    return {
      type: "api_error",
      error_message: error.message || "An error occurred",
    };
  }

  // Default case to handle unknown errors
  return { type: "unknown", error_message: "An unexpected error occurred" };
};
