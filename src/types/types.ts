
export type Booking = {
    id: number;
    carId: number;
    placeNumber: number;
    startTime: string;
    endTime: string;
    actualStartTime?: string | null;
    actualEndTime?: string | null;
    status: string;
    createdAt: string;
    updatedAt: string;
};


export type Car = {
    id: number;
    userId: number;
    carNumber: string;
    createdAt: string;
    updatedAt: string;
    Booking: Booking[];
};


export type User = {
    id: number;
    fullName: string;
    phoneNumber: string;
    password: string;
    role: string;
    cars: Car[];
    allBookings: Booking[];
    loading: boolean;
    error: string | null;
};
