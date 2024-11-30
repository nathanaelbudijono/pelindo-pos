/* eslint-disable jsx-a11y/alt-text */
import { MouseEvent, useCallback, useEffect, useState } from "react";
import clsx from "clsx";
import { Accept, useDropzone } from "react-dropzone";
import { Controller, useFormContext } from "react-hook-form";
import FilePreview from "./file-preview";

import { PiUploadSimpleLight } from "react-icons/pi";

import { IconType } from "react-icons";
import { FileWithPreview } from "../../types/dropzone";
import { useApiActionStore } from "../../lib/zustand/store";

type DropzoneInputProps = {
  accept?: Accept;
  helperText?: string;
  id: string;
  label?: string;
  maxFiles?: number;
  readOnly?: boolean;
  validation?: object;
  leftIconLabel?: IconType | string;
  type?: "image" | "file";
};

export default function DropzoneInput({
  accept,
  helperText = "",
  id,
  label,
  maxFiles = 1,
  validation,
  leftIconLabel: LeftIconLabel,
  readOnly,
}: DropzoneInputProps) {
  const {
    control,
    getValues,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const [files, setFiles] = useState<FileWithPreview[]>(getValues(id) || []);
  const { isAction } = useApiActionStore();

  const onDrop = useCallback(
    (acceptedFiles: any, rejectedFiles: any) => {
      if (rejectedFiles && rejectedFiles.length > 0) {
        setValue(id, files ? [...files] : null);
        const errorCode = rejectedFiles[0]?.errors[0]?.code;
        setError(id, {
          type: "manual",
          message:
            errorCode === "file-too-large"
              ? "File(s) should not be larger than 1 MB"
              : "Please select the correct file format",
        });
      } else {
        const acceptedFilesPreview = acceptedFiles.map(
          (file: FileWithPreview) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
        );

        setFiles(
          files
            ? [...files, ...acceptedFilesPreview].slice(0, maxFiles)
            : acceptedFilesPreview
        );

        setValue(
          id,
          files
            ? [...files, ...acceptedFiles].slice(0, maxFiles)
            : acceptedFiles,
          {
            shouldValidate: true,
          }
        );
        clearErrors(id);
      }
    },
    [clearErrors, files, id, maxFiles, setError, setValue]
  );

  /* eslint-disable @typescript-eslint/no-unused-expressions */
  useEffect(() => {
    return () => {
      () => {
        files.forEach((file) => URL.revokeObjectURL(file.preview));
      };
    };
  }, [files]);

  const deleteFile = (e: MouseEvent, file: FileWithPreview) => {
    e.preventDefault();
    const newFiles = [...files];

    newFiles.splice(newFiles.indexOf(file), 1);

    if (newFiles.length > 0) {
      setFiles(newFiles);
      setValue(id, newFiles, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    } else {
      setFiles([]);
      setValue(id, null, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept,
    maxFiles,
    maxSize: 10000000,
  });

  useEffect(() => {
    if (isAction) {
      setFiles([]);
      setValue(id, null, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }
  }, [isAction, setValue, id]);

  return (
    <div>
      {label && (
        <div className="bg-d-600 flex w-fit px-3 py-1 border border-d-600 rounded-t-lg gap-2 items-center dark:bg-n-300 dark:border-n-200">
          {LeftIconLabel && <LeftIconLabel className="text-color-100" />}
          <p className="block">{label}</p>
        </div>
      )}
      {readOnly && !(files?.length > 0) ? (
        <div className="rounded-md border cursor-not-allowed border-d-400 text-color-100 py-3 pl-3 pr-4 text-sm">
          Cannot upload files
        </div>
      ) : files?.length >= maxFiles ? (
        <ul className="mt-2 divide-y divide-brand-300 rounded-md ">
          {files.map((file, index) => (
            <FilePreview
              key={index}
              readOnly={readOnly}
              file={file}
              deleteFile={deleteFile}
              //@ts-ignore
              files={files}
              fileIndex={index}
            />
          ))}
        </ul>
      ) : (
        <Controller
          control={control}
          name={id}
          rules={validation}
          render={({ field }) => (
            <>
              <div
                className="group  focus:outline-none"
                {...getRootProps()}
                {...field}
              >
                <input {...getInputProps()} />
                <div
                  className={clsx(
                    "w-full p-2 bg-transparent border border-d-400 shadow-sm hover:bg-d-400 transition-colors duration-100 hover:text-typography-800 text-color-100 cursor-pointer dark:hover:bg-n-400 dark:border-n-500",
                    label
                      ? "rounded-tr-lg rounded-bl-lg rounded-br-lg"
                      : "rounded-lg",
                    errors[id]
                      ? "border-danger-500 group-focus:border-danger-500"
                      : "group-focus:border-primary-500"
                  )}
                >
                  <div className="flex  flex-col justify-center items-center my-20 space-y-2 text-center">
                    <PiUploadSimpleLight className="text-[3rem]" />
                    <p className="leading-7">Drag or click to select image</p>
                    <p className="text-sm font-medium leading-none">{`${
                      maxFiles - (files?.length || 0)
                    } file(s) remaining`}</p>
                  </div>
                </div>
              </div>

              <div className="mt-2">
                {helperText !== "" && <p>{helperText}</p>}
              </div>
              {!readOnly && !!files?.length && (
                <ul className="mt-2  rounded-lg  ">
                  {files.map((file, index) => (
                    <FilePreview
                      key={index}
                      readOnly={readOnly}
                      file={file}
                      deleteFile={deleteFile}
                      //@ts-ignore
                      files={files}
                      fileIndex={index}
                    />
                  ))}
                </ul>
              )}
            </>
          )}
        />
      )}
    </div>
  );
}
