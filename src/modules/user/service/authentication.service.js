const UserRepository = require(`../repository/user.repository`);
const ItemRepository = require(`../repository/item.repository`);
const { getJwtCreds } = require('../../../helpers/creds');
const { utilConstants } = require('../../../helpers/creds');
const jwt = require('jsonwebtoken');

class AuthenticationService {

    async login(email, password) {
        var itemRepository = new ItemRepository("users");
        const data = await itemRepository.findByUserNameAndPassword(email, password);

        // console.log("the data : " + JSON.stringify(data));
        if (data) {
            return {
                loginStatus: data.Count > 0,
                token: await this.createJwt()
            }
        } else {
            null;
        }
    }


    async createJwt(userId) {
        let jwtSecretKey = await getJwtCreds();
        let data = {
            userId: userId
        };

        const token = jwt.sign(data, jwtSecretKey);

        return token;
    }


    async validateJwt(request) {
        let jwtSecretKey = await getJwtCreds();

        try {
            const token = request.header(utilConstants.TOKEN_HEADER_KEY);

            const verified = jwt.verify(token, jwtSecretKey);
            if (verified) {
                return res.send("Successfully Verified");
            } else {
                return res.status(401)
                    .json({
                        "internalMessage": "Invalid JWT token",
                        "message": "Authentication failure"
                    });
            }
        } catch (error) {
            return res.status(401)
                .json({
                    "internalMessage": "Invalid JWT token",
                    "message": "Authentication failure"
                });
        }
    }


}

module.exports = AuthenticationService;
