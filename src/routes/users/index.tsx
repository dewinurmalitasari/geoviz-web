import {createFileRoute} from '@tanstack/react-router'
import {Eye, GraduationCap, Home, Pen, Plus, Users} from "lucide-react";
import GeoCard from "@/components/geo-card.tsx";
import GeoButton from "@/components/geo-button.tsx";
import {toast} from "sonner";
import type {User} from "@/type.ts";
import {DataTable} from "@/components/data-table.tsx";
import type {ColumnDef} from "@tanstack/react-table";

export const Route = createFileRoute('/users/')({
    component: RouteComponent,
})

function RouteComponent() {
    const navigate = Route.useNavigate();

    // TODO: Replace with real data fetching
    const dummy: User[] = [];
    const roles = ['admin', 'teacher', 'student'];

    for (let i = 1; i <= 300; i++) {
        dummy.push({
            _id: '690411171111506118234115' + i,
            username: `user${i} aaaaa aaaaaa aaaaaaaa`,
            role: roles[i % roles.length] as User['role'],
        });
    }

    // Table Columns Definition
    const teacherColumns: ColumnDef<User>[] = [
        {
            id: 'no',
            header: () => <div className="text-center font-bold">No</div>,
            cell: ({row}) => <div className="text-center">{row.index + 1}</div>,
        },
        {
            accessorKey: 'username',
            header: () => <div className="text-start font-bold">Username</div>,
            cell: ({row}) => <div className="text-start">{row.original.username}</div>,
        },
        {
            id: 'actions',
            header: () => <div className="text-end font-bold pe-8">Aksi</div>,
            cell: ({row}) => {
                const user = row.original;

                return (
                    <div className="flex justify-end px-2">
                        <GeoButton onClick={() => toast.warning(user._id)} variant="secondary"
                                   className="h-[40px] w-[80px]"><Pen/> Edit</GeoButton>
                    </div>
                );
            },
        }
    ]

    const studentColumns: ColumnDef<User>[] = [
        {
            id: 'no',
            header: () => <div className="text-center font-bold">No</div>,
            cell: ({row}) => <div className="text-center">{row.index + 1}</div>,
        },
        {
            accessorKey: 'username',
            header: () => <div className="text-start font-bold">Username</div>,
            cell: ({row}) => <div className="text-start">{row.original.username}</div>,
        },
        {
            id: 'actions',
            header: () => <div className="text-end font-bold pe-22">Aksi</div>,
            cell: ({row}) => {
                const user = row.original;

                return (
                    <div className="flex justify-end pe-4 space-x-4">
                        <GeoButton onClick={() => toast.warning(user._id)} variant="primary"
                                   className="h-[40px] w-[80px]"><Eye/> Lihat</GeoButton>
                        <GeoButton onClick={() => toast.warning(user._id)} variant="secondary"
                                   className="h-[40px] w-[80px]"><Pen/> Edit</GeoButton>
                    </div>
                );
            },
        }
    ]

    // TODO: Preloader
    return (
        <div className="flex flex-col flex-grow px-4 md:px-16 space-y-4">
            <GeoButton onClick={() => navigate({to: '/'})} variant="primary">
                <Home/> Kembali ke Beranda
            </GeoButton>

            <div className="flex flex-col flex-grow xl:flex-row md:space-x-4 space-y-4 md:space-y-0">
                <GeoCard
                    icon={<GraduationCap/>}
                    title="Akun Siswa"
                    content={
                        <DataTable columns={studentColumns} data={dummy} isLoading={false}/>
                    }
                    titleButton={
                        <GeoButton onClick={() => toast.warning('not implemented yet')} className="w-[100px]">
                            <Plus/> Tambah
                        </GeoButton>
                    }
                />

                <GeoCard
                    icon={<Users/>}
                    title="Akun Guru"
                    content={
                        <DataTable columns={teacherColumns} data={dummy} isLoading={true}/>
                    }
                    titleButton={
                        <GeoButton onClick={() => toast.warning('not implemented yet')} className="w-[100px]">
                            <Plus/> Tambah
                        </GeoButton>
                    }
                />
            </div>
        </div>
    );
}