export default interface Event {
    id?: number;
    name: String;
    description: String;
    date: Date;
};

export const DefaultEventValues = {
    name: "",
    description: "",
    date: new Date()
}