import { MailIcon } from "../icons/socials";
import { SocialLink } from "../shared/social-link";
import { Separator } from "../ui/separator";
import { SOCIALS } from "./constants";
import { getDictionary } from "@/get-dictionary";

type Props = {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
};

export default function AboutSocials({ dictionary }: Props) {
  return (
    <ul>
      {SOCIALS.map((social, index) => (
        <SocialLink key={index} href={social.href} icon={social.icon}>
          {dictionary.about.follow_on} {social.name}
        </SocialLink>
      ))}

      <Separator className="mt-10 mb-9" />

      <SocialLink
        href="mailto:tranphuongnam.engineer@gmail.com"
        icon={MailIcon}
        className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
      >
        tranphuongnam.engineer@gmail.com
      </SocialLink>
    </ul>
  );
}
