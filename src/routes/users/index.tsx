import {createFileRoute} from '@tanstack/react-router'
import {Eye, GraduationCap, Pen, Plus, Users} from "lucide-react";
import GeoCard from "@/components/geo-card.tsx";
import GeoButton from "@/components/geo-button.tsx";
import {toast} from "sonner";
import type {User} from "@/type.ts";
import {DataTable} from "@/components/data-table.tsx";
import type {ColumnDef} from "@tanstack/react-table";
import PageHeader from "@/components/page-header.tsx";
import {getUsers} from "@/hooks/use-users.ts";

export const Route = createFileRoute('/users/')({
    component: RouteComponent,
    loader: async ({context}) => {
        // Invalidate and refetch the queries TODO: Ensure all get are doing this too
        await Promise.all([
            context.queryClient.invalidateQueries({ queryKey: ['users', 'student'] }),
            context.queryClient.invalidateQueries({ queryKey: ['users', 'teacher'] }),
        ]);
    },
})

function RouteComponent() {
    const {
        data: students,
        isFetching: isFetchingStudents,
        error: studentsError,
    } = getUsers('student');

    const {
        data: teachers,
        isFetching: isFetchingTeachers,
        error: teachersError
    } = getUsers('teacher');

    if (studentsError || teachersError) {
        toast.error('Gagal memuat data: ' + (studentsError?.message ?? teachersError?.message));
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

    return (
        <div className="flex flex-col flex-grow px-4 md:px-16 space-y-4">
            <PageHeader title="Manajemen Akun" description="Kelola akun siswa dan guru."/>

            <div className="flex flex-col flex-grow xl:flex-row md:space-x-4 space-y-4 md:space-y-0">
                <GeoCard
                    icon={<GraduationCap/>}
                    title="Akun Siswa"
                    content={
                        <DataTable
                            columns={studentColumns}
                            data={students?.users ?? []}
                            isLoading={isFetchingStudents}
                        />
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
                        <DataTable
                            columns={teacherColumns}
                            data={teachers?.users ?? []}
                            isLoading={isFetchingTeachers}
                        />
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