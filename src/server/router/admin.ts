import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createRouter } from "./context";

export const adminRought = createRouter()
  .query("getSession", {
    resolve({ ctx }) {
      return ctx.session;
    },
  })
  .middleware(async ({ ctx, next }) => {
    // Any queries or mutations after this middleware will
    // raise an error unless there is a current session
    if (!ctx.session) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    } else if (ctx.session.user.role != "admin") {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Not an admin, go talk to Karen",
      });
    }
    return next();
  })
  .mutation("add-episode", {
    input: z.object({
      title: z.string(),
      youtubeLink: z.string(),
      description: z.string(),
      image: z.string(),
      episodeNumber: z.number(),
    }),
    async resolve({ ctx, input }) {
      const episode = await ctx.prisma.episode.create({
        data: {
          title: input.title,
          youtubeLink: input.youtubeLink,
          description: input.description,
          image: input.image,
          episodeNumber: input.episodeNumber,
        },
      });

      return episode;
    },
  });
