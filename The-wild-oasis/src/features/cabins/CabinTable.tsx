import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import type { Cabin } from "../../services/apiCabins";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

type SortField = "name" | "maxCapacity" | "regularPrice" | "discount";

export default function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  // 1. FILTER
  const filterValue = searchParams.get("discount") || "all";

  let filteredCabins: Cabin[] | undefined;

  if (filterValue === "all") filteredCabins = cabins;
  if (filterValue === "no-discount")
    filteredCabins = cabins?.filter((cabin) => cabin.discount! === 0);
  if (filterValue === "with-discount")
    filteredCabins = cabins?.filter((cabin) => cabin.discount! > 0);

  // 2. SORT
  const sortBy = searchParams.get("sortBy") || "start-date-asc";

  const [field, direction] = sortBy.split("-") as [SortField, "asc" | "desc"];
  const modifier = direction === "asc" ? 1 : -1;

  const sortedCabins = filteredCabins?.sort((a, b) => {
    const aField = a[field] ?? 0;
    const bField = b[field] ?? 0;

    return ((aField as number) - (bField as number)) * modifier;
  });

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
          // data={filteredCabins ?? []}
          data={sortedCabins ?? []}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        ></Table.Body>
      </Table>
    </Menus>
  );
}
