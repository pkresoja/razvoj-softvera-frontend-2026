import type { ToyModel } from "./models/toy.model";

export function targetGroupText(toy: ToyModel) {
    if (toy.targetGroup == 'dečak') return 'Dečake'
    if (toy.targetGroup == 'devojčica') return 'Devojčice'
    return 'Dečake i Devojčice'
}

export function formatDate(iso: string) {
    return new Date(iso).toLocaleString('sr-RS', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    })
}