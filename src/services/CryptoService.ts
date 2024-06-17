import axios from "axios";

import { CryptoCurrenciesResponseSchema, PriceSchema } from "../schema/crypto-schema";
import { Pair } from "../types";

export async function getCryptos() {
    const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD`;
    const { data: { Data } } = await axios.get(url);
    const result = CryptoCurrenciesResponseSchema.safeParse(Data);
    if (result.success) {
        return result.data;
    }
}

export async function getCryptoPrice(pair: Pair) {
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${pair.criptocurrency}&tsyms=${pair.currency}`;
    const { data: { DISPLAY } } = await axios.get(url);
    const price = PriceSchema.safeParse(DISPLAY[pair.criptocurrency][pair.currency])
    if (price.success) {
        return price.data;
    }
}
