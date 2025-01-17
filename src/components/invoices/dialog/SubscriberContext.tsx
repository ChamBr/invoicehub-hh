import { createContext, useContext } from "react";

type SubscriberContextType = {
  subscriber_id: string | undefined;
};

export const SubscriberContext = createContext<SubscriberContextType>({ subscriber_id: undefined });

export const useSubscriber = () => useContext(SubscriberContext);