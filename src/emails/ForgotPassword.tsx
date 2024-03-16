import { Button, Heading, Hr, Html, Text } from "@react-email/components";
import * as React from "react";

export default function FrogetPassword({
  params,
}: {
  params: { name: string; url: string };
}) {
  return (
    <Html>
      <Heading>{params.name}</Heading>
      <Text>We receive the reset password message</Text>
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
      <Heading>Regards</Heading>
      <Text>Ravi Kumar</Text>
    </Html>
  );
}
