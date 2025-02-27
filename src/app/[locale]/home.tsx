import React from "react";

interface Props {
  data: any;
}

function Home(props: Props) {
  const { data } = props;
  return (
    <div className="relative flex min-h-screen bg-gray-100">
      <div className="flex-1 flex items-center justify-center">
        <div className="relative h-[100vh] w-full">
          <img
            src="https://s3-alpha-sig.figma.com/img/b80f/1e5b/aa913f7312897ba8af0c8bc0605f0cbc?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=VqSRQOJRAEl0MKNOyjwahVqHvF6v3FBGqfTFOX99d1S84MsVO42PcVRumA9bQflSZYGvd0z2EZuozunBVvLly8Hv-ve7QAV4XmrwZ8icKam6dYqQEMwR1T6poSjQspBm88Hl66HnmFk2eBQHmsAT~IXkIt~N7QYB~CHvhBis-wwKmWUg4w81owdpNSLYmO2nfV~nDKMEo6-dH7HqfwBk6C-CLs016wGHz2QmC1z3RONa0nShnNoLYe-XV4VXiItL1A-BB9RXtf~rTXfOZUjm3s6z1CJuXQmRBBPpZV8fArzcFFpLhxngR-wcvkgAwK976s0jdJ2VIZXrvbgxBhQoqQ__" // Reemplaza con tu imagen
            alt="Espai Rö"
            className="h-full w-full"
          />
          <h1 className="absolute top-6 left-6 text-white text-2xl font-semibold">
            Espai Rö
          </h1>
          <p className="absolute bottom-6 left-6 text-white text-sm">
            Showroom & fine craftsmanship products.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
