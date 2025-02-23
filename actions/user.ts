import { handleAsyncAction } from "@/lib/async";
import { getUser } from "@/services/actions/user.action";

export async function getAuth(userId: number) {
  return handleAsyncAction(async () => {
    const user = await getUser(userId);
    let userDetails = null;

    if (!user) {
      return {
        success: false,
        message: "User not found",
        data: null,
      };
    }

    userDetails = {
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdat?.toISOString(),
    };

    return {
      success: true,
      data: userDetails,
    };
  });
}
