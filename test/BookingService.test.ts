import "jest";
import User from '../src/user/User';
import UserSession from '../src/user/UserSession';
import BookingAPI from '../src/booking/BookingAPI'
import BookingService from '../src/booking/BookingService';
import UserNotLoggedInException from "../src/exception/UserNotLoggedInException";
import CollaboratorCallException from "../src/exception/CollaboratorCallException";
import Booking from "../src/booking/Booking";


let userA:User;
let userB:User;
let bookingService: BookingService;

describe("Booking Service", () => {
    beforeEach(() => {
        userA = new User();
        userB = new User();

        bookingService = new BookingService();
    });

    it("should get userB bookings given that loggin user is a friend", () => {
        userB.addFriend(userA);
        bookingService = new BookingService();

        const bookingToLondon =  new Booking();
        userB.addBooking(bookingToLondon);
        
        const mockGetLoggedUser = jest.spyOn(UserSession, 'getLoggedUser').mockImplementation(() => userA);
        const mockFindBookingsByUser= jest.spyOn(BookingAPI, 'findBookingsByUser').mockImplementation((user: User) => user.getBookings());
        const userBBooking = bookingService.getTripsByUser(userB);

        expect(userBBooking).toEqual(userB.getBookings());
        expect(userBBooking[0]).toEqual(bookingToLondon);

        mockGetLoggedUser.mockRestore();
        mockFindBookingsByUser.mockRestore();
    });

    it("should not get userB bookings that loggin user is not a friend", () => {
        const mockGetLoggedUser = jest.spyOn(UserSession, 'getLoggedUser').mockImplementation(() => userA);

        expect(() => bookingService.getTripsByUser(userB)).toThrow('Unauthorised: Users are not friends');
    
        mockGetLoggedUser.mockRestore();
    });


    it("should throw UserNotLoggedInException error; given that no user is logged in", () => {
        const mockGetLoggedUser = jest.spyOn(UserSession, 'getLoggedUser').mockImplementation(() => null);

        expect(() => bookingService.getTripsByUser(userB)).toThrow(UserNotLoggedInException);
    
        mockGetLoggedUser.mockRestore();
    });


    it("should not get userB bookings that loggin user is not a friend", () => {
        const mockGetLoggedUser = jest.spyOn(UserSession, 'getLoggedUser').mockImplementation(() => userA);

        expect(() => bookingService.getTripsByUser(userB)).toThrow("Unauthorised: Users are not friends");
    
        mockGetLoggedUser.mockRestore();
    });


    it("should throw error if UserSession.getLoggedUser is not implemented", () => {
        expect(() => bookingService.getTripsByUser(userB)).toThrow(CollaboratorCallException);
        expect(() => bookingService.getTripsByUser(userB)).toThrow("UserSession.getLoggedUser() should not be invoked from unit test");
    });

    it("should throw error if BookingAPI.findBookingsByUser is not implemented", () => {
        userB.addFriend(userA);
        const mockGetLoggedUser = jest.spyOn(UserSession, 'getLoggedUser').mockImplementation(() => userA);

        expect(() => bookingService.getTripsByUser(userB)).toThrow(CollaboratorCallException);
        expect(() => bookingService.getTripsByUser(userB)).toThrow("BookingAPI should not be invoked from unit test.");

        mockGetLoggedUser.mockRestore();
    });
});
