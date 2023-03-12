import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const usersRouter = createTRPCRouter({
  getOne: publicProcedure
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
          id: true,
          image: true,
          bio: true,

          settings_showResources: true,
        },
      });
    }),

  updateMe: protectedProcedure
    .input(
      z.object({
        bio: z.string(),
        showResources: z.boolean(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          bio: input.bio,
          settings_showResources: input.showResources,
        },
      });
    }),
});
