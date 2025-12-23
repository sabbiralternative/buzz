export const handleLogOut = () => {
  const keysToRemove = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key) {
      keysToRemove.push(key);
    }
  }
  keysToRemove.forEach((key) => {
    localStorage.removeItem(key);
  });
};
