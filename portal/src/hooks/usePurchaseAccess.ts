import EventModel from "@/services/api/collections/events/model";
import moment from "moment";

interface UsePurchaseAccessParams {
  event: EventModel | undefined;
  booking: any;
  hasPurchased?: boolean;
  paymentStatus: string;
}

export const usePurchaseAccess = ({
  event,
  booking,
  hasPurchased,
  paymentStatus,
}: UsePurchaseAccessParams) => {
  // Get the current moment
  const now = moment();

  // Parse and normalize the start and end dates of the event
  const eventStart = moment(event?.startDate).startOf("day");
  const eventEnd = moment(event?.endDate).endOf("day");

  // Determine the state of the event relative to the current date
  const isFutureEvent = eventStart.isAfter(now); // Event hasn't started yet
  const isOngoingEvent =
    now.isSameOrAfter(eventStart) && now.isSameOrBefore(eventEnd); // Event is currently running
  const isPastEvent = eventEnd.isBefore(now); // Event has ended

  // Initial states for logic control
  let canPurchase = false; // Whether the user can purchase a booking
  let shouldPayAgain = false; // Whether the user should retry payment due to a failure
  let canAccessContent = false; // Whether the user can access event content

  // Determine payment and booking status
  const isCancelled = hasPurchased && paymentStatus === "Cancelled"; // User previously purchased but cancelled
  const isPaid = hasPurchased && paymentStatus === "Paid"; // User successfully paid
  const isPendingError = !isCancelled && !isPaid; // Payment failed or pending

  // Main logic block to determine user permissions
  if (!booking) {
    // If there's no booking at all, user can purchase
    canPurchase = true;
  } else {
    // If a booking exists, check its expiry
    const bookingExpiry = moment(booking.expiry_date).endOf("day");

    // Handle active or upcoming event scenarios
    if (isFutureEvent || isOngoingEvent) {
      if (bookingExpiry.isBefore(eventStart)) {
        // Booking expired before event even started — allow new purchase
        canPurchase = true;
      } else if (bookingExpiry.isSameOrAfter(eventEnd)) {
        // Booking is valid for the entire event duration
        if (isPaid) {
          // Payment successful — allow content access
          canAccessContent = true;
        } else if (isPendingError) {
          // Payment failed or has issues — suggest retrying payment
          shouldPayAgain = true;
        } else if (isCancelled) {
          // Payment was cancelled — allow new purchase
          canPurchase = true;
        }
      }
    }

    // Handle past events
    if (isPastEvent) {
      if (isPaid) {
        // Event is over and payment was successful — allow content access
        canAccessContent = true;
      } else {
        // Event is over and user did not pay — allow repurchase
        canPurchase = true;
      }
    }
  }

  return {
    canPurchase,
    shouldPayAgain,
    canAccessContent,
    isFutureEvent,
    isOngoingEvent,
    isPastEvent,
    isPaid,
    isCancelled,
    isPendingError,
  };
};
