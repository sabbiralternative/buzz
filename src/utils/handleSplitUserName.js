export const handleSplitUserName = (userName) => {
    if (userName?.includes("_")) {
      const [name] = userName.split("_");
      return name;
    } else {
      return userName;
    }
  };