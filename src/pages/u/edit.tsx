import { Layout } from "@/components/Layout/Layout";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import TypographyH3 from "@/components/ui/typography/h3";
import TypographyP from "@/components/ui/typography/p";
import { useToast } from "@/lib/useToast";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/utils/api";
import { IconAffiliate } from "@tabler/icons-react";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BlockPicker, ColorResult } from "react-color";

interface IState {
  newBio: string | null;
  showResources: boolean;
  newDisplayName: string | null;
  newBannerColor: string | null;
  newBanner: string | null;
}

export default function UserEdit() {
  const session = useSession();
  const { toast } = useToast();
  const {
    data: user,
    isLoading,
    refetch,
  } = api.users.single.useQuery(
    {
      id: String(session.data?.user.id),
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  // settings states
  const [state, setState] = useState<IState>({
    newBio: null,
    showResources: false,
    newDisplayName: null,
    newBannerColor: null,
    newBanner: null,
  });

  const updateState = (key: keyof IState, value: any) => {
    setState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const { newBio, showResources, newDisplayName, newBannerColor, newBanner } =
    state;

  // manage data changes
  const settings = api.users.update.useMutation();

  const submitSettings = () => {
    settings.mutate({
      bio: newBio,
      displayName: newDisplayName,
      bannerColor: newBannerColor,
      banner: newBanner,
      preferences: {
        showResources,
      },
    });
  };

  const handleColorChange = ({ hex }: ColorResult): void => {
    updateState("newBannerColor", hex);
  };

  useEffect(() => {
    const handleSettingsStatus = (status: string | undefined) => {
      if (status === "success") {
        refetch();
        toast({
          title: "Saved successfully",
        });
      } else if (status === "error") {
        toast({
          title: "Something happened",
          variant: "destructive",
        });
      }
    };

    handleSettingsStatus(settings.status);
  }, [settings.status]);

  useEffect(() => {
    const { preferences, bio, displayName, banner, bannerColor } = user || {};
    if (preferences?.showResources) {
      updateState("showResources", true);
    }
    if (bio) {
      updateState("newBio", bio);
    }
    if (displayName) {
      updateState("newDisplayName", displayName);
    }
    if (banner) {
      updateState("newBanner", banner);
    }
    if (bannerColor) {
      updateState("newBannerColor", bannerColor);
    }
  }, [user]);

  return (
    <Layout title="Editing your profile">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-col gap-5 rounded-lg border border-slate-300 bg-slate-200 dark:border-slate-700 dark:bg-slate-800">
          <div className="border-b border-b-slate-300 p-4 px-6 dark:border-b-slate-700">
            <div className="flex flex-col">
              <TypographyH3>Settings</TypographyH3>
              <TypographyP>Manage your account settings</TypographyP>
            </div>
          </div>
          <div className="p-6">
            <div className="mb-4 flex flex-col items-center rounded-md bg-slate-300 p-4 text-sm text-slate-600 dark:bg-slate-900 dark:text-slate-300 md:flex-row">
              <div className="mr-4 flex">
                <IconAffiliate className="h-6 w-6" />
              </div>
              <div className="flex items-center">
                Please remember that you logged in using a external provider, we
                cannot change some information such as profile picture, etc.
              </div>
            </div>
            <div className="flex flex-col space-y-5">
              <div>
                <Label htmlFor="displayName">Display name</Label>
                <Input
                  id="displayName"
                  className="mt-2"
                  maxLength={15}
                  value={newDisplayName ?? ""}
                  onChange={(e) =>
                    updateState("newDisplayName", e.target.value)
                  }
                  placeholder={"Your new display name"}
                />
              </div>
              <div>
                <Label htmlFor="bcolor">Banner color</Label>
                <div className="flex h-10 w-full items-center justify-between rounded-md border border-slate-300 bg-transparent py-2 px-3 text-sm duration-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-50 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900">
                  {newBannerColor}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div
                        className="h-6 w-6 cursor-pointer rounded-full"
                        style={{
                          backgroundColor: newBannerColor!,
                        }}
                      />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      avoidCollisions
                      className="!border-0 !bg-transparent p-3 !shadow-none"
                    >
                      <BlockPicker
                        color={newBannerColor!}
                        onChangeComplete={handleColorChange}
                      />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <div>
                <Label htmlFor="banner">Banner URL</Label>
                <Input
                  disabled
                  id="banner"
                  className="mt-2"
                  placeholder={"Your new banner url"}
                />
                <TypographyP className="!text-sm">
                  I am still building this feature, any help is appreciated,{" "}
                  <Link
                    href="https://github.com/chikaof/devdesk/pulls"
                    className="text-blue-400 underline"
                  >
                    make a pr
                  </Link>
                </TypographyP>
              </div>
              <div>
                <Label htmlFor="bio">Biography</Label>
                <Textarea
                  id="bio"
                  className="mt-2"
                  maxLength={120}
                  value={newBio ?? ""}
                  onChange={(e) => updateState("newBio", e.target.value)}
                  placeholder={"Describe yourself!"}
                />
              </div>
            </div>

            <div className="mt-4">
              <div className="flex flex-row items-center justify-between">
                <Label htmlFor="showresources" className="mb-2">
                  Show resources on your profile?
                </Label>
                <Switch
                  checked={showResources}
                  onCheckedChange={(check) =>
                    updateState("showResources", check)
                  }
                  id="showresources"
                />
              </div>
            </div>
            <div className="mt-5 flex flex-wrap justify-end gap-3">
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
