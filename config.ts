import { ProfileData, Status } from "./src/types";

type Config = {
  discordUserId: string;
  birthDate: Date;
  fallbackProfile: ProfileData;
};

const config: Config = {
  discordUserId: "804066391614423061",
  birthDate: new Date(2007, 12, 15),
  fallbackProfile: {
    username: "logix",
    age: 17,
    avatarUrl: "/seal.png",
    status: Status.offline,
    activitities: [],
  },
};

export default config;
