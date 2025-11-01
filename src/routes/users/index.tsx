import {createFileRoute, useNavigate} from '@tanstack/react-router'
import {Eye, GraduationCap, Pen, Plus, Users} from "lucide-react";
import GeoCard from "@/components/geo-card.tsx";
import GeoButton from "@/components/geo-button.tsx";
import {toast} from "sonner";
import type {User, UsersResponse} from "@/type.ts";
import {DataTable} from "@/components/data-table.tsx";
import type {ColumnDef} from "@tanstack/react-table";
import PageHeader from "@/components/page-header.tsx";
import {getAuthentication} from "@/lib/auth.ts";
import {userService} from "@/services/user-service.ts";
import {LoadingPage} from "@/components/loading-page.tsx";
import {ErrorPage} from "@/components/error-page.tsx";
import {ApiError} from "@/lib/api-client.ts";

export const Route = createFileRoute('/users/')({
    component: RouteComponent,
    pendingComponent: () => <LoadingPage page="Manajemen Akun"/>,
    loader: async () => {
        const auth = getAuthentication();

        // If user role is admin load teacher too
        let teachers: UsersResponse | null = null;
        if (auth?.user.role === 'admin') {
            teachers = await userService.getUsers('teacher');
        }

        const students = await userService.getUsers('student');

        return {students, teachers};
    },
    errorComponent: ({ error }) => {
        if (error instanceof ApiError) {
            return (
                <ErrorPage
                    status={error.status}
                    statusText={error.statusText}
                    title="Terjadi Kesalahan memuat data pengguna"
                    message={error.message || "Gagal memuat data pengguna."}
                />
            );
        }

        return (
            <ErrorPage
                status={500}
                statusText="Internal Server Error"
                title="Terjadi Kesalahan memuat data pengguna"
                message={error.message || "Gagal memuat data pengguna."}
            />
        );
    },
})

function RouteComponent() {
    const navigate = useNavigate();
    const {students, teachers} = Route.useLoaderData();

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
                        <GeoButton onClick={() => navigate({to: `/users/${user._id}`})} variant="primary"
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
            <PageHeader title="Manajemen Akun" description="Kelola akun pada platform GeoViz."/>

            <div className="flex flex-col flex-grow xl:flex-row md:space-x-4 space-y-4 md:space-y-0">
                <GeoCard
                    icon={<GraduationCap/>}
                    title="Akun Siswa"
                    content={
                        <DataTable
                            columns={studentColumns}
                            data={students?.users ?? []}
                        />
                    }
                    titleButton={
                        <GeoButton onClick={() => toast.warning('not implemented yet')} className="w-[100px]">
                            <Plus/> Tambah
                        </GeoButton>
                    }
                />

                {teachers &&
                    <GeoCard
                        icon={<Users/>}
                        title="Akun Guru"
                        content={
                            <DataTable
                                columns={teacherColumns}
                                data={teachers?.users ?? []}
                            />
                        }
                        titleButton={
                            <GeoButton onClick={() => toast.warning('not implemented yet')} className="w-[100px]">
                                <Plus/> Tambah
                            </GeoButton>
                        }
                    />
                }
            </div>
        </div>
    );
}