// app/test/page.js

import { getServerSession } from "next-auth";

export default async function Test() {

  const session = await getServerSession();

  console.log(session);

  return (
    <pre>
      {JSON.stringify(session, null, 2)}
    </pre>
  );
}