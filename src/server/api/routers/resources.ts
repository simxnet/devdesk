import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { z } from "zod";

export const resourcesRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.resource.findMany({
      include: {
        author: true,
      },
    });
  }),

  getMine: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.resource.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),

  postOne: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        uri: z.string(),
        image: z.string(),
        description: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.resource.create({
        data: {
          title: input.title,
          description: input.description,
          image: input.image,
          uri: input.uri,
          userId: ctx.session.user.id,
        },
        include: {
          author: true,
        },
      });

      return {
        message: `created resource`,
        success: true,
      };
    }),

  getSecretTest: protectedProcedure.query(({ ctx }) => {
    return `authorized user ${ctx.session.user.name}`;
  }),
});
