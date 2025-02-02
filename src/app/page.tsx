"use client";

import Image from "next/image";
import { ReactNode, useEffect, useState } from "react";
import config from "../../config";
import {
  RefinedActivity,
  Activity,
  ProfileData,
  Status,
  LanyardData,
} from "../types";
import { SiDiscord, SiGithub, SiLastdotfm, SiRoblox } from "react-icons/si";
import Link from "next/link";
import { HiSparkles } from "react-icons/hi2";
import Content from "@/components/Content";

export default function Home() {
  const [profileData, setProfileData] = useState<ProfileData>(
    config.fallbackProfile
  );

  // const [loaded, setLoaded] = useState<boolean>(false);

  const colorsFromStatus = {
    online: "outline-green-500",
    idle: "outline-yellow-500",
    dnd: "outline-red-500",
    offline: "outline-gray-500",
  };

  const calcAge = (birthDate: Date) => {
    const today = new Date();
    const diff = today.getTime() - birthDate.getTime();
    const age = diff / (1000 * 60 * 60 * 24 * 365.25);
    return Math.round(age * 100) / 100;
  };

  const refineActivity = (activity: Activity): RefinedActivity => {
    const { name, details, state } = activity;

    if (!state) {
      return {
        ...activity,
        custom: false,
        text: name,
      };
    }

    switch (name) {
      case "Sonixd":
        return {
          ...activity,
          custom: true,
          text: `Listening to ${details} ${state.replace("By", "by")}`,
        };
      case "Visual Studio Code":
        return {
          ...activity,
          custom: true,
          text: `${details} in ${state.toLowerCase()}`,
        };
      case "Roblox":
        return {
          ...activity,
          custom: true,
          text: `Playing ${details
            .replace("Playing", "")
            .replace(/\[.+\]/, "")} on Roblox`,
        };
      default:
        return {
          ...activity,
          custom: false,
          text: name,
        };
    }
  };

  useEffect(() => {
    const refineActivities = (activities: Activity[]): RefinedActivity[] =>
      activities.map(refineActivity);

    const buildProfileData = (data: LanyardData): ProfileData => {
      if (!("discord_user" in data)) {
        return config.fallbackProfile;
      }

      return {
        username: data.discord_user.global_name,
        age: calcAge(config.birthDate),
        avatarUrl: `https://cdn.discordapp.com/avatars/${config.discordUserId}/${data.discord_user.avatar}.webp`,
        status: Status[data.discord_status],
        activitities: refineActivities(data.activities) as RefinedActivity[],
      };
    };

    const socket = new WebSocket("wss://api.lanyard.rest/socket");
    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          op: 2,
          d: {
            subscribe_to_ids: [config.discordUserId],
          },
        })
      );
    };
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.op === 1) {
        const interval = data.d.heartbeat_interval;
        setInterval(() => {
          socket.send(
            JSON.stringify({
              op: 3,
            })
          );
        }, interval);
      } else if (data.op === 0 && data.t === "PRESENCE_UPDATE") {
        setProfileData(buildProfileData(data.d));
      } else if (data.op === 0 && data.t === "INIT_STATE") {
        setProfileData(buildProfileData(data.d[config.discordUserId]));
        // setLoaded(true);
      }
    };
  }, []);

  function PlatformLink(props: {
    href: string;
    icon: ReactNode;
    text: string;
    copyText?: boolean;
  }) {
    return (
      <Link
        className="flex flex-row justify-between items-center hover:opacity-80 transition-all group"
        href={props.href}
        onClick={(e) => {
          if (props.copyText) {
            e.preventDefault();
            navigator.clipboard.writeText(props.text).then(
              () => {
                alert(`Copied ${props.text} to clipboard!`);
              },
              () => {
                alert(`Could not copy ${props.text} to clipboard :(`);
              }
            );
          }
        }}
        target="_blank"
        rel="noopener noreferrer"
      >
        {props.icon}
        <div className="w-full mx-4 border-b border-dotted group-hover:border-solid border-neutral-300" />
        <span>{props.text}</span>
      </Link>
    );
  }

  return (
    <div>
      {/* {!loaded && (
        <div className="absolute flex items-center justify-center w-screen h-screen bg-neutral-950 z-10" />
      )} */}
      <Content>
        <div className="flex items-center sm:items-start flex-col">
          <Image
            className={`outline-2 ${colorsFromStatus[profileData.status]}`}
            src={profileData.avatarUrl}
            alt="User's avatar"
            width={80}
            height={0}
          />
          <h1 className="mt-4 text-xl font-bold">{profileData.username}</h1>
          <div className="flex flex-row items-center">
            <HiSparkles className="text-neutral-400 mr-2 hidden md:block" />
            <p className="text-neutral-400">
              {(() => {
                if (profileData.activitities.length > 0) {
                  const activity = profileData.activitities[0];
                  if (activity.custom) {
                    return activity.text;
                  }

                  return `Playing ${activity.name}`;
                }

                return "Idle";
              })()}
            </p>
          </div>
        </div>

        <div className="mt-4 space-y-1 text-neutral-300">
          <p>
            Hey! I&rsquo;m {profileData.username}, a {profileData.age} year old
            programmer who enjoys all things related to technology. I&rsquo;m
            currently studying computer science at an academy.
          </p>
          <p>
            In my free time, I enjoy playing games and watching movies. I also
            love music, and I listen to a wide variety of genres.
          </p>
          <p>
            If you want to know more about me, you can find me on the platforms
            I&rsquo;ve listed below
          </p>
        </div>

        <div className="mt-4 flex flex-col w-full space-y-2">
          <PlatformLink
            copyText={true}
            href={`https://discord.com/users/${config.discordUserId}`}
            icon={<SiDiscord size={32} />}
            text={"logix.lol"}
          />
          <PlatformLink
            href={`https://github.com/logixism`}
            icon={<SiGithub size={32} />}
            text={"logixism"}
          />
          <PlatformLink
            href={`https://www.last.fm/user/logixism`}
            icon={<SiLastdotfm size={32} />}
            text={"logixism"}
          />
          <PlatformLink
            href={`https://roblox.com/users/2947401001/profile`}
            icon={<SiRoblox size={32} />}
            text={"logixism"}
          />
        </div>
      </Content>
    </div>
  );
}
