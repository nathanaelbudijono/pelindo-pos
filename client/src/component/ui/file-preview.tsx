import * as React from "react";

import { ExternalLink, Paperclip, X } from "lucide-react";
import { FileWithPreview } from "../../types/dropzone";

type FilePreviewProps = {
  file: FileWithPreview;
} & (
  | {
      deleteFile?: (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        file: FileWithPreview
      ) => void;
      readOnly?: true;
    }
  | {
      deleteFile: (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        file: FileWithPreview
      ) => void;
      readOnly?: false;
    }
);

export default function FilePreview({
  deleteFile,
  file,
  readOnly,
}: FilePreviewProps): React.ReactElement {
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    deleteFile?.(e, file);
  };

  const imagesType = ["application/pdf"];

  return imagesType.includes(file.type) ? (
    <li
      className="mb-2 flex min-h-[2.25rem] items-center justify-between rounded-md border-2 border-input py-0 pl-3 pr-4 text-sm"
      key={file.name}
    >
      <div className="flex w-0 flex-1 items-center">
        <Paperclip
          className="shrink-0 text-gray-400"
          aria-hidden="true"
          size={16}
        />
        <span className="ml-2 w-0 flex-1 ">{file.name}</span>
      </div>

      <div className="ml-4 flex shrink-0 items-center space-x-2">
        <a
          href={file.preview}
          className="rounded text-gray-500 hover:text-gray-700 focus:outline-none focus:ring focus:ring-primary"
          target="_blank"
        >
          <ExternalLink size={16} />
        </a>
        {!readOnly && (
          <button
            className="cursor-pointer rounded text-red-600 hover:text-red-700 focus:outline-none focus:ring focus:ring-red-500 "
            type="button"
            onClick={(e) => deleteFile?.(e, file)}
          >
            <X size={16} />
          </button>
        )}
      </div>
    </li>
  ) : (
    <li
      key={file.name}
      className="mb-2 flex min-h-[2.25rem] items-center justify-between rounded-md border-2 border-input py-0 pl-3 pr-4 text-sm md:min-h-[2.5rem]"
    >
      <div className="flex w-0 flex-1 items-center">
        <Paperclip
          className="shrink-0 text-gray-400"
          aria-hidden="true"
          size={16}
        />
        <span className="ml-2 w-0 flex-1 truncate">{file.name}</span>
      </div>

      <div className="ml-4 flex shrink-0 items-center space-x-2">
        <a
          href={file.preview}
          className="rounded text-gray-500 hover:text-gray-700 focus:outline-none focus:ring focus:ring-primary"
          target="_blank"
        >
          <ExternalLink size={16} />
        </a>
        {!readOnly && (
          <button
            className="cursor-pointer rounded text-red-600 hover:text-red-700 focus:outline-none focus:ring focus:ring-red-500 "
            type="button"
            onClick={(e) => deleteFile?.(e, file)}
          >
            <X size={16} />
          </button>
        )}
      </div>
    </li>
  );
}
