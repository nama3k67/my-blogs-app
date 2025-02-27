import { ArrowDownIcon } from "lucide-react";

import BriefcaseIcon from "@/components/icons/briefcase";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/get-dictionary";
import RoleItem, { Role } from "./role";

import logoEnlabSoftware from "@/shared/images/logos/enlab_software_logo.jpeg";
import logoFpt from "@/shared/images/logos/fpt_logo.jpg";

type Props = {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
};

export function Resume({ dictionary }: Props) {
  const resume: Array<Role> = [
    {
      company: "Enlab Software",
      title: "CEO",
      logo: logoEnlabSoftware,
      start: "02/2022",
      end: "01/2025",
    },
    {
      company: "FPT University",
      title: "Student",
      logo: logoFpt,
      start: "10/2018",
      end: "10/2022",
    },
  ];

  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm items-center font-semibold text-zinc-900 dark:text-zinc-100">
        <BriefcaseIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">{dictionary.resume.title}</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {resume.map((role, roleIndex) => (
          <RoleItem key={roleIndex} role={role} dictionary={dictionary} />
        ))}
      </ol>
      <Button variant="secondary" className="group mt-6 w-full">
        {dictionary.resume.download}
        <ArrowDownIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
      </Button>
    </div>
  );
}
