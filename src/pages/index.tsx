import { Layout } from "@/components/Layout/Layout";
import { Button } from "@/components/ui/button";
import { api } from "@/utils/api";
import Card from "@/components/parts/Card";
import TypographyP from "@/components/ui/typography/p";
import TypographyH1 from "@/components/ui/typography/h1";
import Link from "next/link";

export default function Home() {
  const publicResources = api.resources.getAll.useQuery();

  const resources = publicResources.data?.map((resource, index) => (
    <Card
      key={index}
      name={resource.title}
      description={resource.description}
      image={resource.image}
    />
  ));

  return (
    <Layout>
      <section className="container grid items-center justify-center gap-6 pt-6 pb-8 md:pt-10 md:pb-12 lg:pt-16 lg:pb-24">
        <div className="mx-auto flex flex-col items-start gap-4 lg:w-[52rem]">
          <TypographyH1>Resources</TypographyH1>
          <TypographyP>
            Community-driven resource gallery for developers, public and
            open-source for everyone, submit a resource you want to share with
            the community!
          </TypographyP>
        </div>
        <div className="flex gap-2">
          <Link href="#resources">
            <Button>Explore</Button>
          </Link>
          <Link href="/resource/submit">
            <Button variant={"link"}>Submit a resource</Button>
          </Link>
        </div>
      </section>
      <div className="my-8 grid grid-cols-3" id="resources">
        {resources}
      </div>
    </Layout>
  );
}
