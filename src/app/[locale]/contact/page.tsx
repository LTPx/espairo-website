import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

async function Contact(nextParams: { params: { locale: "es" | "de" | "en" } }) {
  const {
    params: { locale },
  } = nextParams;

  return (
    <div className="h-screen flex">
      <div className="w-1/2 h-full">
        <img
          src="https://s3-alpha-sig.figma.com/img/83ce/e865/25adddc29e66c77a252b62ab250ebcb0?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=SObWrqvt46RPJabop42Khp-~fX3aFlmp2wbGuMV6hWMevrDnj4piovyV2HfoN7UVzhfJPruJrNnxig5aDdahKbzBYQCCHYayGZWjfdy5TA-t3lXiXI93-TGEoT7cJQMO0JIMCNXzo8a~EX4ASTBfOR4WzKrjBAbBvmLuxbG3mYYtWfqXsDVgFktwfpQCt3rQMu7QwI5tZtQ2sA27luSFRXnX3DjcyJc7RbYX659RZ5kyXlL6twbPdvnW7yxA-5DeTyUAvjPiTw0H~9-kgz0GoNTlbo1sNnUj1TmVR4aLBvOjVHi3bwvYrrebNFyM6wUeDTas95Vu01wVbcIRUOZvsw__"
          alt="Espai Rö"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-1/2 h-full bg-[#3F4751] text-white flex flex-col justify-between p-12">
        <h1>Showroom y estudio de arquitectura.</h1>

        <section className="flex flex-col gap-12">
          <div>
            <label className="text-[18px] leading-[24px]">Contacto</label>{" "}
          </div>
          <div>
            <label className="text-[18px] leading-[24px]">Horario</label>
          </div>
          <div>
            <label className="text-[18px] leading-[24px]">¡Síguenos!</label>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Contact;
