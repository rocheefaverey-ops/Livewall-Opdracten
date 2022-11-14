export type MediaType = {
  alt: string | null;
  focalPoint: FocalPoint | null;
  format: 'mp4' | 'jpg';
  height: number;
  blurUpThumb: string;
  id: string;
  size: number;
  title: string | null;
  url: string | null;
  width: number;
  responsiveImage: responsiveImage | null;
};

type FocalPoint = {
  x: string;
  y: string;
};

type responsiveImage = {
  aspectRatio: number;
};
