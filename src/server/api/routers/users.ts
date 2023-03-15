import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const usersRouter = createTRPCRouter({
  single: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.user.findFirst({
        where: {
          id: input.id,
        },
        select: {
          resources: true,
          name: true,
          displayName: true,
          id: true,
          image: true,
          bio: true,
          banner: true,
          bannerColor: true,
          permissions: true,
          preferences: {
            select: {
              showResources: true,
            },
          },
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        bio: z.nullable(z.string()),
        displayName: z.nullable(z.string()),
        bannerColor: z.nullable(z.string()),
        banner: z.nullable(z.string()),
        preferences: z.object({
          showResources: z.boolean(),
        }),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          bio: input.bio,
          displayName: input.displayName,
          bannerColor: input.bannerColor ?? "#1e293b",
          banner: input.banner,
          preferences: {
            upsert: {
              update: {
                showResources: input.preferences.showResources,
              },
              create: {
                showResources: input.preferences.showResources,
              },
            },
          },
        },
      });
    }),
});
