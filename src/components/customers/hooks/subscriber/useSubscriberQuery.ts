import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { createNewSubscriber, linkSubscriberToUser } from "./useSubscriberCreation";

export async function getOrCreateSubscriber(user: User) {
  try {
    // Primeiro, tentar encontrar um subscriber_user existente
    const { data: subscriberUser, error: subscriberUserError } = await supabase
      .from("subscriber_users")
      .select("subscriber_id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (subscriberUserError) {
      console.error("Erro ao buscar subscriber_user:", subscriberUserError);
      throw subscriberUserError;
    }

    // Se já existe um subscriber_user, retornar o subscriber_id
    if (subscriberUser?.subscriber_id) {
      return { subscriber_id: subscriberUser.subscriber_id };
    }

    // Se não existe, criar um novo subscriber
    const newSubscriber = await createNewSubscriber(user);
    await linkSubscriberToUser(newSubscriber.id, user.id);

    return { subscriber_id: newSubscriber.id };
  } catch (error) {
    console.error("Erro em getOrCreateSubscriber:", error);
    throw error;
  }
}