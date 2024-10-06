const EventsRepository = require("../repository/events.repository");

const eventRepo = new EventsRepository();
class EventService {
    
    async create(data) {
        
        if (!data.members) {
            data.members = [];
        }
        return await eventRepo.create(data);
    }

    async findByID(itemId) {
        const data = await eventRepo.findByID(itemId);

        console.log("the data : " + JSON.stringify(data));
        if (data) {
            return data.Items;
        }

        return data;
    }

    async findAll(itemId) {
        const data = await eventRepo.findAll();

        console.log("the data : " + JSON.stringify(data));
        if (data) {
            return data.Items;
        }

        return data;
    }

    async update(eventId, data) {
        return await eventRepo.update(eventId, data)
    }

    async deleteByID(UserID) {
        return await itemRepository.deleteByID(UserID);
    }

}

module.exports = EventService;
