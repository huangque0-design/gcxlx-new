export function successResponse(data, message = "success") {
  return {
    success: true,
    message,
    data,
  };
}

export function errorResponse(message = "error", details = null) {
  return {
    success: false,
    message,
    details,
  };
}

