import UserNotLoggedInException from "../exception/UserNotLoggedInException";
import User from "../user/User";
import UserSession from "../user/UserSession";
import Booking from "./Booking";
import BookingAPI from "./BookingAPI";

export default class BookingService {
    public getTripsByUser(user: User): Booking[] {
        let bookingList: Booking[] = [];
        const loggedUser: User = UserSession.getLoggedUser();
        let isFriend: boolean = false;

        if (loggedUser != null) {
            for (const friend of user.getFriends()) {
                if (friend === loggedUser) {
                    isFriend = true;
                    break;
                }
            }

            if (isFriend) {
                bookingList = BookingAPI.findBookingsByUser(user);
            }

            return bookingList;
        } else {
            throw new UserNotLoggedInException();
        }
    }
}
