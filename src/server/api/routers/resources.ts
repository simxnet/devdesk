import { sendDiscordWebhook } from "@/lib/utils";
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
      const resource = await ctx.prisma.resource.create({
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

      await sendDiscordWebhook(
        "1084642146549776486",
        "vqNEkla1jiEWlMdy2lDO3-wRhfmTYuUksVM4WakzrzOc0xtuze36CizV6Wae4zLi9sVz",
        `<:log_heart:1084642897594429501> **${ctx.session.user.name}** just submitted a new resource\n<:log_1:1084642899708350524> [${resource.title}](${resource.uri})`
      );

      return {
        message: `created resource`,
        success: true,
      };
    }),
});
