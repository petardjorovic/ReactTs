import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import type { Cabin } from "../../services/apiCabins";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

export default function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("discount") || "all";

  if (isLoading) return <Spinner />;

  let filteredCabins: Cabin[] | undefined;

  if (filterValue === "all") filteredCabins = cabins;
  if (filterValue === "no-discount")
    filteredCabins = cabins?.filter((cabin) => cabin.discount! === 0);
  if (filterValue === "with-discount")
    filteredCabins = cabins?.filter((cabin) => cabin.discount! > 0);

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body<Cabin>
          // data={cabins ?? []}
          data={filteredCabins ?? []}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        ></Table.Body>
      </Table>
    </Menus>
  );
}
