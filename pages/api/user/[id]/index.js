import connectDB from "@/middleware/mongodb"
import User from "@/models/user"

const handler = async (req, res) => {

    const { id } = req.query;

    if (req.method === 'PATCH') {
        try {
            const updatedUser = await User.findByIdAndUpdate(id, req.body);
            return res.status(200).send(updatedUser);
        }
        catch (error) {
            return res.status(500).send("user[id]patch", error.message);
        }
    }

    else if (req.method === 'GET') {
        try {
            const user = await User.findById(id);
            return res.status(200).send(user);
        }
        catch (error) {
            return res.status(500).send("user[id]get", error.message);
        }
    }

    else {
        res.status(422).send('req_method_not_supported');
    }

    res.end();
};

export default connectDB(handler);