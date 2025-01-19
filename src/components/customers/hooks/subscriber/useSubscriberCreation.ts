import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";

export async function createNewSubscriber(user: User) {
  try {
    const { data: newSubscriber, error: subscriberError } = await supabase
      .from("subscribers")
      .insert({
        company_name: `Company of ${user.email}`,
        owner_id: user.id,
        status: "active"
      })
      .select()
      .single();

    if (subscriberError) {
      console.error("Erro ao criar subscriber:", subscriberError);
      throw subscriberError;
    }

    if (!newSubscriber) {
      throw new Error("Falha ao criar novo subscriber");
    }

    return newSubscriber;
  } catch (error) {
    console.error("Erro em createNewSubscriber:", error);
    throw error;
  }
}

export async function linkSubscriberToUser(subscriberId: string, userId: string) {
  try {
    const { error: linkError } = await supabase
      .from("subscriber_users")
      .insert({
        subscriber_id: subscriberId,
        user_id: userId,
        role: "admin",
        status: "active"
      });

    if (linkError) {
      console.error("Erro ao criar subscriber_user:", linkError);
      throw linkError;
    }
  } catch (error) {
    console.error("Erro em linkSubscriberToUser:", error);
    throw error;
  }
}