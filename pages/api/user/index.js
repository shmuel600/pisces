import connectDB from "@/middleware/mongodb"
import User from "@/models/user"

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const {
            email,
            name
        } = req.body;
        if (email && name) {
            const user = await User.findOne({ email });
            if (await User.findOne({ email })) {
                return res.status(200).send(user);
            }
            else try {
                const user = new User({
                    email,
                    name
                });
                const newUser = await user.save();
                return res.status(200).send(newUser);
            }
            catch (error) {
                return res.status(500).send(error.message);
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
            return res.status(500).send(error.message);
        }
    }
    else {
        res.status(422).send('req_method_not_supported');
    }
};

export default connectDB(handler);