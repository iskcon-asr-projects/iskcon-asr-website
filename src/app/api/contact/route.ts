import { createClient } from "@supabase/supabase-js";
import { Resend } from 'resend';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    // 1. Save to Supabase
    const { data, error: supabaseError } = await supabaseAdmin
      .from("contact_messages")
      .insert([
        { name, email, subject, message }
      ]);

    if (supabaseError) throw supabaseError;

    // 2. Send Email Notification (if API key exists)
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: 'ISKCON Amritsar <onboarding@resend.dev>', // You can change this once you verify your domain
          to: 'iskconamritsaroffice@gmail.com', // User's requested email
          subject: `New Contact Form: ${subject}`,
          html: `
            <div style="font-family: sans-serif; padding: 20px; color: #333;">
              <h2 style="color: #C5A059;">New Message Received</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Subject:</strong> ${subject}</p>
              <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
              <p><strong>Message:</strong></p>
              <p style="white-space: pre-wrap;">${message}</p>
            </div>
          `
        });
      } catch (emailError) {
        console.error("Email notification failed:", emailError);
        // We don't want to fail the whole request if only the email fails
      }
    }

    return Response.json({ success: true, data });
  } catch (error: any) {
    console.error("Contact API error:", error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
