import type { IntegrationProvider, ProviderName } from "../types";
import { food99Provider } from "./food99";
import { ifoodProvider } from "./ifood";
import { keetaProvider } from "./keeta";
import { rappiProvider } from "./rappi";
import { webhookProvider } from "./webhook";

export const providers: Record<ProviderName, IntegrationProvider> = {
  ifood: ifoodProvider,
  "99food": food99Provider,
  keeta: keetaProvider,
  rappi: rappiProvider,
  webhook: webhookProvider,
};
