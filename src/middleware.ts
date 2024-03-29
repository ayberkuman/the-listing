export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/your-entries",
    "/browse",
    "/create",
    "/entries/:path*",
    "/edit-entry/:path*",
  ],
};
