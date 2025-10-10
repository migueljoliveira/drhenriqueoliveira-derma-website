import { redirect } from "next/navigation"

export default function TecnologiasPage({ params }: { params: { lang: string } }) {
  // Redirect to the technologies page with the same language
  redirect(`/${params.lang}/tecnologias`)
}
