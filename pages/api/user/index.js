import connectDB from "@/middleware/mongodb"
import User from "@/models/user"

const handler = async (req, res) => {

    if (req.method === 'POST') {

        const { email } = req.body;

        const userExists = await User.findOne({ email });
        if (email && userExists) { // user already exists
            return res.status(200).send(userExists); // return existing user
        }

        else { // create a new user
            const {
                name,
                image,
                findMe
            } = req.body;
            if (name && email && image && findMe) {
                try {
                    const user = new User({
                        name,
                        email,
                        image,
                        findMe
                    });
                    const newUser = await user.save();
                    return res.status(200).send(newUser);
                }
                catch (error) {
                    return res.status(500).send("user[s]post", error.message);
                }
            }
        }
    }

    else if (req.method === 'GET') {
        console.log("GET all users");
        try {
            const users = await User.find();
            return res.status(200).send(users);
        }
        catch (error) {
            return res.status(500).send("user[s]get", error.message);
        }
    }

    else {
        res.status(422).send('req_method_not_supported');
    }
};

export default connectDB(handler);