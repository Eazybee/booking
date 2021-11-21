import UserNotLoggedInException from "../exception/UserNotLoggedInException";
import User from "../user/User";
import UserSession from "../user/UserSession";
import Booking from "./Booking";
import BookingAPI from "./BookingAPI";

export default class BookingService {
    public getTripsByUser(user: User): Booking[] | Error {
        let bookingList: Booking[] = [];

        try {
            const loggedUser: User | null = UserSession.getLoggedUser();

            if (loggedUser != null) {
                let isFriend: boolean = false;

                for (const friend of user.getFriends()) {
                    if (friend === loggedUser) {
                        isFriend = true;
                        break;
                    }
                }

                if (isFriend) {
                    bookingList = BookingAPI.findBookingsByUser(user);
                    return bookingList;
                }
                
                throw new Error("Unauthorised: Users are not friends");
            } else {
                throw new UserNotLoggedInException();
            }
        } catch (error) {
            throw error;
        }
    }
}
