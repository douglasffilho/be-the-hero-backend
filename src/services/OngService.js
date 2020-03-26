import OngRepository from "../repositories/OngRepository";
import Log from "../utils/Log";

const log = Log("OngService");

const OngService = {
    async login() {
        return null;
    },

    async create(ong) {
        try {
            return await OngRepository.create(ong);
        } catch (error) {
            log.error("error trying to create Ong. error=%s", error.message);
            return error;
        }
    },

    async findAll(page, size) {
        try {
            return await OngRepository.find({})
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

    async findByEmail(email) {
        try {
            return await OngRepository.findOne({ email });
        } catch (error) {
            log.error(
                "error trying to get Ong by e-mail. email=%s, error=%s",
                email,
                error.message
            );

            return error.message;
        }
    },
};

export default OngService;
