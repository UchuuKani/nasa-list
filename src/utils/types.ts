export interface ImageData {
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  title: string;
  url: string;
  copyright?: string;
}

export type DisplayList = "LIKES" | "RANDOM" | "NONE";

// opting for array instead of object for ease of key removal
// as an array, adding or removing a key will be a linear operation, so if cache becomes large enough could become slow and might need to use object
// for faster lookup (and deletion? Not positive about speed of removing a key from an object)
export type LikesCache = string[];

export interface LikeActions {
  likeImage: (url: string) => void;
  removeLike: (url: string) => void;
}
