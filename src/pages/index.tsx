import { Layout } from "@/components/Layout/Layout";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { api } from "@/utils/api";
import Card from "@/components/parts/Card";
import { useToast } from "@/lib/useToast";
import { beautifyErrors, jabber } from "@/lib/utils";

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
        description: beautifyErrors(submit.error?.message!),
        variant: "destructive",
      });
    }
  }, [submit.error]);

  return (
    <Layout>
      <Button
        onClick={handleSubmit}
        disabled={submit.isLoading}
        className="mb-5"
      >
        submit random resource
      </Button>
      {publicResources.isLoading
        ? "loading..."
        : publicResources.data && (
            <div className="grid grid-cols-4 gap-2">{resourceCards}</div>
          )}

      {submit.error && <p>Something went wrong! {submit.error.message}</p>}
    </Layout>
  );
}
