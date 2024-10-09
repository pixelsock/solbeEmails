import { db } from "@/server/db";

export const POST = async (req: Request) => {
    console.log('Clerk webhook received');
    const { data } = await req.json();
    console.log('Webhook data:', data);

    const emailAddress = data.email_addresses[0].email_address;
    const firstName = data.first_name;
    const lastName = data.last_name;
    const imageUrl = data.image_url;
    const id = data.id;

    try {
        const user = await db.user.upsert({
            where: { id },
            update: { emailAddress, firstName, lastName, imageUrl },
            create: { id, emailAddress, firstName, lastName, imageUrl },
        });
        console.log('User upserted:', user);
    } catch (error) {
        console.error('Error upserting user:', error);
        return new Response('Error processing webhook', { status: 500 });
    }

    return new Response('Webhook processed', { status: 200 });
}