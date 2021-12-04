const setColorScheme = (theme) => {
  switch (theme) {
    case "nonpayable":
      return "red"

    case "view":
      return "blue"

    case "payable":
      return "green"

    default:
      return "none"
  }
};

export default setColorScheme