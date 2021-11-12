import CollaboratorCallException from "../exception/CollaboratorCallException";
import User from "../user/User";
import Booking from "./Booking";

export default class BookingAPI {
    public static findBookingsByUser(user: User): Booking[] {
        throw new CollaboratorCallException(
            "BookingAPI should not be invoked from unit test.");
    }
}
