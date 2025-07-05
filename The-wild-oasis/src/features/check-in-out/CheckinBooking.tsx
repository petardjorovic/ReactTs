import styled from "styled-components";
import BookingDataBox from "../bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const { isLoading, data: booking } = useBooking();
  const { isLoading: isLoadingSettings, settings } = useSettings();
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const moveBack = useMoveBack();
  const { isCheckingIn, checkin } = useCheckin();
  const optionalBreakfastPrice =
    booking?.numGuests && booking.numNights && settings?.breakfastPrice
      ? booking.numNights * settings.breakfastPrice * booking.numGuests
      : 0;

  useEffect(() => {
    if (typeof booking?.isPaid === "boolean") {
      setConfirmPaid(booking.isPaid);
    }
  }, [booking?.isPaid]);

  function handleCheckin() {
    if (!confirmPaid) return;
    if (typeof booking?.id === "number") {
      if (addBreakfast) {
        checkin({
          bookingId: booking?.id,
          obj: {
            hasBreakfast: true,
            extrasPrice: optionalBreakfastPrice,
            totalPrice: (booking.totalPrice ?? 0) + optionalBreakfastPrice,
          },
        });
      } else {
        checkin({ bookingId: booking?.id });
      }
    }
  }

  if (isLoading || isLoadingSettings) return <Spinner />;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{booking?.id}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!booking?.hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((breakfast) => !breakfast);
              setConfirmPaid(false);
            }}
            id="breakfast"
            disabled={addBreakfast}
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          id="confirm"
          onChange={() => setConfirmPaid((paid) => !paid)}
          disabled={confirmPaid || isCheckingIn}
        >
          I confirm that {booking?.guests?.fullName} has paid the total amount
          of{" "}
          {!addBreakfast
            ? booking?.totalPrice
              ? formatCurrency(booking?.totalPrice)
              : "Unknown price"
            : `${formatCurrency(
                (booking?.totalPrice ?? 0) + optionalBreakfastPrice
              )} (${formatCurrency(
                booking?.totalPrice ?? 0
              )} + ${formatCurrency(optionalBreakfastPrice)})`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button
          onClick={handleCheckin}
          size="medium"
          variation="primary"
          disabled={!confirmPaid || isCheckingIn}
        >
          Check in booking #{booking?.id}
        </Button>
        <Button variation="secondary" onClick={moveBack} size="medium">
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
