import { create } from "zustand";

import { CryptoCurrency, Pair, Price } from "./types";
import { getCryptos, getCryptoPrice } from "./services/CryptoService";

export type CryptoStore = {
    cryptoCurrencies: CryptoCurrency[],
    error: boolean,
    loading: boolean,
    result: Price,
    fetchCryptos: () => Promise<void>,
    fetchPrice: (pair: Pair) => Promise<void>,
    setError: (error: boolean) => void
}

export const useCryptoStore = create<CryptoStore>((set) => ({
    cryptoCurrencies: [],
    error: false,
    loading: false,
    result: {} as Price,
    fetchCryptos: async () => {
        const cryptoCurrencies = await getCryptos();
        set(() => ({ cryptoCurrencies }));
    },
    fetchPrice: async (pair: Pair) => {
        set(() => ({ loading: true }));
        const result = await getCryptoPrice(pair);
        set(() => ({ result, loading: false }));
    },
    setError: (error: boolean) => set(() => ({ error }))
}));
 