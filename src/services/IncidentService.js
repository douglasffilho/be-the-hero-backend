import IncidentRepository from "../repositories/IncidentRepository";
import Log from "../utils/Log";
import OngService from "./OngService";

const log = Log("OngService");

const IncidentService = {
    async create(incident) {
        try {
            return await IncidentRepository.create(incident);
        } catch (error) {
            log.error(
                "error trying to create incident. error=%s",
                error.message
            );
            return error;
        }
    },

    async delete(_id, ongEmail) {
        try {
            if (!ongEmail) {
                return {
                    error: "incident-service-authorization-required",
                    id: _id,
                    status: 401,
                };
            }

            const ong = await OngService.findByEmail(ongEmail);
            if (!ong.email) {
                return {
                    error: "incident-service-ong-not-found",
                    id: _id,
                    status: 404,
                };
            }

            const incident = await IncidentRepository.findById(_id);
            if (!incident) {
                return {
                    error: "incident-service-incident-not-found",
                    id: _id,
                    status: 404,
                };
            }

            if (ong.email !== incident.ongEmail) {
                return {
                    error: "incident-service-operation-not-permited",
                    id: _id,
                    status: 403,
                };
            }

            return await IncidentRepository.deleteOne({ _id });
        } catch (error) {
            log.error(
                "error trying to delete incident. error=%s",
                error.message
            );

            return { error: "incident-service-already-deleted", id: _id };
        }
    },

    async findAll(page, size) {
        try {
            return await IncidentRepository.find({})
                .skip(size * (page - 1))
                .limit(size);
        } catch (error) {
            log.error(
                "error trying to list incidents. page=%s, size=%s, error=%s",
                page,
                size,
                error.message
            );

            return error.message;
        }
    },

    async findAllByOng(page, size, ongEmail) {
        try {
            return await IncidentRepository.find({ ongEmail })
                .skip(size * (page - 1))
                .limit(size);
        } catch (error) {
            log.error(
                "error trying to list Ongs. page=%s, size=%s, error=%s",
                page,
                size,
                error.message
            );

            return error.message;
        }
    },
};

export default IncidentService;
