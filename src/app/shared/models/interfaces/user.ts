import { Pharmacist } from "./pharmacist";

export interface User {


    id: number;

    name: string;

    firstname: string;

    carteVitale: string;

    role: string;

    email: string;

    password: string;

    pharmacie: Pharmacist;


}