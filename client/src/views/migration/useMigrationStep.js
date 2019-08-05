export const useMigrationStep = location => {
  if (location.pathname.includes("slack-authentication")) {
    return 0;
  } else if (location.pathname.includes("o365-authentication")) {
    return 1;
  } else if (location.pathname.includes("selection")) {
    return 2;
  }

  return -1;
};
