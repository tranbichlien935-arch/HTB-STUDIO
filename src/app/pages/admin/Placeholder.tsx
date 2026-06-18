import { Construction } from "lucide-react";

export default function AdminPlaceholder({ title }: { title: string }) {
    return (
        <div className="flex flex-col items-center justify-center h-full p-8 text-center text-neutral-400">
            <Construction size={48} className="mb-4 opacity-50 text-[#F4A261]" />
            <h2 className="text-xl font-medium text-[#344E41] mb-2">Module {title}</h2>
            <p className="max-w-sm text-sm">Tính năng này đang trong quá trình lắp ráp. Chờ xíu nha sếp!</p>
        </div>
    );
}
