import { generateId } from "ai";
import { redirect } from "next/navigation";

export default async function ChatRedirect() {
  const id = generateId();
  return redirect(`/chat/${id}`);
}

