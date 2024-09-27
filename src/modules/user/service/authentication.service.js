const UserRepository = require(`../repository/user.repository`);
const ItemRepository = require(`../repository/item.repository`);
const { getJwtCreds } = require('../../../helpers/creds');
const { utilConstants } = require('../../../helpers/constants');
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


    async validateJwt(request, response, next) {
        let jwtSecretKey = await getJwtCreds();

        try {
            const token = request.header(utilConstants.TOKEN_HEADER_KEY);
            console.log("the secret key: " + jwtSecretKey);
            console.log("the token: " + token);

            const verified = jwt.verify(token, jwtSecretKey);

            if (verified) {
                console.log("Successfully Verified JWT");
                next();
            } else {
                return response.status(401)
                    .json({
                        "internalMessage": "Invalid JWT token",
                        "message": "Authentication failure"
                    });
            }
        } catch (error) {
            console.log("there was an error while validating the token: " + error);
            return response.status(401)
                .json({
                    "internalMessage": "There was an issue validating the JWT: " + error,
                    "message": "Authentication failure"
                });
        }
    }
}

module.exports = AuthenticationService;
