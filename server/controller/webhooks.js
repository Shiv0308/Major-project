import { Webhook } from "svix";
import User from "../models/User.js";

export const clerkWebhooks = async (req, res) => {
  try {
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Verify the webhook signature
    const evt = wh.verify(
      JSON.stringify(req.body),
      {
        "svix-id": req.headers["svix-id"],
        "svix-timestamp": req.headers["svix-timestamp"],
        "svix-signature": req.headers["svix-signature"],
      }
    );

    const { data, type } = evt;

    switch (type) {
      case "user.created":
        const newUser = new User({
          _id: data.id,
          name: `${data.first_name} ${data.last_name}`,
          email: data.email_addresses?.[0]?.email_address || "",
          resume: "",
          image: data.image_url,
        });
        await newUser.save();
        break;

      case "user.updated":
        await User.findByIdAndUpdate(data.id, {
          name: `${data.first_name} ${data.last_name}`,
          email: data.email_addresses?.[0]?.email_address || "",
          image: data.image_url,
        });
        break;

      case "user.deleted":
        await User.findByIdAndDelete(data.id);
        break;

      default:
        console.warn("Unhandled Clerk event type:", type);
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Clerk webhook error:", error);
    res.status(400).json({ error: "Invalid webhook event" });
  }
};
