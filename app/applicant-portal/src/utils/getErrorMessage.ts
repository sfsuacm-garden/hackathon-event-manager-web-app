

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getErrorMessage(err: any, defaultMessage: string): string {
  // Handle server errors (500+)
  if (
    err?.response?.status >= 500 ||
    err?.message?.includes('500') ||
    err?.message?.toLowerCase().includes('server error')
  ) {
    return 'Something went wrong on our end. Please try again in a moment.';
  }
  
  // Handle rate limiting (429)
  if (
    err?.response?.status === 429 ||
    err?.message?.toLowerCase().includes('rate limit')
  ) {
    return 'Too many attempts. Please wait a few minutes before trying again.';
  }
  
  // Handle not found (404)
  if (err?.response?.status === 404) {
    return "'We couldn't find what you're looking for. Please try again.'";
  }
  
  // Handle bad request (400)
  if (err?.response?.status === 400) {
    return err?.response?.data?.message || err?.message || 'Invalid request. Please check your information and try again.';
  }
  
  // Return API error message if available
  if (err?.response?.data?.message) {
    return err.response.data.message;
  }
  
  if (err instanceof Error && err.message) {
    return err.message;
  }
  
  // Fallback to default message
  return defaultMessage;
}