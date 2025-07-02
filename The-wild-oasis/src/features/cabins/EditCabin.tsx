import { HiPencil } from "react-icons/hi2";
import type { Cabin } from "../../services/apiCabins";
import Modal from "../../ui/Modal";
import EditCabinForm from "./EditCabinForm";

export default function EditCabin({ cabin }: { cabin: Cabin }) {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <button>
          <HiPencil />
        </button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <EditCabinForm cabin={cabin} />
      </Modal.Window>
    </Modal>
  );
}
