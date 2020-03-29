import OngRepository from "../repositories/OngRepository";
import Log from "../utils/Log";

const log = Log("OngService");

const OngService = {
    async login(auth) {
        const ong = await OngRepository.findOne({ email: auth });

        if (!ong) {
            return { error: "ong-service-not-authorized", status: 401 };
        }

        return auth;
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
            const ong = await OngRepository.findOne({ email }, { _id: 0 });
            if (!ong) {
                return { error: "ong-service-ong-not-found" };
            }

            return ong;
        } catch (error) {
            log.error(
                "error trying to get Ong by e-mail. email=%s, error=%s",
                email,
                error.message
            );

            return { error: "ong-service-ong-not-found" };
        }
    },
};

export default OngService;
