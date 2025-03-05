import { UserDetails } from "../user";

export type CommentItem = {
  id: number;
  userid: number;
  createdat: Date | null;
  updatedat: Date | null;
  content: string;
  blogid: number;
  users: UserDetails;
};
