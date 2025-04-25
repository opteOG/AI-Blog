import Link from "next/link";
import { buttonVariants } from "../components/ui/button";
import checkPermissions from "../utils/checkPermissions";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function ChatRedirect() {
  if (await checkPermissions("use-ai")) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const userId = user.id;
    return redirect(`/chat/${userId}`);
  }
  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-center text-2xl">很抱歉，您没有权限访问此页面</h1>
      <div className="mt-2 cursor-pointer">
        <Link href={"/"} className={buttonVariants()}>
          点击此处返回
        </Link>
      </div>
    </div>
  );
}
