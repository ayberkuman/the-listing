export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/your-entries",
    "/create",
    "/entries/:path*",
    "/edit-entry/:path*",
  ],
};
