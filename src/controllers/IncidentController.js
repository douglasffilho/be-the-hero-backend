import IncidentService from "../services/IncidentService";
import OngService from "../services/OngService";

const IncidentController = {
    async create(request, response) {
        const { ongEmail } = request.headers.authorization;
        const { title, description, value } = request.body;
        const incident = { title, description, value: Number(value), ongEmail };

        const ong = await OngService.findByEmail(ongEmail);

        if (!ong || !ong.email) {
            return response
                .status(404)
                .json({ error: "incident-controller-ong-not-found" });
        }

        const created = await IncidentService.create(incident);
        if (created.ongEmail) {
            return response.status(201).json(created);
        }

        return response.status(400).json({ error: created });
    },

    async findAll(request, response) {
        const { page, size } = request.query;

        const found = await IncidentService.findAll(Number(page), Number(size));
        if (Array.isArray(found)) {
            const status = found.length > 0 ? 200 : 204;
            return response.status(status).json(found);
        }

        return response.status(400).json({ error: found });
    },

    async findAllByOngEmail(request, response) {
        const { email } = request.params;
        const { page, size } = request.query;

        const found = await IncidentService.findAllByOng(
            Number(page),
            Number(size),
            email
        );
        if (Array.isArray(found)) {
            const status = found.length > 0 ? 200 : 204;
            return response.status(status).json(found);
        }

        return response.status(400).json({ error: found });
    },

    async deleteById(request, response) {
        const { id } = request.params;

        const deletion = await IncidentService.delete(id);
        if (deletion.deletedCount === 1) {
            return response.status(202).json({ deleted: id });
        }

        return response
            .status(400)
            .json({ error: "incident-controller-already-deleted", id });
    },
};

export default IncidentController;
