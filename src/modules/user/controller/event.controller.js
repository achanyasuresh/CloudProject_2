const EventService = require("../service/event.service");

const eventService = new EventService();

class EventController {

    async create(req, res) {

        const data = await eventService.create(req.body)
        res.json(data)
    }

    async findByID(req, res) {

        const data = await eventService.findByID(req.query.eventId)

        res.json(data)
    }

    async findAll(req, res) {

        const data = await eventService.findAll()

        res.json(data)
    }

    async update(req, res) {
        const data = await eventService.update(req.query.eventId, req.body)

        res.json(data)
    }

}

module.exports = EventController;
