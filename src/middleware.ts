import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { CustomUser } from "./app/api/auth/[...nextauth]/options";

export default async function middleWare(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/login" || pathname === "/admin") {
    return NextResponse.next();
  }
  const token = await getToken({ req: request });

  /* protected route for user */
  const userProctedRoutes = ["/"];
  /* protected route for admin */
  const adminProctedRoutes = ["/admin/dashboard"];

  if (
    token == null &&
    (userProctedRoutes.includes(pathname) ||
      adminProctedRoutes.includes(pathname))
  ) {
    return NextResponse.redirect(
      new URL("/login?error=Please login first", request.url)
    );
  }

  /* get user token */
  const user: CustomUser | null = token?.user as CustomUser;

  /* if user try to access admin routes */
  if (adminProctedRoutes.includes(pathname) && user.role == "User") {
    return NextResponse.redirect(
      new URL("/admin?error=please login first", request.url)
    );
  }
  /* if admin try to access user routes */
  if (userProctedRoutes.includes(pathname) && user.role == "Admin") {
    return NextResponse.redirect(
      new URL("/login?error=please login first", request.url)
    );
  }
}
