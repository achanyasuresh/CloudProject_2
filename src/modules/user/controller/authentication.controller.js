const AuthenticationService = require(`../service/authentication.service`);
const ItemService = require(`../service/item.service`);
const ItemRepository  = require(`../repository/item.repository`);

const authenticationService = new AuthenticationService();
const itemRepository = new ItemRepository('users'); 

class UserController {

    async login(req, res) {
        try {
            const loginResponse = await authenticationService.login(req.body.email, req.body.password);

            if (loginResponse == null || !loginResponse.loginStatus) {
                return res.status(401).json({
                    message: "Incorrect email or password"
                });
            }

            // Fetch user information including group IDs
            const user = await itemRepository.findByUserNameAndPassword(req.body.email, req.body.password);
            if (user.Count === 0) {
                return res.status(401).json({
                    message: "Incorrect email or password"
                });
            }

            const userData = user.Items[0]; // Get the first user item
            const response = {
                message: "You have successfully logged in!",
                token: loginResponse.token,
                group_ids: userData.group_ids // Add group IDs to the response
            };
console.log("userData", userData)
            console.log("response", response);
            return res.status(200).json(response);
        } catch (error) {
            console.error("Login error:", error);
            return res.status(500).json({
                message: "Internal server error"
            });
        }
    }
}
module.exports = UserController;
