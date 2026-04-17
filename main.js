import { API_KEY } from "./env.js";
import { getPrompt } from "./prompt.js";
import Groq from "groq-sdk";

const helpButton = document.querySelector("#help");
const helpBody = document.querySelector("#help-body");
const groq = new Groq({ apiKey: API_KEY, dangerouslyAllowBrowser: true });

helpButton.addEventListener("click", async () => {
  helpBody.textContent = "Loading...";

  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: getPrompt() }],
      max_tokens: 1024,
    });

    helpBody.textContent = response.choices[0].message.content;
  } catch (error) {
    console.error("Error fetching help:", error);
    helpBody.textContent = `Error: ${error.message}`;
  }
});