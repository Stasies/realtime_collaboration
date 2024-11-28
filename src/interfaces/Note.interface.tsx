export interface Note {
  id: number;
  text: string;
  coords: number[];
  style: {
    width: string;
    height: string;
    backgroundColor: string;
  };
}
