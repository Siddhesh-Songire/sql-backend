import express from "express";
import OpenAI from "openai";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config";
const PORT = 8000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const openai = new OpenAI({
  organization: process.env.ORG,
  apiKey: process.env.API_KEY,
});

app.post("/", async (req, res) => {
  //   const { message } = req.body;
  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content:
          "Give me only SQL query in short format without any other explation to " +
          `${req.body.message}`,
      },
    ],
  });

  res.json({
    chatCompletion: chatCompletion.choices[0].message,
  });
});

app.listen(PORT, () => console.log(`Your server is running on PORT ${PORT}`));
