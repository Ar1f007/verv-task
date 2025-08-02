import { CURRENCY } from "./constants";

export function formatPrice(val: number){
    if (!val) return `${CURRENCY}0.00`;

    return `${CURRENCY}${val.toFixed(2)}`
}