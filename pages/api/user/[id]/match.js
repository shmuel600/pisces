import connectDB from "@/middleware/mongodb"
import User from "@/models/user"
import Chat from "@/models/chat"

const createChat = async (user, match) => {
    const participants = [user.email, match.email].sort();
    // check if chat already exists
    const existingChat = await Chat.findOne({ participants })
    // create new chat or return existing chat
    if (existingChat) {
        return existingChat._id
    }
    else {
        const chatDetails = new Chat({ participants })
        return await chatDetails.save()
    }
}

const remove = (array, removeThis) => {
    const index = array.indexOf(removeThis)
    array.splice(index, 1)
    return array
}

const findMatch = async (user) => {
    const match = checkUserPool_step1(user);
    return match
}
// filter self & past matches
const checkUserPool_step1 = async (user) => {
    const usersPool = (await User.find()).filter((potentialMatch) => {
        if (potentialMatch.email === user.email
            || user.matchHistory.includes(potentialMatch.email)
            || potentialMatch.matchHistory.includes(user.email)
        ) return false;
        else return true;
    });
    if (usersPool.length === 0) return null;
    else if (usersPool.length === 1) return usersPool[0];
    else {
        checkUsersGender_set2(user, usersPool)
    }
}
// filter by gender preferences
const checkUsersGender_set2 = async (user, usersPool) => {
    const genderFilter = usersPool.filter((potentialMatch) => {
        if ((user.findMe.gender === "Everyone" && potentialMatch.findMe.gender === "Everyone")
            || (user.findMe.gender === "Everyone" && potentialMatch.findMe.gender === user.gender)
            || (user.findMe.gender === potentialMatch.gender && potentialMatch.findMe.gender === "Everyone")
            || (user.findMe.gender === potentialMatch.gender && potentialMatch.findMe.gender === user.gender)
        ) return true;
        else return false;
    });
    if (genderFilter.length === 0) return null;
    else if (genderFilter.length === 1) return genderFilter[0];
    else {
        checkUsersAge_step3(user, genderFilter)
    }
}
// filter by gender preferences
const checkUsersAge_step3 = async (user, usersPool) => {
    const getAge = (birthDay) => {
        const yearDifference = new Date().getUTCFullYear() - new Date(birthDay).getUTCFullYear();
        const currentDate = new Date().getMonth() * 100 + new Date().getDate();
        const birthDate = new Date(birthDay).getMonth() * 100 + new Date(birthDay).getDate();
        const birthdayPassed = currentDate < birthDate ? false : true;
        const age = birthdayPassed ? yearDifference : yearDifference - 1;
        return age;
    }
    const ageFilter = usersPool.filter((potentialMatch) => {
        if (user.findMe.age[0] > getAge(potentialMatch.birthday)
            || user.findMe.age[1] < getAge(potentialMatch.birthday)
        )
            return false;
        else return true;
    });
    if (ageFilter.length === 0) return null;
    else if (ageFilter.length === 1) return ageFilter[0];
    else {
        checkUsersLocation_step4(user, ageFilter)
    }
}
// filter by location
const checkUsersLocation_step4 = async (user, usersPool) => {
    const getDistance = (lon1, lat1, lon2, lat2) => {
        const dLat = (lat2 - lat1).toRad();
        const dLon = (lon2 - lon1).toRad();
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const distance = 6371 * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
        return distance;
    }

    let nearestMatchDistance = user.findMe.distance;
    let nearestMatchUser;

    const locationFilter = usersPool.filter((potentialMatch) => {
        const distance = getDistance(
            user.location.longitude, user.location.latitude,
            potentialMatch.location.longitude, potentialMatch.location.latitude
        )
        if (distance > user.findMe.distance) return false;
        else {
            if (distance <= nearestMatchDistance) {
                nearestMatchDistance = distance;
                nearestMatchUser = potentialMatch;
            }
            return true;
        };
    });
    if (locationFilter.length === 0) return null;
    else if (locationFilter.length === 1) return nearestMatchUser;
    else {
        return nearestMatchUser;
        // or keep filtering
    }
}

const handler = async (req, res) => {

    const { id } = req.query;

    // match (create new chat with both participants)
    if (req.method === 'POST') {
        try {
            // find other user id
            const user = await User.findById(id)
            const match = await findMatch(user)

            if (user && match) {
                // add users to "match history" of both
                await User.findByIdAndUpdate(user._id, { matchHistory: [...user.matchHistory, match.email] });
                await User.findByIdAndUpdate(match._id, { matchHistory: [...match.matchHistory, user.email] });

                // create chat & add chat to both participants
                const chatId = await createChat(user, match)
                console.log("chatId: ", chatId)
                await User.findByIdAndUpdate(user._id, { chats: [...user.chats, chatId] });
                await User.findByIdAndUpdate(match._id, { chats: [...match.chats, chatId] });

                return res.status(200).send(chatId);
            }
            else {
                if (user) {
                    res.status(422).send('no_match_found')
                }
                else {
                    res.status(422).send('failed_loading_user')
                }
            }
        }
        catch (error) {
            return res.status(500).send("error_matching_users", error.message);
        }
    }

    // unmatch (update both users and chat participants)
    if (req.method === 'PATCH') {
        try {

            // remove chat from user
            const { chatId } = req.body;
            const user = await User.findById(id)
            const chats = remove(user.chats, chatId)
            await User.findByIdAndUpdate(user._id, chats)

            // remove user from chat
            const chat = await Chat.findById(chatId)
            const participants = remove(chat.participants, user.email)
            if (participants.length === 0) {
                await Chat.findByIdAndDelete(chatId, chat)
            }
            else {
                await Chat.findByIdAndUpdate(chat, participants)
            }

        }
        catch (error) {
            return res.status(500).send("error_unmatching", error.message);
        }
    }

    else {
        res.status(422).send('req_method_not_supported');
    }

    res.end();
};

export default connectDB(handler);