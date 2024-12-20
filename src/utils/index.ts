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

export const features = [
  {
    title: "Real-Time Messaging",
    description:
      "Stay connected with your friends and family! Messages are sent and received real-time, ensuring seamless conversations.",
    image: "/assets/feature-1.png",
  },
  {
    title: "User Invitations",
    description:
      "Easily invite other users who are online and available to join a conversation. Connecting with others has never been so straightforward!",
    image: "/assets/user-inv-v2.png",
  },
  {
    title: "Fun with Emojis",
    description:
      "Express yourself better with a wide range of emojis to make your chats more engaging and lively.",
    image: "/assets/funEmoji-v2.png",
  },
  {
    title: "Appealing User Interface",
    description:
      "Designed with a clean and modern interface that’s both visually appealing and intuitive, ensuring a delightful user experience.",
    image: "/assets/feature-4.png",
  },
  {
    title: "Fully Responsive Design",
    description:
      "Access your chats on any device—mobile, tablet, or desktop. The app adapts perfectly to any screen size for a smooth experience.",
    image: "/assets/feature-5.png",
  },
];

export const howItWorks = [
  {
    title: "Sign up for an account or Sign in",
    description:
      "Create a free account to access all the features of the app. If you already have an account, simply sign in to get started.",
  },
  {
    title: "Invite friends to join your chat",
    description:
      "Invite friends to join your chat by navigating to Users button and clicking the start conversation.",
  },
  {
    title: "Start chatting!",
    description:
      "Once you have friends in your chat, you can start chatting with them.",
  },
];

export const futureEnhancements = [
  "Group chat functionality",
  "Video and voice calls",
  "Support file sharing",
  "Customizable themese and user profiles",
];

export const contactUs = [
  {
    title: "Github Repository",
    link: "github link",
  },
  {
    title: "Email",
    link: "email link",
  },
  {
    title: "Follow Us",
    link: "social media links",
  },
];

export const welcomeNavigation = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "Features",
    route: "/features",
  },
  {
    label: "About",
    route: "/about",
  },
];
