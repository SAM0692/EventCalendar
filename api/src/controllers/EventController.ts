import Event from "../types/Event";
import EventModel from "../mongodb/EventModel";

export const getAllEvents = () => { return EventModel.find({}) };

export const getEventById = async (id: number) => {
    const event = await EventModel.findOne({ id: id }, (err: any, result: any) => {
        if (err) {
            console.log(err);
        } else {
            return {
                id: result.id,
                name: result.name,
                description: result.description,
                date: result.date
            }
        }
    });

    return event;
};

export const createEvent = (event: Event) => {
    EventModel.create({
        id: new Date().getTime(),
        name: event.name,
        description: event.description,
        date: event.date
    }, (err: any) => {
        if (err) console.log(err)
    });
};

export const updateEvent = (id: number, event: Event) => {
    EventModel.updateOne({ id: id }, {
        name: event.name,
        description: event.description,
        date: event.date
    }, null, (err) => {
        if (err) console.log(err)
    });
};

export const deleteEvent = (id: number) => {
    EventModel.deleteOne({ id: id }, null, (err) => {
        if (err) console.log(err)
    });
}