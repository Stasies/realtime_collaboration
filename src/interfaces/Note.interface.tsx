export interface Note {
  _id: number;
  text: string;
  coords: number[];
  style: {
    width: string;
    height: string;
    backgroundColor: string;
  };
}
