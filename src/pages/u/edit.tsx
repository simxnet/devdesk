import { Layout } from "@/components/Layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import TypographyH4 from "@/components/ui/typography/h4";
import { useToast } from "@/lib/useToast";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/utils/api";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function UserEdit() {
  const session = useSession();
  const { toast } = useToast();
  const {
    data: user,
    isLoading,
    refetch,
  } = api.users.getOne.useQuery({
    id: String(session.data?.user.id),
  });

  // settings states
  const [newBio, setNewBio] = useState<string>();
  const [showResources, setShowResources] = useState<boolean>(false);

  // manage data changes
  const settings = api.users.updateMe.useMutation();

  const submitSettings = () => {
    settings.mutate({
      bio: String(newBio),
      showResources,
    });
  };

  useEffect(() => {
    if (settings.status === "success") {
      refetch();
      toast({
        title: "Saved successfully",
      });
    }
  }, [settings.status]);

  useEffect(() => {
    if (user?.settings_showResources) {
      setShowResources(true);
    }

    if (user?.bio) {
      setNewBio(user.bio);
    }
  }, [user]);

  return (
    <Layout>
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-col gap-5 rounded-lg bg-slate-200 p-3 dark:bg-slate-800">
          <div className="flex flex-col gap-3">
            <TypographyH4 className="opacity-70">Profile</TypographyH4>
            <div className="flex flex-row items-center gap-4">
              <Label htmlFor="bio">Bio</Label>
              <Input
                id="bio"
                onChange={(e) => setNewBio(e.target.value)}
                defaultValue={newBio}
                placeholder={user ? user.bio! : "I love cats with boots"}
              />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <TypographyH4 className="opacity-70">Privacy</TypographyH4>
            <div className="flex flex-row items-center justify-between">
              <Label htmlFor="showresources">
                Show resources on your profile?
              </Label>
              <Switch
                onCheckedChange={(e) => setShowResources(e)}
                checked={showResources}
                id="showresources"
              />
            </div>
          </div>
          <div className="ml-auto">
            <Button
              onClick={submitSettings}
              isLoading={settings.isLoading || isLoading}
              className="!bg-white !text-slate-900 hover:!bg-white/80"
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerAuthSession(context);

  if (!session) {
    return {
      notFound: true,
    };
  }

  return {
    props: {},
  };
};
