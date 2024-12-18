import { Timestamp } from "firebase/firestore";
import moment from "moment";

export function getInitials(input: string) {
  // Split the string by whitespace into words
  const words = input.trim().split(/\s+/);

  // Map each word to its first character and join them
  const initials = words.map((word) => word[0]?.toUpperCase()).join("");

  return initials;
}

export const relativeTimeSent = (nanoseconds: number, seconds: number) => {
  const relativeTime = new Timestamp(seconds, nanoseconds).toDate();
  return moment(relativeTime).fromNow();
};
