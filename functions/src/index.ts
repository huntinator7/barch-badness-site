import "@typescript-eslint/parser";
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp(functions.config().firebase);
import express from "express";
import cors from "cors";
import { authCheck, propCheck } from "./helpers";
import { ENDPOINTS } from "./endpoints";

const app = express();

app.use(
  cors({
    origin: ["https://beecon.app", "http://localhost:3000"],
  })
);
app.use(authCheck as any);

export const db = admin.firestore();

export const webApi = functions.https.onRequest(app);

app.use(
  "/vote",
  propCheck([
    { field: "matchId", label: "Match ID" },
    { field: "a", label: "A" },
  ]) as any
);
app.post("/message", ENDPOINTS.vote);

app.use(
  "/sync",
  propCheck([
    { field: "syncId", label: "Sync ID" }
  ]) as any
);
app.post("/message", ENDPOINTS.sync);
