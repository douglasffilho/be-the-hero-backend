import IncidentRepository from "../repositories/IncidentRepository";
import Log from "../utils/Log";

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

    async delete(_id) {
        try {
            return await IncidentRepository.deleteOne({ _id });
        } catch (error) {
            log.error(
                "error trying to delete incident. error=%s",
                error.message
            );
            return error;
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
