import { CREATE_USER, UPDATE_USER } from "./policies";

export interface IPolicyItem{
    id: number;
    name: string;
    description: string;
    policies: Array<string>;
}

export const PolicyGroups: Array<IPolicyItem> = [
    {
        id: 1,
        name: "User Management",
        description: "Access to user management functionalities",
        policies:[CREATE_USER,UPDATE_USER]
    }
]
