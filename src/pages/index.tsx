import { Layout } from "@/components/Layout/Layout";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { api } from "@/utils/api";
import Card from "@/components/parts/Card";
import { useToast } from "@/lib/useToast";
import { beautifyErrors, jabber } from "@/lib/utils";
import TypographyP from "@/components/ui/typography/p";
import TypographyH1 from "@/components/ui/typography/h1";

export default function Home() {
  const submit = api.resources.postOne.useMutation();
  const publicResources = api.resources.getAll.useQuery();
  const { toast } = useToast();

  const resourceCards = publicResources.data?.map((resource, index) => (
    <Card
      key={index}
      name={resource.title}
      description={resource.description}
      image={resource.image}
    />
  ));

  const handleSubmit = () => {
    const title = jabber.createWord(6, true),
      description = jabber.createParagraph(30),
      image =
        "https://media.discordapp.net/attachments/986978011490439198/1084119254590304366/capture.png?width=747&height=480",
      uri = `https://github.com/${jabber.createWord(4)}/${jabber.createWord(
        7
      )}`;

    submit.mutate({
      title,
      description,
      uri,
      image,
    });
  };

  useEffect(() => {
    publicResources.refetch();
  }, [submit.isLoading]);

  useEffect(() => {
    if (submit.isError) {
      toast({
        title: "Something happened!",
        description: beautifyErrors(submit.error?.message),
        variant: "destructive",
      });
    }
  }, [submit.error]);

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
          <Button>Explore</Button>
          <Button variant={"link"}>Submit a resource</Button>
        </div>
      </section>
    </Layout>
  );
}
