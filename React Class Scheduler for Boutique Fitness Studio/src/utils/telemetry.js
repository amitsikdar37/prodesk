export const logAction = (actionName, details = {}) => {
  console.log(`[Analytics] ${actionName}`, details);
};
