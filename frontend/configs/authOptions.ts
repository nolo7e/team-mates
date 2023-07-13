import type { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authConfig: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId:
        process.env.GOOGLE_CLIENT_ID ||
        "134891159074-fokgds7k81qfq1otsqg1lks4cpumkljq.apps.googleusercontent.com",
      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET ||
        "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",
    }),
  ],
};
