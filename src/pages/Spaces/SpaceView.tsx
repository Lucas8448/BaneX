import { useQuery } from "@tanstack/react-query";
import { getSpace } from "../../api";
import { NavLink, Outlet, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import QueryErrorView from "../../components/TempQueryErrorView";
import { TempObjectView } from "../../components/TempObjectView";

export default function SpaceView() {
  const { spaceId } = useParams<{ spaceId: string }>();
  const spaceQuery = useQuery(["spaces", spaceId], () => getSpace(spaceId!));
  if (spaceQuery.isLoading) return <Loader />;
  if (spaceQuery.isError)
    return (
      <QueryErrorView error={spaceQuery.error}>
        hensettingsplassen med id {spaceId}
      </QueryErrorView>
    );
  return (
    <>
      <h1>Hensettingsplass {spaceId}</h1>
      <TempObjectView data={spaceQuery.data} />
      <NavLink to={"reservations"}>
        {({ isActive }) => !isActive && <>Vis reservasjoner</>}
      </NavLink>
      <Outlet />
    </>
  );
}
