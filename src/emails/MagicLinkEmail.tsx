import { Button, Heading, Hr, Html, Text } from "@react-email/components";
import * as React from "react";

export default function MagicLinkEmail({
  params,
}: {
  params: { name: string; url: string };
}) {
  return (
    <Html>
      <Heading>{params.name}</Heading>
      <Text>We receive the Magic Link email</Text>
      <Button
        href={params.url}
        style={{
          border: "2px solid black",
          borderRadius: "10px",
          color: "#61dafb",
          padding: "10px 20px",
        }}
      >
        Click me
      </Button>
      <Hr />
      <Heading>Regards : Sign with magic link</Heading>
      <Text>Coding With Ravi</Text>
    </Html>
  );
}
