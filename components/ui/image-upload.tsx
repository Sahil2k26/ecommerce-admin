"use client"
import { useEffect, useState } from "react";
import { Button } from "./button";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary"

interface ImageUploadProps {
    disabled: boolean,
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
    value: string[]
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    disabled,
    onChange,
    onRemove,
    value
}) => {

    // for hydration errors at ssr
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, [])

    const onUpload = (result: any) => {
        onChange(result.info.secure_url);
    }

    if (!mounted) return null;

    return (
        <div className="flex-col">
            <div className="mb-4 flex items-center gap-4 flex-wrap">
                {value.map((url,i) => (
                    <div key={i} className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
                        <div className="z-10 absolute top-2 right-2">
                            <Button
                                variant={"destructive"}
                                size={"icon"}
                                onClick={() => onRemove(url)}
                            >
                                <Trash className="h-4 w-4" />
                            </Button>

                        </div>
                        <Image
                            sizes="100%"
                            fill
                            className="object-cover"
                            alt="Image"
                            src={url}
                        />



                    </div>
                ))}
            </div>
            <CldUploadWidget
                    onSuccess={onUpload}
                    uploadPreset="newPreset"
                    options={{

                        multiple: true,
                        sources: ['local',"url","camera","image_search"],
                        resourceType: "image",
                        clientAllowedFormats: ['jpg', 'png', 'jpeg', 'webp', 'gif'],
                        maxFiles: 5 // Optional: limit number of files
                    }}
                >
                    {({ open }) => {
                        return (
                            <Button
                                type="button"
                                disabled={disabled}
                                variant={"secondary"}
                                onClick={() => open()}
                            >
                                <ImagePlus className="h-4 w-4" />
                                Upload Image(s)
                            </Button>
                        )
                    }}
                </CldUploadWidget>

        </div>

    )
}

export default ImageUpload