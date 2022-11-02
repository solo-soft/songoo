import {atom} from "recoil";

export const playListIdState = atom({
    key : 'uniqKey',
    default : '4X7MqULPDfz5yUU7ZK75yS'
})

export const playListState = atom({
    key : 'PlayListAtom',
    default : null
})

export const NEW_RELEASES_LIST = atom({
    key : 'NEW_RELEASES',
    default : []
})