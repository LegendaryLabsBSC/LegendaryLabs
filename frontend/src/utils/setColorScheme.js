const setColorScheme = (theme) => {
  switch (theme) {
    case "nonpayable":
      return "red"

    case "view":
      return "blue"

    case "payable":
      return "green"

    default:
      return "gray"
  }
};

export default setColorScheme