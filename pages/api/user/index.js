import connectDB from "@/middleware/mongodb"
import User from "@/models/user"

const handler = async (req, res) => {

    if (req.method === 'POST') {

        const {
            name,
            email,
            image,
            findMe
        } = req.body;

        if (name && email && image && findMe) {
            try {
                const existingUser = await User.findOne({ email })
                const userDetails = new User({
                    name,
                    email,
                    image,
                    findMe
                });
                const user = existingUser ? existingUser : await userDetails.save();
                return res.status(200).send(user);
            }
            catch (error) {
                return res.status(500).send("user[s]post", error.message);
            }
        }
        else {
            await res.status(422).send('data_incomplete');
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