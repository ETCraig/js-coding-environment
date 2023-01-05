import { Fragment } from "react";
import { useTypedSelector } from "../../hooks/use-typed-selector";
import AddCell from "../add-cell/add-cell";
import CellListItem from "../cell-list-item/cell-list-item";

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells: { order, data } }) =>
    order.map((id) => data[id])
  );

  const renderedCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell prevCellId={cell.id} />
    </Fragment>
  ));

  return (
    <div>
      <AddCell forceVisible={cells.length === 0} prevCellId={null} />
      {renderedCells}{" "}
    </div>
  );
};

export default CellList;
