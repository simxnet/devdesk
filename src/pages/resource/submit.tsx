import { Layout } from "@/components/Layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import TypographyH3 from "@/components/ui/typography/h3";
import TypographyP from "@/components/ui/typography/p";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

export default function ResourceSubmit() {
  return (
    <Layout title="Adding a new resource">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-col gap-5 rounded-lg border border-slate-300 bg-slate-200 dark:border-slate-700 dark:bg-slate-800">
          <div className="border-b border-b-slate-300 p-4 px-6 dark:border-b-slate-700">
            <div className="flex flex-col">
              <TypographyH3>Submit a resource</TypographyH3>
              <TypographyP>
                Want to share something with dev community? Go ahead!
              </TypographyP>
            </div>
          </div>
          <div className="p-6">
            <div className="mb-4 flex items-center rounded-md bg-slate-300 p-4 text-sm text-slate-600 dark:bg-slate-900 dark:text-slate-300">
              <div className="mr-4 flex">
                <ExclamationTriangleIcon className="h-6 w-6" />
              </div>
              <div className="flex items-center">
                Submitted resources are not reviewed by anyone, please do not
                abuse of this service, otherwise you will be IP-BANNED
              </div>
            </div>
            <div className="flex flex-col space-y-5">
              <div>
                <Label htmlFor="rname">Name</Label>
                <Input
                  id="rname"
                  className="mt-2"
                  maxLength={30}
                  placeholder={"Resource name"}
                />
              </div>
              <div>
                <Label htmlFor="rdesc">Description</Label>
                <Textarea
                  id="rdesc"
                  className="mt-2"
                  maxLength={250}
                  placeholder={"Resource description"}
                />
              </div>
              <div>
                <Label htmlFor="rimage">Image</Label>
                <input
                  className="relative m-0 mt-2 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-slate-300 bg-clip-padding py-[0.32rem] px-3 text-base font-normal text-slate-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-slate-100 file:px-3 file:py-[0.32rem] file:text-slate-700 file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:file:bg-slate-200 focus:text-slate-700 focus:shadow-[0_0_0_1px] focus:outline-none dark:border-slate-600 dark:text-slate-200 dark:file:bg-slate-700 dark:file:text-slate-100"
                  type="file"
                  id="rimage"
                />
                <TypographyP className="mt-1 !text-sm">
                  The image should be a screenshot of the main page of the
                  web/resource
                </TypographyP>
              </div>

              <div className="mt-5 flex flex-wrap justify-end gap-3">
                <Button className="!bg-white !text-slate-900 hover:!bg-white/80">
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
