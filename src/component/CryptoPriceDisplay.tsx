import { useMemo } from "react";

import { useCryptoStore } from "../store";
import Spinner from "./Spinner";

export default function CryptoPriceDisplay() {

    const { error, loading, result } = useCryptoStore();
    const hasPrice = useMemo(
        () => !!result.PRICE,
        [result]
    );

    return (
        <div className="result-wrapper">
            {
                loading ? <Spinner /> :
                !error && hasPrice &&
                <>
                    <h2>Cotizaci&oacute;n</h2>
                    <div className="result">
                        <img src={`https://cryptocompare.com/${result.IMAGEURL}`} alt="criptomoneda" />
                        <div>
                            <p>El precio es de: <span>{result.PRICE}</span></p>
                            <p>Precio más alto del día: <span>{result.HIGHDAY}</span></p>
                            <p>Precio más bajo del día: <span>{result.LOWDAY}</span></p>
                            <p>Variación últimas 24 horas: <span>{result.CHANGEPCT24HOUR}%</span></p>
                            <p>ültima actualización: <span>{result.LASTUPDATE}</span></p>
                        </div>
                    </div>
                </>
            }
        </div>
    );
}
