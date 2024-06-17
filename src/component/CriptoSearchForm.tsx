import { useEffect, useState } from "react";

import { currencies } from "../data";
import { useCryptoStore } from "../store";
import { Pair } from "../types";
import ErrorMessage from "./ErrorMessage";

function CriptoSearchForm() {

    const { fetchCryptos, cryptoCurrencies, fetchPrice, setError: setCryptoError } = useCryptoStore();

    useEffect(() => {
        fetchCryptos();
    }, []);

    const [pair, setPair] = useState<Pair>({ currency: '', criptocurrency: '' });
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPair({
            ...pair,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError('');
        setCryptoError(false);
        if (Object.values(pair).includes('')) {
            setError('Todos los campos son obligatorios');
        } else {
            fetchPrice(pair).catch(() => {
                console.log('Ups! algo salio mal');
                setError('Ups! algo salio mal');
                setCryptoError(true);
            });
        }
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            {
                error && <ErrorMessage>{ error }</ErrorMessage>
            }
            <div className="field">
                <label htmlFor="currency">Moneda:</label>
                <select id="currency" name="currency" value={pair.currency} onChange={handleChange}>
                    <option value="">-- Selecciona --</option>
                    {
                        currencies.map(currency => (
                            <option key={currency.code} value={currency.code}>{`${currency.name} [${currency.code}]`}</option>
                        ))
                    }
                </select>
            </div>
            <div className="field">
                <label htmlFor="criptocurrency">Criptomoneda:</label>
                <select id="criptocurrency" name="criptocurrency" value={pair.criptocurrency} onChange={handleChange}>
                    <option value="">-- Selecciona --</option>
                    {
                        cryptoCurrencies.map(criptocurrency => (
                            <option key={criptocurrency.CoinInfo.Name} value={criptocurrency.CoinInfo.Name}>{`${criptocurrency.CoinInfo.FullName} [${criptocurrency.CoinInfo.Name}]`}</option>
                        ))
                    }
                </select>
            </div>
            <input type="submit" value="Cotizar" />
        </form>
    );
}

export default CriptoSearchForm;