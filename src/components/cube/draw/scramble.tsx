export const scrambleReg = /^([\d]+(?:-\d+)?)?([FRUBLDfrubldzxySME])(?:([w])|&sup([\d]);)?([2'])?$/;
export const turn = 'FRUBLDfrubldzxySME'
export const baseTurn = "FRUBLD"
export function ParseScramble(scramble: string, moveMap: string): number[][] {
    let seq: number[][] = []

    const moves = scramble.split(' ')
    let  w, p;
    for (let s = 0; s < moves.length; s++) {
        const m = scrambleReg.exec(moves[s])
        if (m === null) {
            continue
        }

        let f = turn.indexOf(m[2])
        if (f > 14) {
            const p = "2'".indexOf(m[5] || 'X') + 2
            f = [0, 4, 5][f % 3]
            seq.push([moveMap.indexOf(baseTurn.charAt(f)), 2, p])
            seq.push([moveMap.indexOf(baseTurn.charAt(f)), 1, 4 - p])
            continue
        }

        w = (m[1] || '').split('-');
        let w2 = ~~w[1] || -1;
        w = f < 12 ? (~~w[0] || ~~m[4] || ((m[3] === "w" || f > 5) && 2) || 1) : -1;
        p = (f < 12 ? 1 : -1) * ("2'".indexOf(m[5] || 'X') + 2);
        seq.push([moveMap.indexOf("FRUBLD".charAt(f % 6)), w, p, w2]);
    }
    return seq
}