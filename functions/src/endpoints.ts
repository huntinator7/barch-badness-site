import { Response } from "express";
import * as admin from "firebase-admin";

type Song = {
  id: string;
  name: string;
  artists: string;
  external_url: string;
};

type Voter = {
  avatar: string;
  name: string;
};

type Match = {
  day: number;
  messageId?: string;
  round: number;
  matchIndex?: number;
  song_a: Song;
  song_b: Song;
  winner?: Song;
  song_a_votes?: Voter[];
  song_b_votes?: Voter[];
};

const vote = async (req: any, res: Response) => {
  const {
    body: { matchId, a: isA },
    user,
  } = req;
  // retrieve the song
  const fs = admin.firestore().doc("Prod/BarchBadness");
  const match: any = (await (
    await fs.collection("Matches").doc(matchId).get()
  ).data()) as Match;
  // check if user reacted other emoji, remove that one
};

const sync = async (req: any, res: Response) => {
  const {
    body: { syncId },
    user,
  } = req;
};

export const ENDPOINTS = {
  vote,
  sync,
};
