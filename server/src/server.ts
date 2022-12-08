import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { convertHourToMinute } from "./utils/convertHourToMinute";
import { convtertMinuteToHour } from "./utils/convtertMinuteToHour";

const app = express();

app.use(express.json());
app.use(cors({}));

const prisma = new PrismaClient({
  log: ["query"],
});
interface AdInfo {
  gameId: string;
  name: string;
  yearsPlaying: number;
  discord: string;
  weekDays: [];
  hourStart: string;
  hourEnd: string;
  useVoiceChannel: boolean;
}

app.post("/games/:id/ads", async (request, response) => {
  const gameId = request.params.id;
  const body = request.body as AdInfo;

  //implementar validacao com zod javascript
  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(","),
      hoursStart: convertHourToMinute(body.hourStart),
      hourEnd: convertHourToMinute(body.hourEnd),
      useVoiceChannel: body.useVoiceChannel,
    },
  });
  return response.json(ad);
});

app.get("/games", async (request, response) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        },
      },
    },
  });
  return response.json(games);
});

app.get("/ads/:id/discord", async (request, response) => {
  const adId = request.params.id;

  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adId,
    },
  });
  return response.json({
    discord: ad.discord,
  });
});

app.get("/games/:id/ads", async (request, response) => {
  const gameId = request.params.id as string;

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hoursStart: true,
      hourEnd: true,
    },
    where: {
      gameId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return response.json(
    ads.map((ad) => {
      return {
        ...ad,
        weekDays: ad.weekDays.split(","),
        hoursStart: convtertMinuteToHour(ad.hoursStart),
        hourEnd: convtertMinuteToHour(ad.hourEnd),
      };
    })
  );
});

app.listen(3333);
