import { ReactNode } from "react";

export interface SimpleTableColumn<T> {
  key?: number | string;
  renderer: (row: T) => ReactNode;
  header: ReactNode;
}

interface Props<T> {
  rows: T[];
  columns: SimpleTableColumn<T>[];
}

export default function SimpleTable<T extends { id: string | number }>(
  props: Props<T>
) {
  return (
    <table>
      <thead>
        <tr>
          {props.columns.map((c, i) => (
            <th key={c.key ?? i}>{c.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.rows.map((r) => (
          <tr key={r.id}>
            {props.columns.map((c, j) => (
              <td key={c.key ?? j}>{c.renderer(r)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
