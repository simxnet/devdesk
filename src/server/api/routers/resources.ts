import { sendDiscordWebhook } from "@/lib/utils";
import {
  createTRPCRouter,
  devProcedure,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const resourcesRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.resource.findMany({
      include: {
        author: true,
      },
    });
  }),

  user: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.resource.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),

  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const resource = await ctx.prisma.resource.findFirst({
        where: {
          id: input.id,
        },
      });

      const user = await ctx.prisma.user.findFirst({
        where: {
          id: ctx.session.user.id,
        },
      });

      if (resource?.userId === ctx.session.user.id || user?.permissions === 1) {
        return ctx.prisma.resource.delete({
          where: {
            id: input.id,
          },
        });
      } else {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
    }),

  add: protectedProcedure
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
        `<:log_heart:1084642897594429501> **${
          ctx.session.user.name
        }** just submitted a new resource\n<:log_2:1084642900740165664> [${
          resource.title
        }](${resource.uri})\n<:log_1:1084642899708350524> [Resource link](${
          process.env.NODE_ENV === "development"
            ? `http://localhost:3000/resource/${resource.id}`
            : `https://resourceapp.vercel.app/resource/${resource.id}`
        })`
      );

      return {
        message: `created resource`,
        success: true,
      };
    }),
});
