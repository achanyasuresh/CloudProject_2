const UserRepository = require(`../repository/user.repository`);
const ItemRepository = require(`../repository/item.repository`);

class AuthenticationService {

    async login(email, password) {
        var itemRepository = new ItemRepository("users");
        const data = await itemRepository.findByUserNameAndPassword(email, password);

        // console.log("the data : " + JSON.stringify(data));
        if (data) {
            return data.Count > 0;
        } else {
            null;
        }
    }



}

module.exports = AuthenticationService;
