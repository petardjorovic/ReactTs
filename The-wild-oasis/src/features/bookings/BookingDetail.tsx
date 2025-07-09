import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import type { BookingStatus } from "./BookingRow";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../../ui/Modal";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { isLoading, data: booking } = useBooking();
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteBooking, isDeleting } = useDeleteBooking();
  const status = booking?.status ?? "checked-in";
  const navigate = useNavigate();

  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  const safeStatus = (booking?.status ?? "unconfirmed") as BookingStatus;

  if (isLoading) return <Spinner />;

  if (!booking) return <Empty resourceName="booking" />;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{booking?.id}</Heading>
          <Tag type={statusToTagName[safeStatus]}>
            {status.replace("-", " ")}
          </Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {booking?.status === "unconfirmed" && (
          <Button
            size="medium"
            variation="primary"
            onClick={() => navigate(`/checkin/${booking?.id}`)}
          >
            Check-in
          </Button>
        )}

        {booking?.status === "checked-in" && (
          <Button
            size="medium"
            variation="primary"
            onClick={() =>
              checkout({
                bookingId: booking.id,
                obj: { status: "checked-out" },
              })
            }
            disabled={isCheckingOut}
          >
            Check-out
          </Button>
        )}

        <Modal>
          <Modal.Open opens="deleteBooking">
            <Button size="medium" variation="danger" disabled={isDeleting}>
              Delete booking
            </Button>
          </Modal.Open>

          <Modal.Window name="deleteBooking">
            <ConfirmDelete
              resourceName="booking"
              disabled={isDeleting}
              onConfirm={() => {
                if (booking?.id)
                  deleteBooking(booking?.id, {
                    onSettled: () => {
                      navigate(-1);
                    },
                  });
              }}
            />
          </Modal.Window>
        </Modal>

        <Button size="medium" variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
