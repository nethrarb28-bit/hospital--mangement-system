export const appointmentLoggerMiddleware = (store) => (next) => (action) => {
  if (action.type.startsWith('appointments/')) {
    console.log('[Middleware] Action Dispatched:', action.type);
    console.log('[Middleware] Payload:', action.payload);
  }
  return next(action);
};