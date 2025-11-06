import {FileText, Type, Link, Plus, Minus} from "lucide-react";
import type {MaterialPayload} from "@/type.ts";
import GeoInput from "@/components/geo/geo-input.tsx";
import FormDialog from "@/components/dialog/form-dialog.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import GeoButton from "@/components/geo/geo-button.tsx";
import {cn} from "@/lib/utils.ts";

interface MaterialDialogProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    isProcessing?: boolean;
    isEdit?: boolean;
    toEditTitle?: string;
    values: MaterialPayload
    setValues: (values: MaterialPayload) => void;
    onClick: () => void;
    onDeleteClick?: () => void;
    trigger?: React.ReactNode;
    maxYoutubeLinks?: number;
    maxImageLinks?: number;
}

export default function MaterialDialog(
    {
        open,
        onOpenChange,
        isProcessing = false,
        isEdit = false,
        toEditTitle,
        values,
        setValues,
        onClick,
        onDeleteClick,
        trigger,
        maxYoutubeLinks = 4,
        maxImageLinks = 10
    }: MaterialDialogProps) {

    // YouTube Links handlers
    const addYoutubeLink = () => {
        const currentLinks = values.youtubeLinks || [];
        if (currentLinks.length < maxYoutubeLinks) {
            setValues({
                ...values,
                youtubeLinks: [...currentLinks, '']
            });
        }
    };

    const removeYoutubeLink = (index: number) => {
        const currentLinks = values.youtubeLinks || [];
        if (currentLinks.length > 0) {
            setValues({
                ...values,
                youtubeLinks: currentLinks.filter((_, i) => i !== index)
            });
        }
    };

    const handleYoutubeLinkChange = (index: number, value: string) => {
        const currentLinks = values.youtubeLinks || [];
        setValues({
            ...values,
            youtubeLinks: currentLinks.map((link, i) => (i === index ? value : link))
        });
    };

    // Image Links handlers
    const addImageLink = () => {
        const currentLinks = values.imageLinks || [];
        if (currentLinks.length < maxImageLinks) {
            setValues({
                ...values,
                imageLinks: [...currentLinks, '']
            });
        }
    };

    const removeImageLink = (index: number) => {
        const currentLinks = values.imageLinks || [];
        if (currentLinks.length > 0) {
            setValues({
                ...values,
                imageLinks: currentLinks.filter((_, i) => i !== index)
            });
        }
    };

    const handleImageLinkChange = (index: number, value: string) => {
        const currentLinks = values.imageLinks || [];
        setValues({
            ...values,
            imageLinks: currentLinks.map((link, i) => (i === index ? value : link))
        });
    };

    return (
        <FormDialog
            open={open}
            onOpenChange={onOpenChange}
            isProcessing={isProcessing}
            isEdit={isEdit}
            title={isEdit ? `Edit ${toEditTitle}` : 'Tambah Materi'}
            icon={<FileText/>}
            onSubmit={onClick}
            onDelete={onDeleteClick}
            trigger={trigger}
        >
            <ScrollArea className="h-[70vh] pr-2">
                <div className="space-y-4 p-1">
                    <GeoInput
                        id="title"
                        label="Judul"
                        value={values.title ?? ''}
                        onChange={(e) => setValues({...values, title: e.target.value})}
                        icon={<Type/>}
                    />

                    <GeoInput
                        id="description"
                        label="Deskripsi"
                        value={values.description ?? ''}
                        onChange={(e) => setValues({...values, description: e.target.value})}
                        multiline
                        minRows={3}
                        maxRows={15}
                    />

                    <GeoInput
                        id="formula"
                        label="Rumus"
                        value={values.formula ?? ''}
                        onChange={(e) => setValues({...values, formula: e.target.value})}
                        multiline
                        minRows={3}
                        maxRows={15}
                    />

                    <GeoInput
                        id="example"
                        label="Contoh"
                        value={values.example ?? ''}
                        onChange={(e) => setValues({...values, example: e.target.value})}
                        multiline
                        minRows={3}
                        maxRows={15}
                    />

                    {/* YouTube Links Section */}
                    <div className="space-y-3">
                        <h4 className="font-semibold text-gray-800">Link YouTube</h4>

                        <div className="space-y-2">
                            {(values.youtubeLinks || []).map((link, index) => (
                                <div
                                    key={index}
                                    className={cn(
                                        "flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200",
                                        "transition-all duration-200 hover:bg-gray-100"
                                    )}
                                >
                                    <GeoInput
                                        id={`youtube-${index}`}
                                        label={`Video ${index + 1}`}
                                        value={link}
                                        onChange={(e) => handleYoutubeLinkChange(index, e.target.value)}
                                        icon={<Link className="w-4 h-4 text-gray-500" />}
                                        className="flex-1"
                                        description="format https://www.youtube.com/watch?v=VIDEO_ID"
                                    />
                                    <GeoButton
                                        variant="secondary"
                                        onClick={() => removeYoutubeLink(index)}
                                        disabled={(values.youtubeLinks || []).length <= 0}
                                        className="h-9 w-9 p-0 shrink-0"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </GeoButton>
                                </div>
                            ))}
                        </div>

                        <GeoButton
                            variant="secondary"
                            onClick={addYoutubeLink}
                            disabled={(values.youtubeLinks || []).length >= maxYoutubeLinks}
                            className="w-full"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Tambah Link YouTube {(values.youtubeLinks || []).length >= maxYoutubeLinks && `(Maks: ${maxYoutubeLinks})`}
                        </GeoButton>
                    </div>

                    {/* Image Links Section */}
                    <div className="space-y-3">
                        <h4 className="font-semibold text-gray-800">Link Gambar</h4>

                        <div className="space-y-2">
                            {(values.imageLinks || []).map((link, index) => (
                                <div
                                    key={index}
                                    className={cn(
                                        "flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200",
                                        "transition-all duration-200 hover:bg-gray-100"
                                    )}
                                >
                                    <GeoInput
                                        id={`image-${index}`}
                                        label={`Gambar ${index + 1}`}
                                        value={link}
                                        onChange={(e) => handleImageLinkChange(index, e.target.value)}
                                        icon={<Link className="w-4 h-4 text-gray-500" />}
                                        className="flex-1"
                                        description="format https://example.com/image.jpg"
                                    />
                                    <GeoButton
                                        variant="secondary"
                                        onClick={() => removeImageLink(index)}
                                        disabled={(values.imageLinks || []).length <= 0}
                                        className="h-9 w-9 p-0 shrink-0"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </GeoButton>
                                </div>
                            ))}
                        </div>

                        <GeoButton
                            variant="secondary"
                            onClick={addImageLink}
                            disabled={(values.imageLinks || []).length >= maxImageLinks}
                            className="w-full"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Tambah Link Gambar {(values.imageLinks || []).length >= maxImageLinks && `(Maks: ${maxImageLinks})`}
                        </GeoButton>
                    </div>
                </div>
            </ScrollArea>
        </FormDialog>
    );
}