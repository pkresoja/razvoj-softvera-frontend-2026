import type { ToyModel } from "./models/toy.model";

export function targetGroupText(toy: ToyModel) {
    if (toy.targetGroup == 'dečak') return 'Dečake'
    if (toy.targetGroup == 'devojčica') return 'Devojčice'
    return 'Dečake i Devojčice'
}