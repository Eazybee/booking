import Booking from "../booking/Booking";

export default class User {
    private bookings: Booking[] = [];
    private friends: User[] = [];

    public getFriends(): User[] {
        return this.friends;
    }

    public addFriend(user: User): void {
        this.friends.push(user);
    }

    public addBooking(trip: Booking): void {
        this.bookings.push(trip);
    }

    public getBookings(): Booking[] {
        return this.bookings;
    }
}
