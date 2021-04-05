export default interface Event {
    id?: number;
    name: string;
    description: string;
    date: Date;
};

export const DefaultEventValues = {
    name: "",
    description: "",
    date: new Date()
}