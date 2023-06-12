const CardColor = [
  {
    color: "#ffffff",
    background: "#525D70",
  },
  {
    color: "#ffffff",
    background: "#EF6065",
  },
  {
    color: "#000000",
    background: "#ffffff",
  },
  {
    color: "#000000",
    background: "#dddfe0",
  },
  {
    color: "#000000",
    background: "#f8f8f8",
  },
  {
    color: "#ffffff",
    background: "#b24f4d",
  },
];

export const GetRandomCardTheme = () => {
  const index = Math.floor(Math.random() * (CardColor.length - 0) + 0);
  return CardColor[index];
};
