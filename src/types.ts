export type LanyardResponse = {
  success: boolean;
};

export type LanyardData = {
  kv: {
    [key: string]: string;
  }[];
  discord_user: {
    id: string;
    username: string;
    avatar: string;
    discriminator: string;
    clan: {
      tag: string;
      identity_guild_id: string;
      badge: string;
      identity_enabled: boolean;
    };
    avatar_decoration_data: null;
    bot: boolean;
    global_name: string;
    primary_guild: {
      tag: string;
      identity_guild_id: string;
      badge: string;
      identity_enabled: boolean;
    };
    display_name: string;
    public_flags: number;
  };
  activities: Activity[];
  discord_status: keyof typeof Status;
  active_on_discord_web: boolean;
  active_on_discord_desktop: boolean;
  active_on_discord_mobile: boolean;
  listening_to_spotify: boolean;
  spotify: null;
};

export enum Status {
  online = "online",
  idle = "idle",
  dnd = "dnd",
  offline = "offline",
}

export type Activity = {
  name: string;
  details: string;
  state?: string;
  type: number;
};

export type ProfileData = {
  username: string;
  age: number;
  avatarUrl: string;
  status: Status;
  activitities: RefinedActivity[];
};

export type RefinedActivity = Activity & {
  custom: boolean;
  text: string;
};
