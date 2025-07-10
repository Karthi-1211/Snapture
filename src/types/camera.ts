
export interface Filter {
  id: string;
  name: string;
  css: string;
}

export interface CameraCaptureProps {
  selectedLayout: string;
  photoCount: number;
  onAllPhotosCapture: (photos: string[], selectedFilter: string) => void;
}
