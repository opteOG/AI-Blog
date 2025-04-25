import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function checkPermissions(permission: string) {
  const { getPermissions } = getKindeServerSession();
  const permissions = await getPermissions();
  if (permissions?.permissions.includes(permission)) {
    return true;
  } else {
    return false;
  }
}
