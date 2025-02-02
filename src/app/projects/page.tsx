"use client";

import Content from "@/components/Content";
import Image from "next/image";
import { HiLink } from "react-icons/hi2";

function Project(props: {
  link: string;
  imageUrl: string;
  name: string;
  stack: string;
  description: string;
}) {
  return (
    <div className="flex flex-row space-x-4">
      <div className="w-60">
        <Image
          src={props.imageUrl}
          width={1024}
          height={1024}
          alt={""}
          className="h-full w-full object-cover"
        />
      </div>
      <div>
        <a
          href={props.link}
          className="flex items-center w-fit text-neutral-200 font-semibold underline"
        >
          {props.name}
          <HiLink className="ml-2" />
        </a>
        <p className="text-neutral-400">{props.stack}</p>
        <p className="text-neutral-300 leading-snug">
          {props.description}
          {/* {props.description.slice(0, 100)}
          {props.description.length > 100 && (
            <span className="text-neutral-400 ml-1">
              ...{" "}
              <button type="button" className="underline">
                Read more
              </button>
            </span>
          )} */}
        </p>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <Content>
      <div className="space-y-4">
        {/* <Project
          imageUrl="/hydroxide.png"
          link="https://discord.com/discovery/applications/1195566389201739817"
          name="Hydroxide"
          stack="Typescript, MongoDB, Elysia, Sockets.io"
          description={`The Hydroxide administration system is a powerful tool designed to streamline server moderation with unmatched precision and efficiency. It provides real-time monitoring capabilities, ensuring secure and accurate oversight of server activity. With its advanced security features, moderators can confidently track events and maintain a safe environment.`}
        /> */}
        <Project
          imageUrl="/va.png"
          link="https://discord.com/discovery/applications/1195566389201739817"
          name="Value Assistant"
          stack="Python, MongoDB"
          description={`Value Assistant is a bot designed to provide comprehensive information about tradable items in Roblox.`}
        />{" "}
      </div>
    </Content>
  );
}
