export interface Text {
  _id: number;
  text: string;
  coords: number[];
  style: {
    color: string;
    fontSize: string;
  };
}
