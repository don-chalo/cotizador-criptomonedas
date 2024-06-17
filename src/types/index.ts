import { z } from "zod";

import { CurrencySchema, CryptoCurrencyResponseSchema, PairSchema, PriceSchema } from "../schema/crypto-schema";

export type Currency = z.infer<typeof CurrencySchema>;
export type CryptoCurrency = z.infer<typeof CryptoCurrencyResponseSchema>;
export type Pair = z.infer<typeof PairSchema>;
export type Price = z.infer<typeof PriceSchema>;