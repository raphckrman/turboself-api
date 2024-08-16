export interface rawTerminalResult {
    id: number;
    code2p5: number;
    idOrig: number;
    lib: string;
    prix: Array<rawPriceResult>;
}

export interface rawPriceResult {
    id: number;
    borneId: number;
    usage: number;
    prix: number;
    idOrig: number;
    lib: string;
}
