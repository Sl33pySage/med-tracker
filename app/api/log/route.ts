import { NextResponse } from "next/server";
// This forces Next.js to execute the code fresh on every single tap/refresh
//export const dynamic = "force-dynamic";

export async function POST() {
  try {
    console.log("Medication logged!");
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    // TODO: Insert Discord Webhook or Twilio code here later!

    // Safety check to see if .env.local is set up correctly
    if (!webhookUrl) {
      console.error("Error: DISCORD_WEBHOOK_URL is missing from .env.local");
      throw new Error("Server reconfiguration error!");
    }

    // Format a beautiful, human readable date and time
    const formattedDate = new Date().toLocaleString("en-US");

    const payload = {
      content: `**Medication logged:** Mom just checked in and took her Losartan at: **${formattedDate}**!`,
    };

    // Fire a POST request straight to Discord's API
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Discord API returned status: ${response.status}`);
    }
    console.log("Success: Discord notification sent successfully!");
    return NextResponse.json({ status: "success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: (error as Error).message,
      },
      { status: 500 },
    );
  }
}
