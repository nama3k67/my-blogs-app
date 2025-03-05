import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Locale } from "@/i18n-config";
import { CommentItem } from "@/shared/types/comment/item.type";
import { convertUsername } from "@/shared/utils/common";
import { formatDistanceToNow } from "date-fns";
import { enUS, vi } from "date-fns/locale";
import React from "react";

type CommentListProps = {
  comments: CommentItem[];
  isLoading?: boolean;
  lang: Locale;
};

const locales = {
  en: enUS,
  vi: vi,
};

const CommentList: React.FC<CommentListProps> = ({
  lang,
  comments,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin h-6 w-6 border-2 border-gray-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No comments yet. Be the first to share your thoughts!
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-4">
      {comments.map((comment) => (
        <div key={comment.id} className="flex items-start gap-4">
          <Avatar className="h-10 w-10 border">
            <AvatarFallback>
              {convertUsername(comment.users.username)}
            </AvatarFallback>
          </Avatar>
          <div className="grid gap-1.5">
            <div className="flex items-center gap-2">
              <div className="font-medium">{comment.users.username}</div>
              <div className="text-xs text-muted-foreground">
                {comment.updatedat &&
                  formatDistanceToNow(comment.updatedat, {
                    locale: locales[lang],
                    addSuffix: true,
                  })}
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              {comment.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
