import OngService from "../services/OngService";

const OngController = {
    async create(request, response) {
        const { name, email, whatsapp, city, estate } = request.body;
        const ong = { name, email, whatsapp, city, estate };

        const created = await OngService.create(ong);
        if (created.email) {
            return response.status(201).json(created);
        }

        return response.status(400).json({ error: created });
    },

    async findAll(request, response) {
        const { page, size } = request.query;

        const found = await OngService.findAll(Number(page), Number(size));
        if (Array.isArray(found)) {
            const status = found.length > 0 ? 200 : 204;
            return response.status(status).json(found);
        }

        return response.status(400).json({ error: found });
    },

    async login(request, response) {
        const auth = request.headers.authorization;
        const token = await OngService.login(auth);

        return response.status(200).json({ token });
    },
};

export default OngController;
