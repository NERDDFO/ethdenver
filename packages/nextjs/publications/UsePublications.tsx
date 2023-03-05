import { usePublications } from "@lens-protocol/react";

import { ErrorMessage } from "../components/error/ErrorMessage";
import { Loading } from "../components/loading/Loading";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { PublicationCard } from "../publications/components/PublicationCard";

export function UsePublications() {
  const {
    data: publications,
    error,
    loading,
    hasMore,
    observeRef,
  } = useInfiniteScroll(usePublications({ profileId: "0x70b2" })); //profileId: "0x70b2" is the profileId of LenScholar's App

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      <div
        style={{
          marginTop: "4vh",
          border: "3px solid black",
          maxWidth: "64vw",
          padding: "2vh 0 2vh 2vh",
          margin: "auto",
          borderRadius: "41px 25px 25px 0px",
          boxShadow: "12px 12px 14px #888888",
        }}
      >
        {publications.map(publication => (
          <PublicationCard key={publication.id} publication={publication} />
        ))}
        {hasMore && <p ref={observeRef}>Loading more...</p>}
      </div>
    </div>
  );
}
