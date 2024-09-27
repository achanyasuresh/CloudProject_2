const AuthenticationService = require(`../service/authentication.service`);
const ItemService = require(`../service/item.service`);

const authenticationService = new AuthenticationService();

class UserController {

    async login(req, res) {

        authenticationService.login(req.body.email, req.body.password)
            .then((loginResponse) => {
                // console.log("the response: " + JSON.stringify(loginResponse));
                if (loginResponse == null || !loginResponse) {
                    res.statusCode = 401;
                    res.json({
                        message: "Incorrect email or password"
                    });
                } else {
                    res.statusCode = 200;
                    res.json({
                        message: "You have successfully logged in!"
                    });
                }

            });

    }





}

module.exports = UserController;
