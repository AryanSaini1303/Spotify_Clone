import Content from "@/components/content";

// Only a "page.js" file in the "app" folder component can be async not any other separate component for example all the components of the "components" folder
// We can't use getServerSideProps in a "page.js" file in the "app" folder
// Never add a 'use client' directive in a whole componenet, separate the part in a separate component which needs to be directed as client
export default async function HomePage({params}) {
  // console.log(params.playlistId);
  return (
    <>
      <Content id={params.playlistId}/>
    </>
  );
}
