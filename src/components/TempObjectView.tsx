/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import SimpleTable from "./SimpleTable";

/**
 * Only meant as a temporary way to quickly display the data of objects returned from the backend on some pages for illustration purposes. Should be deleted not improved upon.
 * @param props Any kind of object to display the data of
 * @returns A ReactNode displaying the data of the object in an ugly way
 */
export function TempObjectView(props: { data: object }) {
  return (
    <SimpleTable
      columns={[
        {
          header: "Feltnavn",
          renderer: (r) => r.id,
        },
        {
          header: "Feltverdi",
          renderer: (r) => {
            if (r.value && typeof r.value === "object")
              return <TempObjectView data={r.value} />;
            return r.value;
          },
        },
      ]}
      rows={Array.from(Object.entries(props.data), ([id, value]) => ({
        id,
        value,
      }))}
    />
  );
}
