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

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const { isLoading, data: booking } = useBooking();
  const [confirmPaid, setConfirmPaid] = useState(false);
  const moveBack = useMoveBack();
  const { isCheckingIn, checkin } = useCheckin();

  useEffect(() => {
    if (typeof booking?.isPaid === "boolean") {
      setConfirmPaid(booking.isPaid);
    }
  }, [booking?.isPaid]);

  function handleCheckin() {
    if (!confirmPaid) return;
    if (typeof booking?.id === "number") {
      checkin(booking?.id);
    }
  }

  if (isLoading) return <Spinner />;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{booking?.id}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Box>
        <Checkbox
          checked={confirmPaid}
          id="confirm"
          onChange={() => setConfirmPaid((paid) => !paid)}
          disabled={confirmPaid || isCheckingIn}
        >
          I confirm that {booking?.guests?.fullName} has paid the total amount
          of{" "}
          {booking?.totalPrice
            ? formatCurrency(booking.totalPrice)
            : "unknown amount"}
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
