import { User } from "../model/user.model.js"

export default class Session {

    async createSession(email, password) {
        try {
            const session = await User.create({ email, password });
            return session;
        } catch (error) {
            console.error('Error creating session:', error);
            throw error;
        }
    }

    async getSessionByEmail(email) {
        try {
            const session = await User.findOne({ where: { email } });
            return session;
        } catch (error) {
            console.error('Error fetching session by email:', error);
            throw error;
        }
    }

    async deleteSession(email) {
        try {
            await User.destroy({ where: { email } });
        } catch (error) {
            console.error('Error deleting session:', error);
            throw error;
        }
    }


}